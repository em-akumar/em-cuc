import template from './paragraph.html';
import controller from './paragraph.controller';
import './paragraph.less';

let paragraphComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default paragraphComponent;
