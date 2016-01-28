import {angular, uiRouter, emsApi} from 'ems';

import appComponent from './app.component';
import AppService from './app.service';

import '../favicon.ico';

import {cuc} from '../cuc/cuc.angular';
import '../cuc/cuc.ui.bootstrap';
import '../cuc/cuc.grid';
import 'angular-messages/angular-messages.js';
import 'angular-ui-mask/dist/mask.js';
import './app.less';
import '../common/utils/codepen';

import buttons from './buttons/buttons.module';
import textInput from './text-input/text-input.module';
import textArea from './text-area/text-area.module';
import fileUploader from './file-uploader/file-uploader.module';
import dropdownEdit from './dropdown-edit/dropdown-edit.module';
import grid from './grid/grid.module';
import dropdown from './dropdown/dropdown.module';
import colorPicker from './color-picker/color-picker.module';
import modal from './modal/modal.module';
import datepicker from './datepicker/datepicker.module';
import checkbox from './checkbox/checkbox.module';
import panel from './panel/panel.module';
import errorHandling from './error-handling/error-handling.module';
import imageButton from './image-button/image-button.module';
import notifications from './notifications/notifications.module';

emsApi.baseUrl = 'http://localhost:9000/';

let appModule = angular.module('app', [uiRouter, cuc.name, 'cuc', 'ui.grid', 'ui.bootstrap',
  'ngMessages', 'ui.mask', buttons.name, textInput.name, textArea.name, fileUploader.name, dropdownEdit.name, grid.name, dropdown.name, colorPicker.name, modal.name, datepicker.name, checkbox.name, panel.name, errorHandling.name, imageButton.name, notifications.name]);

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

