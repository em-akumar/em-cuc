import template from './icons.html';
import controller from './icons.controller';
import './demo.css';
import './demo.js';

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
