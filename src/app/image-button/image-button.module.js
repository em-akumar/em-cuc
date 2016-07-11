import angular from 'angular';
import {uiRouter} from 'ems/core';

import imageButtonComponent from './image-button.component';
import ImageButtonService from './image-button.service';

let imageButtonModule = angular.module('imageButton', [uiRouter]);

imageButtonModule.config(($stateProvider) => {
  $stateProvider.state('image-button', {
    url: '/image-button',
    template: '<image-button-component></image-button-component>'
  });
});

imageButtonModule.directive('imageButtonComponent', imageButtonComponent);
imageButtonModule.service('ImageButtonService', ImageButtonService);

export default imageButtonModule;
