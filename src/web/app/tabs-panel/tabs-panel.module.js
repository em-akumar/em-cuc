import {angular, uiRouter} from 'ems';

import tabsPanelComponent from './tabs-panel.component';
import TabsPanelService from './tabs-panel.service';

let tabsPanelModule = angular.module('tabsPanel', [uiRouter]);

tabsPanelModule.config(($stateProvider) => {
  $stateProvider.state('tabs-panel', {
    url: '/tabs-panel',
    template: '<tabs-panel-component></tabs-panel-component>'
  });
});

tabsPanelModule.directive('tabsPanelComponent', tabsPanelComponent);
tabsPanelModule.service('TabsPanelService', TabsPanelService);

export default tabsPanelModule;
