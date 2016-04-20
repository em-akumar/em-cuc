class BlockuiController {
  /* @ngInject */
  constructor(BlockuiService, blockUI, $timeout) {
    this.BlockuiService = BlockuiService;
    this.blockUI = blockUI;
    this.$timeout = $timeout;
    // this.initialize();
  }
  initialize() {
    this.BlockuiService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
  showBlock () {
      this.blockUI.start();
        this.$timeout(() => {
            this.blockUI.stop();
        }, 2000);
    };
}

export default BlockuiController;
