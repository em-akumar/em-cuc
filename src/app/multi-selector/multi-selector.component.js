/**
 * Created by kmurudkar on 7/25/2016.
 */
import template from './templates/multi-selector.html';
import controller from './multi-selector.controller';

let multiSelectorComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default multiSelectorComponent;

