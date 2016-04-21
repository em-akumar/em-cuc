// import {angular} from 'ems';
class ColorPickerController {
  /* @ngInject */
  constructor(ColorPickerService,$timeout) {
    this.$timeout = $timeout;
    this.initialize();
  }

  initialize(){
    this.$timeout(() => {
            this.colorControl.setColorValue('000000');
      }, 0);
  }
}
export default ColorPickerController;
