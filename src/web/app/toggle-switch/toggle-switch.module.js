import angular from 'angular';
import {uiRouter} from 'ems';

import toggleSwitchComponent from './toggle-switch.component';
import ToggleSwitchService from './toggle-switch.service';

let toggleSwitchModule = angular.module('toggleSwitch', []);

toggleSwitchModule.config(($stateProvider) => {
  $stateProvider.state('toggle-switch', {
    url: '/toggle-switch',
    template: '<toggle-switch-component></toggle-switch-component>'
  });
});

toggleSwitchModule.directive('toggleSwitchComponent', toggleSwitchComponent);
toggleSwitchModule.service('ToggleSwitchService', ToggleSwitchService);

export default toggleSwitchModule;
