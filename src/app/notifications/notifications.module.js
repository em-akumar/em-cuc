import {angular, uiRouter} from 'ems';

import notificationsComponent from './notifications.component';
import NotificationsService from './notifications.service';

let notificationsModule = angular.module('notifications', [uiRouter]);

notificationsModule.config(($stateProvider) => {
  $stateProvider.state('notifications', {
    url: '/notifications',
    template: '<notifications-component></notifications-component>'
  });
});

notificationsModule.directive('notificationsComponent', notificationsComponent);
notificationsModule.service('NotificationsService', NotificationsService);

export default notificationsModule;
