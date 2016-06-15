import template from './modals.html';
import controller from './modals.controller';
import './modals.less';

let modalsComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default modalsComponent;
