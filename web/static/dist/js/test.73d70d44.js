(function(t){function e(e){for(var r,i,u=e[0],c=e[1],s=e[2],d=0,l=[];d<u.length;d++)i=u[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&l.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);f&&f(e);while(l.length)l.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,u=1;u<n.length;u++){var c=n[u];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={test:0},a=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/static/dist/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var s=0;s<u.length;s++)e(u[s]);var f=c;a.push([3,"chunk-common"]),n()})({"0243":function(t,e,n){var r=n("3a7e"),o=n("a289");r.extendWebdriver=function(t){return o.init(t)},r.loadLibrary=function(t,e){return o.loadLibrary(t,e)},t.exports=r},"0a05":function(t,e,n){"use strict";n.r(e);n("e623"),n("e379"),n("5dc8"),n("37e1");var r=n("0243"),o=n.n(r);window.dragMock=o.a},3:function(t,e,n){t.exports=n("0a05")},"3a7e":function(t,e,n){var r=n("93ae");function o(t,e,n){return t[e].apply(t,n)}var a={dragStart:function(t,e,n){return o(new r,"dragStart",arguments)},dragEnter:function(t,e,n){return o(new r,"dragEnter",arguments)},dragOver:function(t,e,n){return o(new r,"dragOver",arguments)},dragLeave:function(t,e,n){return o(new r,"dragLeave",arguments)},drop:function(t,e,n){return o(new r,"drop",arguments)},delay:function(t,e,n){return o(new r,"delay",arguments)},DataTransfer:n("60ae"),DragDropAction:n("93ae"),eventFactory:n("7459")};t.exports=a},"3e8f":function(t,e){},"60ae":function(t,e){function n(t,e){var n=t.indexOf(e);n>=0&&t.splice(n,1)}var r=function(){this.dataByFormat={},this.dropEffect="none",this.effectAllowed="all",this.files=[],this.types=[]};r.prototype.clearData=function(t){t?(delete this.dataByFormat[t],n(this.types,t)):(this.dataByFormat={},this.types=[])},r.prototype.getData=function(t){return this.dataByFormat[t]},r.prototype.setData=function(t,e){return this.dataByFormat[t]=e,this.types.indexOf(t)<0&&this.types.push(t),!0},r.prototype.setDragImage=function(){},t.exports=r},7459:function(t,e,n){var r=n("60ae"),o=["drag","dragstart","dragenter","dragover","dragend","drop","dragleave"];function a(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function i(t,e,n){"DragEvent"===e&&(e="CustomEvent");var r=window[e],o={view:window,bubbles:!0,cancelable:!0};a(o,n);var i=new r(t,o);return a(i,n),i}function u(t,e,n){var r;switch(e){case"MouseEvent":r=document.createEvent("MouseEvent"),r.initEvent(t,!0,!0);break;default:r=document.createEvent("CustomEvent"),r.initCustomEvent(t,!0,!0,0)}return n&&a(r,n),r}function c(t,e,n){try{return i(t,e,n)}catch(r){return u(t,e,n)}}var s={createEvent:function(t,e,n){var a="CustomEvent";t.match(/^mouse/)&&(a="MouseEvent");var i=c(t,a,e);return o.indexOf(t)>-1&&(i.dataTransfer=n||new r),i}};t.exports=s},"93ae":function(t,e,n){var r=n("7459"),o=n("60ae");function a(){}function i(t,e,n){if("function"===typeof e&&(n=e,e=null),!t||"object"!==typeof t)throw new Error("Expected first parameter to be a targetElement. Instead got: "+t);return{targetElement:t,eventProperties:e||{},configCallback:n||a}}function u(t,e,n){e&&(e.length<2?n&&e(t):e(t,t.type))}function c(t,e,n,o,a,i){e.forEach((function(e){var c=r.createEvent(e,a,o),s=e===n;u(c,i,s),t.dispatchEvent(c)}))}var s=function(){this.lastDragSource=null,this.lastDataTransfer=null,this.pendingActionsQueue=[]};s.prototype._queue=function(t){this.pendingActionsQueue.push(t),1===this.pendingActionsQueue.length&&this._queueExecuteNext()},s.prototype._queueExecuteNext=function(){if(0!==this.pendingActionsQueue.length){var t=this,e=this.pendingActionsQueue[0],n=function(){t.pendingActionsQueue.shift(),t._queueExecuteNext()};0===e.length?(e.call(this),n()):e.call(this,n)}},s.prototype.dragStart=function(t,e,n){var r=i(t,e,n),a=["mousedown","dragstart","drag"],u=new o;return this._queue((function(){c(r.targetElement,a,"drag",u,r.eventProperties,r.configCallback),this.lastDragSource=t,this.lastDataTransfer=u})),this},s.prototype.dragEnter=function(t,e,n){var r=i(t,e,n),o=["mousemove","mouseover","dragenter"];return this._queue((function(){c(r.targetElement,o,"dragenter",this.lastDataTransfer,r.eventProperties,r.configCallback)})),this},s.prototype.dragOver=function(t,e,n){var r=i(t,e,n),o=["mousemove","mouseover","dragover"];return this._queue((function(){c(r.targetElement,o,"drag",this.lastDataTransfer,r.eventProperties,r.configCallback)})),this},s.prototype.dragLeave=function(t,e,n){var r=i(t,e,n),o=["mousemove","mouseover","dragleave"];return this._queue((function(){c(r.targetElement,o,"dragleave",this.lastDataTransfer,r.eventProperties,r.configCallback)})),this},s.prototype.drop=function(t,e,n){var r=i(t,e,n),o=["mousemove","mouseup","drop"],a=["dragend"];return this._queue((function(){c(r.targetElement,o,"drop",this.lastDataTransfer,r.eventProperties,r.configCallback),this.lastDragSource&&c(this.lastDragSource,a,"drop",this.lastDataTransfer,r.eventProperties,r.configCallback)})),this},s.prototype.then=function(t){return this._queue((function(){t.call(this)})),this},s.prototype.delay=function(t){return this._queue((function(e){window.setTimeout(e,t)})),this},t.exports=s},a289:function(t,e,n){(function(e){var r=n("3e8f"),o=["dragStart","dragEnter","dragOver","dragLeave","drop","delay"],a=2e3,i=1;function u(t,e,n,r){var o="";for(var i in n){var u=n[i];o+="var "+i+" = "+JSON.stringify(u)+";"}var c=o+"return ("+e+")(done);";t.webdriver.timeoutsAsyncScript(a).executeAsync(new Function("done",c)).then((function(t){r(t)}))}var c=function(t,e){this.webdriver=t,this.actionId=e};function s(t){function e(t){return function(){var e=new c(this,i++);return e[t].apply(e,arguments),e}}o.forEach((function(n){t[n]=e(n)}))}function f(t){var e=t.remote;t.remote=function(){var n=e.apply(t,arguments);return s(n.constructor.prototype),n}}o.forEach((function(t){c.prototype[t]=function(){var e=this,n=Array.prototype.slice.call(arguments),r=function(){};"function"===typeof n[n.length-1]&&(r=n.pop());var o=function(e){var r=function(t){var e;if(e=o(t,["/","(","../","./","*/"])?document.evaluate(t,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue:document.querySelector(t),!e)throw new Error('Cannot find element with selector: "'+t+'"');return e},o=function(t,e){return e.some((function(e){return 0===t.indexOf(e)}))};window._dragMockActions=window._dragMockActions||{};var a=window._dragMockActions[actionId]||dragMock;o(t,["drag","drop"])&&(n[0]=r(n[0])),a=a[t].apply(a,n),window._dragMockActions[actionId]=a,a.then(e)},a={methodName:t,actionId:e.actionId,args:n};return u(e,o,a,(function(t){r(t,e)})),e}}));var d={init:function(t){t.version&&t.remote?f(t):s(t.constructor.prototype)},loadLibrary:function(t,n){var o=r.readFileSync(e+"/../dist/drag-mock.js",{encoding:"utf-8"});t.execute(o,(function(t){"function"===typeof n&&n(t)}))}};t.exports=d}).call(this,"/")}});
//# sourceMappingURL=test.73d70d44.js.map