class BlockuiController {
  /* @ngInject */
  constructor(BlockuiService, blockUI, $timeout) {
    this.BlockuiService = BlockuiService;
    this.blockUI = blockUI;
    this.$timeout = $timeout;
    this.notifyBlock = this.blockUI.instances.get('notifyBlock');
    this.noLightboxBlock = this.blockUI.instances.get('noLightboxBlock');
    this.lightboxSpinnerBlock = this.blockUI.instances.get('lightboxSpinnerBlock');


    // this.initialize();
  }
  initialize() {
    this.BlockuiService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }

  toggleBlockNotify() {
    if (this.notifyBlock.state().blocking) {
      this.notifyBlock.stop();
    } else {
      this.notifyBlock.start('Sending Message...');
      // this.notifyBlock.message('Sending Message...');
    }
  }

  toggleSpinnerNoLightBox() {
    if (this.noLightboxBlock.state().blocking) {
      this.noLightboxBlock.stop();
    } else {
      this.noLightboxBlock.start('');
      // this.noLightboxBlock.message('');
    }
  }

  toggleSpinnerLightBox() {
    if (this.lightboxSpinnerBlock.state().blocking) {
      this.lightboxSpinnerBlock.stop();
    } else {
      this.lightboxSpinnerBlock.start('Sending Message...');
      // this.lightboxSpinnerBlock.message('<span>Sending Message...</span>');
    }
  }

  showBlock() {
    this.blockUI.start();
    this.$timeout(() => {
      this.blockUI.stop();
    }, 2000);
  }
}

export default BlockuiController;
