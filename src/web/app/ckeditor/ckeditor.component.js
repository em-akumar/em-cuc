import template from './ckeditor.html';
import controller from './ckeditor.controller';
import './ckeditor.less';

let ckeditorComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default ckeditorComponent;
