import {angular, uiRouter} from 'ems';

import buttonsComponent from './buttons.component';
import ButtonsService from './buttons.service';

let buttonsModule = angular.module('buttons', [uiRouter]);

buttonsModule.config(($stateProvider) => {
  $stateProvider.state('buttons', {
    url: '/buttons',
    template: '<buttons-component></buttons-component>'
  });
});

buttonsModule.directive('buttonsComponent', buttonsComponent);
buttonsModule.service('ButtonsService', ButtonsService);

export default buttonsModule;
