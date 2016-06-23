class RadioController {
  /* @ngInject */
  constructor(RadioService) {
    this.radioService = RadioService;
    // this.initialize();
  }
  initialize() {
    this.radioService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default RadioController;
