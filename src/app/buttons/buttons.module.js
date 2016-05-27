import angular from 'angular';
import {uiRouter} from 'ems/core';

import buttonsComponent from './buttons.component';
import ButtonsService from './buttons.service';
import buttonSizeTemplate from './templates/buttons-size.html';
import buttonStatesTemplate from './templates/buttons-states.html';
import buttonHeightTemplate from './templates/buttons-height.html';
import buttonWidthTemplate from './templates/buttons-width.html';
import buttonDefaultTemplate from './templates/buttons-default.html';
import buttonTertiaryTemplate from './templates/buttons-tertiary.html';



let buttonsModule = angular.module('buttons', [uiRouter]);

buttonsModule.config(($stateProvider) => {
  $stateProvider.state('buttons', {
    url: '/buttons',
    template: '<buttons-component></buttons-component>'
  });
});

buttonsModule.directive('buttonsComponent', buttonsComponent);
buttonsModule.service('ButtonsService', ButtonsService);

buttonsModule.directive('buttonsSize', () => {
  return {
    template: buttonSizeTemplate
  };
});

buttonsModule.directive('buttonsStates', () => {
  return {
    template: buttonStatesTemplate
  };
});


buttonsModule.directive('buttonsHeight', () => {
  return {
    template: buttonHeightTemplate
  };
});


buttonsModule.directive('buttonsWidth', () => {
  return {
    template: buttonWidthTemplate
  };
});


buttonsModule.directive('buttonsDefault', () => {
  return {
    template: buttonDefaultTemplate
  };
});


buttonsModule.directive('buttonsTertiary', () => {
  return {
    template: buttonTertiaryTemplate
  };
});

export default buttonsModule;
