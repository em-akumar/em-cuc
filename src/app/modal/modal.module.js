import {angular} from 'ems';

import modalComponent from './modal.component';
import ModalService from './modal.service';

let modalModule = angular.module('modal', ['ui.bootstrap']);


modalModule.config(($stateProvider) => {
  $stateProvider.state('modal', {
    url: '/modal',
    template: '<modal></modal>'
  });
});

modalModule.directive('modalComponent', modalComponent);
modalModule.service('ModalService', ModalService);

export default modalModule;
