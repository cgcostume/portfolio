/*! For license information please see bootstrap.js.LICENSE.txt */
(()=>{var e={207:function(e,t,n){e.exports=function(e,t,n,r){"use strict";return class extends n{constructor(t,n){super(),(t=r.getElement(t))&&(this._element=t,this._config=this._getConfig(n),e.set(this._element,this.constructor.DATA_KEY,this))}dispose(){e.remove(this._element,this.constructor.DATA_KEY),t.off(this._element,this.constructor.EVENT_KEY);for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,n=!0){r.executeAfterTransition(e,t,n)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(t){return e.get(r.getElement(t),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.3.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}}(n(537),n(680),n(645),n(391))},627:function(e,t,n){e.exports=function(e,t,n,r){"use strict";const o=".bs.collapse",i=`show${o}`,s=`shown${o}`,l=`hide${o}`,a=`hidden${o}`,c=`click${o}.data-api`,u="show",f="collapse",g="collapsing",d=`:scope .${f} .${f}`,h='[data-bs-toggle="collapse"]',p={parent:null,toggle:!0},m={parent:"(null|element)",toggle:"boolean"};class _ extends e{constructor(e,t){super(e,t),this._isTransitioning=!1,this._triggerArray=[];const r=n.find(h);for(const e of r){const t=n.getSelectorFromElement(e),r=n.find(t).filter((e=>e===this._element));null!==t&&r.length&&this._triggerArray.push(e)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return p}static get DefaultType(){return m}static get NAME(){return"collapse"}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let e=[];if(this._config.parent&&(e=this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((e=>e!==this._element)).map((e=>_.getOrCreateInstance(e,{toggle:!1})))),e.length&&e[0]._isTransitioning)return;if(t.trigger(this._element,i).defaultPrevented)return;for(const t of e)t.hide();const n=this._getDimension();this._element.classList.remove(f),this._element.classList.add(g),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const r=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(g),this._element.classList.add(f,u),this._element.style[n]="",t.trigger(this._element,s)}),this._element,!0),this._element.style[n]=`${this._element[r]}px`}hide(){if(this._isTransitioning||!this._isShown())return;if(t.trigger(this._element,l).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,r.reflow(this._element),this._element.classList.add(g),this._element.classList.remove(f,u);for(const e of this._triggerArray){const t=n.getElementFromSelector(e);t&&!this._isShown(t)&&this._addAriaAndCollapsedClass([e],!1)}this._isTransitioning=!0;this._element.style[e]="",this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(g),this._element.classList.add(f),t.trigger(this._element,a)}),this._element,!0)}_isShown(e=this._element){return e.classList.contains(u)}_configAfterMerge(e){return e.toggle=Boolean(e.toggle),e.parent=r.getElement(e.parent),e}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const e=this._getFirstLevelChildren(h);for(const t of e){const e=n.getElementFromSelector(t);e&&this._addAriaAndCollapsedClass([t],this._isShown(e))}}_getFirstLevelChildren(e){const t=n.find(d,this._config.parent);return n.find(e,this._config.parent).filter((e=>!t.includes(e)))}_addAriaAndCollapsedClass(e,t){if(e.length)for(const n of e)n.classList.toggle("collapsed",!t),n.setAttribute("aria-expanded",t)}static jQueryInterface(e){const t={};return"string"==typeof e&&/show|hide/.test(e)&&(t.toggle=!1),this.each((function(){const n=_.getOrCreateInstance(this,t);if("string"==typeof e){if(void 0===n[e])throw new TypeError(`No method named "${e}"`);n[e]()}}))}}return t.on(document,c,h,(function(e){("A"===e.target.tagName||e.delegateTarget&&"A"===e.delegateTarget.tagName)&&e.preventDefault();for(const e of n.getMultipleElementsFromSelector(this))_.getOrCreateInstance(e,{toggle:!1}).toggle()})),r.defineJQueryPlugin(_),_}(n(207),n(680),n(943),n(391))},537:function(e){e.exports=function(){"use strict";const e=new Map;return{set(t,n,r){e.has(t)||e.set(t,new Map);const o=e.get(t);o.has(n)||0===o.size?o.set(n,r):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(o.keys())[0]}.`)},get:(t,n)=>e.has(t)&&e.get(t).get(n)||null,remove(t,n){if(!e.has(t))return;const r=e.get(t);r.delete(n),0===r.size&&e.delete(t)}}}()},680:function(e,t,n){e.exports=function(e){"use strict";const t=/[^.]*(?=\..*)\.|.*/,n=/\..*/,r=/::\d+$/,o={};let i=1;const s={mouseenter:"mouseover",mouseleave:"mouseout"},l=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function a(e,t){return t&&`${t}::${i++}`||e.uidEvent||i++}function c(e){const t=a(e);return e.uidEvent=t,o[t]=o[t]||{},o[t]}function u(e,t,n=null){return Object.values(e).find((e=>e.callable===t&&e.delegationSelector===n))}function f(e,t,n){const r="string"==typeof t,o=r?n:t||n;let i=p(e);return l.has(i)||(i=e),[r,o,i]}function g(e,n,r,o,i){if("string"!=typeof n||!e)return;let[l,g,d]=f(n,r,o);if(n in s){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)};g=e(g)}const h=c(e),p=h[d]||(h[d]={}),b=u(p,g,l?r:null);if(b)return void(b.oneOff=b.oneOff&&i);const y=a(g,n.replace(t,"")),E=l?function(e,t,n){return function r(o){const i=e.querySelectorAll(t);for(let{target:s}=o;s&&s!==this;s=s.parentNode)for(const l of i)if(l===s)return _(o,{delegateTarget:s}),r.oneOff&&m.off(e,o.type,t,n),n.apply(s,[o])}}(e,r,g):function(e,t){return function n(r){return _(r,{delegateTarget:e}),n.oneOff&&m.off(e,r.type,t),t.apply(e,[r])}}(e,g);E.delegationSelector=l?r:null,E.callable=g,E.oneOff=i,E.uidEvent=y,p[y]=E,e.addEventListener(d,E,l)}function d(e,t,n,r,o){const i=u(t[n],r,o);i&&(e.removeEventListener(n,i,Boolean(o)),delete t[n][i.uidEvent])}function h(e,t,n,r){const o=t[n]||{};for(const[i,s]of Object.entries(o))i.includes(r)&&d(e,t,n,s.callable,s.delegationSelector)}function p(e){return e=e.replace(n,""),s[e]||e}const m={on(e,t,n,r){g(e,t,n,r,!1)},one(e,t,n,r){g(e,t,n,r,!0)},off(e,t,n,o){if("string"!=typeof t||!e)return;const[i,s,l]=f(t,n,o),a=l!==t,u=c(e),g=u[l]||{},p=t.startsWith(".");if(void 0===s){if(p)for(const n of Object.keys(u))h(e,u,n,t.slice(1));for(const[n,o]of Object.entries(g)){const i=n.replace(r,"");a&&!t.includes(i)||d(e,u,l,o.callable,o.delegationSelector)}}else{if(!Object.keys(g).length)return;d(e,u,l,s,i?n:null)}},trigger(t,n,r){if("string"!=typeof n||!t)return null;const o=e.getjQuery();let i=null,s=!0,l=!0,a=!1;n!==p(n)&&o&&(i=o.Event(n,r),o(t).trigger(i),s=!i.isPropagationStopped(),l=!i.isImmediatePropagationStopped(),a=i.isDefaultPrevented());const c=_(new Event(n,{bubbles:s,cancelable:!0}),r);return a&&c.preventDefault(),l&&t.dispatchEvent(c),c.defaultPrevented&&i&&i.preventDefault(),c}};function _(e,t={}){for(const[n,r]of Object.entries(t))try{e[n]=r}catch(t){Object.defineProperty(e,n,{configurable:!0,get:()=>r})}return e}return m}(n(391))},809:function(e){e.exports=function(){"use strict";function e(e){if("true"===e)return!0;if("false"===e)return!1;if(e===Number(e).toString())return Number(e);if(""===e||"null"===e)return null;if("string"!=typeof e)return e;try{return JSON.parse(decodeURIComponent(e))}catch(t){return e}}function t(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}return{setDataAttribute(e,n,r){e.setAttribute(`data-bs-${t(n)}`,r)},removeDataAttribute(e,n){e.removeAttribute(`data-bs-${t(n)}`)},getDataAttributes(t){if(!t)return{};const n={},r=Object.keys(t.dataset).filter((e=>e.startsWith("bs")&&!e.startsWith("bsConfig")));for(const o of r){let r=o.replace(/^bs/,"");r=r.charAt(0).toLowerCase()+r.slice(1,r.length),n[r]=e(t.dataset[o])}return n},getDataAttribute:(n,r)=>e(n.getAttribute(`data-bs-${t(r)}`))}}()},943:function(e,t,n){e.exports=function(e){"use strict";const t=t=>{let n=t.getAttribute("data-bs-target");if(!n||"#"===n){let e=t.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;e.includes("#")&&!e.startsWith("#")&&(e=`#${e.split("#")[1]}`),n=e&&"#"!==e?e.trim():null}return n?n.split(",").map((t=>e.parseSelector(t))).join(","):null},n={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[];let r=e.parentNode.closest(t);for(;r;)n.push(r),r=r.parentNode.closest(t);return n},prev(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return[n];n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return[n];n=n.nextElementSibling}return[]},focusableChildren(t){const n=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(",");return this.find(n,t).filter((t=>!e.isDisabled(t)&&e.isVisible(t)))},getSelectorFromElement(e){const r=t(e);return r&&n.findOne(r)?r:null},getElementFromSelector(e){const r=t(e);return r?n.findOne(r):null},getMultipleElementsFromSelector(e){const r=t(e);return r?n.find(r):[]}};return n}(n(391))},645:function(e,t,n){e.exports=function(e,t){"use strict";return class{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(n,r){const o=t.isElement(r)?e.getDataAttribute(r,"config"):{};return{...this.constructor.Default,..."object"==typeof o?o:{},...t.isElement(r)?e.getDataAttributes(r):{},..."object"==typeof n?n:{}}}_typeCheckConfig(e,n=this.constructor.DefaultType){for(const[r,o]of Object.entries(n)){const n=e[r],i=t.isElement(n)?"element":t.toType(n);if(!new RegExp(o).test(i))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${i}" but expected type "${o}".`)}}}}(n(809),n(391))},391:function(e,t){!function(e){"use strict";const t="transitionend",n=e=>(e&&window.CSS&&window.CSS.escape&&(e=e.replace(/#([^\s"#']+)/g,((e,t)=>`#${CSS.escape(t)}`))),e),r=e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e);const r=Number.parseFloat(t),o=Number.parseFloat(n);return r||o?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0},o=e=>{e.dispatchEvent(new Event(t))},i=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),s=e=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof e.getRootNode){const t=e.getRootNode();return t instanceof ShadowRoot?t:null}return e instanceof ShadowRoot?e:e.parentNode?s(e.parentNode):null},l=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,a=[],c=e=>{"loading"===document.readyState?(a.length||document.addEventListener("DOMContentLoaded",(()=>{for(const e of a)e()})),a.push(e)):e()},u=(e,t=[],n=e)=>"function"==typeof e?e(...t):n;e.defineJQueryPlugin=e=>{c((()=>{const t=l();if(t){const n=e.NAME,r=t.fn[n];t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=r,e.jQueryInterface)}}))},e.execute=u,e.executeAfterTransition=(e,n,i=!0)=>{if(!i)return void u(e);const s=r(n)+5;let l=!1;const a=({target:r})=>{r===n&&(l=!0,n.removeEventListener(t,a),u(e))};n.addEventListener(t,a),setTimeout((()=>{l||o(n)}),s)},e.findShadowRoot=s,e.getElement=e=>i(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(n(e)):null,e.getNextActiveElement=(e,t,n,r)=>{const o=e.length;let i=e.indexOf(t);return-1===i?!n&&r?e[o-1]:e[0]:(i+=n?1:-1,r&&(i=(i+o)%o),e[Math.max(0,Math.min(i,o-1))])},e.getTransitionDurationFromElement=r,e.getUID=e=>{do{e+=Math.floor(1e6*Math.random())}while(document.getElementById(e));return e},e.getjQuery=l,e.isDisabled=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),e.isElement=i,e.isRTL=()=>"rtl"===document.documentElement.dir,e.isVisible=e=>{if(!i(e)||0===e.getClientRects().length)return!1;const t="visible"===getComputedStyle(e).getPropertyValue("visibility"),n=e.closest("details:not([open])");if(!n)return t;if(n!==e){const t=e.closest("summary");if(t&&t.parentNode!==n)return!1;if(null===t)return!1}return t},e.noop=()=>{},e.onDOMContentLoaded=c,e.parseSelector=n,e.reflow=e=>{e.offsetHeight},e.toType=e=>null==e?`${e}`:Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),e.triggerTransitionEnd=o,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}(t)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}(()=>{"use strict";n(627)})()})();