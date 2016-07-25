/**
 * Created by kmurudkar on 7/25/2016.
 */

import template from './templates/reo-dropdown.mobile.html';
import controller from './reo-dropdown.controller.js';

let reoDropdownListComponent = () => {
  return {
    restrict: 'E',
    scope: {
      title: '@',
      onchange: '&',
      selected: '=?',
      options: '='
    },
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default reoDropdownListComponent;

