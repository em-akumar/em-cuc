import template from './buttons.html';
import controller from './buttons.controller';

let buttonsComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default buttonsComponent;
