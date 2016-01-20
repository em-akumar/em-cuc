import template from './modal.html';
import controller from './modal.controller';
import './modal.less';

let modalComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default modalComponent;
