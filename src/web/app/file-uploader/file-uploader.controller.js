class FileUploaderController {
  /* @ngInject */
  constructor(FileUploaderService, $http) {
    this.fileUploaderService = FileUploaderService;
    this.fileUploaderRender();
    this.$http = $http;
    this.fileDataGroup = [{"fileName": "file1", "fileSize": 20000, uploadDate: "05/09/2015", uploadUser: "Simone Qi"}];
    this.initialize();
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
      dropDirectionMsg: dropDirectionMsg
    };
    let singleFileoptions = {
      fileInputId: 'singleUpload'
    }

    // setting upload controls options
    this.options = options;
    this.fancyOptions = fancyOptions;
    this.singleFileoptions = singleFileoptions;
  }

  upload() {
    if (document.getElementById('singleUpload').files.length > 0) {
      console.log(document.getElementById('singleUpload').files[0]);
      var file = document.getElementById('singleUpload').files[0];
      var fd = new FormData();
      fd.append('file', file);
      this.$http.post('http://10.112.104.13:85/v1/formbuilder/importpackage', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function() {
          console.log('file uploaded successfully.');
        })
        .error(function() {
          console.log('Error uploading file');
        });
    }
  }

  fileUploadComplete(e) {
    var fileData = {} ;
    fileData.fileName = e.file.name
    fileData.fileSize = e.file.size;
    fileData.uploadDate = e.file.lastModifiedDate;
    fileData.uploadUser = 'Simone Qi';
    console.log(fileData);
    this.fileDataGroup.push(fileData);
    console.log(this.fileDataGroup);
    this.populateFileGrid(this.fileDataGroup);
  }

  populateFileGrid(fileDataGroup) {
    this.fileGridOptions.data = fileDataGroup;
  }

  initialize() {

    this.fileGridOptions = this.getGridConfig();
    this.fileGridOptions.data = this.fileDataGroup;
    //this.fileUploaderService.resolvePromise().then((response) => {
    //  this.data = response.data;
    //});
  }


  getGridConfig() {
    return {
      rowHeight: 40,
      enableRowSelection: false,
      enableRowHeaderSelection: false,
      noUnselect: true,
      columnDefs: [
        {
          field: 'fileName',
          displayName: 'File Name',
          width: '20%',
          enableColumnMenu: false,
          cellEditableCondition: false,
          cellTemplate: '<div ><img src="" class="file-image" alt="img"/><a href="{{row.entity[\'url\']}}">{{row.entity[col.field]}}</a></div>'
        },
        {
          field: 'uploadDate',
          enableColumnMenu: false,
          displayName: 'Upload Date',
          width: '16%',
          cellTemplate: '<div >{{row.entity[col.field]}}</div>',
          cellEditableCondition: false
        },
        {
          field: 'fileSize',
          width: '12%',
          enableColumnMenu: false,
          type: 'number',
          displayName: 'File Size',
          cellEditableCondition: false,
          cellTemplate: '<div >{{row.entity[col.field]}}</div>',
        },
        {
          field: 'uploadUser',
          width: '15%',
          enableColumnMenu: false,
          displayName: 'System Image',
          cellEditableCondition: false,
          cellTemplate: '<div>{{row.entity[col.field]}}</div>'
        }
      ]
    };
  }
}

export default FileUploaderController;
