import angular from 'angular';
import {uiRouter} from 'ems/core';

import textInputMobileComponent from './text-input.mobile.component';
import TextInputService from './text-input.service';

let textInputMobileModule = angular.module('textInput', [uiRouter]);

textInputMobileModule.config(($stateProvider) => {
  $stateProvider.state('text-input-mobile', {
    url: '/text-input-mobile',
    template: '<text-input-mobile-component></text-input-mobile-component>'
  });
});

textInputMobileModule.directive('textInputMobileComponent', textInputMobileComponent);
textInputMobileModule.service('TextInputService', TextInputService);

export default textInputMobileModule;
