import {emsApi} from 'ems';

class CkeditorService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default CkeditorService;