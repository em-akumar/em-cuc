import template from './templates/blockui.html';
import controller from './blockui.controller';

let blockuiComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default blockuiComponent;
