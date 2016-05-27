class TooltipsController {
  /* @ngInject */
  constructor(TooltipsService) {
    this.tooltipsService = TooltipsService;
    // this.initialize();
  }
  initialize() {
    this.textInputService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default TooltipsController;
