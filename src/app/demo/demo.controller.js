class DemoController {
  /* @ngInject */
  constructor(DemoService) {
    this.label = 'Demo Controller !!';
    this.demoService = DemoService;
    // this.initialize();
    this.dateTimePicker = {
      parent: 'jcalendar_parent1-angular',
      destDateField: 'txtDatePicker',
      destTimeField: 'txtTimePicker',
      disabledDates: ['14/11/2015', '15/11/2015', '16/11/2015']
    };
  }
  initialize() {
    this.demoService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default DemoController;
