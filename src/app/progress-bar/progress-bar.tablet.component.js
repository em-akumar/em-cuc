import template from './templates/progress-bar-tablet.html';
import controller from './progress-bar.controller';

let progressBarTabletComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default progressBarTabletComponent;
