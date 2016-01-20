import template from './text-area.html';
import controller from './text-area.controller';
import './text-area.less';

let textAreaComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default textAreaComponent;
