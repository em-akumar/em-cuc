import angular from 'angular';
import {uiRouter} from 'ems/core';

import tooltipsComponent from './tooltips.component';
import TooltipsService from './tooltips.service';

let tooltipsModule = angular.module('radioButton', [uiRouter]);

tooltipsModule.config(($stateProvider) => {
  $stateProvider.state('tooltips', {
    url: '/tooltips',
    template: '<tooltips-component></tooltips-component>'
  });
});

tooltipsModule.directive('tooltipsComponent', tooltipsComponent);
tooltipsModule.service('TooltipsService', TooltipsService);

export default tooltipsModule;
