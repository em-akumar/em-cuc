import 'ionic-sdk/release/js/ionic.js';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import 'ionic-sdk/release/js/angular/angular-animate.js';
import 'ionic-sdk/release/js/angular/angular-sanitize.js';
import 'ionic-sdk/release/js/ionic-angular.js';

import appMobileComponent from './app-mobile.component';
import AppService from './app.service';

import 'cuc/cuc.mobile.angular';
import '@elliemae/em-field-formatters/dist/web/fieldFormatters';
import 'angular-messages';

import textInput from './text-input/text-input.mobile.module';
import progressSpinner from './progress-spinner/progress-spinner.mobile.module';
import progressBar from './progress-bar/progress-bar.mobile.module';
import multiSelector from './multi-selector/multi-selector.module';

let appMobileModule = angular.module('app', [uiRouter, 'cucm', 'fieldFormatters', 'ionic', textInput.name, progressSpinner.name, progressBar.name,multiSelector.name]);

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

