class DatepickerController {
  /* @ngInject */
  constructor(DatepickerService) {
    this.label = 'Datepicker Controller !!';
    this.datepickerService = DatepickerService;
    // added DatePicker
    this.dateTimePicker = {
      parent: 'jcalendar_parent1-angular',
      destDateField: 'txtDatePicker',
      destTimeField: 'txtTimePicker',
      disabledDates: ['14/12/2015', '15/12/2015', '16/12/2015']
    };
    // this.initialize();
  }

  initialize() {
    this.datepickerService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default DatepickerController;
