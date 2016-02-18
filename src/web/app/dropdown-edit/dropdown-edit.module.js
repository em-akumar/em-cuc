import angular from 'angular';
import {uiRouter} from 'ems';

import dropdownEditComponent from './dropdown-edit.component';
import DropdownEditService from './dropdown-edit.service';

let dropdownEditModule = angular.module('dropdownEdit', []);

dropdownEditModule.config(($stateProvider) => {
  $stateProvider.state('dropdown-edit', {
    url: '/dropdown-edit',
    template: '<dropdown-edit-component></dropdown-edit-component>'
  });
});

dropdownEditModule.directive('dropdownEditComponent', dropdownEditComponent);
dropdownEditModule.service('DropdownEditService', DropdownEditService);

export default dropdownEditModule;
