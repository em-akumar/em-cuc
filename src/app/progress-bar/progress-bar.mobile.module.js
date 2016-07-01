import angular from 'angular';
import {uiRouter} from 'ems/core';

import progressBarMobileComponent from './progress-bar.mobile.component';
import ProgressBarService from './progress-bar.service';

let progressBarMobileModule = angular.module('progressBar', [uiRouter]);

progressBarMobileModule.config(($stateProvider) => {
  $stateProvider.state('progress-bar-mobile', {
    url: '/progress-bar-mobile',
    template: '<progress-bar-mobile-component></progress-bar-mobile-component>'
  });
});

progressBarMobileModule.directive('progressBarMobileComponent', progressBarMobileComponent);
progressBarMobileModule.service('ProgressBarService', ProgressBarService);

export default progressBarMobileModule;
