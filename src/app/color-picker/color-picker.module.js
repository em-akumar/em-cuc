import angular from 'angular';
import {uiRouter} from 'ems/core';

import colorPickerComponent from './color-picker.component';
import ColorPickerService from './color-picker.service';
import colorpickerDefaultTemplate from './templates/colorpicker-default.html';
import colorpickerTextboxTemplate from './templates/colorpicker-textbox.html';
import colorpickerDisabledTemplate from './templates/colorpicker-disabled.html';
import colorpickerValueTemplate from './templates/colorpicker-value.html';

let colorPickerModule = angular.module('colorPicker', []);

colorPickerModule.config(($stateProvider) => {
  $stateProvider.state('color-picker', {
    url: '/color-picker',
    template: '<color-picker-component></color-picker-component>'
  });
});

colorPickerModule.directive('colorPickerComponent', colorPickerComponent);
colorPickerModule.service('ColorPickerService', ColorPickerService);

colorPickerModule.directive('colorpickerDefault', () => {
  return {
    template: colorpickerDefaultTemplate
  };
});

colorPickerModule.directive('colorpickerTextbox', () => {
  return {
    template: colorpickerTextboxTemplate
  };
});

colorPickerModule.directive('colorpickerDisabled', () => {
  return {
    template: colorpickerDisabledTemplate
  };
});

colorPickerModule.directive('colorpickerValue', () => {
  return {
    template: colorpickerValueTemplate
  };
});

export default colorPickerModule;
