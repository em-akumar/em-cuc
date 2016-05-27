import template from './progress-spinner.html';
import controller from './progress-spinner.controller';
import './progress-spinner.less';

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
