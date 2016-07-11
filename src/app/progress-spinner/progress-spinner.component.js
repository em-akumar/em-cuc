import template from './templates/progress-spinner.html';
import controller from './progress-spinner.controller';

let progressSpinnerComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default progressSpinnerComponent;
