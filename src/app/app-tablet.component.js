import template from './app-tablet.html';
import controller from './app.controller.js';
import './app.less';

let appTabletComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default appTabletComponent;
