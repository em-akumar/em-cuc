import template from './demo.html';
import controller from './demo.controller';
// import './demo.less'; <-- imports are in app.less

let demoComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default demoComponent;
