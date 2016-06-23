import angular from 'angular';
import {uiRouter} from 'ems/core';

import radioTabletComponent from './radio.tablet.component';
import RadioService from './radio.service';

let radioModule = angular.module('radio', [uiRouter]);

radioModule.config(($stateProvider) => {
  $stateProvider.state('radio-tablet', {
    url: '/radio-tablet',
    template: '<radio-tablet-component></radio-tablet-component>'
  });
});

radioModule.directive('radioTabletComponent', radioTabletComponent);
radioModule.service('RadioService', RadioService);

export default radioModule;
