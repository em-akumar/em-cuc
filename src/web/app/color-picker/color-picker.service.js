import {emsApi} from 'ems';

class ColorPickerService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default ColorPickerService;
