import angular from 'angular';
import {uiRouter} from 'ems';

import modalComponent from './modal.component';
import ModalService from './modal.service';

let modalModule = angular.module('modal', ['ui.bootstrap']);

modalModule.config(($stateProvider) => {
  $stateProvider.state('modal', {
    url: '/modal',
    template: '<modal-component></modal-component>'
  });
});

modalModule.directive('modalComponent', modalComponent);
modalModule.service('ModalService', ModalService);

export default modalModule;
