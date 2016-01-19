import {angular, uiRouter} from 'ems';

import datepickerComponent from './datepicker.component';
import DatepickerService from './datepicker.service';

let datepickerModule = angular.module('datepicker', [uiRouter]);

datepickerModule.config(($stateProvider) => {
  $stateProvider.state('datepicker', {
    url: '/datepicker',
    template: '<datepicker-component></datepicker-component>'
  });
});

datepickerModule.directive('datepickerComponent', datepickerComponent);
datepickerModule.service('DatepickerService', DatepickerService);

export default datepickerModule;
