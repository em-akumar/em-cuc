/* eslint-disable */
class ModalNotifications {

  constructor(element, options) {
    this.opened = false;
    this.modalParent = typeof element === 'object' ? element : document.querySelector(element);
    let modal = this.modalParent.getAttribute('data-target') || `#${this.modalParent.id}_modal`;
    this.modal = document.querySelector(modal);
    if (!this.modal) {
      this.modal = this.createElement('div', modal, 'body');
    }
    this.options = {};
    this.options.backdrop = options.backdrop === 'false' ? false : true;
    this.options.keyboard = options.keyboard === 'false' ? false : true;
    this.options.type = options.type || 'standard';
    this.options.icon = options.icon === 'false' ? false : true;
    this.options.notiType = options.notiType || 'alert';
    this.options.header = options.header === false? false : true;
    this.options.closeButton = options.closeButton === 'false'? false : true;
    this.options.content = options.content;
    this.options.bodyContent = options.bodyContent;
    this.options.headerText = options.headerText;
    this.options.modalSize = options.modalSize || 'medium';
    this.duration = options.duration || 300; // the default modal fade duration option
    this.options.duration = document.documentElement.classList.contains('ie') ? 0 : this.duration;
    this.options.buttons = options.buttons || [];
    this.timer = 0;
    if(this.options.type === 'standard') {
      this.options.backdrop = false;
      this.options.buttons = [];
    }
    else {
      this.options.keyboard = false;
    }
    this.template = `
  <div class="modal-dialog modal-notification modal-${this.options.modalSize}">
    <div class="modal-content">
    <div class="modal-header ${this.options.header? '' : 'no-display'}">
    <button type="button" class="close ${this.options.closeButton? '' : 'no-display'}" data-dismiss="modal" aria-label="Close"><span
    aria-hidden="true" class="close-icon">&times;</span></button>
    </div>
    <div class="modal-noti-icon ${this.options.icon? '' : 'no-display'}"><span class="modal-noti-${this.options.notiType}-white"></span></div>
    <div class="modal-body">
    <div class="modal-noti-header">${this.options.headerText}</div>
    <div class="modal-noti-body"> ${this.options.bodyContent}</div>
    </div>
    <div class="modal-footer ${this.options.buttons.length? '' : 'no-display'}">
    <div>
    <div class="modal-footer-button-holder">
      ${this.options.buttons.map((value, i) =>
`<button id="${value.id}" type="button" onclick="clickEvent(${value.active})" class="btn btn-md ${value.active? 'btn-primary' : 'btn-default'}" data-dismiss="modal"}>${value.text}</button>`
  ).join('') }
</div>
</div>
</div>
</div>
</div>
`;
    this.init();
}
init() {
  if (this.options.content && this.options.content !== undefined) {
    this.content(this.options.content);
  }
  if (!this.modalParent.getAttribute('data-target')) {
    if (!this.modal.classList.contains('modal')) {
      this.modal.classList.add('modal');
    }
    this.modal.innerHTML = this.template;
  }
  this.resize();
  this.dismiss();
  this.keydown();
  this.trigger();
  this.eventHandlers();
}

open() {
  this._open();
}

close() {
  this._close();
}

_open() {
  var self = this;

  if (this.options.backdrop) {
    this.createOverlay();
  } else { this.overlay = null; }

  document.body.classList.add('modal-open');
  this.modal.style.display = 'block';

  clearTimeout(self.modal.getAttribute('data-timer'));
  this.timer = setTimeout(function () {

    if (self.overlay !== null) {
      self._resize();
      self.overlay.classList.add('in');
    }
    self.modal.classList.add('in');
    self.modal.setAttribute('aria-hidden', false);
  }, self.options.duration / 2);
  this.modal.setAttribute('data-timer', self.timer);

  this.opened = true;
}

_close() {
  var self = this;

  this.modal.classList.remove('in');
  this.modal.setAttribute('aria-hidden', true);

  if (this.overlay) this.overlay.classList.remove('in');
  document.body.classList.remove('modal-open');

  clearTimeout(self.modal.getAttribute('data-timer'));
  this.timer = setTimeout(function () {
    self.modal.style.display = 'none';
    self.removeOverlay();
  }, self.options.duration / 2);
  this.modal.setAttribute('data-timer', self.timer);

  this.opened = false;
}

content(content) {
  this.modal.querySelector('.modal-content').innerHTML = content;
  return content;
}

createOverlay() {
  var backdrop = document.createElement('div');
  var overlay = document.querySelector('.modal-backdrop');
  backdrop.setAttribute('class', 'modal-backdrop fade');

  if (overlay) {
    this.overlay = overlay;
  } else {
    this.overlay = backdrop;
    document.body.appendChild(backdrop);
  }
}

removeOverlay() {
  var overlay = document.querySelector('.modal-backdrop');
  if (overlay !== null && overlay !== undefined) {
    document.body.removeChild(overlay);
  }
}

keydown() {
  var self = this;
  document.addEventListener('keydown', function (e) {
    if (self.options.keyboard && e.which == 27) {
      self.close();
    }
  }, false);
}

trigger() {
  var self = this;
  this.modalParent.addEventListener('click', function (e) {
    var b = e.target;
    var s = b.getAttribute('data-target') && b.getAttribute('data-target').replace('#', '') || b.getAttribute('href') && b.getAttribute('href').replace('#', '');
    if (!s) {
      s = `${b.id}_modal`;
    }
    if (document.getElementById(s) === self.modal) {
      self.open();
    }
  });
}

eventHandlers() {
  if (!this.modalParent.getAttribute('data-target')) {
    this.options.buttons.forEach((element) => {
      console.log(element.id);
    document.getElementById(element.id).addEventListener("click", (e) => {
      if (element.click) element.click();
  });
}, this);
}
}

_resize() {
  var self = this;
  var overlay = this.overlay || document.querySelector('.modal-backdrop');
  var dim = {
    w: document.documentElement.clientWidth + 'px',
    h: document.documentElement.clientHeight + 'px'
  };
  setTimeout(function () {
    if (overlay !== null && overlay.classList.contains('in')) {
      overlay.style.height = dim.h; overlay.style.width = dim.w;
    }
  }, self.options.duration / 2);
}

resize() {
  var self = this;
  window.addEventListener('resize', function () {
    setTimeout(function () {
      self._resize();
    }, 50);
  }, false);
}

dismiss() {
  var self = this;
  this.modal.addEventListener('click', function (e) {
    if (e.target.parentNode.getAttribute('data-dismiss') === 'modal' || e.target.getAttribute('data-dismiss') === 'modal' || (self.options.type === 'standard' && e.target === self.modal) ) {
      e.preventDefault(); self.close();
    }
  });
}

createElement(el, prop, target) {
  var props = prop.split('.');
  var  newelement = document.createElement(el);
  var  id = '';
  var  className = '';
  props.forEach((val, i) => {
    if (val.indexOf('#') >= 0) {
    id += val.replace(/^#/, '');
  } else {
    className += val + ' ';
  }
});
if (id.length) newelement.setAttribute('id', id);
if (className.length) newelement.setAttribute('class', className.trim());
document.querySelector(target).appendChild(newelement);
return newelement;
}

}

export {ModalNotifications};