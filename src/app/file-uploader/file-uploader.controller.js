class FileUploaderController {
  /* @ngInject */
  constructor(FileUploaderService) {
    this.fileUploaderService = FileUploaderService;
    this.fileUploaderRender();
    // this.initialize();
  }


  fileUploaderRender() {
    let configUploadUrl = 'http://10.112.104.13:85/v1/formbuilder/importpackage';

    let fileFilterErrorMessage = '! Upload failed: Invalid file extension.',
      maxFileNameLength = '5120',
      fileNameLengthErrorMessage = 'File name length is greater than 100 characters.',
      dropDirectionMsg = 'Drop files to upload or  ',
      fileTypeIconCss = 'efrm-file',
      supportText = '[Supported File Format: .jpg]',
      fileMaxSize = '5120', //size in KBs
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

    // setting upload controls options
    this.options = options;
  }

  initialize() {
    this.fileUploaderService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default FileUploaderController;
