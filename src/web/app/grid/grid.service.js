import {emsApi} from 'ems';

class GridService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('http://beta.json-generator.com/api/json/get/4JOX8vO4l');
  }
}

export default GridService;
