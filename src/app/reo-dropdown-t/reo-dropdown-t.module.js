import angular from 'angular';
import {uiRouter, atService, atComponent, atState} from 'ems/core';

import ReodropdowntService from './reo-dropdown-t.service';
import template from './reo-dropdown-t.html';
import controller from './reo-dropdown-t.controller';

let reoDropdownTModule = angular.module('reoDropdownT', [uiRouter]);

atState(reoDropdownTModule, 'reo-dropdown-t');
atService(reoDropdownTModule, 'ReodropdowntService', ReodropdowntService);
atComponent(reoDropdownTModule, 'reoDropdownTComponent', { template, controller });

export default reoDropdownTModule;
