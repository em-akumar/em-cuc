import {emsApi} from 'ems';

class NotificationsService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default NotificationsService;
