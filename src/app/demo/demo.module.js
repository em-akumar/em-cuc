import {angular, uiRouter} from 'ems';

import demoComponent from './demo.component';
import DemoService from './demo.service';

let demoModule = angular.module('demo', [uiRouter]);

demoModule.config(($stateProvider) => {
  $stateProvider.state('demo', {
    url: '/demo',
    template: '<demo-component></demo-component>'
  });
});

demoModule.directive('demoComponent', demoComponent);
demoModule.service('DemoService', DemoService);

export default demoModule;
