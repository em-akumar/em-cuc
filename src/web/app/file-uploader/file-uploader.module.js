import {angular} from 'ems';

import fileUploaderComponent from './file-uploader.component';
import FileUploaderService from './file-uploader.service';
import multipleFileUploader from './templates/multiple-file-uploader.html';
import singleFileUploader from './templates/single-file-uploader.html';

let fileUploaderModule = angular.module('fileUploader', ['cuc']);

fileUploaderModule.config(($stateProvider) => {
  $stateProvider.state('file-uploader', {
    url: '/file-uploader',
    template: '<file-uploader-component></file-uploader-component>'
  });
});

fileUploaderModule.directive('multipleFileUploader', () => {
  return {
    template: multipleFileUploader
  };
});

fileUploaderModule.directive('singleFileUploader', () => {
  return {
    template: singleFileUploader
  };
});

fileUploaderModule.directive('fileUploaderComponent', fileUploaderComponent);
fileUploaderModule.service('FileUploaderService', FileUploaderService);

export default fileUploaderModule;