var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,f=globalThis,p=f.trustedTypes,re=p?p.emptyScript:``,ie=f.reactiveElementPolyfillSupport,m=(e,t)=>e,h={toAttribute(e,t){switch(t){case Boolean:e=e?re:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},g=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:h,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(m(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?h:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?h:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??g)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:`open`},v[m(`elementProperties`)]=new Map,v[m(`finalized`)]=new Map,ie?.({ReactiveElement:v}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var y=globalThis,ae=e=>e,b=y.trustedTypes,oe=b?b.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,se=`$lit$`,x=`lit$${Math.random().toFixed(9).slice(2)}$`,ce=`?`+x,le=`<${ce}>`,S=document,C=()=>S.createComment(``),w=e=>e===null||typeof e!=`object`&&typeof e!=`function`,T=Array.isArray,ue=e=>T(e)||typeof e?.[Symbol.iterator]==`function`,E=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,fe=/>/g,O=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),pe=/'/g,me=/"/g,he=/^(?:script|style|textarea|title)$/i,k=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),A=Symbol.for(`lit-noChange`),j=Symbol.for(`lit-nothing`),M=new WeakMap,N=S.createTreeWalker(S,129);function P(e,t){if(!T(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return oe===void 0?t:oe.createHTML(t)}var ge=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=D;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===D?c[1]===`!--`?o=de:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=O):(he.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=O):o=fe:o===O?c[0]===`>`?(o=i??D,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?O:c[3]===`"`?me:pe):o===me||o===pe?o=O:o===de||o===fe?o=D:(o=O,i=void 0);let d=o===O&&e[t+1].startsWith(`/>`)?` `:``;a+=o===D?n+le:l>=0?(r.push(s),n.slice(0,l)+se+n.slice(l)+x+d):n+x+(l===-2?t:d)}return[P(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},F=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ge(t,n);if(this.el=e.createElement(l,r),N.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=N.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(se)){let t=u[o++],n=i.getAttribute(e).split(x),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ve:r[1]===`?`?ye:r[1]===`@`?be:R}),i.removeAttribute(e)}else e.startsWith(x)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(he.test(i.tagName)){let e=i.textContent.split(x),t=e.length-1;if(t>0){i.textContent=b?b.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],C()),N.nextNode(),c.push({type:2,index:++a});i.append(e[t],C())}}}else if(i.nodeType===8){if(i.data===ce)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(x,e+1))!==-1;)c.push({type:7,index:a}),e+=x.length-1}}a++}}static createElement(e,t){let n=S.createElement(`template`);return n.innerHTML=e,n}};function I(e,t,n=e,r){if(t===A)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=w(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=I(e,i._$AS(e,t.values),i,r)),t}var _e=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??S).importNode(t,!0);N.currentNode=r;let i=N.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new L(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new xe(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=N.nextNode(),a++)}return N.currentNode=S,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},L=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),w(e)?e===j||e==null||e===``?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==A&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ue(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&w(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=F.createElement(P(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new _e(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=M.get(e.strings);return t===void 0&&M.set(e.strings,t=new F(e)),t}k(t){T(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(C()),this.O(C()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ae(e).nextSibling;ae(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=j}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=I(this,e,t,0),a=!w(e)||e!==this._$AH&&e!==A,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=I(this,r[n+o],t,o),s===A&&(s=this._$AH[o]),a||=!w(s)||s!==this._$AH[o],s===j?e=j:e!==j&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ve=class extends R{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}},ye=class extends R{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}},be=class extends R{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=I(this,e,t,0)??j)===A)return;let n=this._$AH,r=e===j&&n!==j||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==j&&(n===j||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},xe=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}},Se=y.litHtmlPolyfillSupport;Se?.(F,L),(y.litHtmlVersions??=[]).push(`3.3.3`);var Ce=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new L(t.insertBefore(C(),e),e,void 0,n??{})}return i._$AI(e),i},z=globalThis,B=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ce(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};B._$litElement$=!0,B.finalized=!0,z.litElementHydrateSupport?.({LitElement:B});var we=z.litElementPolyfillSupport;we?.({LitElement:B}),(z.litElementVersions??=[]).push(`4.2.2`);var V=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Te={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:g},Ee=(e=Te,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function H(e){return(t,n)=>typeof n==`object`?Ee(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function U(e){return H({...e,state:!0,attribute:!1})}var De={upcoming_title:`Upcoming`,on_this_day_title:`On this day`,mini_tree_title:`Family`,birthday:`Birthday`,anniversary:`Anniversary`,memorial:`Memorial`,birth:`Born`,baptism:`Baptized`,death:`Died`,marriage:`Married`,partnership:`Partnership`,empty_upcoming:`No upcoming events`,empty_on_this_day:`Nothing on this day`,missing_entity:`Family Tree sensor not found`,empty_tree:`No person selected`,parents:`Parents`,partners:`Partners`,children:`Children`,days_today:`today`,days_tomorrow:`tomorrow`,days_in:`in %s days`,years_ago:`%s years ago`,loading:`Loading…`,error:`Could not load`},Oe={upcoming_title:`Komend`,on_this_day_title:`Op deze dag`,mini_tree_title:`Familie`,birthday:`Verjaardag`,anniversary:`Jubileum`,memorial:`Herdenking`,birth:`Geboren`,baptism:`Gedoopt`,death:`Overleden`,marriage:`Getrouwd`,partnership:`Partnerschap`,empty_upcoming:`Geen komende gebeurtenissen`,empty_on_this_day:`Niets op deze dag`,missing_entity:`Family Tree-sensor niet gevonden`,empty_tree:`Geen persoon gekozen`,parents:`Ouders`,partners:`Partners`,children:`Kinderen`,days_today:`vandaag`,days_tomorrow:`morgen`,days_in:`over %s dagen`,years_ago:`%s jaar geleden`,loading:`Laden…`,error:`Kon niet laden`};function ke(e){return(e?.locale?.language||e?.language||`en`).toLowerCase().startsWith(`nl`)?`nl`:`en`}function W(e,t){return(ke(e)===`nl`?Oe:De)[t]}function Ae(e,t){return t===0?W(e,`days_today`):t===1?W(e,`days_tomorrow`):W(e,`days_in`).replace(`%s`,String(t))}function je(e,t){if(!e?.states)return null;let n=`_${t}`;for(let r of Object.values(e.states))if(r.entity_id.startsWith(`sensor.`)&&(r.entity_id.endsWith(n)||r.entity_id===`sensor.${t}`))return r;return null}function Me(e,t,n){return t&&e?.states?.[t]?e.states[t]:je(e,n)}function Ne(e,t=8){let n=[],r=e?.birthdays||[],i=e?.anniversaries||[],a=e?.memorials||[];for(let e of r)n.push({kind:`birthday`,label:String(e.name||``),days_until:Number(e.days_until??0),next_date:e.next_date==null?void 0:String(e.next_date),detail:e.age==null?void 0:String(e.age)});for(let e of i){let t=e.names||[];n.push({kind:`anniversary`,label:t.join(` & `)||String(e.name||``),days_until:Number(e.days_until??0),next_date:e.next_date==null?void 0:String(e.next_date),detail:e.years==null?void 0:String(e.years)})}for(let e of a)n.push({kind:`memorial`,label:String(e.name||``),days_until:Number(e.days_until??0),next_date:e.next_date==null?void 0:String(e.next_date),detail:e.years==null?void 0:String(e.years)});return n.sort((e,t)=>e.days_until-t.days_until||e.label.localeCompare(t.label)),n.slice(0,t)}function Pe(e){return(e?.events||[]).map(e=>{let t=e.names||[],n=t.length>1?t.join(` & `):String(e.name||t[0]||`—`);return{kind:String(e.kind||`birth`),label:n,year:e.year==null?void 0:Number(e.year),years_ago:e.years_ago==null?void 0:Number(e.years_ago)}})}function Fe(e,t){let n=t;return n in De?W(e,n):t}function Ie(e,t){return t.years_ago==null?t.year==null?``:String(t.year):W(e,`years_ago`).replace(`%s`,String(t.years_ago))}function G(e){window.customCards=window.customCards||[],window.customCards.push({type:e.type,name:e.name,description:e.description,preview:!0})}function K(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var q=class extends B{constructor(...e){super(...e),this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement(`family-tree-upcoming-card-editor`)}setConfig(e){this._config={...e}}getCardSize(){return 3}render(){let e=Me(this.hass,this._config.entity,`upcoming_events`),t=this._config.title||W(this.hass,`upcoming_title`);if(!e)return k`<ha-card header=${t}>
        <div class="pad muted">${W(this.hass,`missing_entity`)}</div>
      </ha-card>`;let n=Ne(e.attributes,Math.min(20,Math.max(1,Number(this._config.max_items)||8)));return k`<ha-card header=${t}>
      ${n.length?k`<ul class="list">
            ${n.map(e=>k`<li>
                <span class="kind">${Fe(this.hass,e.kind)}</span>
                <span class="name">${e.label}</span>
                <span class="meta muted"
                  >${Ae(this.hass,e.days_until)}${e.detail?k` · ${e.detail}`:j}</span
                >
              </li>`)}
          </ul>`:k`<div class="pad muted">${W(this.hass,`empty_upcoming`)}</div>`}
    </ha-card>`}static{this.styles=o`
    .pad {
      padding: 12px 16px 16px;
    }
    .list {
      list-style: none;
      margin: 0;
      padding: 4px 16px 12px;
    }
    li {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 8px;
      align-items: baseline;
      padding: 6px 0;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }
    li:last-child {
      border-bottom: none;
    }
    .kind {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
    }
    .name {
      font-weight: 500;
    }
    .meta {
      font-size: 0.85rem;
      white-space: nowrap;
    }
    .muted {
      color: var(--secondary-text-color);
    }
  `}};K([H({attribute:!1})],q.prototype,`hass`,void 0),K([U()],q.prototype,`_config`,void 0),q=K([V(`family-tree-upcoming-card`)],q);var J=class extends B{constructor(...e){super(...e),this._config={}}setConfig(e){this._config={...e}}_fire(){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return k`<div class="form">
      <label>
        Entity
        <input
          type="text"
          .value=${this._config.entity||``}
          placeholder="sensor.…_upcoming_events"
          @change=${e=>{this._config={...this._config,entity:e.target.value.trim()||void 0},this._fire()}}
        />
      </label>
      <label>
        Title
        <input
          type="text"
          .value=${this._config.title||``}
          @change=${e=>{this._config={...this._config,title:e.target.value.trim()||void 0},this._fire()}}
        />
      </label>
    </div>`}static{this.styles=o`
    .form {
      display: grid;
      gap: 12px;
      padding: 4px 0;
    }
    label {
      display: grid;
      gap: 4px;
      font-size: 0.85rem;
    }
    input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
  `}};K([H({attribute:!1})],J.prototype,`hass`,void 0),K([U()],J.prototype,`_config`,void 0),J=K([V(`family-tree-upcoming-card-editor`)],J),G({type:`family-tree-upcoming-card`,name:`Family Tree Upcoming`,description:`Upcoming birthdays, anniversaries, and memorials`});var Y=class extends B{constructor(...e){super(...e),this._config={}}static getStubConfig(){return{}}static getConfigElement(){return document.createElement(`family-tree-on-this-day-card-editor`)}setConfig(e){this._config={...e}}getCardSize(){return 2}render(){let e=Me(this.hass,this._config.entity,`on_this_day`),t=this._config.title||W(this.hass,`on_this_day_title`);if(!e)return k`<ha-card header=${t}>
        <div class="pad muted">${W(this.hass,`missing_entity`)}</div>
      </ha-card>`;let n=Pe(e.attributes);return k`<ha-card header=${t}>
      ${n.length?k`<ul class="list">
            ${n.map(e=>{let t=Ie(this.hass,e);return k`<li>
                <span class="kind">${Fe(this.hass,e.kind)}</span>
                <span class="name">${e.label}</span>
                ${t?k`<span class="meta muted">${t}</span>`:j}
              </li>`})}
          </ul>`:k`<div class="pad muted">${W(this.hass,`empty_on_this_day`)}</div>`}
    </ha-card>`}static{this.styles=o`
    .pad {
      padding: 12px 16px 16px;
    }
    .list {
      list-style: none;
      margin: 0;
      padding: 4px 16px 12px;
    }
    li {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 8px;
      align-items: baseline;
      padding: 6px 0;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }
    li:last-child {
      border-bottom: none;
    }
    .kind {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
    }
    .name {
      font-weight: 500;
    }
    .meta {
      font-size: 0.85rem;
      white-space: nowrap;
    }
    .muted {
      color: var(--secondary-text-color);
    }
  `}};K([H({attribute:!1})],Y.prototype,`hass`,void 0),K([U()],Y.prototype,`_config`,void 0),Y=K([V(`family-tree-on-this-day-card`)],Y);var X=class extends B{constructor(...e){super(...e),this._config={}}setConfig(e){this._config={...e}}_fire(){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return k`<div class="form">
      <label>
        Entity
        <input
          type="text"
          .value=${this._config.entity||``}
          placeholder="sensor.…_on_this_day"
          @change=${e=>{this._config={...this._config,entity:e.target.value.trim()||void 0},this._fire()}}
        />
      </label>
      <label>
        Title
        <input
          type="text"
          .value=${this._config.title||``}
          @change=${e=>{this._config={...this._config,title:e.target.value.trim()||void 0},this._fire()}}
        />
      </label>
    </div>`}static{this.styles=o`
    .form {
      display: grid;
      gap: 12px;
      padding: 4px 0;
    }
    label {
      display: grid;
      gap: 4px;
      font-size: 0.85rem;
    }
    input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
  `}};K([H({attribute:!1})],X.prototype,`hass`,void 0),K([U()],X.prototype,`_config`,void 0),X=K([V(`family-tree-on-this-day-card-editor`)],X),G({type:`family-tree-on-this-day-card`,name:`Family Tree On This Day`,description:`Historic births, baptisms, marriages, and deaths for today`});function Le(e,t,n={}){return e.connection.sendMessagePromise({type:t,...n})}async function Re(e,t){return Le(e,`family_tree/tree`,{person_id:t})}async function ze(e){return Le(e,`family_tree/lineage/mine`)}function Z(e){return e?typeof e.name==`string`&&e.name?e.name:typeof e.display_name==`string`&&e.display_name?e.display_name:[e.given_names,e.surname_prefix,e.surname].map(e=>typeof e==`string`?e.trim():``).filter(Boolean).join(` `)||`Unknown`:`Unknown`}function Be(e){return(e||[]).map(e=>({id:String(e.id),name:Z(e),sex:typeof e.sex==`string`?e.sex:void 0,is_living:!!e.is_living}))}function Ve(e){return(e||[]).map(e=>({id:String(e.id),name:Z(e),sex:typeof e.sex==`string`?e.sex:void 0,is_living:!!e.is_living}))}function He(e){let t=[];for(let n of e||[]){let e=n.partners||[];for(let n of e)t.push(Z(n))}return t}var Q=class extends B{constructor(...e){super(...e),this._config={},this._tree=null,this._error=``,this._loading=!1,this._loadedFor=``,this._resolvedPersonId=void 0,this._loadGen=0}static getStubConfig(){return{use_linked_user:!0}}static getConfigElement(){return document.createElement(`family-tree-mini-tree-card-editor`)}setConfig(e){this._config={...e},this._loadedFor=``,this._tree=null,this._resolvedPersonId=void 0,this._error=``}getCardSize(){return 4}firstUpdated(){this._maybeLoad()}updated(e){e.has(`_config`)&&this._maybeLoad()}async _resolvePersonId(){if(this._config.person_id?.trim())return this._config.person_id.trim();if(this._config.use_linked_user===!1)return null;if(this._resolvedPersonId!==void 0)return this._resolvedPersonId;try{let e=await ze(this.hass);this._resolvedPersonId=e.person_id||null}catch{this._resolvedPersonId=null}return this._resolvedPersonId}async _maybeLoad(){if(!this.hass)return;let e=++this._loadGen,t=await this._resolvePersonId();if(e===this._loadGen){if(!t){this._tree=null,this._error=``,this._loadedFor=``;return}if(!(t===this._loadedFor&&this._tree)){this._loading=!0,this._error=``;try{let n=await Re(this.hass,t);if(e!==this._loadGen)return;this._tree=n,this._loadedFor=t}catch(t){if(e!==this._loadGen)return;this._tree=null,this._error=t instanceof Error?t.message:W(this.hass,`error`),this._loadedFor=``}finally{e===this._loadGen&&(this._loading=!1)}}}}render(){let e=this._config.title||W(this.hass,`mini_tree_title`);if(this._loading&&!this._tree)return k`<ha-card header=${e}>
        <div class="pad muted">${W(this.hass,`loading`)}</div>
      </ha-card>`;if(this._error)return k`<ha-card header=${e}>
        <div class="pad muted">${this._error}</div>
      </ha-card>`;if(!this._tree)return k`<ha-card header=${e}>
        <div class="pad muted">${W(this.hass,`empty_tree`)}</div>
      </ha-card>`;let t=Z(this._tree.person),n=Be(this._tree.parents),r=Ve(this._tree.children),i=He(this._tree.partners);return k`<ha-card header=${e}>
      <div class="tree">
        ${n.length?k`<section>
              <h4>${W(this.hass,`parents`)}</h4>
              <ul>
                ${n.map(e=>k`<li>${e.name}</li>`)}
              </ul>
            </section>`:j}
        <section class="focus">
          <div class="focus-name">${t}</div>
        </section>
        ${i.length?k`<section>
              <h4>${W(this.hass,`partners`)}</h4>
              <ul>
                ${i.map(e=>k`<li>${e}</li>`)}
              </ul>
            </section>`:j}
        ${r.length?k`<section>
              <h4>${W(this.hass,`children`)}</h4>
              <ul>
                ${r.map(e=>k`<li>${e.name}</li>`)}
              </ul>
            </section>`:j}
      </div>
    </ha-card>`}static{this.styles=o`
    .pad {
      padding: 12px 16px 16px;
    }
    .muted {
      color: var(--secondary-text-color);
    }
    .tree {
      padding: 8px 16px 16px;
      display: grid;
      gap: 12px;
    }
    h4 {
      margin: 0 0 4px;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
      font-weight: 600;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      padding: 2px 0;
    }
    .focus {
      padding: 10px 12px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    }
    .focus-name {
      font-size: 1.1rem;
      font-weight: 600;
    }
  `}};K([H({attribute:!1})],Q.prototype,`hass`,void 0),K([U()],Q.prototype,`_config`,void 0),K([U()],Q.prototype,`_tree`,void 0),K([U()],Q.prototype,`_error`,void 0),K([U()],Q.prototype,`_loading`,void 0),Q=K([V(`family-tree-mini-tree-card`)],Q);var $=class extends B{constructor(...e){super(...e),this._config={use_linked_user:!0}}setConfig(e){this._config={use_linked_user:!0,...e}}_fire(){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return k`<div class="form">
      <label class="check">
        <input
          type="checkbox"
          .checked=${this._config.use_linked_user!==!1}
          @change=${e=>{this._config={...this._config,use_linked_user:e.target.checked},this._fire()}}
        />
        Use linked Home Assistant user
      </label>
      <label>
        Person ID
        <input
          type="text"
          .value=${this._config.person_id||``}
          placeholder="optional override"
          @change=${e=>{this._config={...this._config,person_id:e.target.value.trim()||void 0},this._fire()}}
        />
      </label>
      <label>
        Title
        <input
          type="text"
          .value=${this._config.title||``}
          @change=${e=>{this._config={...this._config,title:e.target.value.trim()||void 0},this._fire()}}
        />
      </label>
    </div>`}static{this.styles=o`
    .form {
      display: grid;
      gap: 12px;
      padding: 4px 0;
    }
    label {
      display: grid;
      gap: 4px;
      font-size: 0.85rem;
    }
    label.check {
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 8px;
    }
    input[type="text"] {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
  `}};K([H({attribute:!1})],$.prototype,`hass`,void 0),K([U()],$.prototype,`_config`,void 0),$=K([V(`family-tree-mini-tree-card-editor`)],$),G({type:`family-tree-mini-tree-card`,name:`Family Tree Mini Tree`,description:`Compact parents, partners, and children for a person`});
//# sourceMappingURL=family-tree-cards.js.map