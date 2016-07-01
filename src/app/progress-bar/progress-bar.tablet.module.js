import angular from 'angular';
import {uiRouter} from 'ems/core';

import progressBarTabletComponent from './progress-bar.tablet.component';
import ProgressBarService from './progress-bar.service';

let progressBarTabletModule = angular.module('progressBar', [uiRouter]);

progressBarTabletModule.config(($stateProvider) => {
  $stateProvider.state('progress-bar-tablet', {
    url: '/progress-bar-tablet',
    template: '<progress-bar-tablet-component></progress-bar-tablet-component>'
  });
});

progressBarTabletModule.directive('progressBarTabletComponent', progressBarTabletComponent);
progressBarTabletModule.service('ProgressBarService', ProgressBarService);

export default progressBarTabletModule;
