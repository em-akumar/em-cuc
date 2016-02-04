import {angular} from 'ems';

import colorPickerComponent from './color-picker.component';
import ColorPickerService from './color-picker.service';

let colorPickerModule = angular.module('colorPicker', []);

colorPickerModule.config(($stateProvider) => {
  $stateProvider.state('color-picker', {
    url: '/color-picker',
    template: '<color-picker-component></color-picker-component>'
  });
});

colorPickerModule.directive('colorPickerComponent', colorPickerComponent);
colorPickerModule.service('ColorPickerService', ColorPickerService);

export default colorPickerModule;
