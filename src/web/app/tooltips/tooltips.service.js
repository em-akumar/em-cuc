import {emsApi} from 'ems';

class TooltipsService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default TooltipsService;