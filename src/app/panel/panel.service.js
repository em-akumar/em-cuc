import {emsApi} from 'ems';

class PanelService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default PanelService;
