import angular from 'angular';
import {uiRouter} from 'ems/core';

import radioComponent from './radio.component';
import radioService  from './radio.service';

let radioModule = angular.module('radio', [uiRouter]);

radioModule.config(($stateProvider) => {
  $stateProvider.state('radio', {
    url: '/radio',
    template: '<radio-component></radio-component>'
  });
});

radioModule.directive('radioComponent', radioComponent);
radioModule.service('radioService', radioService);

export default radioModule;
