class TextInputController {
  /* @ngInject */
  constructor(TextInputService) {
    this.label = 'TextInput Controller !!';
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
