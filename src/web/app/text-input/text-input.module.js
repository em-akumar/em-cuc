import {angular, uiRouter} from 'ems';

import textInputComponent from './text-input.component';
import TextInputService from './text-input.service';

let textInputModule = angular.module('textInput', [uiRouter]);

textInputModule.config(($stateProvider) => {
  $stateProvider.state('text-input', {
    url: '/text-input',
    template: '<text-input-component></text-input-component>'
  });
});

textInputModule.directive('textInputComponent', textInputComponent);
textInputModule.service('TextInputService', TextInputService);

export default textInputModule;
