import {emsApi} from 'ems';

class TextInputService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default TextInputService;
