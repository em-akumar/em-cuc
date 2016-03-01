class ToggleswitchController {
  /* @ngInject */
  constructor(ToggleswitchService) {
    this.label = 'Toggleswitch Controller !!';
    this.toggleSwitchService = ToggleswitchService;
    // this.initialize();
  }
  initialize() {
    this.toggleSwitchService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ToggleswitchController;
