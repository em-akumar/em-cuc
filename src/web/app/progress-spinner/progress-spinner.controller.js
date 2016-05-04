class ProgressspinnerController {
  /* @ngInject */
  constructor(ProgressspinnerService) {
    this.progressSpinnerService = ProgressspinnerService;
    // this.initialize();
  }
  initialize() {
    this.progressSpinnerService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ProgressspinnerController;
