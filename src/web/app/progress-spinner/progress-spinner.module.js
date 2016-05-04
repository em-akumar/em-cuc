import angular from 'angular';
import {uiRouter} from 'ems/core';

import progressSpinnerComponent from './progress-spinner.component';
import ProgressSpinnersService from './progress-spinner.service';

let progressSpinnerModule = angular.module('progressSpinner', [uiRouter]);

progressSpinnerModule.config(($stateProvider) => {
  $stateProvider.state('progress-spinner', {
    url: '/progress-spinner',
    template: '<progress-spinner-component></progress-spinner-component>'
  });
});

progressSpinnerModule.directive('progressSpinnerComponent', progressSpinnerComponent);
progressSpinnerModule.service('ProgressSpinnersService', ProgressSpinnersService);

export default progressSpinnerModule;

