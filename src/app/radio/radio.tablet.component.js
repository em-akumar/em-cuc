import template from './templates/radio-tablet.html';
import controller from './radio.controller';

let radioTabletComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default radioTabletComponent;
