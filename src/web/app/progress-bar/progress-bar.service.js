import {emsApi} from 'ems';

class ProgressBarService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default ProgressBarService;
