class TextInputController {
  /* @ngInject */
  constructor(TextInputService) {
    this.textInputService = TextInputService;
    // this.initialize();
  }
  initialize() {
    this.textInputService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default TextInputController;
