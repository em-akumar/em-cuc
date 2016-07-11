import template from './templates/checkbox.html';
import controller from './checkbox.controller';

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
