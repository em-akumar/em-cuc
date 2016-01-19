import {angular, uiRouter} from 'ems';

import textAreaComponent from './text-area.component';
import TextAreaService from './text-area.service';

let textAreaModule = angular.module('textArea', [uiRouter]);

textAreaModule.config(($stateProvider) => {
  $stateProvider.state('text-area', {
    url: '/text-area',
    template: '<text-area-component></text-area-component>'
  });
});

textAreaModule.directive('textAreaComponent', textAreaComponent);
textAreaModule.service('TextAreaService', TextAreaService);

export default textAreaModule;
