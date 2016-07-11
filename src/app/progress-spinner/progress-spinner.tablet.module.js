import angular from 'angular';
import {uiRouter} from 'ems/core';

import progressSpinnerTabletComponent from './progress-spinner.tablet.component';
import ProgressspinnerService from './progress-spinner.service';

let progressSpinnerTabletModule = angular.module('progressSpinner', [uiRouter]);

progressSpinnerTabletModule.config(($stateProvider) => {
  $stateProvider.state('progress-spinner-tablet', {
    url: '/progress-spinner-tablet',
    template: '<progress-spinner-tablet-component></progress-spinner-tablet-component>'
  });
});

progressSpinnerTabletModule.directive('progressSpinnerTabletComponent', progressSpinnerTabletComponent);
progressSpinnerTabletModule.service('ProgressspinnerService', ProgressspinnerService);

export default progressSpinnerTabletModule;

