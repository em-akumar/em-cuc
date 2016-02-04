class FileUploaderController {
  /* @ngInject */
  constructor(FileUploaderService,$http) {
    this.fileUploaderService = FileUploaderService;
    this.fileUploaderRender();
    this.$http = $http;
    // this.initialize();
  }

  fileUploaderRender() {
    let configUploadUrl = 'http://10.112.104.13:85/v1/formbuilder/importpackage';

    let fileFilterErrorMessage = '! Upload failed: Invalid file extension.',
      maxFileNameLength = '5120',
      fileNameLengthErrorMessage = 'File name length is greater than 100 characters.',
      dropDirectionMsg = 'Drop files to upload or  ',
      fileTypeIconCss = 'efrm-file',
      supportText = '[Supported File Format: .jpeg, .jpg, .png]',
      fileMaxSize = '5120',   //  size in KBs
      invalidFileMsg = '! Upload failed: Invalid file extension.';

    let options = {
      controlId: 'divMultiFileUpload',
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
      dropDirectionMsg: dropDirectionMsg
    };
    let singleFileoptions = {
      fileInputId: 'singleUpload'
    }

    // setting upload controls options
    this.options = options;
    this.singleFileoptions = singleFileoptions;
  }

    upload(){
      if(document.getElementById('singleUpload').files.length> 0)
      {
        console.log(document.getElementById('singleUpload').files[0]);
        var file = document.getElementById('singleUpload').files[0];
         var fd = new FormData();
        fd.append('file', file);
        this.$http.post('http://10.112.104.13:85/v1/formbuilder/importpackage', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
          .success(function(){
            console.log('file uploaded successfully.');
          })
         .error(function(){
          console.log('Error uploading file');
         });
      }
    }
  initialize() {
    this.fileUploaderService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default FileUploaderController;
