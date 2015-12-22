import {angular, uiRouter, emsApi} from 'ems';

import appComponent from './app.component';
import AppService from './app.service';

import '../favicon.ico';

import {cuc} from 'cuc/cuc.angular';
import 'cuc/cuc.ui.bootstrap';
import 'cuc/cuc.grid';

import './app.less';

import demoModule from './demo/demo.module';
console.log('cuc here:', cuc);

emsApi.baseUrl = 'http://localhost:9000/';

let appModule = angular.module('app', [uiRouter, cuc.name, demoModule.name]);

appModule.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('app', {
    url: '/',
    template: '<app-component></app-component>'
  });
  $urlRouterProvider.otherwise('/demo');
});

appModule.directive('appComponent', appComponent);
appModule.service('AppService', AppService);

angular.element(document).ready(() => {
  angular.bootstrap(document, [appModule.name], {
    strictDi: true
  });
});

export default appModule;
