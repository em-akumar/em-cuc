import angular from 'angular';
import uiRouter from 'angular-ui-router';

import appComponent from './app.component';
import AppService from './app.service';

import 'cuc/cuc.angular';
import '@elliemae/em-field-formatters/dist/web/fieldFormatters';
import 'cuc/cuc.ui.bootstrap';
import 'cuc/cuc.grid';
import 'angular-messages';
import 'angular-ui-mask/dist/mask.js';
import '../common/utils/codepen';
import 'cuc/cuc.block.ui';

import blockui from './blockui/blockui.module';
import buttons from './buttons/buttons.module';
import textInput from './text-input/text-input.module';
import textArea from './text-area/text-area.module';
import fileUploader from './file-uploader/file-uploader.module';
import grid from './grid/grid.module';
import dropdown from './dropdown/dropdown.module';
import dropdownEdit from './dropdown-edit/dropdown-edit.module';
import colorPicker from './color-picker/color-picker.module';
import ckeditor from './ckeditor/ckeditor.module';
import modals from './modals/modals.module';
import datepicker from './datepicker/datepicker.module';
import checkbox from './checkbox/checkbox.module';
import panel from './panel/panel.module';
import errorHandling from './error-handling/error-handling.module';
import imageButton from './image-button/image-button.module';
import notifications from './notifications/notifications.module';
import radio from './radio/radio.module';
import toggleSwitch from './toggle-switch/toggle-switch.module';
import tooltips from './tooltips/tooltips.module';
import progressSpinner from './progress-spinner/progress-spinner.module';
import progressBar from './progress-bar/progress-bar.module';
import paragraph from './paragraph/paragraph.module';
import reodropdownT from './reo-dropdown-t/reo-dropdown-t.module';
import icons from './icons/icons.module';

let appModule = angular.module('app', [ uiRouter, 'cuc', 'fieldFormatters', 'ui.grid', 'ui.bootstrap', 'ngMessages', 'ui.mask',
  buttons.name, textInput.name, textArea.name, fileUploader.name, dropdownEdit.name, grid.name, dropdown.name,
  colorPicker.name, modals.name, datepicker.name, checkbox.name, panel.name, errorHandling.name, imageButton.name,
  notifications.name, radio.name, toggleSwitch.name, tooltips.name, ckeditor.name, blockui.name,
  progressSpinner.name, progressBar.name, paragraph.name, reodropdownT.name, icons.name]);

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
  angular.bootstrap(document, [ appModule.name ], {
    strictDi: true
  });
});

export default appModule;

