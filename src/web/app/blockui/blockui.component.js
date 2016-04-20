import template from './blockui.html';
import controller from './blockui.controller';
import './blockui.less';

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