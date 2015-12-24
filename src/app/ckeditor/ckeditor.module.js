import {angular} from 'ems';

import ckeditorComponent from './ckeditor.component';
import CkeditorService from './ckeditor.service';

let ckeditorModule = angular.module('ckeditor', []);

ckeditorModule.directive('ckeditorComponent', ckeditorComponent);
ckeditorModule.service('CkeditorService', CkeditorService);

export default ckeditorModule;
