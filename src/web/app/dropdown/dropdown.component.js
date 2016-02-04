import template from './dropdown.html';
import controller from './dropdown.controller';
import './dropdown.less';

let dropdownComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default dropdownComponent;
