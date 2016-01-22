import template from './datepicker.html';
import controller from './datepicker.controller';
import './datepicker.less';

let datepickerComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default datepickerComponent;
