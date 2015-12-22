class ProgressBar {
    constructor(el, options = {}) {
        this.mailEl = (typeof el === 'object') ? el : document.getElementById(el);
        this.options = options;
        if (this.options.baseBackStyle) {
            this.mailEl.querySelector(".em-base-Bar").classList.add(this.options.baseBackStyle);
        }
        this.progressbar = this.mailEl.querySelector(".em-progress-Bar");
        this.progressDisplay = this.mailEl.querySelector(".em-perentage-Display");
        this.progressDisplayRight = this.mailEl.querySelector(".em-perentage-Display-right");
        this.count =  this.options.setInit||0;
        this.interval =  this.options.interval||100;
        this.reverse = this.options.reverse || false;
    }
    progress(percent) {
        // document.querySelector('.em-lightBox-progress-bar').style.left = document.querySelector('.em-lightBox-progress-bar').parentNode.offsetLeft + 'px';
        // document.querySelector('.em-lightBox-progress-bar').style.top = document.querySelector('.em-lightBox-progress-bar').parentNode.offsetTop + 'px';

        if (this.progressbar != "null" || this.progressbar !== undefined) {
            this.progressbar.style.width = percent + '%';
        }

        if (this.progressDisplay != null) {
            this.progressDisplay.innerHTML = "Loading " + percent + "%";
        } else {
            this.progressDisplayRight.innerHTML = percent + "%";
        }
    }
    doProgress() {
        setTimeout(function () {
            this.progress(this.count);
        }.bind(this), 0);
        setInterval(function () { this._progInc(); }.bind(this), this.interval);

    }
    _progInc() {

            if (this.count <= 100 && this.count> -1) {
                setTimeout(function () {

                    let val= this.reverse?this.count--:this.count++;
                    this.progress(val);
                }.bind(this), 0);
            }
    }
}

export {ProgressBar};
