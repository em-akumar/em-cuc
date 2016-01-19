import {emsApi} from 'ems';

class TextAreaService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default TextAreaService;
