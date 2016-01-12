/* eslint-disable */
class DatePicker {

    constructor(element, options = {}) {
        element = (typeof element === 'object') ? element : document.getElementById(element);
        this.AddOn = element.querySelector('.em-calendar');
        this.parent = element.querySelector('.em-calendar-pop');
        this.destDateField = element.querySelector('.date-picker') || '';
        this.destTimeField = element.querySelector('.time-picker') || '';
        //default date/time set
        this.defaultTime = options.defaultTime || '';
        this.defaultDate = options.defaultDate || '';
        this.lastDayOfPrevMonth = null;

        this.calendarFrom = null;
        this.calendarIter = null;
        this.calendarTo = null;
        this.today = this.createDate();
        this.currentMonth = this.createDate();

        this.isVisible = false;
        this.isTimeVisible = false;
        this.showMeridian = true;

        this.maxHours = 24;
        this.maxMinutes = 60;

        this.date_format = "mm/dd/yyyy";
        this.time_format = "HH:MM TT";

        this.showOnlyDate = false;
        this.showOnlyTime = false;
        this.disabledDates = options.disabledDates;
        //range for date enable/disable
        this.enableFrom = options.enableFrom;
        this.enableTo = options.enableTo;
        this.dateFormat = (() => {
            let token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = (val, len) => {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len) val = "0" + val;
                    return val;
                };

            // Regexes and supporting functions are cached through closure
            return (date, mask, utc) => {
                let dF = this.dateFormat;

                // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
                if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                    mask = date;
                    date = undefined;
                }

                // Passing date through Date applies Date.parse, if necessary
                date = date ? new Date(date) : new Date;
                if (isNaN(date)) throw SyntaxError("invalid date");

                mask = String(dF.masks[mask] || mask || dF.masks["default"]);

                // Allow setting the utc argument via the mask
                if (mask.slice(0, 4) == "UTC:") {
                    mask = mask.slice(4);
                    utc = true;
                }

                let _ = utc ? "getUTC" : "get",
                    d = date[_ + "Date"](),
                    D = date[_ + "Day"](),
                    m = date[_ + "Month"](),
                    y = date[_ + "FullYear"](),
                    H = date[_ + "Hours"](),
                    M = date[_ + "Minutes"](),
                    s = date[_ + "Seconds"](),
                    L = date[_ + "Milliseconds"](),
                    o = utc ? 0 : date.getTimezoneOffset(),
                    flags = {
                        d: d,
                        dd: pad(d),
                        ddd: dF.i18n.dayNames[D],
                        dddd: dF.i18n.dayNames[D + 7],
                        m: m + 1,
                        mm: pad(m + 1),
                        mmm: dF.i18n.monthNames[m],
                        mmmm: dF.i18n.monthNames[m + 12],
                        yy: String(y).slice(2),
                        yyyy: y,
                        h: H % 12 || 12,
                        hh: pad(H % 12 || 12),
                        H: H,
                        HH: pad(H),
                        M: M,
                        MM: pad(M),
                        s: s,
                        ss: pad(s),
                        l: pad(L, 3),
                        L: pad(L > 99 ? Math.round(L / 10) : L),
                        t: H < 12 ? "a" : "p",
                        tt: H < 12 ? "am" : "pm",
                        T: H < 12 ? "A" : "P",
                        TT: H < 12 ? "AM" : "PM",
                        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                    };

                return mask.replace(token, ($0) => {
                    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                });
            };
        })();

        // Some common format strings
        this.dateFormat.masks = {
            "default": "ddd mmm dd yyyy HH:MM:ss",
            shortDate: "m/d/yy",
            mediumDate: "mmm d, yyyy",
            longDate: "mmmm d, yyyy",
            fullDate: "dddd, mmmm d, yyyy",
            shortTime: "h:MM TT",
            mediumTime: "h:MM:ss TT",
            longTime: "h:MM:ss TT Z",
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };

        // Internationalization strings
        this.dateFormat.i18n = {
            dayNames: [
                "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            monthNames: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ]
        };
        this.init();
    }
    init() {
        // For convenience...
        var self = this;
        Date.prototype.format = function(mask, utc) {
            return self.dateFormat(this, mask, utc);
        };
        if (!this._setDisabled()) {
            this.AddOn.addEventListener('click', () => {
                this.viewCalendar();
            });
        }
        this.showOnlyTime = this.destDateField == '' ? true : false;
        this.showOnlyDate = this.destTimeField == '' ? true : false;
        this.destTimeField.addEventListener("focus", () => {
            if (!this.isVisible) {
                this._viewCalendar();
            }
            this.showtime();
        });
        this.destDateField.addEventListener("focus", () => {
            if (!this.isVisible) {
                this._viewCalendar();
            } else {
                var timePickerTable = this.parent.querySelector(".table-condensed-time");
                var datePickerTable = this.parent.querySelector(".table-condensed-date");
                timePickerTable.style.display = "none";
                datePickerTable.style.display = "";
            }
        });
        if (this.defaultTime != '') this.destTimeField.value = this.defaultTime;
        if (this.defaultDate != '') this.destDateField.value = this.defaultDate;
    }
    viewCalendar() {
        this._viewCalendar();
    }
    generateCalendarTable() {
        this._generateCalendarTable();
    }
    createtimePicker() {
        this._createtimePicker();
    }
    generateCalendar() {
        this._generateCalendar();
    }

    _viewCalendar() {
        if (this.destDateField == '' || this.destTimeField == '') {
            this.showOnlyTime = this.destDateField == '' ? true : false;
            this.showOnlyDate = this.destTimeField == '' ? true : false;
        } else {
            this.showOnlyTime = true;
            this.showOnlyDate = true;
        }

        let parentObj = ((typeof this.parent === 'object') ? this.parent : document.getElementById(this.parent));
        let dateParentObj = parentObj.querySelector('.table-condensed-date');
        let timeParentObj = parentObj.querySelector('.table-condensed-time');

        document.getElementsByTagName('html')[0].addEventListener('click', (e) => {
            parentObj.style.display = "none";this.isVisible = false;
        });
        this.AddOn.parentNode.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        this.AddOn.parentNode.addEventListener('keydown', (e) => {
            if (e.keyCode === 9 || e.keyCode === 13) {
                var val = this._autocomplete(this.destDateField.value);
                if (val != undefined && val.trim() != '') {
                    this.destDateField.value = val.split(' ')[0];
                    this.destTimeField.value = (val.split(' ')[1] || '') + ' ' + (val.split(' ')[2] || '')
                }
            }
        });

        document.getElementsByTagName('html')[0].addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                parentObj.style.display = "none";
                this.isVisible = false;
            }
        });
        if (this.isVisible) {
            parentObj.style.display = "none";
            this.isVisible = false;
        } else {
            if (timeParentObj != null) {
                if (this.showOnlyTime && !this.showOnlyDate) {
                    timeParentObj.style.display = "";
                } else {
                    timeParentObj.style.display = "none";
                }
            }
            if (dateParentObj != null) {
                if (this.showOnlyTime && !this.showOnlyDate) {
                    dateParentObj.style.display = "none";
                } else {
                    dateParentObj.style.display = "";
                }
            }
            parentObj.style.display = "";
            if (parentObj.innerHTML == "") {
                this.generateCalendar();
            }
            this.isVisible = true;

        }
    }
    _generateCalendar() {
        this.findFromDate();
        this.calendarIter = this.calendarFrom;
        this.findToDate();
        if (this.showOnlyDate && this.showOnlyTime) {
            this.generateCalendarTable();
        } else {
            if (this.showOnlyDate) {
                this.generateCalendarTable();
            }
            if (this.showOnlyTime) {
                this.createtimePicker();
            }
        }
    }
    findFromDate() {

        let dateObj = this.createDate();
        dateObj.setFullYear(this.currentMonth.getFullYear());
        dateObj.setMonth(this.currentMonth.getMonth());
        dateObj.setDate(1);
        if (dateObj.getDay() > 0) {
            dateObj.setDate(0);
            while (dateObj.getDay() != 0) {
                dateObj.setDate(dateObj.getDate() - 1);
            }
        }
        this.calendarFrom = dateObj;
    }
    findToDate() {
        let dateObj = this.createDate();
        //Find last day of month
        dateObj.setFullYear(this.currentMonth.getFullYear());
        dateObj.setMonth(this.currentMonth.getMonth() + 1);
        dateObj.setDate(0);
        //Set to date to saturday of that last week of month
        while (dateObj.getDay() < 6) {
            dateObj.setDate(dateObj.getDate() + 1);
        }
        this.calendarTo = dateObj;
    }
    _setDisabled() {
        var self = this;
        var isDisabled = self.AddOn.parentNode.classList.contains('disabled');
        if (isDisabled) {
            self.AddOn.classList.add('disabled');
            self.destDateField.classList.add('disabled');
            self.destTimeField.classList.add('disabled');
            self.destDateField.setAttribute('disabled', 'disabled');
            self.destTimeField.setAttribute('disabled', 'disabled');
        }
        return isDisabled;
    }
    //format strig to a valid date
    _autocomplete(str) {
        var code, i, j = 0,
            len, number = '',
            ampm = 'am';

        for (i = 0, len = str.length; i < len; i++) {
            code = str.charCodeAt(i);

            if (code > 47 && code < 58) { //numeric
                number += str.charAt(i);
            } else if (code === 112 || code === 80 || code === 77 || code === 109 || code === 65 || code === 97) {
                if (!(code === 77 || code === 109))
                    ampm = str.charAt(i) + 'm';


            } else {
                j++;
                if (j < 3)
                    number += "/";
                else if (j == 3)
                    number += " ";
                else if (j == 4)
                    number += ":";
            }
        }
        var dt = '';
        //convert randam string to possible date string and format it.
        dt = this._formatDate(this._aiDate(number));
        console.log(dt);
        //check the generated date is valid or not..
        if (dt.trim().length < 16)
            return '';
        else {
            var dtTmp = dt.split(' ')[0];
            dtTmp = dtTmp.split('/');
            if (Number(dtTmp[0]) > 0 && Number(dtTmp[1]) > 0 && Number(dtTmp[2]) > 0) {

                if (this._DatePicker_IsValidDate(dt.split(' ')[0]))
                    return dt + ' ' + ampm.toUpperCase();
                else
                    return '';
            } else {
                return dt + ' ' + ampm.toUpperCase();
            }

        }


    }
    _formatDate(str) {

        if (str == '')
            return '';
        if (str.indexOf('/') > -1) {
            str = str.split("/").map((val) => {
                return val.trim().length == 1 ? '0' + val : val;
            }).join("").split(':').join("").split(' ').join("");

            str = this._aiDate(str.trim());
        }
        var val = String(Math.pow(10, (12 - str.length)) * Number(str));
        if (val.length < 12)
            val = '0' + val;
        var result = val.slice(0, 2) + '/' + val.slice(2, 4) + '/' + val.slice(4, 8) + ' ' + val.slice(8, 10) + ':' + val.slice(10, 12);
        return result;
    }
    _DatePicker_IsValidDate(input) {
        var bits = input.split('/');
        var d = new Date((bits[2] || 0), (bits[0] || 1) - 1, (bits[1] || 0));
        return (d.getFullYear() == Number(bits[2]) || Number(bits[2]) == 0) && (d.getMonth() + 1) == Number(bits[0]) && d.getDate() == bits[1];
    }
    _aiDate(number) {
        if (number.indexOf('/') == -1) {
            var len = number.length;
            var num = number;
            if (number.length > 1 && Number(num.slice(0, 2)) > 12) {
                num = '0' + num;
            } else if (num.length == 1) {
                num = '0' + num;
            }
            if (number.length >= 3 && Number(num.slice(2, 4)) > 31) {
                num = num.slice(0, 2) + '0' + num.slice(2);
            } else if (num.length == 3) {
                num = num.slice(0, 2) + '0' + num.slice(2);
            }
            /*
            if(number.length>8 && num.indexOf(' ') ==-1)
             {
              num = num.slice(0,8)+' '+num.slice(8);
            }*/
            if (num.length > 8 && Number(num.slice(8, 10)) > 12) {
                num = num.slice(0, 8) + '0' + num.slice(8);
            } else if (num.length > 8 && Number(num.slice(8, 10)).toString().length === 1) {
                num = num.slice(0, 8) + '0' + num.slice(8);
            }
            if (num.length > 10 && Number(num.slice(10)) > 59) {
                num = num.slice(0, 10) + '0' + num.slice(10, 11);
            } else if (num.length > 10 && Number(num.slice(10, 12)).toString().length === 1) {
                num = num.slice(0, 10) + '0' + num.slice(10);
            }
            return num;
        } else
            return number;
    }

    _generateCalendarTable() {
        let parentObj = ((typeof this.parent === 'object') ? this.parent : document.getElementById(this.parent));;
        let rootTable = document.createElement('table');
        rootTable.border = "0";
        rootTable.cellPadding = "0";
        rootTable.cellSpacing = "0";
        rootTable = this.addCalendarHeader(rootTable);
        let self = this;
        let totalDays = parseInt((self.calendarTo.getTime() - self.calendarFrom.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        let totalWeeks = parseInt(totalDays / 7);
        for (let i = 2; i <= totalWeeks + 1; i++) {
            let tableRow = rootTable.insertRow(i);
            for (let j = 0; j < 7; j++) {
                let cell = tableRow.insertCell(j);
                cell.innerHTML = self.calendarIter.getDate();
                if (self.calendarIter.getMonth() != self.currentMonth.getMonth()) {
                    cell.className = "days-not-in-month";
                } else {
                    let destDateObj = (typeof self.destDateField === 'object') ? self.destDateField : document.getElementById(self.destDateField);
                    let destTimeObj = (typeof self.destTimeField === 'object') ? self.destTimeField : document.getElementById(self.destTimeField);

                    //add the current date when user clicks on calendar  icon
                    destDateObj.value = self.showCurrentDate();

                    cell.onclick = function() {
                        self.calendarIter = self.currentMonth;
                        self.calendarIter.setDate(this.innerHTML);
                        if (self.showOnlyTime) {
                            let timeParentObj = parentObj.querySelector('.table-condensed-time');
                            if (timeParentObj != null) {
                                let timeCalHour = parentObj.querySelector('.calendar-hours');
                                let timeCalMin = parentObj.querySelector('.calendar-Minutes');
                                let timeCalAmPm = parentObj.querySelector('.calendar-toggle-period');
                                destTimeObj.value = (timeCalHour.innerHTML.length == 1 ? '0' : '') + timeCalHour.innerHTML + ":" + (timeCalMin.innerHTML.length == 1 ? '0' : '') + timeCalMin.innerHTML + " " + timeCalAmPm.innerHTML.trim();
                            } else {
                                destTimeObj.value = self.showCurrentTime();
                            }
                        }
                        destDateObj.value = self.calendarIter.format(self.date_format);

                        parentObj.style.display = "none";
                        self.isVisible = false;
                    };

                    if (j == 0 || j == 6) {
                        cell.className = "calendar-weekend"; // change the class if you want to change for weekend
                    } else {
                        cell.className = "calendar-weekday";
                    }
                }

                if (this.isCurrentDate(this.calendarIter, this.today) && self.calendarIter.getMonth() == self.currentMonth.getMonth()) {
                    cell.className = "current-calendar-day";
                }

                //disabled the dates
                for (let k = 0; k < this.disabledDates.length; k++) {
                    if (self.disabledDates[k] == self.calendarIter.format("mm/dd/yyyy")) {
                        cell.className += " disabled";
                    }
                }

                var currentcell = this.changeToDate(self.calendarIter.format("dd/mm/yyyy"));
                if (self.enableFrom) {
                    var fromcell = this.changeToDate(self.enableFrom);
                    if (fromcell > currentcell)
                        cell.className += " disabled";
                }
                if (self.enableTo) {
                    var tocell = this.changeToDate(self.enableTo);
                    if (tocell < currentcell)
                        cell.className += " disabled";
                }
                self.calendarIter.setDate(self.calendarIter.getDate() + 1);
            }
        }
        //add time fileds

        this.addCalendarFooter(rootTable);
        parentObj.appendChild(rootTable);
    }
    changeToDate(str) {
        var parts = str.split('/');
        var dt = new Date(parts[2], parts[1] - 1, parts[0]);
        return dt;
    }
    addCalendarHeader(rootTable) {
        let self = this;
        rootTable.className = "table-condensed-date";
        let tableTop = rootTable.insertRow(0);
        tableTop.className = "months-header-picker-title";
        let cell1 = tableTop.insertCell(0);
        if (this.showOnlyDate) {
            cell1.className = "header-arrow-right";
            cell1.onclick = function() {
                self.currentMonth.setMonth(self.currentMonth.getMonth() + 1);
                self.parent.innerHTML = "";
                self.generateCalendar();
            };
        }
        let cell2 = tableTop.insertCell(0);
        cell2.className = "header-title"
        cell2.colSpan = 5;
        if (this.showOnlyDate) {
            let month_names = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            cell2.innerHTML = month_names[this.currentMonth.getMonth()] + " " + this.currentMonth.getFullYear();
        }
        let cell3 = tableTop.insertCell(0);
        // cell3.innerHTML="<";
        if (this.showOnlyDate) {
            cell3.className = "header-arrow-left";
            //cell3.style.cursor="pointer";
            cell3.onclick = function() {
                self.currentMonth.setMonth(self.currentMonth.getMonth() - 1);
                self.parent.innerHTML = "";
                self.generateCalendar();
            };
        }
        //add day names
        let tableRow = rootTable.insertRow(1);
        tableRow.className = "days-header";

        let day_names = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        for (let i = 0; i < 7; i++) {
            let cell = tableRow.insertCell(i);
            cell.innerHTML = day_names[i];
            cell.className = "days-header-title";
        }
        return rootTable;
    }
    showtime() {
        let parentObj = ((typeof this.parent === 'object') ? this.parent : document.getElementById(this.parent));;
        let dateParentObj = parentObj.querySelector('.table-condensed-date');
        let timeParentObj = parentObj.querySelector('.table-condensed-time');


        if (this.isVisible) {
            dateParentObj.style.display = "none";
            if (timeParentObj === null) {
                this.createtimePicker();
            } else {
                timeParentObj.style.display = "";
            }
        } else {
            parentObj.style.display = "none";
            dateParentObj.style.display = "";
            timeParentObj.style.display = "";
            this.isVisible = false;
        }

    }
    _createtimePicker() {

        let parentTimeObj = ((typeof this.parent === 'object') ? this.parent : document.getElementById(this.parent));;
        let rootTimeTable = document.createElement('table');
        rootTimeTable.border = "0";
        rootTimeTable.cellPadding = "0";
        rootTimeTable.cellSpacing = "0";
        rootTimeTable = this.addTimeCalendarHeader(rootTimeTable);

        this.addTimeCalendarFooter(rootTimeTable);
        parentTimeObj.appendChild(rootTimeTable);
    }
    addTimeCalendarHeader(rootTimeTable) {
        let self = this;
        rootTimeTable.className = "table-condensed-time";
        let timeFieldValue = (typeof this.destTimeField === 'object') ? this.destTimeField : document.getElementById(this.destTimeField);
        timeFieldValue.value = this.showCurrentTime();
        // add month title header on Time calender
        let tableMonthTop = rootTimeTable.insertRow(0);
        tableMonthTop.className = "months-header-picker-title";
        if (this.showOnlyDate) {
            let cell01 = tableMonthTop.insertCell(0);
            cell01.className = "time-header-arrow-right";
            cell01.onclick = function() {
                self.currentMonth.setMonth(self.currentMonth.getMonth() + 1);
                self.parent.innerHTML = "";
                self.generateCalendar();
            };
        }

        let cell02 = tableMonthTop.insertCell(0);
        cell02.className = "header-title";

        if (this.showOnlyDate) {
            let divTitle = document.createElement('div');
            divTitle.className = "month-header-time-title";
            cell02.colSpan = 3;
            let month_names = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            divTitle.innerHTML = month_names[this.currentMonth.getMonth()] + " " + this.currentMonth.getFullYear();

            cell02.appendChild(divTitle);
        } else {
            cell02.colSpan = 5;
            cell02.style.padding = "8px";
            cell02.innerHTML = "Time";
        }
        if (this.showOnlyDate) {
            let cell03 = tableMonthTop.insertCell(0);
            cell03.className = "header-arrow-left";
            cell03.onclick = function() {
                self.currentMonth.setMonth(self.currentMonth.getMonth() - 1);
                self.parent.innerHTML = "";
                self.generateCalendar();
            };
        }
        // add Hours rows on Time calender
        let tableTop = rootTimeTable.insertRow(1);
        tableTop.className = "hour-header";
        let cell04 = tableTop.insertCell(0);
        cell04.className = "time-header-parent";

        let aHourUpTag = document.createElement('a');
        // aHourUpTag.setAttribute('href',"#");
        aHourUpTag.title = "Increment Hour";
        aHourUpTag.className = "btn hour-arrow-up-icon";
        cell04.appendChild(aHourUpTag);

        cell04.onclick = function() {
            let currentHour = divHoursTag.innerHTML;
            divHoursTag.innerHTML = self.incrementHour(currentHour);
            timeFieldValue.value = divHoursTag.innerHTML + ":" + divMinutesTag.innerHTML + " " + divTogglePeriodTag.innerHTML;
        };

        let cell05 = tableTop.insertCell(1);
        cell05.className = "separator";

        let cell06 = tableTop.insertCell(2);
        cell06.className = "time-header-parent";

        let aMinuteUpTag = document.createElement('a');
        // aMinuteUpTag.setAttribute('href',"#");
        aMinuteUpTag.title = "Increment Minute";
        aMinuteUpTag.className = "btn hour-arrow-up-icon";
        cell06.appendChild(aMinuteUpTag);


        cell06.onclick = function() {
            let currentMinutes = divMinutesTag.innerHTML;
            divMinutesTag.innerHTML = self.incrementMinute(currentMinutes);
            timeFieldValue.value = divHoursTag.innerHTML + ":" + divMinutesTag.innerHTML + " " + divTogglePeriodTag.innerHTML;
        };

        let cell07 = tableTop.insertCell(3);
        cell07.className = "separator";

        let cell08 = tableTop.insertCell(4);

        // Middle row for hour and minutes
        let tableMiddle = rootTimeTable.insertRow(2);
        let cell09 = tableMiddle.insertCell(0);

        var divHoursTag = document.createElement('div');
        divHoursTag.className = "calendar-hours";
        divHoursTag.innerHTML = this.showCurrentHour();
        divHoursTag.onclick = function() {
            timeFieldValue.value = divHoursTag.innerHTML + ":" + divMinutesTag.innerHTML + " " + divTogglePeriodTag.innerHTML.trim();
        };

        cell09.appendChild(divHoursTag);

        var cell10 = tableMiddle.insertCell(1);
        cell10.className = "separator";

        let cell11 = tableMiddle.insertCell(2);
        var divMinutesTag = document.createElement('div');
        divMinutesTag.className = "calendar-Minutes";
        divMinutesTag.innerHTML = this.showCurrentMinutes();
        divMinutesTag.onclick = function() {
            timeFieldValue.value = divHoursTag.innerHTML + ":" + divMinutesTag.innerHTML + " " + divTogglePeriodTag.innerHTML.trim();
        };
        cell11.appendChild(divMinutesTag);

        let cell12 = tableMiddle.insertCell(3);
        cell12.className = "separator";


        let cell13 = tableMiddle.insertCell(4);
        cell13.className = "time-header-parent";

        var divTogglePeriodTag = document.createElement('div');
        divTogglePeriodTag.className = "calendar-toggle-period";
        divTogglePeriodTag.innerHTML = this.showAMPM();

        divTogglePeriodTag.onclick = function() {
            divTogglePeriodTag.innerHTML = divTogglePeriodTag.innerHTML == 'AM' ? 'PM' : 'AM';
            timeFieldValue.value = divHoursTag.innerHTML + ":" + divMinutesTag.innerHTML + " " + divTogglePeriodTag.innerHTML.trim();
        };

        cell13.appendChild(divTogglePeriodTag);

        let tableDown = rootTimeTable.insertRow(3);
        tableDown.className = "hour-footer";
        let cell14 = tableDown.insertCell(0);
        cell14.className = "time-header-parent";

        let aHourDownTag = document.createElement('a');
        // aHourDownTag.setAttribute('href',"#");
        aHourDownTag.title = "Decrement Hour";
        aHourDownTag.className = "btn hour-arrow-down-icon";
        cell14.appendChild(aHourDownTag);

        cell14.onclick = function() {
            let currentHour = divHoursTag.innerHTML;
            divHoursTag.innerHTML = self.decrementHour(currentHour);
            timeFieldValue.value = divHoursTag.innerHTML + ":" + divMinutesTag.innerHTML + " " + divTogglePeriodTag.innerHTML.trim();
        };

        let cell15 = tableDown.insertCell(1);
        cell15.className = "separator";

        cell15 = tableDown.insertCell(2);
        cell15.className = "time-header-parent";

        let aMinuteDownTag = document.createElement('a');
        // aMinuteDownTag.setAttribute('href',"#");
        aMinuteDownTag.title = "decrement Minute";
        aMinuteDownTag.className = "btn hour-arrow-down-icon";
        cell15.appendChild(aMinuteDownTag);

        cell15.onclick = function() {
            let currentMinutes = divMinutesTag.innerHTML;
            divMinutesTag.innerHTML = self.decrementMinute(currentMinutes);
            timeFieldValue.value = divHoursTag.innerHTML + ":" + divMinutesTag.innerHTML + " " + divTogglePeriodTag.innerHTML.trim();
        };

        let cell16 = tableDown.insertCell(3);
        cell16.className = "separator";

        let cell17 = tableDown.insertCell(4);


        return rootTimeTable;
    }
    addTimeCalendarFooter(rootTimeTable) {
        let parentObj = ((typeof this.parent === 'object') ? this.parent : document.getElementById(this.parent));;
        let tableFooter = rootTimeTable.insertRow(rootTimeTable.rows.length);
        tableFooter.className = "time-picker-footer";

        let cell1 = tableFooter.insertCell(0);
        let spanTimeIcon = document.createElement("span");
        spanTimeIcon.className = "date-picker-icon";
        spanTimeIcon.style.display = this.showOnlyTime && !this.showOnlyDate ? "none" : "";
        let spanTimeTitle = document.createElement("span");
        spanTimeTitle.className = "time-picker-title";
        spanTimeTitle.innerHTML = "Choose Date"
        spanTimeTitle.style.display = this.showOnlyTime && !this.showOnlyDate ? "none" : "";
        cell1.appendChild(spanTimeIcon);
        cell1.appendChild(spanTimeTitle);
        cell1.colSpan = 5;

        //hide the time calendar and show the date calendar
        if (this.showOnlyTime) {
            tableFooter.onclick = function() {
                var timePickerTable = parentObj.querySelector(".table-condensed-time");
                var datePickerTable = parentObj.querySelector(".table-condensed-date");
                timePickerTable.style.display = "none";
                datePickerTable.style.display = "";
            };
        }
    }
    addCalendarFooter(rootTable) {
        let tableFooter = rootTable.insertRow(rootTable.rows.length);
        tableFooter.className = "time-picker-footer";
        let self = this;
        let cell1 = tableFooter.insertCell(0);
        let spanTimeIcon = document.createElement("span");
        spanTimeIcon.className = "time-picker-icon";
        spanTimeIcon.style.display = this.showOnlyDate && !this.showOnlyTime ? "none" : "";
        let spanTimeTitle = document.createElement("span");
        spanTimeTitle.className = "time-picker-title";
        spanTimeTitle.innerHTML = "Choose Time";
        spanTimeTitle.style.display = this.showOnlyDate && !this.showOnlyTime ? "none" : "";
        cell1.appendChild(spanTimeIcon);
        cell1.appendChild(spanTimeTitle);
        cell1.colSpan = 7;
        if (this.showOnlyDate) {
            tableFooter.onclick = function() {
                self.showtime();

            };
        }

    }
    createDate() {
        let dateObj = new Date();
        dateObj.setHours(0);
        dateObj.setMinutes(0);
        dateObj.setSeconds(0);
        dateObj.setMilliseconds(0);
        return dateObj;
    }
    isCurrentDate(calendarIter, today) {
        if (calendarIter.getYear() == today.getYear() &&
            calendarIter.getMonth() == today.getMonth() &&
            calendarIter.getDate() == today.getDate()) {
            return true;
        } else {
            return false;
        }
    }
    showCurrentTime() {
        let timeNow = new Date();
        let hours = timeNow.getHours();
        let minutes = timeNow.getMinutes();

        //var seconds = timeNow.getSeconds();
        var hrsToShow = ((hours > 12) ? hours - 12 : hours);
        let timeString = ((hrsToShow < 10) ? "0" : "") + hrsToShow;
        timeString += ((minutes < 10) ? ":0" : ":") + minutes;
        // timeString  += ((seconds < 10) ? ":0" : ":") + seconds;
        timeString += (hours >= 12) ? " PM" : " AM";

        return timeString;
    }
    showCurrentDate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!

        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
    showCurrentHour() {
        let timeNow = new Date();
        let hours = timeNow.getHours();
        let hourString = "" + ((hours > 12) ? hours - 12 : hours);
        if (hourString < 10) {
            hourString = "0" + hourString;
        }
        return hourString;
    }
    showCurrentMinutes() {
        let timeNow = new Date();
        let minutes = timeNow.getMinutes();
        let minutesString = ((minutes < 10) ? "0" : "") + minutes;
        return minutesString;
    }
    showAMPM() {
        let timeNow = new Date();
        let hours = timeNow.getHours();
        let ampmString = (hours >= 12) ? " PM" : " AM";
        return ampmString;
    }
    incrementHour(hour) {
        if (this.showMeridian) {
            if (hour == 11) {
                hour++;
                return hour;
            } else if (hour == 12) {
                hour = "01";
                return hour;
            }
        }
        if (hour == this.maxHours - 1) {
            hour = "01";
            return hour;
        }
        hour++;

        if (hour < 10) {
            hour = "0" + hour;
        }
        return hour;
    }
    decrementHour(hour) {
        if (this.showMeridian) {
            if (hour == 1) {
                hour = 12;
                return hour;
            } else if (hour === 12) {
                hour--;
                return hour;
            } else if (hour == 0) {
                hour = 11;
            } else {
                hour--;
            }

        } else {
            if (hour <= 0) {
                hour = this.maxHours - 1;
            } else {
                hour--;
            }
        }

        if (hour < 10) {
            hour = "0" + hour;
        }
        return hour;
    }
    incrementMinute(minute) {
        if (this.showMeridian) {
            if (minute == 58) {
                minute++;
                return minute;
            } else if (minute == 59) {
                minute = "00";
                return minute;
            }
        }
        if (minute == this.maxMinutes - 1) {
            minute = "01";
        }
        minute++;
        if (minute < 10) {
            minute = "0" + minute;
        }
        return minute;
    }
    decrementMinute(minute) {
            if (this.showMeridian) {
                if (minute == "00") {
                    minute = 59;
                    return minute;
                } else if (minute === 59) {
                    minute--;
                    return minute;
                }
                /* else if (hour == 0) {
                       hour = 11;
                       return hour;
                       }*/
                else {
                    minute--;
                }

            } else {
                if (minute <= 0) {
                    minute = this.maxMinutes - 1;
                } else {
                    minute--;
                }
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            return minute;
        }
        //get the left and top of textbox and show the date picker accordingly
    getPosition(element) {
        let xPosition = 0;
        let yPosition = 0;

        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        return {
            x: xPosition,
            y: yPosition
        };
    }
}

export {
    DatePicker
};