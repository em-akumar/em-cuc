import template from './app-mobile.html';
import controller from './app.controller.js';
import './app.less';

let appMobileComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default appMobileComponent;
