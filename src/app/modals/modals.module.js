import angular from 'angular';
import {uiRouter} from 'ems/core';

import modalsComponent from './modals.component';
import modalsService from './modals.service';

let modalsModule = angular.module('modals', [uiRouter]);

modalsModule.config(($stateProvider) => {
  $stateProvider.state('modals', {
    url: '/modals',
    template: '<modals-component></modals-component>'
  });
});

modalsModule.directive('modalsComponent', modalsComponent);
modalsModule.service('modalsService', modalsService);

export default modalsModule;
