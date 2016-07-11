import angular from 'angular';
import {uiRouter} from 'ems/core';

import radioComponent from './radio.component';
import RadioService from './radio.service';

let radioModule = angular.module('radio', [uiRouter]);

radioModule.config(($stateProvider) => {
  $stateProvider.state('radio', {
    url: '/radio',
    template: '<radio-component></radio-component>'
  });
});

radioModule.directive('radioComponent', radioComponent);
radioModule.service('RadioService', RadioService);

export default radioModule;
