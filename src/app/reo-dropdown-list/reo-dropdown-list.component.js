/**
 * Created by kmurudkar on 7/25/2016.
 */
import template from './templates/reo-dropdown-list.html';
import controller from './reo-dropdown-list.controller';

let reoDropdownListComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default reoDropdownListComponent;

