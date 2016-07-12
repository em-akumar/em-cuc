import angular from 'angular';

import {uiRouter} from 'ems/core';
import ParagraphComponent from './paragraph.component';
import ParagraphService from './paragraph.service';

let paragraphModule = angular.module('paragraph', [uiRouter]);
import paragraphDisabled from './templates/paragraph-disabled.html';
import paragraphShow from './templates/paragraph-show.html';

paragraphModule.config(($stateProvider) => {
  $stateProvider.state('paragraph', {
    url: '/paragraph',
    template: '<paragraph-component></paragraph-component>'
  });
});

paragraphModule.directive('paragraphDisabled', function () {
  return {
    template: paragraphDisabled
  };
});

paragraphModule.directive('paragraphShow', function () {
  return {
    template: paragraphShow
  };
});

paragraphModule.directive('paragraphComponent', ParagraphComponent);
paragraphModule.service('ParagraphService', ParagraphService);

export default paragraphModule;
