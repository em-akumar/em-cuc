import {angular} from 'ems';

import fileUploaderComponent from './file-uploader.component';
import FileUploaderService from './file-uploader.service';

let fileUploaderModule = angular.module('fileUploader', ['cuc']);

fileUploaderModule.config(($stateProvider) => {
  $stateProvider.state('file-uploader', {
    url: '/file-uploader',
    template: '<file-uploader-component></file-uploader-component>'
  });
});

fileUploaderModule.directive('fileUploaderComponent', fileUploaderComponent);
fileUploaderModule.service('FileUploaderService', FileUploaderService);

export default fileUploaderModule;
