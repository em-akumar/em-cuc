import template from './text-input-mobile.html';
import controller from './text-input.controller';
import './text-input.less';

let textInputMobileComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default textInputMobileComponent;
