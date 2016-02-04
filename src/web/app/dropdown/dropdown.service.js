import {emsApi} from 'ems';

class DropdownService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('http://restcountries.eu/rest/v1/all');
  }
}

export default DropdownService;
