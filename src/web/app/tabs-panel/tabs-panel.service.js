import {emsApi} from 'ems';

class TabsPanelService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default TabsPanelService;
