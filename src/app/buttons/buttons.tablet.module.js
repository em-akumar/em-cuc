import angular from 'angular';
import {uiRouter} from 'ems/core';

import buttonsTabletComponent from './buttons.tablet.component';
import buttonPrimaryTemplate from './templates/buttons-tablet-primary.html';
import buttonSecondaryTemplate from './templates/buttons-tablet-secondary.html';
import buttonTertiaryTemplate from './templates/buttons-tablet-tertiary.html';

let buttonsTabletModule = angular.module('buttonsTablet', [uiRouter]);

buttonsTabletModule.config(($stateProvider) => {
  $stateProvider.state('buttons-tablet', {
    url: '/buttons-tablet',
    template: '<buttons-tablet-component></buttons-tablet-component>'
  });
});

buttonsTabletModule.directive('buttonsTabletComponent', buttonsTabletComponent);

buttonsTabletModule.directive('buttonsTabletPrimary', () => {
  return {
    template: buttonPrimaryTemplate
  };
});

buttonsTabletModule.directive('buttonsTabletSecondary', () => {
  return {
    template: buttonSecondaryTemplate
  };
});

buttonsTabletModule.directive('buttonsTabletTertiary', () => {
  return {
    template: buttonTertiaryTemplate
  };
});

export default buttonsTabletModule;
