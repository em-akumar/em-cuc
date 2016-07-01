import template from './progress-spinner-tablet.html';
import controller from './progress-spinner.controller';

let progressSpinnerTabletComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default progressSpinnerTabletComponent;
