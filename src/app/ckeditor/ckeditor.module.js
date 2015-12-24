import {angular} from 'ems';

import ckeditorComponent from './ckeditor.component';
import CkeditorService from './ckeditor.service';

let ckeditorModule = angular.module('ckeditor', []);


ckeditorModule.config(($stateProvider) => {
  $stateProvider.state('ckeditor', {
    url: '/ckeditor',
    template: '<ckeditor-component></ckeditor-component>'
  });
});

ckeditorModule.directive('ckeditorComponent', ckeditorComponent);
ckeditorModule.service('CkeditorService', CkeditorService);

export default ckeditorModule;
