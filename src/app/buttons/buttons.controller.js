class ButtonsController {
  /* @ngInject */
  constructor(ButtonsService) {
    this.buttonsService = ButtonsService;
    // this.initialize();
  }
  initialize() {
    this.buttonsService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ButtonsController;
