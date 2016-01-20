class RadioButtonController {
  /* @ngInject */
  constructor(RadioButtonService) {
    this.label = 'RadioButton Controller !!';
    this.radioButtonService = RadioButtonService;
    // this.initialize();
  }
  initialize() {
    this.radioButtonService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default RadioButtonController;
