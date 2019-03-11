!function(){"use strict";var e=function(r,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var n in t)t.hasOwnProperty(n)&&(r[n]=t[n])})(r,t)};function t(r,t){function n(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}function h(r){return"function"==typeof r}var n=!1,i={Promise:void 0,set useDeprecatedSynchronousErrorHandling(r){if(r);n=r},get useDeprecatedSynchronousErrorHandling(){return n}};function o(r){setTimeout(function(){throw r})}var u={closed:!0,next:function(r){},error:function(r){if(i.useDeprecatedSynchronousErrorHandling)throw r;o(r)},complete:function(){}},p=Array.isArray||function(r){return r&&"number"==typeof r.length};function r(r){return Error.call(this),this.message=r?r.length+" errors occurred during unsubscription:\n"+r.map(function(r,t){return t+1+") "+r.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=r,this}r.prototype=Object.create(Error.prototype);var f=r,s=function(){function o(r){this.closed=!1,this._parent=null,this._parents=null,this._subscriptions=null,r&&(this._unsubscribe=r)}var r;return o.prototype.unsubscribe=function(){var t,n=!1;if(!this.closed){var r=this._parent,e=this._parents,o=this._unsubscribe,i=this._subscriptions;this.closed=!0,this._parent=null,this._parents=null,this._subscriptions=null;for(var s,c=-1,u=e?e.length:0;r;)r.remove(this),r=++c<u&&e[c]||null;if(h(o))try{o.call(this)}catch(r){n=!0,t=r instanceof f?l(r.errors):[r]}if(p(i))for(c=-1,u=i.length;++c<u;){var a=i[c];if(null!==(s=a)&&"object"==typeof s)try{a.unsubscribe()}catch(r){n=!0,t=t||[],r instanceof f?t=t.concat(l(r.errors)):t.push(r)}}if(n)throw new f(t)}},o.prototype.add=function(r){var t=r;switch(typeof r){case"function":t=new o(r);case"object":if(t===this||t.closed||"function"!=typeof t.unsubscribe)return t;if(this.closed)return t.unsubscribe(),t;if(!(t instanceof o)){var n=t;(t=new o)._subscriptions=[n]}break;default:if(!r)return o.EMPTY;throw new Error("unrecognized teardown "+r+" added to Subscription.")}if(t._addParent(this)){var e=this._subscriptions;e?e.push(t):this._subscriptions=[t]}return t},o.prototype.remove=function(r){var t=this._subscriptions;if(t){var n=t.indexOf(r);-1!==n&&t.splice(n,1)}},o.prototype._addParent=function(r){var t=this._parent,n=this._parents;return t!==r&&(t?n?-1===n.indexOf(r)&&(n.push(r),!0):(this._parents=[r],!0):(this._parent=r,!0))},o.EMPTY=((r=new o).closed=!0,r),o}();function l(r){return r.reduce(function(r,t){return r.concat(t instanceof f?t.errors:t)},[])}var c="function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random(),a=function(o){function i(r,t,n){var e=o.call(this)||this;switch(e.syncErrorValue=null,e.syncErrorThrown=!1,e.syncErrorThrowable=!1,e.isStopped=!1,arguments.length){case 0:e.destination=u;break;case 1:if(!r){e.destination=u;break}if("object"==typeof r){r instanceof i?(e.syncErrorThrowable=r.syncErrorThrowable,(e.destination=r).add(e)):(e.syncErrorThrowable=!0,e.destination=new b(e,r));break}default:e.syncErrorThrowable=!0,e.destination=new b(e,r,t,n)}return e}return t(i,o),i.prototype[c]=function(){return this},i.create=function(r,t,n){var e=new i(r,t,n);return e.syncErrorThrowable=!1,e},i.prototype.next=function(r){this.isStopped||this._next(r)},i.prototype.error=function(r){this.isStopped||(this.isStopped=!0,this._error(r))},i.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},i.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,o.prototype.unsubscribe.call(this))},i.prototype._next=function(r){this.destination.next(r)},i.prototype._error=function(r){this.destination.error(r),this.unsubscribe()},i.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},i.prototype._unsubscribeAndRecycle=function(){var r=this._parent,t=this._parents;return this._parent=null,this._parents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parent=r,this._parents=t,this},i}(s),b=function(c){function r(r,t,n,e){var o,i=c.call(this)||this;i._parentSubscriber=r;var s=i;return h(t)?o=t:t&&(o=t.next,n=t.error,e=t.complete,t!==u&&(h((s=Object.create(t)).unsubscribe)&&i.add(s.unsubscribe.bind(s)),s.unsubscribe=i.unsubscribe.bind(i))),i._context=s,i._next=o,i._error=n,i._complete=e,i}return t(r,c),r.prototype.next=function(r){if(!this.isStopped&&this._next){var t=this._parentSubscriber;i.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?this.__tryOrSetError(t,this._next,r)&&this.unsubscribe():this.__tryOrUnsub(this._next,r)}},r.prototype.error=function(r){if(!this.isStopped){var t=this._parentSubscriber,n=i.useDeprecatedSynchronousErrorHandling;if(this._error)n&&t.syncErrorThrowable?this.__tryOrSetError(t,this._error,r):this.__tryOrUnsub(this._error,r),this.unsubscribe();else if(t.syncErrorThrowable)n?(t.syncErrorValue=r,t.syncErrorThrown=!0):o(r),this.unsubscribe();else{if(this.unsubscribe(),n)throw r;o(r)}}},r.prototype.complete=function(){var r=this;if(!this.isStopped){var t=this._parentSubscriber;if(this._complete){var n=function(){return r._complete.call(r._context)};i.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?this.__tryOrSetError(t,n):this.__tryOrUnsub(n),this.unsubscribe()}else this.unsubscribe()}},r.prototype.__tryOrUnsub=function(r,t){try{r.call(this._context,t)}catch(r){if(this.unsubscribe(),i.useDeprecatedSynchronousErrorHandling)throw r;o(r)}},r.prototype.__tryOrSetError=function(t,r,n){if(!i.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{r.call(this._context,n)}catch(r){return i.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=r,t.syncErrorThrown=!0):(o(r),!0)}return!1},r.prototype._unsubscribe=function(){var r=this._parentSubscriber;this._context=null,this._parentSubscriber=null,r.unsubscribe()},r}(a);var y="function"==typeof Symbol&&Symbol.observable||"@@observable";function d(){}var _=function(){function n(r){this._isScalar=!1,r&&(this._subscribe=r)}return n.prototype.lift=function(r){var t=new n;return t.source=this,t.operator=r,t},n.prototype.subscribe=function(r,t,n){var e=this.operator,o=function(r,t,n){if(r){if(r instanceof a)return r;if(r[c])return r[c]()}return r||t||n?new a(r,t,n):new a(u)}(r,t,n);if(o.add(e?e.call(o,this.source):this.source||i.useDeprecatedSynchronousErrorHandling&&!o.syncErrorThrowable?this._subscribe(o):this._trySubscribe(o)),i.useDeprecatedSynchronousErrorHandling&&o.syncErrorThrowable&&(o.syncErrorThrowable=!1,o.syncErrorThrown))throw o.syncErrorValue;return o},n.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(r){i.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=r),!function(r){for(;r;){var t=r.destination;if(r.closed||r.isStopped)return!1;r=t&&t instanceof a?t:null}return!0}(t)?console.warn(r):t.error(r)}},n.prototype.forEach=function(e,r){var o=this;return new(r=v(r))(function(r,t){var n;n=o.subscribe(function(r){try{e(r)}catch(r){t(r),n&&n.unsubscribe()}},t,r)})},n.prototype._subscribe=function(r){var t=this.source;return t&&t.subscribe(r)},n.prototype[y]=function(){return this},n.prototype.pipe=function(){for(var t,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return 0===r.length?this:((t=r)?1===t.length?t[0]:function(r){return t.reduce(function(r,t){return t(r)},r)}:d)(this)},n.prototype.toPromise=function(r){var e=this;return new(r=v(r))(function(r,t){var n;e.subscribe(function(r){return n=r},function(r){return t(r)},function(){return r(n)})})},n.create=function(r){return new n(r)},n}();function v(r){if(r||(r=i.Promise||Promise),!r)throw new Error("no Promise impl found");return r}function w(t,n){return function(r){if("function"!=typeof t)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return r.lift(new E(t,n))}}var E=function(){function r(r,t){this.project=r,this.thisArg=t}return r.prototype.call=function(r,t){return t.subscribe(new S(r,this.project,this.thisArg))},r}(),S=function(o){function r(r,t,n){var e=o.call(this,r)||this;return e.project=t,e.count=0,e.thisArg=n||e,e}return t(r,o),r.prototype._next=function(r){var t;try{t=this.project.call(this.thisArg,r,this.count++)}catch(r){return void this.destination.error(r)}this.destination.next(t)},r}(a);var g,m,x=function(){function r(r,t){this.predicate=r,this.thisArg=t}return r.prototype.call=function(r,t){return t.subscribe(new T(r,this.predicate,this.thisArg))},r}(),T=function(o){function r(r,t,n){var e=o.call(this,r)||this;return e.predicate=t,e.thisArg=n,e.count=0,e}return t(r,o),r.prototype._next=function(r){var t;try{t=this.predicate.call(this.thisArg,r,this.count++)}catch(r){return void this.destination.error(r)}t&&this.destination.next(r)},r}(a),O=document.getElementById("banner-bg"),A=function r(n,e,o,t){return h(o)&&(t=o,o=void 0),t?r(n,e,o).pipe(w(function(r){return p(r)?t.apply(void 0,r):t(r)})):new _(function(t){!function r(t,n,e,o,i){var s,c,u,a;if((a=t)&&"function"==typeof a.addEventListener&&"function"==typeof a.removeEventListener){var h=t;t.addEventListener(n,e,i),s=function(){return h.removeEventListener(n,e,i)}}else if((u=t)&&"function"==typeof u.on&&"function"==typeof u.off){var p=t;t.on(n,e),s=function(){return p.off(n,e)}}else if((c=t)&&"function"==typeof c.addListener&&"function"==typeof c.removeListener){var f=t;t.addListener(n,e),s=function(){return f.removeListener(n,e)}}else{if(!t||!t.length)throw new TypeError("Invalid event target");for(var l=0,b=t.length;l<b;l++)r(t[l],n,e,o,i)}o.add(s)}(n,e,function(r){t.next(1<arguments.length?Array.prototype.slice.call(arguments):r)},t,o)})}(window,"scroll").pipe(w(function(r){return r.target.scrollingElement.scrollTop})),j=[123,304,544];A.subscribe(function(e){j.forEach(function(r,t){var n=document.getElementById("intro-".concat(t));r<e&&!n.classList.contains("syuanpi")&&(n.classList.add("syuanpi"),n.classList.add("fadeInUpShort"))})}),A.pipe((g=function(r){return 72<=r&&r<=204},function(r){return r.lift(new x(g,m))}),w(function(r){return r-72})).subscribe(function(r){O.style="transform: ".concat(r<132?"rotate(-".concat(6-r/132*6,"deg)"):"translate(0, 0)")})}();
