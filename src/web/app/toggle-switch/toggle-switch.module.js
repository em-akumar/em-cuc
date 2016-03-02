import angular from 'angular';
import {uiRouter} from 'ems';
import {atService, atComponent, atState} from 'core/helpers';

import ToggleswitchService from './toggle-switch.service';
import template from './toggle-switch.html';
import controller from './toggle-switch.controller';

let toggleSwitchModule = angular.module('toggleSwitch', [uiRouter]);

atState(toggleSwitchModule, 'toggle-switch');
atService(toggleSwitchModule, 'ToggleswitchService', ToggleswitchService);
atComponent(toggleSwitchModule, 'toggleSwitchComponent', { template, controller });

export {toggleSwitchModule};
