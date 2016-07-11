class ProgressBarController {
  /* @ngInject */
  constructor(ProgressBarService, $timeout) {
    this.progressBarService = ProgressBarService;
    this.$timeout = $timeout;
    // this.initialize();
    this.opt =
    {
      interval: 200,
      setInit: 0
    };
    this.$timeout(() => {
      this.pbar.doProgress();
    });
  }
  initialize() {
    this.progressBarService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ProgressBarController;
