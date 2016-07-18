import angular from 'angular';
import {uiRouter} from 'ems/core';

import textInputTabletComponent from './text-input.tablet.component';
import TextInputService from './text-input.service';

let textInputTabletModule = angular.module('textInput', [uiRouter]);

textInputTabletModule.config(($stateProvider) => {
  $stateProvider.state('text-input-tablet', {
    url: '/text-input-tablet',
    template: '<text-input-tablet-component></text-input-tablet-component>'
  });
});

textInputTabletModule.directive('textInputTabletComponent', textInputTabletComponent);
textInputTabletModule.service('TextInputService', TextInputService);

export default textInputTabletModule;
