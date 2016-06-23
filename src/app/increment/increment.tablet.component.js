import template from './increment-tablet.html';
import controller from './increment.controller';

let incrementTabletComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default incrementTabletComponent;
