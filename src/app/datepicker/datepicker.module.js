import angular from 'angular';
import {uiRouter} from 'ems/core';

import datepickerComponent from './datepicker.component';
import datepickerDateTimeTemplate from './templates/datepicker-date-time.html';
import datepickerDateTimeAutoTemplate from './templates/datepicker-date-time-auto.html';
import datepickerDateTemplate from './templates/datepicker-date.html';
import datepickerTimeTemplate from './templates/datepicker-time.html';
import datepickerDateTimeDisabledTemplate from './templates/datepicker-date-time-disabled.html';

let datepickerModule = angular.module('datepicker', [uiRouter]);

datepickerModule.config(($stateProvider) => {
  $stateProvider.state('datepicker', {
    url: '/datepicker',
    template: '<datepicker-component></datepicker-component>'
  });
});

datepickerModule.directive('datepickerComponent', datepickerComponent);

datepickerModule.directive('datepickerDateTime', () => {
  return {
    template: datepickerDateTimeTemplate
  };
});

datepickerModule.directive('datepickerDateTimeAuto', () => {
  return {
    template: datepickerDateTimeAutoTemplate
  };
});

datepickerModule.directive('datepickerDate', () => {
  return {
    template: datepickerDateTemplate
  };
});

datepickerModule.directive('datepickerTime', () => {
  return {
    template: datepickerTimeTemplate
  };
});

datepickerModule.directive('datepickerDateTimeDisabled', () => {
  return {
    template: datepickerDateTimeDisabledTemplate
  };
});

export default datepickerModule;
