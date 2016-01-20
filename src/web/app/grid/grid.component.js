import template from './grid.html';
import controller from './grid.controller';
import './grid.less';

let gridComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default gridComponent;
