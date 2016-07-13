import angular from 'angular';
import {uiRouter} from 'ems/core';

import ckeditorComponent from './ckeditor.component';
import ckeditorAllTemplate from './templates/ckeditor-all.html';
import ckeditorMiniTemplate from './templates/ckeditor-mini.html';

let ckeditorModule = angular.module('ckeditor', [uiRouter]);

ckeditorModule.config(($stateProvider) => {
  $stateProvider.state('ckeditor', {
    url: '/ckeditor',
    template: '<ckeditor-component></ckeditor-component>'
  });
});

ckeditorModule.directive('ckeditorComponent', ckeditorComponent);

ckeditorModule.directive('ckeditorAll', () => {
  return {
    template: ckeditorAllTemplate
  };
});

ckeditorModule.directive('ckeditorMini', () => {
  return {
    template: ckeditorMiniTemplate
  };
});

export default ckeditorModule;
