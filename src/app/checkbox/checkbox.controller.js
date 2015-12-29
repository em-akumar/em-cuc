class CheckboxController {
  /* @ngInject */
  constructor(CheckboxService) {
    this.label = 'Checkbox Controller !!';
    this.checkboxService = CheckboxService;
    // this.initialize();
  }
  initialize() {
    this.checkboxService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default CheckboxController;
