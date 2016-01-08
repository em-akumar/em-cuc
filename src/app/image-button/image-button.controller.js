class ImageButtonController {
  /* @ngInject */
  constructor(ImageButtonService) {
    this.label = 'ImageButton Controller !!';
    this.imageButtonService = ImageButtonService;
    // this.initialize();
  }
  initialize() {
    this.imageButtonService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ImageButtonController;
