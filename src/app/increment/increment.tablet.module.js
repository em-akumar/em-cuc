import angular from 'angular';
import {uiRouter} from 'ems/core';

import incrementTabletComponent from './increment.tablet.component';
import IncrementService from './increment.service';

let incrementModule = angular.module('increment', [uiRouter]);

incrementModule.config(($stateProvider) => {
  $stateProvider.state('increment-tablet', {
    url: '/increment-tablet',
    template: '<increment-tablet-component></increment-tablet-component>'
  });
});

incrementModule.directive('incrementTabletComponent', incrementTabletComponent);
incrementModule.service('IncrementService', IncrementService);

export default incrementModule;
