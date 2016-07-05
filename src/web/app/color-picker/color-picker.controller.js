// import {angular} from 'ems';
class ColorPickerController {
  /* @ngInject */
  constructor(ColorPickerService, $timeout) {
    this.$timeout = $timeout;
    this.initialize();
  }

  initialize() {
    this.$timeout(() => {
      this.colorControl.setColorValue('000000');
      this.colorTest.setCallback(this.notifyMe);
    }, 0);
  }

  notifyMe(event) {
    console.log('Notify me ' + event);
  }
}
export default ColorPickerController;
