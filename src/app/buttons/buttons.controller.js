class ButtonsController {
  /* @ngInject */
  constructor(ButtonsService) {
    this.label = 'Buttons Controller !!';
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
