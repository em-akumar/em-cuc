import template from './templates/progress-bar.html';
import controller from './progress-bar.controller';

let progressBarComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default progressBarComponent;
