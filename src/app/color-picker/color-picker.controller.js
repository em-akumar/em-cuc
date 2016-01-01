import {angular} from 'ems';
class ColorPickerController {
  /* @ngInject */
  constructor(ColorPickerService) {
    this.label = 'ColorPicker Controller !!';
    this.colorPickerService = ColorPickerService;

    angular.element(document.querySelector('.dropdown-menu.color-menu')).on('click', function(e) {
      e.stopPropagation();
    });
    // this.initialize();
  }

  initialize() {
    this.colorPickerService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ColorPickerController;
