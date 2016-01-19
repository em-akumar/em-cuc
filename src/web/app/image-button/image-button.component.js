import template from './image-button.html';
import controller from './image-button.controller';
import './image-button.less';

let imageButtonComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default imageButtonComponent;
