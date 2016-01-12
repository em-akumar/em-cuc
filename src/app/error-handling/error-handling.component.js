import template from './error-handling.html';
import controller from './error-handling.controller';
import './error-handling.less';

let errorHandlingComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default errorHandlingComponent;
