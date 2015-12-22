import {emsApi} from 'ems';

class DemoService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default DemoService;
