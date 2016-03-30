
class DropdownService {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }
  resolvePromise() {
    
    return this.$http.get('http://restcountries.eu/rest/v1/all');
  }
}

export default DropdownService;
