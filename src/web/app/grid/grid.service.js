import {emsApi} from 'ems';

class GridService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('http://www.json-generator.com/api/json/get/cqcrdXPTci');
  }
}

export default GridService;
