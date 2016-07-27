import gridOption from './grid.options.json';
import simpleGridOption from './simpleGrid.options.json';
import {angular, safeApply} from 'ems/core';
import { take, cloneDeep } from 'lodash';

class GridController {
  /* @ngInject */
  constructor(GridService) {
    this.gridService = GridService;
    this.initialize();
    this.gridRender();
  }

  // Render UI-Grid and load the options from json file
  gridRender() {
    this.gridOptions = gridOption;
    this.gridOptions.onRegisterApi = function (gridApi) {
      this.gridApi = gridApi;
    }.bind(this);
    this.simpleGridOptions = simpleGridOption;
  }
  exportCsv() {
    var myElement = angular.element(document.querySelector('.xport-location'));
    this.gridApi.exporter.csvExport('visible', 'all', myElement);// visible or selected
  }
  initialize() {
    this.gridService.resolvePromise().then((response) => {
      this.gridService.gridData = cloneDeep(response.data);
      this.gridOptions.data = response.data;
      this.simpleGridOptions.data = response.data;
      safeApply();
    });
  }
  applyFilter(remove = false) {
    if (remove) {
      this.gridOptions.data = this.gridService.gridData;
    } else {
      this.gridOptions.data = take(this.gridService.gridData, 10);
    }
    safeApply();
  }
}

export default GridController;
