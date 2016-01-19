import template from './buttons.html';
import controller from './buttons.controller';
import './buttons.less';

let buttonsComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default buttonsComponent;
