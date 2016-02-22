import angular from 'angular';
import {uiRouter} from 'ems';

import radioButtonComponent from './radio-button.component';
import RadioButtonService from './radio-button.service';

let radioButtonModule = angular.module('radioButton', [uiRouter]);

radioButtonModule.config(($stateProvider) => {
  $stateProvider.state('radio-button', {
    url: '/radio-button',
    template: '<radio-button-component></radio-button-component>'
  });
});

radioButtonModule.directive('radioButtonComponent', radioButtonComponent);
radioButtonModule.service('RadioButtonService', RadioButtonService);

export default radioButtonModule;
