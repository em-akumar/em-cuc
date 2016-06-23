import template from './buttons.tablet.html';
import controller from './buttons.controller';

let buttonsTabletComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default buttonsTabletComponent;
