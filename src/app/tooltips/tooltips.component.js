import template from './tooltips.html';
import controller from './tooltips.controller';
import './tooltips.less';

let tooltipsComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default tooltipsComponent;
