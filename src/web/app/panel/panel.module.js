import {angular, uiRouter} from 'ems';

import panelComponent from './panel.component';
import PanelService from './panel.service';

let panelModule = angular.module('panel', [uiRouter]);

panelModule.config(($stateProvider) => {
  $stateProvider.state('panel', {
    url: '/panel',
    template: '<panel-component></panel-component>'
  });
});

panelModule.directive('panelComponent', panelComponent);
panelModule.service('PanelService', PanelService);

export default panelModule;
