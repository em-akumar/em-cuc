import angular from 'angular';
class FileUploaderController {
  /* @ngInject */
  constructor(FileUploaderService, $http) {
    this.fileUploaderService = FileUploaderService;
    this.fileUploaderRender();
    this.$http = $http;
    this.fileDataGroup = [];
  }

  fileUploaderRender() {
    let configUploadUrl = 'http://10.112.104.13:85/v1/formbuilder/importpackage';
    let fileFilterErrorMessage = '! Upload failed: Invalid file extension.';
    let maxFileNameLength = '50';
    let fileNameLengthErrorMessage = 'File name too long, Max 50 chars.';
    let dropDirectionMsg = 'Drop files to upload or  ';
    let fileTypeIconCss = 'fileExtIcon';
    let supportText = '[Supported File Format: .jpeg, .jpg, .png]';
    let fileMaxSize = '5120';   //  size in KBs
    let invalidFileMsg = 'File size exceeds maximum allowed size';

    let fancyOptions = {
      controlId: 'fancyUploader',
      url: configUploadUrl,
      fileType: '.jpeg,.jpg,.png',
      fileFilterErrorMessage: fileFilterErrorMessage,
      maxFileSize: fileMaxSize,
      fileSizeErrorMessage: invalidFileMsg,
      fileDropZoneCss: 'dropZone',
      isMultiFileUpload: true,
      fileTypeIconCss: fileTypeIconCss,
      supportedFormatsText: supportText,
      maxFileNameLength: maxFileNameLength,
      fileNameLengthErrorMessage: fileNameLengthErrorMessage,
      dropDirectionMsg: dropDirectionMsg,
      onfileUploadComplete: (e) => {
        this.fileUploadComplete(e);
        console.log(e);
      }
    };

    let options = {
      controlId: 'divMultiFileUpload',
      spikeControlId: 'spikeUploader',
      url: configUploadUrl,
      fileType: '.jpeg,.jpg,.png',
      fileFilterErrorMessage: fileFilterErrorMessage,
      maxFileSize: fileMaxSize,
      fileSizeErrorMessage: invalidFileMsg,
      fileDropZoneCss: 'dropZone',
      isMultiFileUpload: true,
      fileTypeIconCss: fileTypeIconCss,
      supportedFormatsText: supportText,
      maxFileNameLength: maxFileNameLength,
      fileNameLengthErrorMessage: fileNameLengthErrorMessage,
      dropDirectionMsg: dropDirectionMsg,
      onfileUploadComplete: (e) => {
        this.fileUploadComplete(e);
        console.log(e);
      }
    };
    let singleFileoptions = {
      fileInputId: 'singleUpload'
    };

    // setting upload controls options
    this.options = options;
    this.fancyOptions = fancyOptions;
    this.singleFileoptions = singleFileoptions;
  }

  upload() {
    if (document.getElementById('singleUpload').files.length > 0) {
      console.log(document.getElementById('singleUpload').files[0]);
      var file = document.getElementById('singleUpload').files[0];
      var fd = new window.FormData();
      fd.append('file', file);
      this.$http.post('http://10.112.104.13:85/v1/formbuilder/importpackage', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function () {
          console.log('file uploaded successfully.');
        })
        .error(function () {
          console.log('Error uploading file');
        });
    }
  }

  fileUploadComplete(e) {
    var fileData = {};
    fileData.fileName = e.file.name;
    fileData.fileSize = e.file.size;
    fileData.uploadDate = e.file.lastModifiedDate;
    fileData.uploadUser = 'Simone Qi';
    console.log(fileData);
    this.fileDataGroup.push(fileData);
  }
}

export default FileUploaderController;

