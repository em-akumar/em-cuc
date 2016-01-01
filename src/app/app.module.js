import {angular, uiRouter, emsApi} from 'ems';

import appComponent from './app.component';
import AppService from './app.service';

import '../favicon.ico';

import {cuc} from '../cuc/cuc.angular';
import '../cuc/cuc.ui.bootstrap';
import '../cuc/cuc.grid';
import '../cuc/cuc.ckeditor';
import './app.less';

import buttons from './buttons/buttons.module.js';
import textInput from './text-input/text-input.module.js';
import textArea from './text-area/text-area.module.js';

import fileUploader from './file-uploader/file-uploader.module.js';
import dropdownEdit from './dropdown-edit/dropdown-edit.module.js';
import grid from './grid/grid.module.js';
import dropdown from './dropdown/dropdown.module.js';
import colorPicker from './color-picker/color-picker.module.js';
import modal from './modal/modal.module.js';
import datepicker from './datepicker/datepicker.module.js';
import ckeditor from './ckeditor/ckeditor.module.js';

emsApi.baseUrl = 'http://localhost:9000/';

let appModule = angular.module('app', [uiRouter, cuc.name, 'cuc', 'ui.grid',
  'ui.bootstrap', buttons.name, textInput.name, textArea.name, fileUploader.name, dropdownEdit.name,
  grid.name, dropdown.name, colorPicker.name, modal.name, datepicker.name, ckeditor.name]);

appModule.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('app', {
    url: '/',
    template: '<app-component></app-component>'
  });
  $urlRouterProvider.otherwise('');
});

appModule.directive('appComponent', appComponent);
appModule.service('AppService', AppService);

angular.element(document).ready(() => {
  angular.bootstrap(document, [appModule.name], {
    strictDi: true
  });
});

export default appModule;

