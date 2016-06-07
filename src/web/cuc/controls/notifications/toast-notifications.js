/* eslint-disable */
class ToastNotifications {

  constructor(el, options = {}) {
    el.style.opacity = 1;
    this.mainEl = el;
    this.options = {};
    this.options.maxString = options.maxString || 65;
    this.options.fadeOutTimeout = options.fadeOutTimeout || 5000;
    this.options.onMouseoverFadeOut = options.onMouseoverFadeOut || 2500;
    this.options.fadeOutSpeed = options.fadeOutSpeed || 50;
    this.options.notiIconFlag = options.notiIconFlag === 'false' ? false : true;
    this.options.title = options.title || '';
    this.options.text = options.text || '';
    this.options.notiType = options.notiType || 'alert';
    this.options.notiLink = options.notiLink || '';

    this.init();
  }

  init() {
    this.setTriming();
    this.initTempl();
    this.render();
    this.destroy();
  }

  initTempl() {
     this.iconTmpl = (this.options.notiIconFlag === true)? `<div class="noti-icon"><span class="${this.options.notiType}-noti-icon-white"></span></div>`:` `;
     this.contentTmpl = `<div class="noti-content"><div class="noti-header">${this.options.title}</div><div class="noti-body">${this.output}</div> </div>`;
     this.closeTmpl = `<div class="noti-icon-close" data-dismiss="alert"><span aria-hidden="true">&times;</span></div>`;
     this.boxTmpl = `<div class="noti-content"><div class="noti-header">You have <span class="noti-count-${this.options.notiType}">2</span> new ${this.options.notiType}s</div><div class="noti-body"><a href="${this.options.notiLink}" class="view-all">View All</a></div>`;
  }

  renderContent() {
     var oldNoti = document.querySelector('.noti-div-'+ this.options.notiType);
     var boxNoti = document.querySelector('.box-div-'+ this.options.notiType);
     if(oldNoti !== null) {//check toast notification is there , Add box for more than 1 notification of same type.
       this.mainEl.removeChild(oldNoti);
       var boxDiv = document.createElement('div');
       boxDiv.setAttribute('class', 'alert noti-container box-div-'+ this.options.notiType);
       boxDiv.innerHTML = this.iconTmpl + this.boxTmpl + this.closeTmpl;
       this.mainEl.appendChild(boxDiv);
     } else if(boxNoti !== null) {  //check if toast notification box of same type is there, increase the count.
       var notiCountSpan = document.querySelector('.noti-count-'+ this.options.notiType);
       notiCountSpan.innerHTML = (parseInt(notiCountSpan.innerHTML) + 1);
     } else { //else add the new toast notification
       var notiDiv = document.createElement('div');
       notiDiv.setAttribute('class', 'alert noti-container noti-div-'+ this.options.notiType);
       notiDiv.innerHTML = this.iconTmpl + this.contentTmpl + this.closeTmpl;
       this.mainEl.appendChild(notiDiv);


    }
    this.reInitTimer();
  }

  render() {
    this.renderContent();
    this.renderEvent();
  }

  setTriming() {
    var txt  = this.options.text;
    var originalText = txt;
    var stringlength = txt.length;

    if (stringlength > 100) {
      this.output =  originalText.substring(0, this.options.maxString) + '...' +'<a href="javascript:void(0)" class="noti-read-more">Read More</a>';
    }
    else {
      this.output = originalText;
    }
  }

  renderEvent() {
    var readMoreAnchor = this.mainEl.querySelector(".noti-read-more");
    if(readMoreAnchor !== null) {
      readMoreAnchor.addEventListener('click', function (e) {
        var containerNode = e.target.parentNode.parentNode.parentNode;
        containerNode.style.height = 'auto';
        e.target.parentNode.innerHTML = this.options.text;
        //this.style.display = 'none';
      }.bind(this));
    }
  }

  fadeOutNoti() {
      let op = 1;
      let ele = this.mainEl;
      let timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          ele.innerHTML = '';
        }
        ele.style.opacity = op;
        ele.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      },  this.options.fadeOutSpeed);
  }

  setTimer(timerset){

    if(!window._notitimer) {
      window._notitimer = '';
    }
    window._notitimer = timerset;
  }
  getTimer(){
    return  window._notitimer;
  }
  reInitTimer(){
      clearTimeout(this.getTimer());
    window._notitimer = '';

  }
  destroy() {
    //var startTimeout = setTimeout(function(){ self.fadeOutNoti()}, this.options.fadeOutTimeout);

    this.setTimer(setTimeout(function(){ this.fadeOutNoti()}.bind(this), this.options.fadeOutTimeout));
    this.mainEl.addEventListener('mouseover', function(e) {
      clearTimeout(this.getTimer());
    }.bind(this));
    this.mainEl.addEventListener('mouseout', function(e) {

       this.setTimer(setTimeout(function(){this.fadeOutNoti()}.bind(this), this.options.onMouseoverFadeOut));
    }.bind(this));
  }
}
export {ToastNotifications};
