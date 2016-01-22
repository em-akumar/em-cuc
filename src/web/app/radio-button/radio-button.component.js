import template from './radio-button.html';
import controller from './radio-button.controller';
import './radio-button.less';

let radioButtonComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default radioButtonComponent;
