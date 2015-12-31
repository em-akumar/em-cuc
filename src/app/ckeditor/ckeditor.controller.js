class CkeditorController {
  /* @ngInject */
  constructor(CkeditorService) {
    this.ckeditorService = CkeditorService;
    this.ckEditors = [];
    // this.initialize();
  }

  initialize() {
    this.ckeditorService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default CkeditorController;
