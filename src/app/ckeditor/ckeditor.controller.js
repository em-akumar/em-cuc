class CkeditorController {
  /* @ngInject */
  constructor(CkeditorService) {
    this.ckeditorService = CkeditorService;
    this.ckEditorRender();
    // this.initialize();
  }
  ckEditorRender() {
    this.options = {
      language: 'en',
      allowedContent: true,
      entities: false
    };

    // Called when the editor is completely ready.
    this.onReady = function () {
      // ...
    };
  }
  initialize() {
    this.ckeditorService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default CkeditorController;
