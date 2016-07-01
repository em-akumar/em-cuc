import angular from 'angular';
import {uiRouter} from 'ems/core';

import progressSpinnerMobileComponent from './progress-spinner.mobile.component';
import ProgressspinnerService from './progress-spinner.service';

let progressSpinnerMobileModule = angular.module('progressSpinner', [uiRouter]);

progressSpinnerMobileModule.config(($stateProvider) => {
  $stateProvider.state('progress-spinner-mobile', {
    url: '/progress-spinner-mobile',
    template: '<progress-spinner-mobile-component></progress-spinner-mobile-component>'
  });
});

progressSpinnerMobileModule.directive('progressSpinnerMobileComponent', progressSpinnerMobileComponent);
progressSpinnerMobileModule.service('ProgressspinnerService', ProgressspinnerService);

export default progressSpinnerMobileModule;

