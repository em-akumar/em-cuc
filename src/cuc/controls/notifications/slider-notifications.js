/* eslint-disable */
class SliderNotifications {

  constructor(options = {}) {
    //el.style.opacity = 1;
    this.mainEl = document.querySelector('body');
    this.options = {};
    this.options.containerEl = options.containerEl || '';
    this.options.fadeOutTimeout = options.fadeOutTimeout || 5000;
    this.options.fadeOutSpeed = options.fadeOutSpeed || 50;
    this.options.sliderCloseFlag = options.sliderCloseFlag === 'false' ? false : true;
    this.options.sliderIconFlag = options.sliderIconFlag === 'false' ? false : true;
    this.options.sliderBtnFlag = options.sliderBtnFlag === 'true' ? true : false;
    this.options.sliderBtnText = options.sliderBtnText ? options.sliderBtnText : 'Default';
    this.options.sliderChkFlg = options.sliderChkFlg === 'true' ? true : false;
    this.options.chkBoxLable = options.chkBoxLable ? options.chkBoxLable : 'Mauris vel lacus vitae felis vestibulum volutpat.';
    this.options.headerText = options.headerText || '';
    this.options.bodyContent = options.bodyContent || '';
    this.options.sliderType = options.sliderType || 'success';
    this.options.sliderAutoClose = options.sliderAutoClose === 'false' ? false : true;
    //slider-lock
    this.options.sliderPosition = options.sliderPosition || 'slider-relative';

    this.init();
  }

  init() {
    //this.setTriming();
    this.initTempl();
    this.render();
    if (this.options.sliderAutoClose === true) { this.destroy(); }
  }

  initTempl() {
    this.closeTmpl = (this.options.sliderCloseFlag === true)? `<div class="close-slider"><a href="#" class="close" data-dismiss="alert">&times;</a></div>`:` `;
    this.iconTmpl = (this.options.sliderIconFlag === true)? `<div class="noti-slider-icon"><span class="alert-${this.options.sliderType}-slider-icon"></span></div>`:` `;
    this.contentTmpl = `<span class="alert-text-header">${ this.options.headerText}</span><span class="alert-text-body">&nbsp;${ this.options.bodyContent}</span>`;
    this.buttonTmpl = (this.options.sliderBtnFlag === true)? `<button type="button" class="btn btn btn-default btn-sm-var-height">${ this.options.sliderBtnText}</button>`: ` `;
    this.checkboxTmpl = (this.options.sliderChkFlg === true)? `<div class="checkbox check-slider"> <input type="checkbox" id="chk25"><label for="chk25" class="checkbox-slider-noti">${this.options.chkBoxLable}</label></div>`: ` `;
  }

  renderContent() {
    var notiDiv = document.createElement('div');
    notiDiv.setAttribute('class', 'alert alert-slide-down alert-'+ this.options.sliderType +' '+this.options.sliderPosition);
    notiDiv.innerHTML = this.closeTmpl + this.iconTmpl + this.contentTmpl +  this.buttonTmpl + this.checkboxTmpl;
    this.options.sliderEl = notiDiv;
    this.options.containerEl !== ''? this.options.containerEl.parentNode.insertBefore(notiDiv, this.options.containerEl.nextSibling):this.mainEl.insertBefore(notiDiv, this.mainEl.firstChild);
  }

  render(){
    this.renderContent();
   // this.renderEvent();
  }

  fadeOutNoti() {
      let op = 1;
      let ele = this.options.sliderEl;
      let timer = setInterval(function () {
        if (op <= 0.1){
          clearInterval(timer);
          ele.parentNode.removeChild(ele);
        }
        ele.style.opacity = op;
        ele.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      },  this.options.fadeOutSpeed);
  }

  destroy() {
    var self = this;
    var startTimeOut = setTimeout(function(){self.fadeOutNoti()}, self.options.fadeOutTimeout);
   /* this.mainEl.addEventListener('mouseover', function(e) {
      clearTimeout(startTimeOut);
    });
    this.mainEl.addEventListener('mouseout', function(e) {
      startTimeOut = setTimeout(function(){self.fadeOutNoti()}, self.options.onMouseoverFadeOut);
    });*/
  }
}


export {SliderNotifications};
