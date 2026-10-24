var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,f=globalThis,re=f.trustedTypes,ie=re?re.emptyScript:``,ae=f.reactiveElementPolyfillSupport,p=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?ie:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},h=(e,t)=>!l(e,t),oe={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:h};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??oe}static _$Ei(){if(this.hasOwnProperty(p(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(p(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(p(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?m:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?m:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??h)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};g.elementStyles=[],g.shadowRootOptions={mode:`open`},g[p(`elementProperties`)]=new Map,g[p(`finalized`)]=new Map,ae?.({ReactiveElement:g}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var _=globalThis,se=e=>e,v=_.trustedTypes,ce=v?v.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,le=`$lit$`,y=`lit$${Math.random().toFixed(9).slice(2)}$`,ue=`?`+y,de=`<${ue}>`,b=document,x=()=>b.createComment(``),S=e=>e===null||typeof e!=`object`&&typeof e!=`function`,C=Array.isArray,fe=e=>C(e)||typeof e?.[Symbol.iterator]==`function`,w=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,me=/>/g,E=RegExp(`>|${w}(?:([^\\s"'>=/]+)(${w}*=${w}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),he=/'/g,ge=/"/g,_e=/^(?:script|style|textarea|title)$/i,D=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),O=Symbol.for(`lit-noChange`),k=Symbol.for(`lit-nothing`),ve=new WeakMap,A=b.createTreeWalker(b,129);function ye(e,t){if(!C(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ce===void 0?t:ce.createHTML(t)}var be=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=T;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===T?c[1]===`!--`?o=pe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=E):(_e.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=E):o=me:o===E?c[0]===`>`?(o=i??T,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?E:c[3]===`"`?ge:he):o===ge||o===he?o=E:o===pe||o===me?o=T:(o=E,i=void 0);let d=o===E&&e[t+1].startsWith(`/>`)?` `:``;a+=o===T?n+de:l>=0?(r.push(s),n.slice(0,l)+le+n.slice(l)+y+d):n+y+(l===-2?t:d)}return[ye(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},xe=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=be(t,n);if(this.el=e.createElement(l,r),A.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=A.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(le)){let t=u[o++],n=i.getAttribute(e).split(y),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?we:r[1]===`?`?Te:r[1]===`@`?Ee:M}),i.removeAttribute(e)}else e.startsWith(y)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(_e.test(i.tagName)){let e=i.textContent.split(y),t=e.length-1;if(t>0){i.textContent=v?v.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],x()),A.nextNode(),c.push({type:2,index:++a});i.append(e[t],x())}}}else if(i.nodeType===8){if(i.data===ue)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(y,e+1))!==-1;)c.push({type:7,index:a}),e+=y.length-1}}a++}}static createElement(e,t){let n=b.createElement(`template`);return n.innerHTML=e,n}};function j(e,t,n=e,r){if(t===O)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=S(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=j(e,i._$AS(e,t.values),i,r)),t}var Se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??b).importNode(t,!0);A.currentNode=r;let i=A.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ce(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new De(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=A.nextNode(),a++)}return A.currentNode=b,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ce=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=j(this,e,t),S(e)?e===k||e==null||e===``?(this._$AH!==k&&this._$AR(),this._$AH=k):e!==this._$AH&&e!==O&&this._(e):e._$litType$===void 0?e.nodeType===void 0?fe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==k&&S(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=xe.createElement(ye(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Se(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new xe(e)),t}k(t){C(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(x()),this.O(x()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=se(e).nextSibling;se(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},M=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=k,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=k}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=j(this,e,t,0),a=!S(e)||e!==this._$AH&&e!==O,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=j(this,r[n+o],t,o),s===O&&(s=this._$AH[o]),a||=!S(s)||s!==this._$AH[o],s===k?e=k:e!==k&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},we=class extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===k?void 0:e}},Te=class extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==k)}},Ee=class extends M{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=j(this,e,t,0)??k)===O)return;let n=this._$AH,r=e===k&&n!==k||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==k&&(n===k||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},De=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){j(this,e)}},Oe=_.litHtmlPolyfillSupport;Oe?.(xe,Ce),(_.litHtmlVersions??=[]).push(`3.3.3`);var ke=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ce(t.insertBefore(x(),e),e,void 0,n??{})}return i._$AI(e),i},N=globalThis,P=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ke(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};P._$litElement$=!0,P.finalized=!0,N.litElementHydrateSupport?.({LitElement:P});var Ae=N.litElementPolyfillSupport;Ae?.({LitElement:P}),(N.litElementVersions??=[]).push(`4.2.2`);var F=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},je={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:h},Me=(e=je,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function I(e){return(t,n)=>typeof n==`object`?Me(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function L(e){return I({...e,state:!0,attribute:!1})}var Ne={upcoming_title:`Upcoming`,on_this_day_title:`On this day`,mini_tree_title:`Family`,birthday:`Birthday`,anniversary:`Anniversary`,memorial:`Memorial`,birth:`Born`,baptism:`Baptized`,death:`Died`,marriage:`Married`,partnership:`Partnership`,empty_upcoming:`No upcoming events`,empty_on_this_day:`Nothing on this day`,missing_entity:`Family Tree sensor not found`,empty_tree:`No person selected`,parents:`Parents`,partners:`Partners`,children:`Children`,days_today:`today`,days_tomorrow:`tomorrow`,days_in:`in %s days`,years_ago:`%s years ago`,turns_age:`turns %s`,loading:`Loading…`,error:`Could not load`,close:`Close`,open_in_family_tree:`Open in Family Tree`,entity:`Entity`,title:`Title`,max_items:`Max items`,person:`Person`,use_linked_user:`Use linked Home Assistant user`,search_person:`Search person`,no_person_results:`No people found`},Pe={upcoming_title:`Komend`,on_this_day_title:`Op deze dag`,mini_tree_title:`Familie`,birthday:`Verjaardag`,anniversary:`Jubileum`,memorial:`Herdenking`,birth:`Geboren`,baptism:`Gedoopt`,death:`Overleden`,marriage:`Getrouwd`,partnership:`Partnerschap`,empty_upcoming:`Geen komende gebeurtenissen`,empty_on_this_day:`Niets op deze dag`,missing_entity:`Family Tree-sensor niet gevonden`,empty_tree:`Geen persoon gekozen`,parents:`Ouders`,partners:`Partners`,children:`Kinderen`,days_today:`vandaag`,days_tomorrow:`morgen`,days_in:`over %s dagen`,years_ago:`%s jaar geleden`,turns_age:`wordt %s`,loading:`Laden…`,error:`Kon niet laden`,close:`Sluiten`,open_in_family_tree:`Open in stamboom`,entity:`Entiteit`,title:`Titel`,max_items:`Maximum items`,person:`Persoon`,use_linked_user:`Gekoppelde Home Assistant-gebruiker gebruiken`,search_person:`Zoek persoon`,no_person_results:`Geen personen gevonden`};function Fe(e){return(e?.locale?.language||e?.language||`en`).toLowerCase().startsWith(`nl`)?`nl`:`en`}function R(e,t){return(Fe(e)===`nl`?Pe:Ne)[t]}function Ie(e,t){return t===0?R(e,`days_today`):t===1?R(e,`days_tomorrow`):R(e,`days_in`).replace(`%s`,String(t))}function Le(e,t){if(!e?.states)return null;let n=`_${t}`;for(let r of Object.values(e.states))if(r.entity_id.startsWith(`sensor.`)&&(r.entity_id.endsWith(n)||r.entity_id===`sensor.${t}`))return r;return null}function Re(e,t,n){return t&&e?.states?.[t]?e.states[t]:Le(e,n)}function ze(e,t){if(Array.isArray(e)){let t=e.map(e=>String(e||``).trim()).filter(Boolean);return t.length?t:void 0}if(t!=null&&String(t).trim())return[String(t).trim()]}function Be(e,t=8,n){let r=[],i=e?.birthdays||[],a=e?.anniversaries||[],o=e?.memorials||[];for(let e of i){let t=e.person_id==null?void 0:String(e.person_id);r.push({kind:`birthday`,label:String(e.name||``),days_until:Number(e.days_until??0),next_date:e.next_date==null?void 0:String(e.next_date),detail:e.age==null?void 0:R(n,`turns_age`).replace(`%s`,String(e.age)),person_id:t,person_ids:t?[t]:void 0})}for(let e of a){let t=e.names||[],i=ze(e.person_ids,e.person_id);r.push({kind:`anniversary`,label:t.join(` & `)||String(e.name||``),days_until:Number(e.days_until??0),next_date:e.next_date==null?void 0:String(e.next_date),detail:e.years==null?void 0:R(n,`years_ago`).replace(`%s`,String(e.years)),person_id:i?.[0],person_ids:i})}for(let e of o){let t=e.person_id==null?void 0:String(e.person_id);r.push({kind:`memorial`,label:String(e.name||``),days_until:Number(e.days_until??0),next_date:e.next_date==null?void 0:String(e.next_date),detail:e.years==null?void 0:R(n,`years_ago`).replace(`%s`,String(e.years)),person_id:t,person_ids:t?[t]:void 0})}return r.sort((e,t)=>e.days_until-t.days_until||e.label.localeCompare(t.label)),r.slice(0,t)}function Ve(e,t){let n=Ie(e,t.days_until);return[t.detail,n].filter(Boolean).join(` · `)}function He(e){return(e?.events||[]).map(e=>{let t=e.names||[],n=t.length>1?t.join(` & `):String(e.name||t[0]||`—`),r=ze(e.person_ids,e.person_id);return{kind:String(e.kind||`birth`),label:n,year:e.year==null?void 0:Number(e.year),years_ago:e.years_ago==null?void 0:Number(e.years_ago),person_id:r?.[0],person_ids:r}})}function Ue(e,t){let n=t;return n in Ne?R(e,n):t}function We(e){let t=e.replace(/[^a-z0-9_-]/gi,``).toLowerCase();return t?`kind--${t}`:``}function Ge(e,t){return t.years_ago==null?t.year==null?``:String(t.year):R(e,`years_ago`).replace(`%s`,String(t.years_ago))}function z(e){window.customCards=window.customCards||[],window.customCards.push({type:e.type,name:e.name,description:e.description,preview:!0})}function Ke(e){let t=`/family_tree?person=${encodeURIComponent(e)}`;typeof history<`u`&&history.pushState(null,``,t),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1},bubbles:!0,composed:!0}))}function B(e,t,n={}){return e.connection.sendMessagePromise({type:t,...n})}async function qe(e,t={}){return B(e,`family_tree/persons/list`,t)}async function Je(e,t){return B(e,`family_tree/persons/get`,{person_id:t})}async function Ye(e,t){return B(e,`family_tree/tree`,{person_id:t})}async function Xe(e){return B(e,`family_tree/lineage/mine`)}function V(e){if(e.display_name)return e.display_name;let t=(e.call_name||e.given_names||``).trim();return[t.includes(` `)&&!e.call_name?t.split(/\s+/)[0]:t,e.surname_prefix,e.surname].map(e=>(e||``).trim()).filter(Boolean).join(` `)||`Unknown`}function H(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var U=class extends P{constructor(...e){super(...e),this.config={},this.sensorSuffix=``,this.showMaxItems=!1,this.showPersonPicker=!1,this.showLinkedUser=!1,this._personQuery=``,this._personHits=[],this._personSearching=!1,this._searchGen=0,this._entityFilter=e=>{let t=e?.entity_id||``;return this.sensorSuffix?t.startsWith(`sensor.`)&&(t.endsWith(`_${this.sensorSuffix}`)||t===`sensor.${this.sensorSuffix}`):t.startsWith(`sensor.`)}}_fire(e){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:e},bubbles:!0,composed:!0}))}_onEntityChanged(e){let t=e.detail?.value??``;this._fire({...this.config,entity:t.trim()||void 0})}_onTitleChanged(e){let t=e.target.value.trim();this._fire({...this.config,title:t||void 0})}_onMaxItemsChanged(e){let t=Number(e.target.value),n=Number.isFinite(t)?Math.min(20,Math.max(1,Math.round(t))):void 0;this._fire({...this.config,max_items:n})}_onLinkedChanged(e){let t=e.target.checked;this._fire({...this.config,use_linked_user:t})}_schedulePersonSearch(e){this._personQuery=e,this._searchTimer&&clearTimeout(this._searchTimer);let t=e.trim();if(!t){this._personHits=[],this._personSearching=!1;return}this._personSearching=!0,this._searchTimer=setTimeout(()=>void this._runPersonSearch(t),250)}async _runPersonSearch(e){let t=++this._searchGen;try{let n=await qe(this.hass,{search:e,limit:12});if(t!==this._searchGen)return;this._personHits=n.persons}catch{if(t!==this._searchGen)return;this._personHits=[]}finally{t===this._searchGen&&(this._personSearching=!1)}}_selectPerson(e){this._fire({...this.config,person_id:e.id,use_linked_user:!1}),this._personQuery=V(e),this._personHits=[]}_clearPerson(){this._fire({...this.config,person_id:void 0}),this._personQuery=``,this._personHits=[]}disconnectedCallback(){super.disconnectedCallback(),this._searchTimer&&clearTimeout(this._searchTimer)}render(){let e=this.hass;return D`<div class="form">
      ${this.sensorSuffix?D`<div class="field">
            <label>${R(e,`entity`)}</label>
            <ha-entity-picker
              .hass=${e}
              .value=${this.config.entity||``}
              .includeDomains=${[`sensor`]}
              .entityFilter=${this._entityFilter}
              allow-custom-entity
              @value-changed=${this._onEntityChanged}
            ></ha-entity-picker>
          </div>`:k}

      ${this.showLinkedUser?D`<label class="check">
            <ha-switch
              .checked=${this.config.use_linked_user!==!1}
              @change=${this._onLinkedChanged}
            ></ha-switch>
            <span>${R(e,`use_linked_user`)}</span>
          </label>`:k}

      ${this.showPersonPicker?D`<div class="field">
            <label>${R(e,`person`)}</label>
            ${this.config.person_id?D`<div class="selected">
                  <code>${this.config.person_id}</code>
                  <button type="button" class="clear" @click=${()=>this._clearPerson()}>
                    ×
                  </button>
                </div>`:k}
            <ha-textfield
              .label=${R(e,`search_person`)}
              .value=${this._personQuery}
              @input=${e=>this._schedulePersonSearch(e.target.value)}
            ></ha-textfield>
            ${this._personSearching?D`<div class="muted">${R(e,`loading`)}</div>`:k}
            ${this._personHits.length?D`<ul class="hits">
                  ${this._personHits.map(e=>D`<li>
                      <button type="button" @click=${()=>this._selectPerson(e)}>
                        ${V(e)}
                      </button>
                    </li>`)}
                </ul>`:this._personQuery.trim()&&!this._personSearching?D`<div class="muted">${R(e,`no_person_results`)}</div>`:k}
          </div>`:k}

      <div class="field">
        <ha-textfield
          .label=${R(e,`title`)}
          .value=${this.config.title||``}
          @change=${this._onTitleChanged}
        ></ha-textfield>
      </div>

      ${this.showMaxItems?D`<div class="field">
            <ha-textfield
              type="number"
              min="1"
              max="20"
              .label=${R(e,`max_items`)}
              .value=${String(this.config.max_items??8)}
              @change=${this._onMaxItemsChanged}
            ></ha-textfield>
          </div>`:k}
    </div>`}static{this.styles=o`
    .form {
      display: grid;
      gap: 16px;
      padding: 4px 0;
    }
    .field {
      display: grid;
      gap: 6px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    label.check {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 400;
    }
    .selected {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
    }
    .selected code {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background: var(--secondary-background-color);
      padding: 4px 8px;
      border-radius: 4px;
    }
    .clear {
      appearance: none;
      border: none;
      background: transparent;
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--secondary-text-color);
      line-height: 1;
    }
    .hits {
      list-style: none;
      margin: 0;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      max-height: 200px;
      overflow: auto;
    }
    .hits button {
      appearance: none;
      width: 100%;
      text-align: left;
      border: none;
      background: transparent;
      padding: 8px 10px;
      font: inherit;
      cursor: pointer;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--divider-color);
    }
    .hits li:last-child button {
      border-bottom: none;
    }
    .hits button:hover,
    .hits button:focus-visible {
      background: var(--secondary-background-color);
      outline: none;
    }
    .muted {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
  `}};H([I({attribute:!1})],U.prototype,`hass`,void 0),H([I({attribute:!1})],U.prototype,`config`,void 0),H([I()],U.prototype,`sensorSuffix`,void 0),H([I({type:Boolean})],U.prototype,`showMaxItems`,void 0),H([I({type:Boolean})],U.prototype,`showPersonPicker`,void 0),H([I({type:Boolean})],U.prototype,`showLinkedUser`,void 0),H([L()],U.prototype,`_personQuery`,void 0),H([L()],U.prototype,`_personHits`,void 0),H([L()],U.prototype,`_personSearching`,void 0),U=H([F(`family-tree-card-editor-form`)],U);var Ze=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function W(e){if(!e)return null;let t=/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(e);return t?{year:Number(t[1]),month:t[2]?Number(t[2]):void 0,day:t[3]?Number(t[3]):void 0}:null}function Qe(e,t,n,r=new Date){let i=W(e);if(!i?.year)return null;let a=n?{year:r.getFullYear(),month:r.getMonth()+1,day:r.getDate()}:W(t);if(!a?.year)return null;let o=a.year-i.year,s=i.month??1,c=i.day??1,l=a.month??1,u=a.day??1;return(l<s||l===s&&u<c)&&--o,Math.max(0,o)}function $e(e,t){let n=W(t)?.year;if(n)return n;let r=/\b(\d{4})\b/.exec(e||``);return r?Number(r[1]):null}function et(e,t,n){let r=W(t);if(r?.year&&r.month&&r.day){let e=`${Ze[r.month-1]} ${r.day}, ${r.year}`;return n==null?e:`${e} (${n})`}let i=(e||``).trim();return i?n==null?i:`${i} (${n})`:n==null?``:`(${n})`}function tt(e){let t=e.is_living!==!1,n=Qe(e.birth_sort_date,e.death_sort_date,t,e.today);if(t)return et(e.birth_date_text,e.birth_sort_date,n);let r=$e(e.birth_date_text,e.birth_sort_date),i=$e(e.death_date_text,e.death_sort_date),a=/about|abt|circa|ca\.?/i.test(e.death_date_text||``);return r!=null&&i!=null?`${r} - ${a?`about ${i}`:String(i)}${n==null?``:` (±${n})`}`:r==null?i==null?``:a?`about ${i}`:String(i):String(r)}function nt(e){if(!e)return``;let t=e,n=t.auth?.accessToken,r=t.auth?.data?.access_token,i=t.connection?.options?.auth?.accessToken;return(n||r||i||``).trim()}function rt(e){let t={},n=nt(e);return n&&(t.Authorization=`Bearer ${n}`),t}async function it(e){if(!e)return{};let t=e.auth;if(t?.expired&&typeof t.refreshAccessToken==`function`)try{await t.refreshAccessToken()}catch{}return rt(e)}function at(e,t=`thumb`){let n=e.trim();return/^[0-9a-f]{32}$/i.test(n)?`/api/family_tree/media/${n}?variant=${t===`full`?`full`:`thumb`}`:``}var G=class extends P{constructor(...e){super(...e),this.mediaId=``,this.variant=`thumb`,this.width=0,this.height=0,this.alt=``,this._src=``,this._objectUrl=null,this._loadGen=0}static{this.styles=o`
    :host {
      display: contents;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: inherit;
    }
  `}disconnectedCallback(){super.disconnectedCallback(),this._revokeObjectUrl()}updated(e){(e.has(`mediaId`)||e.has(`variant`)||e.has(`hass`))&&this._load()}firstUpdated(){this._load()}_revokeObjectUrl(){this._objectUrl&&=(URL.revokeObjectURL(this._objectUrl),null)}async _load(){let e=at(this.mediaId.trim(),this.variant);if(!e||!this.hass){this._revokeObjectUrl(),this._src=``;return}let t=++this._loadGen;try{let n=await it(this.hass);if(!n.Authorization||t!==this._loadGen)return;let r=await fetch(e,{method:`GET`,credentials:`same-origin`,headers:n});if(!r.ok||t!==this._loadGen)return;let i=await r.blob();if(t!==this._loadGen)return;this._revokeObjectUrl(),this._objectUrl=URL.createObjectURL(i),this._src=this._objectUrl}catch{t===this._loadGen&&(this._revokeObjectUrl(),this._src=``)}}render(){return this._src?D`<img
      src=${this._src}
      alt=${this.alt}
      width=${this.width>0?this.width:void 0}
      height=${this.height>0?this.height:void 0}
      loading="lazy"
    />`:D``}};H([I({attribute:!1})],G.prototype,`hass`,void 0),H([I()],G.prototype,`mediaId`,void 0),H([I()],G.prototype,`variant`,void 0),H([I({type:Number})],G.prototype,`width`,void 0),H([I({type:Number})],G.prototype,`height`,void 0),H([I()],G.prototype,`alt`,void 0),H([L()],G.prototype,`_src`,void 0),customElements.get(`ft-authenticated-media-img`)||customElements.define(`ft-authenticated-media-img`,G);var ot={sm:32,md:48,detail:64,lg:96};function st(e){return Math.max(10,Math.round(e*.22))}var ct=`M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z`;function lt(e){return D`<svg
    class="person-avatar__deceased-mark"
    viewBox="0 0 24 24"
    width=${e}
    height=${e}
    aria-hidden="true"
  >
    <path fill="currentColor" d=${ct} />
  </svg>`}function ut(e){let t=V(e).trim();if(!t)return`?`;let n=t.split(/\s+/).filter(Boolean);if(n.length>=2)return(n[0][0]+n[n.length-1][0]).toUpperCase();let r=n[0];return r.length>=2?r.slice(0,2).toUpperCase():r[0].toUpperCase()}function dt(e){return e===`male`?`person-avatar--male`:e===`female`?`person-avatar--female`:`person-avatar--unknown`}function ft(e,t={}){let n=t.size??`sm`,r=ot[n],i=t.sex??(typeof e.sex==`string`?e.sex:`unknown`),a=t.profileMediaId??(typeof e.profile_media_id==`string`?e.profile_media_id:null),o=t.isLiving??e.is_living!==!1,s=t.title??V(e),c=t.deceasedOverlay&&!o,l=t.deceasedMarkPx??st(r),u=n===`lg`||n===`detail`;if(a)return D`<span
      class="person-avatar person-avatar--photo ${dt(i)} person-avatar--${n}"
      style="width:${r}px;height:${r}px"
      title=${s}
    >
      <span class="person-avatar__inner">
        <ft-authenticated-media-img
          .hass=${t.hass}
          mediaId=${a}
          variant=${u?`full`:`thumb`}
          width=${r}
          height=${r}
        ></ft-authenticated-media-img>
      </span>
      ${c?lt(l):k}
    </span>`;let d=ut(e);return D`<span
    class="person-avatar person-avatar--initials ${dt(i)} person-avatar--${n}"
    style="width:${r}px;height:${r}px"
    title=${s}
    aria-hidden="true"
  >
    ${d}
    ${c?lt(l):k}
  </span>`}var pt=o`
  .person-avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex-shrink: 0;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid var(--divider-color);
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 1;
  }
  .person-avatar__inner {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .person-avatar img,
  .person-avatar ft-authenticated-media-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .person-avatar--male.person-avatar--initials {
    background: rgba(33, 150, 243, 0.15);
    color: var(--primary-text-color, #1a1a1a);
  }
  .person-avatar--female.person-avatar--initials {
    background: rgba(233, 30, 99, 0.12);
    color: var(--primary-text-color, #1a1a1a);
  }
  .person-avatar--unknown.person-avatar--initials {
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
  }
  .person-avatar__deceased-mark {
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: 1;
    color: var(--secondary-text-color);
    filter: drop-shadow(0 0 1px var(--card-background-color, #fff));
    pointer-events: none;
    line-height: 0;
  }
  .person-avatar--md {
    font-size: 0.85rem;
  }
  .person-avatar--detail {
    font-size: 1.1rem;
  }
`,mt=`button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])`;function ht(e){let t=()=>Array.from(e.querySelectorAll(mt)).filter(e=>e.offsetParent!==null||e===document.activeElement),n=e=>{if(e.key!==`Tab`)return;let n=t();if(!n.length)return;let r=n[0],i=n[n.length-1];e.shiftKey&&document.activeElement===r?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),r.focus())};return e.addEventListener(`keydown`,n),()=>e.removeEventListener(`keydown`,n)}var gt=new Set([`auto`,`scroll`,`overlay`]);function _t(e){let t=getComputedStyle(e);return gt.has(t.overflowY)?e.scrollHeight>e.clientHeight:!1}function*vt(e){let t=e;for(;t;){let e=t.parentElement??t.getRootNode().host??null;e instanceof HTMLElement&&(yield e),t=e}}function yt(e){let t=new Set,n=[],r=e=>{e&&!t.has(e)&&(t.add(e),n.push(e))};r(document.documentElement),r(document.body);for(let t of vt(e))_t(t)&&r(t);return n}function bt(e){let t=yt(e),n=[],r=window.scrollY;for(let e of t){let t={el:e,overflow:e.style.overflow,overflowY:e.style.overflowY};e===document.body&&(t.position=e.style.position,t.top=e.style.top,t.width=e.style.width,e.style.position=`fixed`,e.style.top=`-${r}px`,e.style.width=`100%`),e.style.overflow=`hidden`,e.style.overflowY=`hidden`,n.push(t)}let i=!1;return()=>{if(!i){i=!0;for(let e of n)e.el.style.overflow=e.overflow,e.el.style.overflowY=e.overflowY,e.position!==void 0&&(e.el.style.position=e.position,e.el.style.top=e.top??``,e.el.style.width=e.width??``);r&&window.scrollTo(0,r)}}}var K=`ft-modal`,q=class{constructor(e){this.openId=null,this._detail=null,this._loading=!1,this._error=``,this._loadGen=0,this._boundDialog=null,this._host=e}get isOpen(){return!!this.openId}open(e){let t=e.trim();t&&(this.openId=t,this._detail=null,this._error=``,this._loading=!0,this._host.requestUpdate(),this._load(t))}close(){this.openId=null,this._detail=null,this._error=``,this._loading=!1,this._closeDialogElements(),this._host.requestUpdate()}disconnected(){this._closeDialogElements(),this.openId=null}ensureOpen(){if(!this.openId){this._closeDialogElements();return}let e=this._host.renderRoot.querySelector(`dialog.${K}`);if(e){if(!e.open)try{e.showModal()}catch{return}this._unlockScroll||=bt(this._host),this._boundDialog!==e&&(this._releaseDialog(),this._boundDialog=e,e.focus(),this._unbindFocusTrap=ht(e))}}async _load(e){let t=++this._loadGen;try{let n=await Je(this._host.hass,e);if(t!==this._loadGen||this.openId!==e)return;this._detail=n,this._error=``}catch(n){if(t!==this._loadGen||this.openId!==e)return;this._detail=null,this._error=n instanceof Error?n.message:R(this._host.hass,`error`)}finally{t===this._loadGen&&(this._loading=!1,this._host.requestUpdate())}}_releaseDialog(){this._unbindFocusTrap?.(),this._unbindFocusTrap=void 0,this._boundDialog=null}_closeDialogElements(){let e=this._host.renderRoot;for(let t of e.querySelectorAll(`dialog.${K}`))t.open&&t.close();this._unlockScroll?.(),this._unlockScroll=void 0,this._releaseDialog()}_openInPanel(){let e=this.openId;e&&(this.close(),Ke(e))}render(){if(!this.openId)return k;let e=this._host.hass,t=this._detail?.person,n=t?V(t):R(e,`person`),r=t?tt({birth_date_text:t.birth?.date_text,birth_sort_date:t.birth?.sort_date,death_date_text:t.death?.date_text,death_sort_date:t.death?.sort_date,is_living:t.is_living}):``;return D`
      <dialog
        class=${K}
        aria-labelledby="ft-person-modal-title"
        @cancel=${e=>{e.preventDefault(),this.close()}}
        @click=${e=>{let t=e.currentTarget;e.target===t&&this.close()}}
      >
        <div class="ft-modal-inner">
          <div class="ft-modal-header">
            <h2 id="ft-person-modal-title" class="ft-modal-title">${n}</h2>
            <button type="button" class="ft-modal-close" @click=${()=>this.close()}>
              ${R(e,`close`)}
            </button>
          </div>
          <div class="ft-modal-body">
            ${this._loading?D`<p class="muted">${R(e,`loading`)}</p>`:this._error?D`<p class="muted">${this._error}</p>`:t?D`
                      <div class="ft-person-hero">
                        ${ft(t,{size:`detail`,hass:e,deceasedOverlay:!0,isLiving:t.is_living})}
                        <div class="ft-person-hero-text">
                          <div class="ft-person-name">${V(t)}</div>
                          ${r?D`<div class="muted">${r}</div>`:k}
                        </div>
                      </div>
                      <button
                        type="button"
                        class="ft-modal-primary"
                        @click=${()=>this._openInPanel()}
                      >
                        ${R(e,`open_in_family_tree`)}
                      </button>
                    `:D`<p class="muted">${R(e,`error`)}</p>`}
          </div>
        </div>
      </dialog>
    `}},xt=o`
  .ft-modal:not([open]) {
    display: none;
  }
  .ft-modal[open] {
    display: block;
  }
  .ft-modal {
    position: fixed;
    inset: unset;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    width: min(420px, calc(100vw - 32px));
    max-height: min(85vh, 640px);
    overflow: hidden;
    overscroll-behavior: contain;
    border-radius: 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
    box-sizing: border-box;
  }
  .ft-modal:focus,
  .ft-modal:focus-visible {
    outline: none;
  }
  .ft-modal::backdrop {
    background: rgba(0, 0, 0, 0.45);
  }
  .ft-modal-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    max-height: min(85vh, 640px);
  }
  .ft-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px 12px;
    flex-shrink: 0;
  }
  .ft-modal-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 650;
  }
  .ft-modal-close {
    appearance: none;
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    color: inherit;
    border-radius: 8px;
    padding: 6px 12px;
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }
  .ft-modal-close:hover,
  .ft-modal-close:focus-visible {
    background: var(--divider-color, rgba(0, 0, 0, 0.08));
    outline: none;
  }
  .ft-modal-body {
    overflow: auto;
    overscroll-behavior: contain;
    padding: 0 16px 16px;
    flex: 1;
    min-height: 0;
  }
  .ft-person-hero {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 4px 0 16px;
  }
  .ft-person-hero-text {
    min-width: 0;
  }
  .ft-person-name {
    font-size: 1.05rem;
    font-weight: 600;
  }
  .ft-modal-primary {
    appearance: none;
    width: 100%;
    border: none;
    border-radius: 8px;
    padding: 10px 14px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
  }
  .ft-modal-primary:hover,
  .ft-modal-primary:focus-visible {
    filter: brightness(1.05);
    outline: none;
  }
  .muted {
    color: var(--secondary-text-color);
  }
`,St=o`
  ${pt}
  ${xt}
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
    font-weight: 600;
  }
  .kind--birthday,
  .kind--marriage,
  .kind--partnership {
    color: var(--primary-color);
  }
  .kind--memorial,
  .kind--death {
    color: var(--secondary-text-color);
    opacity: 0.85;
  }
  .kind--anniversary,
  .kind--baptism,
  .kind--birth {
    color: var(--accent-color, var(--primary-color));
    opacity: 0.9;
  }
  .name {
    font-weight: 500;
  }
  button.linkish {
    appearance: none;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font: inherit;
    font-weight: 500;
    color: var(--primary-text-color);
    text-align: left;
    cursor: pointer;
  }
  button.linkish:hover,
  button.linkish:focus-visible {
    color: var(--primary-color);
    text-decoration: underline;
    outline: none;
  }
  .meta {
    font-size: 0.85rem;
    white-space: nowrap;
  }
  .muted {
    color: var(--secondary-text-color);
  }
`,J=class extends P{constructor(...e){super(...e),this._config={},this._personDialog=new q(this)}static getStubConfig(){return{}}static getConfigElement(){return document.createElement(`family-tree-upcoming-card-editor`)}setConfig(e){this._config={...e}}getCardSize(){return 3}disconnectedCallback(){super.disconnectedCallback(),this._personDialog.disconnected()}updated(){this._personDialog.ensureOpen()}render(){let e=Re(this.hass,this._config.entity,`upcoming_events`),t=this._config.title||R(this.hass,`upcoming_title`);if(!e)return D`<ha-card header=${t}>
        <div class="pad muted">${R(this.hass,`missing_entity`)}</div>
        ${this._personDialog.render()}
      </ha-card>`;let n=Be(e.attributes,Math.min(20,Math.max(1,Number(this._config.max_items)||8)),this.hass);return D`<ha-card header=${t}>
      ${n.length?D`<ul class="list">
            ${n.map(e=>{let t=Ve(this.hass,e),n=e.person_id;return D`<li>
                <span class="kind ${We(e.kind)}"
                  >${Ue(this.hass,e.kind)}</span
                >
                ${n?D`<button
                      type="button"
                      class="linkish name"
                      @click=${()=>this._personDialog.open(n)}
                    >
                      ${e.label}
                    </button>`:D`<span class="name">${e.label}</span>`}
                <span class="meta muted">${t}</span>
              </li>`})}
          </ul>`:D`<div class="pad muted">${R(this.hass,`empty_upcoming`)}</div>`}
      ${this._personDialog.render()}
    </ha-card>`}static{this.styles=St}};H([I({attribute:!1})],J.prototype,`hass`,void 0),H([L()],J.prototype,`_config`,void 0),J=H([F(`family-tree-upcoming-card`)],J);var Y=class extends P{constructor(...e){super(...e),this._config={}}setConfig(e){this._config={...e}}_fire(){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return D`<family-tree-card-editor-form
      .hass=${this.hass}
      .config=${this._config}
      sensorSuffix="upcoming_events"
      .showMaxItems=${!0}
      @config-changed=${e=>{this._config={...e.detail.config},this._fire()}}
    ></family-tree-card-editor-form>`}};H([I({attribute:!1})],Y.prototype,`hass`,void 0),H([L()],Y.prototype,`_config`,void 0),Y=H([F(`family-tree-upcoming-card-editor`)],Y),z({type:`family-tree-upcoming-card`,name:`Family Tree Upcoming`,description:`Upcoming birthdays, anniversaries, and memorials`});var X=class extends P{constructor(...e){super(...e),this._config={},this._personDialog=new q(this)}static getStubConfig(){return{}}static getConfigElement(){return document.createElement(`family-tree-on-this-day-card-editor`)}setConfig(e){this._config={...e}}getCardSize(){return 2}disconnectedCallback(){super.disconnectedCallback(),this._personDialog.disconnected()}updated(){this._personDialog.ensureOpen()}render(){let e=Re(this.hass,this._config.entity,`on_this_day`),t=this._config.title||R(this.hass,`on_this_day_title`);if(!e)return D`<ha-card header=${t}>
        <div class="pad muted">${R(this.hass,`missing_entity`)}</div>
        ${this._personDialog.render()}
      </ha-card>`;let n=He(e.attributes);return D`<ha-card header=${t}>
      ${n.length?D`<ul class="list">
            ${n.map(e=>{let t=Ge(this.hass,e),n=e.person_id;return D`<li>
                <span class="kind ${We(e.kind)}"
                  >${Ue(this.hass,e.kind)}</span
                >
                ${n?D`<button
                      type="button"
                      class="linkish name"
                      @click=${()=>this._personDialog.open(n)}
                    >
                      ${e.label}
                    </button>`:D`<span class="name">${e.label}</span>`}
                ${t?D`<span class="meta muted">${t}</span>`:k}
              </li>`})}
          </ul>`:D`<div class="pad muted">${R(this.hass,`empty_on_this_day`)}</div>`}
      ${this._personDialog.render()}
    </ha-card>`}static{this.styles=St}};H([I({attribute:!1})],X.prototype,`hass`,void 0),H([L()],X.prototype,`_config`,void 0),X=H([F(`family-tree-on-this-day-card`)],X);var Z=class extends P{constructor(...e){super(...e),this._config={}}setConfig(e){this._config={...e}}_fire(){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return D`<family-tree-card-editor-form
      .hass=${this.hass}
      .config=${this._config}
      sensorSuffix="on_this_day"
      @config-changed=${e=>{this._config={...e.detail.config},this._fire()}}
    ></family-tree-card-editor-form>`}};H([I({attribute:!1})],Z.prototype,`hass`,void 0),H([L()],Z.prototype,`_config`,void 0),Z=H([F(`family-tree-on-this-day-card-editor`)],Z),z({type:`family-tree-on-this-day-card`,name:`Family Tree On This Day`,description:`Historic births, baptisms, marriages, and deaths for today`});function Ct(e){return e?typeof e.name==`string`&&e.name?e.name:typeof e.display_name==`string`&&e.display_name?e.display_name:[e.given_names,e.surname_prefix,e.surname].map(e=>typeof e==`string`?e.trim():``).filter(Boolean).join(` `)||`Unknown`:`Unknown`}function wt(e){return{id:String(e.id||``),name:Ct(e),sex:typeof e.sex==`string`?e.sex:void 0,is_living:!!e.is_living,profile_media_id:typeof e.profile_media_id==`string`?e.profile_media_id:null}}function Tt(e){return(e||[]).map(wt)}function Et(e){return(e||[]).map(wt)}function Dt(e){let t=[],n=new Set;for(let r of e||[]){let e=r.partners||[];for(let r of e){let e=wt(r);if(e.id){if(n.has(e.id))continue;n.add(e.id)}t.push(e)}}return t}var Q=class extends P{constructor(...e){super(...e),this._config={},this._tree=null,this._error=``,this._loading=!1,this._loadedFor=``,this._resolvedPersonId=void 0,this._loadGen=0,this._personDialog=new q(this)}static getStubConfig(){return{use_linked_user:!0}}static getConfigElement(){return document.createElement(`family-tree-mini-tree-card-editor`)}setConfig(e){this._config={...e},this._loadedFor=``,this._tree=null,this._resolvedPersonId=void 0,this._error=``}getCardSize(){return 4}disconnectedCallback(){super.disconnectedCallback(),this._personDialog.disconnected()}firstUpdated(){this._maybeLoad()}updated(e){e.has(`_config`)&&this._maybeLoad(),this._personDialog.ensureOpen()}async _resolvePersonId(){if(this._config.person_id?.trim())return this._config.person_id.trim();if(this._config.use_linked_user===!1)return null;if(this._resolvedPersonId!==void 0)return this._resolvedPersonId;try{let e=await Xe(this.hass);this._resolvedPersonId=e.person_id||null}catch{this._resolvedPersonId=null}return this._resolvedPersonId}async _maybeLoad(){if(!this.hass)return;let e=++this._loadGen,t=await this._resolvePersonId();if(e===this._loadGen){if(!t){this._tree=null,this._error=``,this._loadedFor=``;return}if(!(t===this._loadedFor&&this._tree)){this._loading=!0,this._error=``;try{let n=await Ye(this.hass,t);if(e!==this._loadGen)return;this._tree=n,this._loadedFor=t}catch(t){if(e!==this._loadGen)return;this._tree=null,this._error=t instanceof Error?t.message:R(this.hass,`error`),this._loadedFor=``}finally{e===this._loadGen&&(this._loading=!1)}}}}_nodeButton(e,t={}){let n=t.size??`sm`,r=ft({id:e.id,given_names:e.name,call_name:``,surname_prefix:``,surname:``,sex:e.sex||`unknown`,is_living:!!e.is_living,notes:``,display_name:e.name,profile_media_id:e.profile_media_id??void 0},{size:n,hass:this.hass,deceasedOverlay:!0,isLiving:!!e.is_living,profileMediaId:e.profile_media_id,title:e.name});return e.id?D`<button
      type="button"
      class="node ${t.focus?`node--focus`:``}"
      @click=${()=>this._personDialog.open(e.id)}
    >
      ${r}
      <span class="node-name">${e.name}</span>
    </button>`:D`<div class="node ${t.focus?`node--focus`:``}">
        ${r}
        <span class="node-name">${e.name}</span>
      </div>`}render(){let e=this._config.title||R(this.hass,`mini_tree_title`);if(this._loading&&!this._tree)return D`<ha-card header=${e}>
        <div class="pad muted">${R(this.hass,`loading`)}</div>
        ${this._personDialog.render()}
      </ha-card>`;if(this._error)return D`<ha-card header=${e}>
        <div class="pad muted">${this._error}</div>
        ${this._personDialog.render()}
      </ha-card>`;if(!this._tree)return D`<ha-card header=${e}>
        <div class="pad muted">${R(this.hass,`empty_tree`)}</div>
        ${this._personDialog.render()}
      </ha-card>`;let t=this._tree.person,n={id:String(t.id||this._loadedFor),name:Ct(t),sex:typeof t.sex==`string`?t.sex:void 0,is_living:!!t.is_living,profile_media_id:typeof t.profile_media_id==`string`?t.profile_media_id:null},r=Tt(this._tree.parents),i=Dt(this._tree.partners),a=Et(this._tree.children);return D`<ha-card header=${e}>
      <div class="tree">
        ${r.length?D`<div class="row row--parents">
              ${r.map(e=>this._nodeButton(e))}
            </div>
            <div class="connector connector--parents" aria-hidden="true"></div>`:k}

        <div class="row row--focus">
          ${this._nodeButton(n,{focus:!0,size:`md`})}
          ${i.map(e=>this._nodeButton(e,{size:`md`}))}
        </div>

        ${a.length?D`<div class="connector connector--children" aria-hidden="true"></div>
            <div class="row row--children">
              ${a.map(e=>this._nodeButton(e))}
            </div>`:k}
      </div>
      ${this._personDialog.render()}
    </ha-card>`}static{this.styles=[pt,xt,o`
      .pad {
        padding: 12px 16px 16px;
      }
      .muted {
        color: var(--secondary-text-color);
      }
      .tree {
        padding: 12px 16px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px 16px;
        width: 100%;
      }
      .connector {
        width: 2px;
        height: 14px;
        background: var(--divider-color, rgba(0, 0, 0, 0.18));
        margin: 2px 0;
      }
      .connector--parents {
        position: relative;
      }
      .connector--parents::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: min(120px, 40%);
        height: 2px;
        background: var(--divider-color, rgba(0, 0, 0, 0.18));
        transform: translate(-50%, -100%);
      }
      .node {
        appearance: none;
        border: none;
        background: transparent;
        padding: 6px 8px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        max-width: 110px;
        cursor: pointer;
        color: inherit;
        font: inherit;
      }
      .node:hover,
      .node:focus-visible {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        outline: none;
      }
      .node--focus {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.12));
        max-width: 140px;
      }
      .node-name {
        font-size: 0.8rem;
        font-weight: 500;
        text-align: center;
        line-height: 1.25;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .node--focus .node-name {
        font-size: 0.9rem;
        font-weight: 600;
      }
    `]}};H([I({attribute:!1})],Q.prototype,`hass`,void 0),H([L()],Q.prototype,`_config`,void 0),H([L()],Q.prototype,`_tree`,void 0),H([L()],Q.prototype,`_error`,void 0),H([L()],Q.prototype,`_loading`,void 0),Q=H([F(`family-tree-mini-tree-card`)],Q);var $=class extends P{constructor(...e){super(...e),this._config={use_linked_user:!0}}setConfig(e){this._config={use_linked_user:!0,...e}}_fire(){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return D`<family-tree-card-editor-form
      .hass=${this.hass}
      .config=${this._config}
      .showPersonPicker=${!0}
      .showLinkedUser=${!0}
      @config-changed=${e=>{this._config={use_linked_user:!0,...e.detail.config},this._fire()}}
    ></family-tree-card-editor-form>`}};H([I({attribute:!1})],$.prototype,`hass`,void 0),H([L()],$.prototype,`_config`,void 0),$=H([F(`family-tree-mini-tree-card-editor`)],$),z({type:`family-tree-mini-tree-card`,name:`Family Tree Mini Tree`,description:`Compact parents, partners, and children for a person`});
//# sourceMappingURL=family-tree-cards.js.map