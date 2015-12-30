import gridOption from './grid.options.json';
import simpleGridOption from './simpleGrid.options.json';
import {safeApply} from 'ems';

class GridController {
  /* @ngInject */
  constructor(GridService) {
    this.gridService = GridService;
    this.initialize();
    this.gridRender();
  }

  //Render UI-Grid and load the options from json file
  gridRender() {
    this.gridOptions = gridOption;
    this.simpleGridOptions = simpleGridOption;
  }
  initialize() {
    this.gridService.resolvePromise().then((response) => {
      this.gridOptions.data = response;
      this.simpleGridOptions.data = response;
      safeApply();
    });
  }
}

export default GridController;
