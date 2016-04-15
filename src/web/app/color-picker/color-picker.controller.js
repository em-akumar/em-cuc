// import {angular} from 'ems';
class ColorPickerController {
  /* @ngInject */
  constructor(ColorPickerService,$timeout) {
    this.label = 'ColorPicker Controller !!';
    //this.colorControl.setColorValue('999999');
    //$timeout(() => { this.colorControl.setColorValue('999999') });
    this.textColor = 'CCaa44';
  }
}

export default ColorPickerController;
