import angular from 'angular';

import dropdownEditComponent from './dropdown-edit.component';
import DropdownEditService from './dropdown-edit.service';

import dropdownEditDefaultTemplate from './templates/dropdown-edit-default.html';
import dropdownEditSizeTemplate from './templates/dropdown-edit-size.html';
import dropdownEditStatesTemplate from './templates/dropdown-edit-states.html';
import dropdownEditErrorTemplate from './templates/dropdown-edit-error-handling.html';

let dropdownEditModule = angular.module('dropdownEdit', []);

dropdownEditModule.config(($stateProvider) => {
  $stateProvider.state('dropdown-edit', {
    url: '/dropdown-edit',
    template: '<dropdown-edit-component></dropdown-edit-component>'
  });
});

dropdownEditModule.directive('dropdownEditComponent', dropdownEditComponent);
dropdownEditModule.service('DropdownEditService', DropdownEditService);

dropdownEditModule.directive('dropdownEditDefault', () => {
  return {
    template: dropdownEditDefaultTemplate
  };
});

dropdownEditModule.directive('dropdownEditSize', () => {
  return {
    template: dropdownEditSizeTemplate
  };
});

dropdownEditModule.directive('dropdownEditStates', () => {
  return {
    template: dropdownEditStatesTemplate
  };
});

dropdownEditModule.directive('dropdownEditError', () => {
  return {
    template: dropdownEditErrorTemplate
  };
});

export default dropdownEditModule;
