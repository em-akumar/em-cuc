/**
 * Created by kmurudkar on 7/25/2016.
 */

import template from './templates/multi-selector.mobile.html';
import controller from './multi-selector.controller.js';

let multiSelectorComponent = () => {
  return {
    restrict: 'E',
    scope: {
      title: '@',
      onDone: '&',
      selected: '=?',
      options: '=',
      required: '@'
    },
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default multiSelectorComponent;

