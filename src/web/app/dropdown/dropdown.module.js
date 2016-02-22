import angular from 'angular';
import {uiRouter} from 'ems';

import dropdownComponent from './dropdown.component';
import DropdownService from './dropdown.service';

let dropdownModule = angular.module('dropdown', []);

dropdownModule.config(($stateProvider) => {
  $stateProvider.state('dropdown', {
    url: '/dropdown',
    template: '<dropdown-component></dropdown-component>'
  });
});

dropdownModule.directive('dropdownComponent', dropdownComponent);
dropdownModule.service('DropdownService', DropdownService);

export default dropdownModule;
