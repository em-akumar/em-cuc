import template from './icons.html';
import controller from './icons.controller';
import './demo.css';

let iconsComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default iconsComponent;
