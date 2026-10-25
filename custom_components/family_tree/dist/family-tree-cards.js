var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,f=globalThis,re=f.trustedTypes,ie=re?re.emptyScript:``,ae=f.reactiveElementPolyfillSupport,p=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?ie:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},oe=(e,t)=>!l(e,t),se={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:oe};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var h=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??se}static _$Ei(){if(this.hasOwnProperty(p(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(p(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(p(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?m:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?m:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??oe)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};h.elementStyles=[],h.shadowRootOptions={mode:`open`},h[p(`elementProperties`)]=new Map,h[p(`finalized`)]=new Map,ae?.({ReactiveElement:h}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var ce=globalThis,le=e=>e,g=ce.trustedTypes,ue=g?g.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,de=`$lit$`,_=`lit$${Math.random().toFixed(9).slice(2)}$`,fe=`?`+_,pe=`<${fe}>`,v=document,y=()=>v.createComment(``),b=e=>e===null||typeof e!=`object`&&typeof e!=`function`,me=Array.isArray,he=e=>me(e)||typeof e?.[Symbol.iterator]==`function`,x=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,_e=/>/g,C=RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ve=/'/g,ye=/"/g,be=/^(?:script|style|textarea|title)$/i,w=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),T=Symbol.for(`lit-noChange`),E=Symbol.for(`lit-nothing`),xe=new WeakMap,D=v.createTreeWalker(v,129);function Se(e,t){if(!me(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ue===void 0?t:ue.createHTML(t)}var Ce=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=S;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===S?c[1]===`!--`?o=ge:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=C):(be.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=C):o=_e:o===C?c[0]===`>`?(o=i??S,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?C:c[3]===`"`?ye:ve):o===ye||o===ve?o=C:o===ge||o===_e?o=S:(o=C,i=void 0);let d=o===C&&e[t+1].startsWith(`/>`)?` `:``;a+=o===S?n+pe:l>=0?(r.push(s),n.slice(0,l)+de+n.slice(l)+_+d):n+_+(l===-2?t:d)}return[Se(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},we=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Ce(t,n);if(this.el=e.createElement(l,r),D.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=D.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(de)){let t=u[o++],n=i.getAttribute(e).split(_),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?De:r[1]===`?`?Oe:r[1]===`@`?ke:k}),i.removeAttribute(e)}else e.startsWith(_)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(be.test(i.tagName)){let e=i.textContent.split(_),t=e.length-1;if(t>0){i.textContent=g?g.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],y()),D.nextNode(),c.push({type:2,index:++a});i.append(e[t],y())}}}else if(i.nodeType===8){if(i.data===fe)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(_,e+1))!==-1;)c.push({type:7,index:a}),e+=_.length-1}}a++}}static createElement(e,t){let n=v.createElement(`template`);return n.innerHTML=e,n}};function O(e,t,n=e,r){if(t===T)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=b(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=O(e,i._$AS(e,t.values),i,r)),t}var Te=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??v).importNode(t,!0);D.currentNode=r;let i=D.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ee(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ae(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=D.nextNode(),a++)}return D.currentNode=v,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ee=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=O(this,e,t),b(e)?e===E||e==null||e===``?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==T&&this._(e):e._$litType$===void 0?e.nodeType===void 0?he(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&b(this._$AH)?this._$AA.nextSibling.data=e:this.T(v.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=we.createElement(Se(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Te(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new we(e)),t}k(t){me(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(y()),this.O(y()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=le(e).nextSibling;le(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},k=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=E}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=O(this,e,t,0),a=!b(e)||e!==this._$AH&&e!==T,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=O(this,r[n+o],t,o),s===T&&(s=this._$AH[o]),a||=!b(s)||s!==this._$AH[o],s===E?e=E:e!==E&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},De=class extends k{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}},Oe=class extends k{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}},ke=class extends k{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=O(this,e,t,0)??E)===T)return;let n=this._$AH,r=e===E&&n!==E||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==E&&(n===E||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ae=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){O(this,e)}},je=ce.litHtmlPolyfillSupport;je?.(we,Ee),(ce.litHtmlVersions??=[]).push(`3.3.3`);var Me=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ee(t.insertBefore(y(),e),e,void 0,n??{})}return i._$AI(e),i},A=globalThis,j=class extends h{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};j._$litElement$=!0,j.finalized=!0,A.litElementHydrateSupport?.({LitElement:j});var Ne=A.litElementPolyfillSupport;Ne?.({LitElement:j}),(A.litElementVersions??=[]).push(`4.2.2`);var M=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Pe={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:oe},Fe=(e=Pe,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function N(e){return(t,n)=>typeof n==`object`?Fe(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function P(e){return N({...e,state:!0,attribute:!1})}var Ie={upcoming_title:`Upcoming`,on_this_day_title:`On this day`,mini_tree_title:`Family`,birthday:`Birthday`,anniversary:`Anniversary`,memorial:`Memorial`,birth:`Born`,baptism:`Baptized`,death:`Died`,marriage:`Married`,partnership:`Partnership`,empty_upcoming:`No upcoming events`,empty_on_this_day:`Nothing on this day`,missing_entity:`Family Tree sensor not found`,empty_tree:`No person selected`,parents:`Parents`,partners:`Partners`,children:`Children`,days_today:`today`,days_tomorrow:`tomorrow`,days_in:`in %s days`,years_ago:`%s years ago`,turns_age:`turns %s`,loading:`Loading…`,error:`Could not load`,close:`Close`,open_in_family_tree:`Open in Family Tree`,entity:`Entity`,title:`Title`,max_items:`Max items`,person:`Person`,use_linked_user:`Use linked Home Assistant user`,search_person:`Search person`,no_person_results:`No people found`,clear_person:`Clear person`,given_names:`First name(s)`,call_name:`Preferred name`,surname:`Last name`,sex:`Gender`,sex_male:`Male`,sex_female:`Female`,sex_other:`Other`,lifespan:`Lifespan`,notes:`Notes`},Le={upcoming_title:`Komend`,on_this_day_title:`Op deze dag`,mini_tree_title:`Familie`,birthday:`Verjaardag`,anniversary:`Jubileum`,memorial:`Herdenking`,birth:`Geboren`,baptism:`Gedoopt`,death:`Overleden`,marriage:`Getrouwd`,partnership:`Partnerschap`,empty_upcoming:`Geen komende gebeurtenissen`,empty_on_this_day:`Niets op deze dag`,missing_entity:`Family Tree-sensor niet gevonden`,empty_tree:`Geen persoon gekozen`,parents:`Ouders`,partners:`Partners`,children:`Kinderen`,days_today:`vandaag`,days_tomorrow:`morgen`,days_in:`over %s dagen`,years_ago:`%s jaar geleden`,turns_age:`wordt %s`,loading:`Laden…`,error:`Kon niet laden`,close:`Sluiten`,open_in_family_tree:`Open in stamboom`,entity:`Entiteit`,title:`Titel`,max_items:`Maximum items`,person:`Persoon`,use_linked_user:`Gekoppelde Home Assistant-gebruiker gebruiken`,search_person:`Zoek persoon`,no_person_results:`Geen personen gevonden`,clear_person:`Persoon wissen`,given_names:`Voornaam/voornamen`,call_name:`Roepnaam`,surname:`Achternaam`,sex:`Geslacht`,sex_male:`Man`,sex_female:`Vrouw`,sex_other:`Anders`,lifespan:`Levensduur`,notes:`Notities`};function Re(e){return(e?.locale?.language||e?.language||`en`).toLowerCase().startsWith(`nl`)?`nl`:`en`}function F(e,t){return(Re(e)===`nl`?Le:Ie)[t]}function ze(e,t){return t===0?F(e,`days_today`):t===1?F(e,`days_tomorrow`):F(e,`days_in`).replace(`%s`,String(t))}function Be(e,t){if(!e?.states)return null;let n=`_${t}`;for(let r of Object.values(e.states))if(r.entity_id.startsWith(`sensor.`)&&(r.entity_id.endsWith(n)||r.entity_id===`sensor.${t}`))return r;return null}function Ve(e,t,n){return t&&e?.states?.[t]?e.states[t]:Be(e,n)}function He(e,t){if(Array.isArray(e)){let t=e.map(e=>String(e||``).trim()).filter(Boolean);return t.length?t:void 0}if(t!=null&&String(t).trim())return[String(t).trim()]}function Ue(e,t=8,n){let r=[],i=e?.birthdays||[],a=e?.anniversaries||[],o=e?.memorials||[];for(let e of i){let t=e.person_id==null?void 0:String(e.person_id);r.push({kind:`birthday`,label:String(e.name||``),days_until:Number(e.days_until??0),next_date:e.next_date==null?void 0:String(e.next_date),detail:e.age==null?void 0:F(n,`turns_age`).replace(`%s`,String(e.age)),person_id:t,person_ids:t?[t]:void 0})}for(let e of a){let t=e.names||[],i=He(e.person_ids,e.person_id);r.push({kind:`anniversary`,label:t.join(` & `)||String(e.name||``),days_until:Number(e.days_until??0),next_date:e.next_date==null?void 0:String(e.next_date),detail:e.years==null?void 0:F(n,`years_ago`).replace(`%s`,String(e.years)),person_id:i?.[0],person_ids:i})}for(let e of o){let t=e.person_id==null?void 0:String(e.person_id);r.push({kind:`memorial`,label:String(e.name||``),days_until:Number(e.days_until??0),next_date:e.next_date==null?void 0:String(e.next_date),detail:e.years==null?void 0:F(n,`years_ago`).replace(`%s`,String(e.years)),person_id:t,person_ids:t?[t]:void 0})}return r.sort((e,t)=>e.days_until-t.days_until||e.label.localeCompare(t.label)),r.slice(0,t)}function We(e,t){let n=ze(e,t.days_until);return[t.detail,n].filter(Boolean).join(` · `)}function Ge(e){return(e?.events||[]).map(e=>{let t=e.names||[],n=t.length>1?t.join(` & `):String(e.name||t[0]||`—`),r=He(e.person_ids,e.person_id);return{kind:String(e.kind||`birth`),label:n,year:e.year==null?void 0:Number(e.year),years_ago:e.years_ago==null?void 0:Number(e.years_ago),person_id:r?.[0],person_ids:r}})}function Ke(e,t){let n=t;return n in Ie?F(e,n):t}function qe(e){let t=e.replace(/[^a-z0-9_-]/gi,``).toLowerCase();return t?`kind--${t}`:``}function Je(e,t){return t.years_ago==null?t.year==null?``:String(t.year):F(e,`years_ago`).replace(`%s`,String(t.years_ago))}function I(e){window.customCards=window.customCards||[],window.customCards.push({type:e.type,name:e.name,description:e.description,preview:!0})}function Ye(e){let t=`/family_tree?person=${encodeURIComponent(e)}`;typeof history<`u`&&history.pushState(null,``,t),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1},bubbles:!0,composed:!0}))}function L(e,t,n={}){return e.connection.sendMessagePromise({type:t,...n})}async function Xe(e,t={}){return L(e,`family_tree/persons/list`,t)}async function Ze(e,t){return L(e,`family_tree/persons/get`,{person_id:t})}async function Qe(e,t){return L(e,`family_tree/tree`,{person_id:t})}async function $e(e){return L(e,`family_tree/lineage/mine`)}function R(e){if(e.display_name)return e.display_name;let t=(e.call_name||e.given_names||``).trim();return[t.includes(` `)&&!e.call_name?t.split(/\s+/)[0]:t,e.surname_prefix,e.surname].map(e=>(e||``).trim()).filter(Boolean).join(` `)||`Unknown`}function z(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var et=12,B=class extends j{constructor(...e){super(...e),this.config={},this.sensorSuffix=``,this.showMaxItems=!1,this.showPersonPicker=!1,this.showLinkedUser=!1,this._personQuery=``,this._personHits=[],this._personList=[],this._personListLoading=!1,this._personListError=!1,this._comboOpen=!1,this._useHaComboBox=!1,this._listLoaded=!1,this._listGen=0,this._entityFilter=e=>{let t=e?.entity_id||``;return this.sensorSuffix?t.startsWith(`sensor.`)&&(t.endsWith(`_${this.sensorSuffix}`)||t===`sensor.${this.sensorSuffix}`):t.startsWith(`sensor.`)}}connectedCallback(){super.connectedCallback(),this._useHaComboBox=typeof customElements<`u`&&!!customElements.get(`ha-combo-box`)}updated(e){this.showPersonPicker&&(e.has(`showPersonPicker`)||e.has(`hass`)||e.has(`config`))&&this._ensurePersonList()}_fire(e){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:e},bubbles:!0,composed:!0}))}_onEntityChanged(e){let t=e.detail?.value??``;this._fire({...this.config,entity:t.trim()||void 0})}_onTitleInput(e){let t=e.target.value.trim();this._fire({...this.config,title:t||void 0})}_onMaxItemsInput(e){let t=Number(e.target.value),n=Number.isFinite(t)?Math.min(20,Math.max(1,Math.round(t))):void 0;this._fire({...this.config,max_items:n})}_onLinkedChanged(e){let t=!!e.target.checked;this._fire({...this.config,use_linked_user:t})}get _linkedUserOn(){return this.config.use_linked_user!==!1}get _showPersonCombo(){return this.showPersonPicker&&!(this.showLinkedUser&&this._linkedUserOn)}async _ensurePersonList(){if(!this.hass||this._listLoaded||this._personListLoading)return;let e=++this._listGen;this._personListLoading=!0,this._personListError=!1;try{let t=await Xe(this.hass,{limit:5e3});if(e!==this._listGen)return;this._personList=t.persons.map(e=>({id:e.id,label:R(e)})),this._listLoaded=!0,this._hydrateSelectedLabel(),this._filterHits(this._personQuery)}catch{if(e!==this._listGen)return;this._personListError=!0,this._personList=[]}finally{e===this._listGen&&(this._personListLoading=!1)}}_hydrateSelectedLabel(){let e=this.config.person_id?.trim();if(!e||this._personQuery.trim())return;let t=this._personList.find(t=>t.id===e);t&&(this._personQuery=t.label)}_selectedLabel(){let e=this.config.person_id?.trim();return e?this._personList.find(t=>t.id===e)?.label||e:``}_filterHits(e){let t=e.trim().toLowerCase();this._personHits=t?this._personList.filter(e=>e.label.toLowerCase().includes(t)||e.id.toLowerCase().includes(t)).slice(0,et):this._personList.slice(0,et)}_onPersonQueryInput(e){let t=e.target.value;this._personQuery=t,this._comboOpen=!0,this._filterHits(t)}_onPersonFocus(){this._comboOpen=!0,!this._personQuery.trim()&&this.config.person_id&&(this._personQuery=this._selectedLabel()),this._filterHits(this._personQuery)}_onPersonBlur(){window.setTimeout(()=>{this._comboOpen=!1,this.config.person_id&&(this._personQuery=this._selectedLabel())},150)}_selectPerson(e){this._fire({...this.config,person_id:e.id,use_linked_user:!1}),this._personQuery=e.label,this._comboOpen=!1,this._personHits=[]}_clearPerson(){this._fire({...this.config,person_id:void 0}),this._personQuery=``,this._personHits=[],this._comboOpen=!1}_onHaComboChanged(e){let t=String(e.detail?.value??``).trim();if(!t){this._clearPerson();return}let n=this._personList.find(e=>e.id===t||e.label===t);n&&this._selectPerson(n)}_renderPersonCombo(e){if(this._useHaComboBox&&this._personList.length)return w`<ha-combo-box
        .hass=${e}
        .label=${F(e,`person`)}
        .items=${this._personList}
        .value=${this.config.person_id||``}
        item-value-path="id"
        item-label-path="label"
        .allowCustomValue=${!1}
        @value-changed=${this._onHaComboChanged}
      ></ha-combo-box>`;let t=this._comboOpen&&!this._personListLoading&&(this._personHits.length>0||!!this._personQuery.trim());return w`
      <div class="combo">
        <input
          type="search"
          class="text-input"
          autocomplete="off"
          .value=${this._personQuery}
          placeholder=${F(e,`search_person`)}
          aria-label=${F(e,`person`)}
          @input=${this._onPersonQueryInput}
          @focus=${this._onPersonFocus}
          @blur=${this._onPersonBlur}
        />
        ${this.config.person_id?w`<button
              type="button"
              class="clear"
              title=${F(e,`clear_person`)}
              @mousedown=${e=>e.preventDefault()}
              @click=${()=>this._clearPerson()}
            >
              ×
            </button>`:E}
      </div>
      ${this._personListLoading?w`<div class="muted">${F(e,`loading`)}</div>`:E}
      ${this._personListError?w`<div class="muted">${F(e,`error`)}</div>`:E}
      ${t?this._personHits.length?w`<ul class="hits" role="listbox">
              ${this._personHits.map(e=>w`<li>
                  <button
                    type="button"
                    role="option"
                    @mousedown=${e=>e.preventDefault()}
                    @click=${()=>this._selectPerson(e)}
                  >
                    ${e.label}
                  </button>
                </li>`)}
            </ul>`:w`<div class="muted">${F(e,`no_person_results`)}</div>`:E}
    `}render(){let e=this.hass;return w`<div class="form">
      ${this.sensorSuffix?w`<div class="field">
            <label>${F(e,`entity`)}</label>
            <ha-entity-picker
              .hass=${e}
              .value=${this.config.entity||``}
              .includeDomains=${[`sensor`]}
              .entityFilter=${this._entityFilter}
              allow-custom-entity
              @value-changed=${this._onEntityChanged}
            ></ha-entity-picker>
          </div>`:E}

      ${this.showLinkedUser?w`<label class="check">
            <ha-switch
              .checked=${this._linkedUserOn}
              @change=${this._onLinkedChanged}
            ></ha-switch>
            <span>${F(e,`use_linked_user`)}</span>
          </label>`:E}

      ${this._showPersonCombo?w`<div class="field">
            <label>${F(e,`person`)}</label>
            ${this.config.person_id&&!this._useHaComboBox?w`<div class="selected">
                  <span class="selected-name">${this._selectedLabel()}</span>
                </div>`:E}
            ${this._renderPersonCombo(e)}
          </div>`:E}

      <div class="field">
        <label for="ft-card-title">${F(e,`title`)}</label>
        <input
          id="ft-card-title"
          type="text"
          class="text-input"
          .value=${this.config.title||``}
          @change=${this._onTitleInput}
        />
      </div>

      ${this.showMaxItems?w`<div class="field">
            <label for="ft-card-max">${F(e,`max_items`)}</label>
            <input
              id="ft-card-max"
              type="number"
              class="text-input"
              min="1"
              max="20"
              .value=${String(this.config.max_items??8)}
              @change=${this._onMaxItemsInput}
            />
          </div>`:E}
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
    .text-input {
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: var(--ha-border-radius-sm, 4px);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
      font-size: 1rem;
    }
    .text-input:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 0;
      border-color: var(--primary-color);
    }
    .combo {
      position: relative;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .combo .text-input {
      flex: 1;
      padding-right: 36px;
    }
    .combo .clear {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
    .selected {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
    }
    .selected-name {
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
      padding: 4px 8px;
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
  `}};z([N({attribute:!1})],B.prototype,`hass`,void 0),z([N({attribute:!1})],B.prototype,`config`,void 0),z([N()],B.prototype,`sensorSuffix`,void 0),z([N({type:Boolean})],B.prototype,`showMaxItems`,void 0),z([N({type:Boolean})],B.prototype,`showPersonPicker`,void 0),z([N({type:Boolean})],B.prototype,`showLinkedUser`,void 0),z([P()],B.prototype,`_personQuery`,void 0),z([P()],B.prototype,`_personHits`,void 0),z([P()],B.prototype,`_personList`,void 0),z([P()],B.prototype,`_personListLoading`,void 0),z([P()],B.prototype,`_personListError`,void 0),z([P()],B.prototype,`_comboOpen`,void 0),z([P()],B.prototype,`_useHaComboBox`,void 0),B=z([M(`family-tree-card-editor-form`)],B);var tt=[`JAN`,`FEB`,`MAR`,`APR`,`MAY`,`JUN`,`JUL`,`AUG`,`SEP`,`OCT`,`NOV`,`DEC`],nt={en:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],nl:[`jan`,`feb`,`mrt`,`apr`,`mei`,`jun`,`jul`,`aug`,`sep`,`okt`,`nov`,`dec`]},rt={};[[`jan`,`january`,`januari`],[`feb`,`february`,`februari`],[`mar`,`mrt`,`march`,`maart`],[`apr`,`april`],[`may`,`mei`],[`jun`,`june`,`juni`],[`jul`,`july`,`juli`],[`aug`,`august`,`augustus`],[`sep`,`sept`,`september`],[`oct`,`okt`,`october`,`oktober`],[`nov`,`november`],[`dec`,`december`]].forEach((e,t)=>e.forEach(e=>rt[e]=t+1));var it={en:{about:`about`,before:`before`,after:`after`,between:`between`,and:`and`,estimated:`est.`,calculated:`calc.`,deceased:`Deceased`},nl:{about:`ca.`,before:`voor`,after:`na`,between:`tussen`,and:`en`,estimated:`geschat`,calculated:`berekend`,deceased:`Overleden`}};function at(e){return(e||`en`).toLowerCase().startsWith(`nl`)?`nl`:`en`}var ot=[[/^(ABT|ABOUT|CIR|CA\.?|CIRCA)\s+/i,`about`],[/^(BEF|BEFORE)\s+/i,`before`],[/^(AFT|AFTER)\s+/i,`after`],[/^EST\s+/i,`estimated`],[/^CAL\s+/i,`calculated`]];function V(e){let t=/^(?:(\d{1,2})\s+)?(?:([A-Z]{3})\s+)?(\d{3,4})$/i.exec(e.trim());if(!t)return null;let n=Number(t[3]),r=t[2]?tt.indexOf(t[2].toUpperCase()):-1;if(t[2]&&r<0)return null;let i=r>=0?r+1:void 0;return{year:n,month:i,day:t[1]&&i?Number(t[1]):void 0}}function H(e){let t=(e||``).trim(),n={qualifier:`exact`,first:null,second:null,raw:t};if(!t)return n;let r=/^BET\s+(.+?)\s+AND\s+(.+)$/i.exec(t);if(r)return{qualifier:`between`,first:V(r[1]),second:V(r[2]),raw:t};let i=/^FROM\s+(.+?)(?:\s+TO\s+(.+))?$/i.exec(t);if(i)return{qualifier:`from_to`,first:V(i[1]),second:i[2]?V(i[2]):null,raw:t};for(let[e,n]of ot)if(e.test(t))return{qualifier:n,first:V(t.replace(e,``)),second:null,raw:t};return{qualifier:`exact`,first:V(t),second:null,raw:t}}function U(e){if(!e)return null;let t=/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(e);return t?{year:Number(t[1]),month:t[2]?Number(t[2]):void 0,day:t[3]?Number(t[3]):void 0}:null}function W(e,t){let n=at(t),r=nt[n];return e.month&&e.day?n===`nl`?`${e.day} ${r[e.month-1]} ${e.year}`:`${r[e.month-1]} ${e.day}, ${e.year}`:e.month?`${r[e.month-1]} ${e.year}`:String(e.year)}function G(e,t){if(!e)return``;let n=it[at(t)],r=H(e.date_text);if(!r.raw){let n=U(e.sort_date);return n?W(n,t):``}if(!r.first)return r.raw;let i=W(r.first,t);switch(r.qualifier){case`between`:return r.second?`${n.between} ${i} ${n.and} ${W(r.second,t)}`:i;case`from_to`:return r.second?`${i} – ${W(r.second,t)}`:`${i} –`;case`exact`:return i;default:return`${n[r.qualifier]} ${i}`}}function st(e){if(!e)return!1;let t=H(e.date_text);return t.raw?t.qualifier===`exact`&&!!t.first?.day:!!U(e.sort_date)?.day}function ct(e){return e?U(e.sort_date)||H(e.date_text).first:null}function lt(e,t,n,r=new Date){let i=ct(e);if(!i)return null;let a,o=!0;if(t)a=ct(t),o=st(t);else if(n)a={year:r.getFullYear(),month:r.getMonth()+1,day:r.getDate()};else return null;if(!a)return null;let s=!st(e)||!o,c=a.year-i.year;if(!s){let e=i.month??1,t=i.day??1,n=a.month??1,r=a.day??1;(n<e||n===e&&r<t)&&--c}return c<0||c>130?null:{years:c,approx:s}}function ut(e,t,n,r){let i=lt(e,t,n,r);return i?i.approx?`(±${i.years})`:`(${i.years})`:``}function dt(e,t,n,r,i){let a=ut(e,t,n&&!t,i);if(n&&!t)return[G(e,r),a].filter(Boolean).join(` `);let o=G(e,r),s=G(t,r);return o&&s?`${o} – ${s}${a?` ${a}`:``}`:o?`${o} –`:s?`– ${s}`:``}function ft(e){if(!e)return``;let t=e,n=t.auth?.accessToken,r=t.auth?.data?.access_token,i=t.connection?.options?.auth?.accessToken;return(n||r||i||``).trim()}function pt(e){let t={},n=ft(e);return n&&(t.Authorization=`Bearer ${n}`),t}async function mt(e){if(!e)return{};let t=e.auth;if(t?.expired&&typeof t.refreshAccessToken==`function`)try{await t.refreshAccessToken()}catch{}return pt(e)}function ht(e,t=`thumb`){let n=e.trim();return/^[0-9a-f]{32}$/i.test(n)?`/api/family_tree/media/${n}?variant=${t===`full`?`full`:`thumb`}`:``}var K=class extends j{constructor(...e){super(...e),this.mediaId=``,this.variant=`thumb`,this.width=0,this.height=0,this.alt=``,this._src=``,this._objectUrl=null,this._loadGen=0}static{this.styles=o`
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
  `}disconnectedCallback(){super.disconnectedCallback(),this._revokeObjectUrl()}updated(e){(e.has(`mediaId`)||e.has(`variant`)||e.has(`hass`))&&this._load()}firstUpdated(){this._load()}_revokeObjectUrl(){this._objectUrl&&=(URL.revokeObjectURL(this._objectUrl),null)}async _load(){let e=ht(this.mediaId.trim(),this.variant);if(!e||!this.hass){this._revokeObjectUrl(),this._src=``;return}let t=++this._loadGen;try{let n=await mt(this.hass);if(!n.Authorization||t!==this._loadGen)return;let r=await fetch(e,{method:`GET`,credentials:`same-origin`,headers:n});if(!r.ok||t!==this._loadGen)return;let i=await r.blob();if(t!==this._loadGen)return;this._revokeObjectUrl(),this._objectUrl=URL.createObjectURL(i),this._src=this._objectUrl}catch{t===this._loadGen&&(this._revokeObjectUrl(),this._src=``)}}render(){return this._src?w`<img
      src=${this._src}
      alt=${this.alt}
      width=${this.width>0?this.width:void 0}
      height=${this.height>0?this.height:void 0}
      loading="lazy"
    />`:w``}};z([N({attribute:!1})],K.prototype,`hass`,void 0),z([N()],K.prototype,`mediaId`,void 0),z([N()],K.prototype,`variant`,void 0),z([N({type:Number})],K.prototype,`width`,void 0),z([N({type:Number})],K.prototype,`height`,void 0),z([N()],K.prototype,`alt`,void 0),z([P()],K.prototype,`_src`,void 0),customElements.get(`ft-authenticated-media-img`)||customElements.define(`ft-authenticated-media-img`,K);var gt={sm:32,md:48,detail:64,lg:96};function _t(e){return Math.max(10,Math.round(e*.22))}var vt=`M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z`;function yt(e){return w`<svg
    class="person-avatar__deceased-mark"
    viewBox="0 0 24 24"
    width=${e}
    height=${e}
    aria-hidden="true"
  >
    <path fill="currentColor" d=${vt} />
  </svg>`}function bt(e){let t=R(e).trim();if(!t)return`?`;let n=t.split(/\s+/).filter(Boolean);if(n.length>=2)return(n[0][0]+n[n.length-1][0]).toUpperCase();let r=n[0];return r.length>=2?r.slice(0,2).toUpperCase():r[0].toUpperCase()}function xt(e){return e===`male`?`person-avatar--male`:e===`female`?`person-avatar--female`:`person-avatar--unknown`}function St(e,t={}){let n=t.size??`sm`,r=gt[n],i=t.sex??(typeof e.sex==`string`?e.sex:`unknown`),a=t.profileMediaId??(typeof e.profile_media_id==`string`?e.profile_media_id:null),o=t.isLiving??e.is_living!==!1,s=t.title??R(e),c=t.deceasedOverlay&&!o,l=t.deceasedMarkPx??_t(r),u=n===`lg`||n===`detail`;if(a)return w`<span
      class="person-avatar person-avatar--photo ${xt(i)} person-avatar--${n}"
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
      ${c?yt(l):E}
    </span>`;let d=bt(e);return w`<span
    class="person-avatar person-avatar--initials ${xt(i)} person-avatar--${n}"
    style="width:${r}px;height:${r}px"
    title=${s}
    aria-hidden="true"
  >
    ${d}
    ${c?yt(l):E}
  </span>`}var Ct=o`
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
`,wt=`button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])`;function Tt(e){let t=()=>Array.from(e.querySelectorAll(wt)).filter(e=>e.offsetParent!==null||e===document.activeElement),n=e=>{if(e.key!==`Tab`)return;let n=t();if(!n.length)return;let r=n[0],i=n[n.length-1];e.shiftKey&&document.activeElement===r?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),r.focus())};return e.addEventListener(`keydown`,n),()=>e.removeEventListener(`keydown`,n)}var Et=new Set([`auto`,`scroll`,`overlay`]);function Dt(e){let t=getComputedStyle(e);return Et.has(t.overflowY)?e.scrollHeight>e.clientHeight:!1}function*Ot(e){let t=e;for(;t;){let e=t.parentElement??t.getRootNode().host??null;e instanceof HTMLElement&&(yield e),t=e}}function kt(e){let t=new Set,n=[],r=e=>{e&&!t.has(e)&&(t.add(e),n.push(e))};r(document.documentElement),r(document.body);for(let t of Ot(e))Dt(t)&&r(t);return n}function At(e){let t=kt(e),n=[],r=window.scrollY;for(let e of t){let t={el:e,overflow:e.style.overflow,overflowY:e.style.overflowY};e===document.body&&(t.position=e.style.position,t.top=e.style.top,t.width=e.style.width,e.style.position=`fixed`,e.style.top=`-${r}px`,e.style.width=`100%`),e.style.overflow=`hidden`,e.style.overflowY=`hidden`,n.push(t)}let i=!1;return()=>{if(!i){i=!0;for(let e of n)e.el.style.overflow=e.overflow,e.el.style.overflowY=e.overflowY,e.position!==void 0&&(e.el.style.position=e.position,e.el.style.top=e.top??``,e.el.style.width=e.width??``);r&&window.scrollTo(0,r)}}}var jt=`ft-modal`;function Mt(e,t){if(!t||t===`unknown`)return null;let n=`sex_${t}`;return n===`sex_male`||n===`sex_female`||n===`sex_other`?F(e,n):null}function Nt(e){return[e.surname_prefix,e.surname].filter(Boolean).join(` `).trim()}function q(e,t){let n=(t||``).trim();return n?w`<div class="ft-kv-row">
    <dt>${e}</dt>
    <dd>${n}</dd>
  </div>`:E}var Pt=class{constructor(e){this.openId=null,this._detail=null,this._loading=!1,this._error=``,this._loadGen=0,this._boundDialog=null,this._host=e}get isOpen(){return!!this.openId}open(e){let t=e.trim();t&&(this.openId=t,this._detail=null,this._error=``,this._loading=!0,this._host.requestUpdate(),this._load(t))}close(){this.openId=null,this._detail=null,this._error=``,this._loading=!1,this._closeDialogElements(),this._host.requestUpdate()}disconnected(){this._closeDialogElements(),this.openId=null}ensureOpen(){if(!this.openId){this._closeDialogElements();return}let e=this._host.renderRoot.querySelector(`dialog.${jt}`);if(e){if(!e.open)try{e.showModal()}catch{return}this._unlockScroll||=At(this._host),this._boundDialog!==e&&(this._releaseDialog(),this._boundDialog=e,e.focus(),this._unbindFocusTrap=Tt(e))}}async _load(e){let t=++this._loadGen;try{let n=await Ze(this._host.hass,e);if(t!==this._loadGen||this.openId!==e)return;this._detail=n,this._error=``}catch(n){if(t!==this._loadGen||this.openId!==e)return;this._detail=null,this._error=n instanceof Error?n.message:F(this._host.hass,`error`)}finally{t===this._loadGen&&(this._loading=!1,this._host.requestUpdate())}}_releaseDialog(){this._unbindFocusTrap?.(),this._unbindFocusTrap=void 0,this._boundDialog=null}_closeDialogElements(){let e=this._host.renderRoot;for(let t of e.querySelectorAll(`dialog.${jt}`))t.open&&t.close();this._unlockScroll?.(),this._unlockScroll=void 0,this._releaseDialog()}_openInPanel(){let e=this.openId;e&&(this.close(),Ye(e))}_renderDetails(e){let t=this._host.hass,n=t?.language,r=Mt(t,e.sex),i=e.birth||e.death?dt(e.birth,e.death,e.is_living,n):``,a=[q(F(t,`given_names`),e.given_names),q(F(t,`call_name`),e.call_name),q(F(t,`surname`),Nt(e)),r?w`<div class="ft-kv-row">
            <dt>${F(t,`sex`)}</dt>
            <dd><span class="ft-sex-badge ft-sex-${e.sex}">${r}</span></dd>
          </div>`:E,q(F(t,`lifespan`),i),q(F(t,`notes`),e.notes)].filter(e=>e!==E);return a.length?w`<dl class="ft-kv">${a}</dl>`:E}render(){if(!this.openId)return E;let e=this._host.hass,t=this._detail?.person,n=t?R(t):F(e,`person`);return w`
      <dialog
        class=${jt}
        aria-labelledby="ft-person-modal-title"
        @cancel=${e=>{e.preventDefault(),this.close()}}
        @click=${e=>{let t=e.currentTarget;e.target===t&&this.close()}}
      >
        <div class="ft-modal-inner">
          <div class="ft-modal-header">
            <h2 id="ft-person-modal-title" class="ft-modal-head">
              ${t?w`${St(t,{size:`md`,hass:e,deceasedOverlay:!0,isLiving:t.is_living})}
                  <span class="ft-modal-title">${n}</span>`:w`<span class="ft-modal-title">${n}</span>`}
            </h2>
            <button type="button" class="ft-modal-close" @click=${()=>this.close()}>
              ${F(e,`close`)}
            </button>
          </div>
          <div class="ft-modal-body">
            ${this._loading?w`<p class="muted">${F(e,`loading`)}</p>`:this._error?w`<p class="muted">${this._error}</p>`:t?w`
                      ${this._renderDetails(t)}
                      <button
                        type="button"
                        class="ft-modal-primary"
                        @click=${()=>this._openInPanel()}
                      >
                        ${F(e,`open_in_family_tree`)}
                      </button>
                    `:w`<p class="muted">${F(e,`error`)}</p>`}
          </div>
        </div>
      </dialog>
    `}},Ft=o`
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
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px 12px;
    flex-shrink: 0;
  }
  .ft-modal-head {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    flex: 1;
  }
  .ft-modal-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 650;
    line-height: 1.3;
    min-width: 0;
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
    flex-shrink: 0;
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
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .ft-kv {
    margin: 0;
    display: grid;
    gap: 8px;
  }
  .ft-kv-row {
    display: grid;
    grid-template-columns: minmax(100px, 38%) 1fr;
    gap: 8px 12px;
    align-items: baseline;
  }
  .ft-kv dt {
    margin: 0;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }
  .ft-kv dd {
    margin: 0;
    font-size: 0.95rem;
    word-break: break-word;
  }
  .ft-sex-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 500;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .ft-sex-male {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 16%, transparent);
  }
  .ft-sex-female {
    background: color-mix(in srgb, #e91e63 14%, transparent);
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
    margin-top: auto;
  }
  .ft-modal-primary:hover,
  .ft-modal-primary:focus-visible {
    filter: brightness(1.05);
    outline: none;
  }
  .muted {
    color: var(--secondary-text-color);
  }
`,It=o`
  ${Ct}
  ${Ft}
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
`,J=class extends j{constructor(...e){super(...e),this._config={},this._personDialog=new Pt(this)}static getStubConfig(){return{}}static getConfigElement(){return document.createElement(`family-tree-upcoming-card-editor`)}setConfig(e){this._config={...e}}getCardSize(){return 3}disconnectedCallback(){super.disconnectedCallback(),this._personDialog.disconnected()}updated(){this._personDialog.ensureOpen()}render(){let e=Ve(this.hass,this._config.entity,`upcoming_events`),t=this._config.title||F(this.hass,`upcoming_title`);if(!e)return w`<ha-card header=${t}>
        <div class="pad muted">${F(this.hass,`missing_entity`)}</div>
        ${this._personDialog.render()}
      </ha-card>`;let n=Ue(e.attributes,Math.min(20,Math.max(1,Number(this._config.max_items)||8)),this.hass);return w`<ha-card header=${t}>
      ${n.length?w`<ul class="list">
            ${n.map(e=>{let t=We(this.hass,e),n=e.person_id;return w`<li>
                <span class="kind ${qe(e.kind)}"
                  >${Ke(this.hass,e.kind)}</span
                >
                ${n?w`<button
                      type="button"
                      class="linkish name"
                      @click=${()=>this._personDialog.open(n)}
                    >
                      ${e.label}
                    </button>`:w`<span class="name">${e.label}</span>`}
                <span class="meta muted">${t}</span>
              </li>`})}
          </ul>`:w`<div class="pad muted">${F(this.hass,`empty_upcoming`)}</div>`}
      ${this._personDialog.render()}
    </ha-card>`}static{this.styles=It}};z([N({attribute:!1})],J.prototype,`hass`,void 0),z([P()],J.prototype,`_config`,void 0),J=z([M(`family-tree-upcoming-card`)],J);var Y=class extends j{constructor(...e){super(...e),this._config={}}setConfig(e){this._config={...e}}_fire(){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return w`<family-tree-card-editor-form
      .hass=${this.hass}
      .config=${this._config}
      sensorSuffix="upcoming_events"
      .showMaxItems=${!0}
      @config-changed=${e=>{this._config={...e.detail.config},this._fire()}}
    ></family-tree-card-editor-form>`}};z([N({attribute:!1})],Y.prototype,`hass`,void 0),z([P()],Y.prototype,`_config`,void 0),Y=z([M(`family-tree-upcoming-card-editor`)],Y),I({type:`family-tree-upcoming-card`,name:`Family Tree Upcoming`,description:`Upcoming birthdays, anniversaries, and memorials`});var X=class extends j{constructor(...e){super(...e),this._config={},this._personDialog=new Pt(this)}static getStubConfig(){return{}}static getConfigElement(){return document.createElement(`family-tree-on-this-day-card-editor`)}setConfig(e){this._config={...e}}getCardSize(){return 2}disconnectedCallback(){super.disconnectedCallback(),this._personDialog.disconnected()}updated(){this._personDialog.ensureOpen()}render(){let e=Ve(this.hass,this._config.entity,`on_this_day`),t=this._config.title||F(this.hass,`on_this_day_title`);if(!e)return w`<ha-card header=${t}>
        <div class="pad muted">${F(this.hass,`missing_entity`)}</div>
        ${this._personDialog.render()}
      </ha-card>`;let n=Ge(e.attributes);return w`<ha-card header=${t}>
      ${n.length?w`<ul class="list">
            ${n.map(e=>{let t=Je(this.hass,e),n=e.person_id;return w`<li>
                <span class="kind ${qe(e.kind)}"
                  >${Ke(this.hass,e.kind)}</span
                >
                ${n?w`<button
                      type="button"
                      class="linkish name"
                      @click=${()=>this._personDialog.open(n)}
                    >
                      ${e.label}
                    </button>`:w`<span class="name">${e.label}</span>`}
                ${t?w`<span class="meta muted">${t}</span>`:E}
              </li>`})}
          </ul>`:w`<div class="pad muted">${F(this.hass,`empty_on_this_day`)}</div>`}
      ${this._personDialog.render()}
    </ha-card>`}static{this.styles=It}};z([N({attribute:!1})],X.prototype,`hass`,void 0),z([P()],X.prototype,`_config`,void 0),X=z([M(`family-tree-on-this-day-card`)],X);var Z=class extends j{constructor(...e){super(...e),this._config={}}setConfig(e){this._config={...e}}_fire(){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return w`<family-tree-card-editor-form
      .hass=${this.hass}
      .config=${this._config}
      sensorSuffix="on_this_day"
      @config-changed=${e=>{this._config={...e.detail.config},this._fire()}}
    ></family-tree-card-editor-form>`}};z([N({attribute:!1})],Z.prototype,`hass`,void 0),z([P()],Z.prototype,`_config`,void 0),Z=z([M(`family-tree-on-this-day-card-editor`)],Z),I({type:`family-tree-on-this-day-card`,name:`Family Tree On This Day`,description:`Historic births, baptisms, marriages, and deaths for today`});function Lt(e){return e?typeof e.name==`string`&&e.name?e.name:typeof e.display_name==`string`&&e.display_name?e.display_name:[e.given_names,e.surname_prefix,e.surname].map(e=>typeof e==`string`?e.trim():``).filter(Boolean).join(` `)||`Unknown`:`Unknown`}function Rt(e){return{id:String(e.id||``),name:Lt(e),sex:typeof e.sex==`string`?e.sex:void 0,is_living:!!e.is_living,profile_media_id:typeof e.profile_media_id==`string`?e.profile_media_id:null}}function zt(e){return(e||[]).map(Rt)}function Bt(e){return(e||[]).map(Rt)}function Vt(e){let t=[],n=new Set;for(let r of e||[]){let e=r.partners||[];for(let r of e){let e=Rt(r);if(e.id){if(n.has(e.id))continue;n.add(e.id)}t.push(e)}}return t}var Ht=110,Ut=12;function Wt(e){if(e<2)return``;let t=e*Ht+(e-1)*Ut,n=Ht/2/t*100;return`--tree-bus-left:${n}%;--tree-bus-right:${n}%`}var Q=class extends j{constructor(...e){super(...e),this._config={},this._tree=null,this._error=``,this._loading=!1,this._loadedFor=``,this._resolvedPersonId=void 0,this._loadGen=0,this._personDialog=new Pt(this)}static getStubConfig(){return{use_linked_user:!0}}static getConfigElement(){return document.createElement(`family-tree-mini-tree-card-editor`)}setConfig(e){this._config={...e},this._loadedFor=``,this._tree=null,this._resolvedPersonId=void 0,this._error=``}getCardSize(){return 4}disconnectedCallback(){super.disconnectedCallback(),this._personDialog.disconnected()}firstUpdated(){this._maybeLoad()}updated(e){e.has(`_config`)&&this._maybeLoad(),this._personDialog.ensureOpen()}async _resolvePersonId(){if(this._config.person_id?.trim())return this._config.person_id.trim();if(this._config.use_linked_user===!1)return null;if(this._resolvedPersonId!==void 0)return this._resolvedPersonId;try{let e=await $e(this.hass);this._resolvedPersonId=e.person_id||null}catch{this._resolvedPersonId=null}return this._resolvedPersonId}async _maybeLoad(){if(!this.hass)return;let e=++this._loadGen,t=await this._resolvePersonId();if(e===this._loadGen){if(!t)this._tree=null,this._error=``,this._loadedFor=``;else if(!(t===this._loadedFor&&this._tree)){this._loading=!0,this._error=``;try{let n=await Qe(this.hass,t);if(e!==this._loadGen)return;this._tree=n,this._loadedFor=t}catch(t){if(e!==this._loadGen)return;this._tree=null,this._error=t instanceof Error?t.message:F(this.hass,`error`),this._loadedFor=``}finally{e===this._loadGen&&(this._loading=!1)}}}}_cardWrap(e,t={}){let n=t.size??`sm`,r=St({id:e.id,given_names:e.name,call_name:``,surname_prefix:``,surname:``,sex:e.sex||`unknown`,is_living:!!e.is_living,notes:``,display_name:e.name,profile_media_id:e.profile_media_id??void 0},{size:n,hass:this.hass,deceasedOverlay:!0,isLiving:!!e.is_living,profileMediaId:e.profile_media_id,title:e.name}),i=[`tree-card-wrap`,t.stemDown?`tree-card-wrap--stem-down`:``].filter(Boolean).join(` `),a=[`node`,t.focus?`node--focus`:``].filter(Boolean).join(` `);return e.id?w`<div class=${i}>
      <button
        type="button"
        class=${a}
        @click=${()=>this._personDialog.open(e.id)}
      >
        ${r}
        <span class="node-name">${e.name}</span>
      </button>
    </div>`:w`<div class=${i}>
        <div class=${a}>
          ${r}
          <span class="node-name">${e.name}</span>
        </div>
      </div>`}render(){let e=this._config.title||F(this.hass,`mini_tree_title`);if(this._loading&&!this._tree)return w`<ha-card header=${e}>
        <div class="pad muted">${F(this.hass,`loading`)}</div>
        ${this._personDialog.render()}
      </ha-card>`;if(this._error)return w`<ha-card header=${e}>
        <div class="pad muted">${this._error}</div>
        ${this._personDialog.render()}
      </ha-card>`;if(!this._tree)return w`<ha-card header=${e}>
        <div class="pad muted">${F(this.hass,`empty_tree`)}</div>
        ${this._personDialog.render()}
      </ha-card>`;let t=this._tree.person,n={id:String(t.id||this._loadedFor),name:Lt(t),sex:typeof t.sex==`string`?t.sex:void 0,is_living:!!t.is_living,profile_media_id:typeof t.profile_media_id==`string`?t.profile_media_id:null},r=zt(this._tree.parents),i=Vt(this._tree.partners),a=Bt(this._tree.children),o=r.length>0,s=i.length>0,c=a.length>0,l=s||c,u=c,d=Wt(r.length),ee=Wt(a.length);return w`<ha-card header=${e}>
      <div class="tree">
        ${o?w`<div
              class="tree-row tree-row--parents ${r.length>=2?`tree-row--bus`:``}"
              style=${d}
            >
              <div class="tree-group">
                ${r.map(e=>this._cardWrap(e,{stemDown:!0}))}
              </div>
            </div>`:E}

        <div
          class="tree-row tree-row--focus ${o?`tree-row--stem-up`:``}"
        >
          ${this._cardWrap(n,{focus:!0,size:`md`,stemDown:l})}
        </div>

        ${s?w`<div
              class="tree-row tree-row--partner tree-row--stem-up"
            >
              ${i.map(e=>this._cardWrap(e,{size:`md`,stemDown:u}))}
            </div>`:E}

        ${c?w`<div
              class="tree-row tree-row--children ${a.length>=2?`tree-row--bus`:``} tree-row--stem-up"
              style=${ee}
            >
              <div class="tree-group">
                ${a.map(e=>this._cardWrap(e))}
              </div>
            </div>`:E}
      </div>
      ${this._personDialog.render()}
    </ha-card>`}static{this.styles=[Ct,Ft,o`
      .pad {
        padding: 12px 16px 16px;
      }
      .muted {
        color: var(--secondary-text-color);
      }
      .tree {
        --tree-card-width: 110px;
        --tree-gap: 12px;
        --tree-connector: 0.9rem;
        --tree-row-gap: 24px;
        --tree-line-color: var(--divider-color, rgba(0, 0, 0, 0.18));
        padding: 12px 16px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
      }
      .tree-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
        gap: var(--tree-gap);
        width: 100%;
        position: relative;
        padding-bottom: var(--tree-row-gap);
      }
      .tree-row--partner {
        padding-bottom: calc(var(--tree-row-gap) / 2);
      }
      .tree-row--children {
        padding-bottom: 0;
        padding-top: calc(var(--tree-connector) + 2px);
      }
      .tree-group {
        display: flex;
        justify-content: center;
        align-items: stretch;
        flex-wrap: wrap;
        gap: var(--tree-gap);
        width: fit-content;
        max-width: 100%;
        margin-inline: auto;
        position: relative;
      }
      .tree-row--bus .tree-group::before {
        content: "";
        position: absolute;
        top: 100%;
        left: var(--tree-bus-left, 12.5%);
        right: var(--tree-bus-right, 12.5%);
        border-top: 2px solid var(--tree-line-color);
        z-index: 0;
        pointer-events: none;
      }
      .tree-row--parents.tree-row--bus .tree-group::before {
        top: auto;
        bottom: calc(-1 * var(--tree-connector) + 0.15rem);
      }
      .tree-row--children.tree-row--bus .tree-group::before {
        top: calc(-1 * var(--tree-connector));
      }
      .tree-row--stem-up::before {
        content: "";
        position: absolute;
        top: calc(-1 * var(--tree-connector));
        left: 50%;
        margin-left: -1px;
        width: 0;
        height: var(--tree-connector);
        border-left: 2px solid var(--tree-line-color);
        z-index: 0;
        pointer-events: none;
      }
      .tree-row--children.tree-row--stem-up::before {
        /* Per-child stems handle single-child; multi uses bus + per-card stems */
        display: none;
      }
      .tree-row--children:not(.tree-row--bus)::before {
        display: block;
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -1px;
        width: 0;
        height: var(--tree-connector);
        border-left: 2px solid var(--tree-line-color);
        z-index: 0;
        pointer-events: none;
      }
      .tree-card-wrap {
        position: relative;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: var(--tree-card-width);
        min-width: var(--tree-card-width);
        max-width: var(--tree-card-width);
        flex: 0 0 var(--tree-card-width);
        z-index: 1;
      }
      .tree-card-wrap--stem-down::after {
        content: "";
        position: absolute;
        bottom: calc(-1 * var(--tree-connector));
        left: 50%;
        margin-left: -1px;
        width: 0;
        height: var(--tree-connector);
        border-left: 2px solid var(--tree-line-color);
        z-index: 0;
        pointer-events: none;
      }
      .tree-row--children .tree-card-wrap::before {
        content: "";
        position: absolute;
        top: calc(-1 * var(--tree-connector));
        left: 50%;
        margin-left: -1px;
        width: 0;
        height: var(--tree-connector);
        border-left: 2px solid var(--tree-line-color);
        z-index: 0;
        pointer-events: none;
      }
      .tree-row--children:not(.tree-row--bus) .tree-card-wrap::before {
        display: none;
      }
      .node {
        appearance: none;
        box-sizing: border-box;
        width: 100%;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--card-background-color, var(--secondary-background-color, #fff));
        padding: 10px 8px;
        border-radius: var(--ha-border-radius-lg, 12px);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        color: inherit;
        font: inherit;
        flex: 1;
        min-height: 0;
      }
      .node:hover,
      .node:focus-visible {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        outline: none;
      }
      .node--focus {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
        box-shadow: inset 0 0 0 1px var(--primary-color, rgba(3, 169, 244, 0.35));
        border-color: var(--primary-color, var(--divider-color));
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
        font-size: 0.85rem;
        font-weight: 600;
      }
    `]}};z([N({attribute:!1})],Q.prototype,`hass`,void 0),z([P()],Q.prototype,`_config`,void 0),z([P()],Q.prototype,`_tree`,void 0),z([P()],Q.prototype,`_error`,void 0),z([P()],Q.prototype,`_loading`,void 0),Q=z([M(`family-tree-mini-tree-card`)],Q);var $=class extends j{constructor(...e){super(...e),this._config={use_linked_user:!0}}setConfig(e){this._config={use_linked_user:!0,...e}}_fire(){this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return w`<family-tree-card-editor-form
      .hass=${this.hass}
      .config=${this._config}
      .showPersonPicker=${!0}
      .showLinkedUser=${!0}
      @config-changed=${e=>{this._config={use_linked_user:!0,...e.detail.config},this._fire()}}
    ></family-tree-card-editor-form>`}};z([N({attribute:!1})],$.prototype,`hass`,void 0),z([P()],$.prototype,`_config`,void 0),$=z([M(`family-tree-mini-tree-card-editor`)],$),I({type:`family-tree-mini-tree-card`,name:`Family Tree Mini Tree`,description:`Compact parents, partners, and children for a person`});
//# sourceMappingURL=family-tree-cards.js.map