import angular from 'angular';
import {uiRouter} from 'ems';

import textInputComponent from './text-input.component';
import TextInputService from './text-input.service';

import sizeTemplate from './templates/text-input-size.html';
import statesTemplate from './templates/text-input-states.html';
import errorHandlingTemplate from './templates/text-input-error-handling.html';
import withLabelTemplate from './templates/text-input-with-label.html';
import withIconTemplate from './templates/text-input-with-icon.html';
import labelWrappingTemplate from './templates/text-input-label-wrapping.html';
import maskingTemplate from './templates/text-input-masking.html';

let textInputModule = angular.module('textInput', [uiRouter]);

textInputModule.config(($stateProvider) => {
  $stateProvider.state('text-input', {
    url: '/text-input',
    template: '<text-input-component></text-input-component>'
  });
});

textInputModule.directive('textInputComponent', textInputComponent);
textInputModule.service('TextInputService', TextInputService);

textInputModule.directive('textInputSize', () => {
  return {
    template: sizeTemplate
  };
});

textInputModule.directive('textInputStates', () => {
  return {
    template: statesTemplate
  };
});

textInputModule.directive('textInputErrorHandling', () => {
  return {
    template: errorHandlingTemplate
  };
});

textInputModule.directive('textInputLabel', () => {
  return {
    template: withLabelTemplate
  };
});

textInputModule.directive('textInputWithIcon', () => {
  return {
    template: withIconTemplate
  };
});

textInputModule.directive('textInputLabelWrapping', () => {
  return {
    template: labelWrappingTemplate
  };
});

textInputModule.directive('textInputMasking', () => {
  return {
    template: maskingTemplate
  };
});

export default textInputModule;
