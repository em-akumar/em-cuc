import angular from 'angular';
import {uiRouter} from 'ems/core';

import reoDropdownListComponent from './reo-dropdown-list.component';

let reoDropdownListModule = angular.module('reoDropdownList', [uiRouter]);

reoDropdownListModule.config(($stateProvider) => {
  $stateProvider.state('reo-dropdown-list', {
    url: '/reo-dropdown-list',
    template: '<reo-dropdown-list-component></reo-dropdown-list-component>'
  });
});

reoDropdownListModule.directive('reoDropdownListComponent', reoDropdownListComponent);


export default reoDropdownListModule;
