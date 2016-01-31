import {angular, uiRouter} from 'ems';

import textAreaComponent from './text-area.component';
import TextAreaService from './text-area.service';

import textAreaSize from './templates/text-area-size.html';
import textAreaStates from './templates/text-area-states.html';
import textAreaResize from './templates/text-area-resize.html';
import textAreaLabel from './templates/text-area-label.html';
let textAreaModule = angular.module('textArea', [uiRouter]);

textAreaModule.config(($stateProvider) => {
  $stateProvider.state('text-area', {
    url: '/text-area',
    template: '<text-area-component></text-area-component>'
  });
});

textAreaModule.directive('textAreaSize', () => {
  return {
    template: textAreaSize
  };
});
textAreaModule.directive('textAreaStates', () => {
  return {
    template: textAreaStates
  };
});
textAreaModule.directive('textAreaResize', () => {
  return {
    template: textAreaResize
  };
});
textAreaModule.directive('textAreaLabel', () => {
  return {
    template: textAreaLabel
  };
});
textAreaModule.directive('textAreaComponent', textAreaComponent);
textAreaModule.service('TextAreaService', TextAreaService);

export default textAreaModule;
