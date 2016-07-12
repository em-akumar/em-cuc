import angular from 'angular';
export default class AppController {
  /* @ngInject */
  constructor(AppService, $scope) {
    this.appService = AppService;
    this.scope = $scope;
    let mobileView = 992;
    let IsToggle = true;

    this.scope.$watch(this.getWidth, function (newValue, oldValue) {
      if (newValue >= mobileView) {
        if (angular.isDefined(IsToggle)) {
          if (IsToggle) {
            this.toggle = true;
          } else { this.toggle = false; }

          // this.toggle = !IsToggle ? false : true;
        } else { this.toggle = true; } } else { this.toggle = false; }
    }.bind(this));
  }

  getWidth() {
    return window.innerWidth;
  }

  onresize() {
    this.scope.$apply();
  }

  /**/

  toggleSidebar() {
    this.toggle = !this.toggle;
  }

  initialize() {
    this.appService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}
