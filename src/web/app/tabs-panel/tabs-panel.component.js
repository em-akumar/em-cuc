import template from './tabs-panel.html';
import controller from './tabs-panel.controller';
import './tabs-panel.less';

let tabsPanelComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default tabsPanelComponent;
