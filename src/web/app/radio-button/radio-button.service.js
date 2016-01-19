import {emsApi} from 'ems';

class RadioButtonService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default RadioButtonService;
