class TabsPanelController {
  /* @ngInject */
  constructor(TabsPanelService) {
    this.label = 'TabsPanel Controller !!';
    this.tabsPanelService = TabsPanelService;
    // this.initialize();
  }
  initialize() {
    this.tabsPanelService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default TabsPanelController;
