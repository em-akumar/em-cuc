import angular from 'angular';
import {uiRouter} from 'ems';

import gridComponent from './grid.component';
import GridService from './grid.service';
import simpleGrid from './templates/simple-grid.html';
import complexGrid from './templates/complex-grid.html';

let gridModule = angular.module('grid', ['ui.grid', 'ui.grid.moveColumns', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid', 'ui.grid.edit', 'ui.grid.exporter', 'ui.grid.resizeColumns','ui.grid.saveState','ui.grid.moveColumns','ui.grid.autoResize']);

gridModule.config(($stateProvider) => {
  $stateProvider.state('grid', {
    url: '/grid',
    template: '<grid-component></grid-component>'
  });
});

gridModule.directive('simpleGrid', () => {
  return {
    template: simpleGrid
  };
});

gridModule.directive('complexGrid', () => {
  return {
    template: complexGrid
  };
});

gridModule.directive('gridComponent', gridComponent);
gridModule.service('GridService', GridService);

export default gridModule;
