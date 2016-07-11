class IconsController {
  /* @ngInject */
  constructor(IconsService) {
    this.iconsService = IconsService;
    // this.initialize();
  }
  initialize() {
    this.iconsService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default IconsController;
