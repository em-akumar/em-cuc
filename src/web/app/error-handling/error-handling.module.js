import {angular, uiRouter} from 'ems';

import errorHandlingComponent from './error-handling.component';
import ErrorHandlingService from './error-handling.service';

let errorHandlingModule = angular.module('errorHandling', [uiRouter, 'ngMessages']);

errorHandlingModule.config(($stateProvider) => {
  $stateProvider.state('error-handling', {
    url: '/error-handling',
    template: '<error-handling-component></error-handling-component>'
  });
});

errorHandlingModule.directive('errorHandlingComponent', errorHandlingComponent);
errorHandlingModule.service('ErrorHandlingService', ErrorHandlingService);

export default errorHandlingModule;
