import template from './text-input-tablet.html';
import controller from './text-input.controller';
import './text-input.less';

let textInputTabletComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default textInputTabletComponent;
