import {emsApi} from 'ems';

class ImageButtonService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default ImageButtonService;
