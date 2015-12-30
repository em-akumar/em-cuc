import {angular} from 'ems';

import gridComponent from './grid.component';
import GridService from './grid.service';

let gridModule = angular.module('grid', ['ui.grid', 'ui.grid.moveColumns', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid', 'ui.grid.edit', 'ui.grid.exporter']);

gridModule.config(($stateProvider) => {
  $stateProvider.state('grid', {
    url: '/grid',
    template: '<grid-component></grid-component>'
  });
});

gridModule.directive('gridComponent', gridComponent);
gridModule.service('GridService', GridService);

export default gridModule;
