import template from './radio.html';
import controller from './radio.controller';

let radioComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default radioComponent;
