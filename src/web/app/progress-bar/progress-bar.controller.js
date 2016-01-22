class ProgressBarController {
  /* @ngInject */
  constructor(ProgressBarService) {
    this.label = 'ProgressBar Controller !!';
    this.progressBarService = ProgressBarService;
    // this.initialize();
  }
  initialize() {
    this.progressBarService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ProgressBarController;
