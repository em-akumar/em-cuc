import {ProgressBar} from '../progress-bar/progress-bar';
var FileUpload = function (el, opts) {


  var uploadStack = [], //upload file item store array
    uploadedStack = [],
    uploadControlDragAreaDivId = '', //Id  of div where files are dragged and dropped or selected from select button
    filesUploadedAreaDivId = '', //Id  of div responsible for progress of all the selected files for upload
    maxFileNameLength = 30, //default max length of file name is 30
    maxFileSize = 400, // default file size maximum limit is 400kb
    isMultiFileUpload = true, //false when single file upload
    uploadButtonId = '', //Id  of button responsible for starting upload
    cancelButtonId = '', //Id  of button responsible for cancelling upload
    fileSelectButtonId = '', //Id of button used for firing file select
    fileUploadControlId = '', //Id of button used for file Upload
    filter = '', //file filter type  viz .css, .js etc
    saveUrl = '', // Upload url link path
    controlId = '', //div id to be made into draggable file upload area
    dropDirectionParaId = '', //paragraph direction to drop files
    supportedFileTypeParaId = '', //paragraph id for showing File validation errors
    dropDirectionMsg = '', // drop message direction in the control

    fileDropZoneCss = '', //css class for draggable div
    fileUploadCtrl = '', //file upload control
    fileFilterErrorMessage = '', // invalid file extension error message
    fileSizeErrorMessage = '', //invalid file size error message
    fileNameLengthErrorMessage = '', //file name character length validation
    supportedFormatsText = '', // supported file formats for drage drop
    fileTypeIconCss = '', //type of file type icon css class name
    dropZoneClass = ''; //css to the drag drop area

  var fileUpload = {}; // to be returned to with control state when the object is to be used in IFB angularJs integration

  function initialize(options) {
    //Removing existing control if any
    var existingCtrl = document.getElementById(options.controlId).querySelectorAll('.dropZone');
    if (existingCtrl.length > 0) {
      existingCtrl.remove();
    }
    uploadStack = []; // clear the upload stack
    uploadedStack = [];
    saveUrl = options.url; // Upload url link path
    controlId = options.controlId; //div id to be made into draggable file upload area

    isMultiFileUpload = options.isMultiFileUpload; // get from user the type of file upload  i.e single file upload or muti-file upload

    filter = options.fileType; //file filter type  viz .css, .js etc
    fileFilterErrorMessage = options.fileFilterErrorMessage; //file extension validation error message
    maxFileSize = options.maxFileSize; //max file size - 400kb
    fileSizeErrorMessage = options.fileSizeErrorMessage; //file size error message
    maxFileNameLength = options.maxFileNameLength;
    fileNameLengthErrorMessage = options.fileNameLengthErrorMessage; //validation error message when file size exceeds 30 character length
    supportedFormatsText = options.supportedFormatsText;//text displaying which formats are supported for upload
    fileDropZoneCss = options.fileDropZoneCss; //css class for draggable div
    fileTypeIconCss = options.fileTypeIconCss; // type of icon for file type being uploaded
    dropDirectionMsg = options.dropDirectionMsg; // drop or drag file instruction message

    initializeDragDropDivArea();

    //after the control has been rendered and ids have been assigned to the controls fill the fileUpload object
    setUploadControlAccessProperties();

    return fileUpload;
  }

  /// set the upload file properties in the object , which need access during dom manipulation
  function setUploadControlAccessProperties() {
    fileUpload.uploadControlDragAreaDivId = uploadControlDragAreaDivId;
    fileUpload.uploadStack = uploadStack;
    fileUpload.filesUploadedAreaDivId = filesUploadedAreaDivId;
    fileUpload.uploadButtonId = uploadButtonId;
    fileUpload.cancelButtonId = cancelButtonId;
    fileUpload.fileSelectButtonId = fileSelectButtonId;
    fileUpload.fileUploadControlId = fileUploadControlId;
    fileUpload.filter = filter;
    fileUpload.saveUrl = saveUrl;
    fileUpload.isMultiFileUpload = isMultiFileUpload;
    fileUpload.fileDropZoneCss = fileDropZoneCss;
  }

  //intialize Upload Progress Area
  function initUploadProgressArea() {
    var uploadProgressAreaDiv = document.getElementById(filesUploadedAreaDivId);
    //clean the area for new uploads
    uploadProgressAreaDiv.innerHTML = '';
    //get the file icons class
    var fileIconClass = fileTypeIconCss;

    var tileDivHolder, tileDiv, progressBgDiv, par, errPar, nameSpan, fileName, fileUploadStatusFor, deleteThisFileIconSpan = '';
    var crossX, previewDiv, detailsDiv, fileSizeSpan, closeDiv, progressBarDiv, fileStatusDiv, closeIcon, closeSpan = '';
    var pdiv, bdiv, pddiv, perdiv;
    for (var i = 0; i < uploadStack.length; i++) {
      //Create main div
      tileDivHolder = document.createElement('DIV');
      tileDivHolder.className = 'tileHolder';
      tileDivHolder.id = 'tileFor' + uploadStack[i].guid;

      tileDiv = document.createElement('DIV');
      tileDiv.className = 'tile';

      //div preview image
      previewDiv = document.createElement('DIV');
      previewDiv.className = 'previewDiv';
      tileDiv.appendChild(previewDiv);

      //div for file name and size
      detailsDiv = document.createElement('DIV');
      detailsDiv.className = 'fileDetails clearfix';
      fileSizeSpan = document.createElement('SPAN');
      fileSizeSpan.className = 'fileSizeSpan';
      fileName = document.createTextNode(uploadStack[i].name);
      detailsDiv.appendChild(fileName);
      detailsDiv.appendChild(fileSizeSpan);
      tileDiv.appendChild(detailsDiv);
      //tileDiv.appendChild(fileSizeSpan);
      //div for x close
      closeDiv = document.createElement('DIV');
      closeDiv.className = 'fileCloseDiv';
      closeDiv.addEventListener('click', deleteFileFromUploadProgressDiv, false);

      closeDiv.id = 'fileCloseDiv' + uploadStack[i].guid;
      closeSpan = document.createElement('SPAN');
      closeSpan.className = 'closeSpan';
      closeIcon = document.createTextNode('x');
      closeSpan.appendChild(closeIcon);
      closeDiv.appendChild(closeSpan);
      tileDiv.appendChild(closeDiv);
      //div for progress bar
      //div for percent and status
      fileStatusDiv = document.createElement('DIV');
      fileStatusDiv.className = 'fileStatusDiv';
      fileStatusDiv.id = 'fileUploadStatusFor' + uploadStack[i].guid;
      pdiv = document.createElement('DIV');
      pdiv.className = 'progress-Bar';
      pdiv.id = 'change-style' + uploadStack[i].guid;
      bdiv = document.createElement('DIV');
      bdiv.className = 'em-base-Bar  em-progress-Bar-right';
      pddiv = document.createElement('DIV');
      pddiv.className = 'em-progress-Bar';
      perdiv = document.createElement('DIV');
      perdiv.className = 'em-perentage-Display-right';
      perdiv.id = 'getStatus' + uploadStack[i].guid;
      bdiv.appendChild(pddiv);
      pdiv.appendChild(bdiv);
      pdiv.appendChild(perdiv);
      fileStatusDiv.appendChild(pdiv);


      tileDiv.appendChild(fileStatusDiv);

      //Create paragraph showing error message
      errPar = document.createElement('DIV');
      errPar.className = 'errorMessageInTile';
      errPar.id = 'errorMessageInTile' + uploadStack[i].guid;
      tileDiv.appendChild(errPar);
      tileDivHolder.appendChild(tileDiv);
      uploadProgressAreaDiv.appendChild(tileDivHolder);
    }
    document.getElementById(cancelButtonId).style.display = 'inline-block';
    document.getElementById(cancelButtonId).parentNode.style.border = '1px solid #D2D5DA';
  }

  function fileSelectHandler(e) {
    // cancel event and hover styling
    fileDragHover(e);
    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;
    // process all File objects
    var f = '';
    if (isMultiFileUpload === true) {
      var i = 0;
      for (i = 0; i < (files.length); i++) {
        f = files[i];
        f.guid = getGuid(); // ToDo :Replace by generateGUID call in Utility Class when intergrating with Angular JS
        f.status = 'added';
        f.description = '';
        uploadStack.push(f);
      }
    }
    else { //if single file uplod is enabled
      if (uploadStack.length === 0) {

        if (files.length === 1) {
          f = files[0];
          f.guid = getGuid(); // ToDo :Replace by generateGUID call in Utility Class
          f.status = 'added';
          f.description = '';
          uploadStack.push(f);
          syncControlsForSingleFileUpload(files.length);
        }
      }
    }
    initUploadProgressArea();
    //any time during file rendering of control the upload stack becomes empty make sync behaviour of other controls
    if (uploadStack.length === 0) {
      uploadedStack.length = 0;
      syncControlsWhenUploadStackEmpty();
    }
    btnUpload();
  }

  function selectFile() {
    fileUploadCtrl.click();
  }

  function isFileValid(file) {
    var isValid = true;
    //check if file extension is valid
    if (isValid) {
      if (!isfileExtensionValid(file)) {
        file.status = 'invalid';
        file.description = fileFilterErrorMessage;
        isValid = false;
      }
    }
    //check if file name Length is valid
    if (isValid) {
      if (!isfileNameLengthValid(file)) {
        file.status = 'invalid';
        file.description = fileNameLengthErrorMessage;
        isValid = false;
      }
    }
    //check if file Size is valid
    if (isValid) {
      if (!isfileSizeValid(file)) {
        file.status = 'invalid';
        file.description = fileSizeErrorMessage;
        isValid = false;
      }
    }
  }

  function isfileSizeValid(file) {
    var fileSize = Math.floor(file.size) / (1024); //convert byts to KBs
    if (fileSize > maxFileSize) {
      return false;
    }
    else {
      return true;
    }
  }

  function isfileExtensionValid(file) {
    var allowedFileExtensions = filter;
    var extension = file.name.split('.').pop().toLowerCase();
    if (parseInt(allowedFileExtensions.indexOf(extension), 10) < 0) {
      return false;
    }
    else {
      return true;
    }
  }

  function isfileNameLengthValid(file) {
    var fileNameLength = file.name.length;
    if (fileNameLength > maxFileNameLength) {
      return false;
    }
    else {
      return true;
    }
  }

  function btnUpload() {
    document.getElementById(cancelButtonId).parentNode.style.display = 'block';
    //Check validation rules
    var i, j = 0;
    for (i = 0; i < uploadStack.length; i++) {
      isFileValid(uploadStack[i]);

      if (uploadStack[i].status === 'invalid') {
        //need to recreate the image variable every time
        var showExcl = document.createElement('DIV');
        showExcl.className = 'notificationImageAtRightCorner ';
        var showError = document.createTextNode('Error');
        var showTickImg = document.createElement('SPAN');
        showTickImg.className = 'errorImageSrc';
        showExcl.appendChild(showError);
        showExcl.appendChild(showTickImg);
        document.getElementById('fileUploadStatusFor' + uploadStack[i].guid).innerHTML = '';// it is need here to make innerHTML empty
        document.getElementById('fileUploadStatusFor' + uploadStack[i].guid).appendChild(showExcl);
      }
    }

    //remove files from stack that are invalid
    //for that create a temporary array and keep only valid in it
    //copy this array information to uploadstack
    var tempValidFilesArray = [];
    for (i = 0, j = 0; i < uploadStack.length; i++) {
      if (uploadStack[i].status !== 'invalid') {
        tempValidFilesArray[j] = uploadStack[i];
        j++;
      }
    }
    uploadStack = [];
    uploadStack.push.apply(uploadStack, tempValidFilesArray);

    //now that upload stack has only valid files
    //upload  all the valid files that are left in the stack
    if (uploadStack.length > 0) {
      var l = 0;
      for (l = 0; l < uploadStack.length; l++) {
        if (uploadedStack.indexOf(uploadStack[l]) === -1)
          uploadFile(uploadStack[l]);
        else
          setProgressBar(uploadStack[l], '100');
      }
      document.getElementById(cancelButtonId).textContent = 'Close';
      document.getElementById(cancelButtonId).addEventListener('click', function () {
        document.getElementById('uploadShowCase').innerHTML = '';
        document.getElementsByClassName('actionButtonHolder').innerHTML = '';
        document.getElementById(cancelButtonId).parentNode.style.display = 'none';
      });
    }
  }

  function getXmlHttpRequestObject() {
    var xmlHttpReq = null;
    try {
      xmlHttpReq = new XMLHttpRequest();
      return xmlHttpReq;
    } catch (e) {
    }
    throw 'Unable to create  XMLHttpRequest object';
  }

  function showProgressBar(xhr, progress2) {

    // progress bar
    xhr.upload.addEventListener('progress', function (e) {
      var uploadPercent = parseInt(e.loaded / e.total * 100, 10);
      if (uploadPercent > 0) {
        progress2.progress(uploadPercent);
      }
    }, false);
  }

  function setProgressBar(file, uploadPercent) {
    if (uploadPercent === '100') {
      var showTick = document.createElement('DIV');
      var showComplete = document.createTextNode('Complete');
      showTick.className = 'notificationImageAtRightCorner';
      showTick.appendChild(showComplete);
      var showTickImg = document.createElement('SPAN');
      showTickImg.className = 'tickImageSrc';
      showTick.appendChild(showTickImg);
      document.getElementById('fileUploadStatusFor' + file.guid).innerHTML = '';
      document.getElementById('fileUploadStatusFor' + file.guid).appendChild(showTick);
      document.getElementById('fileCloseDiv' + file.guid).className = '';
      document.getElementById('fileCloseDiv' + file.guid).innerHTML = '';
    }
    else
      document.getElementById('fileUploadStatusFor' + file.guid).innerHTML = uploadPercent + '%';
  }

  function uploadFile(file) {
    try {
      var xhr = getXmlHttpRequestObject();
      var xhrStatus = '';
      var progress2 = new ProgressBar('change-style' + file.guid, {});
      if (xhr.upload) {
        var showTick = document.createElement('DIV');
        var showComplete = document.createTextNode('Complete');
        showTick.className = 'notificationImageAtRightCorner';
        var showTickImg = document.createElement('SPAN');
        showTickImg.className = 'tickImageSrc';
        showTick.appendChild(showComplete);
        showTick.appendChild(showTickImg);
        showProgressBar(xhr, progress2); //shows progress bar
        document.getElementById('fileCloseDiv' + file.guid).addEventListener('click', function () {
          this.abort();
        }.bind(xhr));
        var data = new FormData();

        data.append('importFiles', file);
        // start upload
        xhr.onreadystatechange = function () {

          if (xhr.readyState === 4) {
            xhrStatus = xhr.status;

            setFileStatus(file, xhr);

            if (xhr.status === 200) {
              uploadedStack.push(file);
              document.getElementById('fileCloseDiv' + file.guid).className = '';
              document.getElementById('fileCloseDiv' + file.guid).innerHTML = '';
              document.getElementById('fileUploadStatusFor' + file.guid).innerHTML = '';// it is need here to make innerHTML empty
              document.getElementById('fileUploadStatusFor' + file.guid).appendChild(showTick);
            } else {
              var showExcl = document.createElement('DIV');
              showExcl.className = 'notificationImageAtRightCorner ';
              var showError = document.createTextNode('Error');
              var showTickImg = document.createElement('SPAN');
              showTickImg.className = 'errorImageSrc';
              showExcl.appendChild(showError);
              showExcl.appendChild(showTickImg);
              document.getElementById('fileUploadStatusFor' + file.guid).innerHTML = '';// it is need here to make innerHTML empty
              document.getElementById('fileUploadStatusFor' + file.guid).appendChild(showExcl);
            }
          }
        };
        xhr.open('POST', saveUrl, true);
        xhr.send(data);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  function setFileStatus(file, xhr) {
    file.status = xhr.status;
    file.serverResponseMsg = JSON.parse(xhr.responseText);
    file.description = getFileUploadStatus(xhr.status);
  }

  function cancelUpload() {
    syncControlsWhenUploadStackEmpty();
  }

  function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.className === dropZoneClass || e.target.className === dropZoneClass + ' hover') {
      e.target.className = (e.type === 'dragover' ? dropZoneClass + ' hover' : dropZoneClass);
    }
  }

  function dragEnter(e) {
    document.getElementsByClassName('uploadedArea').className += ' uploadedAreaOverlay';
    e.stopPropagation();
    e.preventDefault();
  }

  function dragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.className === dropZoneClass || e.target.className === dropZoneClass + ' hover') {
      e.target.className = (e.type === 'dragleave' ? dropZoneClass : dropZoneClass + ' hover');
    }
  }

  function deleteFileFromUploadProgressDiv(event) {
    ///cross browser remove  functionality
    var elementId, fileBoxDiv = '';
    var l = 0;
    for (l = 0; l < uploadStack.length; l++) {
      if (uploadStack[l].guid === (event.target.id)) {
        uploadStack.splice(l, 1);
        elementId = event.target.id;
        fileBoxDiv = document.getElementById('tileFor' + elementId);
        fileBoxDiv.outerHTML = '';
        fileBoxDiv = null;
        break;
      }
    }

    if (uploadStack.length === 0) {
      //hide the upload and cancel button when the upload stack is empty
      syncControlsWhenUploadStackEmpty();
    }
  }

  function syncControlsForSingleFileUpload() {
    document.getElementById(cancelButtonId).style.display = 'inline-block';
    document.getElementById(cancelButtonId).parentNode.style.border = '1px solid #D2D5DA';
  }

  function syncControlsWhenUploadStackEmpty() {
    uploadStack = [];
    document.getElementById(filesUploadedAreaDivId).innerHTML = '';
    document.getElementById(cancelButtonId).style.display = 'none';
  }

  // To Do Remove this function and use Utilty.generateGUID when integating with IFB angularJS
  function getGuid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  //To Do Remove this function and use Utilty.generateGUID when integating with IFB angularJS
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  function getFileUploadStatus(statusCode) {
    var filUploadStatusMsg;
    switch (statusCode) {
      case 200:
        filUploadStatusMsg = 'File Upload Success';
        break;
      case 401:
        filUploadStatusMsg = 'File Upload UnAuthorized';
        break;
      case 403:
        filUploadStatusMsg = 'File Upload Forbidden';
        break;
      case 404:
        filUploadStatusMsg = 'Service Unavailable';
        break;
      case 500, 501:
        filUploadStatusMsg = 'Internal Server Error';
        break;
      case 504:
        filUploadStatusMsg = 'Gateway Timeout';
        break;
      default:
        filUploadStatusMsg = 'Unknown Error';
        break;
    }

    return filUploadStatusMsg;
  }

  function initializeDragDropDivArea() {

    var divToBind = document.getElementById(controlId);
    dropZoneClass = fileDropZoneCss;

    var directionWithButtonDiv = document.createElement('DIV');
    directionWithButtonDiv.id = 'directionWithButtonDiv' + getGuid();
    directionWithButtonDiv.className = 'directionWithButtonClass';

    var dropDirectionPara = document.createElement('DIV');
    dropDirectionPara.Id = 'dropDirectionParaId' + getGuid();
    dropDirectionParaId = dropDirectionPara.Id;
    dropDirectionPara.className = 'directionParaClass';
    var directionText = document.createTextNode(dropDirectionMsg);


    //select button
    var fileSelectButton = document.createElement('BUTTON');
    fileSelectButton.id = 'fileButton' + getGuid(); // ToDo :Replace by generateGUID call in Utility Class
    fileSelectButtonId = fileSelectButton.id;
    fileSelectButton.className = 'btn em-btn-tertiary';
    fileSelectButton.textContent = 'Browse';
    dropDirectionPara.appendChild(directionText);
    dropDirectionPara.appendChild(fileSelectButton);
    directionWithButtonDiv.appendChild(dropDirectionPara);

    //supportedFileTypePara
    var supportedFileTypePara = document.createElement('DIV');
    supportedFileTypePara.Id = 'supportedFileTypePara' + getGuid();
    supportedFileTypePara.className = 'supportedFileTypePara';
    supportedFileTypeParaId = supportedFileTypePara.Id;
    //showing supported file types message
    var supportedFilesFormatText = document.createTextNode(supportedFormatsText);
    supportedFileTypePara.appendChild(supportedFilesFormatText);

    var uploadControlDragAreaDiv = document.createElement('DIV');
    uploadControlDragAreaDiv.id = 'fileDrag' + getGuid(); // ToDo :Replace by generateGUID call in Utility Class
    uploadControlDragAreaDivId = uploadControlDragAreaDiv.id;
    uploadControlDragAreaDiv.className = dropZoneClass;
    var upArrowCircleDiv = document.createElement('DIV');
    upArrowCircleDiv.className = 'upArrowCircle';
    var upArrowDiv = document.createElement('DIV');
    upArrowDiv.className = 'upArrow';
    upArrowCircleDiv.appendChild(upArrowDiv);
    uploadControlDragAreaDiv.appendChild(upArrowCircleDiv);
    uploadControlDragAreaDiv.appendChild(directionWithButtonDiv);
    uploadControlDragAreaDiv.appendChild(supportedFileTypePara);

    fileUploadCtrl = document.createElement('INPUT');
    fileUploadCtrl.id = 'fileInput' + getGuid(); // ToDo :Replace by generateGUID call in Utility Class
    fileUploadControlId = fileUploadCtrl.id;
    fileUploadCtrl.type = 'file';
    if (isMultiFileUpload) {
      //need to set 'multiple' in the input file control's mulitple property for selecting multiple files
      fileUploadCtrl.multiple = 'multiple';
    }

    var hidefileDiv = document.createElement('DIV');
    hidefileDiv.className = 'ifb_fileUploadCtrl';

    hidefileDiv.appendChild(fileUploadCtrl);
    uploadControlDragAreaDiv.appendChild(hidefileDiv);

    //progress Div
    var filesUploadedAreaDiv = document.createElement('DIV');
    filesUploadedAreaDiv.id = 'uploadShowCase'; // ToDo :Replace by generateGUID call in Utility Class
    filesUploadedAreaDivId = filesUploadedAreaDiv.id;
    filesUploadedAreaDiv.className = 'clearfix uploadedArea';
    // var filesUploadedOverlay = document.createElement('DIV');
    //filesUploadedOverlay.className = 'uploadedAreaOverlay';

    //cancel button
    var cancelButton = document.createElement('BUTTON');
    cancelButton.className = 'btn btn-primary btn-sm fileUploadBtn cancelButton';
    cancelButton.id = 'fileUploadBtn' + getGuid(); // ToDo :Replace by generateGUID call in Utility Class
    cancelButtonId = cancelButton.id;
    cancelButton.textContent = 'Cancel';

    divToBind.appendChild(uploadControlDragAreaDiv);
    divToBind.appendChild(filesUploadedAreaDiv);

    //add the cancel and upload buttons in a div
    var divButtonWrapper = document.createElement('DIV');
    divButtonWrapper.className = 'clearfix actionButtonHolder';
    divButtonWrapper.appendChild(cancelButton);
    divToBind.parentNode.insertBefore(divButtonWrapper, divToBind.nextSibling);
    //add event listener to the click event of file select, upload and cancel button
    fileSelectButton.addEventListener('click', selectFile, false);
    cancelButton.addEventListener('click', cancelUpload, false);
    //add event listener to the change event of file select button
    fileUploadCtrl.addEventListener('change', fileSelectHandler, false);

    var xhrRequest = getXmlHttpRequestObject();

    if (xhrRequest.upload) {
      var divDragDrop = document.getElementById(uploadControlDragAreaDivId);
      divDragDrop.addEventListener('dragenter', dragEnter, false);
      divDragDrop.addEventListener('dragover', fileDragHover, false);
      divDragDrop.addEventListener('dragleave', dragLeave, false);
      divDragDrop.addEventListener('drop', fileSelectHandler, false);
    }
  }

  angular.element(document).ready(function () {
    initialize(opts);
  });
};

export {FileUpload};
