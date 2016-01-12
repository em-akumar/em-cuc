var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

// import corresponding page object javascript file(s)
var CreateDatePicker = require('../test/date-picker.pageobject.js');
// import corresponding test data json file(s)
var TestData = require('../test/date-picker.testdata.json');

describe('date-picker functional test suite ->', function(){
    beforeEach(function () {
        browser.get('#/datepicker');
        browser.ignoreSynchronization = false;
        browser.waitForAngular();
    });

    afterEach(function () {
        browser.driver.sleep(2000);
    });

    describe('popup panel ->', function() {

        it('calendar should show when date picker image button is clicked', function () {

            var datePicker = new CreateDatePicker();

            datePicker.imageButton.click();

            expect(datePicker.calendarpopup.isDisplayed()).to.eventually.equal(true);

        });

        it('calendar should show when date entry field is clicked', function () {

            var datePicker = new CreateDatePicker();

            datePicker.dateEntryfield.click();

            expect(datePicker.calendarpopup.isDisplayed()).to.eventually.equal(true);
        });

        it('Time selector should show when time entry field is clicked is clicked', function () {

            var datePicker = new CreateDatePicker();

            datePicker.timeEntryfield.click();

            expect(datePicker.timepopup.isDisplayed()).to.eventually.equal(true);
        });

        it('Time selector should show when time picker icon is clicked is clicked', function () {

            var datePicker = new CreateDatePicker();

            datePicker.imageButton.click();
            datePicker.timepickericon.click();

            expect(datePicker.timepopup.isDisplayed()).to.eventually.equal(true);
        });

        it('calendar should show when date picker icon is clicked', function () {

            var datePicker = new CreateDatePicker();

            datePicker.imageButton.click();
            datePicker.timepickericon.click();
            datePicker.datepickericon.click();

            expect(datePicker.calendarpopup.isDisplayed()).to.eventually.equal(true);
        });

        it('calendar should show previous month when left arrow is clicked', function () {

            var datePicker = new CreateDatePicker();

            datePicker.imageButton.click();

            var currentmonth = datePicker.monthtitle;

            currentmonth.getText().then(function(text)
                {
                    var previousMonth = TestData[text].Previous;

                    datePicker.montharrowleft.click();  // go to previous month by clicking on left arrow

                    expect(datePicker.monthtitle.getText()).to.eventually.equal(previousMonth);
                });
        });

        it('calendar should show next month when right arrow is clicked', function () {

            var datePicker = new CreateDatePicker();

            datePicker.imageButton.click();

            var currentmonth = datePicker.monthtitle;

            currentmonth.getText().then(function(text)
            {
                var nextMonth = TestData[text].Next;

                datePicker.montharrowright.click();  // go to next month by clicking on right arrow

                expect(datePicker.monthtitle.getText()).to.eventually.equal(nextMonth);
            });
        });

    });


    describe('input text field ->', function() {

        it('date -> should be able to enter date', function () {

            var datePicker = new CreateDatePicker();

            datePicker.dateEntryfield.click();
            datePicker.dateEntryfield.sendKeys(TestData.Date);
            datePicker.dateEntryfield.sendKeys(protractor.Key.TAB);

            expect(datePicker.dateEntryfield.getAttribute("value")).to.eventually.equal(TestData.Date);

        });

        it('Time -> should be able to enter time', function () {
            var datePicker = new CreateDatePicker();

            datePicker.timeEntryfield.click();
            datePicker.timeEntryfield.sendKeys(TestData.Time);
            datePicker.timeEntryfield.sendKeys(protractor.Key.TAB);

            expect(datePicker.timeEntryfield.getAttribute("value")).to.eventually.equal(TestData.Time);
        });

        it('date -> should NOT accept invalid date format', function () {

            var datePicker = new CreateDatePicker();

            datePicker.dateEntryfield.click();
            datePicker.dateEntryfield.sendKeys(TestData.invalidDate);
            datePicker.dateEntryfield.sendKeys(protractor.Key.TAB);

            expect(datePicker.dateEntryfield.getAttribute("value")).to.eventually.not.equal(TestData.invalidDate);

        });
    });
});