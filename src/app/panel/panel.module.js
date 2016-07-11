import angular from 'angular';
import {uiRouter} from 'ems/core';

import panelComponent from './panel.component';
import PanelService from './panel.service';

let panelModule = angular.module('panel', [uiRouter]);
import categoryBox from './templates/category-box.html';
import groupBox from './templates/group-box.html';
import panelUsage from './templates/panel-usage.html';

panelModule.config(($stateProvider) => {
  $stateProvider.state('panel', {
    url: '/panel',
    template: '<panel-component></panel-component>'
  });
});

panelModule.directive('categoryBox', function () {
  return {
    template: categoryBox
  };
});


panelModule.directive('groupBox', function () {
  return {
    template: groupBox
  };
});


panelModule.directive('panelUsage', function () {
  return {
    template: panelUsage
  };
});

panelModule.directive('panelComponent', panelComponent);
panelModule.service('PanelService', PanelService);

export default panelModule;
