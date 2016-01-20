import template from './notifications.html';
import controller from './notifications.controller';
import './notifications.less';

let notificationsComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default notificationsComponent;
