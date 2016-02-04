/* eslint-disable */
class Scrollbar {

    constructor(n) {

        for (this.target = n, this.bar = '<div class="em-scroll-bar ' + (n.classList.contains('scroll-lg') ? 'em-scroll-lg' : 'em-scroll-sm') + '">',//em-scroll-lg
            this.wrapper = document.createElement("div"),
            this.wrapper.setAttribute("class", "em-scroll-wrapper"),
            this.el = document.createElement("div"),
            this.el.setAttribute("class", "em-scroll-content"),
            this.wrapper.appendChild(this.el); this.target.firstChild;)
            this.el.appendChild(this.target.firstChild);
        this.target.appendChild(this.wrapper);
        this.target.insertAdjacentHTML("beforeend", `<div style="left:${this.target.offsetLeft + this.target.offsetWidth - 10}px;top:${this.target.offsetTop }px" class="em-scroll-container"></div>${ this.bar}`);
        this.bar = this.target.lastChild;
        this.e(this.bar, this);
        this.moveBar();
        this.el.addEventListener("scroll", this.moveBar.bind(this));
        this.el.addEventListener("mouseenter", this.moveBar.bind(this));
        this.target.classList.add("em-scroll");
    }
    e(n, i) {
        function f(n) {
            var t = n.pageY - u;
            u = n.pageY;
            setTimeout(function () {
                i.el.scrollTop += t / i.scrollRatio;
            }, 0);
        }

        function e() {
            n.classList.remove("em-scroll-grabbed");
            document.body.classList.remove("em-scroll-grabbed");
            document.removeEventListener("mousemove", f);
            document.removeEventListener("mouseup", e);
        }
        var u;
        n.addEventListener("mousedown", function (i) {
            n.parentElement.querySelector('.em-scroll-container').style.left = `${i.target.offsetLeft + i.target.offsetWidth - 10}px`;
            n.parentElement.querySelector('.em-scroll-container').style.top = `${i.target.offsetTop}px`;
            return u = i.pageY, n.classList.add("em-scroll-grabbed"), document.body.classList.add("em-scroll-grabbed"), document.addEventListener("mousemove", f), document.addEventListener("mouseup", e), !1;
        });
    }
    moveBar() {
        var t = this.el.scrollHeight,
            i = this.el.clientHeight,
            n = this;
        this.scrollRatio = i / t;
        setTimeout(function () {
            n.bar.style.cssText = "height:" + i / t * 100 + "%; top:" + n.el.scrollTop / t * 100 + "%;right:-" + (n.target.clientWidth - n.bar.clientWidth) + "px;";
        }, 0);
    }
    static initEl(n) {
        n.hasOwnProperty("em-scrollbar") || Object.defineProperty(n, "em-scrollbar", new Scrollbar(n));
    }
    static initAll() {
        for (var i = document.querySelectorAll(".em-scroll"), n = 0; n < i.length; n++) Scrollbar.initEl(i[n]);
    }
    static load() {
        document.addEventListener("DOMContentLoaded", Scrollbar.initAll);
    }
}

export {Scrollbar};