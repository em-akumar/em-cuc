class TextAreaController {
  /* @ngInject */
  constructor(TextAreaService) {
    this.label = 'TextArea Controller !!';
    this.textAreaService = TextAreaService;
    // this.initialize();
  }
  initialize() {
    this.textAreaService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default TextAreaController;
