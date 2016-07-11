import template from './panel.html';
import controller from './panel.controller';
import './panel.less';

let panelComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default panelComponent;
