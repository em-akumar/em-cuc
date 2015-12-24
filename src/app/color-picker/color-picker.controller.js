class ColorPickerController {
  /* @ngInject */
  constructor(ColorPickerService) {
    this.label = 'ColorPicker Controller !!';
    this.colorPickerService = ColorPickerService;
    this.ColorPicker = {};
    this.ColorPicker.handleClick = (e) => {
      e.stopPropagation();
    };
    // this.initialize();
  }
  initialize() {
    this.colorPickerService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ColorPickerController;
