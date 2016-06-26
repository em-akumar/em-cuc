import 'ionic-sdk/release/js/ionic.js';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import 'ionic-sdk/release/js/angular/angular-animate.js';
import 'ionic-sdk/release/js/angular/angular-sanitize.js';
import 'ionic-sdk/release/js/ionic-angular.js';

import appMobileComponent from './app-mobile.component';
import AppService from './app.service';

import 'cuc/cuc.mobile.angular';
import 'angular-messages';

import textInput from './text-input/text-input.mobile.module';

let appMobileModule = angular.module('app', [uiRouter, 'cucm', 'ionic', textInput.name]);

appMobileModule.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('app', {
    url: '/',
    template: '<app-mobile-component></app-mobile-component>'
  });
  $urlRouterProvider.otherwise('');
});

appMobileModule.directive('appMobileComponent', appMobileComponent);
appMobileModule.service('AppService', AppService);

angular.element(document).ready(() => {
  angular.bootstrap(document, [ appMobileModule.name ], {
    strictDi: true
  });
});

export default appMobileModule;

