import template from './file-uploader.html';
import controller from './file-uploader.controller';
import './file-uploader.less';

let fileUploaderComponent = () => {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default fileUploaderComponent;
