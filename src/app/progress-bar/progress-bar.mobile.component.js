import template from './templates/progress-bar-mobile.html';
import controller from './progress-bar.controller';

let progressBarMobileComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default progressBarMobileComponent;
