import template from './templates/checkbox-tablet.html';
import controller from './checkbox.controller';

let checkboxTabletComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default checkboxTabletComponent;
