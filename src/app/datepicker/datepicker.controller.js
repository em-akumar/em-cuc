class DatepickerController {
  /* @ngInject */
  constructor() {
    // added DatePicker
    this.dateTimePicker = {
      disabledDates: ['12/14/2015', '12/15/2015', '12/16/2015'],
      defaultDate: '01/06/2016',
      defaultTime: '01:30 AM'
    };
    this.dateTimePickerAuto = {
      // disabledDates: ['12/14/2015', '12/15/2015', '12/16/2015']

    };
    this.dateTimePickerDisabled = {
      disabledDates: ['12/14/2015', '12/15/2015', '12/16/2015'],
      defaultTime: '01:30 AM'
    };
    // this.initialize();
  }

  initialize() {
  }
}

export default DatepickerController;
