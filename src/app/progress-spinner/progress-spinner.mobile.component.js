import template from './templates/progress-spinner-mobile.html';
import controller from './progress-spinner.controller';

let progressSpinnerMobileComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default progressSpinnerMobileComponent;
