import template from './checkbox.html';
import controller from './checkbox.controller';
import './checkbox.less';

let checkboxComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default checkboxComponent;
