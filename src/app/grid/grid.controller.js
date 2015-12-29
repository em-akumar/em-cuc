import gridOption from './grid.options.json';
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
  }
  initialize() {
    this.gridService.resolvePromise().then((response) => {
      this.gridOptions.data = response;
      safeApply();
    });
  }
}

export default GridController;
