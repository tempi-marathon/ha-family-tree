function e(e){return e+.5|0}var t=(e,t,n)=>Math.max(Math.min(e,n),t);function n(n){return t(e(n*2.55),0,255)}function r(n){return t(e(n*255),0,255)}function i(n){return t(e(n/2.55)/100,0,1)}function a(n){return t(e(n*100),0,100)}var o={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},s=[...`0123456789ABCDEF`],c=e=>s[e&15],l=e=>s[(e&240)>>4]+s[e&15],u=e=>(e&240)>>4==(e&15),d=e=>u(e.r)&&u(e.g)&&u(e.b)&&u(e.a);function f(e){var t=e.length,n;return e[0]===`#`&&(t===4||t===5?n={r:255&o[e[1]]*17,g:255&o[e[2]]*17,b:255&o[e[3]]*17,a:t===5?o[e[4]]*17:255}:(t===7||t===9)&&(n={r:o[e[1]]<<4|o[e[2]],g:o[e[3]]<<4|o[e[4]],b:o[e[5]]<<4|o[e[6]],a:t===9?o[e[7]]<<4|o[e[8]]:255})),n}var p=(e,t)=>e<255?t(e):``;function m(e){var t=d(e)?c:l;return e?`#`+t(e.r)+t(e.g)+t(e.b)+p(e.a,t):void 0}var h=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function g(e,t,n){let r=t*Math.min(n,1-n),i=(t,i=(t+e/30)%12)=>n-r*Math.max(Math.min(i-3,9-i,1),-1);return[i(0),i(8),i(4)]}function _(e,t,n){let r=(r,i=(r+e/60)%6)=>n-n*t*Math.max(Math.min(i,4-i,1),0);return[r(5),r(3),r(1)]}function v(e,t,n){let r=g(e,1,.5),i;for(t+n>1&&(i=1/(t+n),t*=i,n*=i),i=0;i<3;i++)r[i]*=1-t-n,r[i]+=t;return r}function y(e,t,n,r,i){return e===i?(t-n)/r+(t<n?6:0):t===i?(n-e)/r+2:(e-t)/r+4}function b(e){let t=e.r/255,n=e.g/255,r=e.b/255,i=Math.max(t,n,r),a=Math.min(t,n,r),o=(i+a)/2,s,c,l;return i!==a&&(l=i-a,c=o>.5?l/(2-i-a):l/(i+a),s=y(t,n,r,l,i),s=s*60+.5),[s|0,c||0,o]}function x(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(r)}function S(e,t,n){return x(g,e,t,n)}function C(e,t,n){return x(v,e,t,n)}function w(e,t,n){return x(_,e,t,n)}function T(e){return(e%360+360)%360}function E(e){let t=h.exec(e),i=255,a;if(!t)return;t[5]!==a&&(i=t[6]?n(+t[5]):r(+t[5]));let o=T(+t[2]),s=t[3]/100,c=t[4]/100;return a=t[1]===`hwb`?C(o,s,c):t[1]===`hsv`?w(o,s,c):S(o,s,c),{r:a[0],g:a[1],b:a[2],a:i}}function D(e,t){var n=b(e);n[0]=T(n[0]+t),n=S(n),e.r=n[0],e.g=n[1],e.b=n[2]}function ee(e){if(!e)return;let t=b(e),n=t[0],r=a(t[1]),o=a(t[2]);return e.a<255?`hsla(${n}, ${r}%, ${o}%, ${i(e.a)})`:`hsl(${n}, ${r}%, ${o}%)`}var te={x:`dark`,Z:`light`,Y:`re`,X:`blu`,W:`gr`,V:`medium`,U:`slate`,A:`ee`,T:`ol`,S:`or`,B:`ra`,C:`lateg`,D:`ights`,R:`in`,Q:`turquois`,E:`hi`,P:`ro`,O:`al`,N:`le`,M:`de`,L:`yello`,F:`en`,K:`ch`,G:`arks`,H:`ea`,I:`ightg`,J:`wh`},ne={OiceXe:`f0f8ff`,antiquewEte:`faebd7`,aqua:`ffff`,aquamarRe:`7fffd4`,azuY:`f0ffff`,beige:`f5f5dc`,bisque:`ffe4c4`,black:`0`,blanKedOmond:`ffebcd`,Xe:`ff`,XeviTet:`8a2be2`,bPwn:`a52a2a`,burlywood:`deb887`,caMtXe:`5f9ea0`,KartYuse:`7fff00`,KocTate:`d2691e`,cSO:`ff7f50`,cSnflowerXe:`6495ed`,cSnsilk:`fff8dc`,crimson:`dc143c`,cyan:`ffff`,xXe:`8b`,xcyan:`8b8b`,xgTMnPd:`b8860b`,xWay:`a9a9a9`,xgYF:`6400`,xgYy:`a9a9a9`,xkhaki:`bdb76b`,xmagFta:`8b008b`,xTivegYF:`556b2f`,xSange:`ff8c00`,xScEd:`9932cc`,xYd:`8b0000`,xsOmon:`e9967a`,xsHgYF:`8fbc8f`,xUXe:`483d8b`,xUWay:`2f4f4f`,xUgYy:`2f4f4f`,xQe:`ced1`,xviTet:`9400d3`,dAppRk:`ff1493`,dApskyXe:`bfff`,dimWay:`696969`,dimgYy:`696969`,dodgerXe:`1e90ff`,fiYbrick:`b22222`,flSOwEte:`fffaf0`,foYstWAn:`228b22`,fuKsia:`ff00ff`,gaRsbSo:`dcdcdc`,ghostwEte:`f8f8ff`,gTd:`ffd700`,gTMnPd:`daa520`,Way:`808080`,gYF:`8000`,gYFLw:`adff2f`,gYy:`808080`,honeyMw:`f0fff0`,hotpRk:`ff69b4`,RdianYd:`cd5c5c`,Rdigo:`4b0082`,ivSy:`fffff0`,khaki:`f0e68c`,lavFMr:`e6e6fa`,lavFMrXsh:`fff0f5`,lawngYF:`7cfc00`,NmoncEffon:`fffacd`,ZXe:`add8e6`,ZcSO:`f08080`,Zcyan:`e0ffff`,ZgTMnPdLw:`fafad2`,ZWay:`d3d3d3`,ZgYF:`90ee90`,ZgYy:`d3d3d3`,ZpRk:`ffb6c1`,ZsOmon:`ffa07a`,ZsHgYF:`20b2aa`,ZskyXe:`87cefa`,ZUWay:`778899`,ZUgYy:`778899`,ZstAlXe:`b0c4de`,ZLw:`ffffe0`,lime:`ff00`,limegYF:`32cd32`,lRF:`faf0e6`,magFta:`ff00ff`,maPon:`800000`,VaquamarRe:`66cdaa`,VXe:`cd`,VScEd:`ba55d3`,VpurpN:`9370db`,VsHgYF:`3cb371`,VUXe:`7b68ee`,VsprRggYF:`fa9a`,VQe:`48d1cc`,VviTetYd:`c71585`,midnightXe:`191970`,mRtcYam:`f5fffa`,mistyPse:`ffe4e1`,moccasR:`ffe4b5`,navajowEte:`ffdead`,navy:`80`,Tdlace:`fdf5e6`,Tive:`808000`,TivedBb:`6b8e23`,Sange:`ffa500`,SangeYd:`ff4500`,ScEd:`da70d6`,pOegTMnPd:`eee8aa`,pOegYF:`98fb98`,pOeQe:`afeeee`,pOeviTetYd:`db7093`,papayawEp:`ffefd5`,pHKpuff:`ffdab9`,peru:`cd853f`,pRk:`ffc0cb`,plum:`dda0dd`,powMrXe:`b0e0e6`,purpN:`800080`,YbeccapurpN:`663399`,Yd:`ff0000`,Psybrown:`bc8f8f`,PyOXe:`4169e1`,saddNbPwn:`8b4513`,sOmon:`fa8072`,sandybPwn:`f4a460`,sHgYF:`2e8b57`,sHshell:`fff5ee`,siFna:`a0522d`,silver:`c0c0c0`,skyXe:`87ceeb`,UXe:`6a5acd`,UWay:`708090`,UgYy:`708090`,snow:`fffafa`,sprRggYF:`ff7f`,stAlXe:`4682b4`,tan:`d2b48c`,teO:`8080`,tEstN:`d8bfd8`,tomato:`ff6347`,Qe:`40e0d0`,viTet:`ee82ee`,JHt:`f5deb3`,wEte:`ffffff`,wEtesmoke:`f5f5f5`,Lw:`ffff00`,LwgYF:`9acd32`};function re(){let e={},t=Object.keys(ne),n=Object.keys(te),r,i,a,o,s;for(r=0;r<t.length;r++){for(o=s=t[r],i=0;i<n.length;i++)a=n[i],s=s.replace(a,te[a]);a=parseInt(ne[o],16),e[s]=[a>>16&255,a>>8&255,a&255]}return e}var ie;function ae(e){ie||(ie=re(),ie.transparent=[0,0,0,0]);let t=ie[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}var oe=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function se(e){let r=oe.exec(e),i=255,a,o,s;if(r){if(r[7]!==a){let e=+r[7];i=r[8]?n(e):t(e*255,0,255)}return a=+r[1],o=+r[3],s=+r[5],a=255&(r[2]?n(a):t(a,0,255)),o=255&(r[4]?n(o):t(o,0,255)),s=255&(r[6]?n(s):t(s,0,255)),{r:a,g:o,b:s,a:i}}}function ce(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${i(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}var le=e=>e<=.0031308?e*12.92:e**(1/2.4)*1.055-.055,ue=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4;function de(e,t,n){let a=ue(i(e.r)),o=ue(i(e.g)),s=ue(i(e.b));return{r:r(le(a+n*(ue(i(t.r))-a))),g:r(le(o+n*(ue(i(t.g))-o))),b:r(le(s+n*(ue(i(t.b))-s))),a:e.a+n*(t.a-e.a)}}function fe(e,t,n){if(e){let r=b(e);r[t]=Math.max(0,Math.min(r[t]+r[t]*n,t===0?360:1)),r=S(r),e.r=r[0],e.g=r[1],e.b=r[2]}}function pe(e,t){return e&&Object.assign(t||{},e)}function me(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=r(e[3]))):(t=pe(e,{r:0,g:0,b:0,a:1}),t.a=r(t.a)),t}function he(e){return e.charAt(0)===`r`?se(e):E(e)}var ge=class t{constructor(e){if(e instanceof t)return e;let n=typeof e,r;n===`object`?r=me(e):n===`string`&&(r=f(e)||ae(e)||he(e)),this._rgb=r,this._valid=!!r}get valid(){return this._valid}get rgb(){var e=pe(this._rgb);return e&&(e.a=i(e.a)),e}set rgb(e){this._rgb=me(e)}rgbString(){return this._valid?ce(this._rgb):void 0}hexString(){return this._valid?m(this._rgb):void 0}hslString(){return this._valid?ee(this._rgb):void 0}mix(e,t){if(e){let n=this.rgb,r=e.rgb,i,a=t===i?.5:t,o=2*a-1,s=n.a-r.a,c=((o*s===-1?o:(o+s)/(1+o*s))+1)/2;i=1-c,n.r=255&c*n.r+i*r.r+.5,n.g=255&c*n.g+i*r.g+.5,n.b=255&c*n.b+i*r.b+.5,n.a=a*n.a+(1-a)*r.a,this.rgb=n}return this}interpolate(e,t){return e&&(this._rgb=de(this._rgb,e._rgb,t)),this}clone(){return new t(this.rgb)}alpha(e){return this._rgb.a=r(e),this}clearer(e){let t=this._rgb;return t.a*=1-e,this}greyscale(){let t=this._rgb;return t.r=t.g=t.b=e(t.r*.3+t.g*.59+t.b*.11),this}opaquer(e){let t=this._rgb;return t.a*=1+e,this}negate(){let e=this._rgb;return e.r=255-e.r,e.g=255-e.g,e.b=255-e.b,this}lighten(e){return fe(this._rgb,2,e),this}darken(e){return fe(this._rgb,2,-e),this}saturate(e){return fe(this._rgb,1,e),this}desaturate(e){return fe(this._rgb,1,-e),this}rotate(e){return D(this._rgb,e),this}};function _e(){}var ve=(()=>{let e=0;return()=>e++})();function O(e){return e==null}function k(e){if(Array.isArray&&Array.isArray(e))return!0;let t=Object.prototype.toString.call(e);return t.slice(0,7)===`[object`&&t.slice(-6)===`Array]`}function A(e){return e!==null&&Object.prototype.toString.call(e)===`[object Object]`}function j(e){return(typeof e==`number`||e instanceof Number)&&isFinite(+e)}function ye(e,t){return j(e)?e:t}function M(e,t){return e===void 0?t:e}var be=(e,t)=>typeof e==`string`&&e.endsWith(`%`)?parseFloat(e)/100:+e/t,xe=(e,t)=>typeof e==`string`&&e.endsWith(`%`)?parseFloat(e)/100*t:+e;function N(e,t,n){if(e&&typeof e.call==`function`)return e.apply(n,t)}function P(e,t,n,r){let i,a,o;if(k(e)){if(a=e.length,r)for(i=a-1;i>=0;i--)t.call(n,e[i],i);else for(i=0;i<a;i++)t.call(n,e[i],i)}else if(A(e))for(o=Object.keys(e),a=o.length,i=0;i<a;i++)t.call(n,e[o[i]],o[i])}function Se(e,t){let n,r,i,a;if(!e||!t||e.length!==t.length)return!1;for(n=0,r=e.length;n<r;++n)if(i=e[n],a=t[n],i.datasetIndex!==a.datasetIndex||i.index!==a.index)return!1;return!0}function Ce(e){if(k(e))return e.map(Ce);if(A(e)){let t=Object.create(null),n=Object.keys(e),r=n.length,i=0;for(;i<r;++i)t[n[i]]=Ce(e[n[i]]);return t}return e}function we(e){return[`__proto__`,`prototype`,`constructor`].indexOf(e)===-1}function Te(e,t,n,r){if(!we(e))return;let i=t[e],a=n[e];A(i)&&A(a)?Ee(i,a,r):t[e]=Ce(a)}function Ee(e,t,n){let r=k(t)?t:[t],i=r.length;if(!A(e))return e;n||={};let a=n.merger||Te,o;for(let t=0;t<i;++t){if(o=r[t],!A(o))continue;let i=Object.keys(o);for(let t=0,r=i.length;t<r;++t)a(i[t],e,o,n)}return e}function De(e,t){return Ee(e,t,{merger:Oe})}function Oe(e,t,n){if(!we(e))return;let r=t[e],i=n[e];A(r)&&A(i)?De(r,i):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=Ce(i))}var ke={"":e=>e,x:e=>e.x,y:e=>e.y};function Ae(e){let t=e.split(`.`),n=[],r=``;for(let e of t)r+=e,r.endsWith(`\\`)?r=r.slice(0,-1)+`.`:(n.push(r),r=``);return n}function je(e){let t=Ae(e);return e=>{for(let n of t){if(n===``)break;e&&=e[n]}return e}}function Me(e,t){return(ke[t]||(ke[t]=je(t)))(e)}function Ne(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Pe=e=>e!==void 0,Fe=e=>typeof e==`function`,Ie=(e,t)=>{if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0};function Le(e){return e.type===`mouseup`||e.type===`click`||e.type===`contextmenu`}var F=Math.PI,I=2*F,Re=I+F,ze=1/0,Be=F/180,L=F/2,Ve=F/4,He=F*2/3,Ue=Math.log10,We=Math.sign;function Ge(e,t,n){return Math.abs(e-t)<n}function Ke(e){let t=Math.round(e);e=Ge(e,t,e/1e3)?t:e;let n=10**Math.floor(Ue(e)),r=e/n;return(r<=1?1:r<=2?2:r<=5?5:10)*n}function qe(e){let t=[],n=Math.sqrt(e),r=1;for(;r<n;r++)e%r===0&&(t.push(r),t.push(e/r));return n===(n|0)&&t.push(n),t.sort((e,t)=>e-t).pop(),t}function Je(e){return typeof e==`symbol`||typeof e==`object`&&!!e&&!(Symbol.toPrimitive in e||`toString`in e||`valueOf`in e)}function Ye(e){return!Je(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function Xe(e,t){let n=Math.round(e);return n-t<=e&&n+t>=e}function Ze(e,t,n){let r,i,a;for(r=0,i=e.length;r<i;r++)a=e[r][n],isNaN(a)||(t.min=Math.min(t.min,a),t.max=Math.max(t.max,a))}function Qe(e){return F/180*e}function $e(e){return 180/F*e}function et(e){if(!j(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function tt(e,t){let n=t.x-e.x,r=t.y-e.y,i=Math.sqrt(n*n+r*r),a=Math.atan2(r,n);return a<-.5*F&&(a+=I),{angle:a,distance:i}}function nt(e,t){return Math.sqrt((t.x-e.x)**2+(t.y-e.y)**2)}function rt(e,t){return(e-t+Re)%I-F}function it(e){return(e%I+I)%I}function at(e,t,n,r){let i=it(e),a=it(t),o=it(n),s=it(a-i),c=it(o-i),l=it(i-a),u=it(i-o);return i===a||i===o||r&&a===o||s>c&&l<u}function R(e,t,n){return Math.max(t,Math.min(n,e))}function ot(e){return R(e,-32768,32767)}function st(e,t,n,r=1e-6){return e>=Math.min(t,n)-r&&e<=Math.max(t,n)+r}function ct(e,t,n){n||=(n=>e[n]<t);let r=e.length-1,i=0,a;for(;r-i>1;)a=i+r>>1,n(a)?i=a:r=a;return{lo:i,hi:r}}var lt=(e,t,n,r)=>ct(e,n,r?r=>{let i=e[r][t];return i<n||i===n&&e[r+1][t]===n}:r=>e[r][t]<n),ut=(e,t,n)=>ct(e,n,r=>e[r][t]>=n);function dt(e,t,n){let r=0,i=e.length;for(;r<i&&e[r]<t;)r++;for(;i>r&&e[i-1]>n;)i--;return r>0||i<e.length?e.slice(r,i):e}var ft=[`push`,`pop`,`shift`,`splice`,`unshift`];function pt(e,t){e._chartjs?e._chartjs.listeners.push(t):(Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),ft.forEach(t=>{let n=`_onData`+Ne(t),r=e[t];Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value(...t){let i=r.apply(this,t);return e._chartjs.listeners.forEach(e=>{typeof e[n]==`function`&&e[n](...t)}),i}})}))}function mt(e,t){let n=e._chartjs;if(!n)return;let r=n.listeners,i=r.indexOf(t);i!==-1&&r.splice(i,1),!(r.length>0)&&(ft.forEach(t=>{delete e[t]}),delete e._chartjs)}function ht(e){let t=new Set(e);return t.size===e.length?e:Array.from(t)}var gt=function(){return typeof window>`u`?function(e){return e()}:window.requestAnimationFrame}();function _t(e,t){let n=[],r=!1;return function(...i){n=i,r||(r=!0,gt.call(window,()=>{r=!1,e.apply(t,n)}))}}function vt(e,t){let n;return function(...r){return t?(clearTimeout(n),n=setTimeout(e,t,r)):e.apply(this,r),t}}var yt=e=>e===`start`?`left`:e===`end`?`right`:`center`,z=(e,t,n)=>e===`start`?t:e===`end`?n:(t+n)/2,bt=(e,t,n,r)=>e===(r?`left`:`right`)?n:e===`center`?(t+n)/2:t;function xt(e,t,n){let r=t.length,i=0,a=r;if(e._sorted){let{iScale:o,vScale:s,_parsed:c}=e,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,u=o.axis,{min:d,max:f,minDefined:p,maxDefined:m}=o.getUserBounds();if(p){if(i=Math.min(lt(c,u,d).lo,n?r:lt(t,u,o.getPixelForValue(d)).lo),l){let e=c.slice(0,i+1).reverse().findIndex(e=>!O(e[s.axis]));i-=Math.max(0,e)}i=R(i,0,r-1)}if(m){let e=Math.max(lt(c,o.axis,f,!0).hi+1,n?0:lt(t,u,o.getPixelForValue(f),!0).hi+1);if(l){let t=c.slice(e-1).findIndex(e=>!O(e[s.axis]));e+=Math.max(0,t)}a=R(e,i,r)-i}else a=r-i}return{start:i,count:a}}function St(e){let{xScale:t,yScale:n,_scaleRanges:r}=e,i={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!r)return e._scaleRanges=i,!0;let a=r.xmin!==t.min||r.xmax!==t.max||r.ymin!==n.min||r.ymax!==n.max;return Object.assign(r,i),a}var Ct=e=>e===0||e===1,wt=(e,t,n)=>-(2**(10*--e)*Math.sin((e-t)*I/n)),Tt=(e,t,n)=>2**(-10*e)*Math.sin((e-t)*I/n)+1,Et={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>--e*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-(--e*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>--e*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*L)+1,easeOutSine:e=>Math.sin(e*L),easeInOutSine:e=>-.5*(Math.cos(F*e)-1),easeInExpo:e=>e===0?0:2**(10*(e-1)),easeOutExpo:e=>e===1?1:-(2**(-10*e))+1,easeInOutExpo:e=>Ct(e)?e:e<.5?.5*2**(10*(e*2-1)):.5*(-(2**(-10*(e*2-1)))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1- --e*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>Ct(e)?e:wt(e,.075,.3),easeOutElastic:e=>Ct(e)?e:Tt(e,.075,.3),easeInOutElastic(e){let t=.1125,n=.45;return Ct(e)?e:e<.5?.5*wt(e*2,t,n):.5+.5*Tt(e*2-1,t,n)},easeInBack(e){return e*e*(2.70158*e-1.70158)},easeOutBack(e){return--e*e*(2.70158*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-Et.easeOutBounce(1-e),easeOutBounce(e){let t=7.5625,n=2.75;return e<1/n?t*e*e:e<2/n?t*(e-=1.5/n)*e+.75:e<2.5/n?t*(e-=2.25/n)*e+.9375:t*(e-=2.625/n)*e+.984375},easeInOutBounce:e=>e<.5?Et.easeInBounce(e*2)*.5:Et.easeOutBounce(e*2-1)*.5+.5};function Dt(e){if(e&&typeof e==`object`){let t=e.toString();return t===`[object CanvasPattern]`||t===`[object CanvasGradient]`}return!1}function Ot(e){return Dt(e)?e:new ge(e)}function kt(e){return Dt(e)?e:new ge(e).saturate(.5).darken(.1).hexString()}var At=[`x`,`y`,`borderWidth`,`radius`,`tension`],jt=[`color`,`borderColor`,`backgroundColor`];function Mt(e){e.set(`animation`,{delay:void 0,duration:1e3,easing:`easeOutQuart`,fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe(`animation`,{_fallback:!1,_indexable:!1,_scriptable:e=>e!==`onProgress`&&e!==`onComplete`&&e!==`fn`}),e.set(`animations`,{colors:{type:`color`,properties:jt},numbers:{type:`number`,properties:At}}),e.describe(`animations`,{_fallback:`animation`}),e.set(`transitions`,{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:`transparent`},visible:{type:`boolean`,duration:0}}},hide:{animations:{colors:{to:`transparent`},visible:{type:`boolean`,easing:`linear`,fn:e=>e|0}}}})}function Nt(e){e.set(`layout`,{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}var Pt=new Map;function Ft(e,t){t||={};let n=e+JSON.stringify(t),r=Pt.get(n);return r||(r=new Intl.NumberFormat(e,t),Pt.set(n,r)),r}function It(e,t,n){return Ft(t,n).format(e)}var Lt={values(e){return k(e)?e:``+e},numeric(e,t,n){if(e===0)return`0`;let r=this.chart.options.locale,i,a=e;if(n.length>1){let t=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(t<1e-4||t>0x38d7ea4c68000)&&(i=`scientific`),a=Rt(e,n)}let o=Ue(Math.abs(a)),s=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),c={notation:i,minimumFractionDigits:s,maximumFractionDigits:s};return Object.assign(c,this.options.ticks.format),It(e,r,c)},logarithmic(e,t,n){if(e===0)return`0`;let r=n[t].significand||e/10**Math.floor(Ue(e));return[1,2,3,5,10,15].includes(r)||t>.8*n.length?Lt.numeric.call(this,e,t,n):``}};function Rt(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var zt={formatters:Lt};function Bt(e){e.set(`scale`,{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:`ticks`,clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(e,t)=>t.lineWidth,tickColor:(e,t)=>t.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:``,padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:``,padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:zt.formatters.values,minor:{},major:{},align:`center`,crossAlign:`near`,showLabelBackdrop:!1,backdropColor:`rgba(255, 255, 255, 0.75)`,backdropPadding:2}}),e.route(`scale.ticks`,`color`,``,`color`),e.route(`scale.grid`,`color`,``,`borderColor`),e.route(`scale.border`,`color`,``,`borderColor`),e.route(`scale.title`,`color`,``,`color`),e.describe(`scale`,{_fallback:!1,_scriptable:e=>!e.startsWith(`before`)&&!e.startsWith(`after`)&&e!==`callback`&&e!==`parser`,_indexable:e=>e!==`borderDash`&&e!==`tickBorderDash`&&e!==`dash`}),e.describe(`scales`,{_fallback:`scale`}),e.describe(`scale.ticks`,{_scriptable:e=>e!==`backdropPadding`&&e!==`callback`,_indexable:e=>e!==`backdropPadding`})}var Vt=Object.create(null),Ht=Object.create(null);function Ut(e,t){if(!t)return e;let n=t.split(`.`);for(let t=0,r=n.length;t<r;++t){let r=n[t];e=e[r]||(e[r]=Object.create(null))}return e}function Wt(e,t,n){return typeof t==`string`?Ee(Ut(e,t),n):Ee(Ut(e,``),t)}var B=new class{constructor(e,t){this.animation=void 0,this.backgroundColor=`rgba(0,0,0,0.1)`,this.borderColor=`rgba(0,0,0,0.1)`,this.color=`#666`,this.datasets={},this.devicePixelRatio=e=>e.chart.platform.getDevicePixelRatio(),this.elements={},this.events=[`mousemove`,`mouseout`,`click`,`touchstart`,`touchmove`],this.font={family:`'Helvetica Neue', 'Helvetica', 'Arial', sans-serif`,size:12,style:`normal`,lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(e,t)=>kt(t.backgroundColor),this.hoverBorderColor=(e,t)=>kt(t.borderColor),this.hoverColor=(e,t)=>kt(t.color),this.indexAxis=`x`,this.interaction={mode:`nearest`,intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(e),this.apply(t)}set(e,t){return Wt(this,e,t)}get(e){return Ut(this,e)}describe(e,t){return Wt(Ht,e,t)}override(e,t){return Wt(Vt,e,t)}route(e,t,n,r){let i=Ut(this,e),a=Ut(this,n),o=`_`+t;Object.defineProperties(i,{[o]:{value:i[t],writable:!0},[t]:{enumerable:!0,get(){let e=this[o],t=a[r];return A(e)?Object.assign({},t,e):M(e,t)},set(e){this[o]=e}}})}apply(e){e.forEach(e=>e(this))}}({_scriptable:e=>!e.startsWith(`on`),_indexable:e=>e!==`events`,hover:{_fallback:`interaction`},interaction:{_scriptable:!1,_indexable:!1}},[Mt,Nt,Bt]);function Gt(e){return!e||O(e.size)||O(e.family)?null:(e.style?e.style+` `:``)+(e.weight?e.weight+` `:``)+e.size+`px `+e.family}function Kt(e,t,n,r,i){let a=t[i];return a||(a=t[i]=e.measureText(i).width,n.push(i)),a>r&&(r=a),r}function qt(e,t,n,r){r||={};let i=r.data=r.data||{},a=r.garbageCollect=r.garbageCollect||[];r.font!==t&&(i=r.data={},a=r.garbageCollect=[],r.font=t),e.save(),e.font=t;let o=0,s=n.length,c,l,u,d,f;for(c=0;c<s;c++)if(d=n[c],d!=null&&!k(d))o=Kt(e,i,a,o,d);else if(k(d))for(l=0,u=d.length;l<u;l++)f=d[l],f!=null&&!k(f)&&(o=Kt(e,i,a,o,f));e.restore();let p=a.length/2;if(p>n.length){for(c=0;c<p;c++)delete i[a[c]];a.splice(0,p)}return o}function Jt(e,t,n){let r=e.currentDevicePixelRatio,i=n===0?0:Math.max(n/2,.5);return Math.round((t-i)*r)/r+i}function Yt(e,t){(t||e)&&(t||=e.getContext(`2d`),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function Xt(e,t,n,r){Zt(e,t,n,r,null)}function Zt(e,t,n,r,i){let a,o,s,c,l,u,d,f,p=t.pointStyle,m=t.rotation,h=t.radius,g=(m||0)*Be;if(p&&typeof p==`object`&&(a=p.toString(),a===`[object HTMLImageElement]`||a===`[object HTMLCanvasElement]`))e.save(),e.translate(n,r),e.rotate(g),e.drawImage(p,-p.width/2,-p.height/2,p.width,p.height),e.restore();else if(!(isNaN(h)||h<=0)){switch(e.beginPath(),p){default:i?e.ellipse(n,r,i/2,h,0,0,I):e.arc(n,r,h,0,I),e.closePath();break;case`triangle`:u=i?i/2:h,e.moveTo(n+Math.sin(g)*u,r-Math.cos(g)*h),g+=He,e.lineTo(n+Math.sin(g)*u,r-Math.cos(g)*h),g+=He,e.lineTo(n+Math.sin(g)*u,r-Math.cos(g)*h),e.closePath();break;case`rectRounded`:l=h*.516,c=h-l,o=Math.cos(g+Ve)*c,d=Math.cos(g+Ve)*(i?i/2-l:c),s=Math.sin(g+Ve)*c,f=Math.sin(g+Ve)*(i?i/2-l:c),e.arc(n-d,r-s,l,g-F,g-L),e.arc(n+f,r-o,l,g-L,g),e.arc(n+d,r+s,l,g,g+L),e.arc(n-f,r+o,l,g+L,g+F),e.closePath();break;case`rect`:if(!m){c=Math.SQRT1_2*h,u=i?i/2:c,e.rect(n-u,r-c,2*u,2*c);break}g+=Ve;case`rectRot`:d=Math.cos(g)*(i?i/2:h),o=Math.cos(g)*h,s=Math.sin(g)*h,f=Math.sin(g)*(i?i/2:h),e.moveTo(n-d,r-s),e.lineTo(n+f,r-o),e.lineTo(n+d,r+s),e.lineTo(n-f,r+o),e.closePath();break;case`crossRot`:g+=Ve;case`cross`:d=Math.cos(g)*(i?i/2:h),o=Math.cos(g)*h,s=Math.sin(g)*h,f=Math.sin(g)*(i?i/2:h),e.moveTo(n-d,r-s),e.lineTo(n+d,r+s),e.moveTo(n+f,r-o),e.lineTo(n-f,r+o);break;case`star`:d=Math.cos(g)*(i?i/2:h),o=Math.cos(g)*h,s=Math.sin(g)*h,f=Math.sin(g)*(i?i/2:h),e.moveTo(n-d,r-s),e.lineTo(n+d,r+s),e.moveTo(n+f,r-o),e.lineTo(n-f,r+o),g+=Ve,d=Math.cos(g)*(i?i/2:h),o=Math.cos(g)*h,s=Math.sin(g)*h,f=Math.sin(g)*(i?i/2:h),e.moveTo(n-d,r-s),e.lineTo(n+d,r+s),e.moveTo(n+f,r-o),e.lineTo(n-f,r+o);break;case`line`:o=i?i/2:Math.cos(g)*h,s=Math.sin(g)*h,e.moveTo(n-o,r-s),e.lineTo(n+o,r+s);break;case`dash`:e.moveTo(n,r),e.lineTo(n+Math.cos(g)*(i?i/2:h),r+Math.sin(g)*h);break;case!1:e.closePath()}e.fill(),t.borderWidth>0&&e.stroke()}}function Qt(e,t,n){return n||=.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function $t(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function en(e){e.restore()}function tn(e,t,n,r,i){if(!t)return e.lineTo(n.x,n.y);if(i===`middle`){let r=(t.x+n.x)/2;e.lineTo(r,t.y),e.lineTo(r,n.y)}else i===`after`==!!r?e.lineTo(n.x,t.y):e.lineTo(t.x,n.y);e.lineTo(n.x,n.y)}function nn(e,t,n,r){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(r?t.cp1x:t.cp2x,r?t.cp1y:t.cp2y,r?n.cp2x:n.cp1x,r?n.cp2y:n.cp1y,n.x,n.y)}function rn(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),O(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function an(e,t,n,r,i){if(i.strikethrough||i.underline){let a=e.measureText(r),o=t-a.actualBoundingBoxLeft,s=t+a.actualBoundingBoxRight,c=n-a.actualBoundingBoxAscent,l=n+a.actualBoundingBoxDescent,u=i.strikethrough?(c+l)/2:l;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=i.decorationWidth||2,e.moveTo(o,u),e.lineTo(s,u),e.stroke()}}function on(e,t){let n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function sn(e,t,n,r,i,a={}){let o=k(t)?t:[t],s=a.strokeWidth>0&&a.strokeColor!==``,c,l;for(e.save(),e.font=i.string,rn(e,a),c=0;c<o.length;++c)l=o[c],a.backdrop&&on(e,a.backdrop),s&&(a.strokeColor&&(e.strokeStyle=a.strokeColor),O(a.strokeWidth)||(e.lineWidth=a.strokeWidth),e.strokeText(l,n,r,a.maxWidth)),e.fillText(l,n,r,a.maxWidth),an(e,n,r,l,a),r+=Number(i.lineHeight);e.restore()}function cn(e,t){let{x:n,y:r,w:i,h:a,radius:o}=t;e.arc(n+o.topLeft,r+o.topLeft,o.topLeft,1.5*F,F,!0),e.lineTo(n,r+a-o.bottomLeft),e.arc(n+o.bottomLeft,r+a-o.bottomLeft,o.bottomLeft,F,L,!0),e.lineTo(n+i-o.bottomRight,r+a),e.arc(n+i-o.bottomRight,r+a-o.bottomRight,o.bottomRight,L,0,!0),e.lineTo(n+i,r+o.topRight),e.arc(n+i-o.topRight,r+o.topRight,o.topRight,0,-L,!0),e.lineTo(n+o.topLeft,r)}var ln=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,un=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function dn(e,t){let n=(``+e).match(ln);if(!n||n[1]===`normal`)return t*1.2;switch(e=+n[2],n[3]){case`px`:return e;case`%`:e/=100}return t*e}var fn=e=>+e||0;function pn(e,t){let n={},r=A(t),i=r?Object.keys(t):t,a=A(e)?r?n=>M(e[n],e[t[n]]):t=>e[t]:()=>e;for(let e of i)n[e]=fn(a(e));return n}function mn(e){return pn(e,{top:`y`,right:`x`,bottom:`y`,left:`x`})}function hn(e){return pn(e,[`topLeft`,`topRight`,`bottomLeft`,`bottomRight`])}function V(e){let t=mn(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function H(e,t){e||={},t||=B.font;let n=M(e.size,t.size);typeof n==`string`&&(n=parseInt(n,10));let r=M(e.style,t.style);r&&!(``+r).match(un)&&(console.warn(`Invalid font style specified: "`+r+`"`),r=void 0);let i={family:M(e.family,t.family),lineHeight:dn(M(e.lineHeight,t.lineHeight),n),size:n,style:r,weight:M(e.weight,t.weight),string:``};return i.string=Gt(i),i}function gn(e,t,n,r){let i=!0,a,o,s;for(a=0,o=e.length;a<o;++a)if(s=e[a],s!==void 0&&(t!==void 0&&typeof s==`function`&&(s=s(t),i=!1),n!==void 0&&k(s)&&(s=s[n%s.length],i=!1),s!==void 0))return r&&!i&&(r.cacheable=!1),s}function _n(e,t,n){let{min:r,max:i}=e,a=xe(t,(i-r)/2),o=(e,t)=>n&&e===0?0:e+t;return{min:o(r,-Math.abs(a)),max:o(i,a)}}function vn(e,t){return Object.assign(Object.create(e),t)}function yn(e,t=[``],n,r,i=()=>e[0]){let a=n||e;return r===void 0&&(r=Fn(`_fallback`,e)),new Proxy({[Symbol.toStringTag]:`Object`,_cacheable:!0,_scopes:e,_rootScopes:a,_fallback:r,_getTarget:i,override:n=>yn([n,...e],t,a,r)},{deleteProperty(t,n){return delete t[n],delete t._keys,delete e[0][n],!0},get(n,r){return wn(n,r,()=>Pn(r,t,e,n))},getOwnPropertyDescriptor(e,t){return Reflect.getOwnPropertyDescriptor(e._scopes[0],t)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(e,t){return In(e).includes(t)},ownKeys(e){return In(e)},set(e,t,n){let r=e._storage||=i();return e[t]=r[t]=n,delete e._keys,!0}})}function bn(e,t,n,r){let i={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:xn(e,r),setContext:t=>bn(e,t,n,r),override:i=>bn(e.override(i),t,n,r)};return new Proxy(i,{deleteProperty(t,n){return delete t[n],delete e[n],!0},get(e,t,n){return wn(e,t,()=>Tn(e,t,n))},getOwnPropertyDescriptor(t,n){return t._descriptors.allKeys?Reflect.has(e,n)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,n)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(t,n){return Reflect.has(e,n)},ownKeys(){return Reflect.ownKeys(e)},set(t,n,r){return e[n]=r,delete t[n],!0}})}function xn(e,t={scriptable:!0,indexable:!0}){let{_scriptable:n=t.scriptable,_indexable:r=t.indexable,_allKeys:i=t.allKeys}=e;return{allKeys:i,scriptable:n,indexable:r,isScriptable:Fe(n)?n:()=>n,isIndexable:Fe(r)?r:()=>r}}var Sn=(e,t)=>e?e+Ne(t):t,Cn=(e,t)=>A(t)&&e!==`adapters`&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function wn(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t===`constructor`)return e[t];let r=n();return e[t]=r,r}function Tn(e,t,n){let{_proxy:r,_context:i,_subProxy:a,_descriptors:o}=e,s=r[t];return Fe(s)&&o.isScriptable(t)&&(s=En(t,s,e,n)),k(s)&&s.length&&(s=Dn(t,s,e,o.isIndexable)),Cn(t,s)&&(s=bn(s,i,a&&a[t],o)),s}function En(e,t,n,r){let{_proxy:i,_context:a,_subProxy:o,_stack:s}=n;if(s.has(e))throw Error(`Recursion detected: `+Array.from(s).join(`->`)+`->`+e);s.add(e);let c=t(a,o||r);return s.delete(e),Cn(e,c)&&(c=jn(i._scopes,i,e,c)),c}function Dn(e,t,n,r){let{_proxy:i,_context:a,_subProxy:o,_descriptors:s}=n;if(a.index!==void 0&&r(e))return t[a.index%t.length];if(A(t[0])){let n=t,r=i._scopes.filter(e=>e!==n);t=[];for(let c of n){let n=jn(r,i,e,c);t.push(bn(n,a,o&&o[e],s))}}return t}function On(e,t,n){return Fe(e)?e(t,n):e}var kn=(e,t)=>e===!0?t:typeof e==`string`?Me(t,e):void 0;function An(e,t,n,r,i){for(let a of t){let t=kn(n,a);if(t){e.add(t);let a=On(t._fallback,n,i);if(a!==void 0&&a!==n&&a!==r)return a}else if(t===!1&&r!==void 0&&n!==r)return null}return!1}function jn(e,t,n,r){let i=t._rootScopes,a=On(t._fallback,n,r),o=[...e,...i],s=new Set;s.add(r);let c=Mn(s,o,n,a||n,r);return c===null||a!==void 0&&a!==n&&(c=Mn(s,o,a,c,r),c===null)?!1:yn(Array.from(s),[``],i,a,()=>Nn(t,n,r))}function Mn(e,t,n,r,i){for(;n;)n=An(e,t,n,r,i);return n}function Nn(e,t,n){let r=e._getTarget();t in r||(r[t]={});let i=r[t];return k(i)&&A(n)?n:i||{}}function Pn(e,t,n,r){let i;for(let a of t)if(i=Fn(Sn(a,e),n),i!==void 0)return Cn(e,i)?jn(n,r,e,i):i}function Fn(e,t){for(let n of t){if(!n)continue;let t=n[e];if(t!==void 0)return t}}function In(e){let t=e._keys;return t||=e._keys=Ln(e._scopes),t}function Ln(e){let t=new Set;for(let n of e)for(let e of Object.keys(n).filter(e=>!e.startsWith(`_`)))t.add(e);return Array.from(t)}function Rn(e,t,n,r){let{iScale:i}=e,{key:a=`r`}=this._parsing,o=Array(r),s,c,l,u;for(s=0,c=r;s<c;++s)l=s+n,u=t[l],o[s]={r:i.parse(Me(u,a),l)};return o}var zn=2**-52||1e-14,Bn=(e,t)=>t<e.length&&!e[t].skip&&e[t],Vn=e=>e===`x`?`y`:`x`;function Hn(e,t,n,r){let i=e.skip?t:e,a=t,o=n.skip?t:n,s=nt(a,i),c=nt(o,a),l=s/(s+c),u=c/(s+c);l=isNaN(l)?0:l,u=isNaN(u)?0:u;let d=r*l,f=r*u;return{previous:{x:a.x-d*(o.x-i.x),y:a.y-d*(o.y-i.y)},next:{x:a.x+f*(o.x-i.x),y:a.y+f*(o.y-i.y)}}}function Un(e,t,n){let r=e.length,i,a,o,s,c,l=Bn(e,0);for(let u=0;u<r-1;++u)c=l,l=Bn(e,u+1),c&&l&&(Ge(t[u],0,zn)?n[u]=n[u+1]=0:(i=n[u]/t[u],a=n[u+1]/t[u],s=i**2+a**2,!(s<=9)&&(o=3/Math.sqrt(s),n[u]=i*o*t[u],n[u+1]=a*o*t[u])))}function Wn(e,t,n=`x`){let r=Vn(n),i=e.length,a,o,s,c=Bn(e,0);for(let l=0;l<i;++l){if(o=s,s=c,c=Bn(e,l+1),!s)continue;let i=s[n],u=s[r];o&&(a=(i-o[n])/3,s[`cp1${n}`]=i-a,s[`cp1${r}`]=u-a*t[l]),c&&(a=(c[n]-i)/3,s[`cp2${n}`]=i+a,s[`cp2${r}`]=u+a*t[l])}}function Gn(e,t=`x`){let n=Vn(t),r=e.length,i=Array(r).fill(0),a=Array(r),o,s,c,l=Bn(e,0);for(o=0;o<r;++o)if(s=c,c=l,l=Bn(e,o+1),c){if(l){let e=l[t]-c[t];i[o]=e===0?0:(l[n]-c[n])/e}a[o]=s?l?We(i[o-1])===We(i[o])?(i[o-1]+i[o])/2:0:i[o-1]:i[o]}Un(e,i,a),Wn(e,a,t)}function Kn(e,t,n){return Math.max(Math.min(e,n),t)}function qn(e,t){let n,r,i,a,o,s=Qt(e[0],t);for(n=0,r=e.length;n<r;++n)o=a,a=s,s=n<r-1&&Qt(e[n+1],t),a&&(i=e[n],o&&(i.cp1x=Kn(i.cp1x,t.left,t.right),i.cp1y=Kn(i.cp1y,t.top,t.bottom)),s&&(i.cp2x=Kn(i.cp2x,t.left,t.right),i.cp2y=Kn(i.cp2y,t.top,t.bottom)))}function Jn(e,t,n,r,i){let a,o,s,c;if(t.spanGaps&&(e=e.filter(e=>!e.skip)),t.cubicInterpolationMode===`monotone`)Gn(e,i);else{let n=r?e[e.length-1]:e[0];for(a=0,o=e.length;a<o;++a)s=e[a],c=Hn(n,s,e[Math.min(a+1,o-+!r)%o],t.tension),s.cp1x=c.previous.x,s.cp1y=c.previous.y,s.cp2x=c.next.x,s.cp2y=c.next.y,n=s}t.capBezierPoints&&qn(e,n)}function Yn(){return typeof window<`u`&&typeof document<`u`}function Xn(e){let t=e.parentNode;return t&&t.toString()===`[object ShadowRoot]`&&(t=t.host),t}function Zn(e,t,n){let r;return typeof e==`string`?(r=parseInt(e,10),e.indexOf(`%`)!==-1&&(r=r/100*t.parentNode[n])):r=e,r}var Qn=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function $n(e,t){return Qn(e).getPropertyValue(t)}var er=[`top`,`right`,`bottom`,`left`];function tr(e,t,n){let r={};n=n?`-`+n:``;for(let i=0;i<4;i++){let a=er[i];r[a]=parseFloat(e[t+`-`+a+n])||0}return r.width=r.left+r.right,r.height=r.top+r.bottom,r}var nr=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function rr(e,t){let n=e.touches,r=n&&n.length?n[0]:e,{offsetX:i,offsetY:a}=r,o=!1,s,c;if(nr(i,a,e.target))s=i,c=a;else{let e=t.getBoundingClientRect();s=r.clientX-e.left,c=r.clientY-e.top,o=!0}return{x:s,y:c,box:o}}function ir(e,t){if(`native`in e)return e;let{canvas:n,currentDevicePixelRatio:r}=t,i=Qn(n),a=i.boxSizing===`border-box`,o=tr(i,`padding`),s=tr(i,`border`,`width`),{x:c,y:l,box:u}=rr(e,n),d=o.left+(u&&s.left),f=o.top+(u&&s.top),{width:p,height:m}=t;return a&&(p-=o.width+s.width,m-=o.height+s.height),{x:Math.round((c-d)/p*n.width/r),y:Math.round((l-f)/m*n.height/r)}}function ar(e,t,n){let r,i;if(t===void 0||n===void 0){let a=e&&Xn(e);if(!a)t=e.clientWidth,n=e.clientHeight;else{let e=a.getBoundingClientRect(),o=Qn(a),s=tr(o,`border`,`width`),c=tr(o,`padding`);t=e.width-c.width-s.width,n=e.height-c.height-s.height,r=Zn(o.maxWidth,a,`clientWidth`),i=Zn(o.maxHeight,a,`clientHeight`)}}return{width:t,height:n,maxWidth:r||ze,maxHeight:i||ze}}var or=e=>Math.round(e*10)/10;function sr(e,t,n,r){let i=Qn(e),a=tr(i,`margin`),o=Zn(i.maxWidth,e,`clientWidth`)||ze,s=Zn(i.maxHeight,e,`clientHeight`)||ze,c=ar(e,t,n),{width:l,height:u}=c;if(i.boxSizing===`content-box`){let e=tr(i,`border`,`width`),t=tr(i,`padding`);l-=t.width+e.width,u-=t.height+e.height}return l=Math.max(0,l-a.width),u=Math.max(0,r?l/r:u-a.height),l=or(Math.min(l,o,c.maxWidth)),u=or(Math.min(u,s,c.maxHeight)),l&&!u&&(u=or(l/2)),(t!==void 0||n!==void 0)&&r&&c.height&&u>c.height&&(u=c.height,l=or(Math.floor(u*r))),{width:l,height:u}}function cr(e,t,n){let r=t||1,i=or(e.height*r),a=or(e.width*r);e.height=or(e.height),e.width=or(e.width);let o=e.canvas;return o.style&&(n||!o.style.height&&!o.style.width)&&(o.style.height=`${e.height}px`,o.style.width=`${e.width}px`),e.currentDevicePixelRatio!==r||o.height!==i||o.width!==a?(e.currentDevicePixelRatio=r,o.height=i,o.width=a,e.ctx.setTransform(r,0,0,r,0,0),!0):!1}var lr=function(){let e=!1;try{let t={get passive(){return e=!0,!1}};Yn()&&(window.addEventListener(`test`,null,t),window.removeEventListener(`test`,null,t))}catch{}return e}();function ur(e,t){let n=$n(e,t),r=n&&n.match(/^(\d+)(\.\d+)?px$/);return r?+r[1]:void 0}function dr(e,t,n,r){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function fr(e,t,n,r){return{x:e.x+n*(t.x-e.x),y:r===`middle`?n<.5?e.y:t.y:r===`after`?n<1?e.y:t.y:n>0?t.y:e.y}}function pr(e,t,n,r){let i={x:e.cp2x,y:e.cp2y},a={x:t.cp1x,y:t.cp1y},o=dr(e,i,n),s=dr(i,a,n),c=dr(a,t,n);return dr(dr(o,s,n),dr(s,c,n),n)}var mr=function(e,t){return{x(n){return e+e+t-n},setWidth(e){t=e},textAlign(e){return e===`center`?e:e===`right`?`left`:`right`},xPlus(e,t){return e-t},leftForLtr(e,t){return e-t}}},hr=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function gr(e,t,n){return e?mr(t,n):hr()}function _r(e,t){let n,r;(t===`ltr`||t===`rtl`)&&(n=e.canvas.style,r=[n.getPropertyValue(`direction`),n.getPropertyPriority(`direction`)],n.setProperty(`direction`,t,`important`),e.prevTextDirection=r)}function vr(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty(`direction`,t[0],t[1]))}function yr(e){return e===`angle`?{between:at,compare:rt,normalize:it}:{between:st,compare:(e,t)=>e-t,normalize:e=>e}}function br({start:e,end:t,count:n,loop:r,style:i}){return{start:e%n,end:t%n,loop:r&&(t-e+1)%n===0,style:i}}function xr(e,t,n){let{property:r,start:i,end:a}=n,{between:o,normalize:s}=yr(r),c=t.length,{start:l,end:u,loop:d}=e,f,p;if(d){for(l+=c,u+=c,f=0,p=c;f<p&&o(s(t[l%c][r]),i,a);++f)l--,u--;l%=c,u%=c}return u<l&&(u+=c),{start:l,end:u,loop:d,style:e.style}}function Sr(e,t,n){if(!n)return[e];let{property:r,start:i,end:a}=n,o=t.length,{compare:s,between:c,normalize:l}=yr(r),{start:u,end:d,loop:f,style:p}=xr(e,t,n),m=[],h=!1,g=null,_,v,y,b=()=>c(i,y,_)&&s(i,y)!==0,x=()=>s(a,_)===0||c(a,y,_),S=()=>h||b(),C=()=>!h||x();for(let e=u,n=u;e<=d;++e)v=t[e%o],!v.skip&&(_=l(v[r]),_!==y&&(h=c(_,i,a),g===null&&S()&&(g=s(_,i)===0?e:n),g!==null&&C()&&(m.push(br({start:g,end:e,loop:f,count:o,style:p})),g=null),n=e,y=_));return g!==null&&m.push(br({start:g,end:d,loop:f,count:o,style:p})),m}function Cr(e,t){let n=[],r=e.segments;for(let i=0;i<r.length;i++){let a=Sr(r[i],e.points,t);a.length&&n.push(...a)}return n}function wr(e,t,n,r){let i=0,a=t-1;if(n&&!r)for(;i<t&&!e[i].skip;)i++;for(;i<t&&e[i].skip;)i++;for(i%=t,n&&(a+=i);a>i&&e[a%t].skip;)a--;return a%=t,{start:i,end:a}}function Tr(e,t,n,r){let i=e.length,a=[],o=t,s=e[t],c;for(c=t+1;c<=n;++c){let n=e[c%i];n.skip||n.stop?s.skip||(r=!1,a.push({start:t%i,end:(c-1)%i,loop:r}),t=o=n.stop?c:null):(o=c,s.skip&&(t=c)),s=n}return o!==null&&a.push({start:t%i,end:o%i,loop:r}),a}function Er(e,t){let n=e.points,r=e.options.spanGaps,i=n.length;if(!i)return[];let a=!!e._loop,{start:o,end:s}=wr(n,i,a,r);return r===!0?Dr(e,[{start:o,end:s,loop:a}],n,t):Dr(e,Tr(n,o,s<o?s+i:s,!!e._fullLoop&&o===0&&s===i-1),n,t)}function Dr(e,t,n,r){return!r||!r.setContext||!n?t:Or(e,t,n,r)}function Or(e,t,n,r){let i=e._chart.getContext(),a=kr(e.options),{_datasetIndex:o,options:{spanGaps:s}}=e,c=n.length,l=[],u=a,d=t[0].start,f=d;function p(e,t,r,i){let a=s?-1:1;if(e!==t){for(e+=c;n[e%c].skip;)e-=a;for(;n[t%c].skip;)t+=a;e%c!==t%c&&(l.push({start:e%c,end:t%c,loop:r,style:i}),u=i,d=t%c)}}for(let e of t){d=s?d:e.start;let t=n[d%c],a;for(f=d+1;f<=e.end;f++){let s=n[f%c];a=kr(r.setContext(vn(i,{type:`segment`,p0:t,p1:s,p0DataIndex:(f-1)%c,p1DataIndex:f%c,datasetIndex:o}))),Ar(a,u)&&p(d,f-1,e.loop,u),t=s,u=a}d<f-1&&p(d,f-1,e.loop,u)}return l}function kr(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function Ar(e,t){if(!t)return!1;let n=[],r=function(e,t){return Dt(t)?(n.includes(t)||n.push(t),n.indexOf(t)):t};return JSON.stringify(e,r)!==JSON.stringify(t,r)}function jr(e,t,n){return e.options.clip?e[n]:t[n]}function Mr(e,t){let{xScale:n,yScale:r}=e;return n&&r?{left:jr(n,t,`left`),right:jr(n,t,`right`),top:jr(r,t,`top`),bottom:jr(r,t,`bottom`)}:t}function Nr(e,t){let n=t._clip;if(n.disabled)return!1;let r=Mr(t,e.chartArea);return{left:n.left===!1?0:r.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:r.right+(n.right===!0?0:n.right),top:n.top===!1?0:r.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:r.bottom+(n.bottom===!0?0:n.bottom)}}var Pr=new class{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(e,t,n,r){let i=t.listeners[r],a=t.duration;i.forEach(r=>r({chart:e,initial:t.initial,numSteps:a,currentStep:Math.min(n-t.start,a)}))}_refresh(){this._request||=(this._running=!0,gt.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(e=Date.now()){let t=0;this._charts.forEach((n,r)=>{if(!n.running||!n.items.length)return;let i=n.items,a=i.length-1,o=!1,s;for(;a>=0;--a)s=i[a],s._active?(s._total>n.duration&&(n.duration=s._total),s.tick(e),o=!0):(i[a]=i[i.length-1],i.pop());o&&(r.draw(),this._notify(r,n,e,`progress`)),i.length||(n.running=!1,this._notify(r,n,e,`complete`),n.initial=!1),t+=i.length}),this._lastDate=e,t===0&&(this._running=!1)}_getAnims(e){let t=this._charts,n=t.get(e);return n||(n={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},t.set(e,n)),n}listen(e,t,n){this._getAnims(e).listeners[t].push(n)}add(e,t){t&&t.length&&this._getAnims(e).items.push(...t)}has(e){return this._getAnims(e).items.length>0}start(e){let t=this._charts.get(e);t&&(t.running=!0,t.start=Date.now(),t.duration=t.items.reduce((e,t)=>Math.max(e,t._duration),0),this._refresh())}running(e){if(!this._running)return!1;let t=this._charts.get(e);return!(!t||!t.running||!t.items.length)}stop(e){let t=this._charts.get(e);if(!t||!t.items.length)return;let n=t.items,r=n.length-1;for(;r>=0;--r)n[r].cancel();t.items=[],this._notify(e,t,Date.now(),`complete`)}remove(e){return this._charts.delete(e)}},Fr=`transparent`,Ir={boolean(e,t,n){return n>.5?t:e},color(e,t,n){let r=Ot(e||Fr),i=r.valid&&Ot(t||Fr);return i&&i.valid?i.mix(r,n).hexString():t},number(e,t,n){return e+(t-e)*n}},Lr=class{constructor(e,t,n,r){let i=t[n];r=gn([e.to,r,i,e.from]);let a=gn([e.from,i,r]);this._active=!0,this._fn=e.fn||Ir[e.type||typeof a],this._easing=Et[e.easing]||Et.linear,this._start=Math.floor(Date.now()+(e.delay||0)),this._duration=this._total=Math.floor(e.duration),this._loop=!!e.loop,this._target=t,this._prop=n,this._from=a,this._to=r,this._promises=void 0}active(){return this._active}update(e,t,n){if(this._active){this._notify(!1);let r=this._target[this._prop],i=n-this._start,a=this._duration-i;this._start=n,this._duration=Math.floor(Math.max(a,e.duration)),this._total+=i,this._loop=!!e.loop,this._to=gn([e.to,t,r,e.from]),this._from=gn([e.from,r,t])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(e){let t=e-this._start,n=this._duration,r=this._prop,i=this._from,a=this._loop,o=this._to,s;this._active=i!==o&&(a||t<n),this._active?t<0?this._target[r]=i:(s=t/n%2,s=a&&s>1?2-s:s,s=this._easing(Math.min(1,Math.max(0,s))),this._target[r]=this._fn(i,o,s)):(this._target[r]=o,this._notify(!0))}wait(){let e=this._promises||=[];return new Promise((t,n)=>{e.push({res:t,rej:n})})}_notify(e){let t=e?`res`:`rej`,n=this._promises||[];for(let e=0;e<n.length;e++)n[e][t]()}},Rr=class{constructor(e,t){this._chart=e,this._properties=new Map,this.configure(t)}configure(e){if(!A(e))return;let t=Object.keys(B.animation),n=this._properties;Object.getOwnPropertyNames(e).forEach(r=>{let i=e[r];if(!A(i))return;let a={};for(let e of t)a[e]=i[e];(k(i.properties)&&i.properties||[r]).forEach(e=>{e!==r&&n.has(e)||n.set(e,a)})})}_animateOptions(e,t){let n=t.options,r=Br(e,n);if(!r)return[];let i=this._createAnimations(r,n);return n.$shared&&zr(e.options.$animations,n).then(()=>{e.options=n},()=>{}),i}_createAnimations(e,t){let n=this._properties,r=[],i=e.$animations||={},a=Object.keys(t),o=Date.now(),s;for(s=a.length-1;s>=0;--s){let c=a[s];if(c.charAt(0)===`$`)continue;if(c===`options`){r.push(...this._animateOptions(e,t));continue}let l=t[c],u=i[c],d=n.get(c);if(u){if(d&&u.active()){u.update(d,l,o);continue}u.cancel()}!d||!d.duration?e[c]=l:(i[c]=u=new Lr(d,e,c,l),r.push(u))}return r}update(e,t){if(this._properties.size===0){Object.assign(e,t);return}let n=this._createAnimations(e,t);if(n.length)return Pr.add(this._chart,n),!0}};function zr(e,t){let n=[],r=Object.keys(t);for(let t=0;t<r.length;t++){let i=e[r[t]];i&&i.active()&&n.push(i.wait())}return Promise.all(n)}function Br(e,t){if(!t)return;let n=e.options;if(!n)e.options=t;else return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function Vr(e,t){let n=e&&e.options||{},r=n.reverse,i=n.min===void 0?t:0,a=n.max===void 0?t:0;return{start:r?a:i,end:r?i:a}}function Hr(e,t,n){if(n===!1)return!1;let r=Vr(e,n),i=Vr(t,n);return{top:i.end,right:r.end,bottom:i.start,left:r.start}}function Ur(e){let t,n,r,i;return A(e)?(t=e.top,n=e.right,r=e.bottom,i=e.left):t=n=r=i=e,{top:t,right:n,bottom:r,left:i,disabled:e===!1}}function Wr(e,t){let n=[],r=e._getSortedDatasetMetas(t),i,a;for(i=0,a=r.length;i<a;++i)n.push(r[i].index);return n}function Gr(e,t,n,r={}){let i=e.keys,a=r.mode===`single`,o,s,c,l;if(t===null)return;let u=!1;for(o=0,s=i.length;o<s;++o){if(c=+i[o],c===n){if(u=!0,r.all)continue;break}l=e.values[c],j(l)&&(a||t===0||We(t)===We(l))&&(t+=l)}return!u&&!r.all?0:t}function Kr(e,t){let{iScale:n,vScale:r}=t,i=n.axis===`x`?`x`:`y`,a=r.axis===`x`?`x`:`y`,o=Object.keys(e),s=Array(o.length),c,l,u;for(c=0,l=o.length;c<l;++c)u=o[c],s[c]={[i]:u,[a]:e[u]};return s}function qr(e,t){let n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function Jr(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function Yr(e){let{min:t,max:n,minDefined:r,maxDefined:i}=e.getUserBounds();return{min:r?t:-1/0,max:i?n:1/0}}function Xr(e,t,n){let r=e[t]||(e[t]={});return r[n]||(r[n]={})}function Zr(e,t,n,r){for(let i of t.getMatchingVisibleMetas(r).reverse()){let t=e[i.index];if(n&&t>0||!n&&t<0)return i.index}return null}function Qr(e,t){let{chart:n,_cachedMeta:r}=e,i=n._stacks||={},{iScale:a,vScale:o,index:s}=r,c=a.axis,l=o.axis,u=Jr(a,o,r),d=t.length,f;for(let e=0;e<d;++e){let n=t[e],{[c]:a,[l]:d}=n,p=n._stacks||={};f=p[l]=Xr(i,u,a),f[s]=d,f._top=Zr(f,o,!0,r.type),f._bottom=Zr(f,o,!1,r.type);let m=f._visualValues||(f._visualValues={});m[s]=d}}function $r(e,t){let n=e.scales;return Object.keys(n).filter(e=>n[e].axis===t).shift()}function ei(e,t){return vn(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:`default`,type:`dataset`})}function ti(e,t,n){return vn(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:`default`,type:`data`})}function ni(e,t){let n=e.controller.index,r=e.vScale&&e.vScale.axis;if(r){t||=e._parsed;for(let e of t){let t=e._stacks;if(!t||t[r]===void 0||t[r][n]===void 0)return;delete t[r][n],t[r]._visualValues!==void 0&&t[r]._visualValues[n]!==void 0&&delete t[r]._visualValues[n]}}}var ri=e=>e===`reset`||e===`none`,ii=(e,t)=>t?e:Object.assign({},e),ai=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:Wr(n,!0),values:null},oi=class{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(e,t){this.chart=e,this._ctx=e.ctx,this.index=t,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){let e=this._cachedMeta;this.configure(),this.linkScales(),e._stacked=qr(e.vScale,e),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled(`filler`)&&console.warn(`Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options`)}updateIndex(e){this.index!==e&&ni(this._cachedMeta),this.index=e}linkScales(){let e=this.chart,t=this._cachedMeta,n=this.getDataset(),r=(e,t,n,r)=>e===`x`?t:e===`r`?r:n,i=t.xAxisID=M(n.xAxisID,$r(e,`x`)),a=t.yAxisID=M(n.yAxisID,$r(e,`y`)),o=t.rAxisID=M(n.rAxisID,$r(e,`r`)),s=t.indexAxis,c=t.iAxisID=r(s,i,a,o),l=t.vAxisID=r(s,a,i,o);t.xScale=this.getScaleForId(i),t.yScale=this.getScaleForId(a),t.rScale=this.getScaleForId(o),t.iScale=this.getScaleForId(c),t.vScale=this.getScaleForId(l)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(e){return this.chart.scales[e]}_getOtherScale(e){let t=this._cachedMeta;return e===t.iScale?t.vScale:t.iScale}reset(){this._update(`reset`)}_destroy(){let e=this._cachedMeta;this._data&&mt(this._data,this),e._stacked&&ni(e)}_dataCheck(){let e=this.getDataset(),t=e.data||=[],n=this._data;if(A(t)){let e=this._cachedMeta;this._data=Kr(t,e)}else if(n!==t){if(n){mt(n,this);let e=this._cachedMeta;ni(e),e._parsed=[]}t&&Object.isExtensible(t)&&pt(t,this),this._syncList=[],this._data=t}}addElements(){let e=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(e.dataset=new this.datasetElementType)}buildOrUpdateElements(e){let t=this._cachedMeta,n=this.getDataset(),r=!1;this._dataCheck();let i=t._stacked;t._stacked=qr(t.vScale,t),t.stack!==n.stack&&(r=!0,ni(t),t.stack=n.stack),this._resyncElements(e),(r||i!==t._stacked)&&(Qr(this,t._parsed),t._stacked=qr(t.vScale,t))}configure(){let e=this.chart.config,t=e.datasetScopeKeys(this._type),n=e.getOptionScopes(this.getDataset(),t,!0);this.options=e.createResolver(n,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(e,t){let{_cachedMeta:n,_data:r}=this,{iScale:i,_stacked:a}=n,o=i.axis,s=e===0&&t===r.length||n._sorted,c=e>0&&n._parsed[e-1],l,u,d;if(this._parsing===!1)n._parsed=r,n._sorted=!0,d=r;else{d=k(r[e])?this.parseArrayData(n,r,e,t):A(r[e])?this.parseObjectData(n,r,e,t):this.parsePrimitiveData(n,r,e,t);let i=()=>u[o]===null||c&&u[o]<c[o];for(l=0;l<t;++l)n._parsed[l+e]=u=d[l],s&&(i()&&(s=!1),c=u);n._sorted=s}a&&Qr(this,d)}parsePrimitiveData(e,t,n,r){let{iScale:i,vScale:a}=e,o=i.axis,s=a.axis,c=i.getLabels(),l=i===a,u=Array(r),d,f,p;for(d=0,f=r;d<f;++d)p=d+n,u[d]={[o]:l||i.parse(c[p],p),[s]:a.parse(t[p],p)};return u}parseArrayData(e,t,n,r){let{xScale:i,yScale:a}=e,o=Array(r),s,c,l,u;for(s=0,c=r;s<c;++s)l=s+n,u=t[l],o[s]={x:i.parse(u[0],l),y:a.parse(u[1],l)};return o}parseObjectData(e,t,n,r){let{xScale:i,yScale:a}=e,{xAxisKey:o=`x`,yAxisKey:s=`y`}=this._parsing,c=Array(r),l,u,d,f;for(l=0,u=r;l<u;++l)d=l+n,f=t[d],c[l]={x:i.parse(Me(f,o),d),y:a.parse(Me(f,s),d)};return c}getParsed(e){return this._cachedMeta._parsed[e]}getDataElement(e){return this._cachedMeta.data[e]}applyStack(e,t,n){let r=this.chart,i=this._cachedMeta,a=t[e.axis];return Gr({keys:Wr(r,!0),values:t._stacks[e.axis]._visualValues},a,i.index,{mode:n})}updateRangeFromParsed(e,t,n,r){let i=n[t.axis],a=i===null?NaN:i,o=r&&n._stacks[t.axis];r&&o&&(r.values=o,a=Gr(r,i,this._cachedMeta.index)),e.min=Math.min(e.min,a),e.max=Math.max(e.max,a)}getMinMax(e,t){let n=this._cachedMeta,r=n._parsed,i=n._sorted&&e===n.iScale,a=r.length,o=this._getOtherScale(e),s=ai(t,n,this.chart),c={min:1/0,max:-1/0},{min:l,max:u}=Yr(o),d,f;function p(){f=r[d];let t=f[o.axis];return!j(f[e.axis])||l>t||u<t}for(d=0;d<a&&!(!p()&&(this.updateRangeFromParsed(c,e,f,s),i));++d);if(i){for(d=a-1;d>=0;--d)if(!p()){this.updateRangeFromParsed(c,e,f,s);break}}return c}getAllParsedValues(e){let t=this._cachedMeta._parsed,n=[],r,i,a;for(r=0,i=t.length;r<i;++r)a=t[r][e.axis],j(a)&&n.push(a);return n}getMaxOverflow(){return!1}getLabelAndValue(e){let t=this._cachedMeta,n=t.iScale,r=t.vScale,i=this.getParsed(e);return{label:n?``+n.getLabelForValue(i[n.axis]):``,value:r?``+r.getLabelForValue(i[r.axis]):``}}_update(e){let t=this._cachedMeta;this.update(e||`default`),t._clip=Ur(M(this.options.clip,Hr(t.xScale,t.yScale,this.getMaxOverflow())))}update(e){}draw(){let e=this._ctx,t=this.chart,n=this._cachedMeta,r=n.data||[],i=t.chartArea,a=[],o=this._drawStart||0,s=this._drawCount||r.length-o,c=this.options.drawActiveElementsOnTop,l;for(n.dataset&&n.dataset.draw(e,i,o,s),l=o;l<o+s;++l){let t=r[l];t.hidden||(t.active&&c?a.push(t):t.draw(e,i))}for(l=0;l<a.length;++l)a[l].draw(e,i)}getStyle(e,t){let n=t?`active`:`default`;return e===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(n):this.resolveDataElementOptions(e||0,n)}getContext(e,t,n){let r=this.getDataset(),i;if(e>=0&&e<this._cachedMeta.data.length){let t=this._cachedMeta.data[e];i=t.$context||=ti(this.getContext(),e,t),i.parsed=this.getParsed(e),i.raw=r.data[e],i.index=i.dataIndex=e}else i=this.$context||=ei(this.chart.getContext(),this.index),i.dataset=r,i.index=i.datasetIndex=this.index;return i.active=!!t,i.mode=n,i}resolveDatasetElementOptions(e){return this._resolveElementOptions(this.datasetElementType.id,e)}resolveDataElementOptions(e,t){return this._resolveElementOptions(this.dataElementType.id,t,e)}_resolveElementOptions(e,t=`default`,n){let r=t===`active`,i=this._cachedDataOpts,a=e+`-`+t,o=i[a],s=this.enableOptionSharing&&Pe(n);if(o)return ii(o,s);let c=this.chart.config,l=c.datasetElementScopeKeys(this._type,e),u=r?[`${e}Hover`,`hover`,e,``]:[e,``],d=c.getOptionScopes(this.getDataset(),l),f=Object.keys(B.elements[e]),p=c.resolveNamedOptions(d,f,()=>this.getContext(n,r,t),u);return p.$shared&&(p.$shared=s,i[a]=Object.freeze(ii(p,s))),p}_resolveAnimations(e,t,n){let r=this.chart,i=this._cachedDataOpts,a=`animation-${t}`,o=i[a];if(o)return o;let s;if(r.options.animation!==!1){let r=this.chart.config,i=r.datasetAnimationScopeKeys(this._type,t),a=r.getOptionScopes(this.getDataset(),i);s=r.createResolver(a,this.getContext(e,n,t))}let c=new Rr(r,s&&s.animations);return s&&s._cacheable&&(i[a]=Object.freeze(c)),c}getSharedOptions(e){if(e.$shared)return this._sharedOptions||=Object.assign({},e)}includeOptions(e,t){return!t||ri(e)||this.chart._animationsDisabled}_getSharedOptions(e,t){let n=this.resolveDataElementOptions(e,t),r=this._sharedOptions,i=this.getSharedOptions(n),a=this.includeOptions(t,i)||i!==r;return this.updateSharedOptions(i,t,n),{sharedOptions:i,includeOptions:a}}updateElement(e,t,n,r){ri(r)?Object.assign(e,n):this._resolveAnimations(t,r).update(e,n)}updateSharedOptions(e,t,n){e&&!ri(t)&&this._resolveAnimations(void 0,t).update(e,n)}_setStyle(e,t,n,r){e.active=r;let i=this.getStyle(t,r);this._resolveAnimations(t,n,r).update(e,{options:!r&&this.getSharedOptions(i)||i})}removeHoverStyle(e,t,n){this._setStyle(e,n,`active`,!1)}setHoverStyle(e,t,n){this._setStyle(e,n,`active`,!0)}_removeDatasetHoverStyle(){let e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,`active`,!1)}_setDatasetHoverStyle(){let e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,`active`,!0)}_resyncElements(e){let t=this._data,n=this._cachedMeta.data;for(let[e,t,n]of this._syncList)this[e](t,n);this._syncList=[];let r=n.length,i=t.length,a=Math.min(i,r);a&&this.parse(0,a),i>r?this._insertElements(r,i-r,e):i<r&&this._removeElements(i,r-i)}_insertElements(e,t,n=!0){let r=this._cachedMeta,i=r.data,a=e+t,o,s=e=>{for(e.length+=t,o=e.length-1;o>=a;o--)e[o]=e[o-t]};for(s(i),o=e;o<a;++o)i[o]=new this.dataElementType;this._parsing&&s(r._parsed),this.parse(e,t),n&&this.updateElements(i,e,t,`reset`)}updateElements(e,t,n,r){}_removeElements(e,t){let n=this._cachedMeta;if(this._parsing){let r=n._parsed.splice(e,t);n._stacked&&ni(n,r)}n.data.splice(e,t)}_sync(e){if(this._parsing)this._syncList.push(e);else{let[t,n,r]=e;this[t](n,r)}this.chart._dataChanges.push([this.index,...e])}_onDataPush(){let e=arguments.length;this._sync([`_insertElements`,this.getDataset().data.length-e,e])}_onDataPop(){this._sync([`_removeElements`,this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync([`_removeElements`,0,1])}_onDataSplice(e,t){t&&this._sync([`_removeElements`,e,t]);let n=arguments.length-2;n&&this._sync([`_insertElements`,e,n])}_onDataUnshift(){this._sync([`_insertElements`,0,arguments.length])}};function si(e,t){if(!e._cache.$bar){let n=e.getMatchingVisibleMetas(t),r=[];for(let t=0,i=n.length;t<i;t++)r=r.concat(n[t].controller.getAllParsedValues(e));e._cache.$bar=ht(r.sort((e,t)=>e-t))}return e._cache.$bar}function ci(e){let t=e.iScale,n=si(t,e.type),r=t._length,i,a,o,s,c=()=>{o!==32767&&o!==-32768&&(Pe(s)&&(r=Math.min(r,Math.abs(o-s)||r)),s=o)};for(i=0,a=n.length;i<a;++i)o=t.getPixelForValue(n[i]),c();for(s=void 0,i=0,a=t.ticks.length;i<a;++i)o=t.getPixelForTick(i),c();return r}function li(e,t,n,r){let i=n.barThickness,a,o;return O(i)?(a=t.min*n.categoryPercentage,o=n.barPercentage):(a=i*r,o=1),{chunk:a/r,ratio:o,start:t.pixels[e]-a/2}}function ui(e,t,n,r){let i=t.pixels,a=i[e],o=e>0?i[e-1]:null,s=e<i.length-1?i[e+1]:null,c=n.categoryPercentage;o===null&&(o=a-(s===null?t.end-t.start:s-a)),s===null&&(s=a+a-o);let l=a-(a-Math.min(o,s))/2*c;return{chunk:Math.abs(s-o)/2*c/r,ratio:n.barPercentage,start:l}}function di(e,t,n,r){let i=n.parse(e[0],r),a=n.parse(e[1],r),o=Math.min(i,a),s=Math.max(i,a),c=o,l=s;Math.abs(o)>Math.abs(s)&&(c=s,l=o),t[n.axis]=l,t._custom={barStart:c,barEnd:l,start:i,end:a,min:o,max:s}}function fi(e,t,n,r){return k(e)?di(e,t,n,r):t[n.axis]=n.parse(e,r),t}function pi(e,t,n,r){let i=e.iScale,a=e.vScale,o=i.getLabels(),s=i===a,c=[],l,u,d,f;for(l=n,u=n+r;l<u;++l)f=t[l],d={},d[i.axis]=s||i.parse(o[l],l),c.push(fi(f,d,a,l));return c}function mi(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function hi(e,t,n){return e===0?(t.isHorizontal()?1:-1)*(t.min>=n?1:-1):We(e)}function gi(e){let t,n,r,i,a;return e.horizontal?(t=e.base>e.x,n=`left`,r=`right`):(t=e.base<e.y,n=`bottom`,r=`top`),t?(i=`end`,a=`start`):(i=`start`,a=`end`),{start:n,end:r,reverse:t,top:i,bottom:a}}function _i(e,t,n,r){let i=t.borderSkipped,a={};if(!i){e.borderSkipped=a;return}if(i===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}let{start:o,end:s,reverse:c,top:l,bottom:u}=gi(e);i===`middle`&&n&&(e.enableBorderRadius=!0,(n._top||0)===r?i=l:(n._bottom||0)===r?i=u:(a[vi(u,o,s,c)]=!0,i=l)),a[vi(i,o,s,c)]=!0,e.borderSkipped=a}function vi(e,t,n,r){return r?(e=yi(e,t,n),e=bi(e,n,t)):e=bi(e,t,n),e}function yi(e,t,n){return e===t?n:e===n?t:e}function bi(e,t,n){return e===`start`?t:e===`end`?n:e}function xi(e,{inflateAmount:t},n){e.inflateAmount=t===`auto`?n===1?.33:0:t}var Si=class extends oi{static id=`bar`;static defaults={datasetElementType:!1,dataElementType:`bar`,categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:`number`,properties:[`x`,`y`,`base`,`width`,`height`]}}};static overrides={scales:{_index_:{type:`category`,offset:!0,grid:{offset:!0}},_value_:{type:`linear`,beginAtZero:!0}}};parsePrimitiveData(e,t,n,r){return pi(e,t,n,r)}parseArrayData(e,t,n,r){return pi(e,t,n,r)}parseObjectData(e,t,n,r){let{iScale:i,vScale:a}=e,{xAxisKey:o=`x`,yAxisKey:s=`y`}=this._parsing,c=i.axis===`x`?o:s,l=a.axis===`x`?o:s,u=[],d,f,p,m;for(d=n,f=n+r;d<f;++d)m=t[d],p={},p[i.axis]=i.parse(Me(m,c),d),u.push(fi(Me(m,l),p,a,d));return u}updateRangeFromParsed(e,t,n,r){super.updateRangeFromParsed(e,t,n,r);let i=n._custom;i&&t===this._cachedMeta.vScale&&(e.min=Math.min(e.min,i.min),e.max=Math.max(e.max,i.max))}getMaxOverflow(){return 0}getLabelAndValue(e){let{iScale:t,vScale:n}=this._cachedMeta,r=this.getParsed(e),i=r._custom,a=mi(i)?`[`+i.start+`, `+i.end+`]`:``+n.getLabelForValue(r[n.axis]);return{label:``+t.getLabelForValue(r[t.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();let e=this._cachedMeta;e.stack=this.getDataset().stack}update(e){let t=this._cachedMeta;this.updateElements(t.data,0,t.data.length,e)}updateElements(e,t,n,r){let i=r===`reset`,{index:a,_cachedMeta:{vScale:o}}=this,s=o.getBasePixel(),c=o.isHorizontal(),l=this._getRuler(),{sharedOptions:u,includeOptions:d}=this._getSharedOptions(t,r);for(let f=t;f<t+n;f++){let t=this.getParsed(f),n=i||O(t[o.axis])?{base:s,head:s}:this._calculateBarValuePixels(f),p=this._calculateBarIndexPixels(f,l),m=(t._stacks||{})[o.axis],h={horizontal:c,base:n.base,enableBorderRadius:!m||mi(t._custom)||a===m._top||a===m._bottom,x:c?n.head:p.center,y:c?p.center:n.head,height:c?p.size:Math.abs(n.size),width:c?Math.abs(n.size):p.size};d&&(h.options=u||this.resolveDataElementOptions(f,e[f].active?`active`:r));let g=h.options||e[f].options;_i(h,g,m,a),xi(h,g,l.ratio),this.updateElement(e[f],f,h,r)}}_getStacks(e,t){let{iScale:n}=this._cachedMeta,r=n.getMatchingVisibleMetas(this._type).filter(e=>e.controller.options.grouped),i=n.options.stacked,a=[],o=this._cachedMeta.controller.getParsed(t),s=o&&o[n.axis],c=e=>{let t=e._parsed.find(e=>e[n.axis]===s),r=t&&t[e.vScale.axis];if(O(r)||isNaN(r))return!0};for(let n of r)if(!(t!==void 0&&c(n))&&((i===!1||a.indexOf(n.stack)===-1||i===void 0&&n.stack===void 0)&&a.push(n.stack),n.index===e))break;return a.length||a.push(void 0),a}_getStackCount(e){return this._getStacks(void 0,e).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){let e=this.chart.scales,t=this.chart.options.indexAxis;return Object.keys(e).filter(n=>e[n].axis===t).shift()}_getAxis(){let e={},t=this.getFirstScaleIdForIndexAxis();for(let n of this.chart.data.datasets)e[M(this.chart.options.indexAxis===`x`?n.xAxisID:n.yAxisID,t)]=!0;return Object.keys(e)}_getStackIndex(e,t,n){let r=this._getStacks(e,n),i=t===void 0?-1:r.indexOf(t);return i===-1?r.length-1:i}_getRuler(){let e=this.options,t=this._cachedMeta,n=t.iScale,r=[],i,a;for(i=0,a=t.data.length;i<a;++i)r.push(n.getPixelForValue(this.getParsed(i)[n.axis],i));let o=e.barThickness;return{min:o||ci(t),pixels:r,start:n._startPixel,end:n._endPixel,stackCount:this._getStackCount(),scale:n,grouped:e.grouped,ratio:o?1:e.categoryPercentage*e.barPercentage}}_calculateBarValuePixels(e){let{_cachedMeta:{vScale:t,_stacked:n,index:r},options:{base:i,minBarLength:a}}=this,o=i||0,s=this.getParsed(e),c=s._custom,l=mi(c),u=s[t.axis],d=0,f=n?this.applyStack(t,s,n):u,p,m;f!==u&&(d=f-u,f=u),l&&(u=c.barStart,f=c.barEnd-c.barStart,u!==0&&We(u)!==We(c.barEnd)&&(d=0),d+=u);let h=!O(i)&&!l?i:d,g=t.getPixelForValue(h);if(p=this.chart.getDataVisibility(e)?t.getPixelForValue(d+f):g,m=p-g,Math.abs(m)<a){m=hi(m,t,o)*a,u===o&&(g-=m/2);let e=t.getPixelForDecimal(0),i=t.getPixelForDecimal(1);g=Math.max(Math.min(g,Math.max(e,i)),Math.min(e,i)),p=g+m,n&&!l&&(s._stacks[t.axis]._visualValues[r]=t.getValueForPixel(p)-t.getValueForPixel(g))}if(g===t.getPixelForValue(o)){let e=We(m)*t.getLineWidthForValue(o)/2;g+=e,m-=e}return{size:m,base:g,head:p,center:p+m/2}}_calculateBarIndexPixels(e,t){let n=t.scale,r=this.options,i=r.skipNull,a=M(r.maxBarThickness,1/0),o,s,c=this._getAxisCount();if(t.grouped){let n=i?this._getStackCount(e):t.stackCount,l=r.barThickness===`flex`?ui(e,t,r,n*c):li(e,t,r,n*c),u=this.chart.options.indexAxis===`x`?this.getDataset().xAxisID:this.getDataset().yAxisID,d=this._getAxis().indexOf(M(u,this.getFirstScaleIdForIndexAxis())),f=this._getStackIndex(this.index,this._cachedMeta.stack,i?e:void 0)+d;o=l.start+l.chunk*f+l.chunk/2,s=Math.min(a,l.chunk*l.ratio)}else o=n.getPixelForValue(this.getParsed(e)[n.axis],e),s=Math.min(a,t.min*t.ratio);return{base:o-s/2,head:o+s/2,center:o,size:s}}draw(){let e=this._cachedMeta,t=e.vScale,n=e.data,r=n.length,i=0;for(;i<r;++i)this.getParsed(i)[t.axis]!==null&&!n[i].hidden&&n[i].draw(this._ctx)}},Ci=class extends oi{static id=`bubble`;static defaults={datasetElementType:!1,dataElementType:`point`,animations:{numbers:{type:`number`,properties:[`x`,`y`,`borderWidth`,`radius`]}}};static overrides={scales:{x:{type:`linear`},y:{type:`linear`}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(e,t,n,r){let i=super.parsePrimitiveData(e,t,n,r);for(let e=0;e<i.length;e++)i[e]._custom=this.resolveDataElementOptions(e+n).radius;return i}parseArrayData(e,t,n,r){let i=super.parseArrayData(e,t,n,r);for(let e=0;e<i.length;e++){let r=t[n+e];i[e]._custom=M(r[2],this.resolveDataElementOptions(e+n).radius)}return i}parseObjectData(e,t,n,r){let i=super.parseObjectData(e,t,n,r);for(let e=0;e<i.length;e++){let r=t[n+e];i[e]._custom=M(r&&r.r&&+r.r,this.resolveDataElementOptions(e+n).radius)}return i}getMaxOverflow(){let e=this._cachedMeta.data,t=0;for(let n=e.length-1;n>=0;--n)t=Math.max(t,e[n].size(this.resolveDataElementOptions(n))/2);return t>0&&t}getLabelAndValue(e){let t=this._cachedMeta,n=this.chart.data.labels||[],{xScale:r,yScale:i}=t,a=this.getParsed(e),o=r.getLabelForValue(a.x),s=i.getLabelForValue(a.y),c=a._custom;return{label:n[e]||``,value:`(`+o+`, `+s+(c?`, `+c:``)+`)`}}update(e){let t=this._cachedMeta.data;this.updateElements(t,0,t.length,e)}updateElements(e,t,n,r){let i=r===`reset`,{iScale:a,vScale:o}=this._cachedMeta,{sharedOptions:s,includeOptions:c}=this._getSharedOptions(t,r),l=a.axis,u=o.axis;for(let d=t;d<t+n;d++){let t=e[d],n=!i&&this.getParsed(d),f={},p=f[l]=i?a.getPixelForDecimal(.5):a.getPixelForValue(n[l]),m=f[u]=i?o.getBasePixel():o.getPixelForValue(n[u]);f.skip=isNaN(p)||isNaN(m),c&&(f.options=s||this.resolveDataElementOptions(d,t.active?`active`:r),i&&(f.options.radius=0)),this.updateElement(t,d,f,r)}}resolveDataElementOptions(e,t){let n=this.getParsed(e),r=super.resolveDataElementOptions(e,t);r.$shared&&(r=Object.assign({},r,{$shared:!1}));let i=r.radius;return t!==`active`&&(r.radius=0),r.radius+=M(n&&n._custom,i),r}};function wi(e,t,n){let r=1,i=1,a=0,o=0;if(t<I){let s=e,c=s+t,l=Math.cos(s),u=Math.sin(s),d=Math.cos(c),f=Math.sin(c),p=(e,t,r)=>at(e,s,c,!0)?1:Math.max(t,t*n,r,r*n),m=(e,t,r)=>at(e,s,c,!0)?-1:Math.min(t,t*n,r,r*n),h=p(0,l,d),g=p(L,u,f),_=m(F,l,d),v=m(F+L,u,f);r=(h-_)/2,i=(g-v)/2,a=-(h+_)/2,o=-(g+v)/2}return{ratioX:r,ratioY:i,offsetX:a,offsetY:o}}var Ti=class extends oi{static id=`doughnut`;static defaults={datasetElementType:!1,dataElementType:`arc`,animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:`number`,properties:[`circumference`,`endAngle`,`innerRadius`,`outerRadius`,`startAngle`,`x`,`y`,`offset`,`borderWidth`,`spacing`]}},cutout:`50%`,rotation:0,circumference:360,radius:`100%`,spacing:0,indexAxis:`r`};static descriptors={_scriptable:e=>e!==`spacing`,_indexable:e=>e!==`spacing`&&!e.startsWith(`borderDash`)&&!e.startsWith(`hoverBorderDash`)};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){let t=e.data,{labels:{pointStyle:n,textAlign:r,color:i,useBorderRadius:a,borderRadius:o}}=e.legend.options;return t.labels.length&&t.datasets.length?t.labels.map((t,s)=>{let c=e.getDatasetMeta(0).controller.getStyle(s);return{text:t,fillStyle:c.backgroundColor,fontColor:i,hidden:!e.getDataVisibility(s),lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:c.borderWidth,strokeStyle:c.borderColor,textAlign:r,pointStyle:n,borderRadius:a&&(o||c.borderRadius),index:s}}):[]}},onClick(e,t,n){n.chart.toggleDataVisibility(t.index),n.chart.update()}}}};constructor(e,t){super(e,t),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(e,t){let n=this.getDataset().data,r=this._cachedMeta;if(this._parsing===!1)r._parsed=n;else{let i=e=>+n[e];if(A(n[e])){let{key:e=`value`}=this._parsing;i=t=>+Me(n[t],e)}let a,o;for(a=e,o=e+t;a<o;++a)r._parsed[a]=i(a)}}_getRotation(){return Qe(this.options.rotation-90)}_getCircumference(){return Qe(this.options.circumference)}_getRotationExtents(){let e=I,t=-I;for(let n=0;n<this.chart.data.datasets.length;++n)if(this.chart.isDatasetVisible(n)&&this.chart.getDatasetMeta(n).type===this._type){let r=this.chart.getDatasetMeta(n).controller,i=r._getRotation(),a=r._getCircumference();e=Math.min(e,i),t=Math.max(t,i+a)}return{rotation:e,circumference:t-e}}update(e){let{chartArea:t}=this.chart,n=this._cachedMeta,r=n.data,i=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,a=Math.max((Math.min(t.width,t.height)-i)/2,0),o=Math.min(be(this.options.cutout,a),1),s=this._getRingWeight(this.index),{circumference:c,rotation:l}=this._getRotationExtents(),{ratioX:u,ratioY:d,offsetX:f,offsetY:p}=wi(l,c,o),m=(t.width-i)/u,h=(t.height-i)/d,g=Math.max(Math.min(m,h)/2,0),_=xe(this.options.radius,g),v=(_-Math.max(_*o,0))/this._getVisibleDatasetWeightTotal();this.offsetX=f*_,this.offsetY=p*_,n.total=this.calculateTotal(),this.outerRadius=_-v*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-v*s,0),this.updateElements(r,0,r.length,e)}_circumference(e,t){let n=this.options,r=this._cachedMeta,i=this._getCircumference();return t&&n.animation.animateRotate||!this.chart.getDataVisibility(e)||r._parsed[e]===null||r.data[e].hidden?0:this.calculateCircumference(r._parsed[e]*i/I)}updateElements(e,t,n,r){let i=r===`reset`,a=this.chart,o=a.chartArea,s=a.options.animation,c=(o.left+o.right)/2,l=(o.top+o.bottom)/2,u=i&&s.animateScale,d=u?0:this.innerRadius,f=u?0:this.outerRadius,{sharedOptions:p,includeOptions:m}=this._getSharedOptions(t,r),h=this._getRotation(),g=0;for(;g<t;++g)h+=this._circumference(g,i);for(g=t;g<t+n;++g){let t=this._circumference(g,i),n=e[g],a={x:c+this.offsetX,y:l+this.offsetY,startAngle:h,endAngle:h+t,circumference:t,outerRadius:f,innerRadius:d};m&&(a.options=p||this.resolveDataElementOptions(g,n.active?`active`:r)),h+=t,this.updateElement(n,g,a,r)}}calculateTotal(){let e=this._cachedMeta,t=e.data,n=0,r=0;for(;r<t.length;r++){let i=e._parsed[r];i!==null&&!isNaN(i)&&this.chart.getDataVisibility(r)&&!t[r].hidden&&(n+=Math.abs(i))}return n}calculateCircumference(e){let t=this._cachedMeta.total;return t>0&&!isNaN(e)?Math.abs(e)/t*I:0}getLabelAndValue(e){let t=this._cachedMeta,n=this.chart,r=n.data.labels||[],i=It(t._parsed[e],n.options.locale);return{label:r[e]||``,value:i}}getMaxBorderWidth(e){let t=0,n=this.chart,r,i,a,o,s;if(!e){for(r=0,i=n.data.datasets.length;r<i;++r)if(n.isDatasetVisible(r)){a=n.getDatasetMeta(r),e=a.data,o=a.controller;break}}if(!e)return 0;for(r=0,i=e.length;r<i;++r)s=o.resolveDataElementOptions(r),s.borderAlign!==`inner`&&(t=Math.max(t,s.borderWidth||0,s.hoverBorderWidth||0));return t}getMaxOffset(e){let t=0;for(let n=0,r=e.length;n<r;++n){let e=this.resolveDataElementOptions(n);t=Math.max(t,e.offset||0,e.hoverOffset||0)}return t}_getRingWeightOffset(e){let t=0;for(let n=0;n<e;++n)this.chart.isDatasetVisible(n)&&(t+=this._getRingWeight(n));return t}_getRingWeight(e){return Math.max(M(this.chart.data.datasets[e].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}},Ei=class extends oi{static id=`line`;static defaults={datasetElementType:`line`,dataElementType:`point`,showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:`category`},_value_:{type:`linear`}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(e){let t=this._cachedMeta,{dataset:n,data:r=[],_dataset:i}=t,a=this.chart._animationsDisabled,{start:o,count:s}=xt(t,r,a);this._drawStart=o,this._drawCount=s,St(t)&&(o=0,s=r.length),n._chart=this.chart,n._datasetIndex=this.index,n._decimated=!!i._decimated,n.points=r;let c=this.resolveDatasetElementOptions(e);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(n,void 0,{animated:!a,options:c},e),this.updateElements(r,o,s,e)}updateElements(e,t,n,r){let i=r===`reset`,{iScale:a,vScale:o,_stacked:s,_dataset:c}=this._cachedMeta,{sharedOptions:l,includeOptions:u}=this._getSharedOptions(t,r),d=a.axis,f=o.axis,{spanGaps:p,segment:m}=this.options,h=Ye(p)?p:1/0,g=this.chart._animationsDisabled||i||r===`none`,_=t+n,v=e.length,y=t>0&&this.getParsed(t-1);for(let n=0;n<v;++n){let p=e[n],v=g?p:{};if(n<t||n>=_){v.skip=!0;continue}let b=this.getParsed(n),x=O(b[f]),S=v[d]=a.getPixelForValue(b[d],n),C=v[f]=i||x?o.getBasePixel():o.getPixelForValue(s?this.applyStack(o,b,s):b[f],n);v.skip=isNaN(S)||isNaN(C)||x,v.stop=n>0&&Math.abs(b[d]-y[d])>h,m&&(v.parsed=b,v.raw=c.data[n]),u&&(v.options=l||this.resolveDataElementOptions(n,p.active?`active`:r)),g||this.updateElement(p,n,v,r),y=b}}getMaxOverflow(){let e=this._cachedMeta,t=e.dataset,n=t.options&&t.options.borderWidth||0,r=e.data||[];if(!r.length)return n;let i=r[0].size(this.resolveDataElementOptions(0)),a=r[r.length-1].size(this.resolveDataElementOptions(r.length-1));return Math.max(n,i,a)/2}draw(){let e=this._cachedMeta;e.dataset.updateControlPoints(this.chart.chartArea,e.iScale.axis),super.draw()}},Di=class extends oi{static id=`polarArea`;static defaults={dataElementType:`arc`,animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:`number`,properties:[`x`,`y`,`startAngle`,`endAngle`,`innerRadius`,`outerRadius`]}},indexAxis:`r`,startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){let t=e.data;if(t.labels.length&&t.datasets.length){let{labels:{pointStyle:n,color:r}}=e.legend.options;return t.labels.map((t,i)=>{let a=e.getDatasetMeta(0).controller.getStyle(i);return{text:t,fillStyle:a.backgroundColor,strokeStyle:a.borderColor,fontColor:r,lineWidth:a.borderWidth,pointStyle:n,hidden:!e.getDataVisibility(i),index:i}})}return[]}},onClick(e,t,n){n.chart.toggleDataVisibility(t.index),n.chart.update()}}},scales:{r:{type:`radialLinear`,angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(e,t){super(e,t),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(e){let t=this._cachedMeta,n=this.chart,r=n.data.labels||[],i=It(t._parsed[e].r,n.options.locale);return{label:r[e]||``,value:i}}parseObjectData(e,t,n,r){return Rn.bind(this)(e,t,n,r)}update(e){let t=this._cachedMeta.data;this._updateRadius(),this.updateElements(t,0,t.length,e)}getMinMax(){let e=this._cachedMeta,t={min:1/0,max:-1/0};return e.data.forEach((e,n)=>{let r=this.getParsed(n).r;!isNaN(r)&&this.chart.getDataVisibility(n)&&(r<t.min&&(t.min=r),r>t.max&&(t.max=r))}),t}_updateRadius(){let e=this.chart,t=e.chartArea,n=e.options,r=Math.min(t.right-t.left,t.bottom-t.top),i=Math.max(r/2,0),a=(i-Math.max(n.cutoutPercentage?i/100*n.cutoutPercentage:1,0))/e.getVisibleDatasetCount();this.outerRadius=i-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(e,t,n,r){let i=r===`reset`,a=this.chart,o=a.options.animation,s=this._cachedMeta.rScale,c=s.xCenter,l=s.yCenter,u=s.getIndexAngle(0)-.5*F,d=u,f,p=360/this.countVisibleElements();for(f=0;f<t;++f)d+=this._computeAngle(f,r,p);for(f=t;f<t+n;f++){let t=e[f],n=d,m=d+this._computeAngle(f,r,p),h=a.getDataVisibility(f)?s.getDistanceFromCenterForValue(this.getParsed(f).r):0;d=m,i&&(o.animateScale&&(h=0),o.animateRotate&&(n=m=u));let g={x:c,y:l,innerRadius:0,outerRadius:h,startAngle:n,endAngle:m,options:this.resolveDataElementOptions(f,t.active?`active`:r)};this.updateElement(t,f,g,r)}}countVisibleElements(){let e=this._cachedMeta,t=0;return e.data.forEach((e,n)=>{!isNaN(this.getParsed(n).r)&&this.chart.getDataVisibility(n)&&t++}),t}_computeAngle(e,t,n){return this.chart.getDataVisibility(e)?Qe(this.resolveDataElementOptions(e,t).angle||n):0}},Oi=Object.freeze({__proto__:null,BarController:Si,BubbleController:Ci,DoughnutController:Ti,LineController:Ei,PieController:class extends Ti{static id=`pie`;static defaults={cutout:0,rotation:0,circumference:360,radius:`100%`}},PolarAreaController:Di,RadarController:class extends oi{static id=`radar`;static defaults={datasetElementType:`line`,dataElementType:`point`,indexAxis:`r`,showLine:!0,elements:{line:{fill:`start`}}};static overrides={aspectRatio:1,scales:{r:{type:`radialLinear`}}};getLabelAndValue(e){let t=this._cachedMeta.vScale,n=this.getParsed(e);return{label:t.getLabels()[e],value:``+t.getLabelForValue(n[t.axis])}}parseObjectData(e,t,n,r){return Rn.bind(this)(e,t,n,r)}update(e){let t=this._cachedMeta,n=t.dataset,r=t.data||[],i=t.iScale.getLabels();if(n.points=r,e!==`resize`){let t=this.resolveDatasetElementOptions(e);this.options.showLine||(t.borderWidth=0);let a={_loop:!0,_fullLoop:i.length===r.length,options:t};this.updateElement(n,void 0,a,e)}this.updateElements(r,0,r.length,e)}updateElements(e,t,n,r){let i=this._cachedMeta.rScale,a=r===`reset`;for(let o=t;o<t+n;o++){let t=e[o],n=this.resolveDataElementOptions(o,t.active?`active`:r),s=i.getPointPositionForValue(o,this.getParsed(o).r),c=a?i.xCenter:s.x,l=a?i.yCenter:s.y,u={x:c,y:l,angle:s.angle,skip:isNaN(c)||isNaN(l),options:n};this.updateElement(t,o,u,r)}}},ScatterController:class extends oi{static id=`scatter`;static defaults={datasetElementType:!1,dataElementType:`point`,showLine:!1,fill:!1};static overrides={interaction:{mode:`point`},scales:{x:{type:`linear`},y:{type:`linear`}}};getLabelAndValue(e){let t=this._cachedMeta,n=this.chart.data.labels||[],{xScale:r,yScale:i}=t,a=this.getParsed(e),o=r.getLabelForValue(a.x),s=i.getLabelForValue(a.y);return{label:n[e]||``,value:`(`+o+`, `+s+`)`}}update(e){let t=this._cachedMeta,{data:n=[]}=t,r=this.chart._animationsDisabled,{start:i,count:a}=xt(t,n,r);if(this._drawStart=i,this._drawCount=a,St(t)&&(i=0,a=n.length),this.options.showLine){this.datasetElementType||this.addElements();let{dataset:i,_dataset:a}=t;i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!a._decimated,i.points=n;let o=this.resolveDatasetElementOptions(e);o.segment=this.options.segment,this.updateElement(i,void 0,{animated:!r,options:o},e)}else this.datasetElementType&&=(delete t.dataset,!1);this.updateElements(n,i,a,e)}addElements(){let{showLine:e}=this.options;!this.datasetElementType&&e&&(this.datasetElementType=this.chart.registry.getElement(`line`)),super.addElements()}updateElements(e,t,n,r){let i=r===`reset`,{iScale:a,vScale:o,_stacked:s,_dataset:c}=this._cachedMeta,l=this.resolveDataElementOptions(t,r),u=this.getSharedOptions(l),d=this.includeOptions(r,u),f=a.axis,p=o.axis,{spanGaps:m,segment:h}=this.options,g=Ye(m)?m:1/0,_=this.chart._animationsDisabled||i||r===`none`,v=t>0&&this.getParsed(t-1);for(let l=t;l<t+n;++l){let t=e[l],n=this.getParsed(l),m=_?t:{},y=O(n[p]),b=m[f]=a.getPixelForValue(n[f],l),x=m[p]=i||y?o.getBasePixel():o.getPixelForValue(s?this.applyStack(o,n,s):n[p],l);m.skip=isNaN(b)||isNaN(x)||y,m.stop=l>0&&Math.abs(n[f]-v[f])>g,h&&(m.parsed=n,m.raw=c.data[l]),d&&(m.options=u||this.resolveDataElementOptions(l,t.active?`active`:r)),_||this.updateElement(t,l,m,r),v=n}this.updateSharedOptions(u,r,l)}getMaxOverflow(){let e=this._cachedMeta,t=e.data||[];if(!this.options.showLine){let e=0;for(let n=t.length-1;n>=0;--n)e=Math.max(e,t[n].size(this.resolveDataElementOptions(n))/2);return e>0&&e}let n=e.dataset,r=n.options&&n.options.borderWidth||0;if(!t.length)return r;let i=t[0].size(this.resolveDataElementOptions(0)),a=t[t.length-1].size(this.resolveDataElementOptions(t.length-1));return Math.max(r,i,a)/2}}});function ki(){throw Error(`This method is not implemented: Check that a complete date adapter is provided.`)}var Ai={_date:class e{static override(t){Object.assign(e.prototype,t)}options;constructor(e){this.options=e||{}}init(){}formats(){return ki()}parse(){return ki()}format(){return ki()}add(){return ki()}diff(){return ki()}startOf(){return ki()}endOf(){return ki()}}};function ji(e,t,n,r){let{controller:i,data:a,_sorted:o}=e,s=i._cachedMeta.iScale,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(s&&t===s.axis&&t!==`r`&&o&&a.length){let o=s._reversePixels?ut:lt;if(!r){let r=o(a,t,n);if(c){let{vScale:t}=i._cachedMeta,{_parsed:n}=e,a=n.slice(0,r.lo+1).reverse().findIndex(e=>!O(e[t.axis]));r.lo-=Math.max(0,a);let o=n.slice(r.hi).findIndex(e=>!O(e[t.axis]));r.hi+=Math.max(0,o)}return r}if(i._sharedOptions){let e=a[0],r=typeof e.getRange==`function`&&e.getRange(t);if(r){let e=o(a,t,n-r),i=o(a,t,n+r);return{lo:e.lo,hi:i.hi}}}}return{lo:0,hi:a.length-1}}function Mi(e,t,n,r,i){let a=e.getSortedVisibleDatasetMetas(),o=n[t];for(let e=0,n=a.length;e<n;++e){let{index:n,data:s}=a[e],{lo:c,hi:l}=ji(a[e],t,o,i);for(let e=c;e<=l;++e){let t=s[e];t.skip||r(t,n,e)}}}function Ni(e){let t=e.indexOf(`x`)!==-1,n=e.indexOf(`y`)!==-1;return function(e,r){let i=t?Math.abs(e.x-r.x):0,a=n?Math.abs(e.y-r.y):0;return Math.sqrt(i**2+a**2)}}function Pi(e,t,n,r,i){let a=[];return!i&&!e.isPointInArea(t)||Mi(e,n,t,function(n,o,s){(i||Qt(n,e.chartArea,0))&&n.inRange(t.x,t.y,r)&&a.push({element:n,datasetIndex:o,index:s})},!0),a}function Fi(e,t,n,r){let i=[];function a(e,n,a){let{startAngle:o,endAngle:s}=e.getProps([`startAngle`,`endAngle`],r),{angle:c}=tt(e,{x:t.x,y:t.y});at(c,o,s)&&i.push({element:e,datasetIndex:n,index:a})}return Mi(e,n,t,a),i}function Ii(e,t,n,r,i,a){let o=[],s=Ni(n),c=1/0;function l(n,l,u){let d=n.inRange(t.x,t.y,i);if(r&&!d)return;let f=n.getCenterPoint(i);if(!(a||e.isPointInArea(f))&&!d)return;let p=s(t,f);p<c?(o=[{element:n,datasetIndex:l,index:u}],c=p):p===c&&o.push({element:n,datasetIndex:l,index:u})}return Mi(e,n,t,l),o}function Li(e,t,n,r,i,a){return!a&&!e.isPointInArea(t)?[]:n===`r`&&!r?Fi(e,t,n,i):Ii(e,t,n,r,i,a)}function Ri(e,t,n,r,i){let a=[],o=n===`x`?`inXRange`:`inYRange`,s=!1;return Mi(e,n,t,(e,r,c)=>{e[o]&&e[o](t[n],i)&&(a.push({element:e,datasetIndex:r,index:c}),s||=e.inRange(t.x,t.y,i))}),r&&!s?[]:a}var zi={evaluateInteractionItems:Mi,modes:{index(e,t,n,r){let i=ir(t,e),a=n.axis||`x`,o=n.includeInvisible||!1,s=n.intersect?Pi(e,i,a,r,o):Li(e,i,a,!1,r,o),c=[];return s.length?(e.getSortedVisibleDatasetMetas().forEach(e=>{let t=s[0].index,n=e.data[t];n&&!n.skip&&c.push({element:n,datasetIndex:e.index,index:t})}),c):[]},dataset(e,t,n,r){let i=ir(t,e),a=n.axis||`xy`,o=n.includeInvisible||!1,s=n.intersect?Pi(e,i,a,r,o):Li(e,i,a,!1,r,o);if(s.length>0){let t=s[0].datasetIndex,n=e.getDatasetMeta(t).data;s=[];for(let e=0;e<n.length;++e)s.push({element:n[e],datasetIndex:t,index:e})}return s},point(e,t,n,r){return Pi(e,ir(t,e),n.axis||`xy`,r,n.includeInvisible||!1)},nearest(e,t,n,r){let i=ir(t,e),a=n.axis||`xy`,o=n.includeInvisible||!1;return Li(e,i,a,n.intersect,r,o)},x(e,t,n,r){return Ri(e,ir(t,e),`x`,n.intersect,r)},y(e,t,n,r){return Ri(e,ir(t,e),`y`,n.intersect,r)}}},Bi=[`left`,`top`,`right`,`bottom`];function Vi(e,t){return e.filter(e=>e.pos===t)}function Hi(e,t){return e.filter(e=>Bi.indexOf(e.pos)===-1&&e.box.axis===t)}function Ui(e,t){return e.sort((e,n)=>{let r=t?n:e,i=t?e:n;return r.weight===i.weight?r.index-i.index:r.weight-i.weight})}function Wi(e){let t=[],n,r,i,a,o,s;for(n=0,r=(e||[]).length;n<r;++n)i=e[n],{position:a,options:{stack:o,stackWeight:s=1}}=i,t.push({index:n,box:i,pos:a,horizontal:i.isHorizontal(),weight:i.weight,stack:o&&a+o,stackWeight:s});return t}function Gi(e){let t={};for(let n of e){let{stack:e,pos:r,stackWeight:i}=n;if(!e||!Bi.includes(r))continue;let a=t[e]||(t[e]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=i}return t}function Ki(e,t){let n=Gi(e),{vBoxMaxWidth:r,hBoxMaxHeight:i}=t,a,o,s;for(a=0,o=e.length;a<o;++a){s=e[a];let{fullSize:o}=s.box,c=n[s.stack],l=c&&s.stackWeight/c.weight;s.horizontal?(s.width=l?l*r:o&&t.availableWidth,s.height=i):(s.width=r,s.height=l?l*i:o&&t.availableHeight)}return n}function qi(e){let t=Wi(e),n=Ui(t.filter(e=>e.box.fullSize),!0),r=Ui(Vi(t,`left`),!0),i=Ui(Vi(t,`right`)),a=Ui(Vi(t,`top`),!0),o=Ui(Vi(t,`bottom`)),s=Hi(t,`x`),c=Hi(t,`y`);return{fullSize:n,leftAndTop:r.concat(a),rightAndBottom:i.concat(c).concat(o).concat(s),chartArea:Vi(t,`chartArea`),vertical:r.concat(i).concat(c),horizontal:a.concat(o).concat(s)}}function Ji(e,t,n,r){return Math.max(e[n],t[n])+Math.max(e[r],t[r])}function Yi(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function Xi(e,t,n,r){let{pos:i,box:a}=n,o=e.maxPadding;if(!A(i)){n.size&&(e[i]-=n.size);let t=r[n.stack]||{size:0,count:1};t.size=Math.max(t.size,n.horizontal?a.height:a.width),n.size=t.size/t.count,e[i]+=n.size}a.getPadding&&Yi(o,a.getPadding());let s=Math.max(0,t.outerWidth-Ji(o,e,`left`,`right`)),c=Math.max(0,t.outerHeight-Ji(o,e,`top`,`bottom`)),l=s!==e.w,u=c!==e.h;return e.w=s,e.h=c,n.horizontal?{same:l,other:u}:{same:u,other:l}}function Zi(e){let t=e.maxPadding;function n(n){let r=Math.max(t[n]-e[n],0);return e[n]+=r,r}e.y+=n(`top`),e.x+=n(`left`),n(`right`),n(`bottom`)}function Qi(e,t){let n=t.maxPadding;function r(e){let r={left:0,top:0,right:0,bottom:0};return e.forEach(e=>{r[e]=Math.max(t[e],n[e])}),r}return r(e?[`left`,`right`]:[`top`,`bottom`])}function $i(e,t,n,r){let i=[],a,o,s,c,l,u;for(a=0,o=e.length,l=0;a<o;++a){s=e[a],c=s.box,c.update(s.width||t.w,s.height||t.h,Qi(s.horizontal,t));let{same:o,other:d}=Xi(t,n,s,r);l|=o&&i.length,u||=d,c.fullSize||i.push(s)}return l&&$i(i,t,n,r)||u}function ea(e,t,n,r,i){e.top=n,e.left=t,e.right=t+r,e.bottom=n+i,e.width=r,e.height=i}function ta(e,t,n,r){let i=n.padding,{x:a,y:o}=t;for(let s of e){let e=s.box,c=r[s.stack]||{count:1,placed:0,weight:1},l=s.stackWeight/c.weight||1;if(s.horizontal){let r=t.w*l,a=c.size||e.height;Pe(c.start)&&(o=c.start),e.fullSize?ea(e,i.left,o,n.outerWidth-i.right-i.left,a):ea(e,t.left+c.placed,o,r,a),c.start=o,c.placed+=r,o=e.bottom}else{let r=t.h*l,o=c.size||e.width;Pe(c.start)&&(a=c.start),e.fullSize?ea(e,a,i.top,o,n.outerHeight-i.bottom-i.top):ea(e,a,t.top+c.placed,o,r),c.start=a,c.placed+=r,a=e.right}}t.x=a,t.y=o}var U={addBox(e,t){e.boxes||=[],t.fullSize=t.fullSize||!1,t.position=t.position||`top`,t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},e.boxes.push(t)},removeBox(e,t){let n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,r){if(!e)return;let i=V(e.options.layout.padding),a=Math.max(t-i.width,0),o=Math.max(n-i.height,0),s=qi(e.boxes),c=s.vertical,l=s.horizontal;P(e.boxes,e=>{typeof e.beforeLayout==`function`&&e.beforeLayout()});let u=c.reduce((e,t)=>t.box.options&&t.box.options.display===!1?e:e+1,0)||1,d=Object.freeze({outerWidth:t,outerHeight:n,padding:i,availableWidth:a,availableHeight:o,vBoxMaxWidth:a/2/u,hBoxMaxHeight:o/2}),f=Object.assign({},i);Yi(f,V(r));let p=Object.assign({maxPadding:f,w:a,h:o,x:i.left,y:i.top},i),m=Ki(c.concat(l),d);$i(s.fullSize,p,d,m),$i(c,p,d,m),$i(l,p,d,m)&&$i(c,p,d,m),Zi(p),ta(s.leftAndTop,p,d,m),p.x+=p.w,p.y+=p.h,ta(s.rightAndBottom,p,d,m),e.chartArea={left:p.left,top:p.top,right:p.left+p.w,bottom:p.top+p.h,height:p.h,width:p.w},P(s.chartArea,t=>{let n=t.box;Object.assign(n,e.chartArea),n.update(p.w,p.h,{left:0,top:0,right:0,bottom:0})})}},na=class{acquireContext(e,t){}releaseContext(e){return!1}addEventListener(e,t,n){}removeEventListener(e,t,n){}getDevicePixelRatio(){return 1}getMaximumSize(e,t,n,r){return t=Math.max(0,t||e.width),n||=e.height,{width:t,height:Math.max(0,r?Math.floor(t/r):n)}}isAttached(e){return!0}updateConfig(e){}},ra=class extends na{acquireContext(e){return e&&e.getContext&&e.getContext(`2d`)||null}updateConfig(e){e.options.animation=!1}},ia=`$chartjs`,aa={touchstart:`mousedown`,touchmove:`mousemove`,touchend:`mouseup`,pointerenter:`mouseenter`,pointerdown:`mousedown`,pointermove:`mousemove`,pointerup:`mouseup`,pointerleave:`mouseout`,pointerout:`mouseout`},oa=e=>e===null||e===``;function sa(e,t){let n=e.style,r=e.getAttribute(`height`),i=e.getAttribute(`width`);if(e[ia]={initial:{height:r,width:i,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||`block`,n.boxSizing=n.boxSizing||`border-box`,oa(i)){let t=ur(e,`width`);t!==void 0&&(e.width=t)}if(oa(r)){if(e.style.height===``)e.height=e.width/(t||2);else{let t=ur(e,`height`);t!==void 0&&(e.height=t)}}return e}var ca=lr?{passive:!0}:!1;function la(e,t,n){e&&e.addEventListener(t,n,ca)}function ua(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,ca)}function da(e,t){let n=aa[e.type]||e.type,{x:r,y:i}=ir(e,t);return{type:n,chart:t,native:e,x:r===void 0?null:r,y:i===void 0?null:i}}function fa(e,t){for(let n of e)if(n===t||n.contains(t))return!0}function pa(e,t,n){let r=e.canvas,i=new MutationObserver(e=>{let t=!1;for(let n of e)t||=fa(n.addedNodes,r),t&&=!fa(n.removedNodes,r);t&&n()});return i.observe(document,{childList:!0,subtree:!0}),i}function ma(e,t,n){let r=e.canvas,i=new MutationObserver(e=>{let t=!1;for(let n of e)t||=fa(n.removedNodes,r),t&&=!fa(n.addedNodes,r);t&&n()});return i.observe(document,{childList:!0,subtree:!0}),i}var ha=new Map,ga=0;function _a(){let e=window.devicePixelRatio;e!==ga&&(ga=e,ha.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function va(e,t){ha.size||window.addEventListener(`resize`,_a),ha.set(e,t)}function ya(e){ha.delete(e),ha.size||window.removeEventListener(`resize`,_a)}function ba(e,t,n){let r=e.canvas,i=r&&Xn(r);if(!i)return;let a=_t((e,t)=>{let r=i.clientWidth;n(e,t),r<i.clientWidth&&n()},window),o=new ResizeObserver(e=>{let t=e[0],n=t.contentRect.width,r=t.contentRect.height;(n!==0||r!==0)&&a(n,r)});return o.observe(i),va(e,a),o}function xa(e,t,n){n&&n.disconnect(),t===`resize`&&ya(e)}function Sa(e,t,n){let r=e.canvas,i=_t(t=>{e.ctx!==null&&n(da(t,e))},e);return la(r,t,i),i}var Ca=class extends na{acquireContext(e,t){let n=e&&e.getContext&&e.getContext(`2d`);return n&&n.canvas===e?(sa(e,t),n):null}releaseContext(e){let t=e.canvas;if(!t[ia])return!1;let n=t[ia].initial;[`height`,`width`].forEach(e=>{let r=n[e];O(r)?t.removeAttribute(e):t.setAttribute(e,r)});let r=n.style||{};return Object.keys(r).forEach(e=>{t.style[e]=r[e]}),t.width=t.width,delete t[ia],!0}addEventListener(e,t,n){this.removeEventListener(e,t);let r=e.$proxies||={};r[t]=({attach:pa,detach:ma,resize:ba}[t]||Sa)(e,t,n)}removeEventListener(e,t){let n=e.$proxies||={},r=n[t];r&&(({attach:xa,detach:xa,resize:xa}[t]||ua)(e,t,r),n[t]=void 0)}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(e,t,n,r){return sr(e,t,n,r)}isAttached(e){let t=e&&Xn(e);return!!(t&&t.isConnected)}};function wa(e){return!Yn()||typeof OffscreenCanvas<`u`&&e instanceof OffscreenCanvas?ra:Ca}var Ta=class{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(e){let{x:t,y:n}=this.getProps([`x`,`y`],e);return{x:t,y:n}}hasValue(){return Ye(this.x)&&Ye(this.y)}getProps(e,t){let n=this.$animations;if(!t||!n)return this;let r={};return e.forEach(e=>{r[e]=n[e]&&n[e].active()?n[e]._to:this[e]}),r}};function Ea(e,t){let n=e.options.ticks,r=Da(e),i=Math.min(n.maxTicksLimit||r,r),a=n.major.enabled?ka(t):[],o=a.length,s=a[0],c=a[o-1],l=[];if(o>i)return Aa(t,l,a,o/i),l;let u=Oa(a,t,i);if(o>0){let e,n,r=o>1?Math.round((c-s)/(o-1)):null;for(ja(t,l,u,O(r)?0:s-r,s),e=0,n=o-1;e<n;e++)ja(t,l,u,a[e],a[e+1]);return ja(t,l,u,c,O(r)?t.length:c+r),l}return ja(t,l,u),l}function Da(e){let t=e.options.offset,n=e._tickSize(),r=e._length/n+ +!t,i=e._maxLength/n;return Math.floor(Math.min(r,i))}function Oa(e,t,n){let r=Ma(e),i=t.length/n;if(!r)return Math.max(i,1);let a=qe(r);for(let e=0,t=a.length-1;e<t;e++){let t=a[e];if(t>i)return t}return Math.max(i,1)}function ka(e){let t=[],n,r;for(n=0,r=e.length;n<r;n++)e[n].major&&t.push(n);return t}function Aa(e,t,n,r){let i=0,a=n[0],o;for(r=Math.ceil(r),o=0;o<e.length;o++)o===a&&(t.push(e[o]),i++,a=n[i*r])}function ja(e,t,n,r,i){let a=M(r,0),o=Math.min(M(i,e.length),e.length),s=0,c,l,u;for(n=Math.ceil(n),i&&(c=i-r,n=c/Math.floor(c/n)),u=a;u<0;)s++,u=Math.round(a+s*n);for(l=Math.max(a,0);l<o;l++)l===u&&(t.push(e[l]),s++,u=Math.round(a+s*n))}function Ma(e){let t=e.length,n,r;if(t<2)return!1;for(r=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==r)return!1;return r}var Na=e=>e===`left`?`right`:e===`right`?`left`:e,Pa=(e,t,n)=>t===`top`||t===`left`?e[t]+n:e[t]-n,Fa=(e,t)=>Math.min(t||e,e);function Ia(e,t){let n=[],r=e.length/t,i=e.length,a=0;for(;a<i;a+=r)n.push(e[Math.floor(a)]);return n}function La(e,t,n){let r=e.ticks.length,i=Math.min(t,r-1),a=e._startPixel,o=e._endPixel,s=1e-6,c=e.getPixelForTick(i),l;if(!(n&&(l=r===1?Math.max(c-a,o-c):t===0?(e.getPixelForTick(1)-c)/2:(c-e.getPixelForTick(i-1))/2,c+=i<t?l:-l,c<a-s||c>o+s)))return c}function Ra(e,t){P(e,e=>{let n=e.gc,r=n.length/2,i;if(r>t){for(i=0;i<r;++i)delete e.data[n[i]];n.splice(0,r)}})}function za(e){return e.drawTicks?e.tickLength:0}function Ba(e,t){if(!e.display)return 0;let n=H(e.font,t),r=V(e.padding);return(k(e.text)?e.text.length:1)*n.lineHeight+r.height}function Va(e,t){return vn(e,{scale:t,type:`scale`})}function Ha(e,t,n){return vn(e,{tick:n,index:t,type:`tick`})}function Ua(e,t,n){let r=yt(e);return(n&&t!==`right`||!n&&t===`right`)&&(r=Na(r)),r}function Wa(e,t,n,r){let{top:i,left:a,bottom:o,right:s,chart:c}=e,{chartArea:l,scales:u}=c,d=0,f,p,m,h=o-i,g=s-a;if(e.isHorizontal()){if(p=z(r,a,s),A(n)){let e=Object.keys(n)[0],r=n[e];m=u[e].getPixelForValue(r)+h-t}else m=n===`center`?(l.bottom+l.top)/2+h-t:Pa(e,n,t);f=s-a}else{if(A(n)){let e=Object.keys(n)[0],r=n[e];p=u[e].getPixelForValue(r)-g+t}else p=n===`center`?(l.left+l.right)/2-g+t:Pa(e,n,t);m=z(r,o,i),d=n===`left`?-L:L}return{titleX:p,titleY:m,maxWidth:f,rotation:d}}var Ga=class e extends Ta{constructor(e){super(),this.id=e.id,this.type=e.type,this.options=void 0,this.ctx=e.ctx,this.chart=e.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(e){this.options=e.setContext(this.getContext()),this.axis=e.axis,this._userMin=this.parse(e.min),this._userMax=this.parse(e.max),this._suggestedMin=this.parse(e.suggestedMin),this._suggestedMax=this.parse(e.suggestedMax)}parse(e,t){return e}getUserBounds(){let{_userMin:e,_userMax:t,_suggestedMin:n,_suggestedMax:r}=this;return e=ye(e,1/0),t=ye(t,-1/0),n=ye(n,1/0),r=ye(r,-1/0),{min:ye(e,n),max:ye(t,r),minDefined:j(e),maxDefined:j(t)}}getMinMax(e){let{min:t,max:n,minDefined:r,maxDefined:i}=this.getUserBounds(),a;if(r&&i)return{min:t,max:n};let o=this.getMatchingVisibleMetas();for(let s=0,c=o.length;s<c;++s)a=o[s].controller.getMinMax(this,e),r||(t=Math.min(t,a.min)),i||(n=Math.max(n,a.max));return t=i&&t>n?n:t,n=r&&t>n?t:n,{min:ye(t,ye(n,t)),max:ye(n,ye(t,n))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){let e=this.chart.data;return this.options.labels||(this.isHorizontal()?e.xLabels:e.yLabels)||e.labels||[]}getLabelItems(e=this.chart.chartArea){return this._labelItems||=this._computeLabelItems(e)}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){N(this.options.beforeUpdate,[this])}update(e,t,n){let{beginAtZero:r,grace:i,ticks:a}=this.options,o=a.sampleSize;this.beforeUpdate(),this.maxWidth=e,this.maxHeight=t,this._margins=n=Object.assign({left:0,right:0,top:0,bottom:0},n),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+n.left+n.right:this.height+n.top+n.bottom,this._dataLimitsCached||=(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=_n(this,i,r),!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();let s=o<this.ticks.length;this._convertTicksToLabels(s?Ia(this.ticks,o):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source===`auto`)&&(this.ticks=Ea(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),s&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let e=this.options.reverse,t,n;this.isHorizontal()?(t=this.left,n=this.right):(t=this.top,n=this.bottom,e=!e),this._startPixel=t,this._endPixel=n,this._reversePixels=e,this._length=n-t,this._alignToPixels=this.options.alignToPixels}afterUpdate(){N(this.options.afterUpdate,[this])}beforeSetDimensions(){N(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){N(this.options.afterSetDimensions,[this])}_callHooks(e){this.chart.notifyPlugins(e,this.getContext()),N(this.options[e],[this])}beforeDataLimits(){this._callHooks(`beforeDataLimits`)}determineDataLimits(){}afterDataLimits(){this._callHooks(`afterDataLimits`)}beforeBuildTicks(){this._callHooks(`beforeBuildTicks`)}buildTicks(){return[]}afterBuildTicks(){this._callHooks(`afterBuildTicks`)}beforeTickToLabelConversion(){N(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(e){let t=this.options.ticks,n,r,i;for(n=0,r=e.length;n<r;n++)i=e[n],i.label=N(t.callback,[i.value,n,e],this)}afterTickToLabelConversion(){N(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){N(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){let e=this.options,t=e.ticks,n=Fa(this.ticks.length,e.ticks.maxTicksLimit),r=t.minRotation||0,i=t.maxRotation,a=r,o,s,c;if(!this._isVisible()||!t.display||r>=i||n<=1||!this.isHorizontal()){this.labelRotation=r;return}let l=this._getLabelSizes(),u=l.widest.width,d=l.highest.height,f=R(this.chart.width-u,0,this.maxWidth);o=e.offset?this.maxWidth/n:f/(n-1),u+6>o&&(o=f/(n-(e.offset?.5:1)),s=this.maxHeight-za(e.grid)-t.padding-Ba(e.title,this.chart.options.font),c=Math.sqrt(u*u+d*d),a=$e(Math.min(Math.asin(R((l.highest.height+6)/o,-1,1)),Math.asin(R(s/c,-1,1))-Math.asin(R(d/c,-1,1)))),a=Math.max(r,Math.min(i,a))),this.labelRotation=a}afterCalculateLabelRotation(){N(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){N(this.options.beforeFit,[this])}fit(){let e={width:0,height:0},{chart:t,options:{ticks:n,title:r,grid:i}}=this,a=this._isVisible(),o=this.isHorizontal();if(a){let a=Ba(r,t.options.font);if(o?(e.width=this.maxWidth,e.height=za(i)+a):(e.height=this.maxHeight,e.width=za(i)+a),n.display&&this.ticks.length){let{first:t,last:r,widest:i,highest:a}=this._getLabelSizes(),s=n.padding*2,c=Qe(this.labelRotation),l=Math.cos(c),u=Math.sin(c);if(o){let t=n.mirror?0:u*i.width+l*a.height;e.height=Math.min(this.maxHeight,e.height+t+s)}else{let t=n.mirror?0:l*i.width+u*a.height;e.width=Math.min(this.maxWidth,e.width+t+s)}this._calculatePadding(t,r,u,l)}}this._handleMargins(),o?(this.width=this._length=t.width-this._margins.left-this._margins.right,this.height=e.height):(this.width=e.width,this.height=this._length=t.height-this._margins.top-this._margins.bottom)}_calculatePadding(e,t,n,r){let{ticks:{align:i,padding:a},position:o}=this.options,s=this.labelRotation!==0,c=o!==`top`&&this.axis===`x`;if(this.isHorizontal()){let o=this.getPixelForTick(0)-this.left,l=this.right-this.getPixelForTick(this.ticks.length-1),u=0,d=0;s?c?(u=r*e.width,d=n*t.height):(u=n*e.height,d=r*t.width):i===`start`?d=t.width:i===`end`?u=e.width:i!==`inner`&&(u=e.width/2,d=t.width/2),this.paddingLeft=Math.max((u-o+a)*this.width/(this.width-o),0),this.paddingRight=Math.max((d-l+a)*this.width/(this.width-l),0)}else{let n=t.height/2,r=e.height/2;i===`start`?(n=0,r=e.height):i===`end`&&(n=t.height,r=0),this.paddingTop=n+a,this.paddingBottom=r+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){N(this.options.afterFit,[this])}isHorizontal(){let{axis:e,position:t}=this.options;return t===`top`||t===`bottom`||e===`x`}isFullSize(){return this.options.fullSize}_convertTicksToLabels(e){this.beforeTickToLabelConversion(),this.generateTickLabels(e);let t,n;for(t=0,n=e.length;t<n;t++)O(e[t].label)&&(e.splice(t,1),n--,t--);this.afterTickToLabelConversion()}_getLabelSizes(){let e=this._labelSizes;if(!e){let t=this.options.ticks.sampleSize,n=this.ticks;t<n.length&&(n=Ia(n,t)),this._labelSizes=e=this._computeLabelSizes(n,n.length,this.options.ticks.maxTicksLimit)}return e}_computeLabelSizes(e,t,n){let{ctx:r,_longestTextCache:i}=this,a=[],o=[],s=Math.floor(t/Fa(t,n)),c=0,l=0,u,d,f,p,m,h,g,_,v,y,b;for(u=0;u<t;u+=s){if(p=e[u].label,m=this._resolveTickFontOptions(u),r.font=h=m.string,g=i[h]=i[h]||{data:{},gc:[]},_=m.lineHeight,v=y=0,!O(p)&&!k(p))v=Kt(r,g.data,g.gc,v,p),y=_;else if(k(p))for(d=0,f=p.length;d<f;++d)b=p[d],!O(b)&&!k(b)&&(v=Kt(r,g.data,g.gc,v,b),y+=_);a.push(v),o.push(y),c=Math.max(v,c),l=Math.max(y,l)}Ra(i,t);let x=a.indexOf(c),S=o.indexOf(l),C=e=>({width:a[e]||0,height:o[e]||0});return{first:C(0),last:C(t-1),widest:C(x),highest:C(S),widths:a,heights:o}}getLabelForValue(e){return e}getPixelForValue(e,t){return NaN}getValueForPixel(e){}getPixelForTick(e){let t=this.ticks;return e<0||e>t.length-1?null:this.getPixelForValue(t[e].value)}getPixelForDecimal(e){this._reversePixels&&(e=1-e);let t=this._startPixel+e*this._length;return ot(this._alignToPixels?Jt(this.chart,t,0):t)}getDecimalForPixel(e){let t=(e-this._startPixel)/this._length;return this._reversePixels?1-t:t}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){let{min:e,max:t}=this;return e<0&&t<0?t:e>0&&t>0?e:0}getContext(e){let t=this.ticks||[];if(e>=0&&e<t.length){let n=t[e];return n.$context||=Ha(this.getContext(),e,n)}return this.$context||=Va(this.chart.getContext(),this)}_tickSize(){let e=this.options.ticks,t=Qe(this.labelRotation),n=Math.abs(Math.cos(t)),r=Math.abs(Math.sin(t)),i=this._getLabelSizes(),a=e.autoSkipPadding||0,o=i?i.widest.width+a:0,s=i?i.highest.height+a:0;return this.isHorizontal()?s*n>o*r?o/n:s/r:s*r<o*n?s/n:o/r}_isVisible(){let e=this.options.display;return e===`auto`?this.getMatchingVisibleMetas().length>0:!!e}_computeGridLineItems(e){let t=this.axis,n=this.chart,r=this.options,{grid:i,position:a,border:o}=r,s=i.offset,c=this.isHorizontal(),l=this.ticks.length+ +!!s,u=za(i),d=[],f=o.setContext(this.getContext()),p=f.display?f.width:0,m=p/2,h=function(e){return Jt(n,e,p)},g,_,v,y,b,x,S,C,w,T,E,D;if(a===`top`)g=h(this.bottom),x=this.bottom-u,C=g-m,T=h(e.top)+m,D=e.bottom;else if(a===`bottom`)g=h(this.top),T=e.top,D=h(e.bottom)-m,x=g+m,C=this.top+u;else if(a===`left`)g=h(this.right),b=this.right-u,S=g-m,w=h(e.left)+m,E=e.right;else if(a===`right`)g=h(this.left),w=e.left,E=h(e.right)-m,b=g+m,S=this.left+u;else if(t===`x`){if(a===`center`)g=h((e.top+e.bottom)/2+.5);else if(A(a)){let e=Object.keys(a)[0],t=a[e];g=h(this.chart.scales[e].getPixelForValue(t))}T=e.top,D=e.bottom,x=g+m,C=x+u}else if(t===`y`){if(a===`center`)g=h((e.left+e.right)/2);else if(A(a)){let e=Object.keys(a)[0],t=a[e];g=h(this.chart.scales[e].getPixelForValue(t))}b=g-m,S=b-u,w=e.left,E=e.right}let ee=M(r.ticks.maxTicksLimit,l),te=Math.max(1,Math.ceil(l/ee));for(_=0;_<l;_+=te){let e=this.getContext(_),t=i.setContext(e),r=o.setContext(e),a=t.lineWidth,l=t.color,u=r.dash||[],f=r.dashOffset,p=t.tickWidth,m=t.tickColor,h=t.tickBorderDash||[],g=t.tickBorderDashOffset;v=La(this,_,s),v!==void 0&&(y=Jt(n,v,a),c?b=S=w=E=y:x=C=T=D=y,d.push({tx1:b,ty1:x,tx2:S,ty2:C,x1:w,y1:T,x2:E,y2:D,width:a,color:l,borderDash:u,borderDashOffset:f,tickWidth:p,tickColor:m,tickBorderDash:h,tickBorderDashOffset:g}))}return this._ticksLength=l,this._borderValue=g,d}_computeLabelItems(e){let t=this.axis,n=this.options,{position:r,ticks:i}=n,a=this.isHorizontal(),o=this.ticks,{align:s,crossAlign:c,padding:l,mirror:u}=i,d=za(n.grid),f=d+l,p=u?-l:f,m=-Qe(this.labelRotation),h=[],g,_,v,y,b,x,S,C,w,T,E,D,ee=`middle`;if(r===`top`)x=this.bottom-p,S=this._getXAxisLabelAlignment();else if(r===`bottom`)x=this.top+p,S=this._getXAxisLabelAlignment();else if(r===`left`){let e=this._getYAxisLabelAlignment(d);S=e.textAlign,b=e.x}else if(r===`right`){let e=this._getYAxisLabelAlignment(d);S=e.textAlign,b=e.x}else if(t===`x`){if(r===`center`)x=(e.top+e.bottom)/2+f;else if(A(r)){let e=Object.keys(r)[0],t=r[e];x=this.chart.scales[e].getPixelForValue(t)+f}S=this._getXAxisLabelAlignment()}else if(t===`y`){if(r===`center`)b=(e.left+e.right)/2-f;else if(A(r)){let e=Object.keys(r)[0],t=r[e];b=this.chart.scales[e].getPixelForValue(t)}S=this._getYAxisLabelAlignment(d).textAlign}t===`y`&&(s===`start`?ee=`top`:s===`end`&&(ee=`bottom`));let te=this._getLabelSizes();for(g=0,_=o.length;g<_;++g){v=o[g],y=v.label;let e=i.setContext(this.getContext(g));C=this.getPixelForTick(g)+i.labelOffset,w=this._resolveTickFontOptions(g),T=w.lineHeight,E=k(y)?y.length:1;let t=E/2,n=e.color,s=e.textStrokeColor,l=e.textStrokeWidth,d=S;a?(b=C,S===`inner`&&(d=g===_-1?this.options.reverse?`left`:`right`:g===0?this.options.reverse?`right`:`left`:`center`),D=r===`top`?c===`near`||m!==0?-E*T+T/2:c===`center`?-te.highest.height/2-t*T+T:-te.highest.height+T/2:c===`near`||m!==0?T/2:c===`center`?te.highest.height/2-t*T:te.highest.height-E*T,u&&(D*=-1),m!==0&&!e.showLabelBackdrop&&(b+=T/2*Math.sin(m))):(x=C,D=(1-E)*T/2);let f;if(e.showLabelBackdrop){let t=V(e.backdropPadding),n=te.heights[g],r=te.widths[g],i=D-t.top,a=0-t.left;switch(ee){case`middle`:i-=n/2;break;case`bottom`:i-=n}switch(S){case`center`:a-=r/2;break;case`right`:a-=r;break;case`inner`:g===_-1?a-=r:g>0&&(a-=r/2)}f={left:a,top:i,width:r+t.width,height:n+t.height,color:e.backdropColor}}h.push({label:y,font:w,textOffset:D,options:{rotation:m,color:n,strokeColor:s,strokeWidth:l,textAlign:d,textBaseline:ee,translation:[b,x],backdrop:f}})}return h}_getXAxisLabelAlignment(){let{position:e,ticks:t}=this.options;if(-Qe(this.labelRotation))return e===`top`?`left`:`right`;let n=`center`;return t.align===`start`?n=`left`:t.align===`end`?n=`right`:t.align===`inner`&&(n=`inner`),n}_getYAxisLabelAlignment(e){let{position:t,ticks:{crossAlign:n,mirror:r,padding:i}}=this.options,a=this._getLabelSizes(),o=e+i,s=a.widest.width,c,l;return t===`left`?r?(l=this.right+i,n===`near`?c=`left`:n===`center`?(c=`center`,l+=s/2):(c=`right`,l+=s)):(l=this.right-o,n===`near`?c=`right`:n===`center`?(c=`center`,l-=s/2):(c=`left`,l=this.left)):t===`right`?r?(l=this.left+i,n===`near`?c=`right`:n===`center`?(c=`center`,l-=s/2):(c=`left`,l-=s)):(l=this.left+o,n===`near`?c=`left`:n===`center`?(c=`center`,l+=s/2):(c=`right`,l=this.right)):c=`right`,{textAlign:c,x:l}}_computeLabelArea(){if(this.options.ticks.mirror)return;let e=this.chart,t=this.options.position;if(t===`left`||t===`right`)return{top:0,left:this.left,bottom:e.height,right:this.right};if(t===`top`||t===`bottom`)return{top:this.top,left:0,bottom:this.bottom,right:e.width}}drawBackground(){let{ctx:e,options:{backgroundColor:t},left:n,top:r,width:i,height:a}=this;t&&(e.save(),e.fillStyle=t,e.fillRect(n,r,i,a),e.restore())}getLineWidthForValue(e){let t=this.options.grid;if(!this._isVisible()||!t.display)return 0;let n=this.ticks.findIndex(t=>t.value===e);return n>=0?t.setContext(this.getContext(n)).lineWidth:0}drawGrid(e){let t=this.options.grid,n=this.ctx,r=this._gridLineItems||=this._computeGridLineItems(e),i,a,o=(e,t,r)=>{r.width&&r.color&&(n.save(),n.lineWidth=r.width,n.strokeStyle=r.color,n.setLineDash(r.borderDash||[]),n.lineDashOffset=r.borderDashOffset,n.beginPath(),n.moveTo(e.x,e.y),n.lineTo(t.x,t.y),n.stroke(),n.restore())};if(t.display)for(i=0,a=r.length;i<a;++i){let e=r[i];t.drawOnChartArea&&o({x:e.x1,y:e.y1},{x:e.x2,y:e.y2},e),t.drawTicks&&o({x:e.tx1,y:e.ty1},{x:e.tx2,y:e.ty2},{color:e.tickColor,width:e.tickWidth,borderDash:e.tickBorderDash,borderDashOffset:e.tickBorderDashOffset})}}drawBorder(){let{chart:e,ctx:t,options:{border:n,grid:r}}=this,i=n.setContext(this.getContext()),a=n.display?i.width:0;if(!a)return;let o=r.setContext(this.getContext(0)).lineWidth,s=this._borderValue,c,l,u,d;this.isHorizontal()?(c=Jt(e,this.left,a)-a/2,l=Jt(e,this.right,o)+o/2,u=d=s):(u=Jt(e,this.top,a)-a/2,d=Jt(e,this.bottom,o)+o/2,c=l=s),t.save(),t.lineWidth=i.width,t.strokeStyle=i.color,t.beginPath(),t.moveTo(c,u),t.lineTo(l,d),t.stroke(),t.restore()}drawLabels(e){if(!this.options.ticks.display)return;let t=this.ctx,n=this._computeLabelArea();n&&$t(t,n);let r=this.getLabelItems(e);for(let e of r){let n=e.options,r=e.font,i=e.label,a=e.textOffset;sn(t,i,0,a,r,n)}n&&en(t)}drawTitle(){let{ctx:e,options:{position:t,title:n,reverse:r}}=this;if(!n.display)return;let i=H(n.font),a=V(n.padding),o=n.align,s=i.lineHeight/2;t===`bottom`||t===`center`||A(t)?(s+=a.bottom,k(n.text)&&(s+=i.lineHeight*(n.text.length-1))):s+=a.top;let{titleX:c,titleY:l,maxWidth:u,rotation:d}=Wa(this,s,t,o);sn(e,n.text,0,0,i,{color:n.color,maxWidth:u,rotation:d,textAlign:Ua(o,t,r),textBaseline:`middle`,translation:[c,l]})}draw(e){this._isVisible()&&(this.drawBackground(),this.drawGrid(e),this.drawBorder(),this.drawTitle(),this.drawLabels(e))}_layers(){let t=this.options,n=t.ticks&&t.ticks.z||0,r=M(t.grid&&t.grid.z,-1),i=M(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==e.prototype.draw?[{z:n,draw:e=>{this.draw(e)}}]:[{z:r,draw:e=>{this.drawBackground(),this.drawGrid(e),this.drawTitle()}},{z:i,draw:()=>{this.drawBorder()}},{z:n,draw:e=>{this.drawLabels(e)}}]}getMatchingVisibleMetas(e){let t=this.chart.getSortedVisibleDatasetMetas(),n=this.axis+`AxisID`,r=[],i,a;for(i=0,a=t.length;i<a;++i){let a=t[i];a[n]!==this.id||e&&a.type!==e||r.push(a)}return r}_resolveTickFontOptions(e){return H(this.options.ticks.setContext(this.getContext(e)).font)}_maxDigits(){let e=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/e}},Ka=class{constructor(e,t,n){this.type=e,this.scope=t,this.override=n,this.items=Object.create(null)}isForType(e){return Object.prototype.isPrototypeOf.call(this.type.prototype,e.prototype)}register(e){let t=Object.getPrototypeOf(e),n;Ya(t)&&(n=this.register(t));let r=this.items,i=e.id,a=this.scope+`.`+i;if(!i)throw Error(`class does not have id: `+e);return i in r||(r[i]=e,qa(e,a,n),this.override&&B.override(e.id,e.overrides)),a}get(e){return this.items[e]}unregister(e){let t=this.items,n=e.id,r=this.scope;n in t&&delete t[n],r&&n in B[r]&&(delete B[r][n],this.override&&delete Vt[n])}};function qa(e,t,n){let r=Ee(Object.create(null),[n?B.get(n):{},B.get(t),e.defaults]);B.set(t,r),e.defaultRoutes&&Ja(t,e.defaultRoutes),e.descriptors&&B.describe(t,e.descriptors)}function Ja(e,t){Object.keys(t).forEach(n=>{let r=n.split(`.`),i=r.pop(),a=[e].concat(r).join(`.`),o=t[n].split(`.`),s=o.pop(),c=o.join(`.`);B.route(a,i,c,s)})}function Ya(e){return`id`in e&&`defaults`in e}var Xa=new class{constructor(){this.controllers=new Ka(oi,`datasets`,!0),this.elements=new Ka(Ta,`elements`),this.plugins=new Ka(Object,`plugins`),this.scales=new Ka(Ga,`scales`),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...e){this._each(`register`,e)}remove(...e){this._each(`unregister`,e)}addControllers(...e){this._each(`register`,e,this.controllers)}addElements(...e){this._each(`register`,e,this.elements)}addPlugins(...e){this._each(`register`,e,this.plugins)}addScales(...e){this._each(`register`,e,this.scales)}getController(e){return this._get(e,this.controllers,`controller`)}getElement(e){return this._get(e,this.elements,`element`)}getPlugin(e){return this._get(e,this.plugins,`plugin`)}getScale(e){return this._get(e,this.scales,`scale`)}removeControllers(...e){this._each(`unregister`,e,this.controllers)}removeElements(...e){this._each(`unregister`,e,this.elements)}removePlugins(...e){this._each(`unregister`,e,this.plugins)}removeScales(...e){this._each(`unregister`,e,this.scales)}_each(e,t,n){[...t].forEach(t=>{let r=n||this._getRegistryForType(t);n||r.isForType(t)||r===this.plugins&&t.id?this._exec(e,r,t):P(t,t=>{let r=n||this._getRegistryForType(t);this._exec(e,r,t)})})}_exec(e,t,n){let r=Ne(e);N(n[`before`+r],[],n),t[e](n),N(n[`after`+r],[],n)}_getRegistryForType(e){for(let t=0;t<this._typedRegistries.length;t++){let n=this._typedRegistries[t];if(n.isForType(e))return n}return this.plugins}_get(e,t,n){let r=t.get(e);if(r===void 0)throw Error(`"`+e+`" is not a registered `+n+`.`);return r}},Za=class{constructor(){this._init=void 0}notify(e,t,n,r){if(t===`beforeInit`&&(this._init=this._createDescriptors(e,!0),this._notify(this._init,e,`install`)),this._init===void 0)return;let i=r?this._descriptors(e).filter(r):this._descriptors(e),a=this._notify(i,e,t,n);return t===`afterDestroy`&&(this._notify(i,e,`stop`),this._notify(this._init,e,`uninstall`),this._init=void 0),a}_notify(e,t,n,r){r||={};for(let i of e){let e=i.plugin,a=e[n];if(N(a,[t,r,i.options],e)===!1&&r.cancelable)return!1}return!0}invalidate(){O(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(e){if(this._cache)return this._cache;let t=this._cache=this._createDescriptors(e);return this._notifyStateChanges(e),t}_createDescriptors(e,t){let n=e&&e.config,r=M(n.options&&n.options.plugins,{}),i=Qa(n);return r===!1&&!t?[]:eo(e,i,r,t)}_notifyStateChanges(e){let t=this._oldCache||[],n=this._cache,r=(e,t)=>e.filter(e=>!t.some(t=>e.plugin.id===t.plugin.id));this._notify(r(t,n),e,`stop`),this._notify(r(n,t),e,`start`)}};function Qa(e){let t={},n=[],r=Object.keys(Xa.plugins.items);for(let e=0;e<r.length;e++)n.push(Xa.getPlugin(r[e]));let i=e.plugins||[];for(let e=0;e<i.length;e++){let r=i[e];n.indexOf(r)===-1&&(n.push(r),t[r.id]=!0)}return{plugins:n,localIds:t}}function $a(e,t){return!t&&e===!1?null:e===!0?{}:e}function eo(e,{plugins:t,localIds:n},r,i){let a=[],o=e.getContext();for(let s of t){let t=s.id,c=$a(r[t],i);c!==null&&a.push({plugin:s,options:to(e.config,{plugin:s,local:n[t]},c,o)})}return a}function to(e,{plugin:t,local:n},r,i){let a=e.pluginScopeKeys(t),o=e.getOptionScopes(r,a);return n&&t.defaults&&o.push(t.defaults),e.createResolver(o,i,[``],{scriptable:!1,indexable:!1,allKeys:!0})}function no(e,t){let n=B.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||`x`}function ro(e,t){let n=e;return e===`_index_`?n=t:e===`_value_`&&(n=t===`x`?`y`:`x`),n}function io(e,t){return e===t?`_index_`:`_value_`}function ao(e){if(e===`x`||e===`y`||e===`r`)return e}function oo(e){if(e===`top`||e===`bottom`)return`x`;if(e===`left`||e===`right`)return`y`}function so(e,...t){if(ao(e))return e;for(let n of t){let t=n.axis||oo(n.position)||e.length>1&&ao(e[0].toLowerCase());if(t)return t}throw Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function co(e,t,n){if(n[t+`AxisID`]===e)return{axis:t}}function lo(e,t){if(t.data&&t.data.datasets){let n=t.data.datasets.filter(t=>t.xAxisID===e||t.yAxisID===e);if(n.length)return co(e,`x`,n[0])||co(e,`y`,n[0])}return{}}function uo(e,t){let n=Vt[e.type]||{scales:{}},r=t.scales||{},i=no(e.type,t),a=Object.create(null);return Object.keys(r).forEach(t=>{let o=r[t];if(!A(o))return console.error(`Invalid scale configuration for scale: ${t}`);if(o._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${t}`);let s=so(t,o,lo(t,e),B.scales[o.type]),c=io(s,i),l=n.scales||{};a[t]=De(Object.create(null),[{axis:s},o,l[s],l[c]])}),e.data.datasets.forEach(n=>{let i=n.type||e.type,o=n.indexAxis||no(i,t),s=(Vt[i]||{}).scales||{};Object.keys(s).forEach(e=>{let t=ro(e,o),i=n[t+`AxisID`]||t;a[i]=a[i]||Object.create(null),De(a[i],[{axis:t},r[i],s[e]])})}),Object.keys(a).forEach(e=>{let t=a[e];De(t,[B.scales[t.type],B.scale])}),a}function fo(e){let t=e.options||={};t.plugins=M(t.plugins,{}),t.scales=uo(e,t)}function po(e){return e||={},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function mo(e){return e||={},e.data=po(e.data),fo(e),e}var ho=new Map,go=new Set;function _o(e,t){let n=ho.get(e);return n||(n=t(),ho.set(e,n),go.add(n)),n}var vo=(e,t,n)=>{let r=Me(t,n);r!==void 0&&e.add(r)},yo=class{constructor(e){this._config=mo(e),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(e){this._config.type=e}get data(){return this._config.data}set data(e){this._config.data=po(e)}get options(){return this._config.options}set options(e){this._config.options=e}get plugins(){return this._config.plugins}update(){let e=this._config;this.clearCache(),fo(e)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(e){return _o(e,()=>[[`datasets.${e}`,``]])}datasetAnimationScopeKeys(e,t){return _o(`${e}.transition.${t}`,()=>[[`datasets.${e}.transitions.${t}`,`transitions.${t}`],[`datasets.${e}`,``]])}datasetElementScopeKeys(e,t){return _o(`${e}-${t}`,()=>[[`datasets.${e}.elements.${t}`,`datasets.${e}`,`elements.${t}`,``]])}pluginScopeKeys(e){let t=e.id,n=this.type;return _o(`${n}-plugin-${t}`,()=>[[`plugins.${t}`,...e.additionalOptionScopes||[]]])}_cachedScopes(e,t){let n=this._scopeCache,r=n.get(e);return(!r||t)&&(r=new Map,n.set(e,r)),r}getOptionScopes(e,t,n){let{options:r,type:i}=this,a=this._cachedScopes(e,n),o=a.get(t);if(o)return o;let s=new Set;t.forEach(t=>{e&&(s.add(e),t.forEach(t=>vo(s,e,t))),t.forEach(e=>vo(s,r,e)),t.forEach(e=>vo(s,Vt[i]||{},e)),t.forEach(e=>vo(s,B,e)),t.forEach(e=>vo(s,Ht,e))});let c=Array.from(s);return c.length===0&&c.push(Object.create(null)),go.has(t)&&a.set(t,c),c}chartOptionScopes(){let{options:e,type:t}=this;return[e,Vt[t]||{},B.datasets[t]||{},{type:t},B,Ht]}resolveNamedOptions(e,t,n,r=[``]){let i={$shared:!0},{resolver:a,subPrefixes:o}=bo(this._resolverCache,e,r),s=a;if(So(a,t)){i.$shared=!1,n=Fe(n)?n():n;let t=this.createResolver(e,n,o);s=bn(a,n,t)}for(let e of t)i[e]=s[e];return i}createResolver(e,t,n=[``],r){let{resolver:i}=bo(this._resolverCache,e,n);return A(t)?bn(i,t,void 0,r):i}};function bo(e,t,n){let r=e.get(t);r||(r=new Map,e.set(t,r));let i=n.join(),a=r.get(i);return a||(a={resolver:yn(t,n),subPrefixes:n.filter(e=>!e.toLowerCase().includes(`hover`))},r.set(i,a)),a}var xo=e=>A(e)&&Object.getOwnPropertyNames(e).some(t=>Fe(e[t]));function So(e,t){let{isScriptable:n,isIndexable:r}=xn(e);for(let i of t){let t=n(i),a=r(i),o=(a||t)&&e[i];if(t&&(Fe(o)||xo(o))||a&&k(o))return!0}return!1}var Co=`4.5.1`,wo=[`top`,`bottom`,`left`,`right`,`chartArea`];function To(e,t){return e===`top`||e===`bottom`||wo.indexOf(e)===-1&&t===`x`}function Eo(e,t){return function(n,r){return n[e]===r[e]?n[t]-r[t]:n[e]-r[e]}}function Do(e){let t=e.chart,n=t.options.animation;t.notifyPlugins(`afterRender`),N(n&&n.onComplete,[e],t)}function Oo(e){let t=e.chart,n=t.options.animation;N(n&&n.onProgress,[e],t)}function ko(e){return Yn()&&typeof e==`string`?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}var Ao={},jo=e=>{let t=ko(e);return Object.values(Ao).filter(e=>e.canvas===t).pop()};function Mo(e,t,n){let r=Object.keys(e);for(let i of r){let r=+i;if(r>=t){let a=e[i];delete e[i],(n>0||r>t)&&(e[r+n]=a)}}}function No(e,t,n,r){return!n||e.type===`mouseout`?null:r?t:e}var Po=class{static defaults=B;static instances=Ao;static overrides=Vt;static registry=Xa;static version=Co;static getChart=jo;static register(...e){Xa.add(...e),Fo()}static unregister(...e){Xa.remove(...e),Fo()}constructor(e,t){let n=this.config=new yo(t),r=ko(e),i=jo(r);if(i)throw Error(`Canvas is already in use. Chart with ID '`+i.id+`' must be destroyed before the canvas with ID '`+i.canvas.id+`' can be reused.`);let a=n.createResolver(n.chartOptionScopes(),this.getContext());this.platform=new(n.platform||(wa(r))),this.platform.updateConfig(n);let o=this.platform.acquireContext(r,a.aspectRatio),s=o&&o.canvas,c=s&&s.height,l=s&&s.width;this.id=ve(),this.ctx=o,this.canvas=s,this.width=l,this.height=c,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Za,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=vt(e=>this.update(e),a.resizeDelay||0),this._dataChanges=[],Ao[this.id]=this,!o||!s?console.error(`Failed to create chart: can't acquire context from the given item`):(Pr.listen(this,`complete`,Do),Pr.listen(this,`progress`,Oo),this._initialize(),this.attached&&this.update())}get aspectRatio(){let{options:{aspectRatio:e,maintainAspectRatio:t},width:n,height:r,_aspectRatio:i}=this;return O(e)?t&&i?i:r?n/r:null:e}get data(){return this.config.data}set data(e){this.config.data=e}get options(){return this._options}set options(e){this.config.options=e}get registry(){return Xa}_initialize(){return this.notifyPlugins(`beforeInit`),this.options.responsive?this.resize():cr(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins(`afterInit`),this}clear(){return Yt(this.canvas,this.ctx),this}stop(){return Pr.stop(this),this}resize(e,t){Pr.running(this)?this._resizeBeforeDraw={width:e,height:t}:this._resize(e,t)}_resize(e,t){let n=this.options,r=this.canvas,i=n.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(r,e,t,i),o=n.devicePixelRatio||this.platform.getDevicePixelRatio(),s=this.width?`resize`:`attach`;this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,cr(this,o,!0)&&(this.notifyPlugins(`resize`,{size:a}),N(n.onResize,[this,a],this),this.attached&&this._doResize(s)&&this.render())}ensureScalesHaveIDs(){P(this.options.scales||{},(e,t)=>{e.id=t})}buildOrUpdateScales(){let e=this.options,t=e.scales,n=this.scales,r=Object.keys(n).reduce((e,t)=>(e[t]=!1,e),{}),i=[];t&&(i=i.concat(Object.keys(t).map(e=>{let n=t[e],r=so(e,n),i=r===`r`,a=r===`x`;return{options:n,dposition:i?`chartArea`:a?`bottom`:`left`,dtype:i?`radialLinear`:a?`category`:`linear`}}))),P(i,t=>{let i=t.options,a=i.id,o=so(a,i),s=M(i.type,t.dtype);(i.position===void 0||To(i.position,o)!==To(t.dposition))&&(i.position=t.dposition),r[a]=!0;let c=null;a in n&&n[a].type===s?c=n[a]:(c=new(Xa.getScale(s))({id:a,type:s,ctx:this.ctx,chart:this}),n[c.id]=c),c.init(i,e)}),P(r,(e,t)=>{e||delete n[t]}),P(n,e=>{U.configure(this,e,e.options),U.addBox(this,e)})}_updateMetasets(){let e=this._metasets,t=this.data.datasets.length,n=e.length;if(e.sort((e,t)=>e.index-t.index),n>t){for(let e=t;e<n;++e)this._destroyDatasetMeta(e);e.splice(t,n-t)}this._sortedMetasets=e.slice(0).sort(Eo(`order`,`index`))}_removeUnreferencedMetasets(){let{_metasets:e,data:{datasets:t}}=this;e.length>t.length&&delete this._stacks,e.forEach((e,n)=>{t.filter(t=>t===e._dataset).length===0&&this._destroyDatasetMeta(n)})}buildOrUpdateControllers(){let e=[],t=this.data.datasets,n,r;for(this._removeUnreferencedMetasets(),n=0,r=t.length;n<r;n++){let r=t[n],i=this.getDatasetMeta(n),a=r.type||this.config.type;if(i.type&&i.type!==a&&(this._destroyDatasetMeta(n),i=this.getDatasetMeta(n)),i.type=a,i.indexAxis=r.indexAxis||no(a,this.options),i.order=r.order||0,i.index=n,i.label=``+r.label,i.visible=this.isDatasetVisible(n),i.controller)i.controller.updateIndex(n),i.controller.linkScales();else{let t=Xa.getController(a),{datasetElementType:r,dataElementType:o}=B.datasets[a];Object.assign(t,{dataElementType:Xa.getElement(o),datasetElementType:r&&Xa.getElement(r)}),i.controller=new t(this,n),e.push(i.controller)}}return this._updateMetasets(),e}_resetElements(){P(this.data.datasets,(e,t)=>{this.getDatasetMeta(t).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins(`reset`)}update(e){let t=this.config;t.update();let n=this._options=t.createResolver(t.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!n.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins(`beforeUpdate`,{mode:e,cancelable:!0})===!1)return;let i=this.buildOrUpdateControllers();this.notifyPlugins(`beforeElementsUpdate`);let a=0;for(let e=0,t=this.data.datasets.length;e<t;e++){let{controller:t}=this.getDatasetMeta(e),n=!r&&i.indexOf(t)===-1;t.buildOrUpdateElements(n),a=Math.max(+t.getMaxOverflow(),a)}a=this._minPadding=n.layout.autoPadding?a:0,this._updateLayout(a),r||P(i,e=>{e.reset()}),this._updateDatasets(e),this.notifyPlugins(`afterUpdate`,{mode:e}),this._layers.sort(Eo(`z`,`_idx`));let{_active:o,_lastEvent:s}=this;s?this._eventHandler(s,!0):o.length&&this._updateHoverStyles(o,o,!0),this.render()}_updateScales(){P(this.scales,e=>{U.removeBox(this,e)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){let e=this.options;Ie(new Set(Object.keys(this._listeners)),new Set(e.events))&&!!this._responsiveListeners===e.responsive||(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){let{_hiddenIndices:e}=this,t=this._getUniformDataChanges()||[];for(let{method:n,start:r,count:i}of t)Mo(e,r,n===`_removeElements`?-i:i)}_getUniformDataChanges(){let e=this._dataChanges;if(!e||!e.length)return;this._dataChanges=[];let t=this.data.datasets.length,n=t=>new Set(e.filter(e=>e[0]===t).map((e,t)=>t+`,`+e.splice(1).join(`,`))),r=n(0);for(let e=1;e<t;e++)if(!Ie(r,n(e)))return;return Array.from(r).map(e=>e.split(`,`)).map(e=>({method:e[1],start:+e[2],count:+e[3]}))}_updateLayout(e){if(this.notifyPlugins(`beforeLayout`,{cancelable:!0})===!1)return;U.update(this,this.width,this.height,e);let t=this.chartArea,n=t.width<=0||t.height<=0;this._layers=[],P(this.boxes,e=>{n&&e.position===`chartArea`||(e.configure&&e.configure(),this._layers.push(...e._layers()))},this),this._layers.forEach((e,t)=>{e._idx=t}),this.notifyPlugins(`afterLayout`)}_updateDatasets(e){if(this.notifyPlugins(`beforeDatasetsUpdate`,{mode:e,cancelable:!0})!==!1){for(let e=0,t=this.data.datasets.length;e<t;++e)this.getDatasetMeta(e).controller.configure();for(let t=0,n=this.data.datasets.length;t<n;++t)this._updateDataset(t,Fe(e)?e({datasetIndex:t}):e);this.notifyPlugins(`afterDatasetsUpdate`,{mode:e})}}_updateDataset(e,t){let n=this.getDatasetMeta(e),r={meta:n,index:e,mode:t,cancelable:!0};this.notifyPlugins(`beforeDatasetUpdate`,r)!==!1&&(n.controller._update(t),r.cancelable=!1,this.notifyPlugins(`afterDatasetUpdate`,r))}render(){this.notifyPlugins(`beforeRender`,{cancelable:!0})!==!1&&(Pr.has(this)?this.attached&&!Pr.running(this)&&Pr.start(this):(this.draw(),Do({chart:this})))}draw(){let e;if(this._resizeBeforeDraw){let{width:e,height:t}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(e,t)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins(`beforeDraw`,{cancelable:!0})===!1)return;let t=this._layers;for(e=0;e<t.length&&t[e].z<=0;++e)t[e].draw(this.chartArea);for(this._drawDatasets();e<t.length;++e)t[e].draw(this.chartArea);this.notifyPlugins(`afterDraw`)}_getSortedDatasetMetas(e){let t=this._sortedMetasets,n=[],r,i;for(r=0,i=t.length;r<i;++r){let i=t[r];(!e||i.visible)&&n.push(i)}return n}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins(`beforeDatasetsDraw`,{cancelable:!0})===!1)return;let e=this.getSortedVisibleDatasetMetas();for(let t=e.length-1;t>=0;--t)this._drawDataset(e[t]);this.notifyPlugins(`afterDatasetsDraw`)}_drawDataset(e){let t=this.ctx,n={meta:e,index:e.index,cancelable:!0},r=Nr(this,e);this.notifyPlugins(`beforeDatasetDraw`,n)!==!1&&(r&&$t(t,r),e.controller.draw(),r&&en(t),n.cancelable=!1,this.notifyPlugins(`afterDatasetDraw`,n))}isPointInArea(e){return Qt(e,this.chartArea,this._minPadding)}getElementsAtEventForMode(e,t,n,r){let i=zi.modes[t];return typeof i==`function`?i(this,e,n,r):[]}getDatasetMeta(e){let t=this.data.datasets[e],n=this._metasets,r=n.filter(e=>e&&e._dataset===t).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:t&&t.order||0,index:e,_dataset:t,_parsed:[],_sorted:!1},n.push(r)),r}getContext(){return this.$context||=vn(null,{chart:this,type:`chart`})}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(e){let t=this.data.datasets[e];if(!t)return!1;let n=this.getDatasetMeta(e);return typeof n.hidden==`boolean`?!n.hidden:!t.hidden}setDatasetVisibility(e,t){let n=this.getDatasetMeta(e);n.hidden=!t}toggleDataVisibility(e){this._hiddenIndices[e]=!this._hiddenIndices[e]}getDataVisibility(e){return!this._hiddenIndices[e]}_updateVisibility(e,t,n){let r=n?`show`:`hide`,i=this.getDatasetMeta(e),a=i.controller._resolveAnimations(void 0,r);Pe(t)?(i.data[t].hidden=!n,this.update()):(this.setDatasetVisibility(e,n),a.update(i,{visible:n}),this.update(t=>t.datasetIndex===e?r:void 0))}hide(e,t){this._updateVisibility(e,t,!1)}show(e,t){this._updateVisibility(e,t,!0)}_destroyDatasetMeta(e){let t=this._metasets[e];t&&t.controller&&t.controller._destroy(),delete this._metasets[e]}_stop(){let e,t;for(this.stop(),Pr.remove(this),e=0,t=this.data.datasets.length;e<t;++e)this._destroyDatasetMeta(e)}destroy(){this.notifyPlugins(`beforeDestroy`);let{canvas:e,ctx:t}=this;this._stop(),this.config.clearCache(),e&&(this.unbindEvents(),Yt(e,t),this.platform.releaseContext(t),this.canvas=null,this.ctx=null),delete Ao[this.id],this.notifyPlugins(`afterDestroy`)}toBase64Image(...e){return this.canvas.toDataURL(...e)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){let e=this._listeners,t=this.platform,n=(n,r)=>{t.addEventListener(this,n,r),e[n]=r},r=(e,t,n)=>{e.offsetX=t,e.offsetY=n,this._eventHandler(e)};P(this.options.events,e=>n(e,r))}bindResponsiveEvents(){this._responsiveListeners||={};let e=this._responsiveListeners,t=this.platform,n=(n,r)=>{t.addEventListener(this,n,r),e[n]=r},r=(n,r)=>{e[n]&&(t.removeEventListener(this,n,r),delete e[n])},i=(e,t)=>{this.canvas&&this.resize(e,t)},a,o=()=>{r(`attach`,o),this.attached=!0,this.resize(),n(`resize`,i),n(`detach`,a)};a=()=>{this.attached=!1,r(`resize`,i),this._stop(),this._resize(0,0),n(`attach`,o)},t.isAttached(this.canvas)?o():a()}unbindEvents(){P(this._listeners,(e,t)=>{this.platform.removeEventListener(this,t,e)}),this._listeners={},P(this._responsiveListeners,(e,t)=>{this.platform.removeEventListener(this,t,e)}),this._responsiveListeners=void 0}updateHoverStyle(e,t,n){let r=n?`set`:`remove`,i,a,o,s;for(t===`dataset`&&(i=this.getDatasetMeta(e[0].datasetIndex),i.controller[`_`+r+`DatasetHoverStyle`]()),o=0,s=e.length;o<s;++o){a=e[o];let t=a&&this.getDatasetMeta(a.datasetIndex).controller;t&&t[r+`HoverStyle`](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(e){let t=this._active||[],n=e.map(({datasetIndex:e,index:t})=>{let n=this.getDatasetMeta(e);if(!n)throw Error(`No dataset found at index `+e);return{datasetIndex:e,element:n.data[t],index:t}});Se(n,t)||(this._active=n,this._lastEvent=null,this._updateHoverStyles(n,t))}notifyPlugins(e,t,n){return this._plugins.notify(this,e,t,n)}isPluginEnabled(e){return this._plugins._cache.filter(t=>t.plugin.id===e).length===1}_updateHoverStyles(e,t,n){let r=this.options.hover,i=(e,t)=>e.filter(e=>!t.some(t=>e.datasetIndex===t.datasetIndex&&e.index===t.index)),a=i(t,e),o=n?e:i(e,t);a.length&&this.updateHoverStyle(a,r.mode,!1),o.length&&r.mode&&this.updateHoverStyle(o,r.mode,!0)}_eventHandler(e,t){let n={event:e,replay:t,cancelable:!0,inChartArea:this.isPointInArea(e)},r=t=>(t.options.events||this.options.events).includes(e.native.type);if(this.notifyPlugins(`beforeEvent`,n,r)===!1)return;let i=this._handleEvent(e,t,n.inChartArea);return n.cancelable=!1,this.notifyPlugins(`afterEvent`,n,r),(i||n.changed)&&this.render(),this}_handleEvent(e,t,n){let{_active:r=[],options:i}=this,a=t,o=this._getActiveElements(e,r,n,a),s=Le(e),c=No(e,this._lastEvent,n,s);n&&(this._lastEvent=null,N(i.onHover,[e,o,this],this),s&&N(i.onClick,[e,o,this],this));let l=!Se(o,r);return(l||t)&&(this._active=o,this._updateHoverStyles(o,r,t)),this._lastEvent=c,l}_getActiveElements(e,t,n,r){if(e.type===`mouseout`)return[];if(!n)return t;let i=this.options.hover;return this.getElementsAtEventForMode(e,i.mode,i,r)}};function Fo(){return P(Po.instances,e=>e._plugins.invalidate())}function Io(e,t,n){let{startAngle:r,x:i,y:a,outerRadius:o,innerRadius:s,options:c}=t,{borderWidth:l,borderJoinStyle:u}=c,d=Math.min(l/o,it(r-n));if(e.beginPath(),e.arc(i,a,o-l/2,r+d/2,n-d/2),s>0){let t=Math.min(l/s,it(r-n));e.arc(i,a,s+l/2,n-t/2,r+t/2,!0)}else{let t=Math.min(l/2,o*it(r-n));if(u===`round`)e.arc(i,a,t,n-F/2,r+F/2,!0);else if(u===`bevel`){let o=2*t*t,s=-o*Math.cos(n+F/2)+i,c=-o*Math.sin(n+F/2)+a,l=o*Math.cos(r+F/2)+i,u=o*Math.sin(r+F/2)+a;e.lineTo(s,c),e.lineTo(l,u)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip(`evenodd`)}function Lo(e,t,n){let{startAngle:r,pixelMargin:i,x:a,y:o,outerRadius:s,innerRadius:c}=t,l=i/s;e.beginPath(),e.arc(a,o,s,r-l,n+l),c>i?(l=i/c,e.arc(a,o,c,n+l,r-l,!0)):e.arc(a,o,i,n+L,r-L),e.closePath(),e.clip()}function Ro(e){return pn(e,[`outerStart`,`outerEnd`,`innerStart`,`innerEnd`])}function zo(e,t,n,r){let i=Ro(e.options.borderRadius),a=(n-t)/2,o=Math.min(a,r*t/2),s=e=>{let t=(n-Math.min(a,e))*r/2;return R(e,0,Math.min(a,t))};return{outerStart:s(i.outerStart),outerEnd:s(i.outerEnd),innerStart:R(i.innerStart,0,o),innerEnd:R(i.innerEnd,0,o)}}function Bo(e,t,n,r){return{x:n+e*Math.cos(t),y:r+e*Math.sin(t)}}function Vo(e,t,n,r,i,a){let{x:o,y:s,startAngle:c,pixelMargin:l,innerRadius:u}=t,d=Math.max(t.outerRadius+r+n-l,0),f=u>0?u+r+n+l:0,p=0,m=i-c;if(r){let e=((u>0?u-r:0)+(d>0?d-r:0))/2;p=(m-(e===0?m:m*e/(e+r)))/2}let h=(m-Math.max(.001,m*d-n/F)/d)/2,g=c+h+p,_=i-h-p,{outerStart:v,outerEnd:y,innerStart:b,innerEnd:x}=zo(t,f,d,_-g),S=d-v,C=d-y,w=g+v/S,T=_-y/C,E=f+b,D=f+x,ee=g+b/E,te=_-x/D;if(e.beginPath(),a){let t=(w+T)/2;if(e.arc(o,s,d,w,t),e.arc(o,s,d,t,T),y>0){let t=Bo(C,T,o,s);e.arc(t.x,t.y,y,T,_+L)}let n=Bo(D,_,o,s);if(e.lineTo(n.x,n.y),x>0){let t=Bo(D,te,o,s);e.arc(t.x,t.y,x,_+L,te+Math.PI)}let r=(_-x/f+(g+b/f))/2;if(e.arc(o,s,f,_-x/f,r,!0),e.arc(o,s,f,r,g+b/f,!0),b>0){let t=Bo(E,ee,o,s);e.arc(t.x,t.y,b,ee+Math.PI,g-L)}let i=Bo(S,g,o,s);if(e.lineTo(i.x,i.y),v>0){let t=Bo(S,w,o,s);e.arc(t.x,t.y,v,g-L,w)}}else{e.moveTo(o,s);let t=Math.cos(w)*d+o,n=Math.sin(w)*d+s;e.lineTo(t,n);let r=Math.cos(T)*d+o,i=Math.sin(T)*d+s;e.lineTo(r,i)}e.closePath()}function Ho(e,t,n,r,i){let{fullCircles:a,startAngle:o,circumference:s}=t,c=t.endAngle;if(a){Vo(e,t,n,r,c,i);for(let t=0;t<a;++t)e.fill();isNaN(s)||(c=o+(s%I||I))}return Vo(e,t,n,r,c,i),e.fill(),c}function Uo(e,t,n,r,i){let{fullCircles:a,startAngle:o,circumference:s,options:c}=t,{borderWidth:l,borderJoinStyle:u,borderDash:d,borderDashOffset:f,borderRadius:p}=c,m=c.borderAlign===`inner`;if(!l)return;e.setLineDash(d||[]),e.lineDashOffset=f,m?(e.lineWidth=l*2,e.lineJoin=u||`round`):(e.lineWidth=l,e.lineJoin=u||`bevel`);let h=t.endAngle;if(a){Vo(e,t,n,r,h,i);for(let t=0;t<a;++t)e.stroke();isNaN(s)||(h=o+(s%I||I))}m&&Lo(e,t,h),c.selfJoin&&h-o>=F&&p===0&&u!==`miter`&&Io(e,t,h),a||(Vo(e,t,n,r,h,i),e.stroke())}var Wo=class extends Ta{static id=`arc`;static defaults={borderAlign:`center`,borderColor:`#fff`,borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:`backgroundColor`};static descriptors={_scriptable:!0,_indexable:e=>e!==`borderDash`};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(e){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,t,n){let{angle:r,distance:i}=tt(this.getProps([`x`,`y`],n),{x:e,y:t}),{startAngle:a,endAngle:o,innerRadius:s,outerRadius:c,circumference:l}=this.getProps([`startAngle`,`endAngle`,`innerRadius`,`outerRadius`,`circumference`],n),u=(this.options.spacing+this.options.borderWidth)/2,d=M(l,o-a),f=at(r,a,o)&&a!==o,p=d>=I||f,m=st(i,s+u,c+u);return p&&m}getCenterPoint(e){let{x:t,y:n,startAngle:r,endAngle:i,innerRadius:a,outerRadius:o}=this.getProps([`x`,`y`,`startAngle`,`endAngle`,`innerRadius`,`outerRadius`],e),{offset:s,spacing:c}=this.options,l=(r+i)/2,u=(a+o+c+s)/2;return{x:t+Math.cos(l)*u,y:n+Math.sin(l)*u}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){let{options:t,circumference:n}=this,r=(t.offset||0)/4,i=(t.spacing||0)/2,a=t.circular;if(this.pixelMargin=t.borderAlign===`inner`?.33:0,this.fullCircles=n>I?Math.floor(n/I):0,n===0||this.innerRadius<0||this.outerRadius<0)return;e.save();let o=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(o)*r,Math.sin(o)*r);let s=r*(1-Math.sin(Math.min(F,n||0)));e.fillStyle=t.backgroundColor,e.strokeStyle=t.borderColor,Ho(e,this,s,i,a),Uo(e,this,s,i,a),e.restore()}};function Go(e,t,n=t){e.lineCap=M(n.borderCapStyle,t.borderCapStyle),e.setLineDash(M(n.borderDash,t.borderDash)),e.lineDashOffset=M(n.borderDashOffset,t.borderDashOffset),e.lineJoin=M(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=M(n.borderWidth,t.borderWidth),e.strokeStyle=M(n.borderColor,t.borderColor)}function Ko(e,t,n){e.lineTo(n.x,n.y)}function qo(e){return e.stepped?tn:e.tension||e.cubicInterpolationMode===`monotone`?nn:Ko}function Jo(e,t,n={}){let r=e.length,{start:i=0,end:a=r-1}=n,{start:o,end:s}=t,c=Math.max(i,o),l=Math.min(a,s),u=i<o&&a<o||i>s&&a>s;return{count:r,start:c,loop:t.loop,ilen:l<c&&!u?r+l-c:l-c}}function Yo(e,t,n,r){let{points:i,options:a}=t,{count:o,start:s,loop:c,ilen:l}=Jo(i,n,r),u=qo(a),{move:d=!0,reverse:f}=r||{},p,m,h;for(p=0;p<=l;++p)m=i[(s+(f?l-p:p))%o],!m.skip&&(d?(e.moveTo(m.x,m.y),d=!1):u(e,h,m,f,a.stepped),h=m);return c&&(m=i[(s+(f?l:0))%o],u(e,h,m,f,a.stepped)),!!c}function Xo(e,t,n,r){let i=t.points,{count:a,start:o,ilen:s}=Jo(i,n,r),{move:c=!0,reverse:l}=r||{},u=0,d=0,f,p,m,h,g,_,v=e=>(o+(l?s-e:e))%a,y=()=>{h!==g&&(e.lineTo(u,g),e.lineTo(u,h),e.lineTo(u,_))};for(c&&(p=i[v(0)],e.moveTo(p.x,p.y)),f=0;f<=s;++f){if(p=i[v(f)],p.skip)continue;let t=p.x,n=p.y,r=t|0;r===m?(n<h?h=n:n>g&&(g=n),u=(d*u+t)/++d):(y(),e.lineTo(t,n),m=r,d=0,h=g=n),_=n}y()}function Zo(e){let t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!==`monotone`&&!t.stepped&&!n?Xo:Yo}function Qo(e){return e.stepped?fr:e.tension||e.cubicInterpolationMode===`monotone`?pr:dr}function $o(e,t,n,r){let i=t._path;i||(i=t._path=new Path2D,t.path(i,n,r)&&i.closePath()),Go(e,t.options),e.stroke(i)}function es(e,t,n,r){let{segments:i,options:a}=t,o=Zo(t);for(let s of i)Go(e,a,s.style),e.beginPath(),o(e,t,s,{start:n,end:n+r-1})&&e.closePath(),e.stroke()}var ts=typeof Path2D==`function`;function ns(e,t,n,r){ts&&!t.options.segment?$o(e,t,n,r):es(e,t,n,r)}var rs=class extends Ta{static id=`line`;static defaults={borderCapStyle:`butt`,borderDash:[],borderDashOffset:0,borderJoinStyle:`miter`,borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:`default`,fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:`backgroundColor`,borderColor:`borderColor`};static descriptors={_scriptable:!0,_indexable:e=>e!==`borderDash`&&e!==`fill`};constructor(e){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,e&&Object.assign(this,e)}updateControlPoints(e,t){let n=this.options;if((n.tension||n.cubicInterpolationMode===`monotone`)&&!n.stepped&&!this._pointsUpdated){let r=n.spanGaps?this._loop:this._fullLoop;Jn(this._points,n,e,r,t),this._pointsUpdated=!0}}set points(e){this._points=e,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||=Er(this,this.options.segment)}first(){let e=this.segments,t=this.points;return e.length&&t[e[0].start]}last(){let e=this.segments,t=this.points,n=e.length;return n&&t[e[n-1].end]}interpolate(e,t){let n=this.options,r=e[t],i=this.points,a=Cr(this,{property:t,start:r,end:r});if(!a.length)return;let o=[],s=Qo(n),c,l;for(c=0,l=a.length;c<l;++c){let{start:l,end:u}=a[c],d=i[l],f=i[u];if(d===f){o.push(d);continue}let p=s(d,f,Math.abs((r-d[t])/(f[t]-d[t])),n.stepped);p[t]=e[t],o.push(p)}return o.length===1?o[0]:o}pathSegment(e,t,n){return Zo(this)(e,this,t,n)}path(e,t,n){let r=this.segments,i=Zo(this),a=this._loop;t||=0,n||=this.points.length-t;for(let o of r)a&=i(e,this,o,{start:t,end:t+n-1});return!!a}draw(e,t,n,r){let i=this.options||{};(this.points||[]).length&&i.borderWidth&&(e.save(),ns(e,this,n,r),e.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}};function is(e,t,n,r){let i=e.options,{[n]:a}=e.getProps([n],r);return Math.abs(t-a)<i.radius+i.hitRadius}var as=class extends Ta{static id=`point`;parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:`circle`,radius:3,rotation:0};static defaultRoutes={backgroundColor:`backgroundColor`,borderColor:`borderColor`};constructor(e){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,t,n){let r=this.options,{x:i,y:a}=this.getProps([`x`,`y`],n);return(e-i)**2+(t-a)**2<(r.hitRadius+r.radius)**2}inXRange(e,t){return is(this,e,`x`,t)}inYRange(e,t){return is(this,e,`y`,t)}getCenterPoint(e){let{x:t,y:n}=this.getProps([`x`,`y`],e);return{x:t,y:n}}size(e){e=e||this.options||{};let t=e.radius||0;t=Math.max(t,t&&e.hoverRadius||0);let n=t&&e.borderWidth||0;return(t+n)*2}draw(e,t){let n=this.options;this.skip||n.radius<.1||!Qt(this,t,this.size(n)/2)||(e.strokeStyle=n.borderColor,e.lineWidth=n.borderWidth,e.fillStyle=n.backgroundColor,Xt(e,n,this.x,this.y))}getRange(){let e=this.options||{};return e.radius+e.hitRadius}};function os(e,t){let{x:n,y:r,base:i,width:a,height:o}=e.getProps([`x`,`y`,`base`,`width`,`height`],t),s,c,l,u,d;return e.horizontal?(d=o/2,s=Math.min(n,i),c=Math.max(n,i),l=r-d,u=r+d):(d=a/2,s=n-d,c=n+d,l=Math.min(r,i),u=Math.max(r,i)),{left:s,top:l,right:c,bottom:u}}function ss(e,t,n,r){return e?0:R(t,n,r)}function cs(e,t,n){let r=e.options.borderWidth,i=e.borderSkipped,a=mn(r);return{t:ss(i.top,a.top,0,n),r:ss(i.right,a.right,0,t),b:ss(i.bottom,a.bottom,0,n),l:ss(i.left,a.left,0,t)}}function ls(e,t,n){let{enableBorderRadius:r}=e.getProps([`enableBorderRadius`]),i=e.options.borderRadius,a=hn(i),o=Math.min(t,n),s=e.borderSkipped,c=r||A(i);return{topLeft:ss(!c||s.top||s.left,a.topLeft,0,o),topRight:ss(!c||s.top||s.right,a.topRight,0,o),bottomLeft:ss(!c||s.bottom||s.left,a.bottomLeft,0,o),bottomRight:ss(!c||s.bottom||s.right,a.bottomRight,0,o)}}function us(e){let t=os(e),n=t.right-t.left,r=t.bottom-t.top,i=cs(e,n/2,r/2),a=ls(e,n/2,r/2);return{outer:{x:t.left,y:t.top,w:n,h:r,radius:a},inner:{x:t.left+i.l,y:t.top+i.t,w:n-i.l-i.r,h:r-i.t-i.b,radius:{topLeft:Math.max(0,a.topLeft-Math.max(i.t,i.l)),topRight:Math.max(0,a.topRight-Math.max(i.t,i.r)),bottomLeft:Math.max(0,a.bottomLeft-Math.max(i.b,i.l)),bottomRight:Math.max(0,a.bottomRight-Math.max(i.b,i.r))}}}}function ds(e,t,n,r){let i=t===null,a=n===null,o=e&&!(i&&a)&&os(e,r);return o&&(i||st(t,o.left,o.right))&&(a||st(n,o.top,o.bottom))}function fs(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function ps(e,t){e.rect(t.x,t.y,t.w,t.h)}function ms(e,t,n={}){let r=e.x===n.x?0:-t,i=e.y===n.y?0:-t,a=(e.x+e.w===n.x+n.w?0:t)-r,o=(e.y+e.h===n.y+n.h?0:t)-i;return{x:e.x+r,y:e.y+i,w:e.w+a,h:e.h+o,radius:e.radius}}var hs=Object.freeze({__proto__:null,ArcElement:Wo,BarElement:class extends Ta{static id=`bar`;static defaults={borderSkipped:`start`,borderWidth:0,borderRadius:0,inflateAmount:`auto`,pointStyle:void 0};static defaultRoutes={backgroundColor:`backgroundColor`,borderColor:`borderColor`};constructor(e){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,e&&Object.assign(this,e)}draw(e){let{inflateAmount:t,options:{borderColor:n,backgroundColor:r}}=this,{inner:i,outer:a}=us(this),o=fs(a.radius)?cn:ps;e.save(),(a.w!==i.w||a.h!==i.h)&&(e.beginPath(),o(e,ms(a,t,i)),e.clip(),o(e,ms(i,-t,a)),e.fillStyle=n,e.fill(`evenodd`)),e.beginPath(),o(e,ms(i,t)),e.fillStyle=r,e.fill(),e.restore()}inRange(e,t,n){return ds(this,e,t,n)}inXRange(e,t){return ds(this,e,null,t)}inYRange(e,t){return ds(this,null,e,t)}getCenterPoint(e){let{x:t,y:n,base:r,horizontal:i}=this.getProps([`x`,`y`,`base`,`horizontal`],e);return{x:i?(t+r)/2:t,y:i?n:(n+r)/2}}getRange(e){return e===`x`?this.width/2:this.height/2}},LineElement:rs,PointElement:as}),gs=[`rgb(54, 162, 235)`,`rgb(255, 99, 132)`,`rgb(255, 159, 64)`,`rgb(255, 205, 86)`,`rgb(75, 192, 192)`,`rgb(153, 102, 255)`,`rgb(201, 203, 207)`],_s=gs.map(e=>e.replace(`rgb(`,`rgba(`).replace(`)`,`, 0.5)`));function vs(e){return gs[e%gs.length]}function ys(e){return _s[e%_s.length]}function bs(e,t){return e.borderColor=vs(t),e.backgroundColor=ys(t),++t}function xs(e,t){return e.backgroundColor=e.data.map(()=>vs(t++)),t}function Ss(e,t){return e.backgroundColor=e.data.map(()=>ys(t++)),t}function Cs(e){let t=0;return(n,r)=>{let i=e.getDatasetMeta(r).controller;i instanceof Ti?t=xs(n,t):i instanceof Di?t=Ss(n,t):i&&(t=bs(n,t))}}function ws(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function Ts(e){return e&&(e.borderColor||e.backgroundColor)}function Es(){return B.borderColor!==`rgba(0,0,0,0.1)`||B.backgroundColor!==`rgba(0,0,0,0.1)`}var Ds={id:`colors`,defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;let{data:{datasets:r},options:i}=e.config,{elements:a}=i,o=ws(r)||Ts(i)||a&&ws(a)||Es();if(!n.forceOverride&&o)return;let s=Cs(e);r.forEach(s)}};function Os(e,t,n,r,i){let a=i.samples||r;if(a>=n)return e.slice(t,t+n);let o=[],s=(n-2)/(a-2),c=0,l=t+n-1,u=t,d,f,p,m,h;for(o[c++]=e[u],d=0;d<a-2;d++){let r=0,i=0,a,l=Math.floor((d+1)*s)+1+t,g=Math.min(Math.floor((d+2)*s)+1,n)+t,_=g-l;for(a=l;a<g;a++)r+=e[a].x,i+=e[a].y;r/=_,i/=_;let v=Math.floor(d*s)+1+t,y=Math.min(Math.floor((d+1)*s)+1,n)+t,{x:b,y:x}=e[u];for(p=m=-1,a=v;a<y;a++)m=.5*Math.abs((b-r)*(e[a].y-x)-(b-e[a].x)*(i-x)),m>p&&(p=m,f=e[a],h=a);o[c++]=f,u=h}return o[c++]=e[l],o}function ks(e,t,n,r){let i=0,a=0,o,s,c,l,u,d,f,p,m,h,g=[],_=t+n-1,v=e[t].x,y=e[_].x-v;for(o=t;o<t+n;++o){s=e[o],c=(s.x-v)/y*r,l=s.y;let t=c|0;if(t===u)l<m?(m=l,d=o):l>h&&(h=l,f=o),i=(a*i+s.x)/++a;else{let n=o-1;if(!O(d)&&!O(f)){let t=Math.min(d,f),r=Math.max(d,f);t!==p&&t!==n&&g.push({...e[t],x:i}),r!==p&&r!==n&&g.push({...e[r],x:i})}o>0&&n!==p&&g.push(e[n]),g.push(s),u=t,a=0,m=h=l,d=f=p=o}}return g}function As(e){if(e._decimated){let t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function js(e){e.data.datasets.forEach(e=>{As(e)})}function Ms(e,t){let n=t.length,r=0,i,{iScale:a}=e,{min:o,max:s,minDefined:c,maxDefined:l}=a.getUserBounds();return c&&(r=R(lt(t,a.axis,o).lo,0,n-1)),i=l?R(lt(t,a.axis,s).hi+1,r,n)-r:n-r,{start:r,count:i}}var Ns={id:`decimation`,defaults:{algorithm:`min-max`,enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){js(e);return}let r=e.width;e.data.datasets.forEach((t,i)=>{let{_data:a,indexAxis:o}=t,s=e.getDatasetMeta(i),c=a||t.data;if(gn([o,e.options.indexAxis])===`y`||!s.controller.supportsDecimation)return;let l=e.scales[s.xAxisID];if(l.type!==`linear`&&l.type!==`time`||e.options.parsing)return;let{start:u,count:d}=Ms(s,c);if(d<=(n.threshold||4*r)){As(t);return}O(a)&&(t._data=c,delete t.data,Object.defineProperty(t,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(e){this._data=e}}));let f;switch(n.algorithm){case`lttb`:f=Os(c,u,d,r,n);break;case`min-max`:f=ks(c,u,d,r);break;default:throw Error(`Unsupported decimation algorithm '${n.algorithm}'`)}t._decimated=f})},destroy(e){js(e)}};function Ps(e,t,n){let r=e.segments,i=e.points,a=t.points,o=[];for(let e of r){let{start:r,end:s}=e;s=Ls(r,s,i);let c=Fs(n,i[r],i[s],e.loop);if(!t.segments){o.push({source:e,target:c,start:i[r],end:i[s]});continue}let l=Cr(t,c);for(let t of l){let r=Fs(n,a[t.start],a[t.end],t.loop),s=Sr(e,i,r);for(let e of s)o.push({source:e,target:t,start:{[n]:Rs(c,r,`start`,Math.max)},end:{[n]:Rs(c,r,`end`,Math.min)}})}}return o}function Fs(e,t,n,r){if(r)return;let i=t[e],a=n[e];return e===`angle`&&(i=it(i),a=it(a)),{property:e,start:i,end:a}}function Is(e,t){let{x:n=null,y:r=null}=e||{},i=t.points,a=[];return t.segments.forEach(({start:e,end:t})=>{t=Ls(e,t,i);let o=i[e],s=i[t];r===null?n!==null&&(a.push({x:n,y:o.y}),a.push({x:n,y:s.y})):(a.push({x:o.x,y:r}),a.push({x:s.x,y:r}))}),a}function Ls(e,t,n){for(;t>e;t--){let e=n[t];if(!isNaN(e.x)&&!isNaN(e.y))break}return t}function Rs(e,t,n,r){return e&&t?r(e[n],t[n]):e?e[n]:t?t[n]:0}function zs(e,t){let n=[],r=!1;return k(e)?(r=!0,n=e):n=Is(e,t),n.length?new rs({points:n,options:{tension:0},_loop:r,_fullLoop:r}):null}function Bs(e){return e&&e.fill!==!1}function Vs(e,t,n){let r=e[t].fill,i=[t],a;if(!n)return r;for(;r!==!1&&i.indexOf(r)===-1;){if(!j(r))return r;if(a=e[r],!a)return!1;if(a.visible)return r;i.push(r),r=a.fill}return!1}function Hs(e,t,n){let r=Ks(e);if(A(r))return!isNaN(r.value)&&r;let i=parseFloat(r);return j(i)&&Math.floor(i)===i?Us(r[0],t,i,n):[`origin`,`start`,`end`,`stack`,`shape`].indexOf(r)>=0&&r}function Us(e,t,n,r){return(e===`-`||e===`+`)&&(n=t+n),n===t||n<0||n>=r?!1:n}function Ws(e,t){let n=null;return e===`start`?n=t.bottom:e===`end`?n=t.top:A(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function Gs(e,t,n){let r;return r=e===`start`?n:e===`end`?t.options.reverse?t.min:t.max:A(e)?e.value:t.getBaseValue(),r}function Ks(e){let t=e.options,n=t.fill,r=M(n&&n.target,n);return r===void 0&&(r=!!t.backgroundColor),r===!1||r===null?!1:r===!0?`origin`:r}function qs(e){let{scale:t,index:n,line:r}=e,i=[],a=r.segments,o=r.points,s=Js(t,n);s.push(zs({x:null,y:t.bottom},r));for(let e=0;e<a.length;e++){let t=a[e];for(let e=t.start;e<=t.end;e++)Ys(i,o[e],s)}return new rs({points:i,options:{}})}function Js(e,t){let n=[],r=e.getMatchingVisibleMetas(`line`);for(let e=0;e<r.length;e++){let i=r[e];if(i.index===t)break;i.hidden||n.unshift(i.dataset)}return n}function Ys(e,t,n){let r=[];for(let i=0;i<n.length;i++){let a=n[i],{first:o,last:s,point:c}=Xs(a,t,`x`);if(!(!c||o&&s)){if(o)r.unshift(c);else if(e.push(c),!s)break}}e.push(...r)}function Xs(e,t,n){let r=e.interpolate(t,n);if(!r)return{};let i=r[n],a=e.segments,o=e.points,s=!1,c=!1;for(let e=0;e<a.length;e++){let t=a[e],r=o[t.start][n],l=o[t.end][n];if(st(i,r,l)){s=i===r,c=i===l;break}}return{first:s,last:c,point:r}}var Zs=class{constructor(e){this.x=e.x,this.y=e.y,this.radius=e.radius}pathSegment(e,t,n){let{x:r,y:i,radius:a}=this;return t||={start:0,end:I},e.arc(r,i,a,t.end,t.start,!0),!n.bounds}interpolate(e){let{x:t,y:n,radius:r}=this,i=e.angle;return{x:t+Math.cos(i)*r,y:n+Math.sin(i)*r,angle:i}}};function Qs(e){let{chart:t,fill:n,line:r}=e;if(j(n))return $s(t,n);if(n===`stack`)return qs(e);if(n===`shape`)return!0;let i=ec(e);return i instanceof Zs?i:zs(i,r)}function $s(e,t){let n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function ec(e){return(e.scale||{}).getPointPositionForValue?nc(e):tc(e)}function tc(e){let{scale:t={},fill:n}=e,r=Ws(n,t);if(j(r)){let e=t.isHorizontal();return{x:e?r:null,y:e?null:r}}return null}function nc(e){let{scale:t,fill:n}=e,r=t.options,i=t.getLabels().length,a=r.reverse?t.max:t.min,o=Gs(n,t,a),s=[];if(r.grid.circular){let e=t.getPointPositionForValue(0,a);return new Zs({x:e.x,y:e.y,radius:t.getDistanceFromCenterForValue(o)})}for(let e=0;e<i;++e)s.push(t.getPointPositionForValue(e,o));return s}function rc(e,t,n){let r=Qs(t),{chart:i,index:a,line:o,scale:s,axis:c}=t,l=o.options,u=l.fill,d=l.backgroundColor,{above:f=d,below:p=d}=u||{},m=Nr(i,i.getDatasetMeta(a));r&&o.points.length&&($t(e,n),ic(e,{line:o,target:r,above:f,below:p,area:n,scale:s,axis:c,clip:m}),en(e))}function ic(e,t){let{line:n,target:r,above:i,below:a,area:o,scale:s,clip:c}=t,l=n._loop?`angle`:t.axis;e.save();let u=a;a!==i&&(l===`x`?(ac(e,r,o.top),sc(e,{line:n,target:r,color:i,scale:s,property:l,clip:c}),e.restore(),e.save(),ac(e,r,o.bottom)):l===`y`&&(oc(e,r,o.left),sc(e,{line:n,target:r,color:a,scale:s,property:l,clip:c}),e.restore(),e.save(),oc(e,r,o.right),u=i)),sc(e,{line:n,target:r,color:u,scale:s,property:l,clip:c}),e.restore()}function ac(e,t,n){let{segments:r,points:i}=t,a=!0,o=!1;e.beginPath();for(let s of r){let{start:r,end:c}=s,l=i[r],u=i[Ls(r,c,i)];a?(e.moveTo(l.x,l.y),a=!1):(e.lineTo(l.x,n),e.lineTo(l.x,l.y)),o=!!t.pathSegment(e,s,{move:o}),o?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function oc(e,t,n){let{segments:r,points:i}=t,a=!0,o=!1;e.beginPath();for(let s of r){let{start:r,end:c}=s,l=i[r],u=i[Ls(r,c,i)];a?(e.moveTo(l.x,l.y),a=!1):(e.lineTo(n,l.y),e.lineTo(l.x,l.y)),o=!!t.pathSegment(e,s,{move:o}),o?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function sc(e,t){let{line:n,target:r,property:i,color:a,scale:o,clip:s}=t,c=Ps(n,r,i);for(let{source:t,target:l,start:u,end:d}of c){let{style:{backgroundColor:c=a}={}}=t,f=r!==!0;e.save(),e.fillStyle=c,cc(e,o,s,f&&Fs(i,u,d)),e.beginPath();let p=!!n.pathSegment(e,t),m;if(f){p?e.closePath():lc(e,r,d,i);let t=!!r.pathSegment(e,l,{move:p,reverse:!0});m=p&&t,m||lc(e,r,u,i)}e.closePath(),e.fill(m?`evenodd`:`nonzero`),e.restore()}}function cc(e,t,n,r){let i=t.chart.chartArea,{property:a,start:o,end:s}=r||{};if(a===`x`||a===`y`){let t,r,c,l;a===`x`?(t=o,r=i.top,c=s,l=i.bottom):(t=i.left,r=o,c=i.right,l=s),e.beginPath(),n&&(t=Math.max(t,n.left),c=Math.min(c,n.right),r=Math.max(r,n.top),l=Math.min(l,n.bottom)),e.rect(t,r,c-t,l-r),e.clip()}}function lc(e,t,n,r){let i=t.interpolate(n,r);i&&e.lineTo(i.x,i.y)}var uc={id:`filler`,afterDatasetsUpdate(e,t,n){let r=(e.data.datasets||[]).length,i=[],a,o,s,c;for(o=0;o<r;++o)a=e.getDatasetMeta(o),s=a.dataset,c=null,s&&s.options&&s instanceof rs&&(c={visible:e.isDatasetVisible(o),index:o,fill:Hs(s,o,r),chart:e,axis:a.controller.options.indexAxis,scale:a.vScale,line:s}),a.$filler=c,i.push(c);for(o=0;o<r;++o)c=i[o],c&&c.fill!==!1&&(c.fill=Vs(i,o,n.propagate))},beforeDraw(e,t,n){let r=n.drawTime===`beforeDraw`,i=e.getSortedVisibleDatasetMetas(),a=e.chartArea;for(let t=i.length-1;t>=0;--t){let n=i[t].$filler;n&&(n.line.updateControlPoints(a,n.axis),r&&n.fill&&rc(e.ctx,n,a))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!==`beforeDatasetsDraw`)return;let r=e.getSortedVisibleDatasetMetas();for(let t=r.length-1;t>=0;--t){let n=r[t].$filler;Bs(n)&&rc(e.ctx,n,e.chartArea)}},beforeDatasetDraw(e,t,n){let r=t.meta.$filler;Bs(r)&&n.drawTime===`beforeDatasetDraw`&&rc(e.ctx,r,e.chartArea)},defaults:{propagate:!0,drawTime:`beforeDatasetDraw`}},dc=(e,t)=>{let{boxHeight:n=t,boxWidth:r=t}=e;return e.usePointStyle&&(n=Math.min(n,t),r=e.pointStyleWidth||Math.min(r,t)),{boxWidth:r,boxHeight:n,itemHeight:Math.max(t,n)}},fc=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index,pc=class extends Ta{constructor(e){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,t,n){this.maxWidth=e,this.maxHeight=t,this._margins=n,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){let e=this.options.labels||{},t=N(e.generateLabels,[this.chart],this)||[];e.filter&&(t=t.filter(t=>e.filter(t,this.chart.data))),e.sort&&(t=t.sort((t,n)=>e.sort(t,n,this.chart.data))),this.options.reverse&&t.reverse(),this.legendItems=t}fit(){let{options:e,ctx:t}=this;if(!e.display){this.width=this.height=0;return}let n=e.labels,r=H(n.font),i=r.size,a=this._computeTitleHeight(),{boxWidth:o,itemHeight:s}=dc(n,i),c,l;t.font=r.string,this.isHorizontal()?(c=this.maxWidth,l=this._fitRows(a,i,o,s)+10):(l=this.maxHeight,c=this._fitCols(a,r,o,s)+10),this.width=Math.min(c,e.maxWidth||this.maxWidth),this.height=Math.min(l,e.maxHeight||this.maxHeight)}_fitRows(e,t,n,r){let{ctx:i,maxWidth:a,options:{labels:{padding:o}}}=this,s=this.legendHitBoxes=[],c=this.lineWidths=[0],l=r+o,u=e;i.textAlign=`left`,i.textBaseline=`middle`;let d=-1,f=-l;return this.legendItems.forEach((e,p)=>{let m=n+t/2+i.measureText(e.text).width;(p===0||c[c.length-1]+m+2*o>a)&&(u+=l,c[c.length-(p>0?0:1)]=0,f+=l,d++),s[p]={left:0,top:f,row:d,width:m,height:r},c[c.length-1]+=m+o}),u}_fitCols(e,t,n,r){let{ctx:i,maxHeight:a,options:{labels:{padding:o}}}=this,s=this.legendHitBoxes=[],c=this.columnSizes=[],l=a-e,u=o,d=0,f=0,p=0,m=0;return this.legendItems.forEach((e,a)=>{let{itemWidth:h,itemHeight:g}=mc(n,t,i,e,r);a>0&&f+g+2*o>l&&(u+=d+o,c.push({width:d,height:f}),p+=d+o,m++,d=f=0),s[a]={left:p,top:f,col:m,width:h,height:g},d=Math.max(d,h),f+=g+o}),u+=d,c.push({width:d,height:f}),u}adjustHitBoxes(){if(!this.options.display)return;let e=this._computeTitleHeight(),{legendHitBoxes:t,options:{align:n,labels:{padding:r},rtl:i}}=this,a=gr(i,this.left,this.width);if(this.isHorizontal()){let i=0,o=z(n,this.left+r,this.right-this.lineWidths[i]);for(let s of t)i!==s.row&&(i=s.row,o=z(n,this.left+r,this.right-this.lineWidths[i])),s.top+=this.top+e+r,s.left=a.leftForLtr(a.x(o),s.width),o+=s.width+r}else{let i=0,o=z(n,this.top+e+r,this.bottom-this.columnSizes[i].height);for(let s of t)s.col!==i&&(i=s.col,o=z(n,this.top+e+r,this.bottom-this.columnSizes[i].height)),s.top=o,s.left+=this.left+r,s.left=a.leftForLtr(a.x(s.left),s.width),o+=s.height+r}}isHorizontal(){return this.options.position===`top`||this.options.position===`bottom`}draw(){if(this.options.display){let e=this.ctx;$t(e,this),this._draw(),en(e)}}_draw(){let{options:e,columnSizes:t,lineWidths:n,ctx:r}=this,{align:i,labels:a}=e,o=B.color,s=gr(e.rtl,this.left,this.width),c=H(a.font),{padding:l}=a,u=c.size,d=u/2,f;this.drawTitle(),r.textAlign=s.textAlign(`left`),r.textBaseline=`middle`,r.lineWidth=.5,r.font=c.string;let{boxWidth:p,boxHeight:m,itemHeight:h}=dc(a,u),g=function(e,t,n){if(isNaN(p)||p<=0||isNaN(m)||m<0)return;r.save();let i=M(n.lineWidth,1);if(r.fillStyle=M(n.fillStyle,o),r.lineCap=M(n.lineCap,`butt`),r.lineDashOffset=M(n.lineDashOffset,0),r.lineJoin=M(n.lineJoin,`miter`),r.lineWidth=i,r.strokeStyle=M(n.strokeStyle,o),r.setLineDash(M(n.lineDash,[])),a.usePointStyle){let o={radius:m*Math.SQRT2/2,pointStyle:n.pointStyle,rotation:n.rotation,borderWidth:i},c=s.xPlus(e,p/2),l=t+d;Zt(r,o,c,l,a.pointStyleWidth&&p)}else{let a=t+Math.max((u-m)/2,0),o=s.leftForLtr(e,p),c=hn(n.borderRadius);r.beginPath(),Object.values(c).some(e=>e!==0)?cn(r,{x:o,y:a,w:p,h:m,radius:c}):r.rect(o,a,p,m),r.fill(),i!==0&&r.stroke()}r.restore()},_=function(e,t,n){sn(r,n.text,e,t+h/2,c,{strikethrough:n.hidden,textAlign:s.textAlign(n.textAlign)})},v=this.isHorizontal(),y=this._computeTitleHeight();f=v?{x:z(i,this.left+l,this.right-n[0]),y:this.top+l+y,line:0}:{x:this.left+l,y:z(i,this.top+y+l,this.bottom-t[0].height),line:0},_r(this.ctx,e.textDirection);let b=h+l;this.legendItems.forEach((o,u)=>{r.strokeStyle=o.fontColor,r.fillStyle=o.fontColor;let m=r.measureText(o.text).width,h=s.textAlign(o.textAlign||=a.textAlign),x=p+d+m,S=f.x,C=f.y;s.setWidth(this.width),v?u>0&&S+x+l>this.right&&(C=f.y+=b,f.line++,S=f.x=z(i,this.left+l,this.right-n[f.line])):u>0&&C+b>this.bottom&&(S=f.x=S+t[f.line].width+l,f.line++,C=f.y=z(i,this.top+y+l,this.bottom-t[f.line].height));let w=s.x(S);if(g(w,C,o),S=bt(h,S+p+d,v?S+x:this.right,e.rtl),_(s.x(S),C,o),v)f.x+=x+l;else if(typeof o.text!=`string`){let e=c.lineHeight;f.y+=_c(o,e)+l}else f.y+=b}),vr(this.ctx,e.textDirection)}drawTitle(){let e=this.options,t=e.title,n=H(t.font),r=V(t.padding);if(!t.display)return;let i=gr(e.rtl,this.left,this.width),a=this.ctx,o=t.position,s=n.size/2,c=r.top+s,l,u=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),l=this.top+c,u=z(e.align,u,this.right-d);else{let t=this.columnSizes.reduce((e,t)=>Math.max(e,t.height),0);l=c+z(e.align,this.top,this.bottom-t-e.labels.padding-this._computeTitleHeight())}let f=z(o,u,u+d);a.textAlign=i.textAlign(yt(o)),a.textBaseline=`middle`,a.strokeStyle=t.color,a.fillStyle=t.color,a.font=n.string,sn(a,t.text,f,l,n)}_computeTitleHeight(){let e=this.options.title,t=H(e.font),n=V(e.padding);return e.display?t.lineHeight+n.height:0}_getLegendItemAt(e,t){let n,r,i;if(st(e,this.left,this.right)&&st(t,this.top,this.bottom)){for(i=this.legendHitBoxes,n=0;n<i.length;++n)if(r=i[n],st(e,r.left,r.left+r.width)&&st(t,r.top,r.top+r.height))return this.legendItems[n]}return null}handleEvent(e){let t=this.options;if(!vc(e.type,t))return;let n=this._getLegendItemAt(e.x,e.y);if(e.type===`mousemove`||e.type===`mouseout`){let r=this._hoveredItem,i=fc(r,n);r&&!i&&N(t.onLeave,[e,r,this],this),this._hoveredItem=n,n&&!i&&N(t.onHover,[e,n,this],this)}else n&&N(t.onClick,[e,n,this],this)}};function mc(e,t,n,r,i){return{itemWidth:hc(r,e,t,n),itemHeight:gc(i,r,t.lineHeight)}}function hc(e,t,n,r){let i=e.text;return i&&typeof i!=`string`&&(i=i.reduce((e,t)=>e.length>t.length?e:t)),t+n.size/2+r.measureText(i).width}function gc(e,t,n){let r=e;return typeof t.text!=`string`&&(r=_c(t,n)),r}function _c(e,t){return t*(e.text?e.text.length:0)}function vc(e,t){return!!((e===`mousemove`||e===`mouseout`)&&(t.onHover||t.onLeave)||t.onClick&&(e===`click`||e===`mouseup`))}var yc={id:`legend`,_element:pc,start(e,t,n){let r=e.legend=new pc({ctx:e.ctx,options:n,chart:e});U.configure(e,r,n),U.addBox(e,r)},stop(e){U.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){let r=e.legend;U.configure(e,r,n),r.options=n},afterUpdate(e){let t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:`top`,align:`center`,fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){let r=t.datasetIndex,i=n.chart;i.isDatasetVisible(r)?(i.hide(r),t.hidden=!0):(i.show(r),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){let t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:r,textAlign:i,color:a,useBorderRadius:o,borderRadius:s}}=e.legend.options;return e._getSortedDatasetMetas().map(e=>{let c=e.controller.getStyle(n?0:void 0),l=V(c.borderWidth);return{text:t[e.index].label,fillStyle:c.backgroundColor,fontColor:a,hidden:!e.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(l.width+l.height)/4,strokeStyle:c.borderColor,pointStyle:r||c.pointStyle,rotation:c.rotation,textAlign:i||c.textAlign,borderRadius:o&&(s||c.borderRadius),datasetIndex:e.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:`center`,text:``}},descriptors:{_scriptable:e=>!e.startsWith(`on`),labels:{_scriptable:e=>![`generateLabels`,`filter`,`sort`].includes(e)}}},bc=class extends Ta{constructor(e){super(),this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,t){let n=this.options;if(this.left=0,this.top=0,!n.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=e,this.height=this.bottom=t;let r=k(n.text)?n.text.length:1;this._padding=V(n.padding);let i=r*H(n.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=i:this.width=i}isHorizontal(){let e=this.options.position;return e===`top`||e===`bottom`}_drawArgs(e){let{top:t,left:n,bottom:r,right:i,options:a}=this,o=a.align,s=0,c,l,u;return this.isHorizontal()?(l=z(o,n,i),u=t+e,c=i-n):(a.position===`left`?(l=n+e,u=z(o,r,t),s=F*-.5):(l=i-e,u=z(o,t,r),s=F*.5),c=r-t),{titleX:l,titleY:u,maxWidth:c,rotation:s}}draw(){let e=this.ctx,t=this.options;if(!t.display)return;let n=H(t.font),r=n.lineHeight/2+this._padding.top,{titleX:i,titleY:a,maxWidth:o,rotation:s}=this._drawArgs(r);sn(e,t.text,0,0,n,{color:t.color,maxWidth:o,rotation:s,textAlign:yt(t.align),textBaseline:`middle`,translation:[i,a]})}};function xc(e,t){let n=new bc({ctx:e.ctx,options:t,chart:e});U.configure(e,n,t),U.addBox(e,n),e.titleBlock=n}var Sc={id:`title`,_element:bc,start(e,t,n){xc(e,n)},stop(e){let t=e.titleBlock;U.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){let r=e.titleBlock;U.configure(e,r,n),r.options=n},defaults:{align:`center`,display:!1,font:{weight:`bold`},fullSize:!0,padding:10,position:`top`,text:``,weight:2e3},defaultRoutes:{color:`color`},descriptors:{_scriptable:!0,_indexable:!1}},Cc=new WeakMap,wc={id:`subtitle`,start(e,t,n){let r=new bc({ctx:e.ctx,options:n,chart:e});U.configure(e,r,n),U.addBox(e,r),Cc.set(e,r)},stop(e){U.removeBox(e,Cc.get(e)),Cc.delete(e)},beforeUpdate(e,t,n){let r=Cc.get(e);U.configure(e,r,n),r.options=n},defaults:{align:`center`,display:!1,font:{weight:`normal`},fullSize:!0,padding:0,position:`top`,text:``,weight:1500},defaultRoutes:{color:`color`},descriptors:{_scriptable:!0,_indexable:!1}},Tc={average(e){if(!e.length)return!1;let t,n,r=new Set,i=0,a=0;for(t=0,n=e.length;t<n;++t){let n=e[t].element;if(n&&n.hasValue()){let e=n.tooltipPosition();r.add(e.x),i+=e.y,++a}}return a===0||r.size===0?!1:{x:[...r].reduce((e,t)=>e+t)/r.size,y:i/a}},nearest(e,t){if(!e.length)return!1;let n=t.x,r=t.y,i=1/0,a,o,s;for(a=0,o=e.length;a<o;++a){let n=e[a].element;if(n&&n.hasValue()){let e=nt(t,n.getCenterPoint());e<i&&(i=e,s=n)}}if(s){let e=s.tooltipPosition();n=e.x,r=e.y}return{x:n,y:r}}};function Ec(e,t){return t&&(k(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function Dc(e){return(typeof e==`string`||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function Oc(e,t){let{element:n,datasetIndex:r,index:i}=t,a=e.getDatasetMeta(r).controller,{label:o,value:s}=a.getLabelAndValue(i);return{chart:e,label:o,parsed:a.getParsed(i),raw:e.data.datasets[r].data[i],formattedValue:s,dataset:a.getDataset(),dataIndex:i,datasetIndex:r,element:n}}function kc(e,t){let n=e.chart.ctx,{body:r,footer:i,title:a}=e,{boxWidth:o,boxHeight:s}=t,c=H(t.bodyFont),l=H(t.titleFont),u=H(t.footerFont),d=a.length,f=i.length,p=r.length,m=V(t.padding),h=m.height,g=0,_=r.reduce((e,t)=>e+t.before.length+t.lines.length+t.after.length,0);if(_+=e.beforeBody.length+e.afterBody.length,d&&(h+=d*l.lineHeight+(d-1)*t.titleSpacing+t.titleMarginBottom),_){let e=t.displayColors?Math.max(s,c.lineHeight):c.lineHeight;h+=p*e+(_-p)*c.lineHeight+(_-1)*t.bodySpacing}f&&(h+=t.footerMarginTop+f*u.lineHeight+(f-1)*t.footerSpacing);let v=0,y=function(e){g=Math.max(g,n.measureText(e).width+v)};return n.save(),n.font=l.string,P(e.title,y),n.font=c.string,P(e.beforeBody.concat(e.afterBody),y),v=t.displayColors?o+2+t.boxPadding:0,P(r,e=>{P(e.before,y),P(e.lines,y),P(e.after,y)}),v=0,n.font=u.string,P(e.footer,y),n.restore(),g+=m.width,{width:g,height:h}}function Ac(e,t){let{y:n,height:r}=t;return n<r/2?`top`:n>e.height-r/2?`bottom`:`center`}function jc(e,t,n,r){let{x:i,width:a}=r,o=n.caretSize+n.caretPadding;if(e===`left`&&i+a+o>t.width||e===`right`&&i-a-o<0)return!0}function Mc(e,t,n,r){let{x:i,width:a}=n,{width:o,chartArea:{left:s,right:c}}=e,l=`center`;return r===`center`?l=i<=(s+c)/2?`left`:`right`:i<=a/2?l=`left`:i>=o-a/2&&(l=`right`),jc(l,e,t,n)&&(l=`center`),l}function Nc(e,t,n){let r=n.yAlign||t.yAlign||Ac(e,n);return{xAlign:n.xAlign||t.xAlign||Mc(e,t,n,r),yAlign:r}}function Pc(e,t){let{x:n,width:r}=e;return t===`right`?n-=r:t===`center`&&(n-=r/2),n}function Fc(e,t,n){let{y:r,height:i}=e;return t===`top`?r+=n:r-=t===`bottom`?i+n:i/2,r}function Ic(e,t,n,r){let{caretSize:i,caretPadding:a,cornerRadius:o}=e,{xAlign:s,yAlign:c}=n,l=i+a,{topLeft:u,topRight:d,bottomLeft:f,bottomRight:p}=hn(o),m=Pc(t,s),h=Fc(t,c,l);return c===`center`?s===`left`?m+=l:s===`right`&&(m-=l):s===`left`?m-=Math.max(u,f)+i:s===`right`&&(m+=Math.max(d,p)+i),{x:R(m,0,r.width-t.width),y:R(h,0,r.height-t.height)}}function Lc(e,t,n){let r=V(n.padding);return t===`center`?e.x+e.width/2:t===`right`?e.x+e.width-r.right:e.x+r.left}function Rc(e){return Ec([],Dc(e))}function zc(e,t,n){return vn(e,{tooltip:t,tooltipItems:n,type:`tooltip`})}function Bc(e,t){let n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}var Vc={beforeTitle:_e,title(e){if(e.length>0){let t=e[0],n=t.chart.data.labels,r=n?n.length:0;if(this&&this.options&&this.options.mode===`dataset`)return t.dataset.label||``;if(t.label)return t.label;if(r>0&&t.dataIndex<r)return n[t.dataIndex]}return``},afterTitle:_e,beforeBody:_e,beforeLabel:_e,label(e){if(this&&this.options&&this.options.mode===`dataset`)return e.label+`: `+e.formattedValue||e.formattedValue;let t=e.dataset.label||``;t&&(t+=`: `);let n=e.formattedValue;return O(n)||(t+=n),t},labelColor(e){let t=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:t.borderColor,backgroundColor:t.backgroundColor,borderWidth:t.borderWidth,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){let t=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:t.pointStyle,rotation:t.rotation}},afterLabel:_e,afterBody:_e,beforeFooter:_e,footer:_e,afterFooter:_e};function Hc(e,t,n,r){let i=e[t].call(n,r);return i===void 0?Vc[t].call(n,r):i}var Uc=class extends Ta{static positioners=Tc;constructor(e){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=e.chart,this.options=e.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(e){this.options=e,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){let e=this._cachedAnimations;if(e)return e;let t=this.chart,n=this.options.setContext(this.getContext()),r=n.enabled&&t.options.animation&&n.animations,i=new Rr(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(i)),i}getContext(){return this.$context||=zc(this.chart.getContext(),this,this._tooltipItems)}getTitle(e,t){let{callbacks:n}=t,r=Hc(n,`beforeTitle`,this,e),i=Hc(n,`title`,this,e),a=Hc(n,`afterTitle`,this,e),o=[];return o=Ec(o,Dc(r)),o=Ec(o,Dc(i)),o=Ec(o,Dc(a)),o}getBeforeBody(e,t){return Rc(Hc(t.callbacks,`beforeBody`,this,e))}getBody(e,t){let{callbacks:n}=t,r=[];return P(e,e=>{let t={before:[],lines:[],after:[]},i=Bc(n,e);Ec(t.before,Dc(Hc(i,`beforeLabel`,this,e))),Ec(t.lines,Hc(i,`label`,this,e)),Ec(t.after,Dc(Hc(i,`afterLabel`,this,e))),r.push(t)}),r}getAfterBody(e,t){return Rc(Hc(t.callbacks,`afterBody`,this,e))}getFooter(e,t){let{callbacks:n}=t,r=Hc(n,`beforeFooter`,this,e),i=Hc(n,`footer`,this,e),a=Hc(n,`afterFooter`,this,e),o=[];return o=Ec(o,Dc(r)),o=Ec(o,Dc(i)),o=Ec(o,Dc(a)),o}_createItems(e){let t=this._active,n=this.chart.data,r=[],i=[],a=[],o=[],s,c;for(s=0,c=t.length;s<c;++s)o.push(Oc(this.chart,t[s]));return e.filter&&(o=o.filter((t,r,i)=>e.filter(t,r,i,n))),e.itemSort&&(o=o.sort((t,r)=>e.itemSort(t,r,n))),P(o,t=>{let n=Bc(e.callbacks,t);r.push(Hc(n,`labelColor`,this,t)),i.push(Hc(n,`labelPointStyle`,this,t)),a.push(Hc(n,`labelTextColor`,this,t))}),this.labelColors=r,this.labelPointStyles=i,this.labelTextColors=a,this.dataPoints=o,o}update(e,t){let n=this.options.setContext(this.getContext()),r=this._active,i,a=[];if(!r.length)this.opacity!==0&&(i={opacity:0});else{let e=Tc[n.position].call(this,r,this._eventPosition);a=this._createItems(n),this.title=this.getTitle(a,n),this.beforeBody=this.getBeforeBody(a,n),this.body=this.getBody(a,n),this.afterBody=this.getAfterBody(a,n),this.footer=this.getFooter(a,n);let t=this._size=kc(this,n),o=Object.assign({},e,t),s=Nc(this.chart,n,o),c=Ic(n,o,s,this.chart);this.xAlign=s.xAlign,this.yAlign=s.yAlign,i={opacity:1,x:c.x,y:c.y,width:t.width,height:t.height,caretX:e.x,caretY:e.y}}this._tooltipItems=a,this.$context=void 0,i&&this._resolveAnimations().update(this,i),e&&n.external&&n.external.call(this,{chart:this.chart,tooltip:this,replay:t})}drawCaret(e,t,n,r){let i=this.getCaretPosition(e,n,r);t.lineTo(i.x1,i.y1),t.lineTo(i.x2,i.y2),t.lineTo(i.x3,i.y3)}getCaretPosition(e,t,n){let{xAlign:r,yAlign:i}=this,{caretSize:a,cornerRadius:o}=n,{topLeft:s,topRight:c,bottomLeft:l,bottomRight:u}=hn(o),{x:d,y:f}=e,{width:p,height:m}=t,h,g,_,v,y,b;return i===`center`?(y=f+m/2,r===`left`?(h=d,g=h-a,v=y+a,b=y-a):(h=d+p,g=h+a,v=y-a,b=y+a),_=h):(g=r===`left`?d+Math.max(s,l)+a:r===`right`?d+p-Math.max(c,u)-a:this.caretX,i===`top`?(v=f,y=v-a,h=g-a,_=g+a):(v=f+m,y=v+a,h=g+a,_=g-a),b=v),{x1:h,x2:g,x3:_,y1:v,y2:y,y3:b}}drawTitle(e,t,n){let r=this.title,i=r.length,a,o,s;if(i){let c=gr(n.rtl,this.x,this.width);for(e.x=Lc(this,n.titleAlign,n),t.textAlign=c.textAlign(n.titleAlign),t.textBaseline=`middle`,a=H(n.titleFont),o=n.titleSpacing,t.fillStyle=n.titleColor,t.font=a.string,s=0;s<i;++s)t.fillText(r[s],c.x(e.x),e.y+a.lineHeight/2),e.y+=a.lineHeight+o,s+1===i&&(e.y+=n.titleMarginBottom-o)}}_drawColorBox(e,t,n,r,i){let a=this.labelColors[n],o=this.labelPointStyles[n],{boxHeight:s,boxWidth:c}=i,l=H(i.bodyFont),u=Lc(this,`left`,i),d=r.x(u),f=s<l.lineHeight?(l.lineHeight-s)/2:0,p=t.y+f;if(i.usePointStyle){let t={radius:Math.min(c,s)/2,pointStyle:o.pointStyle,rotation:o.rotation,borderWidth:1},n=r.leftForLtr(d,c)+c/2,l=p+s/2;e.strokeStyle=i.multiKeyBackground,e.fillStyle=i.multiKeyBackground,Xt(e,t,n,l),e.strokeStyle=a.borderColor,e.fillStyle=a.backgroundColor,Xt(e,t,n,l)}else{e.lineWidth=A(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,e.strokeStyle=a.borderColor,e.setLineDash(a.borderDash||[]),e.lineDashOffset=a.borderDashOffset||0;let t=r.leftForLtr(d,c),n=r.leftForLtr(r.xPlus(d,1),c-2),o=hn(a.borderRadius);Object.values(o).some(e=>e!==0)?(e.beginPath(),e.fillStyle=i.multiKeyBackground,cn(e,{x:t,y:p,w:c,h:s,radius:o}),e.fill(),e.stroke(),e.fillStyle=a.backgroundColor,e.beginPath(),cn(e,{x:n,y:p+1,w:c-2,h:s-2,radius:o}),e.fill()):(e.fillStyle=i.multiKeyBackground,e.fillRect(t,p,c,s),e.strokeRect(t,p,c,s),e.fillStyle=a.backgroundColor,e.fillRect(n,p+1,c-2,s-2))}e.fillStyle=this.labelTextColors[n]}drawBody(e,t,n){let{body:r}=this,{bodySpacing:i,bodyAlign:a,displayColors:o,boxHeight:s,boxWidth:c,boxPadding:l}=n,u=H(n.bodyFont),d=u.lineHeight,f=0,p=gr(n.rtl,this.x,this.width),m=function(n){t.fillText(n,p.x(e.x+f),e.y+d/2),e.y+=d+i},h=p.textAlign(a),g,_,v,y,b,x,S;for(t.textAlign=a,t.textBaseline=`middle`,t.font=u.string,e.x=Lc(this,h,n),t.fillStyle=n.bodyColor,P(this.beforeBody,m),f=o&&h!==`right`?a===`center`?c/2+l:c+2+l:0,y=0,x=r.length;y<x;++y){for(g=r[y],_=this.labelTextColors[y],t.fillStyle=_,P(g.before,m),v=g.lines,o&&v.length&&(this._drawColorBox(t,e,y,p,n),d=Math.max(u.lineHeight,s)),b=0,S=v.length;b<S;++b)m(v[b]),d=u.lineHeight;P(g.after,m)}f=0,d=u.lineHeight,P(this.afterBody,m),e.y-=i}drawFooter(e,t,n){let r=this.footer,i=r.length,a,o;if(i){let s=gr(n.rtl,this.x,this.width);for(e.x=Lc(this,n.footerAlign,n),e.y+=n.footerMarginTop,t.textAlign=s.textAlign(n.footerAlign),t.textBaseline=`middle`,a=H(n.footerFont),t.fillStyle=n.footerColor,t.font=a.string,o=0;o<i;++o)t.fillText(r[o],s.x(e.x),e.y+a.lineHeight/2),e.y+=a.lineHeight+n.footerSpacing}}drawBackground(e,t,n,r){let{xAlign:i,yAlign:a}=this,{x:o,y:s}=e,{width:c,height:l}=n,{topLeft:u,topRight:d,bottomLeft:f,bottomRight:p}=hn(r.cornerRadius);t.fillStyle=r.backgroundColor,t.strokeStyle=r.borderColor,t.lineWidth=r.borderWidth,t.beginPath(),t.moveTo(o+u,s),a===`top`&&this.drawCaret(e,t,n,r),t.lineTo(o+c-d,s),t.quadraticCurveTo(o+c,s,o+c,s+d),a===`center`&&i===`right`&&this.drawCaret(e,t,n,r),t.lineTo(o+c,s+l-p),t.quadraticCurveTo(o+c,s+l,o+c-p,s+l),a===`bottom`&&this.drawCaret(e,t,n,r),t.lineTo(o+f,s+l),t.quadraticCurveTo(o,s+l,o,s+l-f),a===`center`&&i===`left`&&this.drawCaret(e,t,n,r),t.lineTo(o,s+u),t.quadraticCurveTo(o,s,o+u,s),t.closePath(),t.fill(),r.borderWidth>0&&t.stroke()}_updateAnimationTarget(e){let t=this.chart,n=this.$animations,r=n&&n.x,i=n&&n.y;if(r||i){let n=Tc[e.position].call(this,this._active,this._eventPosition);if(!n)return;let a=this._size=kc(this,e),o=Object.assign({},n,this._size),s=Nc(t,e,o),c=Ic(e,o,s,t);(r._to!==c.x||i._to!==c.y)&&(this.xAlign=s.xAlign,this.yAlign=s.yAlign,this.width=a.width,this.height=a.height,this.caretX=n.x,this.caretY=n.y,this._resolveAnimations().update(this,c))}}_willRender(){return!!this.opacity}draw(e){let t=this.options.setContext(this.getContext()),n=this.opacity;if(!n)return;this._updateAnimationTarget(t);let r={width:this.width,height:this.height},i={x:this.x,y:this.y};n=Math.abs(n)<.001?0:n;let a=V(t.padding),o=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;t.enabled&&o&&(e.save(),e.globalAlpha=n,this.drawBackground(i,e,r,t),_r(e,t.textDirection),i.y+=a.top,this.drawTitle(i,e,t),this.drawBody(i,e,t),this.drawFooter(i,e,t),vr(e,t.textDirection),e.restore())}getActiveElements(){return this._active||[]}setActiveElements(e,t){let n=this._active,r=e.map(({datasetIndex:e,index:t})=>{let n=this.chart.getDatasetMeta(e);if(!n)throw Error(`Cannot find a dataset at index `+e);return{datasetIndex:e,element:n.data[t],index:t}}),i=!Se(n,r),a=this._positionChanged(r,t);(i||a)&&(this._active=r,this._eventPosition=t,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(e,t,n=!0){if(t&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;let r=this.options,i=this._active||[],a=this._getActiveElements(e,i,t,n),o=this._positionChanged(a,e),s=t||!Se(a,i)||o;return s&&(this._active=a,(r.enabled||r.external)&&(this._eventPosition={x:e.x,y:e.y},this.update(!0,t))),s}_getActiveElements(e,t,n,r){let i=this.options;if(e.type===`mouseout`)return[];if(!r)return t.filter(e=>this.chart.data.datasets[e.datasetIndex]&&this.chart.getDatasetMeta(e.datasetIndex).controller.getParsed(e.index)!==void 0);let a=this.chart.getElementsAtEventForMode(e,i.mode,i,n);return i.reverse&&a.reverse(),a}_positionChanged(e,t){let{caretX:n,caretY:r,options:i}=this,a=Tc[i.position].call(this,e,t);return a!==!1&&(n!==a.x||r!==a.y)}},Wc=Object.freeze({__proto__:null,Colors:Ds,Decimation:Ns,Filler:uc,Legend:yc,SubTitle:wc,Title:Sc,Tooltip:{id:`tooltip`,_element:Uc,positioners:Tc,afterInit(e,t,n){n&&(e.tooltip=new Uc({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){let t=e.tooltip;if(t&&t._willRender()){let n={tooltip:t};if(e.notifyPlugins(`beforeTooltipDraw`,{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins(`afterTooltipDraw`,n)}},afterEvent(e,t){if(e.tooltip){let n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:`average`,backgroundColor:`rgba(0,0,0,0.8)`,titleColor:`#fff`,titleFont:{weight:`bold`},titleSpacing:2,titleMarginBottom:6,titleAlign:`left`,bodyColor:`#fff`,bodySpacing:2,bodyFont:{},bodyAlign:`left`,footerColor:`#fff`,footerSpacing:2,footerMarginTop:6,footerFont:{weight:`bold`},footerAlign:`left`,padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:`#fff`,displayColors:!0,boxPadding:0,borderColor:`rgba(0,0,0,0)`,borderWidth:0,animation:{duration:400,easing:`easeOutQuart`},animations:{numbers:{type:`number`,properties:[`x`,`y`,`width`,`height`,`caretX`,`caretY`]},opacity:{easing:`linear`,duration:200}},callbacks:Vc},defaultRoutes:{bodyFont:`font`,footerFont:`font`,titleFont:`font`},descriptors:{_scriptable:e=>e!==`filter`&&e!==`itemSort`&&e!==`external`,_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:`animation`}},additionalOptionScopes:[`interaction`]}}),Gc=(e,t,n,r)=>(typeof t==`string`?(n=e.push(t)-1,r.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function Kc(e,t,n,r){let i=e.indexOf(t);return i===-1?Gc(e,t,n,r):i===e.lastIndexOf(t)?i:n}var qc=(e,t)=>e===null?null:R(Math.round(e),0,t);function Jc(e){let t=this.getLabels();return e>=0&&e<t.length?t[e]:e}var Yc=class extends Ga{static id=`category`;static defaults={ticks:{callback:Jc}};constructor(e){super(e),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(e){let t=this._addedLabels;if(t.length){let e=this.getLabels();for(let{index:n,label:r}of t)e[n]===r&&e.splice(n,1);this._addedLabels=[]}super.init(e)}parse(e,t){if(O(e))return null;let n=this.getLabels();return t=isFinite(t)&&n[t]===e?t:Kc(n,e,M(t,e),this._addedLabels),qc(t,n.length-1)}determineDataLimits(){let{minDefined:e,maxDefined:t}=this.getUserBounds(),{min:n,max:r}=this.getMinMax(!0);this.options.bounds===`ticks`&&(e||(n=0),t||(r=this.getLabels().length-1)),this.min=n,this.max=r}buildTicks(){let e=this.min,t=this.max,n=this.options.offset,r=[],i=this.getLabels();i=e===0&&t===i.length-1?i:i.slice(e,t+1),this._valueRange=Math.max(i.length-+!n,1),this._startValue=this.min-(n?.5:0);for(let n=e;n<=t;n++)r.push({value:n});return r}getLabelForValue(e){return Jc.call(this,e)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(e){return typeof e!=`number`&&(e=this.parse(e)),e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getPixelForTick(e){let t=this.ticks;return e<0||e>t.length-1?null:this.getPixelForValue(t[e].value)}getValueForPixel(e){return Math.round(this._startValue+this.getDecimalForPixel(e)*this._valueRange)}getBasePixel(){return this.bottom}};function Xc(e,t){let n=[],{bounds:r,step:i,min:a,max:o,precision:s,count:c,maxTicks:l,maxDigits:u,includeBounds:d}=e,f=i||1,p=l-1,{min:m,max:h}=t,g=!O(a),_=!O(o),v=!O(c),y=(h-m)/(u+1),b=Ke((h-m)/p/f)*f,x,S,C,w;if(b<1e-14&&!g&&!_)return[{value:m},{value:h}];w=Math.ceil(h/b)-Math.floor(m/b),w>p&&(b=Ke(w*b/p/f)*f),O(s)||(x=10**s,b=Math.ceil(b*x)/x),r===`ticks`?(S=Math.floor(m/b)*b,C=Math.ceil(h/b)*b):(S=m,C=h),g&&_&&i&&Xe((o-a)/i,b/1e3)?(w=Math.round(Math.min((o-a)/b,l)),b=(o-a)/w,S=a,C=o):v?(S=g?a:S,C=_?o:C,w=c-1,b=(C-S)/w):(w=(C-S)/b,w=Ge(w,Math.round(w),b/1e3)?Math.round(w):Math.ceil(w));let T=Math.max(et(b),et(S));x=10**(O(s)?T:s),S=Math.round(S*x)/x,C=Math.round(C*x)/x;let E=0;for(g&&(d&&S!==a?(n.push({value:a}),S<a&&E++,Ge(Math.round((S+E*b)*x)/x,a,Zc(a,y,e))&&E++):S<a&&E++);E<w;++E){let e=Math.round((S+E*b)*x)/x;if(_&&e>o)break;n.push({value:e})}return _&&d&&C!==o?n.length&&Ge(n[n.length-1].value,o,Zc(o,y,e))?n[n.length-1].value=o:n.push({value:o}):_&&C!==o||n.push({value:C}),n}function Zc(e,t,{horizontal:n,minRotation:r}){let i=Qe(r),a=(n?Math.sin(i):Math.cos(i))||.001,o=.75*t*(``+e).length;return Math.min(t/a,o)}var Qc=class extends Ga{constructor(e){super(e),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(e,t){return O(e)||(typeof e==`number`||e instanceof Number)&&!isFinite(+e)?null:+e}handleTickRangeOptions(){let{beginAtZero:e}=this.options,{minDefined:t,maxDefined:n}=this.getUserBounds(),{min:r,max:i}=this,a=e=>r=t?r:e,o=e=>i=n?i:e;if(e){let e=We(r),t=We(i);e<0&&t<0?o(0):e>0&&t>0&&a(0)}if(r===i){let t=i===0?1:Math.abs(i*.05);o(i+t),e||a(r-t)}this.min=r,this.max=i}getTickLimit(){let{maxTicksLimit:e,stepSize:t}=this.options.ticks,n;return t?(n=Math.ceil(this.max/t)-Math.floor(this.min/t)+1,n>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${t} would result generating up to ${n} ticks. Limiting to 1000.`),n=1e3)):(n=this.computeTickLimit(),e||=11),e&&(n=Math.min(e,n)),n}computeTickLimit(){return 1/0}buildTicks(){let e=this.options,t=e.ticks,n=this.getTickLimit();n=Math.max(2,n);let r=Xc({maxTicks:n,bounds:e.bounds,min:e.min,max:e.max,precision:t.precision,step:t.stepSize,count:t.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:t.minRotation||0,includeBounds:t.includeBounds!==!1},this._range||this);return e.bounds===`ticks`&&Ze(r,this,`value`),e.reverse?(r.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),r}configure(){let e=this.ticks,t=this.min,n=this.max;if(super.configure(),this.options.offset&&e.length){let r=(n-t)/Math.max(e.length-1,1)/2;t-=r,n+=r}this._startValue=t,this._endValue=n,this._valueRange=n-t}getLabelForValue(e){return It(e,this.chart.options.locale,this.options.ticks.format)}},$c=class extends Qc{static id=`linear`;static defaults={ticks:{callback:zt.formatters.numeric}};determineDataLimits(){let{min:e,max:t}=this.getMinMax(!0);this.min=j(e)?e:0,this.max=j(t)?t:1,this.handleTickRangeOptions()}computeTickLimit(){let e=this.isHorizontal(),t=e?this.width:this.height,n=Qe(this.options.ticks.minRotation),r=(e?Math.sin(n):Math.cos(n))||.001,i=this._resolveTickFontOptions(0);return Math.ceil(t/Math.min(40,i.lineHeight/r))}getPixelForValue(e){return e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getValueForPixel(e){return this._startValue+this.getDecimalForPixel(e)*this._valueRange}},el=e=>Math.floor(Ue(e)),tl=(e,t)=>10**(el(e)+t);function nl(e){return e/10**el(e)==1}function rl(e,t,n){let r=10**n,i=Math.floor(e/r);return Math.ceil(t/r)-i}function il(e,t){let n=el(t-e);for(;rl(e,t,n)>10;)n++;for(;rl(e,t,n)<10;)n--;return Math.min(n,el(e))}function al(e,{min:t,max:n}){t=ye(e.min,t);let r=[],i=el(t),a=il(t,n),o=a<0?10**Math.abs(a):1,s=10**a,c=i>a?10**i:0,l=Math.round((t-c)*o)/o,u=Math.floor((t-c)/s/10)*s*10,d=Math.floor((l-u)/10**a),f=ye(e.min,Math.round((c+u+d*10**a)*o)/o);for(;f<n;)r.push({value:f,major:nl(f),significand:d}),d>=10?d=d<15?15:20:d++,d>=20&&(a++,d=2,o=a>=0?1:o),f=Math.round((c+u+d*10**a)*o)/o;let p=ye(e.max,f);return r.push({value:p,major:nl(p),significand:d}),r}var ol=class extends Ga{static id=`logarithmic`;static defaults={ticks:{callback:zt.formatters.logarithmic,major:{enabled:!0}}};constructor(e){super(e),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(e,t){let n=Qc.prototype.parse.apply(this,[e,t]);if(n===0)this._zero=!0;else return j(n)&&n>0?n:null}determineDataLimits(){let{min:e,max:t}=this.getMinMax(!0);this.min=j(e)?Math.max(0,e):null,this.max=j(t)?Math.max(0,t):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!j(this._userMin)&&(this.min=e===tl(this.min,0)?tl(this.min,-1):tl(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){let{minDefined:e,maxDefined:t}=this.getUserBounds(),n=this.min,r=this.max,i=t=>n=e?n:t,a=e=>r=t?r:e;n===r&&(n<=0?(i(1),a(10)):(i(tl(n,-1)),a(tl(r,1)))),n<=0&&i(tl(r,-1)),r<=0&&a(tl(n,1)),this.min=n,this.max=r}buildTicks(){let e=this.options,t=al({min:this._userMin,max:this._userMax},this);return e.bounds===`ticks`&&Ze(t,this,`value`),e.reverse?(t.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),t}getLabelForValue(e){return e===void 0?`0`:It(e,this.chart.options.locale,this.options.ticks.format)}configure(){let e=this.min;super.configure(),this._startValue=Ue(e),this._valueRange=Ue(this.max)-Ue(e)}getPixelForValue(e){return(e===void 0||e===0)&&(e=this.min),e===null||isNaN(e)?NaN:this.getPixelForDecimal(e===this.min?0:(Ue(e)-this._startValue)/this._valueRange)}getValueForPixel(e){let t=this.getDecimalForPixel(e);return 10**(this._startValue+t*this._valueRange)}};function sl(e){let t=e.ticks;if(t.display&&e.display){let e=V(t.backdropPadding);return M(t.font&&t.font.size,B.font.size)+e.height}return 0}function cl(e,t,n){return n=k(n)?n:[n],{w:qt(e,t.string,n),h:n.length*t.lineHeight}}function ll(e,t,n,r,i){return e===r||e===i?{start:t-n/2,end:t+n/2}:e<r||e>i?{start:t-n,end:t}:{start:t,end:t+n}}function ul(e){let t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),r=[],i=[],a=e._pointLabels.length,o=e.options.pointLabels,s=o.centerPointLabels?F/a:0;for(let c=0;c<a;c++){let a=o.setContext(e.getPointLabelContext(c));i[c]=a.padding;let l=e.getPointPosition(c,e.drawingArea+i[c],s),u=H(a.font),d=cl(e.ctx,u,e._pointLabels[c]);r[c]=d;let f=it(e.getIndexAngle(c)+s),p=Math.round($e(f));dl(n,t,f,ll(p,l.x,d.w,0,180),ll(p,l.y,d.h,90,270))}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=ml(e,r,i)}function dl(e,t,n,r,i){let a=Math.abs(Math.sin(n)),o=Math.abs(Math.cos(n)),s=0,c=0;r.start<t.l?(s=(t.l-r.start)/a,e.l=Math.min(e.l,t.l-s)):r.end>t.r&&(s=(r.end-t.r)/a,e.r=Math.max(e.r,t.r+s)),i.start<t.t?(c=(t.t-i.start)/o,e.t=Math.min(e.t,t.t-c)):i.end>t.b&&(c=(i.end-t.b)/o,e.b=Math.max(e.b,t.b+c))}function fl(e,t,n){let r=e.drawingArea,{extra:i,additionalAngle:a,padding:o,size:s}=n,c=e.getPointPosition(t,r+i+o,a),l=Math.round($e(it(c.angle+L))),u=_l(c.y,s.h,l),d=hl(l),f=gl(c.x,s.w,d);return{visible:!0,x:c.x,y:u,textAlign:d,left:f,top:u,right:f+s.w,bottom:u+s.h}}function pl(e,t){if(!t)return!0;let{left:n,top:r,right:i,bottom:a}=e;return!(Qt({x:n,y:r},t)||Qt({x:n,y:a},t)||Qt({x:i,y:r},t)||Qt({x:i,y:a},t))}function ml(e,t,n){let r=[],i=e._pointLabels.length,a=e.options,{centerPointLabels:o,display:s}=a.pointLabels,c={extra:sl(a)/2,additionalAngle:o?F/i:0},l;for(let a=0;a<i;a++){c.padding=n[a],c.size=t[a];let i=fl(e,a,c);r.push(i),s===`auto`&&(i.visible=pl(i,l),i.visible&&(l=i))}return r}function hl(e){return e===0||e===180?`center`:e<180?`left`:`right`}function gl(e,t,n){return n===`right`?e-=t:n===`center`&&(e-=t/2),e}function _l(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function vl(e,t,n){let{left:r,top:i,right:a,bottom:o}=n,{backdropColor:s}=t;if(!O(s)){let n=hn(t.borderRadius),c=V(t.backdropPadding);e.fillStyle=s;let l=r-c.left,u=i-c.top,d=a-r+c.width,f=o-i+c.height;Object.values(n).some(e=>e!==0)?(e.beginPath(),cn(e,{x:l,y:u,w:d,h:f,radius:n}),e.fill()):e.fillRect(l,u,d,f)}}function yl(e,t){let{ctx:n,options:{pointLabels:r}}=e;for(let i=t-1;i>=0;i--){let t=e._pointLabelItems[i];if(!t.visible)continue;let a=r.setContext(e.getPointLabelContext(i));vl(n,a,t);let o=H(a.font),{x:s,y:c,textAlign:l}=t;sn(n,e._pointLabels[i],s,c+o.lineHeight/2,o,{color:a.color,textAlign:l,textBaseline:`middle`})}}function bl(e,t,n,r){let{ctx:i}=e;if(n)i.arc(e.xCenter,e.yCenter,t,0,I);else{let n=e.getPointPosition(0,t);i.moveTo(n.x,n.y);for(let a=1;a<r;a++)n=e.getPointPosition(a,t),i.lineTo(n.x,n.y)}}function xl(e,t,n,r,i){let a=e.ctx,o=t.circular,{color:s,lineWidth:c}=t;!o&&!r||!s||!c||n<0||(a.save(),a.strokeStyle=s,a.lineWidth=c,a.setLineDash(i.dash||[]),a.lineDashOffset=i.dashOffset,a.beginPath(),bl(e,n,o,r),a.closePath(),a.stroke(),a.restore())}function Sl(e,t,n){return vn(e,{label:n,index:t,type:`pointLabel`})}var Cl=class extends Qc{static id=`radialLinear`;static defaults={display:!0,animate:!0,position:`chartArea`,angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:zt.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(e){return e},padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":`borderColor`,"pointLabels.color":`color`,"ticks.color":`color`};static descriptors={angleLines:{_fallback:`grid`}};constructor(e){super(e),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){let e=this._padding=V(sl(this.options)/2),t=this.width=this.maxWidth-e.width,n=this.height=this.maxHeight-e.height;this.xCenter=Math.floor(this.left+t/2+e.left),this.yCenter=Math.floor(this.top+n/2+e.top),this.drawingArea=Math.floor(Math.min(t,n)/2)}determineDataLimits(){let{min:e,max:t}=this.getMinMax(!1);this.min=j(e)&&!isNaN(e)?e:0,this.max=j(t)&&!isNaN(t)?t:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/sl(this.options))}generateTickLabels(e){Qc.prototype.generateTickLabels.call(this,e),this._pointLabels=this.getLabels().map((e,t)=>{let n=N(this.options.pointLabels.callback,[e,t],this);return n||n===0?n:``}).filter((e,t)=>this.chart.getDataVisibility(t))}fit(){let e=this.options;e.display&&e.pointLabels.display?ul(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(e,t,n,r){this.xCenter+=Math.floor((e-t)/2),this.yCenter+=Math.floor((n-r)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(e,t,n,r))}getIndexAngle(e){let t=I/(this._pointLabels.length||1),n=this.options.startAngle||0;return it(e*t+Qe(n))}getDistanceFromCenterForValue(e){if(O(e))return NaN;let t=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-e)*t:(e-this.min)*t}getValueForDistanceFromCenter(e){if(O(e))return NaN;let t=e/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-t:this.min+t}getPointLabelContext(e){let t=this._pointLabels||[];if(e>=0&&e<t.length){let n=t[e];return Sl(this.getContext(),e,n)}}getPointPosition(e,t,n=0){let r=this.getIndexAngle(e)-L+n;return{x:Math.cos(r)*t+this.xCenter,y:Math.sin(r)*t+this.yCenter,angle:r}}getPointPositionForValue(e,t){return this.getPointPosition(e,this.getDistanceFromCenterForValue(t))}getBasePosition(e){return this.getPointPositionForValue(e||0,this.getBaseValue())}getPointLabelPosition(e){let{left:t,top:n,right:r,bottom:i}=this._pointLabelItems[e];return{left:t,top:n,right:r,bottom:i}}drawBackground(){let{backgroundColor:e,grid:{circular:t}}=this.options;if(e){let n=this.ctx;n.save(),n.beginPath(),bl(this,this.getDistanceFromCenterForValue(this._endValue),t,this._pointLabels.length),n.closePath(),n.fillStyle=e,n.fill(),n.restore()}}drawGrid(){let e=this.ctx,t=this.options,{angleLines:n,grid:r,border:i}=t,a=this._pointLabels.length,o,s,c;if(t.pointLabels.display&&yl(this,a),r.display&&this.ticks.forEach((e,t)=>{if(t!==0||t===0&&this.min<0){s=this.getDistanceFromCenterForValue(e.value);let n=this.getContext(t),o=r.setContext(n),c=i.setContext(n);xl(this,o,s,a,c)}}),n.display){for(e.save(),o=a-1;o>=0;o--){let r=n.setContext(this.getPointLabelContext(o)),{color:i,lineWidth:a}=r;a&&i&&(e.lineWidth=a,e.strokeStyle=i,e.setLineDash(r.borderDash),e.lineDashOffset=r.borderDashOffset,s=this.getDistanceFromCenterForValue(t.reverse?this.min:this.max),c=this.getPointPosition(o,s),e.beginPath(),e.moveTo(this.xCenter,this.yCenter),e.lineTo(c.x,c.y),e.stroke())}e.restore()}}drawBorder(){}drawLabels(){let e=this.ctx,t=this.options,n=t.ticks;if(!n.display)return;let r=this.getIndexAngle(0),i,a;e.save(),e.translate(this.xCenter,this.yCenter),e.rotate(r),e.textAlign=`center`,e.textBaseline=`middle`,this.ticks.forEach((r,o)=>{if(o===0&&this.min>=0&&!t.reverse)return;let s=n.setContext(this.getContext(o)),c=H(s.font);if(i=this.getDistanceFromCenterForValue(this.ticks[o].value),s.showLabelBackdrop){e.font=c.string,a=e.measureText(r.label).width,e.fillStyle=s.backdropColor;let t=V(s.backdropPadding);e.fillRect(-a/2-t.left,-i-c.size/2-t.top,a+t.width,c.size+t.height)}sn(e,r.label,0,-i,c,{color:s.color,strokeColor:s.textStrokeColor,strokeWidth:s.textStrokeWidth})}),e.restore()}drawTitle(){}},wl={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Tl=Object.keys(wl);function El(e,t){return e-t}function Dl(e,t){if(O(t))return null;let n=e._adapter,{parser:r,round:i,isoWeekday:a}=e._parseOpts,o=t;return typeof r==`function`&&(o=r(o)),j(o)||(o=typeof r==`string`?n.parse(o,r):n.parse(o)),o===null?null:(i&&(o=i===`week`&&(Ye(a)||a===!0)?n.startOf(o,`isoWeek`,a):n.startOf(o,i)),+o)}function Ol(e,t,n,r){let i=Tl.length;for(let a=Tl.indexOf(e);a<i-1;++a){let e=wl[Tl[a]],i=e.steps?e.steps:2**53-1;if(e.common&&Math.ceil((n-t)/(i*e.size))<=r)return Tl[a]}return Tl[i-1]}function kl(e,t,n,r,i){for(let a=Tl.length-1;a>=Tl.indexOf(n);a--){let n=Tl[a];if(wl[n].common&&e._adapter.diff(i,r,n)>=t-1)return n}return Tl[n?Tl.indexOf(n):0]}function Al(e){for(let t=Tl.indexOf(e)+1,n=Tl.length;t<n;++t)if(wl[Tl[t]].common)return Tl[t]}function jl(e,t,n){if(!n)e[t]=!0;else if(n.length){let{lo:r,hi:i}=ct(n,t),a=n[r]>=t?n[r]:n[i];e[a]=!0}}function Ml(e,t,n,r){let i=e._adapter,a=+i.startOf(t[0].value,r),o=t[t.length-1].value,s,c;for(s=a;s<=o;s=+i.add(s,1,r))c=n[s],c>=0&&(t[c].major=!0);return t}function Nl(e,t,n){let r=[],i={},a=t.length,o,s;for(o=0;o<a;++o)s=t[o],i[s]=o,r.push({value:s,major:!1});return a===0||!n?r:Ml(e,r,i,n)}var Pl=class extends Ga{static id=`time`;static defaults={bounds:`data`,adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:`millisecond`,displayFormats:{}},ticks:{source:`auto`,callback:!1,major:{enabled:!1}}};constructor(e){super(e),this._cache={data:[],labels:[],all:[]},this._unit=`day`,this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(e,t={}){let n=e.time||={},r=this._adapter=new Ai._date(e.adapters.date);r.init(t),De(n.displayFormats,r.formats()),this._parseOpts={parser:n.parser,round:n.round,isoWeekday:n.isoWeekday},super.init(e),this._normalized=t.normalized}parse(e,t){return e===void 0?null:Dl(this,e)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){let e=this.options,t=this._adapter,n=e.time.unit||`day`,{min:r,max:i,minDefined:a,maxDefined:o}=this.getUserBounds();function s(e){!a&&!isNaN(e.min)&&(r=Math.min(r,e.min)),!o&&!isNaN(e.max)&&(i=Math.max(i,e.max))}a&&o||(s(this._getLabelBounds()),(e.bounds!==`ticks`||e.ticks.source!==`labels`)&&s(this.getMinMax(!1))),r=j(r)&&!isNaN(r)?r:+t.startOf(Date.now(),n),i=j(i)&&!isNaN(i)?i:+t.endOf(Date.now(),n)+1,this.min=Math.min(r,i-1),this.max=Math.max(r+1,i)}_getLabelBounds(){let e=this.getLabelTimestamps(),t=1/0,n=-1/0;return e.length&&(t=e[0],n=e[e.length-1]),{min:t,max:n}}buildTicks(){let e=this.options,t=e.time,n=e.ticks,r=n.source===`labels`?this.getLabelTimestamps():this._generate();e.bounds===`ticks`&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);let i=this.min,a=this.max,o=dt(r,i,a);return this._unit=t.unit||(n.autoSkip?Ol(t.minUnit,this.min,this.max,this._getLabelCapacity(i)):kl(this,o.length,t.minUnit,this.min,this.max)),this._majorUnit=!n.major.enabled||this._unit===`year`?void 0:Al(this._unit),this.initOffsets(r),e.reverse&&o.reverse(),Nl(this,o,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(e=>+e.value))}initOffsets(e=[]){let t=0,n=0,r,i;this.options.offset&&e.length&&(r=this.getDecimalForValue(e[0]),t=e.length===1?1-r:(this.getDecimalForValue(e[1])-r)/2,i=this.getDecimalForValue(e[e.length-1]),n=e.length===1?i:(i-this.getDecimalForValue(e[e.length-2]))/2);let a=e.length<3?.5:.25;t=R(t,0,a),n=R(n,0,a),this._offsets={start:t,end:n,factor:1/(t+1+n)}}_generate(){let e=this._adapter,t=this.min,n=this.max,r=this.options,i=r.time,a=i.unit||Ol(i.minUnit,t,n,this._getLabelCapacity(t)),o=M(r.ticks.stepSize,1),s=a===`week`&&i.isoWeekday,c=Ye(s)||s===!0,l={},u=t,d,f;if(c&&(u=+e.startOf(u,`isoWeek`,s)),u=+e.startOf(u,c?`day`:a),e.diff(n,t,a)>1e5*o)throw Error(t+` and `+n+` are too far apart with stepSize of `+o+` `+a);let p=r.ticks.source===`data`&&this.getDataTimestamps();for(d=u,f=0;d<n;d=+e.add(d,o,a),f++)jl(l,d,p);return(d===n||r.bounds===`ticks`||f===1)&&jl(l,d,p),Object.keys(l).sort(El).map(e=>+e)}getLabelForValue(e){let t=this._adapter,n=this.options.time;return n.tooltipFormat?t.format(e,n.tooltipFormat):t.format(e,n.displayFormats.datetime)}format(e,t){let n=this.options.time.displayFormats,r=this._unit,i=t||n[r];return this._adapter.format(e,i)}_tickFormatFunction(e,t,n,r){let i=this.options,a=i.ticks.callback;if(a)return N(a,[e,t,n],this);let o=i.time.displayFormats,s=this._unit,c=this._majorUnit,l=s&&o[s],u=c&&o[c],d=n[t],f=c&&u&&d&&d.major;return this._adapter.format(e,r||(f?u:l))}generateTickLabels(e){let t,n,r;for(t=0,n=e.length;t<n;++t)r=e[t],r.label=this._tickFormatFunction(r.value,t,e)}getDecimalForValue(e){return e===null?NaN:(e-this.min)/(this.max-this.min)}getPixelForValue(e){let t=this._offsets,n=this.getDecimalForValue(e);return this.getPixelForDecimal((t.start+n)*t.factor)}getValueForPixel(e){let t=this._offsets,n=this.getDecimalForPixel(e)/t.factor-t.end;return this.min+n*(this.max-this.min)}_getLabelSize(e){let t=this.options.ticks,n=this.ctx.measureText(e).width,r=Qe(this.isHorizontal()?t.maxRotation:t.minRotation),i=Math.cos(r),a=Math.sin(r),o=this._resolveTickFontOptions(0).size;return{w:n*i+o*a,h:n*a+o*i}}_getLabelCapacity(e){let t=this.options.time,n=t.displayFormats,r=n[t.unit]||n.millisecond,i=this._tickFormatFunction(e,0,Nl(this,[e],this._majorUnit),r),a=this._getLabelSize(i),o=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return o>0?o:1}getDataTimestamps(){let e=this._cache.data||[],t,n;if(e.length)return e;let r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(t=0,n=r.length;t<n;++t)e=e.concat(r[t].controller.getAllParsedValues(this));return this._cache.data=this.normalize(e)}getLabelTimestamps(){let e=this._cache.labels||[],t,n;if(e.length)return e;let r=this.getLabels();for(t=0,n=r.length;t<n;++t)e.push(Dl(this,r[t]));return this._cache.labels=this._normalized?e:this.normalize(e)}normalize(e){return ht(e.sort(El))}};function Fl(e,t,n){let r=0,i=e.length-1,a,o,s,c;n?(t>=e[r].pos&&t<=e[i].pos&&({lo:r,hi:i}=lt(e,`pos`,t)),{pos:a,time:s}=e[r],{pos:o,time:c}=e[i]):(t>=e[r].time&&t<=e[i].time&&({lo:r,hi:i}=lt(e,`time`,t)),{time:a,pos:s}=e[r],{time:o,pos:c}=e[i]);let l=o-a;return l?s+(c-s)*(t-a)/l:s}var Il=class extends Pl{static id=`timeseries`;static defaults=Pl.defaults;constructor(e){super(e),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){let e=this._getTimestampsForTable(),t=this._table=this.buildLookupTable(e);this._minPos=Fl(t,this.min),this._tableRange=Fl(t,this.max)-this._minPos,super.initOffsets(e)}buildLookupTable(e){let{min:t,max:n}=this,r=[],i=[],a,o,s,c,l;for(a=0,o=e.length;a<o;++a)c=e[a],c>=t&&c<=n&&r.push(c);if(r.length<2)return[{time:t,pos:0},{time:n,pos:1}];for(a=0,o=r.length;a<o;++a)l=r[a+1],s=r[a-1],c=r[a],Math.round((l+s)/2)!==c&&i.push({time:c,pos:a/(o-1)});return i}_generate(){let e=this.min,t=this.max,n=super.getDataTimestamps();return n.includes(e)&&n.length||n.splice(0,0,e),n.includes(t)&&n.length!==1||n.push(t),n.sort((e,t)=>e-t)}_getTimestampsForTable(){let e=this._cache.all||[];if(e.length)return e;let t=this.getDataTimestamps(),n=this.getLabelTimestamps();return e=t.length&&n.length?this.normalize(t.concat(n)):t.length?t:n,e=this._cache.all=e,e}getDecimalForValue(e){return(Fl(this._table,e)-this._minPos)/this._tableRange}getValueForPixel(e){let t=this._offsets,n=this.getDecimalForPixel(e)/t.factor-t.end;return Fl(this._table,n*this._tableRange+this._minPos,!0)}},Ll=[Oi,hs,Wc,Object.freeze({__proto__:null,CategoryScale:Yc,LinearScale:$c,LogarithmicScale:ol,RadialLinearScale:Cl,TimeScale:Pl,TimeSeriesScale:Il})];Po.register(...Ll);var Rl=Po,zl=globalThis,Bl=zl.ShadowRoot&&(zl.ShadyCSS===void 0||zl.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,Vl=Symbol(),Hl=new WeakMap,Ul=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Vl)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Bl&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Hl.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Hl.set(t,e))}return e}toString(){return this.cssText}},Wl=e=>new Ul(typeof e==`string`?e:e+``,void 0,Vl),Gl=(e,...t)=>new Ul(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,Vl),Kl=(e,t)=>{if(Bl)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=zl.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},ql=Bl?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return Wl(t)})(e):e,{is:Jl,defineProperty:Yl,getOwnPropertyDescriptor:Xl,getOwnPropertyNames:Zl,getOwnPropertySymbols:Ql,getPrototypeOf:$l}=Object,eu=globalThis,tu=eu.trustedTypes,nu=tu?tu.emptyScript:``,ru=eu.reactiveElementPolyfillSupport,iu=(e,t)=>e,au={toAttribute(e,t){switch(t){case Boolean:e=e?nu:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ou=(e,t)=>!Jl(e,t),su={attribute:!0,type:String,converter:au,reflect:!1,useDefault:!1,hasChanged:ou};Symbol.metadata??=Symbol(`metadata`),eu.litPropertyMetadata??=new WeakMap;var cu=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=su){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Yl(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=Xl(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??su}static _$Ei(){if(this.hasOwnProperty(iu(`elementProperties`)))return;let e=$l(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(iu(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(iu(`properties`))){let e=this.properties,t=[...Zl(e),...Ql(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(ql(e))}else e!==void 0&&t.push(ql(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Kl(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?au:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?au:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ou)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};cu.elementStyles=[],cu.shadowRootOptions={mode:`open`},cu[iu(`elementProperties`)]=new Map,cu[iu(`finalized`)]=new Map,ru?.({ReactiveElement:cu}),(eu.reactiveElementVersions??=[]).push(`2.1.2`);var lu=globalThis,uu=e=>e,du=lu.trustedTypes,fu=du?du.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,pu=`$lit$`,mu=`lit$${Math.random().toFixed(9).slice(2)}$`,hu=`?`+mu,gu=`<${hu}>`,_u=document,vu=()=>_u.createComment(``),yu=e=>e===null||typeof e!=`object`&&typeof e!=`function`,bu=Array.isArray,xu=e=>bu(e)||typeof e?.[Symbol.iterator]==`function`,Su=`[ 	
\f\r]`,Cu=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wu=/-->/g,Tu=/>/g,Eu=RegExp(`>|${Su}(?:([^\\s"'>=/]+)(${Su}*=${Su}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Du=/'/g,Ou=/"/g,ku=/^(?:script|style|textarea|title)$/i,W=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),Au=Symbol.for(`lit-noChange`),G=Symbol.for(`lit-nothing`),ju=new WeakMap,Mu=_u.createTreeWalker(_u,129);function Nu(e,t){if(!bu(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return fu===void 0?t:fu.createHTML(t)}var Pu=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=Cu;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===Cu?c[1]===`!--`?o=wu:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=Eu):(ku.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=Eu):o=Tu:o===Eu?c[0]===`>`?(o=i??Cu,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?Eu:c[3]===`"`?Ou:Du):o===Ou||o===Du?o=Eu:o===wu||o===Tu?o=Cu:(o=Eu,i=void 0);let d=o===Eu&&e[t+1].startsWith(`/>`)?` `:``;a+=o===Cu?n+gu:l>=0?(r.push(s),n.slice(0,l)+pu+n.slice(l)+mu+d):n+mu+(l===-2?t:d)}return[Nu(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Fu=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Pu(t,n);if(this.el=e.createElement(l,r),Mu.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Mu.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(pu)){let t=u[o++],n=i.getAttribute(e).split(mu),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Bu:r[1]===`?`?Vu:r[1]===`@`?Hu:zu}),i.removeAttribute(e)}else e.startsWith(mu)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ku.test(i.tagName)){let e=i.textContent.split(mu),t=e.length-1;if(t>0){i.textContent=du?du.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],vu()),Mu.nextNode(),c.push({type:2,index:++a});i.append(e[t],vu())}}}else if(i.nodeType===8){if(i.data===hu)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(mu,e+1))!==-1;)c.push({type:7,index:a}),e+=mu.length-1}}a++}}static createElement(e,t){let n=_u.createElement(`template`);return n.innerHTML=e,n}};function Iu(e,t,n=e,r){if(t===Au)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=yu(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=Iu(e,i._$AS(e,t.values),i,r)),t}var Lu=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??_u).importNode(t,!0);Mu.currentNode=r;let i=Mu.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ru(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Uu(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Mu.nextNode(),a++)}return Mu.currentNode=_u,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ru=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Iu(this,e,t),yu(e)?e===G||e==null||e===``?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==Au&&this._(e):e._$litType$===void 0?e.nodeType===void 0?xu(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&yu(this._$AH)?this._$AA.nextSibling.data=e:this.T(_u.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Fu.createElement(Nu(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Lu(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ju.get(e.strings);return t===void 0&&ju.set(e.strings,t=new Fu(e)),t}k(t){bu(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(vu()),this.O(vu()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=uu(e).nextSibling;uu(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},zu=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=G}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Iu(this,e,t,0),a=!yu(e)||e!==this._$AH&&e!==Au,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Iu(this,r[n+o],t,o),s===Au&&(s=this._$AH[o]),a||=!yu(s)||s!==this._$AH[o],s===G?e=G:e!==G&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Bu=class extends zu{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}},Vu=class extends zu{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}},Hu=class extends zu{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Iu(this,e,t,0)??G)===Au)return;let n=this._$AH,r=e===G&&n!==G||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==G&&(n===G||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Uu=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Iu(this,e)}},Wu=lu.litHtmlPolyfillSupport;Wu?.(Fu,Ru),(lu.litHtmlVersions??=[]).push(`3.3.3`);var Gu=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ru(t.insertBefore(vu(),e),e,void 0,n??{})}return i._$AI(e),i},Ku=globalThis,qu=class extends cu{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Gu(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Au}};qu._$litElement$=!0,qu.finalized=!0,Ku.litElementHydrateSupport?.({LitElement:qu});var Ju=Ku.litElementPolyfillSupport;Ju?.({LitElement:qu}),(Ku.litElementVersions??=[]).push(`4.2.2`);function Yu(){return{scale:1,offsetX:0,offsetY:0}}async function Xu(e){let t=new Image;return await new Promise((n,r)=>{t.onload=()=>n(),t.onerror=()=>r(Error(`Could not load image`)),t.src=e}),t}async function Zu(e){let t=URL.createObjectURL(e);try{return await Xu(t)}finally{URL.revokeObjectURL(t)}}async function Qu(e){let t=URL.createObjectURL(e);try{return await Xu(t)}finally{URL.revokeObjectURL(t)}}function $u(e,t,n){if(t===n)return e;let r=n/t;return{scale:e.scale,offsetX:e.offsetX*r,offsetY:e.offsetY*r}}function ed(e,t,n){let r=Math.max(t/e.naturalWidth,t/e.naturalHeight)*Math.max(1,n.scale),i=e.naturalWidth*r,a=e.naturalHeight*r;return{x:(t-i)/2+n.offsetX,y:(t-a)/2+n.offsetY,w:i,h:a}}function td(e,t,n){let r=e.width,i=e.getContext(`2d`);if(!i)return;i.clearRect(0,0,r,r);let{x:a,y:o,w:s,h:c}=ed(t,r,n);i.save(),i.beginPath(),i.arc(r/2,r/2,r/2,0,Math.PI*2),i.clip(),i.drawImage(t,a,o,s,c),i.restore(),i.strokeStyle=`var(--divider-color, #ccc)`,i.lineWidth=2,i.beginPath(),i.arc(r/2,r/2,r/2-1,0,Math.PI*2),i.stroke()}async function nd(e,t=2048){let n=await Zu(e),r=n.naturalWidth,i=n.naturalHeight;if(r<=0||i<=0)throw Error(`Invalid image dimensions`);let a=Math.min(1,t/Math.max(r,i)),o=Math.max(1,Math.round(r*a)),s=Math.max(1,Math.round(i*a)),c=document.createElement(`canvas`);c.width=o,c.height=s;let l=c.getContext(`2d`);if(!l)throw Error(`Canvas unavailable`);return l.drawImage(n,0,0,o,s),new Promise((e,t)=>{c.toBlob(n=>{n?e(n):t(Error(`Export failed`))},`image/jpeg`,.9)})}function rd(e,t,n=512,r=280){let i=document.createElement(`canvas`);i.width=n,i.height=n;let a=i.getContext(`2d`);if(!a)return Promise.reject(Error(`Canvas unavailable`));let{x:o,y:s,w:c,h:l}=ed(e,n,$u(t,r,n));return a.drawImage(e,o,s,c,l),new Promise((e,t)=>{i.toBlob(n=>{n?e(n):t(Error(`Export failed`))},`image/jpeg`,.9)})}var id=Gl`
    :host {
      display: block;
      height: 100%;
      color: var(--primary-text-color);
      background: var(--primary-background-color, transparent);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .shell {
      margin: 0 auto;
      padding: 20px 24px 48px;
      box-sizing: border-box;
      width: 100%;
    }
    .top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: 12px;
    }
    .brand {
      display: flex;
      align-items: center;
      min-width: 0;
    }
    .brand-logo {
      height: 36px;
      width: auto;
      display: block;
      object-fit: contain;
    }
    .tabs { display: flex; flex-wrap: wrap; gap: 4px; margin-left: auto; }
    .tabs button, .subtabs button, .toolbar button:not(.md-btn), .inline-form button:not(.md-btn), .row-actions button:not(.md-btn), .chip {
      appearance: none;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      color: var(--primary-text-color);
      border-radius: var(--ha-border-radius-pill, 9999px);
      padding: 6px 12px;
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tabs button.active, .subtabs button.active, .chip.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: transparent;
    }
    button.danger { color: var(--error-color); }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      flex-shrink: 0;
    }
    .icon-btn:hover {
      background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
    }
    .icon-btn svg { width: 24px; height: 24px; }
    .mdi { width: 20px; height: 20px; fill: currentColor; display: block; }
    .banner, .error {
      padding: 8px 12px;
      border-radius: var(--ha-border-radius-md, 8px);
      margin: 0 0 12px;
    }
    .banner { background: var(--secondary-background-color); }
    .error { background: color-mix(in srgb, var(--error-color) 18%, transparent); color: var(--error-color); }
    .muted { color: var(--secondary-text-color); font-size: 0.9em; }
    .loading-panel {
      display: flex;
      flex-direction: column;
      gap: 0;
      min-height: 12rem;
    }
    .loading-bar {
      height: 3px;
      width: 100%;
      overflow: hidden;
      border-radius: 2px;
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      margin-bottom: 20px;
    }
    .loading-bar-fill {
      height: 100%;
      width: 35%;
      border-radius: 2px;
      background: var(--primary-color);
      animation: loading-bar-indeterminate 1.15s ease-in-out infinite;
    }
    @keyframes loading-bar-indeterminate {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(320%); }
    }
    .skel {
      background: color-mix(
        in srgb,
        var(--secondary-text-color, #888) 14%,
        var(--secondary-background-color, var(--card-background-color, #eee))
      );
      border-radius: var(--ha-border-radius-md, 8px);
      animation: skel-pulse 1.4s ease-in-out infinite;
    }
    @keyframes skel-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .skel-line { height: 0.75rem; }
    .skel-line--lg { width: 3.5rem; height: 1.35rem; margin-bottom: 8px; }
    .skel-line--md { width: 55%; max-width: 10rem; }
    .skel-line--sm { width: 4.5rem; height: 0.65rem; margin-top: 8px; }
    .skel-line--full { width: 100%; margin-top: 10px; }
    .skel-stat {
      border-left-color: color-mix(in srgb, var(--primary-color) 35%, transparent);
    }
    .skel-chart {
      height: 160px;
      width: 100%;
      margin-top: 12px;
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .skel-toolbar-search {
      flex: 1;
      min-width: 160px;
      height: 40px;
      border-radius: var(--ha-border-radius-lg, 12px);
    }
    .skel-toolbar-btn {
      width: 6.5rem;
      height: 40px;
      border-radius: var(--ha-border-radius-pill, 9999px);
      margin-left: auto;
    }
    .skel-people {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .skel-person-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid var(--divider-color);
    }
    .skel-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .skel-person-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .skel-person-text .skel-line--sm { margin-top: 6px; }
    .skel-settings {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .skel-settings-card {
      display: flex;
      flex-direction: column;
      gap: 0;
      min-height: 5.5rem;
    }
    .skel-settings-card .skel-line--md { margin-bottom: 4px; }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    .stat {
      padding: 16px;
      border-radius: var(--ha-border-radius-md, 8px);
      border-left: 3px solid var(--primary-color);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .stat-n { display: block; font-size: 1.5rem; font-weight: 600; }
    .stat-label {
      display: block;
      margin-top: 4px;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    .family-stats-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }
    .family-stat {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      text-align: left;
      padding: 16px;
      border: none;
      border-radius: var(--ha-border-radius-md, 8px);
      border-left: 3px solid var(--primary-color);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
      color: inherit;
      cursor: pointer;
      font: inherit;
    }
    .family-stat-name {
      font-weight: 600;
      font-size: 0.95rem;
      line-height: 1.25;
      word-break: break-word;
    }
    .family-stat-n {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.2;
      margin-top: 6px;
    }
    .family-stat-span {
      font-size: 0.85rem;
      margin-top: 4px;
    }
    .charts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .chart-card {
      padding: 12px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .chart-card h3 { margin: 0 0 8px; font-size: 0.95rem; font-weight: 500; }
    .chart-wrap { height: 200px; position: relative; }
    .two-col {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    .dashboard-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 960px) {
      .dashboard-row {
        grid-template-columns: 1fr;
      }
    }
    .dashboard-panel {
      padding: 12px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
      margin-bottom: 0;
    }
    .dashboard-linked-cards {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .parent-slot-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }
    .parent-slot-head {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .source-row {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }
    .source-row-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .source-row-extra {
      display: block;
      font-size: 0.85em;
    }
    .block { margin-bottom: 20px; }
    .block h3 { margin: 0 0 8px; font-size: 1.05rem; font-weight: 500; }
    .heading-with-tip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .info-tip {
      display: inline-flex;
      color: var(--secondary-text-color);
      cursor: help;
    }
    .info-tip svg { width: 16px; height: 16px; }
    .ft-tooltip {
      position: relative;
      display: inline-flex;
      align-items: center;
    }
    .ft-tooltip__popup {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      padding: 6px 10px;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      font-size: 0.8rem;
      line-height: 1.35;
      max-width: 240px;
      white-space: normal;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      opacity: 0;
      pointer-events: none;
      z-index: 99999;
      transition: opacity 0.15s;
      width: max-content;
    }
    .ft-tooltip:hover .ft-tooltip__popup,
    .ft-tooltip:focus-visible .ft-tooltip__popup {
      opacity: 1;
    }
    ul.plain, ul.people { list-style: none; padding: 0; margin: 0; }
    ul.plain li, ul.people li {
      display: flex; align-items: center; justify-content: space-between;
      gap: 8px; padding: 6px 0; border-bottom: 1px solid var(--divider-color);
    }
    .person-row, .linkish {
      appearance: none; border: none; background: none; color: var(--primary-color);
      font: inherit; cursor: pointer; text-align: left; display: inline-flex; gap: 8px; align-items: center;
    }
    .person-row { color: inherit; width: 100%; padding: 8px 0; }
    .toolbar {
      display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; align-items: center;
    }
    .toolbar input[type="search"], .toolbar select, .filters select, .filters input[type="date"],
    .inline-form input, .inline-form select,
    .dialog input, .dialog select, .dialog textarea,
    .settings-me-body input, .settings-me-body select,
    .user-link-form input {
      font: inherit;
      padding: 8px 12px;
      min-height: 40px;
      border-radius: var(--ha-border-radius-lg, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--primary-background-color));
      color: var(--primary-text-color);
      box-sizing: border-box;
      width: 100%;
    }
    select {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M1.41 0L6 4.58 10.59 0 12 1.41 6 7.41 0 1.41z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 36px;
    }
    .toolbar input[type="search"] { flex: 1; min-width: 160px; width: auto; }
    .toolbar select, .filters select, .filters input[type="date"] { width: auto; }
    .filters {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .date-filter {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .toolbar-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }
    .subtabs { display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
    .kv { display: grid; grid-template-columns: 140px 1fr; gap: 6px 12px; margin: 0 0 16px; }
    .kv dt { color: var(--secondary-text-color); }
    .kv dd { margin: 0; }
    .person-head {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 16px;
      padding: 12px 0;
    }
    .person-head h2 { margin: 0; font-size: 1.3rem; font-weight: 500; }
    .person-avatar-edit-btn {
      appearance: none;
      border: none;
      padding: 0;
      margin: 0;
      background: transparent;
      cursor: pointer;
      border-radius: 50%;
      flex-shrink: 0;
      line-height: 0;
      position: relative;
    }
    .person-avatar-edit-label {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-primary-color, #fff);
      background: color-mix(in srgb, var(--primary-text-color, #000) 45%, transparent);
      opacity: 0;
      transition: opacity 0.15s ease;
      pointer-events: none;
    }
    .person-avatar-edit-btn:hover .person-avatar-edit-label,
    .person-avatar-edit-btn:focus-visible .person-avatar-edit-label {
      opacity: 1;
    }
    .person-avatar-edit-btn:hover,
    .person-avatar-edit-btn:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .tree-scroll {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      width: 100%;
    }
    .tree-box {
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: stretch;
    }
    .tree-box.view-tree {
      gap: 0;
      align-items: stretch;
      width: max-content;
      min-width: 100%;
    }
    .view-tree {
      min-width: 0;
      padding: 24px 0 32px;
      --tree-line-color: var(--divider-color);
      --tree-card-width: 280px;
      --tree-gap: 12px;
      --tree-row-gap: 36px;
      --tree-connector: 1.4rem;
    }
    .tree-grid-row {
      display: grid;
      grid-template-columns: repeat(4, var(--tree-card-width));
      column-gap: var(--tree-gap);
      width: fit-content;
      min-width: max-content;
      flex-shrink: 0;
      padding-bottom: var(--tree-row-gap);
      position: relative;
      align-items: stretch;
    }
    .tree-grid-row--children-cont::before {
      display: none;
    }
    .tree-grid-row--gp {
      padding-top: var(--tree-connector);
    }
    .tree-grid-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      min-width: 0;
    }
    .tree-grid-cell--span2,
    .tree-grid-cell--center {
      justify-content: center;
    }
    .tree-grid-pair {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: span 2;
      position: relative;
      align-items: stretch;
      justify-items: center;
    }
    .tree-grid-pair--left { grid-column: 1 / 3; }
    .tree-grid-pair--right { grid-column: 3 / 5; }
    .tree-grid-pair::before {
      content: "";
      position: absolute;
      bottom: calc(-1 * var(--tree-connector));
      left: calc(25% - var(--tree-gap) / 4);
      right: calc(25% - var(--tree-gap) / 4);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-pair:has(.tree-card-wrap--gp-add)::before {
      display: none;
    }
    .tree-grid-row--parents::before {
      content: "";
      position: absolute;
      bottom: calc(var(--tree-connector) - 0.2rem);
      left: calc(25% - var(--tree-gap) / 4);
      right: calc(25% - var(--tree-gap) / 4);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-cell--span2::before {
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
    .tree-grid-row--focus .tree-grid-cell--stem-down::before,
    .tree-grid-row--partner .tree-grid-cell--center::before {
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
    .tree-grid-row--partner {
      padding-bottom: calc(var(--tree-row-gap) / 2);
    }
    .tree-grid-row--children-bus::before {
      content: "";
      position: absolute;
      top: 0;
      left: var(--tree-bus-left, 12.5%);
      right: var(--tree-bus-right, 12.5%);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-cell--children-group {
      width: 100%;
      align-items: center;
    }
    .tree-children-group {
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-wrap: nowrap;
      gap: var(--tree-gap);
      width: fit-content;
      max-width: 100%;
      margin-inline: auto;
      position: relative;
    }
    .tree-grid-row--children-bus .tree-children-group {
      padding-top: calc(var(--tree-connector) + 2px);
    }
    .tree-grid-row--children .tree-card-wrap:not(.tree-card-wrap--empty)::before {
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
    .tree-grid-row--add-child {
      padding-top: 0;
    }
    .tree-card-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: var(--tree-card-width);
      min-width: var(--tree-card-width);
      max-width: var(--tree-card-width);
      flex: 0 0 auto;
      z-index: 1;
    }
    /* Grid cells are column flex: grow height only to match taller siblings on the same row. */
    .tree-grid-cell > .tree-card-wrap {
      flex: 1 0 auto;
    }
    /* Children group is row flex: lock width; stretch height to tallest sibling. */
    .tree-children-group > .tree-card-wrap {
      flex: 0 0 var(--tree-card-width);
      align-self: stretch;
    }
    .tree-card-wrap--gp-add {
      grid-column: 1 / -1;
      justify-self: center;
    }
    .tree-card-wrap--empty {
      min-height: 1px;
      width: var(--tree-card-width);
      min-width: var(--tree-card-width);
      max-width: var(--tree-card-width);
      flex: 0 0 auto;
    }
    .tree-grid-row:not(.tree-grid-row--children):not(.tree-grid-row--add-child) .tree-card-wrap:not(.tree-card-wrap--empty)::after,
    .tree-grid-row--children .tree-card-wrap--stem-down::after {
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
    .tree-grid-row--gp .tree-card-wrap--stem-up::before {
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
    .tree-card-wrap .person-card,
    .tree-card-wrap .add-slot,
    .tree-card-wrap .more-children-card {
      width: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      background: var(--card-background-color, var(--secondary-background-color));
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .tree-card-wrap .add-slot,
    .tree-card-wrap .more-children-card {
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 6px;
    }
    .tree-card-wrap .person-card-footer {
      margin-top: auto;
    }
    .tree-subtabs {
      justify-content: center;
      width: 100%;
    }
    .gen { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; }
    .node {
      padding: 10px 14px; border-radius: var(--ha-border-radius-lg, 12px);
      background: var(--secondary-background-color);
      cursor: pointer; min-width: 100px; text-align: center;
    }
    .node.self { background: var(--primary-color); color: var(--text-primary-color, #fff); font-weight: 600; }

    .section-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 8px; margin: 16px 0 8px;
    }
    .section-head-actions {
      justify-content: flex-start;
    }
    .section-head h3 { margin: 0; }
    .card-list {
      display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;
    }
    .person-card, .event-card {
      appearance: none; border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      border-radius: var(--ha-border-radius-lg, 12px);
      padding: 12px 14px; text-align: left; color: inherit;
      box-shadow: var(--ha-card-box-shadow, none);
      width: 100%; box-sizing: border-box;
    }
    button.person-card { cursor: pointer; font: inherit; display: block; }
    .person-card-title {
      font-weight: 600;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: nowrap;
    }
    .person-card-formal { margin-top: 2px; }
    .person-card-meta, .event-card-meta {
      color: var(--secondary-text-color); font-size: 0.9em; margin-top: 4px;
    }
    .person-card-meta.accent, .person-card-footer {
      color: var(--primary-color); font-size: 0.9em; margin-top: 6px;
    }
    button.person-card-footer,
    span.person-card-footer {
      appearance: none;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      font: inherit;
      text-align: left;
    }
    .event-card-head {
      display: flex; justify-content: space-between; align-items: center; gap: 8px;
    }
    .event-card-title .linkish {
      font-weight: 400;
      padding: 0;
      min-height: 0;
      gap: 0;
    }
    .event-card-desc { margin-top: 6px; }
    .event-timeline {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .event-timeline-item {
      display: grid;
      grid-template-columns: minmax(6.5rem, 8.5rem) 14px minmax(0, 1fr);
      column-gap: 12px;
      align-items: stretch;
      padding-bottom: 12px;
    }
    .event-timeline-date {
      text-align: right;
      padding: 10px 0 0;
      font-size: 0.95rem;
      line-height: 1.35;
      color: var(--secondary-text-color);
      word-break: break-word;
    }
    .event-timeline-age {
      display: block;
      margin-top: 3px;
      font-size: 0.88em;
      opacity: 0.9;
    }
    .event-timeline-spine {
      position: relative;
      display: flex;
      justify-content: center;
    }
    .event-timeline-spine::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      transform: translateX(-50%);
      background: var(--divider-color);
    }
    .event-timeline-item:first-child .event-timeline-spine::before {
      top: 16px;
    }
    .event-timeline-item:last-child .event-timeline-spine::before {
      bottom: calc(100% - 20px);
    }
    .event-timeline-item:only-child .event-timeline-spine::before {
      display: none;
    }
    .event-timeline-dot {
      position: relative;
      z-index: 1;
      width: 9px;
      height: 9px;
      margin-top: 14px;
      border-radius: 50%;
      background: var(--primary-color);
      box-sizing: border-box;
      flex: none;
    }
    .event-timeline-body {
      box-sizing: border-box;
      min-width: 0;
      max-width: min(100%, 36rem);
      padding: 10px 14px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .event-timeline-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
    }
    .event-timeline-head .event-card-title,
    .event-timeline-head > strong {
      font-size: 1.05rem;
    }
    .event-timeline-meta {
      color: var(--secondary-text-color);
      font-size: 0.95em;
      margin-top: 4px;
    }
    .event-timeline-desc {
      margin-top: 6px;
      font-size: 0.95em;
    }
    .import-counts li { justify-content: space-between; }
    .tree-grid {
      display: grid;
      gap: 8px;
      width: 100%;
    }
    .tree-grid--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .tree-grid--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .tree-grid .person-card,
    .tree-grid .add-slot,
    .tree-grid .unknown-children {
      width: 100%;
      max-width: none;
      min-height: 88px;
      box-sizing: border-box;
    }
    .gen .person-card { max-width: 280px; width: 280px; }
    .chip-row { display: flex; flex-wrap: wrap; gap: 6px; }
    .settings-shortcut-chips .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .chip-remove {
      padding: 0 4px;
      font-size: 1.1em;
      line-height: 1;
    }
    .inline-form { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; align-items: center; }
    .event-date-field {
      display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
      flex: 1; min-width: 200px;
    }
    .event-date-field input { flex: 1; min-width: 140px; width: auto; }
    .vital-date-field input[type="date"] {
      width: auto;
      max-width: min(100%, 11.5rem);
      align-self: flex-start;
    }
    .date-input-row {
      display: flex; align-items: center; gap: 8px; flex: 1; min-width: 200px;
    }
    .date-label-grow {
      flex: 1; min-width: 140px;
      display: flex; flex-direction: column; gap: 4px;
    }
    .date-mode-toggle {
      font-size: 0.85em;
      white-space: nowrap;
      flex-shrink: 0;
      align-self: center;
      padding-top: 1.5rem;
    }
    .event-form input, .event-form select { width: auto; min-width: 120px; flex: 1; }
    .check { display: flex; align-items: center; gap: 8px; margin: 8px 0; }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
      padding: 48px 16px;
      color: var(--secondary-text-color);
    }
    .empty-state .brand-logo { height: 56px; width: auto; }
    .empty-state p { margin: 0; max-width: 28rem; }
    .empty-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 8px; }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
    .req { color: var(--error-color, #c62828); margin-left: 2px; }
    .field-label { display: inline-flex; align-items: baseline; gap: 2px; }
    .field-error {
      color: var(--error-color);
      font-size: 0.75rem;
      margin-top: 2px;
    }
    .dialog input.invalid,
    .dialog select.invalid,
    .dialog textarea.invalid {
      border-color: var(--error-color);
    }
    .deceased-icon {
      color: var(--secondary-text-color);
      display: inline-flex;
      vertical-align: middle;
    }
    .deceased-icon svg { width: 1em; height: 1em; }
    .person-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .person-card-head--with-avatar {
      align-items: center;
      gap: 10px;
    }
    .person-card-head-text {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      min-height: 32px;
    }
    .person-card-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
    }
    .person-card-title-main {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      flex: 1;
    }
    .person-card-sex {
      flex-shrink: 0;
      margin-left: auto;
    }
    .person-card-title--clamp {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-width: 0;
    }
    .person-head-main {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      width: 100%;
    }
    .person-head-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      flex: 1;
    }
    .lineage-sentence {
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.35;
    }
    .person-head-main h2 {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      margin: 0;
    }
    .people-table .avatar-col {
      width: 40px;
      padding-right: 4px;
    }
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
    .person-avatar--lg {
      font-size: 1.5rem;
    }
    .person-avatar--detail {
      font-size: 1.1rem;
    }
    .profile-photo-editor {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .profile-crop-wrap {
      position: relative;
      width: min(100%, ${280}px);
      aspect-ratio: 1;
    }
    .profile-crop-canvas {
      display: block;
      width: 100%;
      height: auto;
      touch-action: none;
      cursor: grab;
      background: var(--secondary-background-color);
      border-radius: 50%;
    }
    .profile-crop-canvas:active {
      cursor: grabbing;
    }
    .profile-crop-hint {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 12px;
      pointer-events: none;
    }
    .profile-zoom-label {
      width: 100%;
      max-width: ${280}px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
    }
    .photo-tile {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .photo-thumb-btn ft-authenticated-media-img,
    .photo-thumb-btn img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }
    .photo-thumb-btn {
      appearance: none;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      padding: 0;
      background: var(--secondary-background-color);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      aspect-ratio: 1;
    }
    .photo-thumb-btn img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .photo-profile-badge {
      position: absolute;
      bottom: 4px;
      left: 4px;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 4px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .photo-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.85em;
    }
    .photo-caption {
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .photo-lightbox {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .photo-lightbox img,
    .photo-lightbox-img {
      max-width: min(100%, 900px);
      max-height: 90vh;
      object-fit: contain;
      border-radius: 8px;
      display: block;
    }
    .file-btn {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-size: 0.9em;
    }
    .person-card-wrap { display: flex; flex-direction: column; gap: 6px; }
    .card-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding: 0 4px 8px;
    }
    .person-subtabs {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .subtabs-left { display: flex; flex-wrap: wrap; gap: 4px; }
    .subtabs-actions {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }
    .rel-section h3 { margin: 0; font-size: 1rem; }
    .rel-union-card {
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--card-background-color, var(--secondary-background-color));
    }
    .rel-union-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .rel-union-meta {
      margin: 12px 0;
      padding: 12px 14px;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color);
      font-size: 0.95rem;
      line-height: 1.6;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .rel-union-meta strong { color: var(--primary-text-color); }
    .place-field { position: relative; }
    .place-suggest {
      position: absolute;
      z-index: 2;
      left: 0;
      right: 0;
      margin: 2px 0 0;
      padding: 0;
      list-style: none;
      background: var(--card-background-color, var(--secondary-background-color));
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0,0,0,0.12));
      max-height: 180px;
      overflow: auto;
    }
    .place-suggest button {
      display: block;
      width: 100%;
      text-align: left;
      padding: 8px 12px;
      border: none;
      background: none;
      font: inherit;
      cursor: pointer;
    }
    .place-suggest button:hover { background: var(--secondary-background-color); }
    .union-tabs .gen + .gen { margin-top: 16px; }
    .md-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      align-self: flex-start;
      width: auto;
      max-width: 100%;
      height: 36px;
      padding: 0 16px;
      border-radius: var(--ha-button-border-radius, var(--ha-border-radius-pill, 9999px));
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      box-sizing: border-box;
      background: transparent;
      color: var(--primary-color);
      font-family: inherit;
    }
    .md-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .md-btn-filled {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .md-btn-outlined {
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      background: var(--card-background-color, var(--secondary-background-color));
    }
    .md-btn-active.md-btn-outlined {
      background: color-mix(
        in srgb,
        var(--primary-color) 8%,
        var(--card-background-color, var(--secondary-background-color))
      );
    }
    .md-btn-text {
      color: var(--primary-color);
      background: transparent;
      padding: 0 8px;
    }
    .dialog-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 16px;
      box-sizing: border-box;
    }
    .dialog {
      background: var(--card-background-color, var(--secondary-background-color));
      color: var(--primary-text-color);
      padding: 20px;
      border-radius: var(--ha-dialog-border-radius, var(--ha-border-radius-lg, 12px));
      width: min(520px, 100%);
      max-height: 90vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-sizing: border-box;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .dialog-header h2 {
      margin: 0;
      flex: 1;
      min-width: 0;
      font-size: 1.25rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .dialog-title-text { min-width: 0; }
    .dialog-preview-head {
      align-items: center;
      gap: 12px;
    }
    .dialog-preview-head-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      min-width: 0;
      flex: 1;
    }
    .dialog-title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .dialog-close {
      flex-shrink: 0;
      margin: -8px -8px -8px 0;
    }
    .dialog-body {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .dialog-body .collapse-body {
      background: transparent;
    }
    .dialog.dialog-narrow {
      width: 100%;
      height: auto;
      max-height: calc(
        100dvh - max(12px, env(safe-area-inset-top, 0px)) - max(12px, env(safe-area-inset-bottom, 0px)) - 24px
      );
      overflow: hidden;
      padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
    }
    .dialog-backdrop:has(.dialog-narrow) {
      align-items: center;
      padding-top: max(12px, env(safe-area-inset-top, 0px));
      padding-right: max(12px, env(safe-area-inset-right, 0px));
      padding-bottom: max(12px, env(safe-area-inset-bottom, 0px));
      padding-left: max(12px, env(safe-area-inset-left, 0px));
    }
    .form-stack,
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .settings-subhead {
      margin: 16px 0 4px;
      font-size: 0.95rem;
      font-weight: 600;
    }
    .settings-linked-users {
      align-items: stretch;
    }
    .settings-linked-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: stretch;
    }
    .settings-linked-grid > .person-card-wrap {
      width: min(100%, 280px);
      flex: 0 1 280px;
      display: flex;
      flex-direction: column;
    }
    .settings-linked-grid > .person-card-wrap > .person-card {
      flex: 1 1 auto;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .settings-page .collapse-body {
      background: transparent;
    }
    .form-section-title {
      display: block;
      margin: 0 0 8px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--primary-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .me-linked-card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }
    .user-link-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .user-link-form label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.9rem;
    }
    .settings-subsections {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .settings-gedcom-export {
      border-top: 1px solid var(--divider-color);
      padding-top: 16px;
      margin-top: 4px;
    }
    .settings-me-body {
      gap: 8px;
    }
    .settings-me-body .settings-subhead {
      margin: 12px 0 0;
    }
    .settings-me-body .settings-subhead:first-of-type {
      margin-top: 0;
    }
    .settings-me-body p {
      margin: 0;
    }
    .settings-me-username {
      margin: 0;
    }
    .dialog label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.9rem;
    }
    .row2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .check-row .check-control {
      display: flex;
      align-items: center;
      min-height: 40px;
    }
    .check-row input[type="checkbox"] {
      width: auto;
      margin: 0;
      accent-color: var(--primary-color);
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 4px;
    }
    .filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .table-wrap { overflow-x: auto; overflow-y: visible; margin-bottom: 16px; }
    .people-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.92rem;
    }
    .people-table th, .people-table td {
      padding: 10px 8px;
      border-bottom: 1px solid var(--divider-color);
      text-align: left;
      vertical-align: middle;
    }
    .people-table th { color: var(--secondary-text-color); font-weight: 500; }
    .sort-btn {
      appearance: none;
      border: none;
      background: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 0;
    }
    .people-table .num, .people-table .center { text-align: center; }
    .date-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: var(--ha-border-radius-pill, 9999px);
      background: var(--secondary-background-color);
      font-size: 0.88em;
      white-space: nowrap;
    }
    .sex-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: var(--ha-border-radius-pill, 9999px);
      font-size: 0.85em;
      white-space: nowrap;
    }
    .sex-badge svg { width: 14px; height: 14px; }
    .sex-badge--icon-only {
      padding: 4px 6px;
      gap: 0;
    }
    .sex-male { background: color-mix(in srgb, #2196f3 15%, transparent); color: #1565c0; }
    .sex-female { background: color-mix(in srgb, #e91e63 15%, transparent); color: #ad1457; }
    .sex-other { background: var(--secondary-background-color); }
    .lineage-marker {
      color: var(--primary-color);
      display: inline-flex;
      flex-shrink: 0;
      pointer-events: none;
    }
    .lineage-marker svg { width: 16px; height: 16px; }
    .lineage-legend {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin: 0 0 12px;
      line-height: 1.4;
    }
    .name-cell { font-weight: 500; }
    .menu-cell { width: 40px; position: relative; }
    .row-menu-wrap { position: relative; }
    .icon-btn.sm { width: 32px; height: 32px; }
    .row-menu {
      z-index: 100;
      min-width: 140px;
      background: var(--card-background-color, var(--secondary-background-color));
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      box-shadow: var(--ha-card-box-shadow, 0 4px 16px rgba(0,0,0,.12));
      display: flex;
      flex-direction: column;
      padding: 4px;
    }
    .row-menu--fixed { position: fixed; }
    .row-menu button {
      appearance: none;
      border: none;
      background: none;
      text-align: left;
      padding: 8px 10px;
      font: inherit;
      cursor: pointer;
      border-radius: 6px;
    }
    .row-menu button:hover { background: var(--secondary-background-color); }
    .people-cards .person-card-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .back-link {
      appearance: none;
      border: none;
      background: none;
      padding: 0;
      font: inherit;
      font-size: 0.9rem;
      color: var(--primary-color);
      cursor: pointer;
      margin-bottom: 4px;
      text-align: left;
    }
    .back-link:hover { text-decoration: underline; }
    .collapse {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      margin-bottom: 12px;
      overflow: hidden;
      background: var(--card-background-color, var(--secondary-background-color));
    }
    .collapse-head {
      appearance: none;
      border: none;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      background: var(--secondary-background-color);
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      color: inherit;
    }
    .collapse-body {
      padding: 8px 14px 14px;
      background: var(--card-background-color, var(--secondary-background-color));
    }
    .collapse--cards .collapse-body {
      padding: 10px 14px 14px;
      background: color-mix(
        in srgb,
        var(--divider-color) 8%,
        var(--card-background-color, var(--secondary-background-color))
      );
    }
    .gen-row {
      position: relative;
      display: flex;
      justify-content: center;
      width: max-content;
      min-width: 100%;
      box-sizing: border-box;
      align-items: stretch;
    }
    .gen-label {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6rem;
      text-align: left;
      font-size: 0.85rem;
    }
    .gen-label--empty {
      visibility: hidden;
    }
    .siblings-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .preview-body { margin-bottom: 8px; }
    .rel-card-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: stretch;
      gap: 12px;
      width: 100%;
    }
    .rel-card-list .person-card,
    .rel-card-list .add-slot,
    .rel-card-list .more-children-card,
    .rel-card-list .unknown-children {
      width: 280px;
      max-width: 100%;
      flex: 0 1 280px;
      box-sizing: border-box;
    }
    .rel-card-list > .person-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .rel-card-list .add-slot,
    .rel-card-list .more-children-card,
    .rel-card-list .unknown-children {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .rel-person-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 280px;
      max-width: 100%;
      flex: 0 1 280px;
      align-self: stretch;
    }
    .rel-person-wrap .person-card {
      width: 100%;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      box-sizing: border-box;
    }
    .rel-person-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding: 0 4px;
    }
    .rel-union-children { margin-top: 16px; }
    .rel-union-children > .muted {
      display: block;
      margin-bottom: 8px;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .union-tabs {
      width: max-content;
      min-width: 100%;
    }
    .add-slot {
      appearance: none;
      border: 1px dashed var(--divider-color);
      background: transparent;
      color: var(--primary-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      padding: 12px 16px;
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .more-children-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 120px;
      padding: 12px 16px;
      border: 1px dashed var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      box-sizing: border-box;
      text-align: center;
    }
    .more-children-label {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .more-children-add {
      font-size: 0.9rem;
    }
    .unknown-children {
      padding: 8px 12px;
      border: 1px dashed var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
    .me-hits li { flex-direction: column; align-items: flex-start; }
    .me-create { margin-top: 8px; }
    @media (max-width: 720px) {
      .shell { padding: 12px 16px 40px; }
      .view-tree { zoom: 0.8; }
      .siblings-grid { grid-template-columns: 1fr; }
      .stats-row {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
      }
      .family-stats-row {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
      }
      .family-stat { padding: 10px 8px; }
      .family-stat-n { font-size: 1.15rem; }
      .stat { padding: 8px 6px; }
      .stat-n { font-size: 1.15rem; }
      .stat-label { font-size: 0.7rem; }
      .row2 { grid-template-columns: 1fr; }
      .subtabs-actions { width: 100%; justify-content: flex-end; }
      .rel-card-list .person-card,
      .rel-card-list .add-slot,
      .rel-card-list .more-children-card,
      .rel-person-wrap {
        width: 100%;
        flex: 1 1 100%;
      }
      .event-timeline-item {
        grid-template-columns: minmax(4.5rem, 5.5rem) 12px minmax(0, 1fr);
        column-gap: 8px;
        padding-bottom: 10px;
      }
      .event-timeline-body {
        max-width: 100%;
        padding: 8px 10px;
      }
    }
  `,ad=[`exact`,`about`,`before`,`after`,`between`,`from_to`,`estimated`,`calculated`],od=[`JAN`,`FEB`,`MAR`,`APR`,`MAY`,`JUN`,`JUL`,`AUG`,`SEP`,`OCT`,`NOV`,`DEC`],sd={en:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],nl:[`jan`,`feb`,`mrt`,`apr`,`mei`,`jun`,`jul`,`aug`,`sep`,`okt`,`nov`,`dec`]},cd={};[[`jan`,`january`,`januari`],[`feb`,`february`,`februari`],[`mar`,`mrt`,`march`,`maart`],[`apr`,`april`],[`may`,`mei`],[`jun`,`june`,`juni`],[`jul`,`july`,`juli`],[`aug`,`august`,`augustus`],[`sep`,`sept`,`september`],[`oct`,`okt`,`october`,`oktober`],[`nov`,`november`],[`dec`,`december`]].forEach((e,t)=>e.forEach(e=>cd[e]=t+1));var ld={en:{about:`about`,before:`before`,after:`after`,between:`between`,and:`and`,estimated:`est.`,calculated:`calc.`,deceased:`Deceased`},nl:{about:`ca.`,before:`voor`,after:`na`,between:`tussen`,and:`en`,estimated:`geschat`,calculated:`berekend`,deceased:`Overleden`}};function ud(e){return(e||`en`).toLowerCase().startsWith(`nl`)?`nl`:`en`}var dd=[[/^(ABT|ABOUT|CIR|CA\.?|CIRCA)\s+/i,`about`],[/^(BEF|BEFORE)\s+/i,`before`],[/^(AFT|AFTER)\s+/i,`after`],[/^EST\s+/i,`estimated`],[/^CAL\s+/i,`calculated`]];function fd(e){let t=/^(?:(\d{1,2})\s+)?(?:([A-Z]{3})\s+)?(\d{3,4})$/i.exec(e.trim());if(!t)return null;let n=Number(t[3]),r=t[2]?od.indexOf(t[2].toUpperCase()):-1;if(t[2]&&r<0)return null;let i=r>=0?r+1:void 0;return{year:n,month:i,day:t[1]&&i?Number(t[1]):void 0}}function pd(e){let t=(e||``).trim(),n={qualifier:`exact`,first:null,second:null,raw:t};if(!t)return n;let r=/^BET\s+(.+?)\s+AND\s+(.+)$/i.exec(t);if(r)return{qualifier:`between`,first:fd(r[1]),second:fd(r[2]),raw:t};let i=/^FROM\s+(.+?)(?:\s+TO\s+(.+))?$/i.exec(t);if(i)return{qualifier:`from_to`,first:fd(i[1]),second:i[2]?fd(i[2]):null,raw:t};for(let[e,n]of dd)if(e.test(t))return{qualifier:n,first:fd(t.replace(e,``)),second:null,raw:t};return{qualifier:`exact`,first:fd(t),second:null,raw:t}}function md(e){if(!e)return null;let t=/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(e);return t?{year:Number(t[1]),month:t[2]?Number(t[2]):void 0,day:t[3]?Number(t[3]):void 0}:null}function hd(e,t){let n=ud(t),r=sd[n];return e.month&&e.day?n===`nl`?`${e.day} ${r[e.month-1]} ${e.year}`:`${r[e.month-1]} ${e.day}, ${e.year}`:e.month?`${r[e.month-1]} ${e.year}`:String(e.year)}function gd(e,t){if(!e)return``;let n=ld[ud(t)],r=pd(e.date_text);if(!r.raw){let n=md(e.sort_date);return n?hd(n,t):``}if(!r.first)return r.raw;let i=hd(r.first,t);switch(r.qualifier){case`between`:return r.second?`${n.between} ${i} ${n.and} ${hd(r.second,t)}`:i;case`from_to`:return r.second?`${i} – ${hd(r.second,t)}`:`${i} –`;case`exact`:return i;default:return`${n[r.qualifier]} ${i}`}}function _d(e){if(!e)return!1;let t=pd(e.date_text);return t.raw?t.qualifier===`exact`&&!!t.first?.day:!!md(e.sort_date)?.day}function vd(e){return e?md(e.sort_date)||pd(e.date_text).first:null}function yd(e,t,n,r=new Date){let i=vd(e);if(!i)return null;let a,o=!0;if(t)a=vd(t),o=_d(t);else if(n)a={year:r.getFullYear(),month:r.getMonth()+1,day:r.getDate()};else return null;if(!a)return null;let s=!_d(e)||!o,c=a.year-i.year;if(!s){let e=i.month??1,t=i.day??1,n=a.month??1,r=a.day??1;(n<e||n===e&&r<t)&&--c}return c<0||c>130?null:{years:c,approx:s}}function bd(e,t,n,r){let i=yd(e,t,n,r);return i?i.approx?`(±${i.years})`:`(${i.years})`:``}function xd(e,t,n,r){if(t){let n=gd(t,r),i=bd(e,t,!1);if(n)return i?`${n} ${i}`:n}return n?``:ld[ud(r)].deceased}function Sd(e,t,n,r,i){let a=bd(e,t,n&&!t,i);if(n&&!t)return[gd(e,r),a].filter(Boolean).join(` `);let o=gd(e,r),s=gd(t,r);return o&&s?`${o} – ${s}${a?` ${a}`:``}`:o?`${o} –`:s?`– ${s}`:``}function Cd(e){let t=e.trim().replace(/,/g,` `).replace(/\s+/g,` `);if(!t)return null;let n=(e,t,n)=>e<100||e>9999||t!==void 0&&(t<1||t>12)||n!==void 0&&(n<1||n>31)?null:t&&n?`${n} ${od[t-1]} ${e}`:t?`${od[t-1]} ${e}`:String(e),r=/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/.exec(t);if(r)return n(Number(r[1]),r[2]?Number(r[2]):void 0,r[3]?Number(r[3]):void 0);if(r=/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(t),r)return n(Number(r[3]),Number(r[2]),Number(r[1]));if(r=/^(\d{1,2})[-/.](\d{4})$/.exec(t),r)return n(Number(r[2]),Number(r[1]));let i=t.toLowerCase().split(` `),a,o,s;for(let e of i){let t=e.replace(/\.$/,``);if(/^\d{3,4}$/.test(t))s=Number(t);else if(/^\d{1,2}$/.test(t))a=Number(t);else if(cd[t])o=cd[t];else return null}return s===void 0||a!==void 0&&o===void 0?null:n(s,o,a)}function wd(e,t,n=``){let r=t.trim()?Cd(t):``,i=n.trim()?Cd(n):``;if(r===null||i===null)return{value:``,error:!0};if(!r)return{value:``,error:!1};switch(e){case`about`:return{value:`ABT ${r}`,error:!1};case`before`:return{value:`BEF ${r}`,error:!1};case`after`:return{value:`AFT ${r}`,error:!1};case`estimated`:return{value:`EST ${r}`,error:!1};case`calculated`:return{value:`CAL ${r}`,error:!1};case`between`:return i?{value:`BET ${r} AND ${i}`,error:!1}:{value:``,error:!0};case`from_to`:return{value:i?`FROM ${r} TO ${i}`:`FROM ${r}`,error:!1};default:return{value:r,error:!1}}}function Td(e){let t=pd(e),n=e=>e?e.month&&e.day?`${e.day} ${od[e.month-1]} ${e.year}`:e.month?`${od[e.month-1]} ${e.year}`:String(e.year):``;return t.raw&&!t.first?{qualifier:`exact`,first:t.raw,second:``}:{qualifier:t.qualifier,first:n(t.first),second:n(t.second)}}function Ed(e,t=`thumb`){let n=e.trim();return/^[0-9a-f]{32}$/i.test(n)?`/api/family_tree/media/${n}?variant=${t===`full`?`full`:`thumb`}`:``}function Dd(e,t){return e&&typeof e.hassUrl==`function`?e.hassUrl(t):t}var Od=`M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z`,kd=`M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z`,Ad=`M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z`,jd=`M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z`,Md=`M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z`,Nd=`M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z`,Pd=`M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z`,Fd=`M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z`,Id=`M15,14C12.3,14 7,15.3 7,18V20H23V18C23,15.3 17.7,14 15,14M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12M5,15L4.4,14.5C2.4,12.6 1,11.4 1,9.9C1,8.7 2,7.7 3.2,7.7C3.9,7.7 4.6,8 5,8.5C5.4,8 6.1,7.7 6.8,7.7C8,7.7 9,8.6 9,9.9C9,11.4 7.6,12.6 5.6,14.5L5,15Z`,Ld=`M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z`,Rd=`M7,10L12,15L17,10H7Z`,zd=`M7,15L12,10L17,15H7Z`,Bd=`M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z`,Vd=`M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z`,Hd=`M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z`,Ud=`/api/family_tree/brand/logo.png`,Wd=`/api/family_tree/brand/dark_logo.png`;function K(e){return W`<svg class="mdi" viewBox="0 0 24 24" aria-hidden="true"><path d=${e}></path></svg>`}function Gd(e,t=``){return W`<img class="brand-logo" src=${Dd(e,e?.themes?.darkMode?Wd:Ud)} alt=${t} height="36" />`}function Kd(e,t){return W`
    <span class="ft-tooltip" tabindex="0">
      ${t}
      <span class="ft-tooltip__popup" role="tooltip">${e}</span>
    </span>
  `}function q(e,t){return W`
    <button
      type="button"
      class="md-btn md-btn-${t.variant??`outlined`}${t.active?` md-btn-active`:``}"
      ?disabled=${t.disabled??!1}
      @click=${t.onClick}
    >
      ${e}
    </button>
  `}var qd={birth:`event_birth`,death:`event_death`,baptism:`event_baptism`,burial:`event_burial`,occupation:`event_occupation`,residence:`event_residence`,marriage:`event_marriage`,divorce:`event_divorce`,partnership:`event_partnership`},Jd=[`birth`,`baptism`,`occupation`,`residence`,`death`,`burial`],Yd=new Set([`birth`,`baptism`,`death`,`burial`]),Xd=`person-dialog-personal`,Zd=`person-dialog-birth`,Qd=`person-dialog-deceased`,$d={exact:`qual_exact`,about:`qual_about`,before:`qual_before`,after:`qual_after`,between:`qual_between`,from_to:`qual_from_to`,estimated:`qual_estimated`,calculated:`qual_calculated`};function ef(e,t,n){return t!==`linked`||n.has(e)}function J(e){if(e.display_name)return e.display_name;let t=(e.call_name||e.given_names||``).trim();return[t.includes(` `)&&!e.call_name?t.split(/\s+/)[0]:t,e.surname_prefix,e.surname].map(e=>(e||``).trim()).filter(Boolean).join(` `)||`Unknown`}function tf(e,t){let n=t.trim().toLowerCase();if(!n)return!0;let r=`${e.surname_prefix||``} ${e.surname||``}`.trim().toLowerCase(),i=(e.surname||``).toLowerCase();return r.startsWith(n)||i.startsWith(n)}function nf(e){return e.life_events||[]}function rf(e){if(!e)return null;let t=e.trim().slice(0,10);return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:null}function af(e,t,n){let r=t.trim(),i=n.trim();if(!r&&!i)return!0;let a=nf(e);for(let e of a){let t=rf(e.sort_date);if(t&&!(r&&t<r)&&!(i&&t>i))return!0}return!1}function of(e,t){let n=t.trim();return!n||nf(e).some(e=>e.place_id===n)}function sf(e){let t=new Map;for(let n of e)for(let e of nf(n)){if(!e.place_id)continue;let n=(e.place_name||``).trim()||e.place_id;t.has(e.place_id)||t.set(e.place_id,n)}return[...t.entries()].map(([e,t])=>({id:e,label:t})).sort((e,t)=>e.label.localeCompare(t.label,void 0,{sensitivity:`base`}))}function cf(e,t,n){let r=t.search.trim().toLowerCase(),i=n??new Set,a=e.filter(e=>t.filterLiving===`living`&&!e.is_living||t.filterLiving===`deceased`&&e.is_living||t.filterSex&&e.sex!==t.filterSex||!ef(e.id,t.filterUserLinked,i)||!tf(e,t.familyShortcut)||!of(e,t.filterPlace)||!af(e,t.dateFrom,t.dateTo)?!1:!r||[e.given_names,e.call_name,e.surname_prefix,e.surname,J(e)].join(` `).toLowerCase().includes(r)),o=t.sortDir===`desc`?-1:1;return a=[...a].sort((e,n)=>{let r=ff(e,n,t.sort,o);return r===0?uf(e,n):r}),a}function lf(e,t){return(e||``).localeCompare(t||``,void 0,{sensitivity:`base`})}function uf(e,t){return lf(e.surname,t.surname)||lf(e.given_names,t.given_names)}function df(e,t,n,r){let i=e==null||e===``,a=t==null||t===``;return i&&a?0:i?1:a?-1:n(e,t)*r}function ff(e,t,n,r){switch(n){case`name`:return lf(J(e),J(t))*r;case`updated`:return(t.updated_at||``).localeCompare(e.updated_at||``)*r;case`birth`:return df(e.birth?.sort_date,t.birth?.sort_date,(e,t)=>e.localeCompare(t),r);case`death`:return df(e.death?.sort_date,t.death?.sort_date,(e,t)=>e.localeCompare(t),r);case`sex`:return lf(e.sex,t.sex)*r;case`father`:return df(e.father?.name,t.father?.name,lf,r);case`mother`:return df(e.mother?.name,t.mother?.name,lf,r);case`children`:return((e.children_count??0)-(t.children_count??0))*r;default:return uf(e,t)*r}}var pf={attribute:!0,type:String,converter:au,reflect:!1,hasChanged:ou},mf=(e=pf,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function hf(e){return(t,n)=>typeof n==`object`?mf(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function Y(e){return hf({...e,state:!0,attribute:!1})}function gf(e){if(!e)return``;let t=e,n=t.auth?.accessToken,r=t.auth?.data?.access_token,i=t.connection?.options?.auth?.accessToken;return(n||r||i||``).trim()}function _f(e){let t={},n=gf(e);return n&&(t.Authorization=`Bearer ${n}`),t}async function vf(e){if(!e)return{};let t=e.auth;if(t?.expired&&typeof t.refreshAccessToken==`function`)try{await t.refreshAccessToken()}catch{}return _f(e)}function X(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var yf=class extends qu{constructor(...e){super(...e),this.mediaId=``,this.variant=`thumb`,this.width=0,this.height=0,this.alt=``,this._src=``,this._objectUrl=null,this._loadGen=0}static{this.styles=Gl`
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
  `}disconnectedCallback(){super.disconnectedCallback(),this._revokeObjectUrl()}updated(e){(e.has(`mediaId`)||e.has(`variant`)||e.has(`hass`))&&this._load()}firstUpdated(){this._load()}_revokeObjectUrl(){this._objectUrl&&=(URL.revokeObjectURL(this._objectUrl),null)}async _load(){let e=Ed(this.mediaId.trim(),this.variant);if(!e||!this.hass){this._revokeObjectUrl(),this._src=``;return}let t=++this._loadGen;try{let n=await vf(this.hass);if(!n.Authorization||t!==this._loadGen)return;let r=await fetch(e,{method:`GET`,credentials:`same-origin`,headers:n});if(!r.ok||t!==this._loadGen)return;let i=await r.blob();if(t!==this._loadGen)return;this._revokeObjectUrl(),this._objectUrl=URL.createObjectURL(i),this._src=this._objectUrl}catch{t===this._loadGen&&(this._revokeObjectUrl(),this._src=``)}}render(){return this._src?W`<img
      src=${this._src}
      alt=${this.alt}
      width=${this.width>0?this.width:void 0}
      height=${this.height>0?this.height:void 0}
      loading="lazy"
    />`:W``}};X([hf({attribute:!1})],yf.prototype,`hass`,void 0),X([hf()],yf.prototype,`mediaId`,void 0),X([hf()],yf.prototype,`variant`,void 0),X([hf({type:Number})],yf.prototype,`width`,void 0),X([hf({type:Number})],yf.prototype,`height`,void 0),X([hf()],yf.prototype,`alt`,void 0),X([Y()],yf.prototype,`_src`,void 0),customElements.get(`ft-authenticated-media-img`)||customElements.define(`ft-authenticated-media-img`,yf);var bf={sm:32,md:48,detail:64,lg:96};function xf(e){return Math.max(10,Math.round(e*.22))}var Sf=`M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z`;function Cf(e){return W`<svg
    class="person-avatar__deceased-mark"
    viewBox="0 0 24 24"
    width=${e}
    height=${e}
    aria-hidden="true"
  >
    <path fill="currentColor" d=${Sf} />
  </svg>`}function wf(e){let t=J(e).trim();if(!t)return`?`;let n=t.split(/\s+/).filter(Boolean);if(n.length>=2)return(n[0][0]+n[n.length-1][0]).toUpperCase();let r=n[0];return r.length>=2?r.slice(0,2).toUpperCase():r[0].toUpperCase()}function Tf(e){return e===`male`?`person-avatar--male`:e===`female`?`person-avatar--female`:`person-avatar--unknown`}function Ef(e,t={}){let n=t.size??`sm`,r=bf[n],i=t.sex??(typeof e.sex==`string`?e.sex:`unknown`),a=t.profileMediaId??(typeof e.profile_media_id==`string`?e.profile_media_id:null),o=t.isLiving??e.is_living!==!1,s=t.title??J(e),c=t.deceasedOverlay&&!o,l=t.deceasedMarkPx??xf(r),u=n===`lg`||n===`detail`;if(a)return W`<span
      class="person-avatar person-avatar--photo ${Tf(i)} person-avatar--${n}"
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
      ${c?Cf(l):G}
    </span>`;let d=wf(e);return W`<span
    class="person-avatar person-avatar--initials ${Tf(i)} person-avatar--${n}"
    style="width:${r}px;height:${r}px"
    title=${s}
    aria-hidden="true"
  >
    ${d}
    ${c?Cf(l):G}
  </span>`}function Df(e){return(function(){let e=this._importReport||{},t=this._importPhase;if(t===`importing`||t===`preview`&&!this._importReport&&this._importStatus)return W`<p class="muted">${this._importStatus||this._tt(`importing`)}</p>`;let n=t===`done`;return W`
    ${n?W`<p>${this._tt(`import_complete_hint`)}</p>`:this._importFileName?W`<p class="muted">${this._importFileName}</p>`:G}
    ${!n&&this._replaceImport?W`<p class="error" role="alert">${this._tt(`replace_warning`)}</p>`:G}
    <ul class="plain import-counts">
      <li><span>${this._tt(`import_persons`)}</span><strong>${e.persons??0}</strong></li>
      <li><span>${this._tt(`import_unions`)}</span><strong>${e.unions??0}</strong></li>
      <li><span>${this._tt(`import_events`)}</span><strong>${e.events??0}</strong></li>
      <li><span>${this._tt(`import_sources`)}</span><strong>${e.sources??0}</strong></li>
      <li><span>${this._tt(`import_places`)}</span><strong>${e.places??0}</strong></li>
    </ul>
  `}).call(e)}function Of(e){return(function(){let e=this._canWrite(),t=this._dialogMode,n=t===`import`?this._importPhase===`done`?this._tt(`import_complete`):this._tt(`import_preview`):t===`union`?this._tt(`edit`):t===`pickPerson`?this._tt(`link_existing_person`):t===`parents`?this._tt(`add_parents`):t===`citation`?this._editingCitationId?this._tt(`edit_source`):this._tt(`add_source`):t===`siblings`?this._tt(`siblings_of`).replace(`%s`,this._siblingsPersonName||``):t===`preview`?this._previewDetail?J(this._previewDetail.person):this._tt(`details`):t===`profilePhoto`?this._tt(`edit_profile_photo`):t===`userLink`?this._tt(`add_user_link`):t===`event`?this._editingEventId?this._tt(`edit_event`):this._tt(`add_event`):this._editing?J(this._editing):(this._relationTarget,this._tt(`add_person`)),r=this._form.deceased===`true`,i=W`<div class="form-stack">
    <label
      >${this._fieldLabel(this._tt(`given_names`),e)}
      <input
        class=${this._fieldInvalid(`given_names`)?`invalid`:``}
        .value=${this._form.given_names||``}
        ?disabled=${!e}
        @input=${e=>this._onPersonField(`given_names`,e)}
      />
      ${this._fieldError(`given_names`)}
    </label>
    <label
      >${this._fieldLabel(this._tt(`call_name`))}
      <input
        .value=${this._form.call_name||``}
        ?disabled=${!e}
        @input=${e=>this._onPersonField(`call_name`,e)}
      />
    </label>
    <div class="row2">
      <label
        >${this._tt(`surname_prefix`)}
        <input
          .value=${this._form.surname_prefix||``}
          ?disabled=${!e}
          @input=${e=>this._form={...this._form,surname_prefix:e.target.value}}
        />
      </label>
      <label
        >${this._tt(`surname`)}
        <input
          .value=${this._form.surname||``}
          ?disabled=${!e}
          @input=${e=>this._form={...this._form,surname:e.target.value}}
        />
      </label>
    </div>
    <label
      >${this._tt(`sex`)}
      <select
        .value=${this._form.sex||`unknown`}
        ?disabled=${!e}
        @change=${e=>this._form={...this._form,sex:e.target.value}}
      >
        <option value="male">${this._tt(`sex_male`)}</option>
        <option value="female">${this._tt(`sex_female`)}</option>
        <option value="intersex">${this._tt(`sex_intersex`)}</option>
        <option value="unknown">${this._tt(`sex_unknown`)}</option>
      </select>
    </label>
    <label
      >${this._tt(`profession`)}
      <input
        .value=${this._form.profession||``}
        ?disabled=${!e}
        @input=${e=>this._onPersonField(`profession`,e)}
      />
    </label>
    <label
      >${this._tt(`notes`)}
      <textarea
        rows="3"
        .value=${this._form.notes||``}
        ?disabled=${!e}
        @input=${e=>this._form={...this._form,notes:e.target.value}}
      ></textarea>
    </label>
  </div>`,a=W`<div class="form-stack">
    ${this._renderPersonPlaceField(`birth_place`,this._tt(`birth_place`),e)}
    ${this._renderPersonVitalDateField(`birth`,this._tt(`col_birth`),e)}
  </div>`,o=W`<div class="form-stack">
    <label class="check-row"
      >${this._tt(`deceased`)}
      <span class="check-control">
        <input
          type="checkbox"
          .checked=${r}
          ?disabled=${!e}
          @change=${e=>{let t=e.target.checked;this._form={...this._form,deceased:t?`true`:`false`,...t?{}:{death_place:``,death_date_mode:`simple`,death_date_iso:``,death_date_qualifier:`exact`,death_date_first:``,death_date_second:``}}}}
        />
      </span>
    </label>
    ${!r&&this._editing&&this._editing.is_living===!1?W`<p class="muted" role="status">${this._tt(`revive_unions_hint`)}</p>`:G}
    ${r?W`
          ${this._renderPersonPlaceField(`death_place`,this._tt(`death_place`),e)}
          ${this._renderPersonVitalDateField(`death`,this._tt(`col_death`),e)}
        `:G}
  </div>`,s=W`
    ${this._renderCollapsibleSection(Xd,this._tt(`section_personal`),i,!0)}
    ${this._renderCollapsibleSection(Zd,this._tt(`section_birth`),a,!0)}
    ${this._renderCollapsibleSection(Qd,this._tt(`section_deceased`),o,!1)}
  `,c=this._usedUniqueEventTypes(),l=(this._eventForm.date_mode||`simple`)===`advanced`,u=l&&(this._eventForm.date_qualifier===`between`||this._eventForm.date_qualifier===`from_to`),d=W`
    <div class="form-stack">
      <label
        >${this._tt(`events`)}
        <select
          .value=${this._eventForm.event_type||`birth`}
          @change=${e=>this._eventForm={...this._eventForm,event_type:e.target.value}}
        >
          ${Jd.map(e=>{let t=Yd.has(e)&&c.has(e);return W`<option value=${e} ?disabled=${t}>
              ${this._plainEventTypeLabel(e)}${t?` (${this._tt(`already_added`)})`:``}
            </option>`})}
        </select>
      </label>
      <div class="event-date-field">
        ${l?W`<label
              >${this._tt(`date_qualifier`)}
              <select
                @change=${e=>this._eventForm={...this._eventForm,date_qualifier:e.target.value}}
              >
                ${ad.map(e=>W`<option value=${e} ?selected=${e===(this._eventForm.date_qualifier||`exact`)}
                    >${this._tt($d[e])}</option
                  >`)}
              </select>
            </label>
            <label
              >${this._tt(`date`)}
              <input
                .value=${this._eventForm.date_first||``}
                placeholder=${this._tt(`date_gedcom_hint`)}
                @input=${e=>this._eventForm={...this._eventForm,date_first:e.target.value}}
              />
            </label>
            ${u?W`<label
                  >${this._tt(`date_second`)}
                  <input
                    .value=${this._eventForm.date_second||``}
                    placeholder=${this._tt(`date_gedcom_hint`)}
                    @input=${e=>this._eventForm={...this._eventForm,date_second:e.target.value}}
                  />
                </label>`:G}
            <button
              type="button"
              class="linkish date-mode-toggle"
              @click=${()=>this._toggleEventDateMode()}
            >
              ${this._tt(`date_simple`)}
            </button>`:W`<div class="date-input-row">
              <div class="date-label-grow">
                <span class="field-label">${this._tt(`date`)}</span>
                ${Kd(this._tt(`date`),W`<input
                    type="date"
                    .value=${this._eventForm.date_iso||``}
                    @input=${e=>this._eventForm={...this._eventForm,date_iso:e.target.value}}
                  />`)}
              </div>
              <button
                type="button"
                class="linkish date-mode-toggle"
                @click=${()=>this._toggleEventDateMode()}
              >
                ${this._tt(`date_advanced`)}
              </button>
            </div>`}
      </div>
      <label class="place-field"
        >${this._fieldLabel(this._tt(`place`))}
        <input
          .value=${this._eventForm.place||``}
          @input=${e=>{let t=e.target.value;this._eventForm={...this._eventForm,place:t},this._schedulePlaceSearch(t)}}
          @focus=${()=>{this._placeSuggestions.length&&(this._placeSuggestOpen=!0)}}
          @blur=${()=>{setTimeout(()=>{this._placeSuggestOpen=!1},150)}}
        />
        ${this._placeSuggestOpen&&this._placeSuggestions.length?W`<ul class="place-suggest">
              ${this._placeSuggestions.map(e=>W`<li>
                  <button
                    type="button"
                    @mousedown=${()=>{this._eventForm={...this._eventForm,place:e.name},this._placeSuggestOpen=!1}}
                  >
                    ${e.name}
                  </button>
                </li>`)}
            </ul>`:G}
      </label>
      <label
        >${this._tt(`description`)}
        <input
          .value=${this._eventForm.description||``}
          @input=${e=>this._eventForm={...this._eventForm,description:e.target.value}}
        />
      </label>
    </div>
  `,f=W`<div class="form-stack">
    <label
      >${this._fieldLabel(this._tt(`union_status`))}
      <select
        .value=${this._unionForm.status||`ongoing`}
        @change=${e=>this._unionForm={...this._unionForm,status:e.target.value}}
      >
        <option value="ongoing">${this._tt(`status_ongoing`)}</option>
        <option value="divorced">${this._tt(`status_divorced`)}</option>
        <option value="separated">${this._tt(`status_separated`)}</option>
        <option value="widowed">${this._tt(`status_widowed`)}</option>
      </select>
    </label>
    <label
      >${this._fieldLabel(this._tt(`known_children`))}
      <input
        type="number"
        min="0"
        .value=${this._unionForm.known_children_count||``}
        @input=${e=>this._unionForm={...this._unionForm,known_children_count:e.target.value}}
      />
    </label>
    <label
      >${this._fieldLabel(this._tt(`event_marriage`))}
      <input
        .value=${this._unionForm.marriage_date||``}
        placeholder=${this._tt(`date_gedcom_hint`)}
        @input=${e=>this._unionForm={...this._unionForm,marriage_date:e.target.value}}
      />
    </label>
    <label
      >${this._fieldLabel(this._tt(`place`))}
      <input
        .value=${this._unionForm.marriage_place||``}
        @input=${e=>this._unionForm={...this._unionForm,marriage_place:e.target.value}}
      />
    </label>
    <label
      >${this._fieldLabel(this._tt(`union_notes`))}
      <textarea
        rows="2"
        .value=${this._unionForm.notes||``}
        @input=${e=>this._unionForm={...this._unionForm,notes:e.target.value}}
      ></textarea>
    </label>
  </div>`,p=this._pickPersonMatches(),m=W`<div class="form-stack">
    <label
      >${this._fieldLabel(this._tt(`search_to_link`))}
      <input
        type="search"
        .value=${this._pickPersonQuery}
        placeholder=${this._tt(`search_placeholder`)}
        @input=${e=>this._pickPersonQuery=e.target.value}
      />
    </label>
    <ul class="plain me-hits">
      ${p.map(e=>W`<li>
          <button type="button" class="linkish" @click=${()=>void this._linkPickedPerson(e.id)}>
            ${J(e)}
          </button>
        </li>`)}
      ${!p.length&&this._pickPersonQuery?W`<li class="muted">—</li>`:G}
    </ul>
  </div>`,h=W`<div class="form-stack">
    <label
      >${this._tt(`source_title`)}
      <input
        .value=${this._citationForm.title||``}
        @input=${e=>this._citationForm={...this._citationForm,title:e.target.value}}
      />
    </label>
    <label
      >${this._tt(`source_url`)}
      <input
        type="url"
        .value=${this._citationForm.url||``}
        @input=${e=>this._citationForm={...this._citationForm,url:e.target.value}}
      />
    </label>
    <label
      >${this._tt(`source_author`)}
      <input
        .value=${this._citationForm.author||``}
        @input=${e=>this._citationForm={...this._citationForm,author:e.target.value}}
      />
    </label>
    <label
      >${this._tt(`source_repository`)}
      <input
        .value=${this._citationForm.repository||``}
        @input=${e=>this._citationForm={...this._citationForm,repository:e.target.value}}
      />
    </label>
    <label
      >${this._tt(`citation_detail`)}
      <textarea
        rows="3"
        .value=${this._citationForm.detail||``}
        @input=${e=>this._citationForm={...this._citationForm,detail:e.target.value}}
      ></textarea>
    </label>
  </div>`,g=this._renderUserLinkForm(),_=W`<div class="form-stack parent-link-form">
    ${this._renderParentLinkSlot(`father`)}
    ${this._renderParentLinkSlot(`mother`)}
  </div>`,v=W`<div class="form-stack profile-photo-editor">
    <label class="file-btn">
      ${this._tt(`profile_photo_choose`)}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        @change=${this._onProfilePhotoFileChange}
      />
    </label>
    <div class="profile-crop-wrap">
      <canvas
        id="profile-crop-canvas"
        class="profile-crop-canvas"
        width=${280}
        height=${280}
        @pointerdown=${this._onProfileCropPointerDown}
        @pointermove=${this._onProfileCropPointerMove}
        @pointerup=${this._onProfileCropPointerUp}
        @pointercancel=${this._onProfileCropPointerUp}
      ></canvas>
      ${this._profileCropHasImage?G:W`<p class="muted profile-crop-hint">${this._tt(`profile_photo_choose`)}</p>`}
    </div>
    ${this._profileCropHasImage?W`<label class="profile-zoom-label">
          ${this._tt(`profile_photo_zoom`)}
          <input
            type="range"
            min="1"
            max="3"
            step="0.02"
            .value=${String(this._profileCropTransform.scale)}
            @input=${this._onProfileCropZoom}
          />
        </label>`:G}
  </div>`,y=this._siblingsLoading?W`<p class="muted">${this._tt(`loading`)}</p>`:W`<div class="siblings-grid">
        ${this._siblingsList.map(e=>{let t=String(e.relation||``)===`half_sibling`?this._tt(`half_sibling`):void 0;return this._renderPersonCard(e,{hideSiblings:!0,subtitle:t})})}
        ${this._siblingsList.length?G:W`<p class="muted">—</p>`}
      </div>`,b=this._previewDetail,x=this.hass?.language,S=this._previewLoading?W`<p class="muted">${this._tt(`loading`)}</p>`:b?W`<div class="preview-body">
          <dl class="kv">
            <dt>${this._tt(`given_names`)}</dt>
            <dd>${b.person.given_names||`—`}</dd>
            <dt>${this._tt(`call_name`)}</dt>
            <dd>${b.person.call_name||`—`}</dd>
            <dt>${this._tt(`surname`)}</dt>
            <dd>
              ${[b.person.surname_prefix,b.person.surname].filter(Boolean).join(` `)||`—`}
            </dd>
            <dt>${this._tt(`sex`)}</dt>
            <dd>${this._sexBadge(b.person.sex)}</dd>
            ${b.person.birth||b.person.death?W`<dt>${this._tt(`lifespan`)}</dt>
                  <dd>
                    ${Sd(b.person.birth,b.person.death,b.person.is_living,x)||`—`}
                  </dd>`:G}
            ${b.person.notes?W`<dt>${this._tt(`notes`)}</dt><dd>${b.person.notes}</dd>`:G}
          </dl>
        </div>`:W`<p class="muted">—</p>`,C=t===`import`?W`
          ${q(this._tt(this._importPhase===`done`?`close`:`cancel`),{variant:`text`,disabled:this._importPhase===`importing`,onClick:this._closeDialog})}
          ${this._importPhase===`preview`&&this._importReport?q(this._tt(`confirm_import`),{variant:`filled`,onClick:()=>void this._confirmImport()}):G}
        `:t===`union`?W`
            ${q(this._tt(`cancel`),{variant:`text`,onClick:this._closeDialog})}
            ${q(this._tt(`save`),{variant:`filled`,disabled:this._saving,onClick:()=>void this._saveUnionForm()})}
          `:t===`pickPerson`||t===`parents`?q(this._tt(`close`),{variant:`text`,onClick:this._closeDialog}):t===`citation`?W`
                  ${q(this._tt(`cancel`),{variant:`text`,onClick:this._closeDialog})}
                  ${q(this._tt(`save`),{variant:`filled`,disabled:this._saving,onClick:()=>void this._saveCitationForm()})}
                `:t===`siblings`?q(this._tt(`close`),{variant:`text`,onClick:this._closeDialog}):t===`preview`?W`
              ${q(this._tt(`close`),{variant:`text`,onClick:this._closeDialog})}
              ${b?W`
                    ${q(this._tt(`view_full_profile`),{variant:`outlined`,onClick:()=>{let e=b.person.id;this._closeDialog(),this._openPerson(e)}})}
                    ${q(this._tt(`view_tree_action`),{variant:`outlined`,onClick:()=>{let e=b.person.id;this._closeDialog(),this._openPerson(e,`tree`)}})}
                    ${e?q(this._tt(`edit`),{variant:`filled`,onClick:()=>{this._closeDialog(),this._openEdit(b.person)}}):G}
                  `:G}
            `:t===`profilePhoto`?W`
              ${q(this._tt(`cancel`),{variant:`text`,onClick:this._closeDialog})}
              ${q(this._tt(`save`),{variant:`filled`,disabled:this._saving||!this._profileCropHasImage,onClick:()=>void this._saveProfilePhoto()})}
            `:t===`userLink`?W`
              ${q(this._tt(`cancel`),{variant:`text`,onClick:this._closeDialog})}
              ${q(this._tt(`save`),{variant:`filled`,disabled:!this._linkSelectedUserId||!this._linkPersonId,onClick:()=>void this._saveUserLinkFromForm()})}
            `:t===`event`?W`
              ${q(this._tt(`cancel`),{variant:`text`,onClick:this._closeDialog})}
              ${q(this._tt(`save`),{variant:`filled`,disabled:this._saving,onClick:()=>void this._saveEvent()})}
            `:W`
            ${q(this._tt(e?`cancel`:`close`),{variant:`text`,onClick:this._closeDialog})}
            ${e?q(this._tt(`save`),{variant:`filled`,disabled:this._saving,onClick:()=>void this._savePerson()}):G}
          `;return W`
    <div class="dialog-backdrop">
      <div
        class="dialog ${this.narrow?`dialog-narrow`:``}"
        role="dialog"
        aria-modal="true"
        aria-label=${n}
        @click=${e=>e.stopPropagation()}
      >
        <div class="dialog-header">
          <h2 class=${t===`preview`&&b?`dialog-preview-head`:``}>
            ${t===`preview`&&b?W`${Ef(b.person,{size:`md`,hass:this.hass,deceasedOverlay:!0,deceasedMarkPx:16})}
                  <span class="dialog-preview-head-text">
                    <span class="dialog-title-row">
                      <span class="dialog-title-text"
                        >${J(b.person)}</span
                      >
                      ${this._lineageBadge(b.person.id,J(b.person))}
                    </span>
                    ${(()=>{let e=this._lineageSentence(b.person.id,J(b.person));return e?W`<span class="muted lineage-sentence">${e}</span>`:G})()}
                  </span>`:n}
          </h2>
          <button
            type="button"
            class="icon-btn dialog-close"
            aria-label=${this._tt(`cancel`)}
            ?disabled=${t===`import`&&this._importPhase===`importing`}
            @click=${this._closeDialog}
          >
            ${K(kd)}
          </button>
        </div>

        <div class="dialog-body">
          ${t===`import`?this._renderImportDialogBody():t===`union`?f:t===`pickPerson`?m:t===`parents`?_:t===`citation`?h:t===`siblings`?y:t===`preview`?S:t===`profilePhoto`?v:t===`userLink`?g:t===`event`?d:s}

          ${this._error&&t!==`import`?W`<div class="error" role="alert">${this._error}</div>`:G}
        </div>

        <div class="dialog-actions">${C}</div>
      </div>
    </div>
  `}).call(e)}function kf(e){let t=e.trim();if(!t||t.length>2e3)return!1;try{let e=new URL(t);return e.protocol===`http:`||e.protocol===`https:`}catch{return!1}}function Af(e){return[...e].sort((e,t)=>{let n=typeof e.birth_sort_date==`string`?e.birth_sort_date:``,r=typeof t.birth_sort_date==`string`?t.birth_sort_date:``;return!n&&!r?0:n?r?n<r?-1:+(n>r):-1:1})}function jf(e){return(function(){let e=this._detail,t=e.person;return W`
    <div class="person-head">
      <button type="button" class="back-link" @click=${()=>this._setView(`people`)}>
        ← ${this._tt(`nav_people`)}
      </button>
      <div class="person-head-main">
        ${this._canWrite()?W`<button
              type="button"
              class="person-avatar-edit-btn"
              title=${this._tt(`edit_profile_photo`)}
              aria-label=${this._tt(`edit_profile_photo`)}
              @click=${()=>this._openProfilePhotoEditor()}
            >
              ${Ef(t,{size:`detail`,hass:this.hass,deceasedOverlay:!0,deceasedMarkPx:20})}
              <span class="person-avatar-edit-label">${this._tt(`edit`)}</span>
            </button>`:Ef(t,{size:`detail`,hass:this.hass,deceasedOverlay:!0,deceasedMarkPx:20})}
        <div class="person-head-text">
          <h2>
            ${J(t)}
            ${this._lineageBadge(t.id,J(t))}
          </h2>
          ${(()=>{let e=this._lineageSentence(t.id,J(t));return e?W`<p class="muted lineage-sentence">${e}</p>`:G})()}
        </div>
      </div>
    </div>
    <div class="subtabs person-subtabs">
      <div class="subtabs-left">
        ${[`details`,`relationships`,`tree`,`sources`].map(e=>W`<button class=${this._personTab===e?`active`:``}
            @click=${()=>this._personTab=e}>${this._tt(e)}</button>`)}
      </div>
      ${this._canWrite()?W`<div class="subtabs-actions">
            <button @click=${()=>this._openEdit(t)}>${this._tt(`edit`)}</button>
            <button class="danger" @click=${()=>this._deleteCurrent()}>${this._tt(`delete`)}</button>
          </div>`:G}
    </div>
    ${this._personTab===`details`?this._renderPersonDetailsTab(e):this._personTab===`relationships`?this._renderRelationshipsTab(e):this._personTab===`tree`?this._renderTreeTab(e):this._renderSourcesTab(e)}
  `}).call(e)}function Mf(e,t){return(function(e){let t=e.person,n=this.hass?.language,r=this._professionFromEvents(e.events),i=W`<dl class="kv">
    <dt>${this._tt(`given_names`)}</dt><dd>${t.given_names||`—`}</dd>
    <dt>${this._tt(`call_name`)}</dt><dd>${t.call_name||`—`}</dd>
    <dt>${this._tt(`surname_prefix`)}</dt><dd>${t.surname_prefix||`—`}</dd>
    <dt>${this._tt(`surname`)}</dt><dd>${t.surname||`—`}</dd>
    <dt>${this._tt(`sex`)}</dt><dd>${this._sexBadge(t.sex)}</dd>
    ${r?W`<dt>${this._tt(`profession`)}</dt><dd>${r}</dd>`:G}
    <dt>${this._tt(`lifespan`)}</dt>
    <dd>${Sd(t.birth,t.death,t.is_living,n)||`—`}</dd>
    <dt>${this._tt(`notes`)}</dt><dd>${t.notes||`—`}</dd>
  </dl>`,a=W`
    <div class="section-head">
      ${this._canWrite()?q(`+ ${this._tt(`add_event`)}`,{variant:`filled`,onClick:()=>this._openAddEvent()}):G}
    </div>
    ${e.events.length?W`<div class="event-timeline">
          ${e.events.map(e=>this._renderEventCard(e,t.birth))}
        </div>`:W`<p class="muted">—</p>`}
  `,o=this._renderPhotosSection(t);return W`
    ${this._renderCollapsibleSection(`personal`,this._tt(`section_personal`),i)}
    ${this._renderCollapsibleSection(`photos`,this._tt(`section_photos`),o)}
    ${this._renderCollapsibleSection(`events`,this._tt(`events`),a)}
    ${this._photoLightbox?W`<div
          class="photo-lightbox"
          @click=${()=>this._photoLightbox=null}
        >
          <ft-authenticated-media-img
            class="photo-lightbox-img"
            .hass=${this.hass}
            mediaId=${this._photoLightbox}
            variant="full"
            @click=${e=>e.stopPropagation()}
          ></ft-authenticated-media-img>
        </div>`:G}
  `}).call(e,t)}function Nf(e,t){return(function(e){let t=e.tree,n=this.hass?.language,r=t?.parents||[],i=t?.partners||[],a=this._canWrite(),o=W`
    ${a&&r.length<2?W`<div class="section-head">
          <button type="button" class="linkish" @click=${()=>this._openParentsDialog()}>
            ${this._tt(`add_parents`)}
          </button>
        </div>`:G}
    <div class="card-list rel-card-list">
      ${r.length?r.map(e=>this._renderRelPersonCard(e,{onRemove:a&&e.link_id?()=>void this._removeParentLink(String(e.link_id)):void 0})):W`<p class="muted">—</p>`}
    </div>
  `,s=W`
    ${a?W`<div class="section-head section-head-actions">
          ${q(this._tt(`add_partner`),{variant:`filled`,onClick:()=>this._openAddRelation({kind:`partner`,personId:e.person.id})})}
          ${q(this._tt(`link_existing_person`),{onClick:()=>this._openPickPerson(`partner`)})}
        </div>`:G}
    ${i.length?W`<div class="card-list">
          ${i.map(t=>{let r=Af(t.children||[]),i=t.known_children_count,o=i!=null&&i>r.length?i-r.length:0,s=String(t.partners?.[0]?.id||``),c=e.person.death?.date_text||``,l=this._widowedDateText(t,c),u=this._formatUnionDate(l,n);return W`<div class="rel-union-card">
              <div class="rel-union-head">
                <strong>
                  ${(t.partners||[]).map(e=>String(e.name||``)).filter(Boolean).join(` & `)||this._tt(`partners`)}
                </strong>
                ${a?W`<span class="row-actions">
                      <button
                        type="button"
                        class="linkish"
                        @click=${()=>this._openUnionEdit(t.union_id)}
                      >
                        ${this._tt(`edit`)}
                      </button>
                      <button
                        type="button"
                        class="linkish danger"
                        @click=${()=>this._deleteUnion(t.union_id)}
                      >
                        ${this._tt(`delete`)}
                      </button>
                    </span>`:G}
              </div>
              ${t.marriage_date||t.divorce_date||t.status===`widowed`||t.known_children_count!=null?W`<div class="rel-union-meta">
                    ${t.marriage_date?W`<div>
                          ${this._tt(`event_marriage`)}:
                          <strong
                            >${this._formatUnionMarriageDisplay(t,n,c)}</strong
                          >
                        </div>`:G}
                    ${t.divorce_date?W`<div>${this._tt(`event_divorce`)}: <strong>${this._formatUnionDate(t.divorce_date,n)}</strong></div>`:G}
                    ${t.status===`widowed`?W`<div>
                          ${this._tt(`status_widowed`)}${u?W`: <strong>${u}</strong>`:G}
                        </div>`:G}
                    ${t.known_children_count==null?G:W`<div>
                          ${this._tt(`known_children`)}:
                          <strong>${t.known_children_count}</strong>
                        </div>`}
                  </div>`:G}
              <div class="rel-card-list">
                ${(t.partners||[]).map(e=>this._renderPersonCard(e))}
              </div>
              <div class="rel-union-children">
                <span class="muted">${this._tt(`children`)}</span>
                <div class="rel-card-list">
                  ${r.map(e=>this._renderPersonCard(e))}
                  ${this._renderChildExtras(o,a?()=>this._openAddRelation({kind:`child`,personId:e.person.id,unionId:t.union_id,coParentId:s}):void 0)}
                </div>
                ${!r.length&&!o&&!a?W`<p class="muted">—</p>`:G}
              </div>
            </div>`})}
        </div>`:W`<p class="muted">—</p>`}
  `;return W`
    ${this._renderCollapsibleSection(`rel-parents`,this._tt(`section_parents`),o,!0,`cards`)}
    ${this._renderCollapsibleSection(`rel-partners`,this._tt(`section_partners`),s,!0,`cards`)}
  `}).call(e,t)}function Pf(e,t){return(function(e){let t=e.person,n=e.tree,r=this.hass?.language,i=n?.partners||[],a=Math.min(this._treeUnion,Math.max(0,i.length-1)),o=i[a],s=Number(n?.person?.sibling_count||n?.siblings?.length||0),c={id:t.id,name:J(t),given_names:t.given_names,call_name:t.call_name,surname_prefix:t.surname_prefix,surname:t.surname,sex:t.sex,is_living:t.is_living,sibling_count:s,...n?.person||{}},l=Af(o?.children||[]),u=o?.known_children_count,d=u!=null&&u>l.length?u-l.length:0,f=this._sortParents(n?.parents||[]),p=f.find(e=>e.sex===`male`)||f[0],m=f.find(e=>e.sex===`female`&&e!==p)||f.find(e=>e!==p)||null,h=this._canWrite()&&f.length<2,g=this._grandparentSlots(n,f),_=this._unionMetaSubtitle(o,r,e.person.death?.date_text||``),v=this._canWrite(),y=[g[0],g[1]].filter(Boolean).length,b=[g[2],g[3]].filter(Boolean).length,x=g.some(Boolean)||v&&(!!p&&y<2||!!m&&b<2),S=String(o?.partners?.[0]?.id||``),C=v?()=>this._openAddRelation({kind:`child`,personId:t.id,unionId:o?.union_id,coParentId:S}):void 0,w=(e,t)=>e?this._treeCard(e):h&&t?W`<div class="tree-card-wrap">
        <button type="button" class="add-slot" @click=${()=>this._openParentsDialog()}>
          ${K(Nd)} ${this._tt(`add_parents`)}
        </button>
      </div>`:this._treeCard(null),T=(e,t,n)=>e?this._treeCard(e,``,{stemUp:!!e.has_parent}):n&&t&&v?this._treeAddParentsSlot(String(t.id)):this._treeCard(null),E=(e,t,n,r)=>{let i=[e,t].filter(Boolean).length;return i===0&&n&&v?W`<div class="tree-grid-pair ${r}">
        ${this._treeAddParentsSlot(String(n.id),`tree-card-wrap--gp-add`)}
      </div>`:W`<div class="tree-grid-pair ${r}">
      ${T(e,n,i===1&&!e)}
      ${T(t,n,i===1&&!t)}
    </div>`},D=d>0||!!C,ee=[];for(let e=0;e<l.length;e+=4)ee.push(l.slice(e,e+4).map(e=>e));let te=l.length>0,ne=te||d>0||D;return W`
    <div class="tree-scroll">
      <div class="tree-box view-tree">
        ${x?this._renderTreeRow(this._tt(`grandparents`),W`<div class="tree-grid-row tree-grid-row--gp">
                ${E(g[0],g[1],p,`tree-grid-pair--left`)}
                ${E(g[2],g[3],m,`tree-grid-pair--right`)}
              </div>`):G}
        ${this._renderTreeRow(this._tt(`parents`),W`<div class="tree-grid-row tree-grid-row--parents">
            ${this._treeCell(1,2,w(p,!p),`tree-grid-cell--span2`)}
            ${this._treeCell(3,2,w(m??void 0,!m),`tree-grid-cell--span2`)}
          </div>`)}
        ${this._renderTreeRow(null,W`<div class="tree-grid-row tree-grid-row--focus">
            ${this._treeCell(2,2,this._treeCard(c),`tree-grid-cell--center tree-grid-cell--stem-down`)}
          </div>`)}
        ${i.length?W`<div class="union-tabs">
              ${i.length>1?W`<div class="subtabs tree-subtabs">
                    ${i.map((e,t)=>W`<button
                        class=${t===a?`active`:``}
                        @click=${()=>this._treeUnion=t}
                      >
                        ${(e.partners||[]).map(e=>String(e.name||``)).filter(Boolean).join(` & `)||`${this._tt(`partners`)} ${t+1}`}
                      </button>`)}
                  </div>`:G}
              ${this._renderTreeRow(this._tt(`partners`),W`<div
                  class="tree-grid-row tree-grid-row--partner ${ne?`tree-grid-row--stem-down`:``}"
                >
                  ${this._treeCell(2,2,W`${(o?.partners||[]).map(e=>W`<div class="tree-card-wrap">
                        ${this._renderPersonCard(e,{subtitle:_})}
                      </div>`)}`,`tree-grid-cell--center`)}
                </div>`)}
              ${te?W`${ee.map((e,t)=>{let n=this._childrenBusStyle(e.length),r=e.length>=2;return this._renderTreeRow(t===0?this._tt(`children`):null,W`<div
                        class="tree-grid-row tree-grid-row--children ${t===0?``:`tree-grid-row--children-cont`} ${r?`tree-grid-row--children-bus`:``}"
                        style=${n}
                      >
                        ${this._treeCell(1,4,W`<div class="tree-children-group">
                            ${e.map(e=>this._treeCard(e,``,{hideSiblings:!0,stemDown:Number(e.children_count||0)>0}))}
                          </div>`,`tree-grid-cell--children-group`)}
                      </div>`)})}`:G}
              ${D?this._renderTreeRow(te?null:this._tt(`children`),W`<div class="tree-grid-row tree-grid-row--add-child">
                      ${this._treeCell(2,2,W`<div class="tree-card-wrap">
                          ${this._renderChildExtras(d,C)}
                        </div>`,`tree-grid-cell--center`)}
                    </div>`):G}
            </div>`:this._canWrite()?this._renderTreeRow(this._tt(`partners`),W`<div class="tree-grid-row">
                  ${this._treeCell(2,2,W`<button
                      type="button"
                      class="add-slot"
                      @click=${()=>this._openAddRelation({kind:`partner`,personId:t.id})}
                    >
                      ${K(Nd)} ${this._tt(`add_partner`)}
                    </button>`,`tree-grid-cell--center`)}
                </div>`):G}
      </div>
    </div>
  `}).call(e,t)}function Ff(e,t){return(function(e){let t=e.citations||[],n=this._canWrite();return W`
    ${n?W`<div class="section-head">
          ${q(`+ ${this._tt(`add_source`)}`,{variant:`filled`,onClick:()=>this._openCitationDialog()})}
        </div>`:G}
    <ul class="plain source-list">
      ${t.map(e=>{let t=String(e.source_title||`Source`),r=String(e.source_url||``),i=[String(e.source_author||``).trim(),String(e.source_repository||``).trim()].filter(Boolean);return W`<li class="source-row">
          <span class="source-row-main">
            ${r&&kf(r)?W`<a href=${r} target="_blank" rel="noopener">${t}</a>`:W`<strong>${t}</strong>`}
            ${e.detail?W`<span class="muted"> — ${e.detail}</span>`:G}
            ${i.length?W`<span class="muted source-row-extra">${i.join(` · `)}</span>`:G}
          </span>
          ${n?W`<span class="row-actions">
                <button
                  type="button"
                  class="linkish"
                  @click=${()=>this._openCitationDialog(e)}
                >
                  ${this._tt(`edit`)}
                </button>
                <button
                  type="button"
                  class="linkish danger"
                  @click=${()=>void this._deleteCitationById(String(e.id))}
                >
                  ${this._tt(`delete`)}
                </button>
              </span>`:G}
        </li>`})}
      ${t.length===0?W`<li class="muted">—</li>`:G}
    </ul>
  `}).call(e,t)}function If(e,t){return(function(e){let t=this._personMedia,n=e.profile_media_id;return W`
    ${this._canWrite()?W`<div class="section-head section-head-actions">
          <input
            id="ft-person-add-photo"
            class="sr-only"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            @change=${this._onPersonPhotoFileChange}
          />
          ${q(`+ ${this._tt(`add_photo`)}`,{variant:`filled`,onClick:()=>{this.renderRoot.querySelector(`#ft-person-add-photo`)?.click()}})}
        </div>`:G}
    ${t.length===0?W`<p class="muted">${this._tt(`no_photos`)}</p>`:W`<div class="photo-grid">
          ${t.map(e=>W`<div class="photo-tile">
              <button
                type="button"
                class="photo-thumb-btn"
                @click=${()=>this._photoLightbox=e.id}
              >
                <ft-authenticated-media-img
                  .hass=${this.hass}
                  mediaId=${e.id}
                  variant="thumb"
                ></ft-authenticated-media-img>
                ${n===e.id?W`<span class="photo-profile-badge">${this._tt(`profile_photo`)}</span>`:G}
              </button>
              ${e.caption?W`<div class="photo-caption">${e.caption}</div>`:G}
              ${this._canWrite()?W`<div class="photo-actions">
                    ${n===e.id?G:W`<button type="button" class="linkish" @click=${()=>this._setProfilePhoto(e.id)}>
                          ${this._tt(`set_profile_photo`)}
                        </button>`}
                    <button
                      type="button"
                      class="linkish danger"
                      @click=${()=>void this._deletePersonPhoto(e.id)}
                    >
                      ${this._tt(`delete`)}
                    </button>
                  </div>`:G}
            </div>`)}
        </div>`}
  `}).call(e,t)}function Z(e,t,n={}){return e.connection.sendMessagePromise({type:t,...n})}async function Lf(e,t){return e.connection.subscribeMessage(t,{type:`family_tree/subscribe`})}async function Rf(e,t={}){return Z(e,`family_tree/persons/list`,t)}async function zf(e,t){return Z(e,`family_tree/persons/get`,{person_id:t})}async function Bf(e,t){return Z(e,`family_tree/persons/siblings`,{person_id:t})}async function Vf(e,t){return Z(e,`family_tree/persons/save`,t)}async function Hf(e,t){return Z(e,`family_tree/persons/delete`,{person_id:t})}async function Uf(e,t){return Z(e,`family_tree/persons/restore`,{person_id:t})}async function Wf(e,t){return Z(e,`family_tree/persons/purge`,{person_id:t})}async function Gf(e){return Z(e,`family_tree/stats`)}async function Kf(e){return Z(e,`family_tree/families`)}async function qf(e){return Z(e,`family_tree/settings`)}async function Jf(e,t){return Z(e,`family_tree/unions/get`,{union_id:t})}async function Yf(e,t){let{id:n,union_id:r,...i}=t;return Z(e,`family_tree/unions/save`,{...i,...r||n?{union_id:String(r||n)}:{}})}async function Xf(e,t){return Z(e,`family_tree/unions/delete`,{union_id:t})}async function Zf(e,t){return Z(e,`family_tree/parent_child/add`,t)}async function Qf(e,t){return Z(e,`family_tree/parent_child/remove`,{link_id:t})}async function $f(e,t={}){return Z(e,`family_tree/places/list`,t)}async function ep(e,t){let{id:n,place_id:r,...i}=t;return Z(e,`family_tree/places/save`,{...i,...r||n?{place_id:r||n}:{}})}async function tp(e,t){let{id:n,citation_id:r,...i}=t;return Z(e,`family_tree/citations/save`,{...i,...r||n?{citation_id:String(r||n)}:{}})}async function np(e,t){return Z(e,`family_tree/citations/delete`,{citation_id:t})}async function rp(e,t){let{id:n,event_id:r,date_qualifier:i,type:a,...o}=t,s={...o,...r||n?{event_id:String(r||n)}:{}};return!s.event_type&&typeof a==`string`&&(s.event_type=a),Z(e,`family_tree/events/save`,s)}async function ip(e,t){return Z(e,`family_tree/settings/save`,{family_shortcuts:t})}async function ap(e,t){return Z(e,`family_tree/events/delete`,{event_id:t})}async function op(e){return(await Z(e,`family_tree/ha_users/list`)).users||[]}async function sp(e){return Z(e,`family_tree/user_links/list`)}async function cp(e,t,n){return Z(e,`family_tree/user_links/set`,{ha_user_id:t,person_id:n})}async function lp(e){return Z(e,`family_tree/lineage/mine`)}async function up(e,t){return Z(e,`family_tree/user_links/claim`,t)}async function dp(e,t){return Z(e,`family_tree/persons/media/list`,{person_id:t})}async function fp(e,t){return Z(e,`family_tree/persons/media/delete`,{media_id:t})}function pp(e,t,n){let r=new URLSearchParams(n).toString();return`/api/family_tree/persons/${e}/media${r?`?${r}`:``}`}async function mp(e,t,n){return Z(e,`family_tree/gazetteer/search`,{query:t,country:n})}async function hp(e){return Z(e,`family_tree/gazetteer/status`)}function gp(e){return(function(){let e=this._gazetteer?.countries||[],t=this._canWrite(),n=this._knownSurnames(),r=this._renderLinkedUsersSettingsBody(t),i=W`<div class="settings-subsections form-stack">
    <div class="form-stack">
      <span class="form-stack-title">${this._tt(`import_gedcom`)}</span>
      ${t?W`
            <label class="check">
              <input
                type="checkbox"
                .checked=${this._replaceImport}
                @change=${e=>this._replaceImport=e.target.checked}
              />
              ${this._tt(`replace_import`)}
            </label>
            ${q(this._tt(`import_gedcom`),{variant:`filled`,onClick:()=>this._pickGedcomFile(`ft-gedcom-settings-file`)})}
            <input
              id="ft-gedcom-settings-file"
              class="sr-only"
              type="file"
              accept=".ged,text/plain"
              @change=${e=>this._onGedcomFilePicked(e)}
            />
          `:W`<p class="muted">${this._tt(`read_only`)}</p>`}
      ${this._importStatus?W`<p class="muted">${this._importStatus}</p>`:G}
    </div>
    <div class="form-stack settings-gedcom-export">
      <span class="form-stack-title">${this._tt(`export_gedcom`)}</span>
      <p class="muted">${this._tt(`settings_gedcom_export_hint`)}</p>
      <label class="check">
        <input
          type="checkbox"
          .checked=${this._anonymizeLivingExport}
          @change=${e=>this._anonymizeLivingExport=e.target.checked}
        />
        ${this._tt(`anonymize_living`)}
      </label>
      <p class="muted">${this._tt(`anonymize_living_hint`)}</p>
      ${q(this._tt(`export_gedcom`),{variant:`filled`,onClick:()=>this._exportGedcom()})}
    </div>
  </div>`,a=W`<div class="form-stack">
    <p class="muted">${this._tt(`settings_shortcuts_help`)}</p>
    <div class="chip-row settings-shortcut-chips">
      ${this._shortcutsDraft.map((e,n)=>W`<span class="chip">
          ${e}
          ${t?W`<button
                type="button"
                class="linkish chip-remove"
                aria-label=${this._tt(`delete`)}
                @click=${()=>void this._removeShortcut(n)}
              >
                ×
              </button>`:G}
        </span>`)}
      ${this._shortcutsDraft.length?G:W`<span class="muted">—</span>`}
    </div>
    ${t?W`<div class="inline-form">
          <input
            list="ft-surname-suggestions"
            .value=${this._shortcutInput}
            placeholder=${this._tt(`settings_shortcuts_placeholder`)}
            @input=${e=>this._shortcutInput=e.target.value}
            @keydown=${e=>{e.key===`Enter`&&(e.preventDefault(),this._addShortcutFromInput())}}
          />
          <datalist id="ft-surname-suggestions">
            ${n.map(e=>W`<option value=${e}></option>`)}
          </datalist>
          ${q(this._tt(`settings_shortcuts_add`),{variant:`filled`,disabled:this._shortcutsSaving,onClick:()=>void this._addShortcutFromInput()})}
        </div>`:G}
  </div>`,o=W`<div class="form-stack">
    <p class="muted">${this._tt(`settings_gazetteer_countries_hint`)}</p>
    <p class="muted">${e.map(e=>`${e.code} (${e.place_count})`).join(`, `)||`—`}</p>
    <div class="inline-form">
      <input
        .value=${this._gazQuery}
        placeholder=${this._tt(`gazetteer_search_placeholder`)}
        @input=${e=>this._gazQuery=e.target.value}
      />
      ${q(this._tt(`search`),{variant:`filled`,onClick:()=>this._runGazSearch()})}
    </div>
    <ul class="plain">
      ${this._gazHits.map(e=>W`<li>${e.name}${e.admin1?`, ${e.admin1}`:``} (${e.country_code})</li>`)}
    </ul>
  </div>`;return W`<div class="settings-page">
    ${this._renderCollapsibleSection(`settings-linked-users`,this._tt(`linked_users`),r,!0)}
    ${this._renderCollapsibleSection(`settings-gedcom`,this._tt(`settings_gedcom`),i,!0)}
    ${this._renderCollapsibleSection(`settings-shortcuts`,this._tt(`settings_shortcuts`),a,!0)}
    ${this._renderCollapsibleSection(`settings-gazetteer`,this._tt(`gazetteer`),o,!1)}
  </div>`}).call(e)}function _p(e){return(function(){let e=this._peopleSearchMatches(this._linkPersonQuery),t=this._haUserMatches(),n=this._linkUserQuery.trim();return W`<div class="form-stack user-link-form">
    ${this._haUsersLoadError?W`<p class="muted">${this._tt(`ha_users_load_failed`)}</p>
          <p class="muted">${this._haUsersLoadError}</p>`:G}
    <label>
      ${this._tt(`link_ha_user`)}
      <input
        type="search"
        .value=${this._linkUserQuery}
        placeholder=${this._tt(`search_placeholder`)}
        @input=${e=>{this._linkUserQuery=e.target.value,this._linkSelectedUserId=``}}
      />
    </label>
    ${this._linkSelectedUserId?W`<p class="muted">
          ${this._haUserDisplayName(this._linkSelectedUserId)}
          <button
            type="button"
            class="linkish"
            @click=${()=>{this._linkSelectedUserId=``,this._linkUserQuery=``}}
          >
            ×
          </button>
        </p>`:t.length?W`<ul class="plain me-hits">
            ${t.map(e=>W`<li>
                <button
                  type="button"
                  class="linkish"
                  @click=${()=>{this._linkSelectedUserId=e.id,this._linkUserQuery=e.name||``}}
                >
                  <strong>${e.name||this._tt(`linked_users`)}</strong>
                </button>
              </li>`)}
          </ul>`:n&&!t.length?W`<p class="muted">${this._tt(`ha_users_no_match`)}</p>`:!n&&!this._haUsersLoadError?W`<p class="muted">${this._tt(`search_ha_users_hint`)}</p>`:G}
    <label>
      ${this._tt(`link_person`)}
      <input
        type="search"
        .value=${this._linkPersonQuery}
        placeholder=${this._tt(`search_placeholder`)}
        @input=${e=>{this._linkPersonQuery=e.target.value,this._linkPersonId=``}}
      />
    </label>
    ${this._linkPersonId?W`<p class="muted">
          ${J(this._people.find(e=>e.id===this._linkPersonId)||{id:this._linkPersonId,given_names:``,call_name:``,surname_prefix:``,surname:``,sex:`unknown`,is_living:!0,notes:``})}
          <button
            type="button"
            class="linkish"
            @click=${()=>{this._linkPersonId=``,this._linkPersonQuery=``}}
          >
            ×
          </button>
        </p>`:this._renderPersonSearchHits(e,this._linkPersonQuery,e=>{this._linkPersonId=e;let t=this._people.find(t=>t.id===e);t&&(this._linkPersonQuery=J(t))})}
  </div>`}).call(e)}function vp(e,t){return(function(e){let t=this.hass?.user?.name||this.hass?.user?.id||`—`,n=String(this.hass?.user?.id||``),r=this._lineage?.person_id,i=this._lineage?.person_name,a=this._userLinks.some(e=>String(e.ha_user_id)===n),o=this._mePersonMatches(),s=this._userLinks.length?W`<div class="settings-linked-users settings-linked-grid">
        ${this._userLinks.map(t=>{let r=String(t.person_id||``),i=this._people.find(e=>e.id===r),a=String(t.ha_user_id||``),o=this._haUserDisplayName(a),s=a===n,c=o?s?`${o} · ${this._tt(`lineage_me`)}`:o:s?this._tt(`lineage_me`):void 0;return W`<div class="person-card-wrap">
            ${i?this._renderPersonCard(i,{preview:!0,subtitle:c}):W`<div class="person-card">
                  <div class="person-card-title">${t.person_name||r}</div>
                  ${c?W`<div class="person-card-meta">${c}</div>`:G}
                </div>`}
            ${s?W`<div class="rel-person-actions">
                  <button
                    type="button"
                    class="linkish danger"
                    @click=${()=>void this._claimMe(null)}
                  >
                    ${this._tt(`unlink_me`)}
                  </button>
                </div>`:e?W`<div class="rel-person-actions">
                    <button
                      type="button"
                      class="linkish danger"
                      @click=${async()=>{await cp(this.hass,a,null),await this._loadSettingsExtras()}}
                    >
                      ${this._tt(`delete`)}
                    </button>
                  </div>`:G}
          </div>`})}
      </div>`:W`<p class="muted">—</p>`;return W`<div class="form-stack settings-me-body">
    ${e?W`<div class="section-head">
          ${q(`+ ${this._tt(`add_user_link`)}`,{variant:`filled`,onClick:()=>this._openUserLinkDialog()})}
        </div>`:G}
    ${s}
    ${a?G:W`<p class="muted settings-me-username">${t}</p>`}
    <p class="lineage-legend muted">
      <span class="lineage-marker" aria-hidden="true">${K(Id)}</span>
      ${this._tt(`settings_lineage_help`)}
    </p>
    ${r&&!a?i?W`<p>
            <strong>${i}</strong>
            <button type="button" class="linkish danger" @click=${()=>void this._claimMe(null)}>
              ${this._tt(`unlink_me`)}
            </button>
          </p>`:G:r?G:W`<p class="muted">${this._tt(`not_linked`)}</p>
            <label>
              ${this._tt(`search_person`)}
              <input
                type="search"
                .value=${this._meQuery}
                placeholder=${this._tt(`search_placeholder`)}
                @input=${e=>this._meQuery=e.target.value}
              />
            </label>
            ${this._renderPersonSearchHits(o,this._meQuery,e=>void this._claimMe(e))}
            <button
              type="button"
              class="linkish"
              @click=${()=>this._meCreateOpen=!this._meCreateOpen}
            >
              ${this._tt(`create_my_person`)}
            </button>
            ${this._meCreateOpen?W`<div class="inline-form me-create">
                  <input
                    placeholder=${this._tt(`given_names`)}
                    .value=${this._meForm.given_names||``}
                    @input=${e=>this._meForm={...this._meForm,given_names:e.target.value}}
                  />
                  <input
                    placeholder=${this._tt(`surname`)}
                    .value=${this._meForm.surname||``}
                    @input=${e=>this._meForm={...this._meForm,surname:e.target.value}}
                  />
                  <select
                    .value=${this._meForm.sex||`unknown`}
                    @change=${e=>this._meForm={...this._meForm,sex:e.target.value}}
                  >
                    <option value="male">${this._tt(`sex_male`)}</option>
                    <option value="female">${this._tt(`sex_female`)}</option>
                    <option value="unknown">${this._tt(`sex_unknown`)}</option>
                  </select>
                  <button type="button" @click=${()=>void this._createAndClaimMe()}>
                    ${this._tt(`save`)}
                  </button>
                </div>`:G}`}
  </div>`}).call(e,t)}var yp=[`JAN`,`FEB`,`MAR`,`APR`,`MAY`,`JUN`,`JUL`,`AUG`,`SEP`,`OCT`,`NOV`,`DEC`],bp=/^(\d{1,2})\s+([A-Z]{3})\s+(\d{4})$/i,xp=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function Sp(e){let t=(e||``).trim();if(!t)return``;let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t);if(!n)return``;let r=Number(n[1]),i=Number(n[2]),a=Number(n[3]);return i<1||i>12||a<1||a>31?``:`${a} ${yp[i-1]} ${r}`}function Cp(e){let t=(e||``).trim();if(!t)return null;let n=bp.exec(t);if(!n)return null;let r=Number(n[1]),i=yp.indexOf(n[2].toUpperCase())+1,a=Number(n[3]);return i<1||r<1||r>31?null:`${String(a).padStart(4,`0`)}-${String(i).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`}function wp(e){return(e||``).trim()||`—`}function Tp(e,t=`days`){return e===0?`today`:e===1?`tomorrow`:`in ${e} ${t}`}function Ep(e){if(!e)return null;let t=/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(e);return t?{year:Number(t[1]),month:t[2]?Number(t[2]):void 0,day:t[3]?Number(t[3]):void 0}:null}function Dp(e,t,n,r=new Date){let i=Ep(e);if(!i?.year)return null;let a=n?{year:r.getFullYear(),month:r.getMonth()+1,day:r.getDate()}:Ep(t);if(!a?.year)return null;let o=a.year-i.year,s=i.month??1,c=i.day??1,l=a.month??1,u=a.day??1;return(l<s||l===s&&u<c)&&--o,Math.max(0,o)}function Op(e,t){let n=Ep(t)?.year;if(n)return n;let r=/\b(\d{4})\b/.exec(e||``);return r?Number(r[1]):null}function kp(e,t,n){let r=Ep(t);if(r?.year&&r.month&&r.day){let e=`${xp[r.month-1]} ${r.day}, ${r.year}`;return n==null?e:`${e} (${n})`}let i=(e||``).trim();return i?n==null?i:`${i} (${n})`:n==null?``:`(${n})`}function Ap(e){let t=e.is_living!==!1,n=Dp(e.birth_sort_date,e.death_sort_date,t,e.today);if(t)return kp(e.birth_date_text,e.birth_sort_date,n);let r=Op(e.birth_date_text,e.birth_sort_date),i=Op(e.death_date_text,e.death_sort_date),a=/about|abt|circa|ca\.?/i.test(e.death_date_text||``);return r!=null&&i!=null?`${r} - ${a?`about ${i}`:String(i)}${n==null?``:` (±${n})`}`:r==null?i==null?``:a?`about ${i}`:String(i):String(r)}function Q(e){if(e==null)return`Unknown error`;if(typeof e==`string`)return e;if(e instanceof Error)return e.message||String(e);if(typeof e==`object`){let t=e;if(typeof t.message==`string`&&t.message.trim())return t.message;if(typeof t.error==`string`&&t.error.trim())return t.error;if(t.error&&typeof t.error==`object`){let e=t.error;if(typeof e.message==`string`&&e.message.trim())return e.message}try{return JSON.stringify(e)}catch{return`Unknown error`}}return String(e)}var jp={brand:`Family Tree`,nav_dashboard:`Dashboard`,nav_people:`People`,nav_trash:`Trash`,nav_settings:`Settings`,search_placeholder:`Search people…`,filter_all:`All`,filter_living:`Alive`,filter_deceased:`Deceased`,filter_all_statuses:`All statuses`,filter_all_people:`All people`,filters:`Filters`,filter_family:`Family`,filter_all_families:`All families`,filter_all_places:`All places`,filter_date_from:`From`,filter_date_to:`To`,filter_reset:`Reset`,linked_users:`Linked users`,filter_linked_users:`Linked users`,add_person:`Add person`,save:`Save`,cancel:`Cancel`,delete:`Delete`,restore:`Restore`,purge:`Delete forever`,given_names:`First name(s)`,call_name:`Preferred name`,surname_prefix:`Surname prefix`,surname:`Last name`,sex:`Gender`,deceased:`Deceased`,revive_unions_hint:`Saving will set this person’s widowed partnerships back to ongoing.`,notes:`Notes`,details:`Details`,relationships:`Relationships`,tree:`Tree`,sources:`Sources`,stats_total:`People`,stats_living:`Alive`,stats_deceased:`Deceased`,chart_ages:`Age distribution`,chart_centuries:`Birth centuries`,chart_places:`Places of birth`,upcoming_birthdays:`Upcoming birthdays`,upcoming_anniversaries:`Upcoming anniversaries`,turns_age:`turns %s`,years_old:`%s years old`,years_old_approx:`±%s years old`,on_this_day:`Looking back`,on_this_day_years_ago:`%s years ago`,on_this_day_birth:`Born`,on_this_day_baptism:`Baptized`,on_this_day_death:`Died`,on_this_day_marriage:`Married`,on_this_day_partnership:`Partnership`,no_people:`No people yet.`,empty_cta_hint:`Add someone manually or import a GEDCOM file to get started.`,read_only:`Read-only — admin required to edit.`,settings_gedcom:`GEDCOM`,settings_gedcom_export_hint:`Download the full tree as a .ged file.`,anonymize_living:`Anonymize living people`,anonymize_living_hint:`Living names become “Living”, dates and notes are stripped, tree links stay. The file is still plain text — share with care.`,import_gedcom:`Import GEDCOM`,export_gedcom:`Export GEDCOM`,link_ha_user:`Home Assistant user`,link_person:`Person in tree`,replace_import:`Replace existing data`,user_links:`User links`,add_user_link:`Add user link`,search_ha_users_hint:`Type to search Home Assistant users`,ha_users_load_failed:`Could not load Home Assistant users. Reload the integration and try again.`,ha_users_no_match:`No matching users`,gazetteer:`Place gazetteer`,families:`Families`,family_span_now:`now`,parents:`Parents`,grandparents:`Grandparents`,children:`Children`,siblings:`Siblings`,partners:`Partners`,events:`Events`,add_event:`Add event`,date:`Date`,date_advanced:`Advanced date`,date_simple:`Use date picker`,date_gedcom_hint:`e.g. 12 JAN 1980, ABT 1900`,place:`Place`,description:`Description`,close:`Close`,loading:`Loading…`,error:`Something went wrong`,field_required:`First name(s) is required.`,sex_male:`Male`,sex_female:`Female`,sex_intersex:`Intersex`,sex_unknown:`Unknown`,event_birth:`Birth`,event_death:`Death`,event_baptism:`Baptism`,event_burial:`Burial`,event_occupation:`Occupation`,event_residence:`Residence`,days:`days`,tab_menu:`Menu`,confirm_import:`Confirm import`,importing:`Importing…`,import_preview:`Import preview`,import_complete:`Import complete`,import_complete_hint:`Your family tree has been imported successfully.`,import_persons:`People`,import_unions:`Families`,import_events:`Events`,import_sources:`Sources`,import_places:`Places`,replace_warning:`This will replace all existing family tree data.`,event_marriage:`Marriage`,event_divorce:`Divorce`,event_partnership:`Partnership`,siblings_count:`siblings`,filter_search:`Search`,filter_all_sexes:`All genders`,filter_clear_all:`Clear all`,col_name:`Full name`,col_birth:`Date of birth`,col_death:`Date of death`,col_children:`No. children`,col_lineage:`Lineage`,father:`Father`,mother:`Mother`,col_parents:`Parents`,child:`child`,actions:`Actions`,edit:`Edit`,edit_event:`Edit event`,profession:`Profession`,lifespan:`Lifespan`,section_personal:`Personal`,section_photos:`Photos`,photo:`Photo`,add_photo:`Add photo`,no_photos:`No photos yet.`,profile_photo:`Profile`,edit_profile_photo:`Edit profile photo`,profile_photo_choose:`Choose image`,profile_photo_zoom:`Zoom`,set_profile_photo:`Set as profile`,confirm_delete_photo:`Delete this photo?`,section_birth:`Birth`,section_deceased:`Deceased`,birth_place:`Place of birth`,death_place:`Place of death`,birth_date_unformatted:`Date of birth (unformatted)`,death_date_unformatted:`Date of death (unformatted)`,lineage_ancestor:`ancestor`,lineage_descendant:`descendant`,lineage_of:`of`,lineage_tooltip:`%s is a %s generation %s of %s.`,lineage_me:`Your linked person`,confirm_delete_person:`Move “%s” to trash?`,confirm_purge_person:`Permanently delete “%s”? This cannot be undone.`,confirm_delete_union:`Remove this partnership?`,confirm_remove_parent:`Remove this parent link?`,edit_in_relationships:`Edit in Relationships`,section_parents:`Parents`,section_partners:`Partners`,settings_shortcuts:`Family surname shortcuts`,settings_shortcuts_help:`Surnames shown as quick filters on the dashboard and people list (e.g. van Iersel). Matching ignores Dutch prefixes for sorting.`,settings_lineage_help:`Link yourself to a person in the tree. After that, this icon marks you and your biological relatives (parents, children, and so on) in the people list, on profiles, and in tree views.`,settings_shortcuts_add:`Add`,settings_shortcuts_placeholder:`Surname`,settings_gazetteer_countries_hint:`Offline place-search countries are configured in Home Assistant → Settings → Devices & services → Family Tree → Configure.`,gazetteer_search_placeholder:`Search places…`,search:`Search`,link_existing_person:`Link existing person`,change:`Change`,add_father:`Add father`,add_mother:`Add mother`,add_source:`Add source`,edit_source:`Edit source`,source_title:`Title`,source_url:`URL`,source_url_invalid:`Enter a valid URL (http or https).`,source_author:`Author`,source_repository:`Repository`,citation_detail:`Citation detail`,confirm_delete_citation:`Remove this source from this person?`,event_child_birth:`Birth of child %s`,event_child_death:`Death of child %s`,event_partner_birth:`Birth of partner %s`,event_partner_death:`Death of partner %s`,search_to_link:`Search for a person…`,union_status:`Status`,union_notes:`Notes`,known_children:`Known children`,status_ongoing:`Ongoing`,status_divorced:`Divorced`,status_separated:`Separated`,status_widowed:`Widowed`,anniversaries_hint:`Wedding anniversaries in the next 60 days (both partners living).`,anniversary_years:`%s years`,no_anniversaries:`No upcoming anniversaries.`,add_parents:`Add parents`,add_partner:`Add partner`,add_child:`Add child`,view_siblings:`View siblings`,view_full_profile:`View full profile`,view_tree_action:`View tree`,siblings_of:`Siblings of %s`,half_sibling:`Half-sibling`,unknown_children:`unknown children`,more_child:`%s child`,more_children:`%s children`,not_linked:`You are not linked to a person in the tree yet.`,unlink_me:`Unlink`,search_person:`Search for your person`,create_my_person:`Create my person`,date_qualifier:`Date precision`,date_second:`Second date`,date_hint:`e.g. 26 Apr 1941 or 1941`,date_invalid:`Invalid date — check the format.`,already_added:`already added`,qual_exact:`Exact`,qual_about:`About`,qual_before:`Before`,qual_after:`After`,qual_between:`Between`,qual_from_to:`From … to`,qual_estimated:`Estimated`,qual_calculated:`Calculated`},Mp={brand:`Stamboom`,nav_dashboard:`Dashboard`,nav_people:`Personen`,nav_trash:`Prullenbak`,nav_settings:`Instellingen`,search_placeholder:`Personen zoeken…`,filter_all:`Alles`,filter_living:`Levend`,filter_deceased:`Overleden`,filter_all_statuses:`Alle statussen`,filter_all_people:`Alle personen`,filters:`Filters`,filter_family:`Familie`,filter_all_families:`Alle families`,filter_all_places:`Alle plaatsen`,filter_date_from:`Van`,filter_date_to:`Tot`,filter_reset:`Reset`,linked_users:`Gekoppelde gebruikers`,filter_linked_users:`Gekoppelde gebruikers`,add_person:`Persoon toevoegen`,save:`Opslaan`,cancel:`Annuleren`,delete:`Verwijderen`,restore:`Terugzetten`,purge:`Definitief verwijderen`,given_names:`Voornamen`,call_name:`Roepnaam`,surname_prefix:`Tussenvoegsel`,surname:`Achternaam`,sex:`Geslacht`,deceased:`Overleden`,revive_unions_hint:`Opslaan zet de verweduwde partnerschappen van deze persoon terug naar lopend.`,notes:`Notities`,details:`Details`,relationships:`Relaties`,tree:`Stamboom`,sources:`Bronnen`,stats_total:`Personen`,stats_living:`Levend`,stats_deceased:`Overleden`,chart_ages:`Leeftijdsverdeling`,chart_centuries:`Geboorte-eeuwen`,chart_places:`Geboorteplaatsen`,upcoming_birthdays:`Komende verjaardagen`,upcoming_anniversaries:`Komende jubilea`,turns_age:`wordt %s`,years_old:`%s jaar oud`,years_old_approx:`±%s jaar oud`,on_this_day:`Terugblik`,on_this_day_years_ago:`%s jaar geleden`,on_this_day_birth:`Geboren`,on_this_day_baptism:`Gedoopt`,on_this_day_death:`Overleden`,on_this_day_marriage:`Getrouwd`,on_this_day_partnership:`Partnerschap`,no_people:`Nog geen personen.`,empty_cta_hint:`Voeg handmatig iemand toe of importeer een GEDCOM-bestand.`,read_only:`Alleen-lezen — beheerder nodig om te bewerken.`,settings_gedcom:`GEDCOM`,settings_gedcom_export_hint:`Download de volledige stamboom als .ged-bestand.`,anonymize_living:`Levende personen anonimiseren`,anonymize_living_hint:`Namen van levenden worden “Living”, datums en notities verdwijnen, familiebanden blijven. Het bestand blijft platte tekst — deel met zorg.`,import_gedcom:`GEDCOM importeren`,export_gedcom:`GEDCOM exporteren`,link_ha_user:`Home Assistant-gebruiker`,link_person:`Persoon in stamboom`,replace_import:`Bestaande gegevens vervangen`,user_links:`Gebruikerskoppelingen`,add_user_link:`Gebruikerskoppeling toevoegen`,search_ha_users_hint:`Typ om Home Assistant-gebruikers te zoeken`,ha_users_load_failed:`Home Assistant-gebruikers laden mislukt. Herlaad de integratie en probeer opnieuw.`,ha_users_no_match:`Geen overeenkomende gebruikers`,gazetteer:`Plaatsengazetteer`,families:`Families`,family_span_now:`nu`,parents:`Ouders`,grandparents:`Grootouders`,children:`Kinderen`,siblings:`Broers/zussen`,partners:`Partners`,events:`Gebeurtenissen`,add_event:`Gebeurtenis toevoegen`,date:`Datum`,date_advanced:`Geavanceerde datum`,date_simple:`Datumkiezer gebruiken`,date_gedcom_hint:`bijv. 12 JAN 1980, ABT 1900`,place:`Plaats`,description:`Beschrijving`,close:`Sluiten`,loading:`Laden…`,error:`Er ging iets mis`,field_required:`Voornamen is verplicht.`,sex_male:`Man`,sex_female:`Vrouw`,sex_intersex:`Intersekse`,sex_unknown:`Onbekend`,event_birth:`Geboorte`,event_death:`Overlijden`,event_baptism:`Doop`,event_burial:`Begrafenis`,event_occupation:`Beroep`,event_residence:`Woonplaats`,days:`dagen`,tab_menu:`Menu`,confirm_import:`Import bevestigen`,importing:`Importeren…`,import_preview:`Importvoorbeeld`,import_complete:`Import voltooid`,import_complete_hint:`Je stamboom is succesvol geïmporteerd.`,import_persons:`Personen`,import_unions:`Families`,import_events:`Gebeurtenissen`,import_sources:`Bronnen`,import_places:`Plaatsen`,replace_warning:`Dit vervangt alle bestaande stamboomgegevens.`,event_marriage:`Huwelijk`,event_divorce:`Scheiding`,event_partnership:`Partnerschap`,siblings_count:`broers/zussen`,filter_search:`Zoeken`,filter_all_sexes:`Alle geslachten`,filter_clear_all:`Alles wissen`,col_name:`Volledige naam`,col_birth:`Geboortedatum`,col_death:`Overlijdensdatum`,col_children:`Aantal kinderen`,col_lineage:`Afstamming`,father:`Vader`,mother:`Moeder`,col_parents:`Ouders`,child:`kind`,actions:`Acties`,edit:`Bewerken`,edit_event:`Gebeurtenis bewerken`,profession:`Beroep`,lifespan:`Levensduur`,section_personal:`Persoonlijk`,section_photos:`Foto's`,photo:`Foto`,add_photo:`Foto toevoegen`,no_photos:`Nog geen foto's.`,profile_photo:`Profiel`,edit_profile_photo:`Profielfoto bewerken`,profile_photo_choose:`Afbeelding kiezen`,profile_photo_zoom:`Zoom`,set_profile_photo:`Als profielfoto instellen`,confirm_delete_photo:`Deze foto verwijderen?`,section_birth:`Geboorte`,section_deceased:`Overleden`,birth_place:`Geboorteplaats`,death_place:`Overlijdensplaats`,birth_date_unformatted:`Geboortedatum (ongestructureerd)`,death_date_unformatted:`Overlijdensdatum (ongestructureerd)`,lineage_ancestor:`voorouder`,lineage_descendant:`nakomeling`,lineage_of:`van`,lineage_tooltip:`%s is een %s generatie %s van %s.`,lineage_me:`Jouw gekoppelde persoon`,confirm_delete_person:`“%s” naar de prullenbak verplaatsen?`,confirm_purge_person:`“%s” definitief verwijderen? Dit kan niet ongedaan worden gemaakt.`,confirm_delete_union:`Dit partnerschap verwijderen?`,confirm_remove_parent:`Deze ouderkoppeling verwijderen?`,edit_in_relationships:`Bewerken in Relaties`,section_parents:`Ouders`,section_partners:`Partners`,settings_shortcuts:`Achternaam-snelkoppelingen`,settings_shortcuts_help:`Achternamen als snelle filters op het dashboard en in de personenlijst (bijv. van Iersel). Nederlandse tussenvoegsels worden bij sorteren genegeerd.`,settings_lineage_help:`Koppel jezelf aan een persoon in de stamboom. Daarna markeert dit icoon jou en je biologische familie (ouders, kinderen, enz.) in de personenlijst, op profielen en in stamboomweergaven.`,settings_shortcuts_add:`Toevoegen`,settings_shortcuts_placeholder:`Achternaam`,settings_gazetteer_countries_hint:`Landen voor offline plaatszoeken stel je in via Home Assistant → Instellingen → Apparaten en diensten → Stamboom → Configureren.`,gazetteer_search_placeholder:`Plaatsen zoeken…`,search:`Zoeken`,link_existing_person:`Bestaande persoon koppelen`,change:`Wijzigen`,add_father:`Vader toevoegen`,add_mother:`Moeder toevoegen`,add_source:`Bron toevoegen`,edit_source:`Bron bewerken`,source_title:`Titel`,source_url:`URL`,source_url_invalid:`Voer een geldige URL in (http of https).`,source_author:`Auteur`,source_repository:`Archief`,citation_detail:`Citaat`,confirm_delete_citation:`Deze bron van deze persoon verwijderen?`,event_child_birth:`Geboorte kind %s`,event_child_death:`Overlijden kind %s`,event_partner_birth:`Geboorte partner %s`,event_partner_death:`Overlijden partner %s`,search_to_link:`Zoek een persoon…`,union_status:`Status`,union_notes:`Notities`,known_children:`Bekende kinderen`,status_ongoing:`Lopend`,status_divorced:`Gescheiden`,status_separated:`Uit elkaar`,status_widowed:`Verweduwd`,anniversaries_hint:`Huwelijksjubilea in de komende 60 dagen (beide partners levend).`,anniversary_years:`%s jaar`,no_anniversaries:`Geen komende jubilea.`,add_parents:`Ouders toevoegen`,add_partner:`Partner toevoegen`,add_child:`Kind toevoegen`,view_siblings:`Broers/zussen bekijken`,view_full_profile:`Volledig profiel`,view_tree_action:`Stamboom bekijken`,siblings_of:`Broers/zussen van %s`,half_sibling:`Halfbroer/-zus`,unknown_children:`onbekende kinderen`,more_child:`%s kind`,more_children:`%s kinderen`,not_linked:`Je bent nog niet gekoppeld aan een persoon in de stamboom.`,unlink_me:`Ontkoppelen`,search_person:`Zoek je persoon`,create_my_person:`Mijn persoon aanmaken`,date_qualifier:`Datumprecisie`,date_second:`Tweede datum`,date_hint:`bijv. 26 apr 1941 of 1941`,date_invalid:`Ongeldige datum — controleer het formaat.`,already_added:`al toegevoegd`,qual_exact:`Exact`,qual_about:`Ongeveer`,qual_before:`Voor`,qual_after:`Na`,qual_between:`Tussen`,qual_from_to:`Van … tot`,qual_estimated:`Geschat`,qual_calculated:`Berekend`};function Np(e){return(e||`en`).toLowerCase().startsWith(`nl`)?Mp:{...jp}}function Pp(e,t){return Np(e)[t]??jp[t]??t}var Fp={search:``,filterLiving:`all`,filterSex:``,sort:`surname`,sortDir:`asc`,view:`dashboard`,familyShortcut:``,filterPlace:``,dateFrom:``,dateTo:``,filterUserLinked:``,filtersOpen:!1},Ip=`family_tree.panel.view`,Lp=new Set([`name`,`surname`,`updated`,`birth`,`death`,`sex`,`father`,`mother`,`children`]),Rp=new Set([`dashboard`,`people`,`trash`,`settings`,`person`]);function zp(e){return e?`${Ip}.${e}`:Ip}function Bp(e,t){return typeof e==`string`?e:t}function Vp(e,t){if(!e)return{...Fp};try{let n=e.getItem(zp(t));if(!n)return{...Fp};let r=JSON.parse(n),i=Bp(r.sort,`surname`),a=Bp(r.view,`dashboard`);return{search:Bp(r.search,``),filterLiving:Bp(r.filterLiving,`all`),filterSex:Bp(r.filterSex,``),sort:Lp.has(i)?i:`surname`,sortDir:r.sortDir===`desc`?`desc`:`asc`,view:Rp.has(a)?a:`dashboard`,familyShortcut:Bp(r.familyShortcut,``),filterPlace:Bp(r.filterPlace,``),dateFrom:Bp(r.dateFrom,``),dateTo:Bp(r.dateTo,``),filterUserLinked:Bp(r.filterUserLinked,``),filtersOpen:!!r.filtersOpen}}catch{return{...Fp}}}function Hp(e,t,n){if(e)try{e.setItem(zp(n),JSON.stringify(t))}catch{}}function Up(e,t=``){let n=new Set,r=[];for(let i of[...e,t]){let e=i?.trim();if(!e)continue;let t=e.toLowerCase();n.has(t)||(n.add(t),r.push(e))}return r.sort((e,t)=>e.localeCompare(t,void 0,{sensitivity:`base`})),r}function Wp(e){return e?typeof e.name==`string`&&e.name?e.name:typeof e.display_name==`string`&&e.display_name?e.display_name:[e.given_names,e.surname_prefix,e.surname].map(e=>typeof e==`string`?e.trim():``).filter(Boolean).join(` `)||`Unknown`:`Unknown`}var Gp=`family-tree-panel`,Kp=`(max-width: 720px)`,$=class extends qu{constructor(...e){super(...e),this.narrow=!1,this._view=`dashboard`,this._search=``,this._filterLiving=`all`,this._filterSex=``,this._familyShortcut=``,this._filterPlace=``,this._dateFrom=``,this._dateTo=``,this._filterUserLinked=``,this._filtersOpen=!1,this._reopenParentsAfterSave=!1,this._editingCitationId=null,this._citationForm={},this._parentsPickRole=null,this._people=[],this._total=0,this._stats=null,this._familySummaries=[],this._settings=null,this._detail=null,this._personTab=`details`,this._dialogOpen=!1,this._dialogMode=`person`,this._editing=null,this._form={},this._eventForm={},this._error=``,this._saving=!1,this._loading=!0,this._userLinks=[],this._haUsers=[],this._haUsersLoadError=``,this._linkUserQuery=``,this._linkSelectedUserId=``,this._linkPersonQuery=``,this._linkPersonId=``,this._gazetteer=null,this._gazQuery=``,this._gazHits=[],this._replaceImport=!1,this._anonymizeLivingExport=!1,this._importStatus=``,this._importFile=null,this._importReport=null,this._importPhase=``,this._sort=`surname`,this._sortDir=`asc`,this._lineage=null,this._isMobile=!1,this._rowMenu=null,this._rowMenuAnchor=null,this._collapsed={},this._editingEventId=null,this._relationTarget=null,this._treeUnion=0,this._meQuery=``,this._meCreateOpen=!1,this._meForm={},this._fieldErrors={},this._importFileName=``,this._unionForm={},this._editingUnionId=null,this._pickPersonQuery=``,this._pickPersonRole=null,this._placeSuggestions=[],this._placeSuggestOpen=!1,this._personPlaceField=null,this._siblingsPersonId=``,this._siblingsPersonName=``,this._siblingsList=[],this._siblingsLoading=!1,this._previewDetail=null,this._previewLoading=!1,this._shortcutsDraft=[],this._shortcutInput=``,this._shortcutsSaving=!1,this._personMedia=[],this._photoLightbox=null,this._profileCropTransform=Yu(),this._profileCropHasImage=!1,this._profileCropSourceMediaId=null,this._profileCropImage=null,this._profileCropPendingBlob=null,this._profileCropPendingName=`photo.jpg`,this._profileCropDrag={active:!1,lastX:0,lastY:0},this._unsub=null,this._placeSearchTimer=null,this._mql=null,this._connected=!1,this._viewHydrated=!1,this._charts=[],this._revision=0,this._chartsStatsKey=``,this._pendingDeepLinkPersonId=null,this._onLocationChanged=()=>{let e=this._readPersonDeepLink();e&&(this._pendingDeepLinkPersonId=e,this._consumePersonDeepLink())},this._resetFilters=()=>{this._filterLiving=`all`,this._filterSex=``,this._familyShortcut=``,this._filterPlace=``,this._dateFrom=``,this._dateTo=``,this._filterUserLinked=``,this._persistViewState()},this._clearAllFilters=()=>{this._search=``,this._resetFilters()},this._closeRowMenu=()=>{this._rowMenu=null,this._rowMenuAnchor=null},this._onWindowKeyDown=e=>{e.key===`Escape`&&(this._rowMenu?this._closeRowMenu():this._dialogOpen&&=!1)},this._onWindowClick=()=>{this._rowMenu&&this._closeRowMenu()},this._onWindowScroll=()=>{this._rowMenu&&this._closeRowMenu()},this._onMediaChange=e=>{this._isMobile=e.matches},this._closeDialog=()=>{this._dialogOpen=!1,this._fieldErrors={},this._editingUnionId=null,this._pickPersonRole=null,this._siblingsPersonId=``,this._siblingsPersonName=``,this._siblingsList=[],this._siblingsLoading=!1,this._previewDetail=null,this._previewLoading=!1,this._resetProfileCropState(),this._dialogMode===`userLink`&&this._resetUserLinkForm(),this._dialogMode===`import`&&this._importPhase!==`importing`&&(this._importPhase=``,this._importFile=null,this._importFileName=``,this._importReport=null,this._importStatus=``)}}connectedCallback(){super.connectedCallback(),this._connected=!0,this._restoreViewState(),this._pendingDeepLinkPersonId=this._readPersonDeepLink(),window.addEventListener(`keydown`,this._onWindowKeyDown),window.addEventListener(`click`,this._onWindowClick),window.addEventListener(`scroll`,this._onWindowScroll,!0),window.addEventListener(`resize`,this._onWindowScroll),window.addEventListener(`location-changed`,this._onLocationChanged),typeof window.matchMedia==`function`&&(this._mql=window.matchMedia(Kp),this._isMobile=this._mql.matches,this._mql.addEventListener(`change`,this._onMediaChange)),this._connect()}disconnectedCallback(){super.disconnectedCallback(),this._connected=!1,window.removeEventListener(`keydown`,this._onWindowKeyDown),window.removeEventListener(`click`,this._onWindowClick),window.removeEventListener(`scroll`,this._onWindowScroll,!0),window.removeEventListener(`resize`,this._onWindowScroll),window.removeEventListener(`location-changed`,this._onLocationChanged),this._mql?.removeEventListener(`change`,this._onMediaChange),this._mql=null,this._unsub?.(),this._unsub=null,this._destroyCharts()}updated(e){if(e.has(`hass`)&&this.hass&&!this._unsub&&this._connected&&this._connect(),this._view!==`dashboard`||this._loading)this._chartsStatsKey&&(this._chartsStatsKey=``,this._destroyCharts());else if(this._stats){let e=JSON.stringify(this._stats);e!==this._chartsStatsKey&&this.updateComplete.then(()=>{this._renderCharts()&&(this._chartsStatsKey=e)})}}_tt(e){return Pp(this.hass?.language,e)}_canWrite(){return this.hass?.user?.is_admin===!0}_entryId(){let e=this.panel?.config?.config_entry_id;return typeof e==`string`&&e?e:null}_restoreViewState(){let e=Vp(typeof localStorage<`u`?localStorage:null,this._entryId());this._search=e.search,this._filterLiving=e.filterLiving,this._filterSex=e.filterSex,this._sort=e.sort,this._sortDir=e.sortDir,this._familyShortcut=e.familyShortcut,this._filterPlace=e.filterPlace,this._dateFrom=e.dateFrom,this._dateTo=e.dateTo,this._filterUserLinked=e.filterUserLinked,this._filtersOpen=e.filtersOpen,this._view=e.view===`person`?`people`:e.view,this._viewHydrated=!0}_persistViewState(){this._viewHydrated&&Hp(typeof localStorage<`u`?localStorage:null,{search:this._search,filterLiving:this._filterLiving,filterSex:this._filterSex,sort:this._sort,sortDir:this._sortDir,view:this._view,familyShortcut:this._familyShortcut,filterPlace:this._filterPlace,dateFrom:this._dateFrom,dateTo:this._dateTo,filterUserLinked:this._filterUserLinked,filtersOpen:this._filtersOpen},this._entryId())}_readPersonDeepLink(){try{return(new URLSearchParams(window.location.search||``).get(`person`)||``).trim()||null}catch{return null}}_clearPersonDeepLink(){try{let e=new URL(window.location.href);if(!e.searchParams.has(`person`))return;e.searchParams.delete(`person`);let t=`${e.pathname}${e.search}${e.hash}`;history.replaceState(history.state,``,t)}catch{}}async _consumePersonDeepLink(){let e=this._pendingDeepLinkPersonId;e&&this.hass&&(this._pendingDeepLinkPersonId=null,this._clearPersonDeepLink(),await this._openPerson(e))}async _connect(){if(this.hass&&!this._unsub)try{this._settings=await qf(this.hass),await this._refreshAll(),this._unsub=await Lf(this.hass,e=>{e.revision!==this._revision&&(this._revision=e.revision,this._refreshAll())}),this._error=``,await this._consumePersonDeepLink()}catch(e){this._error=Q(e)}finally{this._loading=!1}}async _refreshAll(){if(this.hass)try{let e=this._canWrite();this._view===`trash`&&!e&&(this._view=`people`);let t=this._view===`trash`&&e,[n,r,i,a,o,s]=await Promise.all([Rf(this.hass,{trashed:t,limit:5e3}),Gf(this.hass),qf(this.hass),lp(this.hass).catch(()=>null),e?sp(this.hass).catch(()=>({links:[]})):Promise.resolve({links:[]}),Kf(this.hass).catch(()=>({families:[]}))]);if(this._people=n.persons,this._total=n.total,this._stats=r,this._settings=i,this._familySummaries=s.families,this._syncShortcutsDraft(),this._lineage=a,this._userLinks=o.links,this._canWrite())try{this._haUsers=await op(this.hass),this._haUsersLoadError=``}catch(e){this._haUsers=[],this._haUsersLoadError=Q(e)}this._detail&&=await zf(this.hass,this._detail.person.id),this._error=``}catch(e){this._error=Q(e)}}get _activeFilterCount(){let e=0;return this._filterLiving!==`all`&&(e+=1),this._filterSex&&(e+=1),this._familyShortcut&&(e+=1),this._filterPlace&&(e+=1),this._dateFrom&&(e+=1),this._dateTo&&(e+=1),this._filterUserLinked&&(e+=1),e}_linkedPersonIds(){let e=new Set;for(let t of this._userLinks){let n=String(t.person_id||``);n&&e.add(n)}return e}_toggleSort(e){this._sort===e?this._sortDir=this._sortDir===`asc`?`desc`:`asc`:(this._sort=e,this._sortDir=`asc`),this._persistViewState()}_setView(e){e===`trash`&&!this._canWrite()&&(e=`people`),this._view=e,this._detail=null,this._persistViewState(),this._refreshAll()}async _openPerson(e,t=`details`){if(this.hass)try{this._detail=await zf(this.hass,e),this._view=`person`,this._personTab=t,await this._loadPersonMedia(),this._persistViewState(),this._scrollMainToTop()}catch(e){this._error=Q(e)}}async _loadPersonMedia(){if(!this.hass||!this._detail)this._personMedia=[];else try{let e=await dp(this.hass,this._detail.person.id);this._personMedia=e.media,this._detail={...this._detail,person:{...this._detail.person,profile_media_id:e.profile_media_id,profile_source_media_id:e.profile_source_media_id??null,profile_crop:e.profile_crop??null}}}catch{this._personMedia=[]}}_openProfilePhotoEditor(e){this._canWrite()&&(this._resetProfileCropState(),this._profileCropSourceMediaId=e?.sourceMediaId??null,this._error=``,this._dialogMode=`profilePhoto`,this._dialogOpen=!0,this._bootstrapProfilePhotoEditor())}async _bootstrapProfilePhotoEditor(){if(!this.hass||!this._detail)return;let e=this._detail.person,t=this._profileCropSourceMediaId||e.profile_source_media_id||e.profile_media_id||null;if(!t)return;this._profileCropSourceMediaId=t;let n=Ed(t,`full`);if(n)try{let r=await this._authHeaders();if(!r.Authorization)return;let i=await fetch(Dd(this.hass,n),{method:`GET`,credentials:`same-origin`,headers:r});if(!i.ok)return;let a=await i.blob();this._profileCropImage=await Qu(a);let o=e.profile_source_media_id===t&&e.profile_crop?e.profile_crop:null;this._profileCropTransform=o?{scale:Number(o.scale)||1,offsetX:Number(o.offsetX)||0,offsetY:Number(o.offsetY)||0}:Yu(),this._profileCropHasImage=!0,await this.updateComplete,this._redrawProfileCropCanvas()}catch{}}_resetProfileCropState(){this._profileCropImage=null,this._profileCropHasImage=!1,this._profileCropTransform=Yu(),this._profileCropSourceMediaId=null,this._profileCropPendingBlob=null,this._profileCropPendingName=`photo.jpg`,this._profileCropDrag={active:!1,lastX:0,lastY:0}}_redrawProfileCropCanvas(){let e=this.renderRoot.querySelector(`#profile-crop-canvas`);e&&this._profileCropImage&&td(e,this._profileCropImage,this._profileCropTransform)}async _onProfilePhotoFileChange(e){let t=e.target,n=t.files?.[0];if(t.value=``,n)try{let e=await nd(n),t=n.name.replace(/\.[^.]+$/,``)||`photo`;this._profileCropPendingBlob=e,this._profileCropPendingName=`${t}.jpg`,this._profileCropSourceMediaId=null,this._profileCropImage=await Qu(e),this._profileCropTransform=Yu(),this._profileCropHasImage=!0,await this.updateComplete,this._redrawProfileCropCanvas()}catch(e){this._error=Q(e)}}async _uploadMediaBlob(e,t,n){if(!this.hass||!this._detail)throw Error(`Not ready`);let r=new FormData;r.append(`file`,e,t);let i=Dd(this.hass,pp(this._detail.person.id,this.hass,n)),a=await fetch(i,{method:`POST`,body:r,credentials:`same-origin`,headers:await this._authHeaders()});if(!a.ok)throw Error(await this._uploadErrorMessage(a,`Upload failed (${a.status})`));let o=(await a.json()).media?.id;if(!o)throw Error(`Upload failed`);return{id:o}}_onProfileCropPointerDown(e){this._profileCropHasImage&&(e.target.setPointerCapture(e.pointerId),this._profileCropDrag={active:!0,lastX:e.clientX,lastY:e.clientY})}_onProfileCropPointerMove(e){if(!this._profileCropDrag.active)return;let t=e.clientX-this._profileCropDrag.lastX,n=e.clientY-this._profileCropDrag.lastY;this._profileCropDrag={active:!0,lastX:e.clientX,lastY:e.clientY},this._profileCropTransform={...this._profileCropTransform,offsetX:this._profileCropTransform.offsetX+t,offsetY:this._profileCropTransform.offsetY+n},this._redrawProfileCropCanvas()}_onProfileCropPointerUp(e){if(this._profileCropDrag.active){this._profileCropDrag={active:!1,lastX:0,lastY:0};try{e.target.releasePointerCapture(e.pointerId)}catch{}}}_onProfileCropZoom(e){let t=Number(e.target.value);this._profileCropTransform={...this._profileCropTransform,scale:t},this._redrawProfileCropCanvas()}async _saveProfilePhoto(){if(this.hass&&this._detail&&this._profileCropImage&&this._canWrite()){this._saving=!0;try{let e=this._profileCropSourceMediaId;if(this._profileCropPendingBlob&&(e=(await this._uploadMediaBlob(this._profileCropPendingBlob,this._profileCropPendingName)).id),!e)throw Error(`Missing source image`);let t=await rd(this._profileCropImage,this._profileCropTransform);await this._uploadMediaBlob(t,`profile.jpg`,{set_profile:`1`,source_media_id:e,crop_json:JSON.stringify(this._profileCropTransform)}),await this._loadPersonMedia(),await this._refreshAll(),this._error=``,this._dialogOpen=!1,this._resetProfileCropState()}catch(e){this._error=Q(e)}finally{this._saving=!1}}}async _uploadPersonPhoto(e){if(!this.hass||!this._detail||!this._canWrite())return;let t=this._detail.person.id;try{let n=await nd(e),r=new FormData,i=e.name.replace(/\.[^.]+$/,``)||`photo`;r.append(`file`,n,`${i}.jpg`);let a=await fetch(Dd(this.hass,pp(t,this.hass)),{method:`POST`,body:r,credentials:`same-origin`,headers:await this._authHeaders()});if(!a.ok)throw Error(await this._uploadErrorMessage(a,`Upload failed (${a.status})`));await this._loadPersonMedia(),await this._refreshAll(),this._error=``}catch(e){this._error=Q(e)}}_setProfilePhoto(e){this._canWrite()&&e&&this._openProfilePhotoEditor({sourceMediaId:e})}async _deletePersonPhoto(e){if(this.hass&&this._canWrite()&&confirm(this._tt(`confirm_delete_photo`)))try{await fp(this.hass,e),await this._loadPersonMedia(),await this._refreshAll(),this._photoLightbox===e&&(this._photoLightbox=null)}catch(e){this._error=Q(e)}}_onPersonPhotoFileChange(e){let t=e.target,n=t.files?.[0];n&&this._uploadPersonPhoto(n),t.value=``}async _openPersonPreview(e){if(this.hass&&e){this._dialogMode=`preview`,this._dialogOpen=!0,this._previewLoading=!0,this._previewDetail=null,this._error=``;try{this._previewDetail=this._detail?.person.id===e?this._detail:await zf(this.hass,e)}catch(e){this._error=Q(e)}finally{this._previewLoading=!1}}}_scrollMainToTop(){requestAnimationFrame(()=>{this.renderRoot.querySelector(`.main`)?.scrollTo?.({top:0,behavior:`instant`}),window.scrollTo({top:0,behavior:`instant`})})}_emptyPersonVitalFields(){return{profession:``,birth_place:``,birth_date_mode:`simple`,birth_date_iso:``,birth_date_qualifier:`exact`,birth_date_first:``,birth_date_second:``,death_place:``,death_date_mode:`simple`,death_date_iso:``,death_date_qualifier:`exact`,death_date_first:``,death_date_second:``,birth_event_id:``,death_event_id:``,occupation_event_id:``}}_personEventsForEdit(e){return this._detail?.person.id===e?this._detail.events:this._previewDetail?.person.id===e?this._previewDetail.events:[]}_vitalEventIds(e){let t=e.find(e=>e.type===`birth`),n=e.find(e=>e.type===`death`),r=e.filter(e=>e.type===`occupation`).sort((e,t)=>(e.sort_date||``).localeCompare(t.sort_date||``)),i=r.length?r[r.length-1]:void 0;return{birth:t?.id,death:n?.id,occupation:i?.id}}_vitalDateFieldsFromText(e,t){let n=Td(t||``),r=Cp(n.first)||``,i=n.qualifier===`exact`&&r!==``;return{[`${e}_date_mode`]:i?`simple`:t.trim()?`advanced`:`simple`,[`${e}_date_iso`]:i?r:``,[`${e}_date_qualifier`]:n.qualifier,[`${e}_date_first`]:i?``:n.first,[`${e}_date_second`]:i?``:n.second}}_vitalFieldsFromPerson(e,t){let n=this._vitalEventIds(t),r=e.birth?.date_text||``,i=e.death?.date_text||``;return{profession:this._professionFromEvents(t),birth_place:e.birth?.place_name||``,...this._vitalDateFieldsFromText(`birth`,r),death_place:e.death?.place_name||``,...this._vitalDateFieldsFromText(`death`,i),birth_event_id:n.birth||``,death_event_id:n.death||``,occupation_event_id:n.occupation||``}}_openCreate(e=!0){e&&(this._relationTarget=null),this._editing=null,this._dialogMode=`person`,this._error=``,this._fieldErrors={},this._form={given_names:``,call_name:``,surname_prefix:``,surname:``,sex:`unknown`,deceased:`false`,notes:``,...this._emptyPersonVitalFields()},this._collapsed={...this._collapsed,[Qd]:!0},this._dialogOpen=!0}_openEdit(e){this._editing=e,this._dialogMode=`person`,this._error=``,this._fieldErrors={};let t=this._personEventsForEdit(e.id);this._form={given_names:e.given_names||``,call_name:e.call_name||``,surname_prefix:e.surname_prefix||``,surname:e.surname||``,sex:e.sex||`unknown`,deceased:e.is_living?`false`:`true`,notes:e.notes||``,...this._vitalFieldsFromPerson(e,t)},this._collapsed={...this._collapsed,[Qd]:e.is_living},this._dialogOpen=!0}_openAddEvent(){this._dialogMode=`event`,this._editingEventId=null,this._eventForm={event_type:`birth`,date_mode:`simple`,date_iso:``,date_qualifier:`exact`,date_first:``,date_second:``,place:``,description:``},this._dialogOpen=!0}_openEditEvent(e){let t=Td(e.date_text),n=Cp(t.first)||``,r=t.qualifier===`exact`&&n!==``;this._dialogMode=`event`,this._editingEventId=e.id,this._eventForm={event_type:e.type,date_mode:r?`simple`:`advanced`,date_iso:r?n:``,date_qualifier:t.qualifier,date_first:t.first,date_second:t.second,place:e.place_name||``,description:e.description||``},this._dialogOpen=!0}_openAddRelation(e){let t=e.kind===`parent`&&this._parentsPickRole?this._parentsPickRole===`mother`?`female`:`male`:null;this._relationTarget=e,this._openCreate(!1),t&&(this._form={...this._form,sex:t})}_openAddParentFromDialog(e){this._detail&&(this._parentsPickRole=e,this._reopenParentsAfterSave=!0,this._dialogOpen=!1,this._openAddRelation({kind:`parent`,personId:this._detail.person.id}))}async _openSiblingsDialog(e,t){if(this.hass&&e){this._siblingsPersonId=e,this._siblingsPersonName=t||this._personNameById(e),this._dialogMode=`siblings`,this._dialogOpen=!0,this._siblingsLoading=!0,this._siblingsList=[],this._error=``;try{if(this._detail?.person.id===e&&this._detail.tree?.siblings?.length)this._siblingsList=this._detail.tree.siblings;else{let t=await Bf(this.hass,e);this._siblingsPersonName=t.person_name||this._siblingsPersonName,this._siblingsList=t.siblings}}catch(e){this._error=Q(e)}finally{this._siblingsLoading=!1}}}_myLinkedPersonId(){return this._lineage?.person_id??null}_lineageRel(e){return this._lineage?.relatives?.[e]??null}_ordinal(e){return(this.hass?.language||`en`).toLowerCase().startsWith(`nl`)?`${e}e`:e%10==1&&e%100!=11?`${e}st`:e%10==2&&e%100!=12?`${e}nd`:e%10==3&&e%100!=13?`${e}rd`:`${e}th`}_personNameById(e){let t=this._people.find(t=>t.id===e);return t?J(t):this._detail?.person.id===e?J(this._detail.person):e}_lineageTooltip(e,t){let n=this._lineageRel(e),r=this._lineage?.person_name;if(!n||!r)return``;let i=[t||this._personNameById(e),this._ordinal(n.generation),n.type===`ancestor`?this._tt(`lineage_ancestor`):this._tt(`lineage_descendant`),r],a=0;return this._tt(`lineage_tooltip`).replace(/%s/g,()=>i[a++]||``)}_lineageIconSpan(){return W`<span class="lineage-marker">${K(Id)}</span>`}_lineageSentence(e,t){return e===this._myLinkedPersonId()?this._tt(`lineage_me`):this._lineageTooltip(e,t)}_lineageBadge(e,t){return e===this._myLinkedPersonId()||this._lineageRel(e)?this._lineageIconSpan():G}_deceasedIcon(e){return e?G:Kd(this._tt(`deceased`),W`<span class="deceased-icon">${K(Hd)}</span>`)}_childrenCountLabel(e){return e===1?`1 ${this._tt(`child`)}`:`${e} ${this._tt(`children`).toLowerCase()}`}_moreChildrenLabel(e){let t=e===1?`more_child`:`more_children`;return this._tt(t).replace(`%s`,String(e))}_renderMoreChildrenCard(e,t){return W`<div class="more-children-card">
      <div class="more-children-label">+ ${this._moreChildrenLabel(e)}</div>
      ${t?W`<button type="button" class="linkish more-children-add" @click=${t}>
            ${K(Nd)} ${this._tt(`add_child`)}
          </button>`:G}
    </div>`}_renderChildExtras(e,t){return e>0?this._renderMoreChildrenCard(e,t):t?W`<button type="button" class="add-slot" @click=${t}>
      ${K(Nd)} ${this._tt(`add_child`)}
    </button>`:G}_fieldLabel(e,t=!1){return W`<span class="field-label"
      >${e}${t?W`<span class="req" aria-hidden="true">*</span>`:G}</span
    >`}_fieldError(e){let t=this._fieldErrors[e];return t?W`<div class="field-error">${t}</div>`:G}_fieldInvalid(e){return!!this._fieldErrors[e]}_onPersonField(e,t){let n=t.target.value;if(this._form={...this._form,[e]:n},this._fieldErrors[e]){let t={...this._fieldErrors};delete t[e],this._fieldErrors=t}}_validatePersonForm(){let e={};return(this._form.given_names||``).trim()||(e.given_names=this._tt(`field_required`)),e}_parentsCell(e){let t=[];return e.father&&t.push(this._personLink(e.father)),e.mother&&(t.length&&t.push(W`<span class="muted"> · </span>`),t.push(this._personLink(e.mother))),t.length?t:W`<span class="muted">—</span>`}_truncatePlaceLabel(e){let t=e.indexOf(`,`);return t>0?e.slice(0,t).trim():e}_schedulePlaceSearch(e,t){t&&(this._personPlaceField=t),this._placeSearchTimer&&clearTimeout(this._placeSearchTimer);let n=e.trim();!n||!this.hass?(this._placeSuggestions=[],this._placeSuggestOpen=!1):this._placeSearchTimer=setTimeout(()=>{$f(this.hass,{search:n,limit:8}).then(e=>{this._placeSuggestions=e.places,this._placeSuggestOpen=e.places.length>0})},250)}_vitalDateTextFromForm(e){if((this._form[`${e}_date_mode`]||`simple`)===`simple`){let t=(this._form[`${e}_date_iso`]||``).trim();if(!t)return{text:``,error:!1};let n=Sp(t);return n?{text:n,error:!1}:{text:``,error:!0}}let t=wd(this._form[`${e}_date_qualifier`]||`exact`,this._form[`${e}_date_first`]||``,this._form[`${e}_date_second`]||``);return t.error?{text:``,error:!0}:{text:t.value,error:!1}}_togglePersonVitalDateMode(e){if((this._form[`${e}_date_mode`]||`simple`)===`simple`){let t=this._form[`${e}_date_iso`]?Sp(this._form[`${e}_date_iso`]):this._form[`${e}_date_first`]||``;this._form={...this._form,[`${e}_date_mode`]:`advanced`,[`${e}_date_qualifier`]:`exact`,[`${e}_date_first`]:t,[`${e}_date_iso`]:``};return}let t=Cp(this._form[`${e}_date_first`]||``)||``;this._form={...this._form,[`${e}_date_mode`]:`simple`,[`${e}_date_iso`]:t,[`${e}_date_qualifier`]:`exact`,[`${e}_date_first`]:``,[`${e}_date_second`]:``}}_renderPersonVitalDateField(e,t,n){let r=(this._form[`${e}_date_mode`]||`simple`)===`advanced`,i=r&&(this._form[`${e}_date_qualifier`]===`between`||this._form[`${e}_date_qualifier`]===`from_to`);return W`<div class="event-date-field">
      ${r?W`<label
            >${this._tt(`date_qualifier`)}
            <select
              ?disabled=${!n}
              @change=${t=>this._form={...this._form,[`${e}_date_qualifier`]:t.target.value}}
            >
              ${ad.map(t=>W`<option value=${t} ?selected=${t===(this._form[`${e}_date_qualifier`]||`exact`)}
                  >${this._tt($d[t])}</option
                >`)}
            </select>
          </label>
          <label
            >${t}
            <input
              .value=${this._form[`${e}_date_first`]||``}
              placeholder=${this._tt(`date_gedcom_hint`)}
              ?disabled=${!n}
              @input=${t=>this._form={...this._form,[`${e}_date_first`]:t.target.value}}
            />
          </label>
          ${i?W`<label
                >${this._tt(`date_second`)}
                <input
                  .value=${this._form[`${e}_date_second`]||``}
                  placeholder=${this._tt(`date_gedcom_hint`)}
                  ?disabled=${!n}
                  @input=${t=>this._form={...this._form,[`${e}_date_second`]:t.target.value}}
                />
              </label>`:G}
          ${n?W`<button
                type="button"
                class="linkish date-mode-toggle"
                @click=${()=>this._togglePersonVitalDateMode(e)}
              >
                ${this._tt(`date_simple`)}
              </button>`:G}`:W`<div class="date-input-row">
            <div class="date-label-grow">
              <span class="field-label">${t}</span>
              <input
                type="date"
                .value=${this._form[`${e}_date_iso`]||``}
                ?disabled=${!n}
                @input=${t=>this._form={...this._form,[`${e}_date_iso`]:t.target.value}}
              />
            </div>
            ${n?W`<button
                  type="button"
                  class="linkish date-mode-toggle"
                  @click=${()=>this._togglePersonVitalDateMode(e)}
                >
                  ${this._tt(`date_advanced`)}
                </button>`:G}
          </div>`}
    </div>`}async _resolvePlaceId(e){if(!this.hass)return null;let t=e.trim();if(!t)return null;let n=(await $f(this.hass,{search:t,limit:20})).places.find(e=>e.name.localeCompare(t,void 0,{sensitivity:`accent`})===0);if(n)return n.id;let{place:r}=await ep(this.hass,{name:t});return r.id}async _resolvePersonEventIds(e){let t={birth:(this._form.birth_event_id||``).trim()||void 0,death:(this._form.death_event_id||``).trim()||void 0,occupation:(this._form.occupation_event_id||``).trim()||void 0};if(!(!t.birth&&((this._form.birth_place||``).trim()||(this._form.birth_date_iso||``).trim()||(this._form.birth_date_first||``).trim())||this._form.deceased===`true`&&!t.death&&((this._form.death_place||``).trim()||(this._form.death_date_iso||``).trim()||(this._form.death_date_first||``).trim())||!t.occupation&&(this._form.profession||``).trim())||!this.hass)return t;let n=await zf(this.hass,e),r=this._vitalEventIds(n.events);return{birth:t.birth||r.birth,death:t.death||r.death,occupation:t.occupation||r.occupation}}async _savePersonVitalEvent(e,t,n){if(!this.hass)return!1;let r=(n.place||``).trim(),i=this._vitalDateTextFromForm(t);if(i.error)return this._error=this._tt(`date_invalid`),!1;if(!i.text&&!r)return!0;let a=r?await this._resolvePlaceId(r):null;return await rp(this.hass,{...n.eventId?{event_id:n.eventId}:{},subject_type:`person`,subject_id:e,event_type:t,date_text:i.text,place:r||void 0,place_id:a,description:``}),!0}async _savePersonVitals(e){let t=await this._resolvePersonEventIds(e);if(!await this._savePersonVitalEvent(e,`birth`,{place:this._form.birth_place||``,eventId:t.birth})||this._form.deceased===`true`&&!await this._savePersonVitalEvent(e,`death`,{place:this._form.death_place||``,eventId:t.death}))return!1;let n=(this._form.profession||``).trim();return n&&this.hass&&await rp(this.hass,{...t.occupation?{event_id:t.occupation}:{},subject_type:`person`,subject_id:e,event_type:`occupation`,date_text:``,description:n}),!0}_renderPersonPlaceField(e,t,n){let r=this._placeSuggestOpen&&this._personPlaceField===e&&this._placeSuggestions.length>0;return W`<label class="place-field"
      >${t}
      <input
        .value=${this._form[e]||``}
        ?disabled=${!n}
        @input=${t=>{let n=t.target.value;this._form={...this._form,[e]:n},this._schedulePlaceSearch(n,e)}}
        @focus=${()=>{this._personPlaceField=e,this._placeSuggestions.length&&(this._placeSuggestOpen=!0)}}
        @blur=${()=>{setTimeout(()=>{this._personPlaceField===e&&(this._placeSuggestOpen=!1)},150)}}
      />
      ${r?W`<ul class="place-suggest">
            ${this._placeSuggestions.map(t=>W`<li>
                <button
                  type="button"
                  @mousedown=${()=>{this._form={...this._form,[e]:t.name},this._placeSuggestOpen=!1}}
                >
                  ${t.name}
                </button>
              </li>`)}
          </ul>`:G}
    </label>`}_sexBadge(e){let t=e===`male`?`sex-male`:e===`female`?`sex-female`:`sex-other`,n=e===`male`?Pd:e===`female`?Fd:Ad,r=`sex_${e}`,i=this._tt(r)===r?e:this._tt(r);return W`<span class="sex-badge ${t}">${K(n)} ${i}</span>`}_sexIconBadge(e){let t=e===`male`?`sex-male`:e===`female`?`sex-female`:`sex-other`,n=e===`male`?Pd:e===`female`?Fd:Ad,r=`sex_${e}`;return Kd(this._tt(r)===r?e:this._tt(r),W`<span class="sex-badge sex-badge--icon-only ${t}">${K(n)}</span>`)}_sortIcon(e){return this._sort===e?K(this._sortDir===`asc`?zd:Rd):G}_sortTh(e,t){return W`<th>
      <button type="button" class="sort-btn" @click=${()=>this._toggleSort(t)}>
        ${e} ${this._sortIcon(t)}
      </button>
    </th>`}_personLink(e,t){if(!e)return W`<span class="muted">—</span>`;let n=t?.preview===!0;return W`<button
      type="button"
      class="linkish"
      @click=${()=>n?void this._openPersonPreview(e.id):void this._openPerson(e.id)}
    >
      ${e.name}
    </button>`}_toggleSection(e){this._collapsed={...this._collapsed,[e]:!this._collapsed[e]}}_sectionOpen(e,t=!0){return e in this._collapsed?!this._collapsed[e]:t}_usedUniqueEventTypes(){if(!this._detail)return new Set;let e=this._editingEventId;return new Set(this._detail.events.filter(e=>Yd.has(e.type)).filter(t=>t.id!==e).map(e=>e.type))}_professionFromEvents(e){let t=e.filter(e=>e.type===`occupation`).sort((e,t)=>(e.sort_date||``).localeCompare(t.sort_date||``));return t.length&&t[t.length-1].description||``}_peopleSearchMatches(e,t={}){let n=e.trim().toLowerCase();if(!n)return[];let r=t.limit??12;return this._people.filter(e=>!e.deleted_at).filter(e=>!t.excludeId||e.id!==t.excludeId).filter(e=>[e.given_names,e.call_name,e.surname_prefix,e.surname,J(e)].join(` `).toLowerCase().includes(n)).slice(0,r)}_mePersonMatches(){return this._peopleSearchMatches(this._meQuery)}_linkedHaUserIds(){return new Set(this._userLinks.map(e=>String(e.ha_user_id||``)).filter(Boolean))}_haUserMatches(){let e=this._linkUserQuery.trim().toLowerCase();if(!e)return[];let t=this._linkedHaUserIds();return this._haUsers.filter(e=>!t.has(e.id)).filter(t=>[t.name,t.id].join(` `).toLowerCase().includes(e)).slice(0,12)}_knownSurnames(){let e=new Set;for(let t of this._people){let n=(t.surname||``).trim();n&&e.add(n)}return[...e].sort((e,t)=>e.localeCompare(t))}_haUserDisplayName(e){let t=this._haUsers.find(t=>t.id===e);if(t?.name?.trim())return t.name.trim();if(this.hass?.user?.id===e){let e=(this.hass.user.name||``).trim();if(e)return e}return``}_renderPersonSearchHits(e,t,n){return e.length?(this.hass?.language,W`<ul class="plain me-hits">
      ${e.map(e=>W`<li>
          <button type="button" class="linkish" @click=${()=>n(e.id)}>
            <strong>${J(e)}</strong>
            <span class="muted">
              ${Ap({birth_date_text:e.birth?.date_text,birth_sort_date:e.birth?.sort_date,death_date_text:e.death?.date_text,death_sort_date:e.death?.sort_date,is_living:e.is_living})}
              ${[e.father?.name,e.mother?.name].filter(Boolean).join(` · `)}
            </span>
          </button>
        </li>`)}
    </ul>`):t.trim()?W`<p class="muted">${this._tt(`no_people`)}</p>`:G}async _savePerson(){if(!this.hass||!this._canWrite())return;let e=this._validatePersonForm();if(this._fieldErrors=e,Object.keys(e).length)return;let t=(this._form.given_names||``).trim();this._saving=!0,this._error=``;try{let e={given_names:t,call_name:this._form.call_name,surname_prefix:this._form.surname_prefix,surname:this._form.surname,sex:this._form.sex,is_living:this._form.deceased!==`true`,notes:this._form.notes};this._editing?.id&&(e.person_id=this._editing.id);let{person:n}=await Vf(this.hass,e);if(!await this._savePersonVitals(n.id)){this._error=this._tt(`date_invalid`);return}let r=this._relationTarget;this._relationTarget=null,this._dialogOpen=!1;let i=null,a=n.id;if(r){if(r.kind===`parent`)await Zf(this.hass,{parent_id:n.id,child_id:r.personId});else if(r.kind===`child`)await Zf(this.hass,{parent_id:r.personId,child_id:n.id,union_id:r.unionId});else if(r.kind===`partner`){let{union:e}=await Yf(this.hass,{partner_ids:[r.personId,n.id]});i=e.id,a=r.personId}}await this._refreshAll(),i?(await this._openPerson(a),this._personTab=`relationships`,await this._openUnionEdit(i)):await this._openPerson(a),this._reopenParentsAfterSave&&r?.kind===`parent`&&(this._reopenParentsAfterSave=!1,this._parentsPickRole=null,this._openParentsDialog())}catch(e){this._error=Q(e)}finally{this._saving=!1}}async _deleteCurrent(){if(!this.hass||!this._detail||!this._canWrite())return;let e=J(this._detail.person);if(confirm(this._tt(`confirm_delete_person`).replace(`%s`,e)))try{await Hf(this.hass,this._detail.person.id),this._detail=null,this._view=`people`,await this._refreshAll()}catch(e){this._error=Q(e)}}async _restore(e){if(this.hass&&this._canWrite())try{await Uf(this.hass,e),await this._refreshAll()}catch(e){this._error=Q(e)}}async _purge(e){if(!this.hass||!this._canWrite())return;let t=this._people.find(t=>t.id===e),n=t?J(t):e;if(confirm(this._tt(`confirm_purge_person`).replace(`%s`,n)))try{await Wf(this.hass,e),await this._refreshAll()}catch(e){this._error=Q(e)}}_toggleEventDateMode(){if((this._eventForm.date_mode||`simple`)===`simple`){let e=this._eventForm.date_iso?Sp(this._eventForm.date_iso):this._eventForm.date_first||``;this._eventForm={...this._eventForm,date_mode:`advanced`,date_qualifier:`exact`,date_first:e,date_iso:``};return}let e=Cp(this._eventForm.date_first||``)||``;this._eventForm={...this._eventForm,date_mode:`simple`,date_iso:e,date_qualifier:`exact`,date_first:``,date_second:``}}async _saveEvent(){if(this.hass&&this._detail&&this._canWrite()){this._saving=!0;try{let e=(this._eventForm.place||``).trim(),t=e?await this._resolvePlaceId(e):null,n=``;if((this._eventForm.date_mode||`simple`)===`simple`)n=Sp(this._eventForm.date_iso||``);else{let e=wd(this._eventForm.date_qualifier||`exact`,this._eventForm.date_first||``,this._eventForm.date_second||``);if(e.error){this._error=this._tt(`date_invalid`);return}n=e.value}await rp(this.hass,{...this._editingEventId?{event_id:this._editingEventId}:{},subject_type:`person`,subject_id:this._detail.person.id,event_type:this._eventForm.event_type||`birth`,date_text:n,place:this._eventForm.place||void 0,description:this._eventForm.description||``,place_id:t}),this._eventForm={},this._editingEventId=null,this._dialogOpen=!1,this._detail=await zf(this.hass,this._detail.person.id)}catch(e){this._error=Q(e)}finally{this._saving=!1}}}async _authHeaders(){return vf(this.hass)}async _uploadErrorMessage(e,t){try{let t=await e.json();if(t.message)return t.message}catch{}return t}async _previewGedcom(e){if(this.hass&&this._canWrite()){this._importFile=e,this._importFileName=e.name,this._importPhase=`preview`,this._importReport=null,this._importStatus=this._tt(`loading`),this._dialogMode=`import`,this._dialogOpen=!0;try{let t=new FormData;t.append(`file`,e);let n=await fetch(`/api/family_tree/import_gedcom?preview=1`,{method:`POST`,body:t,credentials:`same-origin`,headers:await this._authHeaders()});if(!n.ok){let e=await n.text();throw Error(e||`Preview failed (${n.status})`)}let r=await n.json();this._importReport=r.report||{},this._importStatus=``}catch(e){this._importStatus=``,this._importPhase=``,this._dialogOpen=!1,this._error=Q(e)}}}async _confirmImport(){this._importFile&&await this._importGedcom(this._importFile)}async _importGedcom(e){if(this.hass&&this._canWrite()){this._importFileName||=e.name,this._importPhase=`importing`,this._importStatus=this._tt(`importing`),this._dialogMode=`import`,this._dialogOpen=!0;try{let t=new FormData;t.append(`file`,e);let n=`/api/family_tree/import_gedcom?replace=${this._replaceImport?`1`:`0`}`,r=await fetch(n,{method:`POST`,body:t,credentials:`same-origin`,headers:await this._authHeaders()});if(!r.ok){let e=await r.text();throw Error(e||`Import failed (${r.status})`)}let i=await r.json();this._importReport=i.report||{},this._importPhase=`done`,this._importStatus=``,this._importFile=null,await this._refreshAll()}catch(e){this._importStatus=``,this._importPhase=``,this._dialogOpen=!1,this._error=Q(e)}}}_pickGedcomFile(e=`ft-gedcom-file`){this.renderRoot.querySelector(`#${e}`)?.click()}_onGedcomFilePicked(e){let t=e.target.files?.[0];e.target.value=``,t&&this._previewGedcom(t)}_onGedcomFileChange(e){this._onGedcomFilePicked(e)}_renderEmptyCta(){return this._canWrite()?W`<div class="empty-state">
      ${Gd(this.hass,this._tt(`brand`))}
      <p>${this._tt(`empty_cta_hint`)}</p>
      <div class="empty-actions">
        ${q(this._tt(`add_person`),{variant:`filled`,onClick:()=>this._openCreate()})}
        ${q(this._tt(`import_gedcom`),{variant:`outlined`,onClick:()=>this._pickGedcomFile()})}
      </div>
      <input
        id="ft-gedcom-file"
        class="sr-only"
        type="file"
        accept=".ged,text/plain"
        @change=${e=>this._onGedcomFileChange(e)}
      />
    </div>`:W`<div class="empty-state">
        ${Gd(this.hass,this._tt(`brand`))}
        <p>${this._tt(`no_people`)}</p>
      </div>`}async _deleteEvent(e){if(this.hass&&this._canWrite())try{await ap(this.hass,e),this._detail&&=await zf(this.hass,this._detail.person.id)}catch(e){this._error=Q(e)}}_syncShortcutsDraft(){this._shortcutsDraft=[...this._settings?.family_shortcuts||[]]}async _loadSettingsExtras(){if(this.hass)try{if(this._settings=await qf(this.hass),this._syncShortcutsDraft(),this._gazetteer=await hp(this.hass),this._lineage=await lp(this.hass).catch(()=>this._lineage),this._canWrite()){this._userLinks=(await sp(this.hass)).links;try{this._haUsers=await op(this.hass),this._haUsersLoadError=``}catch(e){this._haUsers=[],this._haUsersLoadError=Q(e)}}else this._userLinks=[],this._haUsers=[],this._haUsersLoadError=``}catch(e){this._error=Q(e)}}_resetUserLinkForm(){this._linkUserQuery=``,this._linkPersonQuery=``,this._linkSelectedUserId=``,this._linkPersonId=``}_openUserLinkDialog(){this._resetUserLinkForm(),this._error=``,this._dialogMode=`userLink`,this._dialogOpen=!0}async _saveUserLinkFromForm(){if(this.hass&&this._canWrite()&&this._linkSelectedUserId&&this._linkPersonId)try{await cp(this.hass,this._linkSelectedUserId,this._linkPersonId),this._resetUserLinkForm(),await this._loadSettingsExtras(),this._dialogOpen=!1,this._error=``}catch(e){this._error=Q(e)}}async _addShortcutFromInput(){let e=this._shortcutInput.trim();e&&(this._shortcutsDraft.some(t=>t.toLowerCase()===e.toLowerCase())?this._shortcutInput=``:(this._shortcutsDraft=[...this._shortcutsDraft,e],this._shortcutInput=``,await this._saveShortcutsDraft()))}async _removeShortcut(e){this._shortcutsDraft=this._shortcutsDraft.filter((t,n)=>n!==e),await this._saveShortcutsDraft()}async _saveShortcutsDraft(){if(this.hass&&this._canWrite()){this._shortcutsSaving=!0,this._error=``;try{let{family_shortcuts:e}=await ip(this.hass,this._shortcutsDraft);this._shortcutsDraft=[...e],this._settings&&={...this._settings,family_shortcuts:e},await this._refreshAll()}catch(e){this._error=Q(e)}finally{this._shortcutsSaving=!1}}}async _runGazSearch(){if(this.hass&&this._gazQuery.trim())try{let e=await mp(this.hass,this._gazQuery.trim());this._gazHits=e.results}catch(e){this._error=Q(e)}}async _exportGedcom(){if(this.hass)try{let e=await this._authHeaders();if(!e.Authorization)throw Error(`Not authenticated`);let t=this._anonymizeLivingExport?`?anonymize_living=1`:``,n=await fetch(`/api/family_tree/export_gedcom${t}`,{method:`GET`,credentials:`same-origin`,headers:e});if(!n.ok){let e=await n.text();throw Error(e||`Export failed (${n.status})`)}let r=await n.blob(),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=this._anonymizeLivingExport?`family_tree_private.ged`:`family_tree.ged`,a.click(),URL.revokeObjectURL(i)}catch(e){this._error=Q(e)}}_destroyCharts(){for(let e of this._charts)e.destroy();this._charts=[]}_renderCharts(){if(this._destroyCharts(),!this._stats)return!1;let e=this.renderRoot.querySelectorAll(`.chart-wrap canvas`).length,t=(e,t,n,r)=>{let i=this.renderRoot.querySelector(`#${e}`);if(!i||!n.length)return;let a=getComputedStyle(this),o=a.getPropertyValue(`--primary-text-color`).trim()||`#333`,s=a.getPropertyValue(`--primary-color`).trim()||`#03a9f4`;this._charts.push(new Rl(i,{type:t,data:{labels:n,datasets:[{data:r,backgroundColor:t===`doughnut`?r.map((e,t)=>`hsl(${t*47%360} 55% 55%)`):s,borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:t===`doughnut`,position:`bottom`,labels:{color:o,boxWidth:12,padding:8}}},scales:t===`bar`?{x:{ticks:{color:o},grid:{display:!1}},y:{ticks:{color:o},grid:{color:`rgba(127,127,127,0.2)`},beginAtZero:!0}}:void 0}}))};return t(`ft-ages`,`bar`,this._stats.ages.labels,this._stats.ages.values),t(`ft-centuries`,`bar`,this._stats.centuries.labels,this._stats.centuries.values),t(`ft-places`,`doughnut`,this._stats.places_of_birth.labels.map(e=>this._truncatePlaceLabel(e)),this._stats.places_of_birth.values),e>0&&this._charts.length===e}get _filteredPeople(){return cf(this._people,{search:this._search,filterLiving:this._filterLiving,filterSex:this._filterSex,filterUserLinked:this._filterUserLinked,sort:this._sort,sortDir:this._sortDir,familyShortcut:this._familyShortcut,filterPlace:this._filterPlace,dateFrom:this._dateFrom,dateTo:this._dateTo},this._linkedPersonIds())}_toggleSidebar(){this.dispatchEvent(new CustomEvent(`hass-toggle-menu`,{bubbles:!0,composed:!0}))}render(){return W`
      <div class="shell">
        <header class="top">
          ${this.narrow?W`<button class="icon-btn" @click=${this._toggleSidebar} aria-label=${this._tt(`tab_menu`)}>
                ${K(Od)}
              </button>`:G}
          <div class="brand">${Gd(this.hass,this._tt(`brand`))}</div>
          <nav class="tabs">
            <button class=${this._view===`dashboard`?`active`:``} @click=${()=>this._setView(`dashboard`)}>
              ${this._tt(`nav_dashboard`)}
            </button>
            <button class=${this._view===`people`||this._view===`person`?`active`:``} @click=${()=>this._setView(`people`)}>
              ${this._tt(`nav_people`)}
            </button>
            ${this._canWrite()?W`<button class=${this._view===`trash`?`active`:``} @click=${()=>this._setView(`trash`)}>
                  ${K(Md)} ${this._tt(`nav_trash`)}
                </button>`:G}
            <button class=${this._view===`settings`?`active`:``} @click=${()=>{this._setView(`settings`),this._loadSettingsExtras()}}>
              ${K(jd)} ${this._tt(`nav_settings`)}
            </button>
          </nav>
        </header>

        ${this._canWrite()?G:W`<p class="banner">${this._tt(`read_only`)}</p>`}
        ${this._error?W`<p class="error" role="alert">${this._error}</p>`:G}

        <main class="main">
          ${this._loading?this._renderLoading():this._view===`dashboard`?this._renderDashboard():this._view===`person`&&this._detail?this._renderPerson():this._view===`settings`?this._renderSettings():this._renderPeopleList()}
        </main>
      </div>
      ${this._dialogOpen?this._renderDialog():G}
      ${this._rowMenu?this._renderFixedRowMenu():G}
    `}_renderLoading(){let e=this._view===`settings`?this._renderSettingsSkeleton():this._view===`dashboard`?this._renderDashboardSkeleton():this._renderPeopleSkeleton();return W`
      <div class="loading-panel" role="status" aria-busy="true">
        <span class="sr-only">${this._tt(`loading`)}</span>
        <div class="loading-bar" aria-hidden="true">
          <div class="loading-bar-fill"></div>
        </div>
        <div class="loading-skel" aria-hidden="true">${e}</div>
      </div>
    `}_renderDashboardSkeleton(){return W`
      <section class="stats-row">
        ${[0,1,2].map(()=>W`<div class="stat skel-stat">
            <div class="skel skel-line skel-line--lg"></div>
            <div class="skel skel-line skel-line--sm"></div>
          </div>`)}
      </section>
      <section class="charts">
        ${[0,1].map(()=>W`<div class="chart-card">
            <div class="skel skel-line skel-line--md"></div>
            <div class="skel skel-chart"></div>
          </div>`)}
      </section>
    `}_renderPeopleSkeleton(){return W`
      <div class="toolbar">
        <div class="skel skel-toolbar-search"></div>
        <div class="skel skel-toolbar-btn"></div>
      </div>
      <div class="skel-people">
        ${[0,1,2,3,4,5,6].map(()=>W`<div class="skel-person-row">
            <div class="skel skel-avatar"></div>
            <div class="skel-person-text">
              <div class="skel skel-line skel-line--md"></div>
              <div class="skel skel-line skel-line--sm"></div>
            </div>
          </div>`)}
      </div>
    `}_renderSettingsSkeleton(){return W`
      <div class="skel-settings">
        ${[0,1,2].map(()=>W`<div class="dashboard-panel skel-settings-card">
            <div class="skel skel-line skel-line--md"></div>
            <div class="skel skel-line skel-line--full"></div>
            <div class="skel skel-line skel-line--full"></div>
            <div class="skel skel-line skel-line--sm"></div>
          </div>`)}
      </div>
    `}_familyPresenceSpan(e){let t=e.year_from;if(t==null||Number.isNaN(Number(t)))return``;let n=e.has_living?this._tt(`family_span_now`):e.year_to!=null&&!Number.isNaN(Number(e.year_to))?String(e.year_to):``;return n?`${t} – ${n}`:String(t)}_renderDashboard(){let e=this._stats,t=this._settings?.upcoming_birthdays||[],n=this._settings?.on_this_day||[],r=this._familySummaries.length>0?this._familySummaries:(this._settings?.family_shortcuts||[]).map(e=>({shortcut:e,total:0})),i=(e?.total_persons??0)===0,a=!!e?.ages.labels.length,o=!!e?.centuries.labels.length,s=!!e?.places_of_birth.labels.length,c=a||o||s;return W`
      ${i?this._renderEmptyCta():W`
      <section class="stats-row">
        <div class="stat"><span class="stat-n">${e?.total_persons??`—`}</span><span class="stat-label">${this._tt(`stats_total`)}</span></div>
        <div class="stat"><span class="stat-n">${e?.living??`—`}</span><span class="stat-label">${this._tt(`stats_living`)}</span></div>
        <div class="stat"><span class="stat-n">${e?.deceased??`—`}</span><span class="stat-label">${this._tt(`stats_deceased`)}</span></div>
      </section>
      ${c?W`<section class="charts">
            ${a?W`<div class="chart-card"><h3>${this._tt(`chart_ages`)}</h3><div class="chart-wrap"><canvas id="ft-ages"></canvas></div></div>`:G}
            ${o?W`<div class="chart-card"><h3>${this._tt(`chart_centuries`)}</h3><div class="chart-wrap"><canvas id="ft-centuries"></canvas></div></div>`:G}
            ${s?W`<div class="chart-card"><h3>${this._tt(`chart_places`)}</h3><div class="chart-wrap"><canvas id="ft-places"></canvas></div></div>`:G}
          </section>`:G}
      ${r.length?W`<section class="block">
            <h3>${this._tt(`families`)}</h3>
            <div class="family-stats-row">
              ${r.map(e=>{let t=this._familyPresenceSpan(e),n=e.shortcut;return W`<button
                  type="button"
                  class="family-stat"
                  @click=${()=>{this._familyShortcut=n,this._persistViewState(),this._setView(`people`)}}
                >
                  <span class="family-stat-name">${n}</span>
                  <span class="family-stat-n">${e.total}</span>
                  <span class="family-stat-span muted"
                    >${t||`—`}</span
                  >
                </button>`})}
            </div>
          </section>`:G}
      <section class="dashboard-row">
        <div class="block dashboard-panel">
          <h3>${this._tt(`linked_users`)}</h3>
          ${this._renderLinkedUsersDashboard()}
        </div>
        <div class="block dashboard-panel">
          <h3>${this._tt(`upcoming_birthdays`)}</h3>
          <ul class="plain">
            ${t.length?t.slice(0,8).map(e=>{let t=Tp(Number(e.days_until),this._tt(`days`)),n=[e.age==null?``:this._tt(`turns_age`).replace(`%s`,String(e.age)),t].filter(Boolean).join(` · `);return W`<li>
                    <button class="linkish" @click=${()=>void this._openPersonPreview(String(e.person_id))}>
                      ${e.name}
                    </button>
                    <span class="muted">${n}</span>
                  </li>`}):W`<li class="muted">—</li>`}
          </ul>
        </div>
        <div class="block dashboard-panel">
          <h3>${this._tt(`on_this_day`)}</h3>
          <ul class="plain">
            ${n.length?n.slice(0,8).map(e=>{let t=String(e.kind||``),n=t===`death`?this._tt(`on_this_day_death`):t===`marriage`?this._tt(`on_this_day_marriage`):t===`baptism`?this._tt(`on_this_day_baptism`):t===`partnership`?this._tt(`on_this_day_partnership`):this._tt(`on_this_day_birth`),r=e.names||[],i=r.length>1?r.join(` & `):String(e.name||r[0]||`—`),a=e.years_ago==null?``:this._tt(`on_this_day_years_ago`).replace(`%s`,String(e.years_ago)),o=e.year==null?``:String(e.year),s=e.person_id?String(e.person_id):``,c=Number(e.days_until)===0?``:Tp(Number(e.days_until),this._tt(`days`));return W`<li>
                    ${s?W`<button
                          class="linkish"
                          @click=${()=>void this._openPersonPreview(s)}
                        >
                          ${n}: ${i}
                        </button>`:W`<span>${n}: ${i}</span>`}
                    <span class="muted">
                      ${[o,a,c].filter(Boolean).join(` · `)}
                    </span>
                  </li>`}):W`<li class="muted">—</li>`}
          </ul>
        </div>
      </section>`}
    `}_haAccountLabelsForPerson(e){let t=[];for(let n of this._userLinks){if(String(n.person_id)!==e)continue;let r=this._haUserDisplayName(String(n.ha_user_id));r&&t.push(r)}return t.join(`, `)}_renderLinkedUsersDashboard(){let e=new Set,t=[];for(let n of this._userLinks){let r=String(n.person_id||``);if(!r||e.has(r))continue;e.add(r);let i=this._people.find(e=>e.id===r);i&&t.push(i)}return t.length?W`<div class="card-list people-cards dashboard-linked-cards">
      ${t.map(e=>{let t=this._haAccountLabelsForPerson(e.id);return W`<div class="person-card-wrap">
          ${this._renderPersonCard(e,{preview:!0,subtitle:t||void 0})}
        </div>`})}
    </div>`:W`<p class="muted">—</p>`}_activeFilterChips(){let e=[];if(this._search.trim()&&e.push({label:`${this._tt(`filter_search`)}: ${this._search.trim()}`,clear:()=>{this._search=``,this._persistViewState()}}),this._filterLiving!==`all`&&e.push({label:this._filterLiving===`living`?this._tt(`filter_living`):this._tt(`filter_deceased`),clear:()=>{this._filterLiving=`all`,this._persistViewState()}}),this._filterSex){let t=`sex_${this._filterSex}`;e.push({label:this._tt(t)===t?this._filterSex:this._tt(t),clear:()=>{this._filterSex=``,this._persistViewState()}})}if(this._filterUserLinked&&e.push({label:this._tt(`filter_linked_users`),clear:()=>{this._filterUserLinked=``,this._persistViewState()}}),this._familyShortcut&&e.push({label:`${this._tt(`filter_family`)}: ${this._familyShortcut}`,clear:()=>{this._familyShortcut=``,this._persistViewState()}}),this._filterPlace){let t=sf(this._people).find(e=>e.id===this._filterPlace);e.push({label:`${this._tt(`place`)}: ${t?.label||this._filterPlace}`,clear:()=>{this._filterPlace=``,this._persistViewState()}})}return this._dateFrom&&e.push({label:`${this._tt(`filter_date_from`)}: ${this._dateFrom}`,clear:()=>{this._dateFrom=``,this._persistViewState()}}),this._dateTo&&e.push({label:`${this._tt(`filter_date_to`)}: ${this._dateTo}`,clear:()=>{this._dateTo=``,this._persistViewState()}}),e}_renderPeopleList(){let e=this._filteredPeople,t=Up(this._settings?.family_shortcuts||[],this._familyShortcut),n=sf(this._people),r=this._view!==`trash`,i=this._activeFilterChips(),a=this.hass?.language;return W`
      <div class="toolbar">
        <input
          type="search"
          .value=${this._search}
          placeholder=${this._tt(`search_placeholder`)}
          @input=${e=>{this._search=e.target.value,this._persistViewState()}}
        />
        ${r?W`<div class="toolbar-actions">
              ${q(`${this._tt(`filters`)}${this._activeFilterCount?` (${this._activeFilterCount})`:``}`,{variant:`outlined`,active:this._filtersOpen||this._activeFilterCount>0,onClick:()=>{this._filtersOpen=!this._filtersOpen,this._persistViewState()}})}
              ${this._canWrite()&&this._view!==`trash`?q(this._tt(`add_person`),{variant:`filled`,onClick:()=>this._openCreate()}):G}
            </div>`:this._canWrite()&&this._view!==`trash`?W`<div class="toolbar-actions">
                ${q(this._tt(`add_person`),{variant:`filled`,onClick:()=>this._openCreate()})}
              </div>`:G}
      </div>
      ${r&&this._filtersOpen?W`<div class="filters">
            <select
              aria-label=${this._tt(`filter_all_statuses`)}
              .value=${this._filterLiving}
              @change=${e=>{this._filterLiving=e.target.value,this._persistViewState()}}
            >
              <option value="all">${this._tt(`filter_all_statuses`)}</option>
              <option value="living">${this._tt(`filter_living`)}</option>
              <option value="deceased">${this._tt(`filter_deceased`)}</option>
            </select>
            <select
              aria-label=${this._tt(`sex`)}
              .value=${this._filterSex}
              @change=${e=>{this._filterSex=e.target.value,this._persistViewState()}}
            >
              <option value="">${this._tt(`filter_all_sexes`)}</option>
              <option value="male">${this._tt(`sex_male`)}</option>
              <option value="female">${this._tt(`sex_female`)}</option>
              <option value="intersex">${this._tt(`sex_intersex`)}</option>
              <option value="unknown">${this._tt(`sex_unknown`)}</option>
            </select>
            <select
              aria-label=${this._tt(`linked_users`)}
              .value=${this._filterUserLinked}
              @change=${e=>{this._filterUserLinked=e.target.value,this._persistViewState()}}
            >
              <option value="">${this._tt(`filter_all_people`)}</option>
              <option value="linked">${this._tt(`filter_linked_users`)}</option>
            </select>
            <select
              aria-label=${this._tt(`filter_family`)}
              @change=${e=>{this._familyShortcut=e.target.value,this._persistViewState()}}
            >
              <option value="" ?selected=${this._familyShortcut===``}>
                ${this._tt(`filter_all_families`)}
              </option>
              ${t.map(e=>W`<option value=${e} ?selected=${e===this._familyShortcut}>${e}</option>`)}
            </select>
            <select
              aria-label=${this._tt(`place`)}
              @change=${e=>{this._filterPlace=e.target.value,this._persistViewState()}}
            >
              <option value="" ?selected=${this._filterPlace===``}>
                ${this._tt(`filter_all_places`)}
              </option>
              ${n.map(e=>W`<option value=${e.id} ?selected=${e.id===this._filterPlace}>${e.label}</option>`)}
            </select>
            <label class="date-filter">
              <span class="muted">${this._tt(`filter_date_from`)}</span>
              <input
                type="date"
                .value=${this._dateFrom}
                @change=${e=>{this._dateFrom=e.target.value,this._persistViewState()}}
              />
            </label>
            <label class="date-filter">
              <span class="muted">${this._tt(`filter_date_to`)}</span>
              <input
                type="date"
                .value=${this._dateTo}
                @change=${e=>{this._dateTo=e.target.value,this._persistViewState()}}
              />
            </label>
            ${this._activeFilterCount?W`<button type="button" @click=${this._resetFilters}>
                  ${this._tt(`filter_reset`)}
                </button>`:G}
          </div>`:G}
      ${i.length?W`<div class="filter-chips">
            ${i.map(e=>W`<button type="button" class="chip on" @click=${e.clear}>
                ${e.label} ×
              </button>`)}
            <button type="button" class="chip" @click=${this._clearAllFilters}>
              ${this._tt(`filter_clear_all`)}
            </button>
          </div>`:G}
      <p class="muted">${e.length} / ${this._total}</p>
      ${e.length===0?this._view===`trash`||this._search||this._filterLiving!==`all`||this._filterSex||this._filterUserLinked||i.length?W`<p>${this._tt(`no_people`)}</p>`:this._renderEmptyCta():this._isMobile?W`<div class="card-list people-cards">
              ${e.map(e=>this._renderPeopleCard(e,a))}
            </div>`:W`<div class="table-wrap">
              <table class="people-table">
                <thead>
                  <tr>
                    <th class="avatar-col" aria-label=${this._tt(`photo`)}></th>
                    ${this._sortTh(this._tt(`col_name`),`name`)}
                    ${this._sortTh(this._tt(`col_birth`),`birth`)}
                    ${this._sortTh(this._tt(`col_death`),`death`)}
                    ${this._sortTh(this._tt(`sex`),`sex`)}
                    <th>${this._tt(`col_parents`)}</th>
                    ${this._sortTh(this._tt(`col_children`),`children`)}
                    <th>${this._tt(`col_lineage`)}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${e.map(e=>this._renderPeopleRow(e,a))}
                </tbody>
              </table>
            </div>`}
    `}_renderPeopleCard(e,t){let n=gd(e.birth,t),r=xd(e.birth,e.death,e.is_living,t),i=[e.father?.name,e.mother?.name].filter(Boolean).join(` · `),a=this._view===`trash`,o=J(e);return W`
      <div class="person-card-wrap">
        <button type="button" class="person-card" @click=${()=>this._openPerson(e.id)}>
          <div class="person-card-head person-card-head--with-avatar">
            ${Ef(e,{size:`sm`,hass:this.hass,deceasedOverlay:!0})}
            <div class="person-card-head-text">
              <div class="person-card-title-row">
                <div class="person-card-title-main">
                  <div class="person-card-title person-card-title--clamp">${o}</div>
                  ${this._lineageBadge(e.id,o)}
                </div>
                <span class="person-card-sex">${this._sexIconBadge(e.sex)}</span>
              </div>
            </div>
          </div>
          ${n?W`<div class="person-card-meta">${n}</div>`:G}
          ${r?W`<div class="person-card-meta">${r}</div>`:G}
          ${i?W`<div class="person-card-meta">${i}</div>`:G}
          ${(e.children_count??0)>0?W`<div class="person-card-footer">
                ${this._childrenCountLabel(e.children_count??0)}
              </div>`:G}
        </button>
        ${a&&this._canWrite()?W`<div class="card-actions">
              <button type="button" @click=${()=>this._restore(e.id)}>
                ${this._tt(`restore`)}
              </button>
              <button type="button" class="danger" @click=${()=>this._purge(e.id)}>
                ${this._tt(`purge`)}
              </button>
            </div>`:G}
      </div>
    `}_renderFixedRowMenu(){let e=this._rowMenu,t=this._rowMenuAnchor;if(!e||!t)return G;let n=window.innerWidth-t.right;return W`<div
      class="row-menu row-menu--fixed"
      style=${t.up?`bottom:${window.innerHeight-t.top+4}px;right:${n}px;`:`top:${t.bottom+4}px;right:${n}px;`}
      @click=${e=>e.stopPropagation()}
    >
      <button type="button" @click=${()=>{this._closeRowMenu(),this._openPerson(e)}}>${this._tt(`details`)}</button>
      <button type="button" @click=${()=>{this._closeRowMenu(),this._openPerson(e).then(()=>{this._personTab=`tree`})}}>${this._tt(`tree`)}</button>
      ${this._canWrite()?W`<button type="button" class="danger" @click=${()=>{this._closeRowMenu(),this._deletePersonById(e)}}>${this._tt(`delete`)}</button>`:G}
    </div>`}_renderPeopleRow(e,t){let n=gd(e.birth,t),r=xd(e.birth,e.death,e.is_living,t),i=this._rowMenu===e.id;return W`<tr>
      <td class="avatar-col">
        ${Ef(e,{size:`sm`,hass:this.hass,deceasedOverlay:!0})}
      </td>
      <td>
        <button type="button" class="linkish name-cell" @click=${()=>this._openPerson(e.id)}>
          ${J(e)}
        </button>
      </td>
      <td><span class="date-badge">${n||`—`}</span></td>
      <td><span class="date-badge">${r||`—`}</span></td>
      <td>${this._sexBadge(e.sex)}</td>
      <td>${this._parentsCell(e)}</td>
      <td class="num">${e.children_count??0}</td>
      <td class="center">${this._lineageBadge(e.id)}</td>
      <td class="menu-cell">
        ${this._view===`trash`&&this._canWrite()?W`<span class="row-actions">
              <button @click=${()=>this._restore(e.id)}>${this._tt(`restore`)}</button>
              <button class="danger" @click=${()=>this._purge(e.id)}>${this._tt(`purge`)}</button>
            </span>`:W`<div class="row-menu-wrap">
              <button
                type="button"
                class="icon-btn sm${i?` active`:``}"
                aria-label=${this._tt(`actions`)}
                @click=${t=>{if(t.stopPropagation(),i){this._closeRowMenu();return}let n=t.currentTarget.getBoundingClientRect(),r=this._canWrite()?130:88;this._rowMenuAnchor={top:n.top,bottom:n.bottom,right:n.right,up:n.bottom+r>window.innerHeight},this._rowMenu=e.id}}
              >
                ${K(Ld)}
              </button>
            </div>`}
      </td>
    </tr>`}async _deletePersonById(e){if(!this.hass||!this._canWrite())return;let t=this._people.find(t=>t.id===e),n=t?J(t):e;if(confirm(this._tt(`confirm_delete_person`).replace(`%s`,n)))try{await Hf(this.hass,e),await this._refreshAll()}catch(e){this._error=Q(e)}}_plainEventTypeLabel(e){let t=qd[e];return t?this._tt(t):e}_relatedEventTemplate(e){return e.subject_type!==`related`||!e.relation?null:e.type===`birth`&&e.relation===`child`?`event_child_birth`:e.type===`death`&&e.relation===`child`?`event_child_death`:e.type===`birth`&&e.relation===`partner`?`event_partner_birth`:e.type===`death`&&e.relation===`partner`?`event_partner_death`:null}_eventTypeLabel(e){let t=this._relatedEventTemplate(e);if(t){let n=e.related_person_name||``,r=(this._tt(t).split(`%s`)[0]||this._tt(t)).trimEnd();return n?`${r} — ${n}`:r}return this._plainEventTypeLabel(e.type)}_renderEventPartnerLinks(e){return e.map((e,t)=>t===0?this._personLink(e,{preview:!0}):W` & ${this._personLink(e,{preview:!0})}`)}_renderEventTypeHeading(e){if(new Set([`marriage`,`divorce`,`partnership`]).has(e.type)){let t=this._unionEventPartners(e),n=this._plainEventTypeLabel(e.type);return t.length?W`<span class="event-card-title"
          ><strong>${n}</strong> — ${this._renderEventPartnerLinks(t)}</span
        >`:W`<strong>${n}</strong>`}let t=this._relatedEventTemplate(e);return t&&e.related_person_id?W`<span class="event-card-title"
        ><strong>${(this._tt(t).split(`%s`)[0]||this._tt(t)).trimEnd()}</strong> —
        ${this._personLink({id:e.related_person_id,name:e.related_person_name||e.related_person_id},{preview:!0})}</span
      >`:t?W`<strong>${this._eventTypeLabel(e)}</strong>`:W`<strong>${this._plainEventTypeLabel(e.type)}</strong>`}_formatUnionDate(e,t){let n=(e||``).trim();return n?gd({date_text:n},t)||n:``}_widowedDateText(e,t){if(e.status!==`widowed`)return``;for(let t of e.partners||[]){let e=typeof t.death_date_text==`string`?t.death_date_text.trim():``;if(e)return e}return(t||``).trim()}_unionDurationSuffix(e,t){let n=(e.marriage_date||``).trim();if(!n)return``;let r={date_text:n};if(e.status===`divorced`){let t=(e.divorce_date||``).trim();return t?bd(r,{date_text:t},!1):``}if(e.status===`widowed`){let n=this._widowedDateText(e,t);return n?bd(r,{date_text:n},!1):``}return e.status===`ongoing`||e.status===`separated`?bd(r,null,!0):``}_formatUnionMarriageDisplay(e,t,n){let r=this._formatUnionDate(e.marriage_date,t);if(!r)return``;let i=this._unionDurationSuffix(e,n);return i?`${r} ${i}`:r}_unionMetaSubtitle(e,t,n){if(!e)return``;let r=[],i=this._formatUnionMarriageDisplay(e,t,n);i&&r.push(`${this._tt(`event_marriage`)}: ${i}`),e.marriage_place&&r.push(e.marriage_place);let a=this._formatUnionDate(e.divorce_date,t);if(a&&r.push(`${this._tt(`event_divorce`)}: ${a}`),e.status===`widowed`){let i=this._formatUnionDate(this._widowedDateText(e,n),t);r.push(i?`${this._tt(`status_widowed`)}: ${i}`:this._tt(`status_widowed`))}return r.join(` · `)}_renderPersonCard(e,t={}){let n=String(e.id||``),r=Wp(e),i=typeof e.sex==`string`?e.sex:`unknown`,a=typeof e.formal_name==`string`&&e.formal_name||[e.given_names,e.surname_prefix,e.surname].map(e=>typeof e==`string`?e.trim():``).filter(Boolean).join(` `),o=Ap({birth_date_text:typeof e.birth_date_text==`string`?e.birth_date_text:``,birth_sort_date:typeof e.birth_sort_date==`string`?e.birth_sort_date:null,death_date_text:typeof e.death_date_text==`string`?e.death_date_text:``,death_sort_date:typeof e.death_sort_date==`string`?e.death_sort_date:null,is_living:e.is_living!==!1}),s=typeof e.birth_place==`string`?e.birth_place:``,c=Number(e.sibling_count||0),l=e.is_living!==!1,u=t.preview!==!1,d=()=>{n&&(u?this._openPersonPreview(n):this._openPerson(n))},f=t.compact!==!1;return W`
      <button type="button" class="person-card" @click=${d}>
        <div class="person-card-head person-card-head--with-avatar">
          ${Ef({...e,sex:i,is_living:l,profile_media_id:typeof e.profile_media_id==`string`?e.profile_media_id:null},{size:`sm`,hass:this.hass,deceasedOverlay:f,title:r})}
          <div class="person-card-head-text">
            <div class="person-card-title-row">
              <div class="person-card-title person-card-title--clamp" title=${r}>
                ${f?r:W`${this._deceasedIcon(l)} ${this._sexIconBadge(i)} ${r}`}
              </div>
              ${n?this._lineageBadge(n,r):G}
            </div>
          </div>
        </div>
        ${a&&a!==r?W`<div class="person-card-formal">${a}</div>`:G}
        ${o?W`<div class="person-card-meta">${o}</div>`:G}
        ${s?W`<div class="person-card-meta">${s}</div>`:G}
        ${t.subtitle?W`<div class="person-card-meta">${t.subtitle}</div>`:G}
        ${c>0&&!t.hideSiblings?W`<span
              role="button"
              tabindex="0"
              class="person-card-footer linkish"
              @click=${e=>{e.stopPropagation(),this._openSiblingsDialog(n,r)}}
              @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),e.stopPropagation(),this._openSiblingsDialog(n,r))}}
            >
              +${c} ${this._tt(`siblings_count`)}
            </span>`:t.footer?W`<div class="person-card-footer">${t.footer}</div>`:G}
      </button>
    `}_unionEventPartners(e){if(!e.union_id||!this._detail)return[];let t=this._detail.person.id,n=(this._detail.tree?.partners||[]).find(t=>t.union_id===e.union_id);return n?(n.partners||[]).map(e=>{let t=e;return{id:String(t.id||``),name:Wp(t)}}).filter(e=>e.id&&e.id!==t):[]}_renderEventCard(e,t){let n=this._canWrite()&&e.subject_type===`person`,r=this.hass?.language,i=new Set([`marriage`,`divorce`,`partnership`]),a=i.has(e.type)?this._unionEventPartners(e):[],o=a.map(e=>e.name).join(` & `),s=i.has(e.type)&&a.length>0,c=(e.description||``).trim(),l=c&&(!a.length||c.localeCompare(o,void 0,{sensitivity:`accent`})!==0),u=gd(e,r)||wp(e.date_text),d=t&&e.type!==`birth`&&(e.date_text||e.sort_date)?yd(t,e,!1):null,f=d&&d.years>0?this._tt(d.approx?`years_old_approx`:`years_old`).replace(`%s`,String(d.years)):``;return W`
      <div class="event-timeline-item">
        <div class="event-timeline-date">
          ${u||G}
          ${f?W`<span class="event-timeline-age">${f}</span>`:G}
        </div>
        <div class="event-timeline-spine" aria-hidden="true">
          <span class="event-timeline-dot"></span>
        </div>
        <div class="event-timeline-body">
          <div class="event-timeline-head">
            ${this._renderEventTypeHeading(e)}
            ${n?W`<span class="row-actions">
                  <button class="linkish" @click=${()=>this._openEditEvent(e)}>${this._tt(`edit`)}</button>
                  <button class="linkish danger" @click=${()=>this._deleteEvent(e.id)}>${this._tt(`delete`)}</button>
                </span>`:G}
          </div>
          ${e.place_name?W`<div class="event-timeline-meta">${e.place_name}</div>`:G}
          ${a.length&&!s?W`<div class="event-timeline-meta">
                ${this._renderEventPartnerLinks(a)}
              </div>`:G}
          ${l?W`<div class="event-timeline-desc">${c}</div>`:G}
        </div>
      </div>
    `}_renderCollapsibleSection(e,t,n,r=!0,i=`default`){let a=this._sectionOpen(e,r);return W`<section class="collapse ${i===`cards`?`collapse--cards`:``}">
      <button type="button" class="collapse-head" @click=${()=>this._toggleSection(e)}>
        <span>${t}</span>
        ${K(a?Bd:Vd)}
      </button>
      ${a?W`<div class="collapse-body">${n}</div>`:G}
    </section>`}_pickPersonMatches(){let e=this._pickPersonQuery.trim().toLowerCase();if(!e||!this._detail)return[];let t=this._detail.person.id;return this._people.filter(e=>e.id!==t&&!e.deleted_at).filter(t=>[t.given_names,t.call_name,t.surname_prefix,t.surname,J(t)].join(` `).toLowerCase().includes(e)).slice(0,12)}_openPickPerson(e){this._pickPersonRole=e,this._pickPersonQuery=``,this._dialogMode=`pickPerson`,this._dialogOpen=!0,this._error=``}_renderParentLinkSlot(e){let t=(this._detail?.tree?.parents||[]).find(t=>e===`father`?t.sex===`male`:t.sex===`female`),n=e===`father`?this._tt(`father`):this._tt(`mother`),r=e===`father`?this._tt(`add_father`):this._tt(`add_mother`);return W`<div class="parent-slot-row">
      <div class="parent-slot-head">
        <span class="muted">${n}</span>
        ${t?W`<strong>${Wp(t)}</strong>`:W`<span class="muted">—</span>`}
      </div>
      <div class="row-actions">
        ${t?W`<button type="button" class="linkish" @click=${()=>this._openPickPerson(e)}>
              ${this._tt(`change`)}
            </button>`:W`
              <button type="button" class="linkish" @click=${()=>this._openPickPerson(e)}>
                ${this._tt(`link_existing_person`)}
              </button>
              ${this._canWrite()?W`<button
                    type="button"
                    class="linkish"
                    @click=${()=>this._openAddParentFromDialog(e)}
                  >
                    ${r}
                  </button>`:G}
            `}
      </div>
    </div>`}_openParentsDialog(){this._parentsPickRole=null,this._dialogMode=`parents`,this._dialogOpen=!0,this._error=``}async _openUnionEdit(e){if(this.hass)try{let t=await Jf(this.hass,e),n=t.events.find(e=>e.type===`marriage`);this._editingUnionId=e,this._unionForm={status:t.union.status||`ongoing`,notes:t.union.notes||``,known_children_count:t.union.known_children_count==null?``:String(t.union.known_children_count),marriage_date:n?.date_text||``,marriage_place:n?.place_name||``},this._dialogMode=`union`,this._dialogOpen=!0,this._error=``}catch(e){this._error=Q(e)}}async _linkPickedPerson(e){if(!this.hass||!this._detail||!this._pickPersonRole)return;let t=this._detail.person.id;this._saving=!0;try{this._pickPersonRole===`partner`?await Yf(this.hass,{partner_ids:[t,e]}):(this._pickPersonRole===`father`||this._pickPersonRole===`mother`)&&await Zf(this.hass,{parent_id:e,child_id:t});let n=this._pickPersonRole;this._dialogOpen=!1,this._pickPersonRole=null,this._detail=await zf(this.hass,t),await this._refreshAll(),(n===`father`||n===`mother`)&&this._openParentsDialog()}catch(e){this._error=Q(e)}finally{this._saving=!1}}async _removeParentLink(e){if(this.hass&&this._detail&&confirm(this._tt(`confirm_remove_parent`)))try{await Qf(this.hass,e),this._detail=await zf(this.hass,this._detail.person.id),await this._refreshAll()}catch(e){this._error=Q(e)}}async _deleteUnion(e){if(this.hass&&this._detail&&confirm(this._tt(`confirm_delete_union`)))try{await Xf(this.hass,e),this._detail=await zf(this.hass,this._detail.person.id),await this._refreshAll()}catch(e){this._error=Q(e)}}async _saveUnionForm(){if(!this.hass||!this._detail||!this._editingUnionId)return;let e=this._detail.person.id,t=(this._detail.tree?.partners||[]).find(e=>e.union_id===this._editingUnionId);if(!t)return;let n=[e,...(t.partners||[]).map(e=>String(e.id||``))].filter(Boolean),r=[...new Set(n)];this._saving=!0;try{let t=(this._unionForm.known_children_count||``).trim();await Yf(this.hass,{union_id:this._editingUnionId,partner_ids:r,status:this._unionForm.status||`ongoing`,notes:this._unionForm.notes||``,known_children_count:t?Number(t):null});let n=(this._unionForm.marriage_date||``).trim(),i=(this._unionForm.marriage_place||``).trim(),a;if(i){let e=(await $f(this.hass,{search:i,limit:20})).places.find(e=>e.name.localeCompare(i,void 0,{sensitivity:`accent`})===0);if(e)a=e.id;else{let{place:e}=await ep(this.hass,{name:i});a=e.id}}if(n){let e=wd(`exact`,n);!e.error&&e.value&&await rp(this.hass,{subject_type:`union`,subject_id:this._editingUnionId,event_type:`marriage`,date_text:e.value,place_id:a})}this._dialogOpen=!1,this._editingUnionId=null,this._detail=await zf(this.hass,e),await this._refreshAll()}catch(e){this._error=Q(e)}finally{this._saving=!1}}_renderRelPersonCard(e,t={}){let n=String(e.id||``);return W`<div class="rel-person-wrap">
      ${this._renderPersonCard(e)}
      ${t.onRemove?W`<div class="rel-person-actions">
            <button type="button" class="linkish" @click=${()=>n&&this._openPerson(n)}>
              ${this._tt(`details`)}
            </button>
            <button type="button" class="linkish danger" @click=${t.onRemove}>
              ${this._tt(`delete`)}
            </button>
          </div>`:G}
    </div>`}_renderRelationshipsTab(e){return Nf(this,e)}_renderPersonDetailsTab(e){return Mf(this,e)}_renderPhotosSection(e){return If(this,e)}_sortParents(e){let t={male:0,female:1,unknown:2};return[...e].sort((e,n)=>(t[String(e.sex||`unknown`)]??2)-(t[String(n.sex||`unknown`)]??2))}_allGrandparents(e){if(!e?.grandparents)return[];let t=new Set,n=[];for(let r of e.parents||[])for(let i of e.grandparents[String(r.id)]||[]){let e=i,r=String(e.id||``);r&&!t.has(r)&&(t.add(r),n.push(e))}return n}_renderGenRow(e,t){return W`<div class="gen-row">
      <span class="gen-label muted">${e}</span>
      <div class="gen">${t}</div>
    </div>`}_renderTreeRow(e,t){return W`<div class="gen-row">
      <span class="gen-label muted ${e?``:`gen-label--empty`}">${e??``}</span>
      ${t}
    </div>`}_treeCard(e,t=``,n={}){return e?W`<div class="tree-card-wrap ${t} ${[n.stemDown?`tree-card-wrap--stem-down`:``,n.stemUp?`tree-card-wrap--stem-up`:``].filter(Boolean).join(` `)}">
      ${this._renderPersonCard(e,{hideSiblings:n.hideSiblings})}
    </div>`:W`<div class="tree-card-wrap tree-card-wrap--empty"></div>`}_treeAddParentsSlot(e,t=``){return W`<div class="tree-card-wrap ${t}">
      <button
        type="button"
        class="add-slot"
        @click=${()=>{this._openPerson(e).then(()=>this._openParentsDialog())}}
      >
        ${K(Nd)} ${this._tt(`add_parents`)}
      </button>
    </div>`}_treeCell(e,t,n,r=``){return W`<div class="tree-grid-cell ${r}" style=${e===1&&t===1?``:`grid-column:${e}/span ${t}`}>${n}</div>`}_childrenBusStyle(e){if(e<2)return``;let t=1156,n=e*280+(e-1)*12,r=(t-n)/2,i=r+n;return`--tree-bus-left:${(r+140)/t*100}%;--tree-bus-right:${(t-(i-140))/t*100}%`}_grandparentSlots(e,t){let n=t.find(e=>e.sex===`male`)||t[0],r=t.find(e=>e.sex===`female`&&e!==n)||t.find(e=>e!==n)||null,i=n&&e?.grandparents?.[String(n.id)]||[],a=r&&e?.grandparents?.[String(r.id)]||[],o=this._sortParents(i),s=this._sortParents(a);return[o[0]||null,o[1]||null,s[0]||null,s[1]||null]}_renderTreeTab(e){return Pf(this,e)}_renderPerson(){return jf(this)}_openCitationDialog(e){this._editingCitationId=e?String(e.id):null,this._citationForm={title:String(e?.source_title||``),url:String(e?.source_url||``),author:String(e?.source_author||``),repository:String(e?.source_repository||``),detail:String(e?.detail||``),source_id:String(e?.source_id||``)},this._dialogMode=`citation`,this._dialogOpen=!0,this._error=``}async _saveCitationForm(){if(!this.hass||!this._detail||!this._canWrite())return;let e=(this._citationForm.title||``).trim();if(!e&&!this._citationForm.source_id){this._error=this._tt(`field_required`);return}let t=(this._citationForm.url||``).trim();if(t&&!kf(t))this._error=this._tt(`source_url_invalid`);else{this._saving=!0,this._error=``;try{await tp(this.hass,{citation_id:this._editingCitationId||void 0,source_id:this._citationForm.source_id||void 0,subject_type:`person`,subject_id:this._detail.person.id,title:e,url:this._citationForm.url||``,author:this._citationForm.author||``,repository:this._citationForm.repository||``,detail:this._citationForm.detail||``}),this._dialogOpen=!1,this._editingCitationId=null,this._detail=await zf(this.hass,this._detail.person.id)}catch(e){this._error=Q(e)}finally{this._saving=!1}}}async _deleteCitationById(e){if(this.hass&&this._detail&&this._canWrite()&&confirm(this._tt(`confirm_delete_citation`)))try{await np(this.hass,e),this._detail=await zf(this.hass,this._detail.person.id)}catch(e){this._error=Q(e)}}_renderSourcesTab(e){return Ff(this,e)}async _claimMe(e){if(this.hass)try{await up(this.hass,{person_id:e}),this._lineage=await lp(this.hass),await this._loadSettingsExtras(),this._meQuery=``,this._error=``}catch(e){this._error=Q(e)}}async _createAndClaimMe(){if(!this.hass)return;let e=(this._meForm.given_names||``).trim();if(!e)this._error=this._tt(`field_required`);else try{await up(this.hass,{create:{given_names:e,surname_prefix:this._meForm.surname_prefix||``,surname:this._meForm.surname||``,sex:this._meForm.sex||`unknown`,birth_date_text:this._meForm.birth_date_text||``}}),this._lineage=await lp(this.hass),await this._refreshAll(),this._meCreateOpen=!1,this._meForm={},this._error=``}catch(e){this._error=Q(e)}}_renderUserLinkForm(){return _p(this)}_renderLinkedUsersSettingsBody(e){return vp(this,e)}_renderSettings(){return gp(this)}_renderImportDialogBody(){return Df(this)}_renderDialog(){return Of(this)}static{this.styles=id}};X([hf({attribute:!1})],$.prototype,`hass`,void 0),X([hf({type:Boolean})],$.prototype,`narrow`,void 0),X([hf({attribute:!1})],$.prototype,`panel`,void 0),X([Y()],$.prototype,`_view`,void 0),X([Y()],$.prototype,`_search`,void 0),X([Y()],$.prototype,`_filterLiving`,void 0),X([Y()],$.prototype,`_filterSex`,void 0),X([Y()],$.prototype,`_familyShortcut`,void 0),X([Y()],$.prototype,`_filterPlace`,void 0),X([Y()],$.prototype,`_dateFrom`,void 0),X([Y()],$.prototype,`_dateTo`,void 0),X([Y()],$.prototype,`_filterUserLinked`,void 0),X([Y()],$.prototype,`_filtersOpen`,void 0),X([Y()],$.prototype,`_reopenParentsAfterSave`,void 0),X([Y()],$.prototype,`_editingCitationId`,void 0),X([Y()],$.prototype,`_citationForm`,void 0),X([Y()],$.prototype,`_parentsPickRole`,void 0),X([Y()],$.prototype,`_people`,void 0),X([Y()],$.prototype,`_total`,void 0),X([Y()],$.prototype,`_stats`,void 0),X([Y()],$.prototype,`_familySummaries`,void 0),X([Y()],$.prototype,`_settings`,void 0),X([Y()],$.prototype,`_detail`,void 0),X([Y()],$.prototype,`_personTab`,void 0),X([Y()],$.prototype,`_dialogOpen`,void 0),X([Y()],$.prototype,`_dialogMode`,void 0),X([Y()],$.prototype,`_editing`,void 0),X([Y()],$.prototype,`_form`,void 0),X([Y()],$.prototype,`_eventForm`,void 0),X([Y()],$.prototype,`_error`,void 0),X([Y()],$.prototype,`_saving`,void 0),X([Y()],$.prototype,`_loading`,void 0),X([Y()],$.prototype,`_userLinks`,void 0),X([Y()],$.prototype,`_haUsers`,void 0),X([Y()],$.prototype,`_haUsersLoadError`,void 0),X([Y()],$.prototype,`_linkUserQuery`,void 0),X([Y()],$.prototype,`_linkSelectedUserId`,void 0),X([Y()],$.prototype,`_linkPersonQuery`,void 0),X([Y()],$.prototype,`_linkPersonId`,void 0),X([Y()],$.prototype,`_gazetteer`,void 0),X([Y()],$.prototype,`_gazQuery`,void 0),X([Y()],$.prototype,`_gazHits`,void 0),X([Y()],$.prototype,`_replaceImport`,void 0),X([Y()],$.prototype,`_anonymizeLivingExport`,void 0),X([Y()],$.prototype,`_importStatus`,void 0),X([Y()],$.prototype,`_importFile`,void 0),X([Y()],$.prototype,`_importReport`,void 0),X([Y()],$.prototype,`_importPhase`,void 0),X([Y()],$.prototype,`_sort`,void 0),X([Y()],$.prototype,`_sortDir`,void 0),X([Y()],$.prototype,`_lineage`,void 0),X([Y()],$.prototype,`_isMobile`,void 0),X([Y()],$.prototype,`_rowMenu`,void 0),X([Y()],$.prototype,`_rowMenuAnchor`,void 0),X([Y()],$.prototype,`_collapsed`,void 0),X([Y()],$.prototype,`_editingEventId`,void 0),X([Y()],$.prototype,`_relationTarget`,void 0),X([Y()],$.prototype,`_treeUnion`,void 0),X([Y()],$.prototype,`_meQuery`,void 0),X([Y()],$.prototype,`_meCreateOpen`,void 0),X([Y()],$.prototype,`_meForm`,void 0),X([Y()],$.prototype,`_fieldErrors`,void 0),X([Y()],$.prototype,`_importFileName`,void 0),X([Y()],$.prototype,`_unionForm`,void 0),X([Y()],$.prototype,`_editingUnionId`,void 0),X([Y()],$.prototype,`_pickPersonQuery`,void 0),X([Y()],$.prototype,`_pickPersonRole`,void 0),X([Y()],$.prototype,`_placeSuggestions`,void 0),X([Y()],$.prototype,`_placeSuggestOpen`,void 0),X([Y()],$.prototype,`_personPlaceField`,void 0),X([Y()],$.prototype,`_siblingsPersonId`,void 0),X([Y()],$.prototype,`_siblingsPersonName`,void 0),X([Y()],$.prototype,`_siblingsList`,void 0),X([Y()],$.prototype,`_siblingsLoading`,void 0),X([Y()],$.prototype,`_previewDetail`,void 0),X([Y()],$.prototype,`_previewLoading`,void 0),X([Y()],$.prototype,`_shortcutsDraft`,void 0),X([Y()],$.prototype,`_shortcutInput`,void 0),X([Y()],$.prototype,`_shortcutsSaving`,void 0),X([Y()],$.prototype,`_personMedia`,void 0),X([Y()],$.prototype,`_photoLightbox`,void 0),X([Y()],$.prototype,`_profileCropTransform`,void 0),X([Y()],$.prototype,`_profileCropHasImage`,void 0),X([Y()],$.prototype,`_profileCropSourceMediaId`,void 0),customElements.get(Gp)||customElements.define(Gp,$);
//# sourceMappingURL=family-tree-panel.js.map