/* eslint-disable */
class SingleFileUpload {

  constructor(element, options = {}) {
    this.mainParent = typeof element === 'object' ? element : document.querySelector(element);
    this.options = {};
    this.options.fileInputSize = options.fileInputSize || 'em-txt-lg';
    this.options.fileInputId = options.fileInputId || 'fileUploadCtrl' + this.getGuid();
    this.options.selectButtonText = options.selectButtonText || 'Browse Files';
    this.onselect = options.onselect|| function(e){};
    this.init();
  }
  init() {

    this.fileUploadCtrl = document.createElement('INPUT');
    this.fileUploadCtrl.id =  this.options.fileInputId// ToDo :Replace by generateGUID call in Utility Class
    this.fileUploadCtrl.type = 'file';
    this.fileUploadCtrl.addEventListener('change', this.changeHandle.bind(this));

    var fileUploadCtrlDiv = document.createElement('div');
    fileUploadCtrlDiv.className = 'file-input-hide';
    fileUploadCtrlDiv.appendChild(this.fileUploadCtrl);

    this.fileTextInput = document.createElement('INPUT');
    this.fileTextInput.className = 'form-control ' + this.options.fileInputSize;
    this.fileTextInput.disabled = 'disabled';

    this.fileTextInput.id = 'fileTextInput' + this.getGuid(); // ToDo :Replace by generateGUID call in Utility Class
    this.fileTextInput.type = 'text';

    //select button
    this.fileSelectButton = document.createElement('BUTTON');
    this.fileSelectButton.id = 'fileButton' + this.getGuid(); // ToDo :Replace by generateGUID call in Utility Class
    this.fileSelectButton.className = 'btn em-btn-tertiary';
    this.fileSelectButton.textContent = this.options.selectButtonText;
    this.fileSelectButton.addEventListener('click', this.selectHandle.bind(this));

    var fileUploadTextDiv = document.createElement('div');
    fileUploadTextDiv.className = 'file-input-text-button';
    fileUploadTextDiv.appendChild(this.fileTextInput);
    fileUploadTextDiv.appendChild(this.fileSelectButton);

    this.mainParent.appendChild(fileUploadCtrlDiv);
    this.mainParent.appendChild(fileUploadTextDiv);
  }
  changeHandle(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (files[0]) {
      this.fileTextInput.value = files[0].name;
    }
    this.onselect(e);
    console.log(this.fileUploadCtrl.value);
  }

selectHandle() {
  this.fileUploadCtrl.click();
}
  // To Do Remove this function and use Utilty.generateGUID when integating with IFB angularJS
  getGuid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }
   //To Do Remove this function and use Utilty.generateGUID when integating with IFB angularJS
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

}

export {SingleFileUpload};
