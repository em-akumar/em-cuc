import template from './toggle-switch.html';
import controller from './toggle-switch.controller';
import './toggle-switch.less';

let toggleSwitchComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default toggleSwitchComponent;
