import template from './color-picker.html';
import controller from './color-picker.controller';
import './color-picker.less';

let colorPickerComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default colorPickerComponent;
