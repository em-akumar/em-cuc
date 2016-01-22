import {emsApi} from 'ems';

class ButtonsService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default ButtonsService;
