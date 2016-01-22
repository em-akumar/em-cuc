import {emsApi} from 'ems';

class ErrorHandlingService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default ErrorHandlingService;
