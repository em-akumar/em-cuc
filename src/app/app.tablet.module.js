import angular from 'angular';
import uiRouter from 'angular-ui-router';

import appTabletComponent from './app-tablet.component';
import AppService from './app.service';

import 'cuc/cuc.angular';
import 'cuc/cuc.ui.bootstrap';
import 'cuc/cuc.grid';
import 'angular-messages';
import 'angular-ui-mask/dist/mask.js';
import '../common/utils/codepen';
import 'cuc/cuc.block.ui';

import blockui from './blockui/blockui.module';
import buttonsTablet from './buttons/buttons.tablet.module';
import checkboxTablet from './checkbox/checkbox.tablet.module';
import radioTablet from './radio/radio.tablet.module';
import incrementTablet from './increment/increment.tablet.module';
import textInput from './text-input/text-input.module';
import textArea from './text-area/text-area.module';
import fileUploader from './file-uploader/file-uploader.module';
import grid from './grid/grid.module';
import dropdown from './dropdown/dropdown.module';
import dropdownEdit from './dropdown-edit/dropdown-edit.module';
import colorPicker from './color-picker/color-picker.module';
import ckEditor from './ckEditor/ckEditor.module';
import modal from './modal/modal.module';
import datepicker from './datepicker/datepicker.module';
import panel from './panel/panel.module';
import errorHandling from './error-handling/error-handling.module';
import imageButton from './image-button/image-button.module';
import notifications from './notifications/notifications.module';

import toggleSwitch from './toggle-switch/toggle-switch.module';
import tooltips from './tooltips/tooltips.module';
import progressSpinner from './progress-spinner/progress-spinner.module';
import progressBar from './progress-bar/progress-bar.module';
import paragraph from './paragraph/paragraph.module';
import reodropdownT from './reo-dropdown-t/reo-dropdown-t.module';

let appTabletModule = angular.module('app', [ uiRouter, 'cuc', 'ui.grid', 'ui.bootstrap', 'ngMessages', 'ui.mask',
  buttonsTablet.name, textInput.name, incrementTablet.name, textArea.name, fileUploader.name, dropdownEdit.name, grid.name, dropdown.name,
  colorPicker.name, modal.name, datepicker.name, checkboxTablet.name, panel.name, errorHandling.name, imageButton.name,
  notifications.name, radioTablet.name, toggleSwitch.name, tooltips.name, ckEditor.name, blockui.name,
  progressSpinner.name, progressBar.name, paragraph.name, reodropdownT.name ]);

appTabletModule.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('app', {
    url: '/',
    template: '<app-tablet-component></app-tablet-component>'
  });
  $urlRouterProvider.otherwise('');
});

appTabletModule.directive('appTabletComponent', appTabletComponent);
appTabletModule.service('AppService', AppService);

angular.element(document).ready(() => {
  angular.bootstrap(document, [ appTabletModule.name ], {
    strictDi: true
  });
});

export default appTabletModule;

