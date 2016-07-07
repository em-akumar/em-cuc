import angular from 'angular';
import uiRouter from 'angular-ui-router';

import iconsComponent from './icons.component';
import IconsService from './icons.service';

let iconsModule = angular.module('icons', [uiRouter]);

iconsModule.config(($stateProvider) => {
  $stateProvider.state('icons', {
    url: '/icons',
    template: '<icons-component></icons-component>'
  });
});

iconsModule.directive('iconsComponent', iconsComponent);
iconsModule.service('IconsService', IconsService);

export default iconsModule;
