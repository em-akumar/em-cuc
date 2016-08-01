import angular from 'angular';
import {uiRouter} from 'ems/core';

import multiSelectorComponent from './multi-selector.component';

let multiSelectorModule = angular.module('multiSelector', [uiRouter]);

multiSelectorModule.config(($stateProvider) => {
  $stateProvider.state('multi-selector', {
    url: '/multi-selector',
    template: '<multi-selector-component></multi-selector-component>'
  });
});

multiSelectorModule.directive('multiSelectorComponent', multiSelectorComponent);


export default multiSelectorModule;
