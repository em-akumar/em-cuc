import {angular, uiRouter} from 'ems';

import checkboxComponent from './checkbox.component';
import CheckboxService from './checkbox.service';

let checkboxModule = angular.module('checkbox', [uiRouter]);

checkboxModule.config(($stateProvider) => {
  $stateProvider.state('checkbox', {
    url: '/checkbox',
    template: '<checkbox-component></checkbox-component>'
  });
});

checkboxModule.directive('checkboxComponent', checkboxComponent);
checkboxModule.service('CheckboxService', CheckboxService);

export default checkboxModule;
