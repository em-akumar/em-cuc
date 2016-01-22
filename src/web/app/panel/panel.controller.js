class PanelController {
  /* @ngInject */
  constructor(PanelService) {
    this.panelService = PanelService;
    // this.initialize();
  }
  initialize() {
    this.panelService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default PanelController;
