!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).umd={})}(this,function(e){"use strict";class s extends HTMLElement{updateProp(e){var t=void 0===this[e]?this.getAttribute(e):this[e];this.props[e]=""===t||t}constructor(e){super(),this.props=this.props||{},this.state=e||{},[...this.attributes].forEach(e=>this.updateProp(e.name)),new MutationObserver(e=>e.forEach(e=>{this.updateProp(e.attributeName),this.propUpdatedCallback&&this.propUpdatedCallback(e.attributeName)})).observe(this,{attributes:!0}),this.attachShadow({mode:"open"}),this._yoffeeFragment=this.render(),this.shadowRoot.appendChild(this._yoffeeFragment)}disconnectedCallback(){this._yoffeeFragment.__removeWatchers()}connectedCallback(){}propUpdatedCallback(e){}}const f=new Map;const h="Text/CSS node",u="Attribute value",c="Attribute name",m="HTML tag";function _(e,t){for(var s of t)e=e.replace(s.id,"${"+s._cb.toString()+"}");return e}function N(){return new Array(4).fill(0).map(()=>Math.random().toString(36).substr(2,9)).join("-")}function d(e,t,s){let o=e.get(t);null!=o?o.push(s):e.set(t,[s])}class b{constructor(e,t,s){this.expressions=e,this.domNode=t,this.expressionsLocation=s,this._arrayDomNodes=[],this.initialValue={[h]:()=>t.data,[u]:()=>t.value,[c]:()=>t.name}[s](),this.ownerElement=this.domNode.ownerElement}update(){this.expressionsLocation===h?this._updateTextNodeValue():this.expressionsLocation===u?this._updateAttributeNodeValue():this.expressionsLocation===c&&this._updateAttributeNodeName()}_updateTextNodeValue(){var i,n,r=this.expressions[0];if(!r.cached){let o=r.lastResult;if(null!=o&&!1!==o||(o=""),this._lastTextNodeValue instanceof Array&&!(o instanceof Array)){for(var e of this._arrayDomNodes)this._removeDomNode(e);this._arrayDomNodes=[]}if(o instanceof DocumentFragment&&(o=0===o.childNodes.length?"":1===o.childNodes.length?o.firstChild:[...o.childNodes]),o instanceof Array){this._lastTextNodeValue instanceof Array||(r=document.createElement("yoffee-list-location-marker"),this.domNode.replaceWith(r),this.domNode=r);let e=[],t=null,s=e=>{null==t?null==this._arrayDomNodes[0]?this.domNode.parentNode.insertBefore(e,this.domNode):this.domNode.parentNode.insertBefore(e,(this._arrayDomNodes[0].__isYoffee?this._arrayDomNodes[0].__childNodes:this._arrayDomNodes)[0]):this.domNode.parentNode.insertBefore(e,t.nextSibling),t=e.__isYoffee?e.__childNodes[e.__childNodes.length-1]:e};for(i of o)if(null!=i){var a=this._arrayDomNodes[0];if(null!=a&&(a instanceof Text?a.data:a)===("number"==typeof i?i.toString():i))e.push(a),t=a.__isYoffee?a.__childNodes[a.__childNodes.length-1]:a,this._arrayDomNodes.shift();else if(i="object"==typeof i?i:document.createTextNode(i),e.push(i),i.__isYoffee)for(var l of i.__childNodes)s(l);else{if(i instanceof Array)throw"YOFFEE: List item cannot be another list";s(i)}}for(n of this._arrayDomNodes)-1===e.indexOf(n)&&this._removeDomNode(n);this._arrayDomNodes=e}else if("object"==typeof o){if(!(o instanceof Node))throw"YOFFEE: Text value can't be a regular JS object!";this.domNode.replaceWith(o),this.domNode=o}else"object"==typeof this._lastTextNodeValue?(r=document.createTextNode(o),this.domNode.replaceWith(r),this.domNode=r):this.domNode.data!==o.toString()&&(this.domNode.data=o);this._lastTextNodeValue=o}}_removeDomNode(e){if(e.__isYoffee)for(var t of e.__childNodes)t.remove();else e.remove()}_updateAttributeNodeValue(){if(this.expressions[0].isEventHandler){if(1<this.expressions.length)throw"YOFFEE: Cant have more than one expression as event handler: "+_(this.initialValue,this.expressions);this._setEventListener()}else{var e=this.expressions[0].lastResult,t=1===this.expressions.length&&this.initialValue.length===this.expressions[0].id.length;if(!t||!1!==e&&null!=e)if(t&&["function","object"].includes(typeof e))v(this.ownerElement,this.domNode.name,e),null!=this.domNode.ownerElement&&this.domNode.ownerElement.removeAttributeNode(this.domNode);else if(t&&!0===e)this.ownerElement[this.domNode.name]=void 0,this._setDomNode("");else{this.ownerElement[this.domNode.name]=void 0;let e=this.initialValue;for(var s of this.expressions)e=e.replace(s.id,s.lastResult);this._setDomNode(e)}else this.ownerElement[this.domNode.name]=void 0,this.ownerElement.removeAttribute(this.domNode.name)}}_setDomNode(e){this.domNode.value=e,null==this.domNode.ownerElement&&this.ownerElement.setAttributeNode(this.domNode)}_updateAttributeNodeName(){var e,t=this.expressions[0].lastResult,s=1===this.expressions.length&&this.initialValue.length===this.expressions[0].id.length;if(this._lastAttributeMap){for(var[o,i]of this._lastAttributeMap)this.ownerElement.removeAttribute(o),e=this.ownerElement,o=o,e[o]=void 0,e.updateProp?e.updateProp(o):(null==e.props&&(e.props={}),e.props[o]=void 0);this._lastAttributeMap=null}else this.ownerElement.removeAttribute(this.domNode.name);if(!s||!1!==t&&null!=t&&""!==t)if(s&&"object"==typeof t){this._lastAttributeMap=Object.entries(t);for(var[n,r]of this._lastAttributeMap)!1!==r&&null!==r&&(["function","object"].includes(typeof r)?(v(this.ownerElement,n,r),null!=this.domNode.ownerElement&&this.domNode.ownerElement.removeAttributeNode(this.domNode)):(!0===r&&(r=""),this.ownerElement.setAttribute(n,r)))}else{let e=this.initialValue;for(var a of this.expressions)e=e.replace(a.id,a.lastResult);this.ownerElement.setAttribute(e,this.domNode.value),this.domNode=this.ownerElement.getAttributeNode(e)}}_setEventListener(){let e=this.domNode.name,t=e.substring(2),s=(...e)=>{const t=this.expressions[0].lastResult(...e);return"function"==typeof t?t(...e):t};this.domNode.ownerElement.addEventListener(t,s),v(this.domNode.ownerElement,e,s),this.domNode.ownerElement.removeAttributeNode(this.domNode)}}function v(e,t,s){e[t]=s,e.updateProp?e.updateProp(t):(null==e.props&&(e.props={}),e.props[t]=s)}function E(t,s){if(t.length!==s.length)return!1;for(let e=0;e<t.length;++e)if(t[e]!==s[e])return!1;return!0}const y="array",n="yoffee_template";class x{constructor(e){this._cb=e,this.id=N(),this.lastResult=null,this.boundNode=null,this.boundProps=new Set,this.isEventHandler=!1,this.isStatic="function"!=typeof this._cb,this.resultType=null,this.resultMetadata=null}execute(){var e;this.cached=!1,this.isEventHandler||this.isStatic?this.lastResult=this._cb:null!=(e=this._cb())&&e.createYoffeeTemplate?this.handleYoffeeTemplate(e):Array.isArray(e)?this.handleArray(e):(this.removeChildTemplateListeners(),this.lastResult=e,this.resultType="primitive",this.resultMetadata=null)}handleYoffeeTemplate(s){var e,t,o,i;this.resultType===n&&null==this.resultMetadata.yoffeeTemplate||(this.resultType===n&&this.resultMetadata.cacheable&&(e=this.resultMetadata.hash,t=this.resultMetadata.propsObjs,o=s.hash,i=s.propsObjs,e===o&&E(t,i))?(this.cached=!0,this.lastResult.__expressions.forEach((e,t)=>{e._cb=s.expressionCbs[t]}),this.lastResult.__updateExpressions()):(this.removeChildTemplateListeners(),this.resultType=n,this.resultMetadata=s,this.lastResult=s.createYoffeeTemplate()))}handleArray(t){if(this.resultType===y){let e=this.resultMetadata,i=(this.lastResult=[],new Map);this.resultMetadata=i;for(let o of t)if(null!=o&&o.createYoffeeTemplate){let t=!1,s=e.get(o.hash);if(null!=s&&o.cacheable){var n=s.findIndex(e=>E(e.propsObjs,o.propsObjs));if(-1!==n){let e=s.splice(n,1)[0];t=!0,this.lastResult.push(e.yoffeeTemplate),e.shouldntDelete=!0,e.yoffeeTemplate.__expressions.forEach((e,t)=>{e._cb=o.expressionCbs[t]}),e.yoffeeTemplate.__updateExpressions(),d(i,e.hash,e)}}t||(d(i,o.hash,o),n=o.createYoffeeTemplate(),this.lastResult.push(n))}else this.lastResult.push(o);for(var s of e.values())s.forEach(e=>{e.shouldntDelete||e.yoffeeTemplate.__removeWatchers()});for(var o of i.values())o.forEach(e=>{e.shouldntDelete&&(e.shouldntDelete=void 0)})}else{this.removeChildTemplateListeners(),this.lastResult=[];var e,i,r=new Map;for(e of t)null!=e&&e.createYoffeeTemplate?(i=e.createYoffeeTemplate(),this.lastResult.push(i),d(r,e.hash,e)):this.lastResult.push(e);this.resultMetadata=r}this.resultType=y}removeChildTemplateListeners(){null!=this.resultType&&(this.resultType===n?this.resultMetadata.yoffeeTemplate.__removeWatchers():this.resultType===y&&this.lastResult.filter(e=>e.__isYoffee).forEach(e=>e.__removeWatchers()))}}let p=new Map,o=null,r=!1,a=new Set,l=null,g=(e,t)=>{r&&(t=t.__notWatchedProp+"."+e,a.has(t)||(a.add(t),l.boundProps.add(t),p.has(t)||p.set(t,new Set),p.get(t).add(l)))},w=(e,t,s)=>{if(r)throw`YOFFEE: Setting properties is not allowed inside an expression! (${e} = ${t})`;t=s.__notWatchedProp+"."+e,s=o,o=t,e=p.get(o);null!=e&&(T([...e],!0),o=s)};const T=(e,s)=>{var t,o=r;r=!0;try{for(let t of e){t.boundProps.forEach(e=>p.get(e).delete(t));var i=new Set(a),n=(s?a=new Set(t.__propsAccessedByFather||[]):t.__propsAccessedByFather=new Set(a),l);l=t,t.execute(),l=n,a=i}}finally{r=o}for(t of new Set(e.map(e=>e.boundNode)))t.update()};function t(d,e,t){let s=document.createDocumentFragment();s.__isYoffee=!0;const o=t.map(e=>new x(e));var i,t=function(e){let t,s=document.createElement("template");if(((e=e.trim()).startsWith("<tr")||e.startsWith("<td"))&&(" "===e[3]||">"===e[3]))throw"YOFFEE: Table tag is not supported";return s.innerHTML=`<yoffee-template-container>${e}</yoffee-template-container>`,t=s.content.firstElementChild,-1<navigator.userAgent.toLowerCase().indexOf("firefox")?document.adoptNode(t):t}((i=e,o.map(e=>e.id).reduce((e,t,s)=>e+t+i[s+1],i[0])));{var n=t,r;e=o;const l=new Map;for(r of e){if(null==(a=function(e,t){var s;for(s of[{type:h,xpath:`.//text()[contains(., '${t}')]`},{type:u,xpath:`.//@*[contains(., '${t}')]`},{type:c,xpath:`.//@*[contains(name(), '${t}')]`},{type:m,xpath:`.//*[contains(name(), '${t}')]`}]){var o=document.evaluate(s.xpath,e,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(null!=o)return{domNode:o,searchLocation:s.type}}}(n,r.id)))throw"YOFFEE: Expression location is not valid: ${"+r._cb.toString()+"}";let{domNode:t,searchLocation:e}=a;if(e===h&&(t=function(e,t){let s=e.data.trimRight();null==e.previousSibling&&(s=e.data.trimLeft());var o=s.indexOf(t),t=o+t.length;return 0!==o&&e.parentNode.insertBefore(document.createTextNode(s.substring(0,o)),e),t<s.length&&e.parentNode.insertBefore(document.createTextNode(s.substring(t)),e.nextSibling),e.data=s.substring(o,t),e}(t,r.id)),e===m)throw"YOFFEE: Calculating element name is not allowed: "+_(`<${t.localName}>`,[r]);if(e===u&&t.name.startsWith("on")&&(r.isEventHandler=!0),l.has(t)){let e=l.get(t);e.expressions.push(r),r.boundNode=e}else{var a=new b([r],t,e);l.set(t,a),r.boundNode=a}}}return s.__removeWatchers=()=>{for(let t of o)t.boundProps.forEach(e=>p.get(e).delete(t)),t.removeChildTemplateListeners()},T(o),s.__childNodes=[...t.childNodes],s.__expressions=o,s.__updateExpressions=()=>T(o.filter(e=>!e.isStatic&&!e.isEventHandler)),s.append(...t.childNodes),s}e.YoffeeElement=s,e.createYoffeeElement=function(e,t){if(t.prototype instanceof s)customElements.define(e,t);else{if(!(t instanceof Function))throw"YOFFEE: `createYoffeeElement` second parameter must be either a YoffeeElement subclass or a function, Got "+typeof renderCb;customElements.define(e,class extends s{render(){return t(this.props,this)}propUpdatedCallback(e){super.propUpdatedCallback(e),this.onPropUpdate&&this.onPropUpdate(e)}connectedCallback(){super.connectedCallback(),this.onConnect&&this.onConnect()}disconnectedCallback(){super.disconnectedCallback(),this.onDisconnect&&this.onDisconnect()}})}},e.html=function(...n){return(e,...s)=>{n.forEach(t=>{if("object"!=typeof t)throw"YOFFEE: Props object must be an object, got "+typeof propsObject;if(null==t)throw"YOFFEE: Props object can't be null";if(null==t.__notWatchedProp){t.__notWatchedProp=N();{var o=t,t=g,s=w;let e=f.get(o);if(null!=e)e.push({onGet:t,onSet:s});else{e=[{onGet:t,onSet:s}],f.set(o,e);{var i,n=o,r=t=>e.forEach(e=>e.onGet(t,o)),a=(t,s)=>e.forEach(e=>e.onSet(t,s,o));const l={},d=t=>{Object.defineProperty(n,t,{get:()=>(r&&r(t),l[t]),set(e){l[t]=e,a&&a(t,e)}})},h=Object.getOwnPropertyDescriptors(n);for(i of Object.keys(h))"__notWatchedProp"!==i&&(l[i]=n[i],d(i));Object.setPrototypeOf(n,new Proxy(l,{get(e,t){d(t),Reflect.get(n,t)},set:(e,t,s)=>(d(t),n[t]=s,!0)}))}}}}});let o=()=>t(0,e,s);if(r){let t={propsObjs:n,expressionCbs:s,hash:(i=e,s.reduce((e,t,s)=>e+t+i[s+1],i[0]).split("").reduce(function(e,t){return(e=(e<<5)-e+t.charCodeAt(0))&e},0)),cacheable:!1};return t.createYoffeeTemplate=()=>{var e=o();return t.yoffeeTemplate=e},t}var i;return o()}},Object.defineProperty(e,"__esModule",{value:!0})});
