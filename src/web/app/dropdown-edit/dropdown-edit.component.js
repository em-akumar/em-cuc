import template from './dropdown-edit.html';
import controller from './dropdown-edit.controller';
import './dropdown-edit.less';

let dropdownEditComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default dropdownEditComponent;
