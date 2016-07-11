import angular from 'angular';
import uiRouter from 'angular-ui-router';

import checkboxTabletComponent from './checkbox.tablet.component';
import CheckboxService from './checkbox.service';

let checkboxModule = angular.module('checkbox', [uiRouter]);

checkboxModule.config(($stateProvider) => {
  $stateProvider.state('checkbox-tablet', {
    url: '/checkbox-tablet',
    template: '<checkbox-tablet-component></checkbox-tablet-component>'
  });
});

checkboxModule.directive('checkboxTabletComponent', checkboxTabletComponent);
checkboxModule.service('CheckboxService', CheckboxService);

export default checkboxModule;
