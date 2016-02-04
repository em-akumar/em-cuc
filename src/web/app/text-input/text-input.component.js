import template from './text-input.html';
import controller from './text-input.controller';
import './text-input.less';

let textInputComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default textInputComponent;
