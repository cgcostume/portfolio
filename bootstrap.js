/*! For license information please see bootstrap.js.LICENSE.txt */
(()=>{var e={106:function(e,t,n){e.exports=function(e,t){"use strict";const n=e=>e&&"object"==typeof e&&"default"in e?e:{default:e},s=n(e),r=n(t),i="transitionend",o=e=>(e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType))(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(e):null,l=e=>{"function"==typeof e&&e()},a=(e,t,n=!0)=>{if(!n)return void l(e);const s=(e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e);const s=Number.parseFloat(t),r=Number.parseFloat(n);return s||r?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0})(t)+5;let r=!1;const o=({target:n})=>{n===t&&(r=!0,t.removeEventListener(i,o),l(e))};t.addEventListener(i,o),setTimeout((()=>{r||t.dispatchEvent(new Event(i))}),s)};return class{constructor(e){(e=o(e))&&(this._element=e,s.default.set(this._element,this.constructor.DATA_KEY,this))}dispose(){s.default.remove(this._element,this.constructor.DATA_KEY),r.default.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach((e=>{this[e]=null}))}_queueCallback(e,t,n=!0){a(e,t,n)}static getInstance(e){return s.default.get(o(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.1.3"}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}}}(n(224),n(150))},855:function(e,t,n){e.exports=function(e,t,n,s,r){"use strict";const i=e=>e&&"object"==typeof e&&"default"in e?e:{default:e},o=i(e),l=i(t),a=i(n),c=i(s),u=i(r),d=e=>{let t=e.getAttribute("data-bs-target");if(!t||"#"===t){let n=e.getAttribute("href");if(!n||!n.includes("#")&&!n.startsWith("."))return null;n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t},f=e=>{const t=d(e);return t&&document.querySelector(t)?t:null},h=e=>{const t=d(e);return t?document.querySelector(t):null},g=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),p=[],m="collapse",_="bs.collapse",b={toggle:!0,parent:null},y={toggle:"boolean",parent:"(null|element)"},v="show",E="collapse",A="collapsing",w="collapsed",C=":scope .collapse .collapse",T='[data-bs-toggle="collapse"]';class S extends u.default{constructor(e,t){super(e),this._isTransitioning=!1,this._config=this._getConfig(t),this._triggerArray=[];const n=c.default.find(T);for(let e=0,t=n.length;e<t;e++){const t=n[e],s=f(t),r=c.default.find(s).filter((e=>e===this._element));null!==s&&r.length&&(this._selector=s,this._triggerArray.push(t))}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return b}static get NAME(){return m}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let e,t=[];if(this._config.parent){const e=c.default.find(C,this._config.parent);t=c.default.find(".collapse.show, .collapse.collapsing",this._config.parent).filter((t=>!e.includes(t)))}const n=c.default.findOne(this._selector);if(t.length){const s=t.find((e=>n!==e));if(e=s?S.getInstance(s):null,e&&e._isTransitioning)return}if(l.default.trigger(this._element,"show.bs.collapse").defaultPrevented)return;t.forEach((t=>{n!==t&&S.getOrCreateInstance(t,{toggle:!1}).hide(),e||o.default.set(t,_,null)}));const s=this._getDimension();this._element.classList.remove(E),this._element.classList.add(A),this._element.style[s]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const r=`scroll${s[0].toUpperCase()+s.slice(1)}`;this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(A),this._element.classList.add(E,v),this._element.style[s]="",l.default.trigger(this._element,"shown.bs.collapse")}),this._element,!0),this._element.style[s]=`${this._element[r]}px`}hide(){if(this._isTransitioning||!this._isShown())return;if(l.default.trigger(this._element,"hide.bs.collapse").defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,this._element.offsetHeight,this._element.classList.add(A),this._element.classList.remove(E,v);const t=this._triggerArray.length;for(let e=0;e<t;e++){const t=this._triggerArray[e],n=h(t);n&&!this._isShown(n)&&this._addAriaAndCollapsedClass([t],!1)}this._isTransitioning=!0;this._element.style[e]="",this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(A),this._element.classList.add(E),l.default.trigger(this._element,"hidden.bs.collapse")}),this._element,!0)}_isShown(e=this._element){return e.classList.contains(v)}_getConfig(e){return(e={...b,...a.default.getDataAttributes(this._element),...e}).toggle=Boolean(e.toggle),e.parent=(t=e.parent,g(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?document.querySelector(t):null),((e,t,n)=>{Object.keys(n).forEach((s=>{const r=n[s],i=t[s],o=i&&g(i)?"element":null==(l=i)?`${l}`:{}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();var l;if(!new RegExp(r).test(o))throw new TypeError(`${e.toUpperCase()}: Option "${s}" provided type "${o}" but expected type "${r}".`)}))})(m,e,y),e;var t}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const e=c.default.find(C,this._config.parent);c.default.find(T,this._config.parent).filter((t=>!e.includes(t))).forEach((e=>{const t=h(e);t&&this._addAriaAndCollapsedClass([e],this._isShown(t))}))}_addAriaAndCollapsedClass(e,t){e.length&&e.forEach((e=>{t?e.classList.remove(w):e.classList.add(w),e.setAttribute("aria-expanded",t)}))}static jQueryInterface(e){return this.each((function(){const t={};"string"==typeof e&&/show|hide/.test(e)&&(t.toggle=!1);const n=S.getOrCreateInstance(this,t);if("string"==typeof e){if(void 0===n[e])throw new TypeError(`No method named "${e}"`);n[e]()}}))}}return l.default.on(document,"click.bs.collapse.data-api",T,(function(e){("A"===e.target.tagName||e.delegateTarget&&"A"===e.delegateTarget.tagName)&&e.preventDefault();const t=f(this);c.default.find(t).forEach((e=>{S.getOrCreateInstance(e,{toggle:!1}).toggle()}))})),O=S,j=()=>{const e=(()=>{const{jQuery:e}=window;return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null})();if(e){const t=O.NAME,n=e.fn[t];e.fn[t]=O.jQueryInterface,e.fn[t].Constructor=O,e.fn[t].noConflict=()=>(e.fn[t]=n,O.jQueryInterface)}},"loading"===document.readyState?(p.length||document.addEventListener("DOMContentLoaded",(()=>{p.forEach((e=>e()))})),p.push(j)):j(),S;var O,j}(n(224),n(150),n(995),n(741),n(106))},224:function(e){e.exports=function(){"use strict";const e=new Map;return{set(t,n,s){e.has(t)||e.set(t,new Map);const r=e.get(t);r.has(n)||0===r.size?r.set(n,s):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`)},get:(t,n)=>e.has(t)&&e.get(t).get(n)||null,remove(t,n){if(!e.has(t))return;const s=e.get(t);s.delete(n),0===s.size&&e.delete(t)}}}()},150:function(e){e.exports=function(){"use strict";const e=/[^.]*(?=\..*)\.|.*/,t=/\..*/,n=/::\d+$/,s={};let r=1;const i={mouseenter:"mouseover",mouseleave:"mouseout"},o=/^(mouseenter|mouseleave)/i,l=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function a(e,t){return t&&`${t}::${r++}`||e.uidEvent||r++}function c(e){const t=a(e);return e.uidEvent=t,s[t]=s[t]||{},s[t]}function u(e,t,n=null){const s=Object.keys(e);for(let r=0,i=s.length;r<i;r++){const i=e[s[r]];if(i.originalHandler===t&&i.delegationSelector===n)return i}return null}function d(e,t,n){const s="string"==typeof t,r=s?n:t;let i=g(e);return l.has(i)||(i=e),[s,r,i]}function f(t,n,s,r,i){if("string"!=typeof n||!t)return;if(s||(s=r,r=null),o.test(n)){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)};r?r=e(r):s=e(s)}const[l,f,h]=d(n,s,r),g=c(t),m=g[h]||(g[h]={}),_=u(m,f,l?s:null);if(_)return void(_.oneOff=_.oneOff&&i);const b=a(f,n.replace(e,"")),y=l?function(e,t,n){return function s(r){const i=e.querySelectorAll(t);for(let{target:o}=r;o&&o!==this;o=o.parentNode)for(let l=i.length;l--;)if(i[l]===o)return r.delegateTarget=o,s.oneOff&&p.off(e,r.type,t,n),n.apply(o,[r]);return null}}(t,s,r):function(e,t){return function n(s){return s.delegateTarget=e,n.oneOff&&p.off(e,s.type,t),t.apply(e,[s])}}(t,s);y.delegationSelector=l?s:null,y.originalHandler=f,y.oneOff=i,y.uidEvent=b,m[b]=y,t.addEventListener(h,y,l)}function h(e,t,n,s,r){const i=u(t[n],s,r);i&&(e.removeEventListener(n,i,Boolean(r)),delete t[n][i.uidEvent])}function g(e){return e=e.replace(t,""),i[e]||e}const p={on(e,t,n,s){f(e,t,n,s,!1)},one(e,t,n,s){f(e,t,n,s,!0)},off(e,t,s,r){if("string"!=typeof t||!e)return;const[i,o,l]=d(t,s,r),a=l!==t,u=c(e),f=t.startsWith(".");if(void 0!==o){if(!u||!u[l])return;return void h(e,u,l,o,i?s:null)}f&&Object.keys(u).forEach((n=>{!function(e,t,n,s){const r=t[n]||{};Object.keys(r).forEach((i=>{if(i.includes(s)){const s=r[i];h(e,t,n,s.originalHandler,s.delegationSelector)}}))}(e,u,n,t.slice(1))}));const g=u[l]||{};Object.keys(g).forEach((s=>{const r=s.replace(n,"");if(!a||t.includes(r)){const t=g[s];h(e,u,l,t.originalHandler,t.delegationSelector)}}))},trigger(e,t,n){if("string"!=typeof t||!e)return null;const s=(()=>{const{jQuery:e}=window;return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null})(),r=g(t),i=t!==r,o=l.has(r);let a,c=!0,u=!0,d=!1,f=null;return i&&s&&(a=s.Event(t,n),s(e).trigger(a),c=!a.isPropagationStopped(),u=!a.isImmediatePropagationStopped(),d=a.isDefaultPrevented()),o?(f=document.createEvent("HTMLEvents"),f.initEvent(r,c,!0)):f=new CustomEvent(t,{bubbles:c,cancelable:!0}),void 0!==n&&Object.keys(n).forEach((e=>{Object.defineProperty(f,e,{get:()=>n[e]})})),d&&f.preventDefault(),u&&e.dispatchEvent(f),f.defaultPrevented&&void 0!==a&&a.preventDefault(),f}};return p}()},995:function(e){e.exports=function(){"use strict";function e(e){return"true"===e||"false"!==e&&(e===Number(e).toString()?Number(e):""===e||"null"===e?null:e)}function t(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}return{setDataAttribute(e,n,s){e.setAttribute(`data-bs-${t(n)}`,s)},removeDataAttribute(e,n){e.removeAttribute(`data-bs-${t(n)}`)},getDataAttributes(t){if(!t)return{};const n={};return Object.keys(t.dataset).filter((e=>e.startsWith("bs"))).forEach((s=>{let r=s.replace(/^bs/,"");r=r.charAt(0).toLowerCase()+r.slice(1,r.length),n[r]=e(t.dataset[s])})),n},getDataAttribute:(n,s)=>e(n.getAttribute(`data-bs-${t(s)}`)),offset(e){const t=e.getBoundingClientRect();return{top:t.top+window.pageYOffset,left:t.left+window.pageXOffset}},position:e=>({top:e.offsetTop,left:e.offsetLeft})}}()},741:function(e){e.exports=function(){"use strict";return{find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[];let s=e.parentNode;for(;s&&s.nodeType===Node.ELEMENT_NODE&&3!==s.nodeType;)s.matches(t)&&n.push(s),s=s.parentNode;return n},prev(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return[n];n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return[n];n=n.nextElementSibling}return[]},focusableChildren(e){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(", ");return this.find(t,e).filter((e=>!(e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")))(e)&&(e=>{return t=e,!(!t||"object"!=typeof t||(void 0!==t.jquery&&(t=t[0]),void 0===t.nodeType)||0===e.getClientRects().length||"visible"!==getComputedStyle(e).getPropertyValue("visibility"));var t})(e)))}}}()}},t={};function n(s){var r=t[s];if(void 0!==r)return r.exports;var i=t[s]={exports:{}};return e[s].call(i.exports,i,i.exports,n),i.exports}(()=>{"use strict";n(855)})()})();