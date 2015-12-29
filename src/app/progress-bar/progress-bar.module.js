import {angular, uiRouter} from 'ems';

import progressBarComponent from './progress-bar.component';
import ProgressBarService from './progress-bar.service';

let progressBarModule = angular.module('progressBar', [uiRouter]);

progressBarModule.config(($stateProvider) => {
  $stateProvider.state('progress-bar', {
    url: '/progress-bar',
    template: '<progress-bar-component></progress-bar-component>'
  });
});

progressBarModule.directive('progressBarComponent', progressBarComponent);
progressBarModule.service('ProgressBarService', ProgressBarService);

export default progressBarModule;
