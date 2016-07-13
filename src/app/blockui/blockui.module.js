import angular from 'angular';
import {uiRouter} from 'ems/core';

import blockuiComponent from './blockui.component';
import blockuiDefaultTemplate from './templates/blockui-default.html';

let blockui = angular.module('blockui', [uiRouter, 'blockUI']);

blockui.config(($stateProvider) => {
  $stateProvider.state('blockui', {
    url: '/blockui',
    template: '<blockui-component></blockui-component>'
  });
});

blockui.directive('blockuiComponent', blockuiComponent);

blockui.directive('blockuiDefault', () => {
  return {
    template: blockuiDefaultTemplate
  };
});
export default blockui;
