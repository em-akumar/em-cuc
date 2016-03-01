import angular from 'angular';
import {uiRouter} from 'ems';

import dropdownComponent from './dropdown.component';
import DropdownService from './dropdown.service';
import dropdownDefaultTemplate from './templates/dropdown-default.html';
import dropdownSizeTemplate from './templates/dropdown-size.html';
import dropdownStatesTemplate from './templates/dropdown-states.html';
import dropdownErrorTemplate from './templates/dropdown-error-handling.html';

let dropdownModule = angular.module('dropdown', []);

dropdownModule.config(($stateProvider) => {
  $stateProvider.state('dropdown', {
    url: '/dropdown',
    template: '<dropdown-component></dropdown-component>'
  });
});

dropdownModule.directive('dropdownComponent', dropdownComponent);
dropdownModule.service('DropdownService', DropdownService);

dropdownModule.directive('dropdownDefault', () => {
  return {
    template: dropdownDefaultTemplate
  };
});

dropdownModule.directive('dropdownSize', () => {
  return {
    template: dropdownSizeTemplate
  };
});

dropdownModule.directive('dropdownStates', () => {
  return {
    template: dropdownStatesTemplate
  };
});

dropdownModule.directive('dropdownError', () => {
  return {
    template: dropdownErrorTemplate
  };
});

export default dropdownModule;
