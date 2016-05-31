class ParagraphController {
  /* @ngInject */
  constructor(ParagraphService) {
    this.paragraphService = ParagraphService;
    // this.initialize();
  }

  initialize() {
    this.paragraphService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ParagraphController;
