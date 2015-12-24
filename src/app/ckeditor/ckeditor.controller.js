class CkeditorController {
  /* @ngInject */
  constructor(CkeditorService) {
    this.label = 'Ckeditor Controller !!';
    this.ckeditorService = CkeditorService;
    // this.initialize();
  }
  initialize() {
    this.ckeditorService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default CkeditorController;
