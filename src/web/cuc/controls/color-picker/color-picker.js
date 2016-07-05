/* eslint-disable */
let ColorPicker = (function(window, document, opts) {
  console.log('opts ', opts);
  var type =
    (window.SVGAngle ||
    document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')
      ? 'SVG'
      : 'VML');
  var picker;
  var slide;
  var hueOffset = 15;
  var svgNS = 'http://www.w3.org/2000/svg';

  // This HTML snippet is inserted into the innerHTML property of the passed
  // color picker element
  // when the no-hassle call to ColorPicker() is used, i.e.
  // ColorPicker(function(hex, hsv, rgb) { ... });

  var colorpickerHTMLSnippet = [

    '<div class="picker-wrapper">',
    '<div class="picker"></div>',
    '<div class="picker-indicator"></div>',
    '</div>',
    '<div class="slide-wrapper">',
    '<div class="slide"></div>',
    '<div class="slide-indicator"></div>',
    '</div>'

  ].join('');

  /**
   * Return mouse position relative to the element el.
   */
  function mousePosition(evt) {
    // IE:
    if (window.event && window.event.contentOverflow !== undefined) {
      return {x: window.event.offsetX, y: window.event.offsetY};
    }
    // Webkit:
    if (evt.offsetX !== undefined && evt.offsetY !== undefined) {
      return {x: evt.offsetX, y: evt.offsetY};
    }
    // Firefox:
    var wrapper = evt.target.parentNode.parentNode;
    return {
      x: evt.layerX - wrapper.offsetLeft,
      y: evt.layerY - wrapper.offsetTop
    };
  }

  /**
   * Create SVG element.
   */
  function $(el, attrs, children) {
    el = document.createElementNS(svgNS, el);
    for (var key in attrs)
      el.setAttribute(key, attrs[key]);
    if (Object.prototype.toString.call(children) !== '[object Array]')
      children = [children];
    var i = 0;
    var len = (children[0] && children.length) || 0;
    for (; i < len; i++)
      el.appendChild(children[i]);
    return el;
  }

  /**
   * Create slide and picker markup depending on the supported technology.
   */
  if (type === 'SVG') {

    slide = $('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        version: '1.1',
        width: '100%',
        height: '100%'
      },
      [
        $('defs', {},
          $('linearGradient', {id: 'gradient-hsv', x1: '0%', y1: '100%', x2: '0%', y2: '0%'},
            [
              $('stop', {offset: '0%', 'stop-color': '#FF0000', 'stop-opacity': '1'}),
              $('stop', {offset: '13%', 'stop-color': '#FF00FF', 'stop-opacity': '1'}),
              $('stop', {offset: '25%', 'stop-color': '#8000FF', 'stop-opacity': '1'}),
              $('stop', {offset: '38%', 'stop-color': '#0040FF', 'stop-opacity': '1'}),
              $('stop', {offset: '50%', 'stop-color': '#00FFFF', 'stop-opacity': '1'}),
              $('stop', {offset: '63%', 'stop-color': '#00FF40', 'stop-opacity': '1'}),
              $('stop', {offset: '75%', 'stop-color': '#0BED00', 'stop-opacity': '1'}),
              $('stop', {offset: '88%', 'stop-color': '#FFFF00', 'stop-opacity': '1'}),
              $('stop', {offset: '100%', 'stop-color': '#FF0000', 'stop-opacity': '1'})
            ]
          )
        ),
        $('rect', {x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#gradient-hsv)'})
      ]
    );

    picker = $('svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        version: '1.1',
        width: '100%',
        height: '100%'
      },
      [
        $('defs', {},
          [
            $('linearGradient',
              {
                id: 'gradient-black',
                x1: '0%',
                y1: '100%',
                x2: '0%',
                y2: '0%'
              },
              [
                $('stop',
                  {
                    offset: '0%',
                    'stop-color': '#000000',
                    'stop-opacity': '1'
                  }),
                $('stop',
                  {
                    offset: '100%',
                    'stop-color': '#CC9A81',
                    'stop-opacity': '0'
                  })
              ]),
            $('linearGradient',
              {
                id: 'gradient-white',
                x1: '0%',
                y1: '100%',
                x2: '100%',
                y2: '100%'
              },
              [
                $('stop',
                  {
                    offset: '0%',
                    'stop-color': '#FFFFFF',
                    'stop-opacity': '1'
                  }),
                $('stop',
                  {
                    offset: '100%',
                    'stop-color': '#CC9A81',
                    'stop-opacity': '0'
                  })
              ])
          ]),
        $('rect',
          {
            x: '0',
            y: '0',
            width: '100%',
            height: '100%',
            fill: 'url(#gradient-white)'
          }),
        $('rect',
          {
            x: '0',
            y: '0',
            width: '100%',
            height: '100%',
            fill: 'url(#gradient-black)'
          })
      ]);

  } else if (type === 'VML') {
    slide = [
      '<DIV style="position: relative; width: 100%; height: 100%">',
      '<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">',
      '<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>',
      '</v:rect>',
      '</DIV>'
    ].join('');

    picker = [
      '<DIV style="position: relative; width: 100%; height: 100%">',
      '<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">',
      '<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',
      '</v:rect>',
      '<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">',
      '<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',
      '</v:rect>',
      '</DIV>'
    ].join('');

    if (!document.namespaces.v)
      document.namespaces.add('v', 'urn:schemas-microsoft-com:vml',
        '#default#VML');
  }
  function hex2rgb(hex) {
    var bigint, r, g, b, a;
    // Remove # character
    var re = /^#?/;
    var aRgb = hex.replace(re, '');
    if (aRgb.length === 3) {
      bigint = parseInt(aRgb, 16);
      r = (bigint >> 4) & 255;
      g = (bigint >> 2) & 255;
      b = bigint & 255;
      return {
        r: r,
        g: g,
        b: b,
        hex: '#' + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
      };
    }
    if (aRgb.length === 6) {
      bigint = parseInt(aRgb, 16);
      r = (bigint >> 16) & 255;
      g = (bigint >> 8) & 255;
      b = bigint & 255;
      return {
        r: r,
        g: g,
        b: b,
        hex: '#' + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
      };
    }
    if (aRgb.length === 8) {
      bigint = parseInt(aRgb, 16);
      a = ((bigint >> 24) & 255) / 255;
      r = (bigint >> 16) & 255;
      g = (bigint >> 8) & 255;
      b = bigint & 255;
      return {
        r: r,
        g: g,
        b: b,
        hex: '#' + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
      };
    }
  }

  /**
   * Convert HSV representation to RGB HEX string.
   * Credits to http://www.raphaeljs.com
   */
  function hsv2rgb(hsv) {
    var R;
    var G;
    var B;
    var X;
    var C;
    var h = (hsv.h % 360) / 60;

    C = hsv.v * hsv.s;
    X = C * (1 - Math.abs(h % 2 - 1));
    R = G = B = hsv.v - C;

    h = ~~h;
    R += [C, X, 0, 0, X, C][h];
    G += [X, C, C, X, 0, 0][h];
    B += [0, 0, X, C, C, X][h];

    var r = Math.floor(R * 255);
    var g = Math.floor(G * 255);
    var b = Math.floor(B * 255);
    return {
      r: r,
      g: g,
      b: b,
      hex: '#' + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
    };
  }

  /**
   * Convert RGB representation to HSV.
   * r, g, b can be either in <0,1> range or <0,255> range.
   * Credits to http://www.raphaeljs.com
   */
  function rgb2hsv(rgb) {

    var r = rgb.r;
    var g = rgb.g;
    var b = rgb.b;

    if (rgb.r > 1 || rgb.g > 1 || rgb.b > 1) {
      r /= 255;
      g /= 255;
      b /= 255;
    }

    var H;
    var S;
    var V;
    var C;
    V = Math.max(r, g, b);
    C = V - Math.min(r, g, b);
    H = (C === 0 ? null : V === r ? (g - b) / C + (g < b ? 6 : 0)
      : V === g ? (b - r) / C + 2 : (r - g) / C + 4);
    H = (H % 6) * 60;
    S = C === 0 ? 0 : C / V;
    return {h: H, s: S, v: V};
  }

  /**
   * Return click event handler for the slider.
   * Sets picker background color and calls ctx.callback if provided.
   */
  function slideListener(ctx, slideElement, pickerElement) {
    return function(evt) {
      evt = evt || window.event;
      var mouse = mousePosition(evt);
      ctx.h = mouse.y / slideElement.offsetHeight * 360 + hueOffset;
      var pickerColor = hsv2rgb({h: ctx.h, s: 1, v: 1});
      var c = hsv2rgb({h: ctx.h, s: ctx.s, v: ctx.v});
      pickerElement.style.backgroundColor = pickerColor.hex;
      ctx.callback &&
      ctx.callback(c.hex, {h: ctx.h - hueOffset, s: ctx.s, v: ctx.v},
        {r: c.r, g: c.g, b: c.b}, undefined, mouse);
    };
  }

  /**
   * Return click event handler for the picker.
   * Calls ctx.callback if provided.
   */
  function pickerListener(ctx, pickerElement) {
    return function(evt) {
      evt = evt || window.event;
      var mouse = mousePosition(evt);
      var width = pickerElement.offsetWidth;
      var height = pickerElement.offsetHeight;

      ctx.s = mouse.x / width;
      ctx.v = (height - mouse.y) / height;
      var c = hsv2rgb(ctx);
      ctx.callback &&
      ctx.callback(c.hex, {h: ctx.h - hueOffset, s: ctx.s, v: ctx.v},
        {r: c.r, g: c.g, b: c.b}, mouse);
    };
  }

  function loadColors(_this, colorvalue) {
    _.each(colorvalue, function(value, key) {
      let loadValue = value.value;
      if (loadValue.length > 2) {
        applyValidation(value);
        displayColor(_this, value.value, true);
      }
    })
  }

  function displayColor(self, colorValue, perColor) {
    if (colorValue !== '') {
      self.mainElement.querySelector('.color-holder').style.backgroundColor = '#' + colorValue;
      self.mainElement.querySelector('.color-holder').style.backgroundImage = 'none';
      self.mainElement.querySelector('.color-holder').classList.remove('diagonal-line');
      integrateEM(self.mainElement, colorValue, hex2rgb(colorValue));
    } else {
      //if no value entered on tab out values stay the same 
      self.mainElement.querySelector('.color-holder').style.backgroundColor = '#' + colorValue;
      self.mainElement.querySelector('.em-input-color').value = self.mainElement.querySelector('.hex').value
    }
  }

  function applyValidation(hexTextValue) {
    if (hexTextValue.value.length < 6 && hexTextValue.value.length > 0) {
      var ch = hexTextValue.value.charAt(0).toUpperCase();
      var bk = hexTextValue.value.split("");
      var len = hexTextValue.value.length;
      while (len > 0) {
        if (ch !== hexTextValue.value.charAt(len - 1).toUpperCase()) {
          break;
        }
        len--;
      }
      // special case if three values are letters duplicate them
      if (len > 0 && bk.length === 3 && isNaN(bk[0]) && isNaN(bk[1]) && isNaN(bk[2])) {
        while (hexTextValue.value.length < 6) {
          var repeatnumber = bk[0] + bk[0] + bk[1] + bk[1] + bk[2] + bk[2];
          hexTextValue.value = repeatnumber.toUpperCase();
        }
      }
      if (len > 0) {
        while (hexTextValue.value.length < 6) {
          hexTextValue.value = "0" + hexTextValue.value;
        }
      }
      else {
        while (hexTextValue.value.length < 6) {
          hexTextValue.value = hexTextValue.value + hexTextValue.value.charAt(0);
        }
      }
    }
    hexTextValue.value = hexTextValue.value.toUpperCase();
  }

  var uniqID = 0;

  /**
   * ColorPicker.
   * @param {DOMElement} slideElement HSV slide element.
   * @param {DOMElement} pickerElement HSV picker element.
   * @param {Function} callback Called whenever the color is changed provided
   * chosen color in RGB HEX format as the only argument.
   */
  function ColorPicker(mainElement, pickerElement, noColorState, callback) {

    let contenthtml = `<div class="dropdown-menu color-menu">
                <div class="blocks-inline">
                  <div class="cp-default color-picker"></div>
                </div>
                <div class="blocks-inline ">
                  <div class="color-value">
                  <div class="form-group em-lbl-left">
                    <label for="red">R</label>
                    <input type="text" class="form-control em-txt-ex-sm red" placeholder="" >
                  </div>
                  <div class="form-group em-lbl-left">
                    <label for="green">G</label>
                    <input type="text" class="form-control em-txt-ex-sm green" placeholder="" >
                  </div>
                  <div class="form-group em-lbl-left">
                    <label for="blue">B</label>
                    <input type="text" class="form-control em-txt-ex-sm blue" placeholder="">
                  </div>
                  <div class="form-group em-lbl-left">
                    <label for="hex">Hex #</label>
                    <input type="text" class="form-control em-txt-ex-sm hex" placeholder="" maxlength="6">
                  </div>
                  <div class="form-group em-lbl-left">
                    <button class="btn no-color diagonal-line"></button>
                  </div>
                  </div>
                  <div class="form-group em-lbl-left color-boxes">
                    <div class="blocks-inline">
                      <label>Current</label>
                      <div class="old-color current"></div>
                    </div>
                    <div class="blocks-inline">
                      <label>New Color</label>
                      <div class="new-color new"></div>
                    </div>
                  </div>
                </div>
              </div>`;
    let divTemp = document.createElement('div');
    divTemp.innerHTML = contenthtml;
    mainElement.querySelector('button').parentNode.insertBefore(
      divTemp.childNodes[0], mainElement.querySelector('button').nextSibling);
    this.mainElement = mainElement;

    document.getElementsByTagName('html')[0].addEventListener('click', function(e) {
      this.mainElement.querySelector('button').parentNode.classList.remove('open');
    }.bind(this));

    mainElement.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    document.getElementsByTagName('html')[0].addEventListener('keydown', (e)=> {
      if (e.keyCode === 27) {
        this.mainElement.querySelector('button').parentNode.classList.remove('open');
      }
    });

    mainElement.querySelector('button').addEventListener('click', function(e) {
      // on click of one color picker close other color picker
      [].forEach.call(document.querySelectorAll(".color-menu"), (value, i) => {
        if (value.parentNode.parentNode !== mainElement) {
          value.parentNode.classList.remove('open');
        }
      });
      this.parentNode.classList.toggle('open');
    });

    var slideElement = this.mainElement.querySelector('.color-picker');
    if (true) {
      let colorvalue = document.getElementsByClassName('em-input-color');
      loadColors(this, colorvalue);
      this.textBox = this.mainElement.querySelector('.em-input-color');
      this.textBox.addEventListener('keypress', (e) => {
        var keycode = (e.which) ? e.which : e.keyCode;
        if ((keycode >= 48 && keycode <= 57) ||
          (keycode >= 65 && keycode <= 70) ||
          (keycode >= 97 && keycode <= 102) || keycode === 8 || keycode === 9 || keycode === 37 || keycode === 39) {
          var hexTextValue = e.srcElement || e.target;
          //displayColor(this, hexTextValue.value);
          return true;
        }
        e.preventDefault();
        return false;
      });

      this.textBox.addEventListener('blur', e => {
        var hexTextValue = e.srcElement || e.target;
        applyValidation(hexTextValue);
        document.querySelector('.hex').value = hexTextValue.value;
        displayColor(this, hexTextValue.value);
      });
    }

    var insideHexValue = this.mainElement.querySelector('.hex');
    insideHexValue.addEventListener('keypress', (e) => {
      var keycode = (e.which) ? e.which : e.keyCode;
      if ((keycode >= 48 && keycode <= 57) ||
        (keycode >= 65 && keycode <= 90) ||
        (keycode >= 97 && keycode <= 102) || keycode === 8 || keycode === 9 || keycode === 37 || keycode === 39) {
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    });
    insideHexValue.addEventListener('keyup', (e) => {
      var hexTextValue = e.srcElement || e.target;
      var keycode = (e.which) ? e.which : e.keyCode;
      if ((keycode >= 48 && keycode <= 57) ||
        (keycode >= 65 && keycode <= 90) ||
        (keycode >= 97 && keycode <= 102) || keycode === 8 || keycode === 9 || keycode === 37 || keycode === 39) {
        if (document.querySelector('.em-input-color')) {
          document.querySelector('.em-input-color').value = hexTextValue.value;
        }
      }
    });
    insideHexValue.addEventListener('blur', (e) => {
      var hexTextValue = e.srcElement || e.target;
      applyValidation(hexTextValue);
      displayColor(this, hexTextValue.value);
    });

    //select no color
    this.mainElement.querySelector('.no-color').addEventListener('click', (e) => {
      var self = this;
      self.mainElement.querySelector('.red').value = '';
      self.mainElement.querySelector('.green').value = '';
      self.mainElement.querySelector('.blue').value = '';
      self.mainElement.querySelector('.hex').value = '';
      if (self.mainElement.querySelector('.em-input-color'))
        self.mainElement.querySelector('.em-input-color').value = '',
          self.mainElement.querySelector('.new').style.backgroundColor = '';
      self.mainElement.querySelector('.new').classList.add('diagonal-line');
      self.mainElement.querySelector('.color-holder').removeAttribute('style');
      self.mainElement.querySelector('.color-holder').classList.add('diagonal-line');
    });

    // if (!(this instanceof ColorPicker)) return new ColorPicker(mainElement,
    // pickerElement, callback);

    this.h = 0;
    this.s = 1;
    this.v = 1;

    if (!callback) {
      // call of the form ColorPicker(element, funtion(hex, hsv, rgb) { ... }),
      // i.e. the no-hassle call.

      var element = slideElement;
      element.innerHTML = colorpickerHTMLSnippet;

      this.slideElement = element.getElementsByClassName('slide')[0];
      this.pickerElement = element.getElementsByClassName('picker')[0];
      var slideIndicator = element.getElementsByClassName('slide-indicator')[0];
      var pickerIndicator = element.getElementsByClassName('picker-indicator')[0];

      ColorPicker.fixIndicators(slideIndicator, pickerIndicator);

      this.callback = function(hex, hsv, rgb, pickerCoordinate,
                               slideCoordinate) {

        ColorPicker.positionIndicators(slideIndicator, pickerIndicator,
          slideCoordinate, pickerCoordinate);
        if (this.mainElement) {
          console.log('pick your battles', pickerIndicator);
          this.mainElement.addEventListener('click', (e) => {
            console.log('we made it here', e);
            var pickedColor = pickerIndicator;
            console.log('the pickker selected', pickedColor);
            this.callbackSelected(e);
          });

          callback();
          // // if (this.mainElement.querySelector('.em-input-color')) {
          // //     this.textBox = this.mainElement.querySelector('.em-input-color');
          // //     this.textBox.addEventListener('keypress', function(e) {
          // var boom = this.mainElement.querySelector('.picker-indicator');
          // pickerIndicator.addEventListener('click', function(e) {
          //   var pickIt = e.srcElement || e.target;
          //   console.log('do you have your target!', pickIt)
          // })
          integrateEM(this.mainElement, hex, rgb);
        }
        // if(pickerElement){
        // pickerElement(hex, hsv, rgb);}
      };

    } else {

      this.callback = callback;
      this.pickerElement = pickerElement;
      this.slideElement = slideElement;
    }

    if (type === 'SVG') {

      // Generate uniq IDs for linearGradients so that we don't have the same
      // IDs within one document.
      // Then reference those gradients in the associated rectangles.

      var slideClone = slide.cloneNode(true);
      var pickerClone = picker.cloneNode(true);

      var hsvGradient = slideClone.getElementById('gradient-hsv');

      var hsvRect = slideClone.getElementsByTagName('rect')[0];

      hsvGradient.id = 'gradient-hsv-' + uniqID;
      hsvRect.setAttribute('fill', 'url(#' + hsvGradient.id + ')');

      var blackAndWhiteGradients = [
        pickerClone.getElementById('gradient-black'),
        pickerClone.getElementById('gradient-white')
      ];
      var whiteAndBlackRects = pickerClone.getElementsByTagName('rect');

      blackAndWhiteGradients[0].id = 'gradient-black-' + uniqID;
      blackAndWhiteGradients[1].id = 'gradient-white-' + uniqID;

      whiteAndBlackRects[0].setAttribute(
        'fill', 'url(#' + blackAndWhiteGradients[1].id + ')');
      whiteAndBlackRects[1].setAttribute(
        'fill', 'url(#' + blackAndWhiteGradients[0].id + ')');

      this.slideElement.appendChild(slideClone);
      this.pickerElement.appendChild(pickerClone);

      uniqID++;

    } else {

      this.slideElement.innerHTML = slide;
      this.pickerElement.innerHTML = picker;
    }

    addEventListener(
      this.slideElement, 'click',
      slideListener(this, this.slideElement, this.pickerElement));
    addEventListener(this.pickerElement, 'click',
      pickerListener(this, this.pickerElement));

    enableDragging(this, this.slideElement,
      slideListener(this, this.slideElement, this.pickerElement));
    enableDragging(this, this.pickerElement,
      pickerListener(this, this.pickerElement));

  }

  function integrateEM(element, hex, rgb) {
    var oldColor = element.querySelector('.new').style.backgroundColor;
    if (rgb) {
      element.querySelector('.color-holder').style.backgroundColor =
        'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
      element.querySelector('.red').value = rgb.r;
      element.querySelector('.green').value = rgb.g;
      element.querySelector('.blue').value = rgb.b;
    }

    element.querySelector('.color-holder').style.backgroundImage = 'none';
    element.querySelector('.new').classList.remove('diagonal-line');
    element.querySelector('.color-holder').classList.remove('diagonal-line');
    if (element.querySelector('.em-input-color')) {
      element.querySelector('.em-input-color').value = hex.replace('#', '');
    }
    element.querySelector('.hex').value = hex.replace('#', '');
    element.querySelector('.current').style.backgroundColor = oldColor;
    element.querySelector('.new').style.backgroundColor = (hex.indexOf('#') !== -1 ) ? hex : '#' + hex;

  }

  function addEventListener(element, event, listener) {

    if (element.attachEvent) {

      element.attachEvent('on' + event, listener);

    } else if (element.addEventListener) {

      element.addEventListener(event, listener, false);
    }
  }

  /**
   * Enable drag&drop color selection.
   * @param {object} ctx ColorPicker instance.
   * @param {DOMElement} element HSV slide element or HSV picker element.
   * @param {Function} listener Function that will be called whenever mouse is
   * dragged over the element with event object as argument.
   */
  function enableDragging(ctx, element, listener) {

    var mousedown = false;

    addEventListener(element, 'mousedown', function(evt) {
      mousedown = true;
    });
    addEventListener(element, 'mouseup', function(evt) {
      mousedown = false;
    });
    addEventListener(element, 'mouseout', function(evt) {
      mousedown = false;
    });
    addEventListener(element, 'mousemove', function(evt) {

      if (mousedown) {

        listener(evt);
      }
    });
  }

  ColorPicker.hsv2rgb = function(hsv) {
    var rgbHex = hsv2rgb(hsv);
    delete rgbHex.hex;
    return rgbHex;
  };

  ColorPicker.hsv2hex = function(hsv) {
    return hsv2rgb(hsv).hex;
  };

  ColorPicker.rgb2hsv = rgb2hsv;

  ColorPicker.rgb2hex = function(rgb) {
    return hsv2rgb(rgb2hsv(rgb)).hex;
  };

  ColorPicker.hex2hsv = function(hex) {
    return rgb2hsv(ColorPicker.hex2rgb(hex));
  };

  ColorPicker.hex2rgb = function(hex) {
    return {
      r: parseInt(hex.substr(1, 2), 16),
      g: parseInt(hex.substr(3, 2), 16),
      b: parseInt(hex.substr(5, 2), 16)
    };
  };

  /**
   * Sets color of the picker in hsv/rgb/hex format.
   * @param {object} ctx ColorPicker instance.
   * @param {object} hsv Object of the form: { h: <hue>, s: <saturation>, v:
   * <value> }.
   * @param {object} rgb Object of the form: { r: <red>, g: <green>, b: <blue>
   * }.
   * @param {string} hex String of the form: #RRGGBB.
   */
  function setColor(ctx, hsv, rgb, hex) {
    ctx.h = hsv.h % 360;
    ctx.s = hsv.s;
    ctx.v = hsv.v;

    var c = hsv2rgb(ctx);

    var mouseSlide = {
      y: (ctx.h * ctx.slideElement.offsetHeight) / 360,
      x: 0 // not important
    };

    var pickerHeight = ctx.pickerElement.offsetHeight;

    var mousePicker = {
      x: ctx.s * ctx.pickerElement.offsetWidth,
      y: pickerHeight - ctx.v * pickerHeight
    };

    ctx.pickerElement.style.backgroundColor =
      hsv2rgb({h: ctx.h, s: 1, v: 1}).hex;
    ctx.callback &&
    ctx.callback(hex || c.hex, {h: ctx.h, s: ctx.s, v: ctx.v},
      rgb || {r: c.r, g: c.g, b: c.b}, mousePicker,
      mouseSlide);

    return ctx;
  }

  ColorPicker.prototype.setColorValue = function(colorValue) {
    displayColor(this, colorValue);
  };

  ColorPicker.prototype.setCallback = function(callback) {
    this.callbackSelected = callback;
  };
  /**
   ColorPicker.prototype.setHsv = function(hsv) {
    return setColor(this, hsv);
  };

   /**
   * Sets color of the picker in rgb format.
   * @param {object} rgb Object of the form: { r: <red>, g: <green>, b: <blue>
   * }.
   */
  ColorPicker.prototype.setRgb = function(rgb) {
    return setColor(this, rgb2hsv(rgb), rgb);
  };

  /**
   * Sets color of the picker in hex format.
   * @param {string} hex Hex color format #RRGGBB.
   */
  ColorPicker.prototype.setHex = function(hex) {
    return setColor(this, ColorPicker.hex2hsv(hex), undefined, hex);
  };

  /**
   * Helper to position indicators.
   * @param {HTMLElement} slideIndicator DOM element representing the indicator
   * of the slide area.
   * @param {HTMLElement} pickerIndicator DOM element representing the indicator
   * of the picker area.
   * @param {object} mouseSlide Coordinates of the mouse cursor in the slide
   * area.
   * @param {object} mousePicker Coordinates of the mouse cursor in the picker
   * area.
   */
  ColorPicker.positionIndicators = function(slideIndicator, pickerIndicator,
                                            mouseSlide, mousePicker) {
    if (mouseSlide) {
      slideIndicator.style.top =
        (mouseSlide.y - slideIndicator.offsetHeight / 2) + 'px';
    }
    if (mousePicker) {
      pickerIndicator.style.top =
        (mousePicker.y - pickerIndicator.offsetHeight / 2) + 'px';
      pickerIndicator.style.left =
        (mousePicker.x - pickerIndicator.offsetWidth / 2) + 'px';
    }
  };

  /**
   * Helper to fix indicators - this is recommended (and needed) for dragable
   * color selection (see enabledDragging()).
   */
  ColorPicker.fixIndicators = function(slideIndicator, pickerIndicator) {
    pickerIndicator.style.pointerEvents = 'none';
    slideIndicator.style.pointerEvents = 'none';
  };

  return ColorPicker;
})(window, window.document);

export {ColorPicker};
