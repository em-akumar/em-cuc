class ToggleswitchService {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }
  resolvePromise() {
    return this.$http.get('app.json');
  }
}

export default ToggleswitchService;
