/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function je(i){return i+.5|0}const Ct=(i,t,e)=>Math.max(Math.min(i,e),t);function we(i){return Ct(je(i*2.55),0,255)}function Ot(i){return Ct(je(i*255),0,255)}function wt(i){return Ct(je(i/2.55)/100,0,1)}function Hs(i){return Ct(je(i*100),0,100)}const dt={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},ns=[..."0123456789ABCDEF"],ia=i=>ns[i&15],sa=i=>ns[(i&240)>>4]+ns[i&15],Xe=i=>(i&240)>>4===(i&15),na=i=>Xe(i.r)&&Xe(i.g)&&Xe(i.b)&&Xe(i.a);function ra(i){var t=i.length,e;return i[0]==="#"&&(t===4||t===5?e={r:255&dt[i[1]]*17,g:255&dt[i[2]]*17,b:255&dt[i[3]]*17,a:t===5?dt[i[4]]*17:255}:(t===7||t===9)&&(e={r:dt[i[1]]<<4|dt[i[2]],g:dt[i[3]]<<4|dt[i[4]],b:dt[i[5]]<<4|dt[i[6]],a:t===9?dt[i[7]]<<4|dt[i[8]]:255})),e}const oa=(i,t)=>i<255?t(i):"";function aa(i){var t=na(i)?ia:sa;return i?"#"+t(i.r)+t(i.g)+t(i.b)+oa(i.a,t):void 0}const la=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Yr(i,t,e){const s=t*Math.min(e,1-e),n=(r,o=(r+i/30)%12)=>e-s*Math.max(Math.min(o-3,9-o,1),-1);return[n(0),n(8),n(4)]}function ca(i,t,e){const s=(n,r=(n+i/60)%6)=>e-e*t*Math.max(Math.min(r,4-r,1),0);return[s(5),s(3),s(1)]}function ha(i,t,e){const s=Yr(i,1,.5);let n;for(t+e>1&&(n=1/(t+e),t*=n,e*=n),n=0;n<3;n++)s[n]*=1-t-e,s[n]+=t;return s}function da(i,t,e,s,n){return i===n?(t-e)/s+(t<e?6:0):t===n?(e-i)/s+2:(i-t)/s+4}function _s(i){const e=i.r/255,s=i.g/255,n=i.b/255,r=Math.max(e,s,n),o=Math.min(e,s,n),a=(r+o)/2;let l,c,h;return r!==o&&(h=r-o,c=a>.5?h/(2-r-o):h/(r+o),l=da(e,s,n,h,r),l=l*60+.5),[l|0,c||0,a]}function ms(i,t,e,s){return(Array.isArray(t)?i(t[0],t[1],t[2]):i(t,e,s)).map(Ot)}function bs(i,t,e){return ms(Yr,i,t,e)}function ua(i,t,e){return ms(ha,i,t,e)}function fa(i,t,e){return ms(ca,i,t,e)}function Gr(i){return(i%360+360)%360}function pa(i){const t=la.exec(i);let e=255,s;if(!t)return;t[5]!==s&&(e=t[6]?we(+t[5]):Ot(+t[5]));const n=Gr(+t[2]),r=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?s=ua(n,r,o):t[1]==="hsv"?s=fa(n,r,o):s=bs(n,r,o),{r:s[0],g:s[1],b:s[2],a:e}}function ga(i,t){var e=_s(i);e[0]=Gr(e[0]+t),e=bs(e),i.r=e[0],i.g=e[1],i.b=e[2]}function _a(i){if(!i)return;const t=_s(i),e=t[0],s=Hs(t[1]),n=Hs(t[2]);return i.a<255?`hsla(${e}, ${s}%, ${n}%, ${wt(i.a)})`:`hsl(${e}, ${s}%, ${n}%)`}const Ws={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},js={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function ma(){const i={},t=Object.keys(js),e=Object.keys(Ws);let s,n,r,o,a;for(s=0;s<t.length;s++){for(o=a=t[s],n=0;n<e.length;n++)r=e[n],a=a.replace(r,Ws[r]);r=parseInt(js[o],16),i[a]=[r>>16&255,r>>8&255,r&255]}return i}let Ke;function ba(i){Ke||(Ke=ma(),Ke.transparent=[0,0,0,0]);const t=Ke[i.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const xa=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function va(i){const t=xa.exec(i);let e=255,s,n,r;if(t){if(t[7]!==s){const o=+t[7];e=t[8]?we(o):Ct(o*255,0,255)}return s=+t[1],n=+t[3],r=+t[5],s=255&(t[2]?we(s):Ct(s,0,255)),n=255&(t[4]?we(n):Ct(n,0,255)),r=255&(t[6]?we(r):Ct(r,0,255)),{r:s,g:n,b:r,a:e}}}function ya(i){return i&&(i.a<255?`rgba(${i.r}, ${i.g}, ${i.b}, ${wt(i.a)})`:`rgb(${i.r}, ${i.g}, ${i.b})`)}const zi=i=>i<=.0031308?i*12.92:Math.pow(i,1/2.4)*1.055-.055,ee=i=>i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4);function wa(i,t,e){const s=ee(wt(i.r)),n=ee(wt(i.g)),r=ee(wt(i.b));return{r:Ot(zi(s+e*(ee(wt(t.r))-s))),g:Ot(zi(n+e*(ee(wt(t.g))-n))),b:Ot(zi(r+e*(ee(wt(t.b))-r))),a:i.a+e*(t.a-i.a)}}function Ze(i,t,e){if(i){let s=_s(i);s[t]=Math.max(0,Math.min(s[t]+s[t]*e,t===0?360:1)),s=bs(s),i.r=s[0],i.g=s[1],i.b=s[2]}}function Xr(i,t){return i&&Object.assign(t||{},i)}function Us(i){var t={r:0,g:0,b:0,a:255};return Array.isArray(i)?i.length>=3&&(t={r:i[0],g:i[1],b:i[2],a:255},i.length>3&&(t.a=Ot(i[3]))):(t=Xr(i,{r:0,g:0,b:0,a:1}),t.a=Ot(t.a)),t}function ka(i){return i.charAt(0)==="r"?va(i):pa(i)}class Ee{constructor(t){if(t instanceof Ee)return t;const e=typeof t;let s;e==="object"?s=Us(t):e==="string"&&(s=ra(t)||ba(t)||ka(t)),this._rgb=s,this._valid=!!s}get valid(){return this._valid}get rgb(){var t=Xr(this._rgb);return t&&(t.a=wt(t.a)),t}set rgb(t){this._rgb=Us(t)}rgbString(){return this._valid?ya(this._rgb):void 0}hexString(){return this._valid?aa(this._rgb):void 0}hslString(){return this._valid?_a(this._rgb):void 0}mix(t,e){if(t){const s=this.rgb,n=t.rgb;let r;const o=e===r?.5:e,a=2*o-1,l=s.a-n.a,c=((a*l===-1?a:(a+l)/(1+a*l))+1)/2;r=1-c,s.r=255&c*s.r+r*n.r+.5,s.g=255&c*s.g+r*n.g+.5,s.b=255&c*s.b+r*n.b+.5,s.a=o*s.a+(1-o)*n.a,this.rgb=s}return this}interpolate(t,e){return t&&(this._rgb=wa(this._rgb,t._rgb,e)),this}clone(){return new Ee(this.rgb)}alpha(t){return this._rgb.a=Ot(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=je(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Ze(this._rgb,2,t),this}darken(t){return Ze(this._rgb,2,-t),this}saturate(t){return Ze(this._rgb,1,t),this}desaturate(t){return Ze(this._rgb,1,-t),this}rotate(t){return ga(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function bt(){}const $a=(()=>{let i=0;return()=>i++})();function T(i){return i==null}function q(i){if(Array.isArray&&Array.isArray(i))return!0;const t=Object.prototype.toString.call(i);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function R(i){return i!==null&&Object.prototype.toString.call(i)==="[object Object]"}function X(i){return(typeof i=="number"||i instanceof Number)&&isFinite(+i)}function ht(i,t){return X(i)?i:t}function O(i,t){return typeof i>"u"?t:i}const Sa=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100:+i/t,Kr=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100*t:+i;function N(i,t,e){if(i&&typeof i.call=="function")return i.apply(e,t)}function z(i,t,e,s){let n,r,o;if(q(i))for(r=i.length,n=0;n<r;n++)t.call(e,i[n],n);else if(R(i))for(o=Object.keys(i),r=o.length,n=0;n<r;n++)t.call(e,i[o[n]],o[n])}function pi(i,t){let e,s,n,r;if(!i||!t||i.length!==t.length)return!1;for(e=0,s=i.length;e<s;++e)if(n=i[e],r=t[e],n.datasetIndex!==r.datasetIndex||n.index!==r.index)return!1;return!0}function gi(i){if(q(i))return i.map(gi);if(R(i)){const t=Object.create(null),e=Object.keys(i),s=e.length;let n=0;for(;n<s;++n)t[e[n]]=gi(i[e[n]]);return t}return i}function Zr(i){return["__proto__","prototype","constructor"].indexOf(i)===-1}function Ma(i,t,e,s){if(!Zr(i))return;const n=t[i],r=e[i];R(n)&&R(r)?Te(n,r,s):t[i]=gi(r)}function Te(i,t,e){const s=q(t)?t:[t],n=s.length;if(!R(i))return i;e=e||{};const r=e.merger||Ma;let o;for(let a=0;a<n;++a){if(o=s[a],!R(o))continue;const l=Object.keys(o);for(let c=0,h=l.length;c<h;++c)r(l[c],i,o,e)}return i}function Me(i,t){return Te(i,t,{merger:Pa})}function Pa(i,t,e){if(!Zr(i))return;const s=t[i],n=e[i];R(s)&&R(n)?Me(s,n):Object.prototype.hasOwnProperty.call(t,i)||(t[i]=gi(n))}const qs={"":i=>i,x:i=>i.x,y:i=>i.y};function Ca(i){const t=i.split("."),e=[];let s="";for(const n of t)s+=n,s.endsWith("\\")?s=s.slice(0,-1)+".":(e.push(s),s="");return e}function Aa(i){const t=Ca(i);return e=>{for(const s of t){if(s==="")break;e=e&&e[s]}return e}}function Et(i,t){return(qs[t]||(qs[t]=Aa(t)))(i)}function xs(i){return i.charAt(0).toUpperCase()+i.slice(1)}const Fe=i=>typeof i<"u",Tt=i=>typeof i=="function",Ys=(i,t)=>{if(i.size!==t.size)return!1;for(const e of i)if(!t.has(e))return!1;return!0};function Da(i){return i.type==="mouseup"||i.type==="click"||i.type==="contextmenu"}const I=Math.PI,H=2*I,La=H+I,_i=Number.POSITIVE_INFINITY,Oa=I/180,Z=I/2,Bt=I/4,Gs=I*2/3,At=Math.log10,mt=Math.sign;function Pe(i,t,e){return Math.abs(i-t)<e}function Xs(i){const t=Math.round(i);i=Pe(i,t,i/1e3)?t:i;const e=Math.pow(10,Math.floor(At(i))),s=i/e;return(s<=1?1:s<=2?2:s<=5?5:10)*e}function Ea(i){const t=[],e=Math.sqrt(i);let s;for(s=1;s<e;s++)i%s===0&&(t.push(s),t.push(i/s));return e===(e|0)&&t.push(e),t.sort((n,r)=>n-r).pop(),t}function Ta(i){return typeof i=="symbol"||typeof i=="object"&&i!==null&&!(Symbol.toPrimitive in i||"toString"in i||"valueOf"in i)}function le(i){return!Ta(i)&&!isNaN(parseFloat(i))&&isFinite(i)}function Fa(i,t){const e=Math.round(i);return e-t<=i&&e+t>=i}function Jr(i,t,e){let s,n,r;for(s=0,n=i.length;s<n;s++)r=i[s][e],isNaN(r)||(t.min=Math.min(t.min,r),t.max=Math.max(t.max,r))}function ft(i){return i*(I/180)}function vs(i){return i*(180/I)}function Ks(i){if(!X(i))return;let t=1,e=0;for(;Math.round(i*t)/t!==i;)t*=10,e++;return e}function Qr(i,t){const e=t.x-i.x,s=t.y-i.y,n=Math.sqrt(e*e+s*s);let r=Math.atan2(s,e);return r<-.5*I&&(r+=H),{angle:r,distance:n}}function rs(i,t){return Math.sqrt(Math.pow(t.x-i.x,2)+Math.pow(t.y-i.y,2))}function Ra(i,t){return(i-t+La)%H-I}function nt(i){return(i%H+H)%H}function Re(i,t,e,s){const n=nt(i),r=nt(t),o=nt(e),a=nt(r-n),l=nt(o-n),c=nt(n-r),h=nt(n-o);return n===r||n===o||s&&r===o||a>l&&c<h}function tt(i,t,e){return Math.max(t,Math.min(e,i))}function Ia(i){return tt(i,-32768,32767)}function kt(i,t,e,s=1e-6){return i>=Math.min(t,e)-s&&i<=Math.max(t,e)+s}function ys(i,t,e){e=e||(o=>i[o]<t);let s=i.length-1,n=0,r;for(;s-n>1;)r=n+s>>1,e(r)?n=r:s=r;return{lo:n,hi:s}}const $t=(i,t,e,s)=>ys(i,e,s?n=>{const r=i[n][t];return r<e||r===e&&i[n+1][t]===e}:n=>i[n][t]<e),za=(i,t,e)=>ys(i,e,s=>i[s][t]>=e);function Ba(i,t,e){let s=0,n=i.length;for(;s<n&&i[s]<t;)s++;for(;n>s&&i[n-1]>e;)n--;return s>0||n<i.length?i.slice(s,n):i}const to=["push","pop","shift","splice","unshift"];function Na(i,t){if(i._chartjs){i._chartjs.listeners.push(t);return}Object.defineProperty(i,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),to.forEach(e=>{const s="_onData"+xs(e),n=i[e];Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value(...r){const o=n.apply(this,r);return i._chartjs.listeners.forEach(a=>{typeof a[s]=="function"&&a[s](...r)}),o}})})}function Zs(i,t){const e=i._chartjs;if(!e)return;const s=e.listeners,n=s.indexOf(t);n!==-1&&s.splice(n,1),!(s.length>0)&&(to.forEach(r=>{delete i[r]}),delete i._chartjs)}function eo(i){const t=new Set(i);return t.size===i.length?i:Array.from(t)}const io=(function(){return typeof window>"u"?function(i){return i()}:window.requestAnimationFrame})();function so(i,t){let e=[],s=!1;return function(...n){e=n,s||(s=!0,io.call(window,()=>{s=!1,i.apply(t,e)}))}}function Va(i,t){let e;return function(...s){return t?(clearTimeout(e),e=setTimeout(i,t,s)):i.apply(this,s),t}}const ws=i=>i==="start"?"left":i==="end"?"right":"center",st=(i,t,e)=>i==="start"?t:i==="end"?e:(t+e)/2,Ha=(i,t,e,s)=>i===(s?"left":"right")?e:i==="center"?(t+e)/2:t;function no(i,t,e){const s=t.length;let n=0,r=s;if(i._sorted){const{iScale:o,vScale:a,_parsed:l}=i,c=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null,h=o.axis,{min:d,max:u,minDefined:f,maxDefined:p}=o.getUserBounds();if(f){if(n=Math.min($t(l,h,d).lo,e?s:$t(t,h,o.getPixelForValue(d)).lo),c){const g=l.slice(0,n+1).reverse().findIndex(m=>!T(m[a.axis]));n-=Math.max(0,g)}n=tt(n,0,s-1)}if(p){let g=Math.max($t(l,o.axis,u,!0).hi+1,e?0:$t(t,h,o.getPixelForValue(u),!0).hi+1);if(c){const m=l.slice(g-1).findIndex(_=>!T(_[a.axis]));g+=Math.max(0,m)}r=tt(g,n,s)-n}else r=s-n}return{start:n,count:r}}function ro(i){const{xScale:t,yScale:e,_scaleRanges:s}=i,n={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!s)return i._scaleRanges=n,!0;const r=s.xmin!==t.min||s.xmax!==t.max||s.ymin!==e.min||s.ymax!==e.max;return Object.assign(s,n),r}const Je=i=>i===0||i===1,Js=(i,t,e)=>-(Math.pow(2,10*(i-=1))*Math.sin((i-t)*H/e)),Qs=(i,t,e)=>Math.pow(2,-10*i)*Math.sin((i-t)*H/e)+1,Ce={linear:i=>i,easeInQuad:i=>i*i,easeOutQuad:i=>-i*(i-2),easeInOutQuad:i=>(i/=.5)<1?.5*i*i:-.5*(--i*(i-2)-1),easeInCubic:i=>i*i*i,easeOutCubic:i=>(i-=1)*i*i+1,easeInOutCubic:i=>(i/=.5)<1?.5*i*i*i:.5*((i-=2)*i*i+2),easeInQuart:i=>i*i*i*i,easeOutQuart:i=>-((i-=1)*i*i*i-1),easeInOutQuart:i=>(i/=.5)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2),easeInQuint:i=>i*i*i*i*i,easeOutQuint:i=>(i-=1)*i*i*i*i+1,easeInOutQuint:i=>(i/=.5)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2),easeInSine:i=>-Math.cos(i*Z)+1,easeOutSine:i=>Math.sin(i*Z),easeInOutSine:i=>-.5*(Math.cos(I*i)-1),easeInExpo:i=>i===0?0:Math.pow(2,10*(i-1)),easeOutExpo:i=>i===1?1:-Math.pow(2,-10*i)+1,easeInOutExpo:i=>Je(i)?i:i<.5?.5*Math.pow(2,10*(i*2-1)):.5*(-Math.pow(2,-10*(i*2-1))+2),easeInCirc:i=>i>=1?i:-(Math.sqrt(1-i*i)-1),easeOutCirc:i=>Math.sqrt(1-(i-=1)*i),easeInOutCirc:i=>(i/=.5)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1),easeInElastic:i=>Je(i)?i:Js(i,.075,.3),easeOutElastic:i=>Je(i)?i:Qs(i,.075,.3),easeInOutElastic(i){return Je(i)?i:i<.5?.5*Js(i*2,.1125,.45):.5+.5*Qs(i*2-1,.1125,.45)},easeInBack(i){return i*i*((1.70158+1)*i-1.70158)},easeOutBack(i){return(i-=1)*i*((1.70158+1)*i+1.70158)+1},easeInOutBack(i){let t=1.70158;return(i/=.5)<1?.5*(i*i*(((t*=1.525)+1)*i-t)):.5*((i-=2)*i*(((t*=1.525)+1)*i+t)+2)},easeInBounce:i=>1-Ce.easeOutBounce(1-i),easeOutBounce(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},easeInOutBounce:i=>i<.5?Ce.easeInBounce(i*2)*.5:Ce.easeOutBounce(i*2-1)*.5+.5};function ks(i){if(i&&typeof i=="object"){const t=i.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function tn(i){return ks(i)?i:new Ee(i)}function Bi(i){return ks(i)?i:new Ee(i).saturate(.5).darken(.1).hexString()}const Wa=["x","y","borderWidth","radius","tension"],ja=["color","borderColor","backgroundColor"];function Ua(i){i.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),i.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),i.set("animations",{colors:{type:"color",properties:ja},numbers:{type:"number",properties:Wa}}),i.describe("animations",{_fallback:"animation"}),i.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function qa(i){i.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const en=new Map;function Ya(i,t){t=t||{};const e=i+JSON.stringify(t);let s=en.get(e);return s||(s=new Intl.NumberFormat(i,t),en.set(e,s)),s}function Ue(i,t,e){return Ya(t,e).format(i)}const oo={values(i){return q(i)?i:""+i},numeric(i,t,e){if(i===0)return"0";const s=this.chart.options.locale;let n,r=i;if(e.length>1){const c=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(c<1e-4||c>1e15)&&(n="scientific"),r=Ga(i,e)}const o=At(Math.abs(r)),a=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),l={notation:n,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),Ue(i,s,l)},logarithmic(i,t,e){if(i===0)return"0";const s=e[t].significand||i/Math.pow(10,Math.floor(At(i)));return[1,2,3,5,10,15].includes(s)||t>.8*e.length?oo.numeric.call(this,i,t,e):""}};function Ga(i,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&i!==Math.floor(i)&&(e=i-Math.floor(i)),e}var Si={formatters:oo};function Xa(i){i.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Si.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),i.route("scale.ticks","color","","color"),i.route("scale.grid","color","","borderColor"),i.route("scale.border","color","","borderColor"),i.route("scale.title","color","","color"),i.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),i.describe("scales",{_fallback:"scale"}),i.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Xt=Object.create(null),os=Object.create(null);function Ae(i,t){if(!t)return i;const e=t.split(".");for(let s=0,n=e.length;s<n;++s){const r=e[s];i=i[r]||(i[r]=Object.create(null))}return i}function Ni(i,t,e){return typeof t=="string"?Te(Ae(i,t),e):Te(Ae(i,""),t)}class Ka{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=s=>s.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(s,n)=>Bi(n.backgroundColor),this.hoverBorderColor=(s,n)=>Bi(n.borderColor),this.hoverColor=(s,n)=>Bi(n.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Ni(this,t,e)}get(t){return Ae(this,t)}describe(t,e){return Ni(os,t,e)}override(t,e){return Ni(Xt,t,e)}route(t,e,s,n){const r=Ae(this,t),o=Ae(this,s),a="_"+e;Object.defineProperties(r,{[a]:{value:r[e],writable:!0},[e]:{enumerable:!0,get(){const l=this[a],c=o[n];return R(l)?Object.assign({},c,l):O(l,c)},set(l){this[a]=l}}})}apply(t){t.forEach(e=>e(this))}}var Y=new Ka({_scriptable:i=>!i.startsWith("on"),_indexable:i=>i!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[Ua,qa,Xa]);function Za(i){return!i||T(i.size)||T(i.family)?null:(i.style?i.style+" ":"")+(i.weight?i.weight+" ":"")+i.size+"px "+i.family}function mi(i,t,e,s,n){let r=t[n];return r||(r=t[n]=i.measureText(n).width,e.push(n)),r>s&&(s=r),s}function Ja(i,t,e,s){s=s||{};let n=s.data=s.data||{},r=s.garbageCollect=s.garbageCollect||[];s.font!==t&&(n=s.data={},r=s.garbageCollect=[],s.font=t),i.save(),i.font=t;let o=0;const a=e.length;let l,c,h,d,u;for(l=0;l<a;l++)if(d=e[l],d!=null&&!q(d))o=mi(i,n,r,o,d);else if(q(d))for(c=0,h=d.length;c<h;c++)u=d[c],u!=null&&!q(u)&&(o=mi(i,n,r,o,u));i.restore();const f=r.length/2;if(f>e.length){for(l=0;l<f;l++)delete n[r[l]];r.splice(0,f)}return o}function Nt(i,t,e){const s=i.currentDevicePixelRatio,n=e!==0?Math.max(e/2,.5):0;return Math.round((t-n)*s)/s+n}function sn(i,t){!t&&!i||(t=t||i.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,i.width,i.height),t.restore())}function as(i,t,e,s){ao(i,t,e,s,null)}function ao(i,t,e,s,n){let r,o,a,l,c,h,d,u;const f=t.pointStyle,p=t.rotation,g=t.radius;let m=(p||0)*Oa;if(f&&typeof f=="object"&&(r=f.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){i.save(),i.translate(e,s),i.rotate(m),i.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),i.restore();return}if(!(isNaN(g)||g<=0)){switch(i.beginPath(),f){default:n?i.ellipse(e,s,n/2,g,0,0,H):i.arc(e,s,g,0,H),i.closePath();break;case"triangle":h=n?n/2:g,i.moveTo(e+Math.sin(m)*h,s-Math.cos(m)*g),m+=Gs,i.lineTo(e+Math.sin(m)*h,s-Math.cos(m)*g),m+=Gs,i.lineTo(e+Math.sin(m)*h,s-Math.cos(m)*g),i.closePath();break;case"rectRounded":c=g*.516,l=g-c,o=Math.cos(m+Bt)*l,d=Math.cos(m+Bt)*(n?n/2-c:l),a=Math.sin(m+Bt)*l,u=Math.sin(m+Bt)*(n?n/2-c:l),i.arc(e-d,s-a,c,m-I,m-Z),i.arc(e+u,s-o,c,m-Z,m),i.arc(e+d,s+a,c,m,m+Z),i.arc(e-u,s+o,c,m+Z,m+I),i.closePath();break;case"rect":if(!p){l=Math.SQRT1_2*g,h=n?n/2:l,i.rect(e-h,s-l,2*h,2*l);break}m+=Bt;case"rectRot":d=Math.cos(m)*(n?n/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,u=Math.sin(m)*(n?n/2:g),i.moveTo(e-d,s-a),i.lineTo(e+u,s-o),i.lineTo(e+d,s+a),i.lineTo(e-u,s+o),i.closePath();break;case"crossRot":m+=Bt;case"cross":d=Math.cos(m)*(n?n/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,u=Math.sin(m)*(n?n/2:g),i.moveTo(e-d,s-a),i.lineTo(e+d,s+a),i.moveTo(e+u,s-o),i.lineTo(e-u,s+o);break;case"star":d=Math.cos(m)*(n?n/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,u=Math.sin(m)*(n?n/2:g),i.moveTo(e-d,s-a),i.lineTo(e+d,s+a),i.moveTo(e+u,s-o),i.lineTo(e-u,s+o),m+=Bt,d=Math.cos(m)*(n?n/2:g),o=Math.cos(m)*g,a=Math.sin(m)*g,u=Math.sin(m)*(n?n/2:g),i.moveTo(e-d,s-a),i.lineTo(e+d,s+a),i.moveTo(e+u,s-o),i.lineTo(e-u,s+o);break;case"line":o=n?n/2:Math.cos(m)*g,a=Math.sin(m)*g,i.moveTo(e-o,s-a),i.lineTo(e+o,s+a);break;case"dash":i.moveTo(e,s),i.lineTo(e+Math.cos(m)*(n?n/2:g),s+Math.sin(m)*g);break;case!1:i.closePath();break}i.fill(),t.borderWidth>0&&i.stroke()}}function St(i,t,e){return e=e||.5,!t||i&&i.x>t.left-e&&i.x<t.right+e&&i.y>t.top-e&&i.y<t.bottom+e}function Mi(i,t){i.save(),i.beginPath(),i.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),i.clip()}function Pi(i){i.restore()}function Qa(i,t,e,s,n){if(!t)return i.lineTo(e.x,e.y);if(n==="middle"){const r=(t.x+e.x)/2;i.lineTo(r,t.y),i.lineTo(r,e.y)}else n==="after"!=!!s?i.lineTo(t.x,e.y):i.lineTo(e.x,t.y);i.lineTo(e.x,e.y)}function tl(i,t,e,s){if(!t)return i.lineTo(e.x,e.y);i.bezierCurveTo(s?t.cp1x:t.cp2x,s?t.cp1y:t.cp2y,s?e.cp2x:e.cp1x,s?e.cp2y:e.cp1y,e.x,e.y)}function el(i,t){t.translation&&i.translate(t.translation[0],t.translation[1]),T(t.rotation)||i.rotate(t.rotation),t.color&&(i.fillStyle=t.color),t.textAlign&&(i.textAlign=t.textAlign),t.textBaseline&&(i.textBaseline=t.textBaseline)}function il(i,t,e,s,n){if(n.strikethrough||n.underline){const r=i.measureText(s),o=t-r.actualBoundingBoxLeft,a=t+r.actualBoundingBoxRight,l=e-r.actualBoundingBoxAscent,c=e+r.actualBoundingBoxDescent,h=n.strikethrough?(l+c)/2:c;i.strokeStyle=i.fillStyle,i.beginPath(),i.lineWidth=n.decorationWidth||2,i.moveTo(o,h),i.lineTo(a,h),i.stroke()}}function sl(i,t){const e=i.fillStyle;i.fillStyle=t.color,i.fillRect(t.left,t.top,t.width,t.height),i.fillStyle=e}function Kt(i,t,e,s,n,r={}){const o=q(t)?t:[t],a=r.strokeWidth>0&&r.strokeColor!=="";let l,c;for(i.save(),i.font=n.string,el(i,r),l=0;l<o.length;++l)c=o[l],r.backdrop&&sl(i,r.backdrop),a&&(r.strokeColor&&(i.strokeStyle=r.strokeColor),T(r.strokeWidth)||(i.lineWidth=r.strokeWidth),i.strokeText(c,e,s,r.maxWidth)),i.fillText(c,e,s,r.maxWidth),il(i,e,s,c,r),s+=Number(n.lineHeight);i.restore()}function Ie(i,t){const{x:e,y:s,w:n,h:r,radius:o}=t;i.arc(e+o.topLeft,s+o.topLeft,o.topLeft,1.5*I,I,!0),i.lineTo(e,s+r-o.bottomLeft),i.arc(e+o.bottomLeft,s+r-o.bottomLeft,o.bottomLeft,I,Z,!0),i.lineTo(e+n-o.bottomRight,s+r),i.arc(e+n-o.bottomRight,s+r-o.bottomRight,o.bottomRight,Z,0,!0),i.lineTo(e+n,s+o.topRight),i.arc(e+n-o.topRight,s+o.topRight,o.topRight,0,-Z,!0),i.lineTo(e+o.topLeft,s)}const nl=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,rl=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function ol(i,t){const e=(""+i).match(nl);if(!e||e[1]==="normal")return t*1.2;switch(i=+e[2],e[3]){case"px":return i;case"%":i/=100;break}return t*i}const al=i=>+i||0;function $s(i,t){const e={},s=R(t),n=s?Object.keys(t):t,r=R(i)?s?o=>O(i[o],i[t[o]]):o=>i[o]:()=>i;for(const o of n)e[o]=al(r(o));return e}function lo(i){return $s(i,{top:"y",right:"x",bottom:"y",left:"x"})}function Yt(i){return $s(i,["topLeft","topRight","bottomLeft","bottomRight"])}function ot(i){const t=lo(i);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Q(i,t){i=i||{},t=t||Y.font;let e=O(i.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let s=O(i.style,t.style);s&&!(""+s).match(rl)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const n={family:O(i.family,t.family),lineHeight:ol(O(i.lineHeight,t.lineHeight),e),size:e,style:s,weight:O(i.weight,t.weight),string:""};return n.string=Za(n),n}function ke(i,t,e,s){let n,r,o;for(n=0,r=i.length;n<r;++n)if(o=i[n],o!==void 0&&o!==void 0)return o}function ll(i,t,e){const{min:s,max:n}=i,r=Kr(t,(n-s)/2),o=(a,l)=>e&&a===0?0:a+l;return{min:o(s,-Math.abs(r)),max:o(n,r)}}function Ft(i,t){return Object.assign(Object.create(i),t)}function Ss(i,t=[""],e,s,n=()=>i[0]){const r=e||i;typeof s>"u"&&(s=fo("_fallback",i));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:i,_rootScopes:r,_fallback:s,_getTarget:n,override:a=>Ss([a,...i],t,r,s)};return new Proxy(o,{deleteProperty(a,l){return delete a[l],delete a._keys,delete i[0][l],!0},get(a,l){return ho(a,l,()=>_l(l,t,i,a))},getOwnPropertyDescriptor(a,l){return Reflect.getOwnPropertyDescriptor(a._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(i[0])},has(a,l){return rn(a).includes(l)},ownKeys(a){return rn(a)},set(a,l,c){const h=a._storage||(a._storage=n());return a[l]=h[l]=c,delete a._keys,!0}})}function ce(i,t,e,s){const n={_cacheable:!1,_proxy:i,_context:t,_subProxy:e,_stack:new Set,_descriptors:co(i,s),setContext:r=>ce(i,r,e,s),override:r=>ce(i.override(r),t,e,s)};return new Proxy(n,{deleteProperty(r,o){return delete r[o],delete i[o],!0},get(r,o,a){return ho(r,o,()=>hl(r,o,a))},getOwnPropertyDescriptor(r,o){return r._descriptors.allKeys?Reflect.has(i,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(i,o)},getPrototypeOf(){return Reflect.getPrototypeOf(i)},has(r,o){return Reflect.has(i,o)},ownKeys(){return Reflect.ownKeys(i)},set(r,o,a){return i[o]=a,delete r[o],!0}})}function co(i,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:s=t.indexable,_allKeys:n=t.allKeys}=i;return{allKeys:n,scriptable:e,indexable:s,isScriptable:Tt(e)?e:()=>e,isIndexable:Tt(s)?s:()=>s}}const cl=(i,t)=>i?i+xs(t):t,Ms=(i,t)=>R(t)&&i!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function ho(i,t,e){if(Object.prototype.hasOwnProperty.call(i,t)||t==="constructor")return i[t];const s=e();return i[t]=s,s}function hl(i,t,e){const{_proxy:s,_context:n,_subProxy:r,_descriptors:o}=i;let a=s[t];return Tt(a)&&o.isScriptable(t)&&(a=dl(t,a,i,e)),q(a)&&a.length&&(a=ul(t,a,i,o.isIndexable)),Ms(t,a)&&(a=ce(a,n,r&&r[t],o)),a}function dl(i,t,e,s){const{_proxy:n,_context:r,_subProxy:o,_stack:a}=e;if(a.has(i))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+i);a.add(i);let l=t(r,o||s);return a.delete(i),Ms(i,l)&&(l=Ps(n._scopes,n,i,l)),l}function ul(i,t,e,s){const{_proxy:n,_context:r,_subProxy:o,_descriptors:a}=e;if(typeof r.index<"u"&&s(i))return t[r.index%t.length];if(R(t[0])){const l=t,c=n._scopes.filter(h=>h!==l);t=[];for(const h of l){const d=Ps(c,n,i,h);t.push(ce(d,r,o&&o[i],a))}}return t}function uo(i,t,e){return Tt(i)?i(t,e):i}const fl=(i,t)=>i===!0?t:typeof i=="string"?Et(t,i):void 0;function pl(i,t,e,s,n){for(const r of t){const o=fl(e,r);if(o){i.add(o);const a=uo(o._fallback,e,n);if(typeof a<"u"&&a!==e&&a!==s)return a}else if(o===!1&&typeof s<"u"&&e!==s)return null}return!1}function Ps(i,t,e,s){const n=t._rootScopes,r=uo(t._fallback,e,s),o=[...i,...n],a=new Set;a.add(s);let l=nn(a,o,e,r||e,s);return l===null||typeof r<"u"&&r!==e&&(l=nn(a,o,r,l,s),l===null)?!1:Ss(Array.from(a),[""],n,r,()=>gl(t,e,s))}function nn(i,t,e,s,n){for(;e;)e=pl(i,t,e,s,n);return e}function gl(i,t,e){const s=i._getTarget();t in s||(s[t]={});const n=s[t];return q(n)&&R(e)?e:n||{}}function _l(i,t,e,s){let n;for(const r of t)if(n=fo(cl(r,i),e),typeof n<"u")return Ms(i,n)?Ps(e,s,i,n):n}function fo(i,t){for(const e of t){if(!e)continue;const s=e[i];if(typeof s<"u")return s}}function rn(i){let t=i._keys;return t||(t=i._keys=ml(i._scopes)),t}function ml(i){const t=new Set;for(const e of i)for(const s of Object.keys(e).filter(n=>!n.startsWith("_")))t.add(s);return Array.from(t)}function po(i,t,e,s){const{iScale:n}=i,{key:r="r"}=this._parsing,o=new Array(s);let a,l,c,h;for(a=0,l=s;a<l;++a)c=a+e,h=t[c],o[a]={r:n.parse(Et(h,r),c)};return o}const bl=Number.EPSILON||1e-14,he=(i,t)=>t<i.length&&!i[t].skip&&i[t],go=i=>i==="x"?"y":"x";function xl(i,t,e,s){const n=i.skip?t:i,r=t,o=e.skip?t:e,a=rs(r,n),l=rs(o,r);let c=a/(a+l),h=l/(a+l);c=isNaN(c)?0:c,h=isNaN(h)?0:h;const d=s*c,u=s*h;return{previous:{x:r.x-d*(o.x-n.x),y:r.y-d*(o.y-n.y)},next:{x:r.x+u*(o.x-n.x),y:r.y+u*(o.y-n.y)}}}function vl(i,t,e){const s=i.length;let n,r,o,a,l,c=he(i,0);for(let h=0;h<s-1;++h)if(l=c,c=he(i,h+1),!(!l||!c)){if(Pe(t[h],0,bl)){e[h]=e[h+1]=0;continue}n=e[h]/t[h],r=e[h+1]/t[h],a=Math.pow(n,2)+Math.pow(r,2),!(a<=9)&&(o=3/Math.sqrt(a),e[h]=n*o*t[h],e[h+1]=r*o*t[h])}}function yl(i,t,e="x"){const s=go(e),n=i.length;let r,o,a,l=he(i,0);for(let c=0;c<n;++c){if(o=a,a=l,l=he(i,c+1),!a)continue;const h=a[e],d=a[s];o&&(r=(h-o[e])/3,a[`cp1${e}`]=h-r,a[`cp1${s}`]=d-r*t[c]),l&&(r=(l[e]-h)/3,a[`cp2${e}`]=h+r,a[`cp2${s}`]=d+r*t[c])}}function wl(i,t="x"){const e=go(t),s=i.length,n=Array(s).fill(0),r=Array(s);let o,a,l,c=he(i,0);for(o=0;o<s;++o)if(a=l,l=c,c=he(i,o+1),!!l){if(c){const h=c[t]-l[t];n[o]=h!==0?(c[e]-l[e])/h:0}r[o]=a?c?mt(n[o-1])!==mt(n[o])?0:(n[o-1]+n[o])/2:n[o-1]:n[o]}vl(i,n,r),yl(i,r,t)}function Qe(i,t,e){return Math.max(Math.min(i,e),t)}function kl(i,t){let e,s,n,r,o,a=St(i[0],t);for(e=0,s=i.length;e<s;++e)o=r,r=a,a=e<s-1&&St(i[e+1],t),r&&(n=i[e],o&&(n.cp1x=Qe(n.cp1x,t.left,t.right),n.cp1y=Qe(n.cp1y,t.top,t.bottom)),a&&(n.cp2x=Qe(n.cp2x,t.left,t.right),n.cp2y=Qe(n.cp2y,t.top,t.bottom)))}function $l(i,t,e,s,n){let r,o,a,l;if(t.spanGaps&&(i=i.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")wl(i,n);else{let c=s?i[i.length-1]:i[0];for(r=0,o=i.length;r<o;++r)a=i[r],l=xl(c,a,i[Math.min(r+1,o-(s?0:1))%o],t.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,c=a}t.capBezierPoints&&kl(i,e)}function Cs(){return typeof window<"u"&&typeof document<"u"}function As(i){let t=i.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function bi(i,t,e){let s;return typeof i=="string"?(s=parseInt(i,10),i.indexOf("%")!==-1&&(s=s/100*t.parentNode[e])):s=i,s}const Ci=i=>i.ownerDocument.defaultView.getComputedStyle(i,null);function Sl(i,t){return Ci(i).getPropertyValue(t)}const Ml=["top","right","bottom","left"];function Gt(i,t,e){const s={};e=e?"-"+e:"";for(let n=0;n<4;n++){const r=Ml[n];s[r]=parseFloat(i[t+"-"+r+e])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const Pl=(i,t,e)=>(i>0||t>0)&&(!e||!e.shadowRoot);function Cl(i,t){const e=i.touches,s=e&&e.length?e[0]:i,{offsetX:n,offsetY:r}=s;let o=!1,a,l;if(Pl(n,r,i.target))a=n,l=r;else{const c=t.getBoundingClientRect();a=s.clientX-c.left,l=s.clientY-c.top,o=!0}return{x:a,y:l,box:o}}function jt(i,t){if("native"in i)return i;const{canvas:e,currentDevicePixelRatio:s}=t,n=Ci(e),r=n.boxSizing==="border-box",o=Gt(n,"padding"),a=Gt(n,"border","width"),{x:l,y:c,box:h}=Cl(i,e),d=o.left+(h&&a.left),u=o.top+(h&&a.top);let{width:f,height:p}=t;return r&&(f-=o.width+a.width,p-=o.height+a.height),{x:Math.round((l-d)/f*e.width/s),y:Math.round((c-u)/p*e.height/s)}}function Al(i,t,e){let s,n;if(t===void 0||e===void 0){const r=i&&As(i);if(!r)t=i.clientWidth,e=i.clientHeight;else{const o=r.getBoundingClientRect(),a=Ci(r),l=Gt(a,"border","width"),c=Gt(a,"padding");t=o.width-c.width-l.width,e=o.height-c.height-l.height,s=bi(a.maxWidth,r,"clientWidth"),n=bi(a.maxHeight,r,"clientHeight")}}return{width:t,height:e,maxWidth:s||_i,maxHeight:n||_i}}const Dt=i=>Math.round(i*10)/10;function Dl(i,t,e,s){const n=Ci(i),r=Gt(n,"margin"),o=bi(n.maxWidth,i,"clientWidth")||_i,a=bi(n.maxHeight,i,"clientHeight")||_i,l=Al(i,t,e);let{width:c,height:h}=l;if(n.boxSizing==="content-box"){const u=Gt(n,"border","width"),f=Gt(n,"padding");c-=f.width+u.width,h-=f.height+u.height}return c=Math.max(0,c-r.width),h=Math.max(0,s?c/s:h-r.height),c=Dt(Math.min(c,o,l.maxWidth)),h=Dt(Math.min(h,a,l.maxHeight)),c&&!h&&(h=Dt(c/2)),(t!==void 0||e!==void 0)&&s&&l.height&&h>l.height&&(h=l.height,c=Dt(Math.floor(h*s))),{width:c,height:h}}function on(i,t,e){const s=t||1,n=Dt(i.height*s),r=Dt(i.width*s);i.height=Dt(i.height),i.width=Dt(i.width);const o=i.canvas;return o.style&&(e||!o.style.height&&!o.style.width)&&(o.style.height=`${i.height}px`,o.style.width=`${i.width}px`),i.currentDevicePixelRatio!==s||o.height!==n||o.width!==r?(i.currentDevicePixelRatio=s,o.height=n,o.width=r,i.ctx.setTransform(s,0,0,s,0,0),!0):!1}const Ll=(function(){let i=!1;try{const t={get passive(){return i=!0,!1}};Cs()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return i})();function an(i,t){const e=Sl(i,t),s=e&&e.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function Ut(i,t,e,s){return{x:i.x+e*(t.x-i.x),y:i.y+e*(t.y-i.y)}}function Ol(i,t,e,s){return{x:i.x+e*(t.x-i.x),y:s==="middle"?e<.5?i.y:t.y:s==="after"?e<1?i.y:t.y:e>0?t.y:i.y}}function El(i,t,e,s){const n={x:i.cp2x,y:i.cp2y},r={x:t.cp1x,y:t.cp1y},o=Ut(i,n,e),a=Ut(n,r,e),l=Ut(r,t,e),c=Ut(o,a,e),h=Ut(a,l,e);return Ut(c,h,e)}const Tl=function(i,t){return{x(e){return i+i+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,s){return e-s},leftForLtr(e,s){return e-s}}},Fl=function(){return{x(i){return i},setWidth(i){},textAlign(i){return i},xPlus(i,t){return i+t},leftForLtr(i,t){return i}}};function ae(i,t,e){return i?Tl(t,e):Fl()}function _o(i,t){let e,s;(t==="ltr"||t==="rtl")&&(e=i.canvas.style,s=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),i.prevTextDirection=s)}function mo(i,t){t!==void 0&&(delete i.prevTextDirection,i.canvas.style.setProperty("direction",t[0],t[1]))}function bo(i){return i==="angle"?{between:Re,compare:Ra,normalize:nt}:{between:kt,compare:(t,e)=>t-e,normalize:t=>t}}function ln({start:i,end:t,count:e,loop:s,style:n}){return{start:i%e,end:t%e,loop:s&&(t-i+1)%e===0,style:n}}function Rl(i,t,e){const{property:s,start:n,end:r}=e,{between:o,normalize:a}=bo(s),l=t.length;let{start:c,end:h,loop:d}=i,u,f;if(d){for(c+=l,h+=l,u=0,f=l;u<f&&o(a(t[c%l][s]),n,r);++u)c--,h--;c%=l,h%=l}return h<c&&(h+=l),{start:c,end:h,loop:d,style:i.style}}function xo(i,t,e){if(!e)return[i];const{property:s,start:n,end:r}=e,o=t.length,{compare:a,between:l,normalize:c}=bo(s),{start:h,end:d,loop:u,style:f}=Rl(i,t,e),p=[];let g=!1,m=null,_,x,y;const w=()=>l(n,y,_)&&a(n,y)!==0,v=()=>a(r,_)===0||l(r,y,_),$=()=>g||w(),S=()=>!g||v();for(let M=h,P=h;M<=d;++M)x=t[M%o],!x.skip&&(_=c(x[s]),_!==y&&(g=l(_,n,r),m===null&&$()&&(m=a(_,n)===0?M:P),m!==null&&S()&&(p.push(ln({start:m,end:M,loop:u,count:o,style:f})),m=null),P=M,y=_));return m!==null&&p.push(ln({start:m,end:d,loop:u,count:o,style:f})),p}function vo(i,t){const e=[],s=i.segments;for(let n=0;n<s.length;n++){const r=xo(s[n],i.points,t);r.length&&e.push(...r)}return e}function Il(i,t,e,s){let n=0,r=t-1;if(e&&!s)for(;n<t&&!i[n].skip;)n++;for(;n<t&&i[n].skip;)n++;for(n%=t,e&&(r+=n);r>n&&i[r%t].skip;)r--;return r%=t,{start:n,end:r}}function zl(i,t,e,s){const n=i.length,r=[];let o=t,a=i[t],l;for(l=t+1;l<=e;++l){const c=i[l%n];c.skip||c.stop?a.skip||(s=!1,r.push({start:t%n,end:(l-1)%n,loop:s}),t=o=c.stop?l:null):(o=l,a.skip&&(t=l)),a=c}return o!==null&&r.push({start:t%n,end:o%n,loop:s}),r}function Bl(i,t){const e=i.points,s=i.options.spanGaps,n=e.length;if(!n)return[];const r=!!i._loop,{start:o,end:a}=Il(e,n,r,s);if(s===!0)return cn(i,[{start:o,end:a,loop:r}],e,t);const l=a<o?a+n:a,c=!!i._fullLoop&&o===0&&a===n-1;return cn(i,zl(e,o,l,c),e,t)}function cn(i,t,e,s){return!s||!s.setContext||!e?t:Nl(i,t,e,s)}function Nl(i,t,e,s){const n=i._chart.getContext(),r=hn(i.options),{_datasetIndex:o,options:{spanGaps:a}}=i,l=e.length,c=[];let h=r,d=t[0].start,u=d;function f(p,g,m,_){const x=a?-1:1;if(p!==g){for(p+=l;e[p%l].skip;)p-=x;for(;e[g%l].skip;)g+=x;p%l!==g%l&&(c.push({start:p%l,end:g%l,loop:m,style:_}),h=_,d=g%l)}}for(const p of t){d=a?d:p.start;let g=e[d%l],m;for(u=d+1;u<=p.end;u++){const _=e[u%l];m=hn(s.setContext(Ft(n,{type:"segment",p0:g,p1:_,p0DataIndex:(u-1)%l,p1DataIndex:u%l,datasetIndex:o}))),Vl(m,h)&&f(d,u-1,p.loop,h),g=_,h=m}d<u-1&&f(d,u-1,p.loop,h)}return c}function hn(i){return{backgroundColor:i.backgroundColor,borderCapStyle:i.borderCapStyle,borderDash:i.borderDash,borderDashOffset:i.borderDashOffset,borderJoinStyle:i.borderJoinStyle,borderWidth:i.borderWidth,borderColor:i.borderColor}}function Vl(i,t){if(!t)return!1;const e=[],s=function(n,r){return ks(r)?(e.includes(r)||e.push(r),e.indexOf(r)):r};return JSON.stringify(i,s)!==JSON.stringify(t,s)}function ti(i,t,e){return i.options.clip?i[e]:t[e]}function Hl(i,t){const{xScale:e,yScale:s}=i;return e&&s?{left:ti(e,t,"left"),right:ti(e,t,"right"),top:ti(s,t,"top"),bottom:ti(s,t,"bottom")}:t}function yo(i,t){const e=t._clip;if(e.disabled)return!1;const s=Hl(t,i.chartArea);return{left:e.left===!1?0:s.left-(e.left===!0?0:e.left),right:e.right===!1?i.width:s.right+(e.right===!0?0:e.right),top:e.top===!1?0:s.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?i.height:s.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class Wl{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,s,n){const r=e.listeners[n],o=e.duration;r.forEach(a=>a({chart:t,initial:e.initial,numSteps:o,currentStep:Math.min(s-e.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=io.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((s,n)=>{if(!s.running||!s.items.length)return;const r=s.items;let o=r.length-1,a=!1,l;for(;o>=0;--o)l=r[o],l._active?(l._total>s.duration&&(s.duration=l._total),l.tick(t),a=!0):(r[o]=r[r.length-1],r.pop());a&&(n.draw(),this._notify(n,s,t,"progress")),r.length||(s.running=!1,this._notify(n,s,t,"complete"),s.initial=!1),e+=r.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let s=e.get(t);return s||(s={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,s)),s}listen(t,e,s){this._getAnims(t).listeners[e].push(s)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((s,n)=>Math.max(s,n._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const s=e.items;let n=s.length-1;for(;n>=0;--n)s[n].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var vt=new Wl;const dn="transparent",jl={boolean(i,t,e){return e>.5?t:i},color(i,t,e){const s=tn(i||dn),n=s.valid&&tn(t||dn);return n&&n.valid?n.mix(s,e).hexString():t},number(i,t,e){return i+(t-i)*e}};class Ul{constructor(t,e,s,n){const r=e[s];n=ke([t.to,n,r,t.from]);const o=ke([t.from,r,n]);this._active=!0,this._fn=t.fn||jl[t.type||typeof o],this._easing=Ce[t.easing]||Ce.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=s,this._from=o,this._to=n,this._promises=void 0}active(){return this._active}update(t,e,s){if(this._active){this._notify(!1);const n=this._target[this._prop],r=s-this._start,o=this._duration-r;this._start=s,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=r,this._loop=!!t.loop,this._to=ke([t.to,e,n,t.from]),this._from=ke([t.from,n,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,s=this._duration,n=this._prop,r=this._from,o=this._loop,a=this._to;let l;if(this._active=r!==a&&(o||e<s),!this._active){this._target[n]=a,this._notify(!0);return}if(e<0){this._target[n]=r;return}l=e/s%2,l=o&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[n]=this._fn(r,a,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,s)=>{t.push({res:e,rej:s})})}_notify(t){const e=t?"res":"rej",s=this._promises||[];for(let n=0;n<s.length;n++)s[n][e]()}}class wo{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!R(t))return;const e=Object.keys(Y.animation),s=this._properties;Object.getOwnPropertyNames(t).forEach(n=>{const r=t[n];if(!R(r))return;const o={};for(const a of e)o[a]=r[a];(q(r.properties)&&r.properties||[n]).forEach(a=>{(a===n||!s.has(a))&&s.set(a,o)})})}_animateOptions(t,e){const s=e.options,n=Yl(t,s);if(!n)return[];const r=this._createAnimations(n,s);return s.$shared&&ql(t.options.$animations,s).then(()=>{t.options=s},()=>{}),r}_createAnimations(t,e){const s=this._properties,n=[],r=t.$animations||(t.$animations={}),o=Object.keys(e),a=Date.now();let l;for(l=o.length-1;l>=0;--l){const c=o[l];if(c.charAt(0)==="$")continue;if(c==="options"){n.push(...this._animateOptions(t,e));continue}const h=e[c];let d=r[c];const u=s.get(c);if(d)if(u&&d.active()){d.update(u,h,a);continue}else d.cancel();if(!u||!u.duration){t[c]=h;continue}r[c]=d=new Ul(u,t,c,h),n.push(d)}return n}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const s=this._createAnimations(t,e);if(s.length)return vt.add(this._chart,s),!0}}function ql(i,t){const e=[],s=Object.keys(t);for(let n=0;n<s.length;n++){const r=i[s[n]];r&&r.active()&&e.push(r.wait())}return Promise.all(e)}function Yl(i,t){if(!t)return;let e=i.options;if(!e){i.options=t;return}return e.$shared&&(i.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function un(i,t){const e=i&&i.options||{},s=e.reverse,n=e.min===void 0?t:0,r=e.max===void 0?t:0;return{start:s?r:n,end:s?n:r}}function Gl(i,t,e){if(e===!1)return!1;const s=un(i,e),n=un(t,e);return{top:n.end,right:s.end,bottom:n.start,left:s.start}}function Xl(i){let t,e,s,n;return R(i)?(t=i.top,e=i.right,s=i.bottom,n=i.left):t=e=s=n=i,{top:t,right:e,bottom:s,left:n,disabled:i===!1}}function ko(i,t){const e=[],s=i._getSortedDatasetMetas(t);let n,r;for(n=0,r=s.length;n<r;++n)e.push(s[n].index);return e}function fn(i,t,e,s={}){const n=i.keys,r=s.mode==="single";let o,a,l,c;if(t===null)return;let h=!1;for(o=0,a=n.length;o<a;++o){if(l=+n[o],l===e){if(h=!0,s.all)continue;break}c=i.values[l],X(c)&&(r||t===0||mt(t)===mt(c))&&(t+=c)}return!h&&!s.all?0:t}function Kl(i,t){const{iScale:e,vScale:s}=t,n=e.axis==="x"?"x":"y",r=s.axis==="x"?"x":"y",o=Object.keys(i),a=new Array(o.length);let l,c,h;for(l=0,c=o.length;l<c;++l)h=o[l],a[l]={[n]:h,[r]:i[h]};return a}function Vi(i,t){const e=i&&i.options.stacked;return e||e===void 0&&t.stack!==void 0}function Zl(i,t,e){return`${i.id}.${t.id}.${e.stack||e.type}`}function Jl(i){const{min:t,max:e,minDefined:s,maxDefined:n}=i.getUserBounds();return{min:s?t:Number.NEGATIVE_INFINITY,max:n?e:Number.POSITIVE_INFINITY}}function Ql(i,t,e){const s=i[t]||(i[t]={});return s[e]||(s[e]={})}function pn(i,t,e,s){for(const n of t.getMatchingVisibleMetas(s).reverse()){const r=i[n.index];if(e&&r>0||!e&&r<0)return n.index}return null}function gn(i,t){const{chart:e,_cachedMeta:s}=i,n=e._stacks||(e._stacks={}),{iScale:r,vScale:o,index:a}=s,l=r.axis,c=o.axis,h=Zl(r,o,s),d=t.length;let u;for(let f=0;f<d;++f){const p=t[f],{[l]:g,[c]:m}=p,_=p._stacks||(p._stacks={});u=_[c]=Ql(n,h,g),u[a]=m,u._top=pn(u,o,!0,s.type),u._bottom=pn(u,o,!1,s.type);const x=u._visualValues||(u._visualValues={});x[a]=m}}function Hi(i,t){const e=i.scales;return Object.keys(e).filter(s=>e[s].axis===t).shift()}function tc(i,t){return Ft(i,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function ec(i,t,e){return Ft(i,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function ge(i,t){const e=i.controller.index,s=i.vScale&&i.vScale.axis;if(s){t=t||i._parsed;for(const n of t){const r=n._stacks;if(!r||r[s]===void 0||r[s][e]===void 0)return;delete r[s][e],r[s]._visualValues!==void 0&&r[s]._visualValues[e]!==void 0&&delete r[s]._visualValues[e]}}}const Wi=i=>i==="reset"||i==="none",_n=(i,t)=>t?i:Object.assign({},i),ic=(i,t,e)=>i&&!t.hidden&&t._stacked&&{keys:ko(e,!0),values:null};class Rt{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Vi(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&ge(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,s=this.getDataset(),n=(d,u,f,p)=>d==="x"?u:d==="r"?p:f,r=e.xAxisID=O(s.xAxisID,Hi(t,"x")),o=e.yAxisID=O(s.yAxisID,Hi(t,"y")),a=e.rAxisID=O(s.rAxisID,Hi(t,"r")),l=e.indexAxis,c=e.iAxisID=n(l,r,o,a),h=e.vAxisID=n(l,o,r,a);e.xScale=this.getScaleForId(r),e.yScale=this.getScaleForId(o),e.rScale=this.getScaleForId(a),e.iScale=this.getScaleForId(c),e.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Zs(this._data,this),t._stacked&&ge(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),s=this._data;if(R(e)){const n=this._cachedMeta;this._data=Kl(e,n)}else if(s!==e){if(s){Zs(s,this);const n=this._cachedMeta;ge(n),n._parsed=[]}e&&Object.isExtensible(e)&&Na(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,s=this.getDataset();let n=!1;this._dataCheck();const r=e._stacked;e._stacked=Vi(e.vScale,e),e.stack!==s.stack&&(n=!0,ge(e),e.stack=s.stack),this._resyncElements(t),(n||r!==e._stacked)&&(gn(this,e._parsed),e._stacked=Vi(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),s=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(s,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:s,_data:n}=this,{iScale:r,_stacked:o}=s,a=r.axis;let l=t===0&&e===n.length?!0:s._sorted,c=t>0&&s._parsed[t-1],h,d,u;if(this._parsing===!1)s._parsed=n,s._sorted=!0,u=n;else{q(n[t])?u=this.parseArrayData(s,n,t,e):R(n[t])?u=this.parseObjectData(s,n,t,e):u=this.parsePrimitiveData(s,n,t,e);const f=()=>d[a]===null||c&&d[a]<c[a];for(h=0;h<e;++h)s._parsed[h+t]=d=u[h],l&&(f()&&(l=!1),c=d);s._sorted=l}o&&gn(this,u)}parsePrimitiveData(t,e,s,n){const{iScale:r,vScale:o}=t,a=r.axis,l=o.axis,c=r.getLabels(),h=r===o,d=new Array(n);let u,f,p;for(u=0,f=n;u<f;++u)p=u+s,d[u]={[a]:h||r.parse(c[p],p),[l]:o.parse(e[p],p)};return d}parseArrayData(t,e,s,n){const{xScale:r,yScale:o}=t,a=new Array(n);let l,c,h,d;for(l=0,c=n;l<c;++l)h=l+s,d=e[h],a[l]={x:r.parse(d[0],h),y:o.parse(d[1],h)};return a}parseObjectData(t,e,s,n){const{xScale:r,yScale:o}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=new Array(n);let h,d,u,f;for(h=0,d=n;h<d;++h)u=h+s,f=e[u],c[h]={x:r.parse(Et(f,a),u),y:o.parse(Et(f,l),u)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,s){const n=this.chart,r=this._cachedMeta,o=e[t.axis],a={keys:ko(n,!0),values:e._stacks[t.axis]._visualValues};return fn(a,o,r.index,{mode:s})}updateRangeFromParsed(t,e,s,n){const r=s[e.axis];let o=r===null?NaN:r;const a=n&&s._stacks[e.axis];n&&a&&(n.values=a,o=fn(n,r,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,e){const s=this._cachedMeta,n=s._parsed,r=s._sorted&&t===s.iScale,o=n.length,a=this._getOtherScale(t),l=ic(e,s,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:d}=Jl(a);let u,f;function p(){f=n[u];const g=f[a.axis];return!X(f[t.axis])||h>g||d<g}for(u=0;u<o&&!(!p()&&(this.updateRangeFromParsed(c,t,f,l),r));++u);if(r){for(u=o-1;u>=0;--u)if(!p()){this.updateRangeFromParsed(c,t,f,l);break}}return c}getAllParsedValues(t){const e=this._cachedMeta._parsed,s=[];let n,r,o;for(n=0,r=e.length;n<r;++n)o=e[n][t.axis],X(o)&&s.push(o);return s}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,s=e.iScale,n=e.vScale,r=this.getParsed(t);return{label:s?""+s.getLabelForValue(r[s.axis]):"",value:n?""+n.getLabelForValue(r[n.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=Xl(O(this.options.clip,Gl(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,s=this._cachedMeta,n=s.data||[],r=e.chartArea,o=[],a=this._drawStart||0,l=this._drawCount||n.length-a,c=this.options.drawActiveElementsOnTop;let h;for(s.dataset&&s.dataset.draw(t,r,a,l),h=a;h<a+l;++h){const d=n[h];d.hidden||(d.active&&c?o.push(d):d.draw(t,r))}for(h=0;h<o.length;++h)o[h].draw(t,r)}getStyle(t,e){const s=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(s):this.resolveDataElementOptions(t||0,s)}getContext(t,e,s){const n=this.getDataset();let r;if(t>=0&&t<this._cachedMeta.data.length){const o=this._cachedMeta.data[t];r=o.$context||(o.$context=ec(this.getContext(),t,o)),r.parsed=this.getParsed(t),r.raw=n.data[t],r.index=r.dataIndex=t}else r=this.$context||(this.$context=tc(this.chart.getContext(),this.index)),r.dataset=n,r.index=r.datasetIndex=this.index;return r.active=!!e,r.mode=s,r}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",s){const n=e==="active",r=this._cachedDataOpts,o=t+"-"+e,a=r[o],l=this.enableOptionSharing&&Fe(s);if(a)return _n(a,l);const c=this.chart.config,h=c.datasetElementScopeKeys(this._type,t),d=n?[`${t}Hover`,"hover",t,""]:[t,""],u=c.getOptionScopes(this.getDataset(),h),f=Object.keys(Y.elements[t]),p=()=>this.getContext(s,n,e),g=c.resolveNamedOptions(u,f,p,d);return g.$shared&&(g.$shared=l,r[o]=Object.freeze(_n(g,l))),g}_resolveAnimations(t,e,s){const n=this.chart,r=this._cachedDataOpts,o=`animation-${e}`,a=r[o];if(a)return a;let l;if(n.options.animation!==!1){const h=this.chart.config,d=h.datasetAnimationScopeKeys(this._type,e),u=h.getOptionScopes(this.getDataset(),d);l=h.createResolver(u,this.getContext(t,s,e))}const c=new wo(n,l&&l.animations);return l&&l._cacheable&&(r[o]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Wi(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const s=this.resolveDataElementOptions(t,e),n=this._sharedOptions,r=this.getSharedOptions(s),o=this.includeOptions(e,r)||r!==n;return this.updateSharedOptions(r,e,s),{sharedOptions:r,includeOptions:o}}updateElement(t,e,s,n){Wi(n)?Object.assign(t,s):this._resolveAnimations(e,n).update(t,s)}updateSharedOptions(t,e,s){t&&!Wi(e)&&this._resolveAnimations(void 0,e).update(t,s)}_setStyle(t,e,s,n){t.active=n;const r=this.getStyle(e,n);this._resolveAnimations(e,s,n).update(t,{options:!n&&this.getSharedOptions(r)||r})}removeHoverStyle(t,e,s){this._setStyle(t,s,"active",!1)}setHoverStyle(t,e,s){this._setStyle(t,s,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,s=this._cachedMeta.data;for(const[a,l,c]of this._syncList)this[a](l,c);this._syncList=[];const n=s.length,r=e.length,o=Math.min(r,n);o&&this.parse(0,o),r>n?this._insertElements(n,r-n,t):r<n&&this._removeElements(r,n-r)}_insertElements(t,e,s=!0){const n=this._cachedMeta,r=n.data,o=t+e;let a;const l=c=>{for(c.length+=e,a=c.length-1;a>=o;a--)c[a]=c[a-e]};for(l(r),a=t;a<o;++a)r[a]=new this.dataElementType;this._parsing&&l(n._parsed),this.parse(t,e),s&&this.updateElements(r,t,e,"reset")}updateElements(t,e,s,n){}_removeElements(t,e){const s=this._cachedMeta;if(this._parsing){const n=s._parsed.splice(t,e);s._stacked&&ge(s,n)}s.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,s,n]=t;this[e](s,n)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const s=arguments.length-2;s&&this._sync(["_insertElements",t,s])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function sc(i,t){if(!i._cache.$bar){const e=i.getMatchingVisibleMetas(t);let s=[];for(let n=0,r=e.length;n<r;n++)s=s.concat(e[n].controller.getAllParsedValues(i));i._cache.$bar=eo(s.sort((n,r)=>n-r))}return i._cache.$bar}function nc(i){const t=i.iScale,e=sc(t,i.type);let s=t._length,n,r,o,a;const l=()=>{o===32767||o===-32768||(Fe(a)&&(s=Math.min(s,Math.abs(o-a)||s)),a=o)};for(n=0,r=e.length;n<r;++n)o=t.getPixelForValue(e[n]),l();for(a=void 0,n=0,r=t.ticks.length;n<r;++n)o=t.getPixelForTick(n),l();return s}function rc(i,t,e,s){const n=e.barThickness;let r,o;return T(n)?(r=t.min*e.categoryPercentage,o=e.barPercentage):(r=n*s,o=1),{chunk:r/s,ratio:o,start:t.pixels[i]-r/2}}function oc(i,t,e,s){const n=t.pixels,r=n[i];let o=i>0?n[i-1]:null,a=i<n.length-1?n[i+1]:null;const l=e.categoryPercentage;o===null&&(o=r-(a===null?t.end-t.start:a-r)),a===null&&(a=r+r-o);const c=r-(r-Math.min(o,a))/2*l;return{chunk:Math.abs(a-o)/2*l/s,ratio:e.barPercentage,start:c}}function ac(i,t,e,s){const n=e.parse(i[0],s),r=e.parse(i[1],s),o=Math.min(n,r),a=Math.max(n,r);let l=o,c=a;Math.abs(o)>Math.abs(a)&&(l=a,c=o),t[e.axis]=c,t._custom={barStart:l,barEnd:c,start:n,end:r,min:o,max:a}}function $o(i,t,e,s){return q(i)?ac(i,t,e,s):t[e.axis]=e.parse(i,s),t}function mn(i,t,e,s){const n=i.iScale,r=i.vScale,o=n.getLabels(),a=n===r,l=[];let c,h,d,u;for(c=e,h=e+s;c<h;++c)u=t[c],d={},d[n.axis]=a||n.parse(o[c],c),l.push($o(u,d,r,c));return l}function ji(i){return i&&i.barStart!==void 0&&i.barEnd!==void 0}function lc(i,t,e){return i!==0?mt(i):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function cc(i){let t,e,s,n,r;return i.horizontal?(t=i.base>i.x,e="left",s="right"):(t=i.base<i.y,e="bottom",s="top"),t?(n="end",r="start"):(n="start",r="end"),{start:e,end:s,reverse:t,top:n,bottom:r}}function hc(i,t,e,s){let n=t.borderSkipped;const r={};if(!n){i.borderSkipped=r;return}if(n===!0){i.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:o,end:a,reverse:l,top:c,bottom:h}=cc(i);n==="middle"&&e&&(i.enableBorderRadius=!0,(e._top||0)===s?n=c:(e._bottom||0)===s?n=h:(r[bn(h,o,a,l)]=!0,n=c)),r[bn(n,o,a,l)]=!0,i.borderSkipped=r}function bn(i,t,e,s){return s?(i=dc(i,t,e),i=xn(i,e,t)):i=xn(i,t,e),i}function dc(i,t,e){return i===t?e:i===e?t:i}function xn(i,t,e){return i==="start"?t:i==="end"?e:i}function uc(i,{inflateAmount:t},e){i.inflateAmount=t==="auto"?e===1?.33:0:t}class fc extends Rt{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,e,s,n){return mn(t,e,s,n)}parseArrayData(t,e,s,n){return mn(t,e,s,n)}parseObjectData(t,e,s,n){const{iScale:r,vScale:o}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=r.axis==="x"?a:l,h=o.axis==="x"?a:l,d=[];let u,f,p,g;for(u=s,f=s+n;u<f;++u)g=e[u],p={},p[r.axis]=r.parse(Et(g,c),u),d.push($o(Et(g,h),p,o,u));return d}updateRangeFromParsed(t,e,s,n){super.updateRangeFromParsed(t,e,s,n);const r=s._custom;r&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,r.min),t.max=Math.max(t.max,r.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:s,vScale:n}=e,r=this.getParsed(t),o=r._custom,a=ji(o)?"["+o.start+", "+o.end+"]":""+n.getLabelForValue(r[n.axis]);return{label:""+s.getLabelForValue(r[s.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,s,n){const r=n==="reset",{index:o,_cachedMeta:{vScale:a}}=this,l=a.getBasePixel(),c=a.isHorizontal(),h=this._getRuler(),{sharedOptions:d,includeOptions:u}=this._getSharedOptions(e,n);for(let f=e;f<e+s;f++){const p=this.getParsed(f),g=r||T(p[a.axis])?{base:l,head:l}:this._calculateBarValuePixels(f),m=this._calculateBarIndexPixels(f,h),_=(p._stacks||{})[a.axis],x={horizontal:c,base:g.base,enableBorderRadius:!_||ji(p._custom)||o===_._top||o===_._bottom,x:c?g.head:m.center,y:c?m.center:g.head,height:c?m.size:Math.abs(g.size),width:c?Math.abs(g.size):m.size};u&&(x.options=d||this.resolveDataElementOptions(f,t[f].active?"active":n));const y=x.options||t[f].options;hc(x,y,_,o),uc(x,y,h.ratio),this.updateElement(t[f],f,x,n)}}_getStacks(t,e){const{iScale:s}=this._cachedMeta,n=s.getMatchingVisibleMetas(this._type).filter(h=>h.controller.options.grouped),r=s.options.stacked,o=[],a=this._cachedMeta.controller.getParsed(e),l=a&&a[s.axis],c=h=>{const d=h._parsed.find(f=>f[s.axis]===l),u=d&&d[h.vScale.axis];if(T(u)||isNaN(u))return!0};for(const h of n)if(!(e!==void 0&&c(h))&&((r===!1||o.indexOf(h.stack)===-1||r===void 0&&h.stack===void 0)&&o.push(h.stack),h.index===t))break;return o.length||o.push(void 0),o}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(s=>t[s].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const s of this.chart.data.datasets)t[O(this.chart.options.indexAxis==="x"?s.xAxisID:s.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,s){const n=this._getStacks(t,s),r=e!==void 0?n.indexOf(e):-1;return r===-1?n.length-1:r}_getRuler(){const t=this.options,e=this._cachedMeta,s=e.iScale,n=[];let r,o;for(r=0,o=e.data.length;r<o;++r)n.push(s.getPixelForValue(this.getParsed(r)[s.axis],r));const a=t.barThickness;return{min:a||nc(e),pixels:n,start:s._startPixel,end:s._endPixel,stackCount:this._getStackCount(),scale:s,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:s,index:n},options:{base:r,minBarLength:o}}=this,a=r||0,l=this.getParsed(t),c=l._custom,h=ji(c);let d=l[e.axis],u=0,f=s?this.applyStack(e,l,s):d,p,g;f!==d&&(u=f-d,f=d),h&&(d=c.barStart,f=c.barEnd-c.barStart,d!==0&&mt(d)!==mt(c.barEnd)&&(u=0),u+=d);const m=!T(r)&&!h?r:u;let _=e.getPixelForValue(m);if(this.chart.getDataVisibility(t)?p=e.getPixelForValue(u+f):p=_,g=p-_,Math.abs(g)<o){g=lc(g,e,a)*o,d===a&&(_-=g/2);const x=e.getPixelForDecimal(0),y=e.getPixelForDecimal(1),w=Math.min(x,y),v=Math.max(x,y);_=Math.max(Math.min(_,v),w),p=_+g,s&&!h&&(l._stacks[e.axis]._visualValues[n]=e.getValueForPixel(p)-e.getValueForPixel(_))}if(_===e.getPixelForValue(a)){const x=mt(g)*e.getLineWidthForValue(a)/2;_+=x,g-=x}return{size:g,base:_,head:p,center:p+g/2}}_calculateBarIndexPixels(t,e){const s=e.scale,n=this.options,r=n.skipNull,o=O(n.maxBarThickness,1/0);let a,l;const c=this._getAxisCount();if(e.grouped){const h=r?this._getStackCount(t):e.stackCount,d=n.barThickness==="flex"?oc(t,e,n,h*c):rc(t,e,n,h*c),u=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(O(u,this.getFirstScaleIdForIndexAxis())),p=this._getStackIndex(this.index,this._cachedMeta.stack,r?t:void 0)+f;a=d.start+d.chunk*p+d.chunk/2,l=Math.min(o,d.chunk*d.ratio)}else a=s.getPixelForValue(this.getParsed(t)[s.axis],t),l=Math.min(o,e.min*e.ratio);return{base:a-l/2,head:a+l/2,center:a,size:l}}draw(){const t=this._cachedMeta,e=t.vScale,s=t.data,n=s.length;let r=0;for(;r<n;++r)this.getParsed(r)[e.axis]!==null&&!s[r].hidden&&s[r].draw(this._ctx)}}class pc extends Rt{static id="bubble";static defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}};static overrides={scales:{x:{type:"linear"},y:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,s,n){const r=super.parsePrimitiveData(t,e,s,n);for(let o=0;o<r.length;o++)r[o]._custom=this.resolveDataElementOptions(o+s).radius;return r}parseArrayData(t,e,s,n){const r=super.parseArrayData(t,e,s,n);for(let o=0;o<r.length;o++){const a=e[s+o];r[o]._custom=O(a[2],this.resolveDataElementOptions(o+s).radius)}return r}parseObjectData(t,e,s,n){const r=super.parseObjectData(t,e,s,n);for(let o=0;o<r.length;o++){const a=e[s+o];r[o]._custom=O(a&&a.r&&+a.r,this.resolveDataElementOptions(o+s).radius)}return r}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let s=t.length-1;s>=0;--s)e=Math.max(e,t[s].size(this.resolveDataElementOptions(s))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart.data.labels||[],{xScale:n,yScale:r}=e,o=this.getParsed(t),a=n.getLabelForValue(o.x),l=r.getLabelForValue(o.y),c=o._custom;return{label:s[t]||"",value:"("+a+", "+l+(c?", "+c:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,s,n){const r=n==="reset",{iScale:o,vScale:a}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(e,n),h=o.axis,d=a.axis;for(let u=e;u<e+s;u++){const f=t[u],p=!r&&this.getParsed(u),g={},m=g[h]=r?o.getPixelForDecimal(.5):o.getPixelForValue(p[h]),_=g[d]=r?a.getBasePixel():a.getPixelForValue(p[d]);g.skip=isNaN(m)||isNaN(_),c&&(g.options=l||this.resolveDataElementOptions(u,f.active?"active":n),r&&(g.options.radius=0)),this.updateElement(f,u,g,n)}}resolveDataElementOptions(t,e){const s=this.getParsed(t);let n=super.resolveDataElementOptions(t,e);n.$shared&&(n=Object.assign({},n,{$shared:!1}));const r=n.radius;return e!=="active"&&(n.radius=0),n.radius+=O(s&&s._custom,r),n}}function gc(i,t,e){let s=1,n=1,r=0,o=0;if(t<H){const a=i,l=a+t,c=Math.cos(a),h=Math.sin(a),d=Math.cos(l),u=Math.sin(l),f=(y,w,v)=>Re(y,a,l,!0)?1:Math.max(w,w*e,v,v*e),p=(y,w,v)=>Re(y,a,l,!0)?-1:Math.min(w,w*e,v,v*e),g=f(0,c,d),m=f(Z,h,u),_=p(I,c,d),x=p(I+Z,h,u);s=(g-_)/2,n=(m-x)/2,r=-(g+_)/2,o=-(m+x)/2}return{ratioX:s,ratioY:n,offsetX:r,offsetY:o}}class Ds extends Rt{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:s,textAlign:n,color:r,useBorderRadius:o,borderRadius:a}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,c)=>{const d=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:d.backgroundColor,fontColor:r,hidden:!t.getDataVisibility(c),lineDash:d.borderDash,lineDashOffset:d.borderDashOffset,lineJoin:d.borderJoinStyle,lineWidth:d.borderWidth,strokeStyle:d.borderColor,textAlign:n,pointStyle:s,borderRadius:o&&(a||d.borderRadius),index:c}}):[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}}};constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const s=this.getDataset().data,n=this._cachedMeta;if(this._parsing===!1)n._parsed=s;else{let r=l=>+s[l];if(R(s[t])){const{key:l="value"}=this._parsing;r=c=>+Et(s[c],l)}let o,a;for(o=t,a=t+e;o<a;++o)n._parsed[o]=r(o)}}_getRotation(){return ft(this.options.rotation-90)}_getCircumference(){return ft(this.options.circumference)}_getRotationExtents(){let t=H,e=-H;for(let s=0;s<this.chart.data.datasets.length;++s)if(this.chart.isDatasetVisible(s)&&this.chart.getDatasetMeta(s).type===this._type){const n=this.chart.getDatasetMeta(s).controller,r=n._getRotation(),o=n._getCircumference();t=Math.min(t,r),e=Math.max(e,r+o)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:s}=e,n=this._cachedMeta,r=n.data,o=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,a=Math.max((Math.min(s.width,s.height)-o)/2,0),l=Math.min(Sa(this.options.cutout,a),1),c=this._getRingWeight(this.index),{circumference:h,rotation:d}=this._getRotationExtents(),{ratioX:u,ratioY:f,offsetX:p,offsetY:g}=gc(d,h,l),m=(s.width-o)/u,_=(s.height-o)/f,x=Math.max(Math.min(m,_)/2,0),y=Kr(this.options.radius,x),w=Math.max(y*l,0),v=(y-w)/this._getVisibleDatasetWeightTotal();this.offsetX=p*y,this.offsetY=g*y,n.total=this.calculateTotal(),this.outerRadius=y-v*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-v*c,0),this.updateElements(r,0,r.length,t)}_circumference(t,e){const s=this.options,n=this._cachedMeta,r=this._getCircumference();return e&&s.animation.animateRotate||!this.chart.getDataVisibility(t)||n._parsed[t]===null||n.data[t].hidden?0:this.calculateCircumference(n._parsed[t]*r/H)}updateElements(t,e,s,n){const r=n==="reset",o=this.chart,a=o.chartArea,c=o.options.animation,h=(a.left+a.right)/2,d=(a.top+a.bottom)/2,u=r&&c.animateScale,f=u?0:this.innerRadius,p=u?0:this.outerRadius,{sharedOptions:g,includeOptions:m}=this._getSharedOptions(e,n);let _=this._getRotation(),x;for(x=0;x<e;++x)_+=this._circumference(x,r);for(x=e;x<e+s;++x){const y=this._circumference(x,r),w=t[x],v={x:h+this.offsetX,y:d+this.offsetY,startAngle:_,endAngle:_+y,circumference:y,outerRadius:p,innerRadius:f};m&&(v.options=g||this.resolveDataElementOptions(x,w.active?"active":n)),_+=y,this.updateElement(w,x,v,n)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let s=0,n;for(n=0;n<e.length;n++){const r=t._parsed[n];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(n)&&!e[n].hidden&&(s+=Math.abs(r))}return s}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?H*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,n=s.data.labels||[],r=Ue(e._parsed[t],s.options.locale);return{label:n[t]||"",value:r}}getMaxBorderWidth(t){let e=0;const s=this.chart;let n,r,o,a,l;if(!t){for(n=0,r=s.data.datasets.length;n<r;++n)if(s.isDatasetVisible(n)){o=s.getDatasetMeta(n),t=o.data,a=o.controller;break}}if(!t)return 0;for(n=0,r=t.length;n<r;++n)l=a.resolveDataElementOptions(n),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let s=0,n=t.length;s<n;++s){const r=this.resolveDataElementOptions(s);e=Math.max(e,r.offset||0,r.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let s=0;s<t;++s)this.chart.isDatasetVisible(s)&&(e+=this._getRingWeight(s));return e}_getRingWeight(t){return Math.max(O(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class _c extends Rt{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:s,data:n=[],_dataset:r}=e,o=this.chart._animationsDisabled;let{start:a,count:l}=no(e,n,o);this._drawStart=a,this._drawCount=l,ro(e)&&(a=0,l=n.length),s._chart=this.chart,s._datasetIndex=this.index,s._decimated=!!r._decimated,s.points=n;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(s,void 0,{animated:!o,options:c},t),this.updateElements(n,a,l,t)}updateElements(t,e,s,n){const r=n==="reset",{iScale:o,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:h,includeOptions:d}=this._getSharedOptions(e,n),u=o.axis,f=a.axis,{spanGaps:p,segment:g}=this.options,m=le(p)?p:Number.POSITIVE_INFINITY,_=this.chart._animationsDisabled||r||n==="none",x=e+s,y=t.length;let w=e>0&&this.getParsed(e-1);for(let v=0;v<y;++v){const $=t[v],S=_?$:{};if(v<e||v>=x){S.skip=!0;continue}const M=this.getParsed(v),P=T(M[f]),L=S[u]=o.getPixelForValue(M[u],v),E=S[f]=r||P?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,M,l):M[f],v);S.skip=isNaN(L)||isNaN(E)||P,S.stop=v>0&&Math.abs(M[u]-w[u])>m,g&&(S.parsed=M,S.raw=c.data[v]),d&&(S.options=h||this.resolveDataElementOptions(v,$.active?"active":n)),_||this.updateElement($,v,S,n),w=M}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,s=e.options&&e.options.borderWidth||0,n=t.data||[];if(!n.length)return s;const r=n[0].size(this.resolveDataElementOptions(0)),o=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(s,r,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}class So extends Rt{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:s,color:n}}=t.legend.options;return e.labels.map((r,o)=>{const l=t.getDatasetMeta(0).controller.getStyle(o);return{text:r,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:n,lineWidth:l.borderWidth,pointStyle:s,hidden:!t.getDataVisibility(o),index:o}})}return[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,n=s.data.labels||[],r=Ue(e._parsed[t].r,s.options.locale);return{label:n[t]||"",value:r}}parseObjectData(t,e,s,n){return po.bind(this)(t,e,s,n)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((s,n)=>{const r=this.getParsed(n).r;!isNaN(r)&&this.chart.getDataVisibility(n)&&(r<e.min&&(e.min=r),r>e.max&&(e.max=r))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,s=t.options,n=Math.min(e.right-e.left,e.bottom-e.top),r=Math.max(n/2,0),o=Math.max(s.cutoutPercentage?r/100*s.cutoutPercentage:1,0),a=(r-o)/t.getVisibleDatasetCount();this.outerRadius=r-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,e,s,n){const r=n==="reset",o=this.chart,l=o.options.animation,c=this._cachedMeta.rScale,h=c.xCenter,d=c.yCenter,u=c.getIndexAngle(0)-.5*I;let f=u,p;const g=360/this.countVisibleElements();for(p=0;p<e;++p)f+=this._computeAngle(p,n,g);for(p=e;p<e+s;p++){const m=t[p];let _=f,x=f+this._computeAngle(p,n,g),y=o.getDataVisibility(p)?c.getDistanceFromCenterForValue(this.getParsed(p).r):0;f=x,r&&(l.animateScale&&(y=0),l.animateRotate&&(_=x=u));const w={x:h,y:d,innerRadius:0,outerRadius:y,startAngle:_,endAngle:x,options:this.resolveDataElementOptions(p,m.active?"active":n)};this.updateElement(m,p,w,n)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((s,n)=>{!isNaN(this.getParsed(n).r)&&this.chart.getDataVisibility(n)&&e++}),e}_computeAngle(t,e,s){return this.chart.getDataVisibility(t)?ft(this.resolveDataElementOptions(t,e).angle||s):0}}class mc extends Ds{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}}class bc extends Rt{static id="radar";static defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}};static overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};getLabelAndValue(t){const e=this._cachedMeta.vScale,s=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(s[e.axis])}}parseObjectData(t,e,s,n){return po.bind(this)(t,e,s,n)}update(t){const e=this._cachedMeta,s=e.dataset,n=e.data||[],r=e.iScale.getLabels();if(s.points=n,t!=="resize"){const o=this.resolveDatasetElementOptions(t);this.options.showLine||(o.borderWidth=0);const a={_loop:!0,_fullLoop:r.length===n.length,options:o};this.updateElement(s,void 0,a,t)}this.updateElements(n,0,n.length,t)}updateElements(t,e,s,n){const r=this._cachedMeta.rScale,o=n==="reset";for(let a=e;a<e+s;a++){const l=t[a],c=this.resolveDataElementOptions(a,l.active?"active":n),h=r.getPointPositionForValue(a,this.getParsed(a).r),d=o?r.xCenter:h.x,u=o?r.yCenter:h.y,f={x:d,y:u,angle:h.angle,skip:isNaN(d)||isNaN(u),options:c};this.updateElement(l,a,f,n)}}}class xc extends Rt{static id="scatter";static defaults={datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1};static overrides={interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}};getLabelAndValue(t){const e=this._cachedMeta,s=this.chart.data.labels||[],{xScale:n,yScale:r}=e,o=this.getParsed(t),a=n.getLabelForValue(o.x),l=r.getLabelForValue(o.y);return{label:s[t]||"",value:"("+a+", "+l+")"}}update(t){const e=this._cachedMeta,{data:s=[]}=e,n=this.chart._animationsDisabled;let{start:r,count:o}=no(e,s,n);if(this._drawStart=r,this._drawCount=o,ro(e)&&(r=0,o=s.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:l}=e;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!l._decimated,a.points=s;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(a,void 0,{animated:!n,options:c},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(s,r,o,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,s,n){const r=n==="reset",{iScale:o,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,h=this.resolveDataElementOptions(e,n),d=this.getSharedOptions(h),u=this.includeOptions(n,d),f=o.axis,p=a.axis,{spanGaps:g,segment:m}=this.options,_=le(g)?g:Number.POSITIVE_INFINITY,x=this.chart._animationsDisabled||r||n==="none";let y=e>0&&this.getParsed(e-1);for(let w=e;w<e+s;++w){const v=t[w],$=this.getParsed(w),S=x?v:{},M=T($[p]),P=S[f]=o.getPixelForValue($[f],w),L=S[p]=r||M?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,$,l):$[p],w);S.skip=isNaN(P)||isNaN(L)||M,S.stop=w>0&&Math.abs($[f]-y[f])>_,m&&(S.parsed=$,S.raw=c.data[w]),u&&(S.options=d||this.resolveDataElementOptions(w,v.active?"active":n)),x||this.updateElement(v,w,S,n),y=$}this.updateSharedOptions(d,n,h)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let a=0;for(let l=e.length-1;l>=0;--l)a=Math.max(a,e[l].size(this.resolveDataElementOptions(l))/2);return a>0&&a}const s=t.dataset,n=s.options&&s.options.borderWidth||0;if(!e.length)return n;const r=e[0].size(this.resolveDataElementOptions(0)),o=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(n,r,o)/2}}var vc=Object.freeze({__proto__:null,BarController:fc,BubbleController:pc,DoughnutController:Ds,LineController:_c,PieController:mc,PolarAreaController:So,RadarController:bc,ScatterController:xc});function Vt(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Ls{static override(t){Object.assign(Ls.prototype,t)}options;constructor(t){this.options=t||{}}init(){}formats(){return Vt()}parse(){return Vt()}format(){return Vt()}add(){return Vt()}diff(){return Vt()}startOf(){return Vt()}endOf(){return Vt()}}var yc={_date:Ls};function wc(i,t,e,s){const{controller:n,data:r,_sorted:o}=i,a=n._cachedMeta.iScale,l=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&o&&r.length){const c=a._reversePixels?za:$t;if(s){if(n._sharedOptions){const h=r[0],d=typeof h.getRange=="function"&&h.getRange(t);if(d){const u=c(r,t,e-d),f=c(r,t,e+d);return{lo:u.lo,hi:f.hi}}}}else{const h=c(r,t,e);if(l){const{vScale:d}=n._cachedMeta,{_parsed:u}=i,f=u.slice(0,h.lo+1).reverse().findIndex(g=>!T(g[d.axis]));h.lo-=Math.max(0,f);const p=u.slice(h.hi).findIndex(g=>!T(g[d.axis]));h.hi+=Math.max(0,p)}return h}}return{lo:0,hi:r.length-1}}function Ai(i,t,e,s,n){const r=i.getSortedVisibleDatasetMetas(),o=e[t];for(let a=0,l=r.length;a<l;++a){const{index:c,data:h}=r[a],{lo:d,hi:u}=wc(r[a],t,o,n);for(let f=d;f<=u;++f){const p=h[f];p.skip||s(p,c,f)}}}function kc(i){const t=i.indexOf("x")!==-1,e=i.indexOf("y")!==-1;return function(s,n){const r=t?Math.abs(s.x-n.x):0,o=e?Math.abs(s.y-n.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(o,2))}}function Ui(i,t,e,s,n){const r=[];return!n&&!i.isPointInArea(t)||Ai(i,e,t,function(a,l,c){!n&&!St(a,i.chartArea,0)||a.inRange(t.x,t.y,s)&&r.push({element:a,datasetIndex:l,index:c})},!0),r}function $c(i,t,e,s){let n=[];function r(o,a,l){const{startAngle:c,endAngle:h}=o.getProps(["startAngle","endAngle"],s),{angle:d}=Qr(o,{x:t.x,y:t.y});Re(d,c,h)&&n.push({element:o,datasetIndex:a,index:l})}return Ai(i,e,t,r),n}function Sc(i,t,e,s,n,r){let o=[];const a=kc(e);let l=Number.POSITIVE_INFINITY;function c(h,d,u){const f=h.inRange(t.x,t.y,n);if(s&&!f)return;const p=h.getCenterPoint(n);if(!(!!r||i.isPointInArea(p))&&!f)return;const m=a(t,p);m<l?(o=[{element:h,datasetIndex:d,index:u}],l=m):m===l&&o.push({element:h,datasetIndex:d,index:u})}return Ai(i,e,t,c),o}function qi(i,t,e,s,n,r){return!r&&!i.isPointInArea(t)?[]:e==="r"&&!s?$c(i,t,e,n):Sc(i,t,e,s,n,r)}function vn(i,t,e,s,n){const r=[],o=e==="x"?"inXRange":"inYRange";let a=!1;return Ai(i,e,t,(l,c,h)=>{l[o]&&l[o](t[e],n)&&(r.push({element:l,datasetIndex:c,index:h}),a=a||l.inRange(t.x,t.y,n))}),s&&!a?[]:r}var Mc={modes:{index(i,t,e,s){const n=jt(t,i),r=e.axis||"x",o=e.includeInvisible||!1,a=e.intersect?Ui(i,n,r,s,o):qi(i,n,r,!1,s,o),l=[];return a.length?(i.getSortedVisibleDatasetMetas().forEach(c=>{const h=a[0].index,d=c.data[h];d&&!d.skip&&l.push({element:d,datasetIndex:c.index,index:h})}),l):[]},dataset(i,t,e,s){const n=jt(t,i),r=e.axis||"xy",o=e.includeInvisible||!1;let a=e.intersect?Ui(i,n,r,s,o):qi(i,n,r,!1,s,o);if(a.length>0){const l=a[0].datasetIndex,c=i.getDatasetMeta(l).data;a=[];for(let h=0;h<c.length;++h)a.push({element:c[h],datasetIndex:l,index:h})}return a},point(i,t,e,s){const n=jt(t,i),r=e.axis||"xy",o=e.includeInvisible||!1;return Ui(i,n,r,s,o)},nearest(i,t,e,s){const n=jt(t,i),r=e.axis||"xy",o=e.includeInvisible||!1;return qi(i,n,r,e.intersect,s,o)},x(i,t,e,s){const n=jt(t,i);return vn(i,n,"x",e.intersect,s)},y(i,t,e,s){const n=jt(t,i);return vn(i,n,"y",e.intersect,s)}}};const Mo=["left","top","right","bottom"];function _e(i,t){return i.filter(e=>e.pos===t)}function yn(i,t){return i.filter(e=>Mo.indexOf(e.pos)===-1&&e.box.axis===t)}function me(i,t){return i.sort((e,s)=>{const n=t?s:e,r=t?e:s;return n.weight===r.weight?n.index-r.index:n.weight-r.weight})}function Pc(i){const t=[];let e,s,n,r,o,a;for(e=0,s=(i||[]).length;e<s;++e)n=i[e],{position:r,options:{stack:o,stackWeight:a=1}}=n,t.push({index:e,box:n,pos:r,horizontal:n.isHorizontal(),weight:n.weight,stack:o&&r+o,stackWeight:a});return t}function Cc(i){const t={};for(const e of i){const{stack:s,pos:n,stackWeight:r}=e;if(!s||!Mo.includes(n))continue;const o=t[s]||(t[s]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=r}return t}function Ac(i,t){const e=Cc(i),{vBoxMaxWidth:s,hBoxMaxHeight:n}=t;let r,o,a;for(r=0,o=i.length;r<o;++r){a=i[r];const{fullSize:l}=a.box,c=e[a.stack],h=c&&a.stackWeight/c.weight;a.horizontal?(a.width=h?h*s:l&&t.availableWidth,a.height=n):(a.width=s,a.height=h?h*n:l&&t.availableHeight)}return e}function Dc(i){const t=Pc(i),e=me(t.filter(c=>c.box.fullSize),!0),s=me(_e(t,"left"),!0),n=me(_e(t,"right")),r=me(_e(t,"top"),!0),o=me(_e(t,"bottom")),a=yn(t,"x"),l=yn(t,"y");return{fullSize:e,leftAndTop:s.concat(r),rightAndBottom:n.concat(l).concat(o).concat(a),chartArea:_e(t,"chartArea"),vertical:s.concat(n).concat(l),horizontal:r.concat(o).concat(a)}}function wn(i,t,e,s){return Math.max(i[e],t[e])+Math.max(i[s],t[s])}function Po(i,t){i.top=Math.max(i.top,t.top),i.left=Math.max(i.left,t.left),i.bottom=Math.max(i.bottom,t.bottom),i.right=Math.max(i.right,t.right)}function Lc(i,t,e,s){const{pos:n,box:r}=e,o=i.maxPadding;if(!R(n)){e.size&&(i[n]-=e.size);const d=s[e.stack]||{size:0,count:1};d.size=Math.max(d.size,e.horizontal?r.height:r.width),e.size=d.size/d.count,i[n]+=e.size}r.getPadding&&Po(o,r.getPadding());const a=Math.max(0,t.outerWidth-wn(o,i,"left","right")),l=Math.max(0,t.outerHeight-wn(o,i,"top","bottom")),c=a!==i.w,h=l!==i.h;return i.w=a,i.h=l,e.horizontal?{same:c,other:h}:{same:h,other:c}}function Oc(i){const t=i.maxPadding;function e(s){const n=Math.max(t[s]-i[s],0);return i[s]+=n,n}i.y+=e("top"),i.x+=e("left"),e("right"),e("bottom")}function Ec(i,t){const e=t.maxPadding;function s(n){const r={left:0,top:0,right:0,bottom:0};return n.forEach(o=>{r[o]=Math.max(t[o],e[o])}),r}return s(i?["left","right"]:["top","bottom"])}function $e(i,t,e,s){const n=[];let r,o,a,l,c,h;for(r=0,o=i.length,c=0;r<o;++r){a=i[r],l=a.box,l.update(a.width||t.w,a.height||t.h,Ec(a.horizontal,t));const{same:d,other:u}=Lc(t,e,a,s);c|=d&&n.length,h=h||u,l.fullSize||n.push(a)}return c&&$e(n,t,e,s)||h}function ei(i,t,e,s,n){i.top=e,i.left=t,i.right=t+s,i.bottom=e+n,i.width=s,i.height=n}function kn(i,t,e,s){const n=e.padding;let{x:r,y:o}=t;for(const a of i){const l=a.box,c=s[a.stack]||{placed:0,weight:1},h=a.stackWeight/c.weight||1;if(a.horizontal){const d=t.w*h,u=c.size||l.height;Fe(c.start)&&(o=c.start),l.fullSize?ei(l,n.left,o,e.outerWidth-n.right-n.left,u):ei(l,t.left+c.placed,o,d,u),c.start=o,c.placed+=d,o=l.bottom}else{const d=t.h*h,u=c.size||l.width;Fe(c.start)&&(r=c.start),l.fullSize?ei(l,r,n.top,u,e.outerHeight-n.bottom-n.top):ei(l,r,t.top+c.placed,u,d),c.start=r,c.placed+=d,r=l.right}}t.x=r,t.y=o}var rt={addBox(i,t){i.boxes||(i.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},i.boxes.push(t)},removeBox(i,t){const e=i.boxes?i.boxes.indexOf(t):-1;e!==-1&&i.boxes.splice(e,1)},configure(i,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(i,t,e,s){if(!i)return;const n=ot(i.options.layout.padding),r=Math.max(t-n.width,0),o=Math.max(e-n.height,0),a=Dc(i.boxes),l=a.vertical,c=a.horizontal;z(i.boxes,g=>{typeof g.beforeLayout=="function"&&g.beforeLayout()});const h=l.reduce((g,m)=>m.box.options&&m.box.options.display===!1?g:g+1,0)||1,d=Object.freeze({outerWidth:t,outerHeight:e,padding:n,availableWidth:r,availableHeight:o,vBoxMaxWidth:r/2/h,hBoxMaxHeight:o/2}),u=Object.assign({},n);Po(u,ot(s));const f=Object.assign({maxPadding:u,w:r,h:o,x:n.left,y:n.top},n),p=Ac(l.concat(c),d);$e(a.fullSize,f,d,p),$e(l,f,d,p),$e(c,f,d,p)&&$e(l,f,d,p),Oc(f),kn(a.leftAndTop,f,d,p),f.x+=f.w,f.y+=f.h,kn(a.rightAndBottom,f,d,p),i.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},z(a.chartArea,g=>{const m=g.box;Object.assign(m,i.chartArea),m.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class Co{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,s){}removeEventListener(t,e,s){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,s,n){return e=Math.max(0,e||t.width),s=s||t.height,{width:e,height:Math.max(0,n?Math.floor(e/n):s)}}isAttached(t){return!0}updateConfig(t){}}class Tc extends Co{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const di="$chartjs",Fc={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},$n=i=>i===null||i==="";function Rc(i,t){const e=i.style,s=i.getAttribute("height"),n=i.getAttribute("width");if(i[di]={initial:{height:s,width:n,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",$n(n)){const r=an(i,"width");r!==void 0&&(i.width=r)}if($n(s))if(i.style.height==="")i.height=i.width/(t||2);else{const r=an(i,"height");r!==void 0&&(i.height=r)}return i}const Ao=Ll?{passive:!0}:!1;function Ic(i,t,e){i&&i.addEventListener(t,e,Ao)}function zc(i,t,e){i&&i.canvas&&i.canvas.removeEventListener(t,e,Ao)}function Bc(i,t){const e=Fc[i.type]||i.type,{x:s,y:n}=jt(i,t);return{type:e,chart:t,native:i,x:s!==void 0?s:null,y:n!==void 0?n:null}}function xi(i,t){for(const e of i)if(e===t||e.contains(t))return!0}function Nc(i,t,e){const s=i.canvas,n=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||xi(a.addedNodes,s),o=o&&!xi(a.removedNodes,s);o&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}function Vc(i,t,e){const s=i.canvas,n=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||xi(a.removedNodes,s),o=o&&!xi(a.addedNodes,s);o&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}const ze=new Map;let Sn=0;function Do(){const i=window.devicePixelRatio;i!==Sn&&(Sn=i,ze.forEach((t,e)=>{e.currentDevicePixelRatio!==i&&t()}))}function Hc(i,t){ze.size||window.addEventListener("resize",Do),ze.set(i,t)}function Wc(i){ze.delete(i),ze.size||window.removeEventListener("resize",Do)}function jc(i,t,e){const s=i.canvas,n=s&&As(s);if(!n)return;const r=so((a,l)=>{const c=n.clientWidth;e(a,l),c<n.clientWidth&&e()},window),o=new ResizeObserver(a=>{const l=a[0],c=l.contentRect.width,h=l.contentRect.height;c===0&&h===0||r(c,h)});return o.observe(n),Hc(i,r),o}function Yi(i,t,e){e&&e.disconnect(),t==="resize"&&Wc(i)}function Uc(i,t,e){const s=i.canvas,n=so(r=>{i.ctx!==null&&e(Bc(r,i))},i);return Ic(s,t,n),n}class qc extends Co{acquireContext(t,e){const s=t&&t.getContext&&t.getContext("2d");return s&&s.canvas===t?(Rc(t,e),s):null}releaseContext(t){const e=t.canvas;if(!e[di])return!1;const s=e[di].initial;["height","width"].forEach(r=>{const o=s[r];T(o)?e.removeAttribute(r):e.setAttribute(r,o)});const n=s.style||{};return Object.keys(n).forEach(r=>{e.style[r]=n[r]}),e.width=e.width,delete e[di],!0}addEventListener(t,e,s){this.removeEventListener(t,e);const n=t.$proxies||(t.$proxies={}),o={attach:Nc,detach:Vc,resize:jc}[e]||Uc;n[e]=o(t,e,s)}removeEventListener(t,e){const s=t.$proxies||(t.$proxies={}),n=s[e];if(!n)return;({attach:Yi,detach:Yi,resize:Yi}[e]||zc)(t,e,n),s[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,s,n){return Dl(t,e,s,n)}isAttached(t){const e=t&&As(t);return!!(e&&e.isConnected)}}function Yc(i){return!Cs()||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas?Tc:qc}class Mt{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(t){const{x:e,y:s}=this.getProps(["x","y"],t);return{x:e,y:s}}hasValue(){return le(this.x)&&le(this.y)}getProps(t,e){const s=this.$animations;if(!e||!s)return this;const n={};return t.forEach(r=>{n[r]=s[r]&&s[r].active()?s[r]._to:this[r]}),n}}function Gc(i,t){const e=i.options.ticks,s=Xc(i),n=Math.min(e.maxTicksLimit||s,s),r=e.major.enabled?Zc(t):[],o=r.length,a=r[0],l=r[o-1],c=[];if(o>n)return Jc(t,c,r,o/n),c;const h=Kc(r,t,n);if(o>0){let d,u;const f=o>1?Math.round((l-a)/(o-1)):null;for(ii(t,c,h,T(f)?0:a-f,a),d=0,u=o-1;d<u;d++)ii(t,c,h,r[d],r[d+1]);return ii(t,c,h,l,T(f)?t.length:l+f),c}return ii(t,c,h),c}function Xc(i){const t=i.options.offset,e=i._tickSize(),s=i._length/e+(t?0:1),n=i._maxLength/e;return Math.floor(Math.min(s,n))}function Kc(i,t,e){const s=Qc(i),n=t.length/e;if(!s)return Math.max(n,1);const r=Ea(s);for(let o=0,a=r.length-1;o<a;o++){const l=r[o];if(l>n)return l}return Math.max(n,1)}function Zc(i){const t=[];let e,s;for(e=0,s=i.length;e<s;e++)i[e].major&&t.push(e);return t}function Jc(i,t,e,s){let n=0,r=e[0],o;for(s=Math.ceil(s),o=0;o<i.length;o++)o===r&&(t.push(i[o]),n++,r=e[n*s])}function ii(i,t,e,s,n){const r=O(s,0),o=Math.min(O(n,i.length),i.length);let a=0,l,c,h;for(e=Math.ceil(e),n&&(l=n-s,e=l/Math.floor(l/e)),h=r;h<0;)a++,h=Math.round(r+a*e);for(c=Math.max(r,0);c<o;c++)c===h&&(t.push(i[c]),a++,h=Math.round(r+a*e))}function Qc(i){const t=i.length;let e,s;if(t<2)return!1;for(s=i[0],e=1;e<t;++e)if(i[e]-i[e-1]!==s)return!1;return s}const th=i=>i==="left"?"right":i==="right"?"left":i,Mn=(i,t,e)=>t==="top"||t==="left"?i[t]+e:i[t]-e,Pn=(i,t)=>Math.min(t||i,i);function Cn(i,t){const e=[],s=i.length/t,n=i.length;let r=0;for(;r<n;r+=s)e.push(i[Math.floor(r)]);return e}function eh(i,t,e){const s=i.ticks.length,n=Math.min(t,s-1),r=i._startPixel,o=i._endPixel,a=1e-6;let l=i.getPixelForTick(n),c;if(!(e&&(s===1?c=Math.max(l-r,o-l):t===0?c=(i.getPixelForTick(1)-l)/2:c=(l-i.getPixelForTick(n-1))/2,l+=n<t?c:-c,l<r-a||l>o+a)))return l}function ih(i,t){z(i,e=>{const s=e.gc,n=s.length/2;let r;if(n>t){for(r=0;r<n;++r)delete e.data[s[r]];s.splice(0,n)}})}function be(i){return i.drawTicks?i.tickLength:0}function An(i,t){if(!i.display)return 0;const e=Q(i.font,t),s=ot(i.padding);return(q(i.text)?i.text.length:1)*e.lineHeight+s.height}function sh(i,t){return Ft(i,{scale:t,type:"scale"})}function nh(i,t,e){return Ft(i,{tick:e,index:t,type:"tick"})}function rh(i,t,e){let s=ws(i);return(e&&t!=="right"||!e&&t==="right")&&(s=th(s)),s}function oh(i,t,e,s){const{top:n,left:r,bottom:o,right:a,chart:l}=i,{chartArea:c,scales:h}=l;let d=0,u,f,p;const g=o-n,m=a-r;if(i.isHorizontal()){if(f=st(s,r,a),R(e)){const _=Object.keys(e)[0],x=e[_];p=h[_].getPixelForValue(x)+g-t}else e==="center"?p=(c.bottom+c.top)/2+g-t:p=Mn(i,e,t);u=a-r}else{if(R(e)){const _=Object.keys(e)[0],x=e[_];f=h[_].getPixelForValue(x)-m+t}else e==="center"?f=(c.left+c.right)/2-m+t:f=Mn(i,e,t);p=st(s,o,n),d=e==="left"?-Z:Z}return{titleX:f,titleY:p,maxWidth:u,rotation:d}}class Jt extends Mt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:s,_suggestedMax:n}=this;return t=ht(t,Number.POSITIVE_INFINITY),e=ht(e,Number.NEGATIVE_INFINITY),s=ht(s,Number.POSITIVE_INFINITY),n=ht(n,Number.NEGATIVE_INFINITY),{min:ht(t,s),max:ht(e,n),minDefined:X(t),maxDefined:X(e)}}getMinMax(t){let{min:e,max:s,minDefined:n,maxDefined:r}=this.getUserBounds(),o;if(n&&r)return{min:e,max:s};const a=this.getMatchingVisibleMetas();for(let l=0,c=a.length;l<c;++l)o=a[l].controller.getMinMax(this,t),n||(e=Math.min(e,o.min)),r||(s=Math.max(s,o.max));return e=r&&e>s?s:e,s=n&&e>s?e:s,{min:ht(e,ht(s,e)),max:ht(s,ht(e,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){N(this.options.beforeUpdate,[this])}update(t,e,s){const{beginAtZero:n,grace:r,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=s=Object.assign({left:0,right:0,top:0,bottom:0},s),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+s.left+s.right:this.height+s.top+s.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=ll(this,r,n),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=a<this.ticks.length;this._convertTicksToLabels(l?Cn(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=Gc(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,s;this.isHorizontal()?(e=this.left,s=this.right):(e=this.top,s=this.bottom,t=!t),this._startPixel=e,this._endPixel=s,this._reversePixels=t,this._length=s-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){N(this.options.afterUpdate,[this])}beforeSetDimensions(){N(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){N(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),N(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){N(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let s,n,r;for(s=0,n=t.length;s<n;s++)r=t[s],r.label=N(e.callback,[r.value,s,t],this)}afterTickToLabelConversion(){N(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){N(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,s=Pn(this.ticks.length,t.ticks.maxTicksLimit),n=e.minRotation||0,r=e.maxRotation;let o=n,a,l,c;if(!this._isVisible()||!e.display||n>=r||s<=1||!this.isHorizontal()){this.labelRotation=n;return}const h=this._getLabelSizes(),d=h.widest.width,u=h.highest.height,f=tt(this.chart.width-d,0,this.maxWidth);a=t.offset?this.maxWidth/s:f/(s-1),d+6>a&&(a=f/(s-(t.offset?.5:1)),l=this.maxHeight-be(t.grid)-e.padding-An(t.title,this.chart.options.font),c=Math.sqrt(d*d+u*u),o=vs(Math.min(Math.asin(tt((h.highest.height+6)/a,-1,1)),Math.asin(tt(l/c,-1,1))-Math.asin(tt(u/c,-1,1)))),o=Math.max(n,Math.min(r,o))),this.labelRotation=o}afterCalculateLabelRotation(){N(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){N(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:s,title:n,grid:r}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const l=An(n,e.options.font);if(a?(t.width=this.maxWidth,t.height=be(r)+l):(t.height=this.maxHeight,t.width=be(r)+l),s.display&&this.ticks.length){const{first:c,last:h,widest:d,highest:u}=this._getLabelSizes(),f=s.padding*2,p=ft(this.labelRotation),g=Math.cos(p),m=Math.sin(p);if(a){const _=s.mirror?0:m*d.width+g*u.height;t.height=Math.min(this.maxHeight,t.height+_+f)}else{const _=s.mirror?0:g*d.width+m*u.height;t.width=Math.min(this.maxWidth,t.width+_+f)}this._calculatePadding(c,h,m,g)}}this._handleMargins(),a?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,s,n){const{ticks:{align:r,padding:o},position:a}=this.options,l=this.labelRotation!==0,c=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const h=this.getPixelForTick(0)-this.left,d=this.right-this.getPixelForTick(this.ticks.length-1);let u=0,f=0;l?c?(u=n*t.width,f=s*e.height):(u=s*t.height,f=n*e.width):r==="start"?f=e.width:r==="end"?u=t.width:r!=="inner"&&(u=t.width/2,f=e.width/2),this.paddingLeft=Math.max((u-h+o)*this.width/(this.width-h),0),this.paddingRight=Math.max((f-d+o)*this.width/(this.width-d),0)}else{let h=e.height/2,d=t.height/2;r==="start"?(h=0,d=t.height):r==="end"&&(h=e.height,d=0),this.paddingTop=h+o,this.paddingBottom=d+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){N(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,s;for(e=0,s=t.length;e<s;e++)T(t[e].label)&&(t.splice(e,1),s--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let s=this.ticks;e<s.length&&(s=Cn(s,e)),this._labelSizes=t=this._computeLabelSizes(s,s.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,s){const{ctx:n,_longestTextCache:r}=this,o=[],a=[],l=Math.floor(e/Pn(e,s));let c=0,h=0,d,u,f,p,g,m,_,x,y,w,v;for(d=0;d<e;d+=l){if(p=t[d].label,g=this._resolveTickFontOptions(d),n.font=m=g.string,_=r[m]=r[m]||{data:{},gc:[]},x=g.lineHeight,y=w=0,!T(p)&&!q(p))y=mi(n,_.data,_.gc,y,p),w=x;else if(q(p))for(u=0,f=p.length;u<f;++u)v=p[u],!T(v)&&!q(v)&&(y=mi(n,_.data,_.gc,y,v),w+=x);o.push(y),a.push(w),c=Math.max(y,c),h=Math.max(w,h)}ih(r,e);const $=o.indexOf(c),S=a.indexOf(h),M=P=>({width:o[P]||0,height:a[P]||0});return{first:M(0),last:M(e-1),widest:M($),highest:M(S),widths:o,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return Ia(this._alignToPixels?Nt(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const s=e[t];return s.$context||(s.$context=nh(this.getContext(),t,s))}return this.$context||(this.$context=sh(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=ft(this.labelRotation),s=Math.abs(Math.cos(e)),n=Math.abs(Math.sin(e)),r=this._getLabelSizes(),o=t.autoSkipPadding||0,a=r?r.widest.width+o:0,l=r?r.highest.height+o:0;return this.isHorizontal()?l*s>a*n?a/s:l/n:l*n<a*s?l/s:a/n}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,s=this.chart,n=this.options,{grid:r,position:o,border:a}=n,l=r.offset,c=this.isHorizontal(),d=this.ticks.length+(l?1:0),u=be(r),f=[],p=a.setContext(this.getContext()),g=p.display?p.width:0,m=g/2,_=function(W){return Nt(s,W,g)};let x,y,w,v,$,S,M,P,L,E,F,J;if(o==="top")x=_(this.bottom),S=this.bottom-u,P=x-m,E=_(t.top)+m,J=t.bottom;else if(o==="bottom")x=_(this.top),E=t.top,J=_(t.bottom)-m,S=x+m,P=this.top+u;else if(o==="left")x=_(this.right),$=this.right-u,M=x-m,L=_(t.left)+m,F=t.right;else if(o==="right")x=_(this.left),L=t.left,F=_(t.right)-m,$=x+m,M=this.left+u;else if(e==="x"){if(o==="center")x=_((t.top+t.bottom)/2+.5);else if(R(o)){const W=Object.keys(o)[0],K=o[W];x=_(this.chart.scales[W].getPixelForValue(K))}E=t.top,J=t.bottom,S=x+m,P=S+u}else if(e==="y"){if(o==="center")x=_((t.left+t.right)/2);else if(R(o)){const W=Object.keys(o)[0],K=o[W];x=_(this.chart.scales[W].getPixelForValue(K))}$=x-m,M=$-u,L=t.left,F=t.right}const ct=O(n.ticks.maxTicksLimit,d),B=Math.max(1,Math.ceil(d/ct));for(y=0;y<d;y+=B){const W=this.getContext(y),K=r.setContext(W),ut=a.setContext(W),it=K.lineWidth,Qt=K.color,Ge=ut.dash||[],te=ut.dashOffset,fe=K.tickWidth,It=K.tickColor,pe=K.tickBorderDash||[],zt=K.tickBorderDashOffset;w=eh(this,y,l),w!==void 0&&(v=Nt(s,w,it),c?$=M=L=F=v:S=P=E=J=v,f.push({tx1:$,ty1:S,tx2:M,ty2:P,x1:L,y1:E,x2:F,y2:J,width:it,color:Qt,borderDash:Ge,borderDashOffset:te,tickWidth:fe,tickColor:It,tickBorderDash:pe,tickBorderDashOffset:zt}))}return this._ticksLength=d,this._borderValue=x,f}_computeLabelItems(t){const e=this.axis,s=this.options,{position:n,ticks:r}=s,o=this.isHorizontal(),a=this.ticks,{align:l,crossAlign:c,padding:h,mirror:d}=r,u=be(s.grid),f=u+h,p=d?-h:f,g=-ft(this.labelRotation),m=[];let _,x,y,w,v,$,S,M,P,L,E,F,J="middle";if(n==="top")$=this.bottom-p,S=this._getXAxisLabelAlignment();else if(n==="bottom")$=this.top+p,S=this._getXAxisLabelAlignment();else if(n==="left"){const B=this._getYAxisLabelAlignment(u);S=B.textAlign,v=B.x}else if(n==="right"){const B=this._getYAxisLabelAlignment(u);S=B.textAlign,v=B.x}else if(e==="x"){if(n==="center")$=(t.top+t.bottom)/2+f;else if(R(n)){const B=Object.keys(n)[0],W=n[B];$=this.chart.scales[B].getPixelForValue(W)+f}S=this._getXAxisLabelAlignment()}else if(e==="y"){if(n==="center")v=(t.left+t.right)/2-f;else if(R(n)){const B=Object.keys(n)[0],W=n[B];v=this.chart.scales[B].getPixelForValue(W)}S=this._getYAxisLabelAlignment(u).textAlign}e==="y"&&(l==="start"?J="top":l==="end"&&(J="bottom"));const ct=this._getLabelSizes();for(_=0,x=a.length;_<x;++_){y=a[_],w=y.label;const B=r.setContext(this.getContext(_));M=this.getPixelForTick(_)+r.labelOffset,P=this._resolveTickFontOptions(_),L=P.lineHeight,E=q(w)?w.length:1;const W=E/2,K=B.color,ut=B.textStrokeColor,it=B.textStrokeWidth;let Qt=S;o?(v=M,S==="inner"&&(_===x-1?Qt=this.options.reverse?"left":"right":_===0?Qt=this.options.reverse?"right":"left":Qt="center"),n==="top"?c==="near"||g!==0?F=-E*L+L/2:c==="center"?F=-ct.highest.height/2-W*L+L:F=-ct.highest.height+L/2:c==="near"||g!==0?F=L/2:c==="center"?F=ct.highest.height/2-W*L:F=ct.highest.height-E*L,d&&(F*=-1),g!==0&&!B.showLabelBackdrop&&(v+=L/2*Math.sin(g))):($=M,F=(1-E)*L/2);let Ge;if(B.showLabelBackdrop){const te=ot(B.backdropPadding),fe=ct.heights[_],It=ct.widths[_];let pe=F-te.top,zt=0-te.left;switch(J){case"middle":pe-=fe/2;break;case"bottom":pe-=fe;break}switch(S){case"center":zt-=It/2;break;case"right":zt-=It;break;case"inner":_===x-1?zt-=It:_>0&&(zt-=It/2);break}Ge={left:zt,top:pe,width:It+te.width,height:fe+te.height,color:B.backdropColor}}m.push({label:w,font:P,textOffset:F,options:{rotation:g,color:K,strokeColor:ut,strokeWidth:it,textAlign:Qt,textBaseline:J,translation:[v,$],backdrop:Ge}})}return m}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-ft(this.labelRotation))return t==="top"?"left":"right";let n="center";return e.align==="start"?n="left":e.align==="end"?n="right":e.align==="inner"&&(n="inner"),n}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:s,mirror:n,padding:r}}=this.options,o=this._getLabelSizes(),a=t+r,l=o.widest.width;let c,h;return e==="left"?n?(h=this.right+r,s==="near"?c="left":s==="center"?(c="center",h+=l/2):(c="right",h+=l)):(h=this.right-a,s==="near"?c="right":s==="center"?(c="center",h-=l/2):(c="left",h=this.left)):e==="right"?n?(h=this.left+r,s==="near"?c="right":s==="center"?(c="center",h-=l/2):(c="left",h-=l)):(h=this.left+a,s==="near"?c="left":s==="center"?(c="center",h+=l/2):(c="right",h=this.right)):c="right",{textAlign:c,x:h}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:s,top:n,width:r,height:o}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(s,n,r,o),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const n=this.ticks.findIndex(r=>r.value===t);return n>=0?e.setContext(this.getContext(n)).lineWidth:0}drawGrid(t){const e=this.options.grid,s=this.ctx,n=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let r,o;const a=(l,c,h)=>{!h.width||!h.color||(s.save(),s.lineWidth=h.width,s.strokeStyle=h.color,s.setLineDash(h.borderDash||[]),s.lineDashOffset=h.borderDashOffset,s.beginPath(),s.moveTo(l.x,l.y),s.lineTo(c.x,c.y),s.stroke(),s.restore())};if(e.display)for(r=0,o=n.length;r<o;++r){const l=n[r];e.drawOnChartArea&&a({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&a({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:s,grid:n}}=this,r=s.setContext(this.getContext()),o=s.display?r.width:0;if(!o)return;const a=n.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,h,d,u;this.isHorizontal()?(c=Nt(t,this.left,o)-o/2,h=Nt(t,this.right,a)+a/2,d=u=l):(d=Nt(t,this.top,o)-o/2,u=Nt(t,this.bottom,a)+a/2,c=h=l),e.save(),e.lineWidth=r.width,e.strokeStyle=r.color,e.beginPath(),e.moveTo(c,d),e.lineTo(h,u),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const s=this.ctx,n=this._computeLabelArea();n&&Mi(s,n);const r=this.getLabelItems(t);for(const o of r){const a=o.options,l=o.font,c=o.label,h=o.textOffset;Kt(s,c,0,h,l,a)}n&&Pi(s)}drawTitle(){const{ctx:t,options:{position:e,title:s,reverse:n}}=this;if(!s.display)return;const r=Q(s.font),o=ot(s.padding),a=s.align;let l=r.lineHeight/2;e==="bottom"||e==="center"||R(e)?(l+=o.bottom,q(s.text)&&(l+=r.lineHeight*(s.text.length-1))):l+=o.top;const{titleX:c,titleY:h,maxWidth:d,rotation:u}=oh(this,l,e,a);Kt(t,s.text,0,0,r,{color:s.color,maxWidth:d,rotation:u,textAlign:rh(a,e,n),textBaseline:"middle",translation:[c,h]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,s=O(t.grid&&t.grid.z,-1),n=O(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==Jt.prototype.draw?[{z:e,draw:r=>{this.draw(r)}}]:[{z:s,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:n,draw:()=>{this.drawBorder()}},{z:e,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),s=this.axis+"AxisID",n=[];let r,o;for(r=0,o=e.length;r<o;++r){const a=e[r];a[s]===this.id&&(!t||a.type===t)&&n.push(a)}return n}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return Q(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class si{constructor(t,e,s){this.type=t,this.scope=e,this.override=s,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let s;ch(e)&&(s=this.register(e));const n=this.items,r=t.id,o=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+t);return r in n||(n[r]=t,ah(t,o,s),this.override&&Y.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const e=this.items,s=t.id,n=this.scope;s in e&&delete e[s],n&&s in Y[n]&&(delete Y[n][s],this.override&&delete Xt[s])}}function ah(i,t,e){const s=Te(Object.create(null),[e?Y.get(e):{},Y.get(t),i.defaults]);Y.set(t,s),i.defaultRoutes&&lh(t,i.defaultRoutes),i.descriptors&&Y.describe(t,i.descriptors)}function lh(i,t){Object.keys(t).forEach(e=>{const s=e.split("."),n=s.pop(),r=[i].concat(s).join("."),o=t[e].split("."),a=o.pop(),l=o.join(".");Y.route(r,n,l,a)})}function ch(i){return"id"in i&&"defaults"in i}class hh{constructor(){this.controllers=new si(Rt,"datasets",!0),this.elements=new si(Mt,"elements"),this.plugins=new si(Object,"plugins"),this.scales=new si(Jt,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,s){[...e].forEach(n=>{const r=s||this._getRegistryForType(n);s||r.isForType(n)||r===this.plugins&&n.id?this._exec(t,r,n):z(n,o=>{const a=s||this._getRegistryForType(o);this._exec(t,a,o)})})}_exec(t,e,s){const n=xs(t);N(s["before"+n],[],s),e[t](s),N(s["after"+n],[],s)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const s=this._typedRegistries[e];if(s.isForType(t))return s}return this.plugins}_get(t,e,s){const n=e.get(t);if(n===void 0)throw new Error('"'+t+'" is not a registered '+s+".");return n}}var _t=new hh;class dh{constructor(){this._init=void 0}notify(t,e,s,n){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const r=n?this._descriptors(t).filter(n):this._descriptors(t),o=this._notify(r,t,e,s);return e==="afterDestroy"&&(this._notify(r,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),o}_notify(t,e,s,n){n=n||{};for(const r of t){const o=r.plugin,a=o[s],l=[e,n,r.options];if(N(a,l,o)===!1&&n.cancelable)return!1}return!0}invalidate(){T(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const s=t&&t.config,n=O(s.options&&s.options.plugins,{}),r=uh(s);return n===!1&&!e?[]:ph(t,r,n,e)}_notifyStateChanges(t){const e=this._oldCache||[],s=this._cache,n=(r,o)=>r.filter(a=>!o.some(l=>a.plugin.id===l.plugin.id));this._notify(n(e,s),t,"stop"),this._notify(n(s,e),t,"start")}}function uh(i){const t={},e=[],s=Object.keys(_t.plugins.items);for(let r=0;r<s.length;r++)e.push(_t.getPlugin(s[r]));const n=i.plugins||[];for(let r=0;r<n.length;r++){const o=n[r];e.indexOf(o)===-1&&(e.push(o),t[o.id]=!0)}return{plugins:e,localIds:t}}function fh(i,t){return!t&&i===!1?null:i===!0?{}:i}function ph(i,{plugins:t,localIds:e},s,n){const r=[],o=i.getContext();for(const a of t){const l=a.id,c=fh(s[l],n);c!==null&&r.push({plugin:a,options:gh(i.config,{plugin:a,local:e[l]},c,o)})}return r}function gh(i,{plugin:t,local:e},s,n){const r=i.pluginScopeKeys(t),o=i.getOptionScopes(s,r);return e&&t.defaults&&o.push(t.defaults),i.createResolver(o,n,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function ls(i,t){const e=Y.datasets[i]||{};return((t.datasets||{})[i]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function _h(i,t){let e=i;return i==="_index_"?e=t:i==="_value_"&&(e=t==="x"?"y":"x"),e}function mh(i,t){return i===t?"_index_":"_value_"}function Dn(i){if(i==="x"||i==="y"||i==="r")return i}function bh(i){if(i==="top"||i==="bottom")return"x";if(i==="left"||i==="right")return"y"}function cs(i,...t){if(Dn(i))return i;for(const e of t){const s=e.axis||bh(e.position)||i.length>1&&Dn(i[0].toLowerCase());if(s)return s}throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`)}function Ln(i,t,e){if(e[t+"AxisID"]===i)return{axis:t}}function xh(i,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(s=>s.xAxisID===i||s.yAxisID===i);if(e.length)return Ln(i,"x",e[0])||Ln(i,"y",e[0])}return{}}function vh(i,t){const e=Xt[i.type]||{scales:{}},s=t.scales||{},n=ls(i.type,t),r=Object.create(null);return Object.keys(s).forEach(o=>{const a=s[o];if(!R(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const l=cs(o,a,xh(o,i),Y.scales[a.type]),c=mh(l,n),h=e.scales||{};r[o]=Me(Object.create(null),[{axis:l},a,h[l],h[c]])}),i.data.datasets.forEach(o=>{const a=o.type||i.type,l=o.indexAxis||ls(a,t),h=(Xt[a]||{}).scales||{};Object.keys(h).forEach(d=>{const u=_h(d,l),f=o[u+"AxisID"]||u;r[f]=r[f]||Object.create(null),Me(r[f],[{axis:u},s[f],h[d]])})}),Object.keys(r).forEach(o=>{const a=r[o];Me(a,[Y.scales[a.type],Y.scale])}),r}function Lo(i){const t=i.options||(i.options={});t.plugins=O(t.plugins,{}),t.scales=vh(i,t)}function Oo(i){return i=i||{},i.datasets=i.datasets||[],i.labels=i.labels||[],i}function yh(i){return i=i||{},i.data=Oo(i.data),Lo(i),i}const On=new Map,Eo=new Set;function ni(i,t){let e=On.get(i);return e||(e=t(),On.set(i,e),Eo.add(e)),e}const xe=(i,t,e)=>{const s=Et(t,e);s!==void 0&&i.add(s)};class wh{constructor(t){this._config=yh(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=Oo(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),Lo(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return ni(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return ni(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return ni(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,s=this.type;return ni(`${s}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const s=this._scopeCache;let n=s.get(t);return(!n||e)&&(n=new Map,s.set(t,n)),n}getOptionScopes(t,e,s){const{options:n,type:r}=this,o=this._cachedScopes(t,s),a=o.get(e);if(a)return a;const l=new Set;e.forEach(h=>{t&&(l.add(t),h.forEach(d=>xe(l,t,d))),h.forEach(d=>xe(l,n,d)),h.forEach(d=>xe(l,Xt[r]||{},d)),h.forEach(d=>xe(l,Y,d)),h.forEach(d=>xe(l,os,d))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),Eo.has(e)&&o.set(e,c),c}chartOptionScopes(){const{options:t,type:e}=this;return[t,Xt[e]||{},Y.datasets[e]||{},{type:e},Y,os]}resolveNamedOptions(t,e,s,n=[""]){const r={$shared:!0},{resolver:o,subPrefixes:a}=En(this._resolverCache,t,n);let l=o;if($h(o,e)){r.$shared=!1,s=Tt(s)?s():s;const c=this.createResolver(t,s,a);l=ce(o,s,c)}for(const c of e)r[c]=l[c];return r}createResolver(t,e,s=[""],n){const{resolver:r}=En(this._resolverCache,t,s);return R(e)?ce(r,e,void 0,n):r}}function En(i,t,e){let s=i.get(t);s||(s=new Map,i.set(t,s));const n=e.join();let r=s.get(n);return r||(r={resolver:Ss(t,e),subPrefixes:e.filter(a=>!a.toLowerCase().includes("hover"))},s.set(n,r)),r}const kh=i=>R(i)&&Object.getOwnPropertyNames(i).some(t=>Tt(i[t]));function $h(i,t){const{isScriptable:e,isIndexable:s}=co(i);for(const n of t){const r=e(n),o=s(n),a=(o||r)&&i[n];if(r&&(Tt(a)||kh(a))||o&&q(a))return!0}return!1}var Sh="4.5.1";const Mh=["top","bottom","left","right","chartArea"];function Tn(i,t){return i==="top"||i==="bottom"||Mh.indexOf(i)===-1&&t==="x"}function Fn(i,t){return function(e,s){return e[i]===s[i]?e[t]-s[t]:e[i]-s[i]}}function Rn(i){const t=i.chart,e=t.options.animation;t.notifyPlugins("afterRender"),N(e&&e.onComplete,[i],t)}function Ph(i){const t=i.chart,e=t.options.animation;N(e&&e.onProgress,[i],t)}function To(i){return Cs()&&typeof i=="string"?i=document.getElementById(i):i&&i.length&&(i=i[0]),i&&i.canvas&&(i=i.canvas),i}const ui={},In=i=>{const t=To(i);return Object.values(ui).filter(e=>e.canvas===t).pop()};function Ch(i,t,e){const s=Object.keys(i);for(const n of s){const r=+n;if(r>=t){const o=i[n];delete i[n],(e>0||r>t)&&(i[r+e]=o)}}}function Ah(i,t,e,s){return!e||i.type==="mouseout"?null:s?t:i}class Os{static defaults=Y;static instances=ui;static overrides=Xt;static registry=_t;static version=Sh;static getChart=In;static register(...t){_t.add(...t),zn()}static unregister(...t){_t.remove(...t),zn()}constructor(t,e){const s=this.config=new wh(e),n=To(t),r=In(n);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");const o=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||Yc(n)),this.platform.updateConfig(s);const a=this.platform.acquireContext(n,o.aspectRatio),l=a&&a.canvas,c=l&&l.height,h=l&&l.width;if(this.id=$a(),this.ctx=a,this.canvas=l,this.width=h,this.height=c,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new dh,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=Va(d=>this.update(d),o.resizeDelay||0),this._dataChanges=[],ui[this.id]=this,!a||!l){console.error("Failed to create chart: can't acquire context from the given item");return}vt.listen(this,"complete",Rn),vt.listen(this,"progress",Ph),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:s,height:n,_aspectRatio:r}=this;return T(t)?e&&r?r:n?s/n:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return _t}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():on(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return sn(this.canvas,this.ctx),this}stop(){return vt.stop(this),this}resize(t,e){vt.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const s=this.options,n=this.canvas,r=s.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(n,t,e,r),a=s.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,on(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),N(s.onResize,[this,o],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};z(e,(s,n)=>{s.id=n})}buildOrUpdateScales(){const t=this.options,e=t.scales,s=this.scales,n=Object.keys(s).reduce((o,a)=>(o[a]=!1,o),{});let r=[];e&&(r=r.concat(Object.keys(e).map(o=>{const a=e[o],l=cs(o,a),c=l==="r",h=l==="x";return{options:a,dposition:c?"chartArea":h?"bottom":"left",dtype:c?"radialLinear":h?"category":"linear"}}))),z(r,o=>{const a=o.options,l=a.id,c=cs(l,a),h=O(a.type,o.dtype);(a.position===void 0||Tn(a.position,c)!==Tn(o.dposition))&&(a.position=o.dposition),n[l]=!0;let d=null;if(l in s&&s[l].type===h)d=s[l];else{const u=_t.getScale(h);d=new u({id:l,type:h,ctx:this.ctx,chart:this}),s[d.id]=d}d.init(a,t)}),z(n,(o,a)=>{o||delete s[a]}),z(s,o=>{rt.configure(this,o,o.options),rt.addBox(this,o)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,s=t.length;if(t.sort((n,r)=>n.index-r.index),s>e){for(let n=e;n<s;++n)this._destroyDatasetMeta(n);t.splice(e,s-e)}this._sortedMetasets=t.slice(0).sort(Fn("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((s,n)=>{e.filter(r=>r===s._dataset).length===0&&this._destroyDatasetMeta(n)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let s,n;for(this._removeUnreferencedMetasets(),s=0,n=e.length;s<n;s++){const r=e[s];let o=this.getDatasetMeta(s);const a=r.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(s),o=this.getDatasetMeta(s)),o.type=a,o.indexAxis=r.indexAxis||ls(a,this.options),o.order=r.order||0,o.index=s,o.label=""+r.label,o.visible=this.isDatasetVisible(s),o.controller)o.controller.updateIndex(s),o.controller.linkScales();else{const l=_t.getController(a),{datasetElementType:c,dataElementType:h}=Y.datasets[a];Object.assign(l,{dataElementType:_t.getElement(h),datasetElementType:c&&_t.getElement(c)}),o.controller=new l(this,s),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){z(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const s=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),n=this._animationsDisabled=!s.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let c=0,h=this.data.datasets.length;c<h;c++){const{controller:d}=this.getDatasetMeta(c),u=!n&&r.indexOf(d)===-1;d.buildOrUpdateElements(u),o=Math.max(+d.getMaxOverflow(),o)}o=this._minPadding=s.layout.autoPadding?o:0,this._updateLayout(o),n||z(r,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Fn("z","_idx"));const{_active:a,_lastEvent:l}=this;l?this._eventHandler(l,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){z(this.scales,t=>{rt.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),s=new Set(t.events);(!Ys(e,s)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:s,start:n,count:r}of e){const o=s==="_removeElements"?-r:r;Ch(t,n,o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,s=r=>new Set(t.filter(o=>o[0]===r).map((o,a)=>a+","+o.splice(1).join(","))),n=s(0);for(let r=1;r<e;r++)if(!Ys(n,s(r)))return;return Array.from(n).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;rt.update(this,this.width,this.height,t);const e=this.chartArea,s=e.width<=0||e.height<=0;this._layers=[],z(this.boxes,n=>{s&&n.position==="chartArea"||(n.configure&&n.configure(),this._layers.push(...n._layers()))},this),this._layers.forEach((n,r)=>{n._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,s=this.data.datasets.length;e<s;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,s=this.data.datasets.length;e<s;++e)this._updateDataset(e,Tt(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const s=this.getDatasetMeta(t),n={meta:s,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",n)!==!1&&(s.controller._update(e),n.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",n))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(vt.has(this)?this.attached&&!vt.running(this)&&vt.start(this):(this.draw(),Rn({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:s,height:n}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(s,n)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,s=[];let n,r;for(n=0,r=e.length;n<r;++n){const o=e[n];(!t||o.visible)&&s.push(o)}return s}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,s={meta:t,index:t.index,cancelable:!0},n=yo(this,t);this.notifyPlugins("beforeDatasetDraw",s)!==!1&&(n&&Mi(e,n),t.controller.draw(),n&&Pi(e),s.cancelable=!1,this.notifyPlugins("afterDatasetDraw",s))}isPointInArea(t){return St(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,s,n){const r=Mc.modes[e];return typeof r=="function"?r(this,t,s,n):[]}getDatasetMeta(t){const e=this.data.datasets[t],s=this._metasets;let n=s.filter(r=>r&&r._dataset===e).pop();return n||(n={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},s.push(n)),n}getContext(){return this.$context||(this.$context=Ft(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const s=this.getDatasetMeta(t);return typeof s.hidden=="boolean"?!s.hidden:!e.hidden}setDatasetVisibility(t,e){const s=this.getDatasetMeta(t);s.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,s){const n=s?"show":"hide",r=this.getDatasetMeta(t),o=r.controller._resolveAnimations(void 0,n);Fe(e)?(r.data[e].hidden=!s,this.update()):(this.setDatasetVisibility(t,s),o.update(r,{visible:s}),this.update(a=>a.datasetIndex===t?n:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),vt.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),sn(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete ui[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,s=(r,o)=>{e.addEventListener(this,r,o),t[r]=o},n=(r,o,a)=>{r.offsetX=o,r.offsetY=a,this._eventHandler(r)};z(this.options.events,r=>s(r,n))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,s=(l,c)=>{e.addEventListener(this,l,c),t[l]=c},n=(l,c)=>{t[l]&&(e.removeEventListener(this,l,c),delete t[l])},r=(l,c)=>{this.canvas&&this.resize(l,c)};let o;const a=()=>{n("attach",a),this.attached=!0,this.resize(),s("resize",r),s("detach",o)};o=()=>{this.attached=!1,n("resize",r),this._stop(),this._resize(0,0),s("attach",a)},e.isAttached(this.canvas)?a():o()}unbindEvents(){z(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},z(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,s){const n=s?"set":"remove";let r,o,a,l;for(e==="dataset"&&(r=this.getDatasetMeta(t[0].datasetIndex),r.controller["_"+n+"DatasetHoverStyle"]()),a=0,l=t.length;a<l;++a){o=t[a];const c=o&&this.getDatasetMeta(o.datasetIndex).controller;c&&c[n+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],s=t.map(({datasetIndex:r,index:o})=>{const a=this.getDatasetMeta(r);if(!a)throw new Error("No dataset found at index "+r);return{datasetIndex:r,element:a.data[o],index:o}});!pi(s,e)&&(this._active=s,this._lastEvent=null,this._updateHoverStyles(s,e))}notifyPlugins(t,e,s){return this._plugins.notify(this,t,e,s)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,s){const n=this.options.hover,r=(l,c)=>l.filter(h=>!c.some(d=>h.datasetIndex===d.datasetIndex&&h.index===d.index)),o=r(e,t),a=s?t:r(t,e);o.length&&this.updateHoverStyle(o,n.mode,!1),a.length&&n.mode&&this.updateHoverStyle(a,n.mode,!0)}_eventHandler(t,e){const s={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},n=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",s,n)===!1)return;const r=this._handleEvent(t,e,s.inChartArea);return s.cancelable=!1,this.notifyPlugins("afterEvent",s,n),(r||s.changed)&&this.render(),this}_handleEvent(t,e,s){const{_active:n=[],options:r}=this,o=e,a=this._getActiveElements(t,n,s,o),l=Da(t),c=Ah(t,this._lastEvent,s,l);s&&(this._lastEvent=null,N(r.onHover,[t,a,this],this),l&&N(r.onClick,[t,a,this],this));const h=!pi(a,n);return(h||e)&&(this._active=a,this._updateHoverStyles(a,n,e)),this._lastEvent=c,h}_getActiveElements(t,e,s,n){if(t.type==="mouseout")return[];if(!s)return e;const r=this.options.hover;return this.getElementsAtEventForMode(t,r.mode,r,n)}}function zn(){return z(Os.instances,i=>i._plugins.invalidate())}function Dh(i,t,e){const{startAngle:s,x:n,y:r,outerRadius:o,innerRadius:a,options:l}=t,{borderWidth:c,borderJoinStyle:h}=l,d=Math.min(c/o,nt(s-e));if(i.beginPath(),i.arc(n,r,o-c/2,s+d/2,e-d/2),a>0){const u=Math.min(c/a,nt(s-e));i.arc(n,r,a+c/2,e-u/2,s+u/2,!0)}else{const u=Math.min(c/2,o*nt(s-e));if(h==="round")i.arc(n,r,u,e-I/2,s+I/2,!0);else if(h==="bevel"){const f=2*u*u,p=-f*Math.cos(e+I/2)+n,g=-f*Math.sin(e+I/2)+r,m=f*Math.cos(s+I/2)+n,_=f*Math.sin(s+I/2)+r;i.lineTo(p,g),i.lineTo(m,_)}}i.closePath(),i.moveTo(0,0),i.rect(0,0,i.canvas.width,i.canvas.height),i.clip("evenodd")}function Lh(i,t,e){const{startAngle:s,pixelMargin:n,x:r,y:o,outerRadius:a,innerRadius:l}=t;let c=n/a;i.beginPath(),i.arc(r,o,a,s-c,e+c),l>n?(c=n/l,i.arc(r,o,l,e+c,s-c,!0)):i.arc(r,o,n,e+Z,s-Z),i.closePath(),i.clip()}function Oh(i){return $s(i,["outerStart","outerEnd","innerStart","innerEnd"])}function Eh(i,t,e,s){const n=Oh(i.options.borderRadius),r=(e-t)/2,o=Math.min(r,s*t/2),a=l=>{const c=(e-Math.min(r,l))*s/2;return tt(l,0,Math.min(r,c))};return{outerStart:a(n.outerStart),outerEnd:a(n.outerEnd),innerStart:tt(n.innerStart,0,o),innerEnd:tt(n.innerEnd,0,o)}}function ie(i,t,e,s){return{x:e+i*Math.cos(t),y:s+i*Math.sin(t)}}function vi(i,t,e,s,n,r){const{x:o,y:a,startAngle:l,pixelMargin:c,innerRadius:h}=t,d=Math.max(t.outerRadius+s+e-c,0),u=h>0?h+s+e+c:0;let f=0;const p=n-l;if(s){const B=h>0?h-s:0,W=d>0?d-s:0,K=(B+W)/2,ut=K!==0?p*K/(K+s):p;f=(p-ut)/2}const g=Math.max(.001,p*d-e/I)/d,m=(p-g)/2,_=l+m+f,x=n-m-f,{outerStart:y,outerEnd:w,innerStart:v,innerEnd:$}=Eh(t,u,d,x-_),S=d-y,M=d-w,P=_+y/S,L=x-w/M,E=u+v,F=u+$,J=_+v/E,ct=x-$/F;if(i.beginPath(),r){const B=(P+L)/2;if(i.arc(o,a,d,P,B),i.arc(o,a,d,B,L),w>0){const it=ie(M,L,o,a);i.arc(it.x,it.y,w,L,x+Z)}const W=ie(F,x,o,a);if(i.lineTo(W.x,W.y),$>0){const it=ie(F,ct,o,a);i.arc(it.x,it.y,$,x+Z,ct+Math.PI)}const K=(x-$/u+(_+v/u))/2;if(i.arc(o,a,u,x-$/u,K,!0),i.arc(o,a,u,K,_+v/u,!0),v>0){const it=ie(E,J,o,a);i.arc(it.x,it.y,v,J+Math.PI,_-Z)}const ut=ie(S,_,o,a);if(i.lineTo(ut.x,ut.y),y>0){const it=ie(S,P,o,a);i.arc(it.x,it.y,y,_-Z,P)}}else{i.moveTo(o,a);const B=Math.cos(P)*d+o,W=Math.sin(P)*d+a;i.lineTo(B,W);const K=Math.cos(L)*d+o,ut=Math.sin(L)*d+a;i.lineTo(K,ut)}i.closePath()}function Th(i,t,e,s,n){const{fullCircles:r,startAngle:o,circumference:a}=t;let l=t.endAngle;if(r){vi(i,t,e,s,l,n);for(let c=0;c<r;++c)i.fill();isNaN(a)||(l=o+(a%H||H))}return vi(i,t,e,s,l,n),i.fill(),l}function Fh(i,t,e,s,n){const{fullCircles:r,startAngle:o,circumference:a,options:l}=t,{borderWidth:c,borderJoinStyle:h,borderDash:d,borderDashOffset:u,borderRadius:f}=l,p=l.borderAlign==="inner";if(!c)return;i.setLineDash(d||[]),i.lineDashOffset=u,p?(i.lineWidth=c*2,i.lineJoin=h||"round"):(i.lineWidth=c,i.lineJoin=h||"bevel");let g=t.endAngle;if(r){vi(i,t,e,s,g,n);for(let m=0;m<r;++m)i.stroke();isNaN(a)||(g=o+(a%H||H))}p&&Lh(i,t,g),l.selfJoin&&g-o>=I&&f===0&&h!=="miter"&&Dh(i,t,g),r||(vi(i,t,e,s,g,n),i.stroke())}class Rh extends Mt{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,e,s){const n=this.getProps(["x","y"],s),{angle:r,distance:o}=Qr(n,{x:t,y:e}),{startAngle:a,endAngle:l,innerRadius:c,outerRadius:h,circumference:d}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),u=(this.options.spacing+this.options.borderWidth)/2,f=O(d,l-a),p=Re(r,a,l)&&a!==l,g=f>=H||p,m=kt(o,c+u,h+u);return g&&m}getCenterPoint(t){const{x:e,y:s,startAngle:n,endAngle:r,innerRadius:o,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:l,spacing:c}=this.options,h=(n+r)/2,d=(o+a+c+l)/2;return{x:e+Math.cos(h)*d,y:s+Math.sin(h)*d}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:e,circumference:s}=this,n=(e.offset||0)/4,r=(e.spacing||0)/2,o=e.circular;if(this.pixelMargin=e.borderAlign==="inner"?.33:0,this.fullCircles=s>H?Math.floor(s/H):0,s===0||this.innerRadius<0||this.outerRadius<0)return;t.save();const a=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(a)*n,Math.sin(a)*n);const l=1-Math.sin(Math.min(I,s||0)),c=n*l;t.fillStyle=e.backgroundColor,t.strokeStyle=e.borderColor,Th(t,this,c,r,o),Fh(t,this,c,r,o),t.restore()}}function Fo(i,t,e=t){i.lineCap=O(e.borderCapStyle,t.borderCapStyle),i.setLineDash(O(e.borderDash,t.borderDash)),i.lineDashOffset=O(e.borderDashOffset,t.borderDashOffset),i.lineJoin=O(e.borderJoinStyle,t.borderJoinStyle),i.lineWidth=O(e.borderWidth,t.borderWidth),i.strokeStyle=O(e.borderColor,t.borderColor)}function Ih(i,t,e){i.lineTo(e.x,e.y)}function zh(i){return i.stepped?Qa:i.tension||i.cubicInterpolationMode==="monotone"?tl:Ih}function Ro(i,t,e={}){const s=i.length,{start:n=0,end:r=s-1}=e,{start:o,end:a}=t,l=Math.max(n,o),c=Math.min(r,a),h=n<o&&r<o||n>a&&r>a;return{count:s,start:l,loop:t.loop,ilen:c<l&&!h?s+c-l:c-l}}function Bh(i,t,e,s){const{points:n,options:r}=t,{count:o,start:a,loop:l,ilen:c}=Ro(n,e,s),h=zh(r);let{move:d=!0,reverse:u}=s||{},f,p,g;for(f=0;f<=c;++f)p=n[(a+(u?c-f:f))%o],!p.skip&&(d?(i.moveTo(p.x,p.y),d=!1):h(i,g,p,u,r.stepped),g=p);return l&&(p=n[(a+(u?c:0))%o],h(i,g,p,u,r.stepped)),!!l}function Nh(i,t,e,s){const n=t.points,{count:r,start:o,ilen:a}=Ro(n,e,s),{move:l=!0,reverse:c}=s||{};let h=0,d=0,u,f,p,g,m,_;const x=w=>(o+(c?a-w:w))%r,y=()=>{g!==m&&(i.lineTo(h,m),i.lineTo(h,g),i.lineTo(h,_))};for(l&&(f=n[x(0)],i.moveTo(f.x,f.y)),u=0;u<=a;++u){if(f=n[x(u)],f.skip)continue;const w=f.x,v=f.y,$=w|0;$===p?(v<g?g=v:v>m&&(m=v),h=(d*h+w)/++d):(y(),i.lineTo(w,v),p=$,d=0,g=m=v),_=v}y()}function hs(i){const t=i.options,e=t.borderDash&&t.borderDash.length;return!i._decimated&&!i._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?Nh:Bh}function Vh(i){return i.stepped?Ol:i.tension||i.cubicInterpolationMode==="monotone"?El:Ut}function Hh(i,t,e,s){let n=t._path;n||(n=t._path=new Path2D,t.path(n,e,s)&&n.closePath()),Fo(i,t.options),i.stroke(n)}function Wh(i,t,e,s){const{segments:n,options:r}=t,o=hs(t);for(const a of n)Fo(i,r,a.style),i.beginPath(),o(i,t,a,{start:e,end:e+s-1})&&i.closePath(),i.stroke()}const jh=typeof Path2D=="function";function Uh(i,t,e,s){jh&&!t.options.segment?Hh(i,t,e,s):Wh(i,t,e,s)}class Di extends Mt{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const s=this.options;if((s.tension||s.cubicInterpolationMode==="monotone")&&!s.stepped&&!this._pointsUpdated){const n=s.spanGaps?this._loop:this._fullLoop;$l(this._points,s,t,n,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=Bl(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,s=t.length;return s&&e[t[s-1].end]}interpolate(t,e){const s=this.options,n=t[e],r=this.points,o=vo(this,{property:e,start:n,end:n});if(!o.length)return;const a=[],l=Vh(s);let c,h;for(c=0,h=o.length;c<h;++c){const{start:d,end:u}=o[c],f=r[d],p=r[u];if(f===p){a.push(f);continue}const g=Math.abs((n-f[e])/(p[e]-f[e])),m=l(f,p,g,s.stepped);m[e]=t[e],a.push(m)}return a.length===1?a[0]:a}pathSegment(t,e,s){return hs(this)(t,this,e,s)}path(t,e,s){const n=this.segments,r=hs(this);let o=this._loop;e=e||0,s=s||this.points.length-e;for(const a of n)o&=r(t,this,a,{start:e,end:e+s-1});return!!o}draw(t,e,s,n){const r=this.options||{};(this.points||[]).length&&r.borderWidth&&(t.save(),Uh(t,this,s,n),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function Bn(i,t,e,s){const n=i.options,{[e]:r}=i.getProps([e],s);return Math.abs(t-r)<n.radius+n.hitRadius}class qh extends Mt{static id="point";parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,e,s){const n=this.options,{x:r,y:o}=this.getProps(["x","y"],s);return Math.pow(t-r,2)+Math.pow(e-o,2)<Math.pow(n.hitRadius+n.radius,2)}inXRange(t,e){return Bn(this,t,"x",e)}inYRange(t,e){return Bn(this,t,"y",e)}getCenterPoint(t){const{x:e,y:s}=this.getProps(["x","y"],t);return{x:e,y:s}}size(t){t=t||this.options||{};let e=t.radius||0;e=Math.max(e,e&&t.hoverRadius||0);const s=e&&t.borderWidth||0;return(e+s)*2}draw(t,e){const s=this.options;this.skip||s.radius<.1||!St(this,e,this.size(s)/2)||(t.strokeStyle=s.borderColor,t.lineWidth=s.borderWidth,t.fillStyle=s.backgroundColor,as(t,s,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}function Io(i,t){const{x:e,y:s,base:n,width:r,height:o}=i.getProps(["x","y","base","width","height"],t);let a,l,c,h,d;return i.horizontal?(d=o/2,a=Math.min(e,n),l=Math.max(e,n),c=s-d,h=s+d):(d=r/2,a=e-d,l=e+d,c=Math.min(s,n),h=Math.max(s,n)),{left:a,top:c,right:l,bottom:h}}function Lt(i,t,e,s){return i?0:tt(t,e,s)}function Yh(i,t,e){const s=i.options.borderWidth,n=i.borderSkipped,r=lo(s);return{t:Lt(n.top,r.top,0,e),r:Lt(n.right,r.right,0,t),b:Lt(n.bottom,r.bottom,0,e),l:Lt(n.left,r.left,0,t)}}function Gh(i,t,e){const{enableBorderRadius:s}=i.getProps(["enableBorderRadius"]),n=i.options.borderRadius,r=Yt(n),o=Math.min(t,e),a=i.borderSkipped,l=s||R(n);return{topLeft:Lt(!l||a.top||a.left,r.topLeft,0,o),topRight:Lt(!l||a.top||a.right,r.topRight,0,o),bottomLeft:Lt(!l||a.bottom||a.left,r.bottomLeft,0,o),bottomRight:Lt(!l||a.bottom||a.right,r.bottomRight,0,o)}}function Xh(i){const t=Io(i),e=t.right-t.left,s=t.bottom-t.top,n=Yh(i,e/2,s/2),r=Gh(i,e/2,s/2);return{outer:{x:t.left,y:t.top,w:e,h:s,radius:r},inner:{x:t.left+n.l,y:t.top+n.t,w:e-n.l-n.r,h:s-n.t-n.b,radius:{topLeft:Math.max(0,r.topLeft-Math.max(n.t,n.l)),topRight:Math.max(0,r.topRight-Math.max(n.t,n.r)),bottomLeft:Math.max(0,r.bottomLeft-Math.max(n.b,n.l)),bottomRight:Math.max(0,r.bottomRight-Math.max(n.b,n.r))}}}}function Gi(i,t,e,s){const n=t===null,r=e===null,a=i&&!(n&&r)&&Io(i,s);return a&&(n||kt(t,a.left,a.right))&&(r||kt(e,a.top,a.bottom))}function Kh(i){return i.topLeft||i.topRight||i.bottomLeft||i.bottomRight}function Zh(i,t){i.rect(t.x,t.y,t.w,t.h)}function Xi(i,t,e={}){const s=i.x!==e.x?-t:0,n=i.y!==e.y?-t:0,r=(i.x+i.w!==e.x+e.w?t:0)-s,o=(i.y+i.h!==e.y+e.h?t:0)-n;return{x:i.x+s,y:i.y+n,w:i.w+r,h:i.h+o,radius:i.radius}}class Jh extends Mt{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:s,backgroundColor:n}}=this,{inner:r,outer:o}=Xh(this),a=Kh(o.radius)?Ie:Zh;t.save(),(o.w!==r.w||o.h!==r.h)&&(t.beginPath(),a(t,Xi(o,e,r)),t.clip(),a(t,Xi(r,-e,o)),t.fillStyle=s,t.fill("evenodd")),t.beginPath(),a(t,Xi(r,e)),t.fillStyle=n,t.fill(),t.restore()}inRange(t,e,s){return Gi(this,t,e,s)}inXRange(t,e){return Gi(this,t,null,e)}inYRange(t,e){return Gi(this,null,t,e)}getCenterPoint(t){const{x:e,y:s,base:n,horizontal:r}=this.getProps(["x","y","base","horizontal"],t);return{x:r?(e+n)/2:e,y:r?s:(s+n)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}var Qh=Object.freeze({__proto__:null,ArcElement:Rh,BarElement:Jh,LineElement:Di,PointElement:qh});const ds=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Nn=ds.map(i=>i.replace("rgb(","rgba(").replace(")",", 0.5)"));function zo(i){return ds[i%ds.length]}function Bo(i){return Nn[i%Nn.length]}function td(i,t){return i.borderColor=zo(t),i.backgroundColor=Bo(t),++t}function ed(i,t){return i.backgroundColor=i.data.map(()=>zo(t++)),t}function id(i,t){return i.backgroundColor=i.data.map(()=>Bo(t++)),t}function sd(i){let t=0;return(e,s)=>{const n=i.getDatasetMeta(s).controller;n instanceof Ds?t=ed(e,t):n instanceof So?t=id(e,t):n&&(t=td(e,t))}}function Vn(i){let t;for(t in i)if(i[t].borderColor||i[t].backgroundColor)return!0;return!1}function nd(i){return i&&(i.borderColor||i.backgroundColor)}function rd(){return Y.borderColor!=="rgba(0,0,0,0.1)"||Y.backgroundColor!=="rgba(0,0,0,0.1)"}var od={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(i,t,e){if(!e.enabled)return;const{data:{datasets:s},options:n}=i.config,{elements:r}=n,o=Vn(s)||nd(n)||r&&Vn(r)||rd();if(!e.forceOverride&&o)return;const a=sd(i);s.forEach(a)}};function ad(i,t,e,s,n){const r=n.samples||s;if(r>=e)return i.slice(t,t+e);const o=[],a=(e-2)/(r-2);let l=0;const c=t+e-1;let h=t,d,u,f,p,g;for(o[l++]=i[h],d=0;d<r-2;d++){let m=0,_=0,x;const y=Math.floor((d+1)*a)+1+t,w=Math.min(Math.floor((d+2)*a)+1,e)+t,v=w-y;for(x=y;x<w;x++)m+=i[x].x,_+=i[x].y;m/=v,_/=v;const $=Math.floor(d*a)+1+t,S=Math.min(Math.floor((d+1)*a)+1,e)+t,{x:M,y:P}=i[h];for(f=p=-1,x=$;x<S;x++)p=.5*Math.abs((M-m)*(i[x].y-P)-(M-i[x].x)*(_-P)),p>f&&(f=p,u=i[x],g=x);o[l++]=u,h=g}return o[l++]=i[c],o}function ld(i,t,e,s){let n=0,r=0,o,a,l,c,h,d,u,f,p,g;const m=[],_=t+e-1,x=i[t].x,w=i[_].x-x;for(o=t;o<t+e;++o){a=i[o],l=(a.x-x)/w*s,c=a.y;const v=l|0;if(v===h)c<p?(p=c,d=o):c>g&&(g=c,u=o),n=(r*n+a.x)/++r;else{const $=o-1;if(!T(d)&&!T(u)){const S=Math.min(d,u),M=Math.max(d,u);S!==f&&S!==$&&m.push({...i[S],x:n}),M!==f&&M!==$&&m.push({...i[M],x:n})}o>0&&$!==f&&m.push(i[$]),m.push(a),h=v,r=0,p=g=c,d=u=f=o}}return m}function No(i){if(i._decimated){const t=i._data;delete i._decimated,delete i._data,Object.defineProperty(i,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Hn(i){i.data.datasets.forEach(t=>{No(t)})}function cd(i,t){const e=t.length;let s=0,n;const{iScale:r}=i,{min:o,max:a,minDefined:l,maxDefined:c}=r.getUserBounds();return l&&(s=tt($t(t,r.axis,o).lo,0,e-1)),c?n=tt($t(t,r.axis,a).hi+1,s,e)-s:n=e-s,{start:s,count:n}}var hd={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(i,t,e)=>{if(!e.enabled){Hn(i);return}const s=i.width;i.data.datasets.forEach((n,r)=>{const{_data:o,indexAxis:a}=n,l=i.getDatasetMeta(r),c=o||n.data;if(ke([a,i.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const h=i.scales[l.xAxisID];if(h.type!=="linear"&&h.type!=="time"||i.options.parsing)return;let{start:d,count:u}=cd(l,c);const f=e.threshold||4*s;if(u<=f){No(n);return}T(o)&&(n._data=c,delete n.data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(g){this._data=g}}));let p;switch(e.algorithm){case"lttb":p=ad(c,d,u,s,e);break;case"min-max":p=ld(c,d,u,s);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}n._decimated=p})},destroy(i){Hn(i)}};function dd(i,t,e){const s=i.segments,n=i.points,r=t.points,o=[];for(const a of s){let{start:l,end:c}=a;c=Li(l,c,n);const h=us(e,n[l],n[c],a.loop);if(!t.segments){o.push({source:a,target:h,start:n[l],end:n[c]});continue}const d=vo(t,h);for(const u of d){const f=us(e,r[u.start],r[u.end],u.loop),p=xo(a,n,f);for(const g of p)o.push({source:g,target:u,start:{[e]:Wn(h,f,"start",Math.max)},end:{[e]:Wn(h,f,"end",Math.min)}})}}return o}function us(i,t,e,s){if(s)return;let n=t[i],r=e[i];return i==="angle"&&(n=nt(n),r=nt(r)),{property:i,start:n,end:r}}function ud(i,t){const{x:e=null,y:s=null}=i||{},n=t.points,r=[];return t.segments.forEach(({start:o,end:a})=>{a=Li(o,a,n);const l=n[o],c=n[a];s!==null?(r.push({x:l.x,y:s}),r.push({x:c.x,y:s})):e!==null&&(r.push({x:e,y:l.y}),r.push({x:e,y:c.y}))}),r}function Li(i,t,e){for(;t>i;t--){const s=e[t];if(!isNaN(s.x)&&!isNaN(s.y))break}return t}function Wn(i,t,e,s){return i&&t?s(i[e],t[e]):i?i[e]:t?t[e]:0}function Vo(i,t){let e=[],s=!1;return q(i)?(s=!0,e=i):e=ud(i,t),e.length?new Di({points:e,options:{tension:0},_loop:s,_fullLoop:s}):null}function jn(i){return i&&i.fill!==!1}function fd(i,t,e){let n=i[t].fill;const r=[t];let o;if(!e)return n;for(;n!==!1&&r.indexOf(n)===-1;){if(!X(n))return n;if(o=i[n],!o)return!1;if(o.visible)return n;r.push(n),n=o.fill}return!1}function pd(i,t,e){const s=bd(i);if(R(s))return isNaN(s.value)?!1:s;let n=parseFloat(s);return X(n)&&Math.floor(n)===n?gd(s[0],t,n,e):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function gd(i,t,e,s){return(i==="-"||i==="+")&&(e=t+e),e===t||e<0||e>=s?!1:e}function _d(i,t){let e=null;return i==="start"?e=t.bottom:i==="end"?e=t.top:R(i)?e=t.getPixelForValue(i.value):t.getBasePixel&&(e=t.getBasePixel()),e}function md(i,t,e){let s;return i==="start"?s=e:i==="end"?s=t.options.reverse?t.min:t.max:R(i)?s=i.value:s=t.getBaseValue(),s}function bd(i){const t=i.options,e=t.fill;let s=O(e&&e.target,e);return s===void 0&&(s=!!t.backgroundColor),s===!1||s===null?!1:s===!0?"origin":s}function xd(i){const{scale:t,index:e,line:s}=i,n=[],r=s.segments,o=s.points,a=vd(t,e);a.push(Vo({x:null,y:t.bottom},s));for(let l=0;l<r.length;l++){const c=r[l];for(let h=c.start;h<=c.end;h++)yd(n,o[h],a)}return new Di({points:n,options:{}})}function vd(i,t){const e=[],s=i.getMatchingVisibleMetas("line");for(let n=0;n<s.length;n++){const r=s[n];if(r.index===t)break;r.hidden||e.unshift(r.dataset)}return e}function yd(i,t,e){const s=[];for(let n=0;n<e.length;n++){const r=e[n],{first:o,last:a,point:l}=wd(r,t,"x");if(!(!l||o&&a)){if(o)s.unshift(l);else if(i.push(l),!a)break}}i.push(...s)}function wd(i,t,e){const s=i.interpolate(t,e);if(!s)return{};const n=s[e],r=i.segments,o=i.points;let a=!1,l=!1;for(let c=0;c<r.length;c++){const h=r[c],d=o[h.start][e],u=o[h.end][e];if(kt(n,d,u)){a=n===d,l=n===u;break}}return{first:a,last:l,point:s}}class Ho{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,s){const{x:n,y:r,radius:o}=this;return e=e||{start:0,end:H},t.arc(n,r,o,e.end,e.start,!0),!s.bounds}interpolate(t){const{x:e,y:s,radius:n}=this,r=t.angle;return{x:e+Math.cos(r)*n,y:s+Math.sin(r)*n,angle:r}}}function kd(i){const{chart:t,fill:e,line:s}=i;if(X(e))return $d(t,e);if(e==="stack")return xd(i);if(e==="shape")return!0;const n=Sd(i);return n instanceof Ho?n:Vo(n,s)}function $d(i,t){const e=i.getDatasetMeta(t);return e&&i.isDatasetVisible(t)?e.dataset:null}function Sd(i){return(i.scale||{}).getPointPositionForValue?Pd(i):Md(i)}function Md(i){const{scale:t={},fill:e}=i,s=_d(e,t);if(X(s)){const n=t.isHorizontal();return{x:n?s:null,y:n?null:s}}return null}function Pd(i){const{scale:t,fill:e}=i,s=t.options,n=t.getLabels().length,r=s.reverse?t.max:t.min,o=md(e,t,r),a=[];if(s.grid.circular){const l=t.getPointPositionForValue(0,r);return new Ho({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(o)})}for(let l=0;l<n;++l)a.push(t.getPointPositionForValue(l,o));return a}function Ki(i,t,e){const s=kd(t),{chart:n,index:r,line:o,scale:a,axis:l}=t,c=o.options,h=c.fill,d=c.backgroundColor,{above:u=d,below:f=d}=h||{},p=n.getDatasetMeta(r),g=yo(n,p);s&&o.points.length&&(Mi(i,e),Cd(i,{line:o,target:s,above:u,below:f,area:e,scale:a,axis:l,clip:g}),Pi(i))}function Cd(i,t){const{line:e,target:s,above:n,below:r,area:o,scale:a,clip:l}=t,c=e._loop?"angle":t.axis;i.save();let h=r;r!==n&&(c==="x"?(Un(i,s,o.top),Zi(i,{line:e,target:s,color:n,scale:a,property:c,clip:l}),i.restore(),i.save(),Un(i,s,o.bottom)):c==="y"&&(qn(i,s,o.left),Zi(i,{line:e,target:s,color:r,scale:a,property:c,clip:l}),i.restore(),i.save(),qn(i,s,o.right),h=n)),Zi(i,{line:e,target:s,color:h,scale:a,property:c,clip:l}),i.restore()}function Un(i,t,e){const{segments:s,points:n}=t;let r=!0,o=!1;i.beginPath();for(const a of s){const{start:l,end:c}=a,h=n[l],d=n[Li(l,c,n)];r?(i.moveTo(h.x,h.y),r=!1):(i.lineTo(h.x,e),i.lineTo(h.x,h.y)),o=!!t.pathSegment(i,a,{move:o}),o?i.closePath():i.lineTo(d.x,e)}i.lineTo(t.first().x,e),i.closePath(),i.clip()}function qn(i,t,e){const{segments:s,points:n}=t;let r=!0,o=!1;i.beginPath();for(const a of s){const{start:l,end:c}=a,h=n[l],d=n[Li(l,c,n)];r?(i.moveTo(h.x,h.y),r=!1):(i.lineTo(e,h.y),i.lineTo(h.x,h.y)),o=!!t.pathSegment(i,a,{move:o}),o?i.closePath():i.lineTo(e,d.y)}i.lineTo(e,t.first().y),i.closePath(),i.clip()}function Zi(i,t){const{line:e,target:s,property:n,color:r,scale:o,clip:a}=t,l=dd(e,s,n);for(const{source:c,target:h,start:d,end:u}of l){const{style:{backgroundColor:f=r}={}}=c,p=s!==!0;i.save(),i.fillStyle=f,Ad(i,o,a,p&&us(n,d,u)),i.beginPath();const g=!!e.pathSegment(i,c);let m;if(p){g?i.closePath():Yn(i,s,u,n);const _=!!s.pathSegment(i,h,{move:g,reverse:!0});m=g&&_,m||Yn(i,s,d,n)}i.closePath(),i.fill(m?"evenodd":"nonzero"),i.restore()}}function Ad(i,t,e,s){const n=t.chart.chartArea,{property:r,start:o,end:a}=s||{};if(r==="x"||r==="y"){let l,c,h,d;r==="x"?(l=o,c=n.top,h=a,d=n.bottom):(l=n.left,c=o,h=n.right,d=a),i.beginPath(),e&&(l=Math.max(l,e.left),h=Math.min(h,e.right),c=Math.max(c,e.top),d=Math.min(d,e.bottom)),i.rect(l,c,h-l,d-c),i.clip()}}function Yn(i,t,e,s){const n=t.interpolate(e,s);n&&i.lineTo(n.x,n.y)}var Dd={id:"filler",afterDatasetsUpdate(i,t,e){const s=(i.data.datasets||[]).length,n=[];let r,o,a,l;for(o=0;o<s;++o)r=i.getDatasetMeta(o),a=r.dataset,l=null,a&&a.options&&a instanceof Di&&(l={visible:i.isDatasetVisible(o),index:o,fill:pd(a,o,s),chart:i,axis:r.controller.options.indexAxis,scale:r.vScale,line:a}),r.$filler=l,n.push(l);for(o=0;o<s;++o)l=n[o],!(!l||l.fill===!1)&&(l.fill=fd(n,o,e.propagate))},beforeDraw(i,t,e){const s=e.drawTime==="beforeDraw",n=i.getSortedVisibleDatasetMetas(),r=i.chartArea;for(let o=n.length-1;o>=0;--o){const a=n[o].$filler;a&&(a.line.updateControlPoints(r,a.axis),s&&a.fill&&Ki(i.ctx,a,r))}},beforeDatasetsDraw(i,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const s=i.getSortedVisibleDatasetMetas();for(let n=s.length-1;n>=0;--n){const r=s[n].$filler;jn(r)&&Ki(i.ctx,r,i.chartArea)}},beforeDatasetDraw(i,t,e){const s=t.meta.$filler;!jn(s)||e.drawTime!=="beforeDatasetDraw"||Ki(i.ctx,s,i.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Gn=(i,t)=>{let{boxHeight:e=t,boxWidth:s=t}=i;return i.usePointStyle&&(e=Math.min(e,t),s=i.pointStyleWidth||Math.min(s,t)),{boxWidth:s,boxHeight:e,itemHeight:Math.max(t,e)}},Ld=(i,t)=>i!==null&&t!==null&&i.datasetIndex===t.datasetIndex&&i.index===t.index;class Xn extends Mt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,s){this.maxWidth=t,this.maxHeight=e,this._margins=s,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=N(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(s=>t.filter(s,this.chart.data))),t.sort&&(e=e.sort((s,n)=>t.sort(s,n,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const s=t.labels,n=Q(s.font),r=n.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:l}=Gn(s,r);let c,h;e.font=n.string,this.isHorizontal()?(c=this.maxWidth,h=this._fitRows(o,r,a,l)+10):(h=this.maxHeight,c=this._fitCols(o,n,a,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,e,s,n){const{ctx:r,maxWidth:o,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],h=n+a;let d=t;r.textAlign="left",r.textBaseline="middle";let u=-1,f=-h;return this.legendItems.forEach((p,g)=>{const m=s+e/2+r.measureText(p.text).width;(g===0||c[c.length-1]+m+2*a>o)&&(d+=h,c[c.length-(g>0?0:1)]=0,f+=h,u++),l[g]={left:0,top:f,row:u,width:m,height:n},c[c.length-1]+=m+a}),d}_fitCols(t,e,s,n){const{ctx:r,maxHeight:o,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],h=o-t;let d=a,u=0,f=0,p=0,g=0;return this.legendItems.forEach((m,_)=>{const{itemWidth:x,itemHeight:y}=Od(s,e,r,m,n);_>0&&f+y+2*a>h&&(d+=u+a,c.push({width:u,height:f}),p+=u+a,g++,u=f=0),l[_]={left:p,top:f,col:g,width:x,height:y},u=Math.max(u,x),f+=y+a}),d+=u,c.push({width:u,height:f}),d}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:s,labels:{padding:n},rtl:r}}=this,o=ae(r,this.left,this.width);if(this.isHorizontal()){let a=0,l=st(s,this.left+n,this.right-this.lineWidths[a]);for(const c of e)a!==c.row&&(a=c.row,l=st(s,this.left+n,this.right-this.lineWidths[a])),c.top+=this.top+t+n,c.left=o.leftForLtr(o.x(l),c.width),l+=c.width+n}else{let a=0,l=st(s,this.top+t+n,this.bottom-this.columnSizes[a].height);for(const c of e)c.col!==a&&(a=c.col,l=st(s,this.top+t+n,this.bottom-this.columnSizes[a].height)),c.top=l,c.left+=this.left+n,c.left=o.leftForLtr(o.x(c.left),c.width),l+=c.height+n}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Mi(t,this),this._draw(),Pi(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:s,ctx:n}=this,{align:r,labels:o}=t,a=Y.color,l=ae(t.rtl,this.left,this.width),c=Q(o.font),{padding:h}=o,d=c.size,u=d/2;let f;this.drawTitle(),n.textAlign=l.textAlign("left"),n.textBaseline="middle",n.lineWidth=.5,n.font=c.string;const{boxWidth:p,boxHeight:g,itemHeight:m}=Gn(o,d),_=function($,S,M){if(isNaN(p)||p<=0||isNaN(g)||g<0)return;n.save();const P=O(M.lineWidth,1);if(n.fillStyle=O(M.fillStyle,a),n.lineCap=O(M.lineCap,"butt"),n.lineDashOffset=O(M.lineDashOffset,0),n.lineJoin=O(M.lineJoin,"miter"),n.lineWidth=P,n.strokeStyle=O(M.strokeStyle,a),n.setLineDash(O(M.lineDash,[])),o.usePointStyle){const L={radius:g*Math.SQRT2/2,pointStyle:M.pointStyle,rotation:M.rotation,borderWidth:P},E=l.xPlus($,p/2),F=S+u;ao(n,L,E,F,o.pointStyleWidth&&p)}else{const L=S+Math.max((d-g)/2,0),E=l.leftForLtr($,p),F=Yt(M.borderRadius);n.beginPath(),Object.values(F).some(J=>J!==0)?Ie(n,{x:E,y:L,w:p,h:g,radius:F}):n.rect(E,L,p,g),n.fill(),P!==0&&n.stroke()}n.restore()},x=function($,S,M){Kt(n,M.text,$,S+m/2,c,{strikethrough:M.hidden,textAlign:l.textAlign(M.textAlign)})},y=this.isHorizontal(),w=this._computeTitleHeight();y?f={x:st(r,this.left+h,this.right-s[0]),y:this.top+h+w,line:0}:f={x:this.left+h,y:st(r,this.top+w+h,this.bottom-e[0].height),line:0},_o(this.ctx,t.textDirection);const v=m+h;this.legendItems.forEach(($,S)=>{n.strokeStyle=$.fontColor,n.fillStyle=$.fontColor;const M=n.measureText($.text).width,P=l.textAlign($.textAlign||($.textAlign=o.textAlign)),L=p+u+M;let E=f.x,F=f.y;l.setWidth(this.width),y?S>0&&E+L+h>this.right&&(F=f.y+=v,f.line++,E=f.x=st(r,this.left+h,this.right-s[f.line])):S>0&&F+v>this.bottom&&(E=f.x=E+e[f.line].width+h,f.line++,F=f.y=st(r,this.top+w+h,this.bottom-e[f.line].height));const J=l.x(E);if(_(J,F,$),E=Ha(P,E+p+u,y?E+L:this.right,t.rtl),x(l.x(E),F,$),y)f.x+=L+h;else if(typeof $.text!="string"){const ct=c.lineHeight;f.y+=Wo($,ct)+h}else f.y+=v}),mo(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,s=Q(e.font),n=ot(e.padding);if(!e.display)return;const r=ae(t.rtl,this.left,this.width),o=this.ctx,a=e.position,l=s.size/2,c=n.top+l;let h,d=this.left,u=this.width;if(this.isHorizontal())u=Math.max(...this.lineWidths),h=this.top+c,d=st(t.align,d,this.right-u);else{const p=this.columnSizes.reduce((g,m)=>Math.max(g,m.height),0);h=c+st(t.align,this.top,this.bottom-p-t.labels.padding-this._computeTitleHeight())}const f=st(a,d,d+u);o.textAlign=r.textAlign(ws(a)),o.textBaseline="middle",o.strokeStyle=e.color,o.fillStyle=e.color,o.font=s.string,Kt(o,e.text,f,h,s)}_computeTitleHeight(){const t=this.options.title,e=Q(t.font),s=ot(t.padding);return t.display?e.lineHeight+s.height:0}_getLegendItemAt(t,e){let s,n,r;if(kt(t,this.left,this.right)&&kt(e,this.top,this.bottom)){for(r=this.legendHitBoxes,s=0;s<r.length;++s)if(n=r[s],kt(t,n.left,n.left+n.width)&&kt(e,n.top,n.top+n.height))return this.legendItems[s]}return null}handleEvent(t){const e=this.options;if(!Fd(t.type,e))return;const s=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const n=this._hoveredItem,r=Ld(n,s);n&&!r&&N(e.onLeave,[t,n,this],this),this._hoveredItem=s,s&&!r&&N(e.onHover,[t,s,this],this)}else s&&N(e.onClick,[t,s,this],this)}}function Od(i,t,e,s,n){const r=Ed(s,i,t,e),o=Td(n,s,t.lineHeight);return{itemWidth:r,itemHeight:o}}function Ed(i,t,e,s){let n=i.text;return n&&typeof n!="string"&&(n=n.reduce((r,o)=>r.length>o.length?r:o)),t+e.size/2+s.measureText(n).width}function Td(i,t,e){let s=i;return typeof t.text!="string"&&(s=Wo(t,e)),s}function Wo(i,t){const e=i.text?i.text.length:0;return t*e}function Fd(i,t){return!!((i==="mousemove"||i==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(i==="click"||i==="mouseup"))}var Rd={id:"legend",_element:Xn,start(i,t,e){const s=i.legend=new Xn({ctx:i.ctx,options:e,chart:i});rt.configure(i,s,e),rt.addBox(i,s)},stop(i){rt.removeBox(i,i.legend),delete i.legend},beforeUpdate(i,t,e){const s=i.legend;rt.configure(i,s,e),s.options=e},afterUpdate(i){const t=i.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(i,t){t.replay||i.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(i,t,e){const s=t.datasetIndex,n=e.chart;n.isDatasetVisible(s)?(n.hide(s),t.hidden=!0):(n.show(s),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:i=>i.chart.options.color,boxWidth:40,padding:10,generateLabels(i){const t=i.data.datasets,{labels:{usePointStyle:e,pointStyle:s,textAlign:n,color:r,useBorderRadius:o,borderRadius:a}}=i.legend.options;return i._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(e?0:void 0),h=ot(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:r,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:c.borderColor,pointStyle:s||c.pointStyle,rotation:c.rotation,textAlign:n||c.textAlign,borderRadius:o&&(a||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:i=>i.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:i=>!i.startsWith("on"),labels:{_scriptable:i=>!["generateLabels","filter","sort"].includes(i)}}};class Es extends Mt{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const s=this.options;if(this.left=0,this.top=0,!s.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const n=q(s.text)?s.text.length:1;this._padding=ot(s.padding);const r=n*Q(s.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=r:this.width=r}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:s,bottom:n,right:r,options:o}=this,a=o.align;let l=0,c,h,d;return this.isHorizontal()?(h=st(a,s,r),d=e+t,c=r-s):(o.position==="left"?(h=s+t,d=st(a,n,e),l=I*-.5):(h=r-t,d=st(a,e,n),l=I*.5),c=n-e),{titleX:h,titleY:d,maxWidth:c,rotation:l}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const s=Q(e.font),r=s.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:l,rotation:c}=this._drawArgs(r);Kt(t,e.text,0,0,s,{color:e.color,maxWidth:l,rotation:c,textAlign:ws(e.align),textBaseline:"middle",translation:[o,a]})}}function Id(i,t){const e=new Es({ctx:i.ctx,options:t,chart:i});rt.configure(i,e,t),rt.addBox(i,e),i.titleBlock=e}var zd={id:"title",_element:Es,start(i,t,e){Id(i,e)},stop(i){const t=i.titleBlock;rt.removeBox(i,t),delete i.titleBlock},beforeUpdate(i,t,e){const s=i.titleBlock;rt.configure(i,s,e),s.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const ri=new WeakMap;var Bd={id:"subtitle",start(i,t,e){const s=new Es({ctx:i.ctx,options:e,chart:i});rt.configure(i,s,e),rt.addBox(i,s),ri.set(i,s)},stop(i){rt.removeBox(i,ri.get(i)),ri.delete(i)},beforeUpdate(i,t,e){const s=ri.get(i);rt.configure(i,s,e),s.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Se={average(i){if(!i.length)return!1;let t,e,s=new Set,n=0,r=0;for(t=0,e=i.length;t<e;++t){const a=i[t].element;if(a&&a.hasValue()){const l=a.tooltipPosition();s.add(l.x),n+=l.y,++r}}return r===0||s.size===0?!1:{x:[...s].reduce((a,l)=>a+l)/s.size,y:n/r}},nearest(i,t){if(!i.length)return!1;let e=t.x,s=t.y,n=Number.POSITIVE_INFINITY,r,o,a;for(r=0,o=i.length;r<o;++r){const l=i[r].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),h=rs(t,c);h<n&&(n=h,a=l)}}if(a){const l=a.tooltipPosition();e=l.x,s=l.y}return{x:e,y:s}}};function gt(i,t){return t&&(q(t)?Array.prototype.push.apply(i,t):i.push(t)),i}function yt(i){return(typeof i=="string"||i instanceof String)&&i.indexOf(`
`)>-1?i.split(`
`):i}function Nd(i,t){const{element:e,datasetIndex:s,index:n}=t,r=i.getDatasetMeta(s).controller,{label:o,value:a}=r.getLabelAndValue(n);return{chart:i,label:o,parsed:r.getParsed(n),raw:i.data.datasets[s].data[n],formattedValue:a,dataset:r.getDataset(),dataIndex:n,datasetIndex:s,element:e}}function Kn(i,t){const e=i.chart.ctx,{body:s,footer:n,title:r}=i,{boxWidth:o,boxHeight:a}=t,l=Q(t.bodyFont),c=Q(t.titleFont),h=Q(t.footerFont),d=r.length,u=n.length,f=s.length,p=ot(t.padding);let g=p.height,m=0,_=s.reduce((w,v)=>w+v.before.length+v.lines.length+v.after.length,0);if(_+=i.beforeBody.length+i.afterBody.length,d&&(g+=d*c.lineHeight+(d-1)*t.titleSpacing+t.titleMarginBottom),_){const w=t.displayColors?Math.max(a,l.lineHeight):l.lineHeight;g+=f*w+(_-f)*l.lineHeight+(_-1)*t.bodySpacing}u&&(g+=t.footerMarginTop+u*h.lineHeight+(u-1)*t.footerSpacing);let x=0;const y=function(w){m=Math.max(m,e.measureText(w).width+x)};return e.save(),e.font=c.string,z(i.title,y),e.font=l.string,z(i.beforeBody.concat(i.afterBody),y),x=t.displayColors?o+2+t.boxPadding:0,z(s,w=>{z(w.before,y),z(w.lines,y),z(w.after,y)}),x=0,e.font=h.string,z(i.footer,y),e.restore(),m+=p.width,{width:m,height:g}}function Vd(i,t){const{y:e,height:s}=t;return e<s/2?"top":e>i.height-s/2?"bottom":"center"}function Hd(i,t,e,s){const{x:n,width:r}=s,o=e.caretSize+e.caretPadding;if(i==="left"&&n+r+o>t.width||i==="right"&&n-r-o<0)return!0}function Wd(i,t,e,s){const{x:n,width:r}=e,{width:o,chartArea:{left:a,right:l}}=i;let c="center";return s==="center"?c=n<=(a+l)/2?"left":"right":n<=r/2?c="left":n>=o-r/2&&(c="right"),Hd(c,i,t,e)&&(c="center"),c}function Zn(i,t,e){const s=e.yAlign||t.yAlign||Vd(i,e);return{xAlign:e.xAlign||t.xAlign||Wd(i,t,e,s),yAlign:s}}function jd(i,t){let{x:e,width:s}=i;return t==="right"?e-=s:t==="center"&&(e-=s/2),e}function Ud(i,t,e){let{y:s,height:n}=i;return t==="top"?s+=e:t==="bottom"?s-=n+e:s-=n/2,s}function Jn(i,t,e,s){const{caretSize:n,caretPadding:r,cornerRadius:o}=i,{xAlign:a,yAlign:l}=e,c=n+r,{topLeft:h,topRight:d,bottomLeft:u,bottomRight:f}=Yt(o);let p=jd(t,a);const g=Ud(t,l,c);return l==="center"?a==="left"?p+=c:a==="right"&&(p-=c):a==="left"?p-=Math.max(h,u)+n:a==="right"&&(p+=Math.max(d,f)+n),{x:tt(p,0,s.width-t.width),y:tt(g,0,s.height-t.height)}}function oi(i,t,e){const s=ot(e.padding);return t==="center"?i.x+i.width/2:t==="right"?i.x+i.width-s.right:i.x+s.left}function Qn(i){return gt([],yt(i))}function qd(i,t,e){return Ft(i,{tooltip:t,tooltipItems:e,type:"tooltip"})}function tr(i,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?i.override(e):i}const jo={beforeTitle:bt,title(i){if(i.length>0){const t=i[0],e=t.chart.data.labels,s=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(s>0&&t.dataIndex<s)return e[t.dataIndex]}return""},afterTitle:bt,beforeBody:bt,beforeLabel:bt,label(i){if(this&&this.options&&this.options.mode==="dataset")return i.label+": "+i.formattedValue||i.formattedValue;let t=i.dataset.label||"";t&&(t+=": ");const e=i.formattedValue;return T(e)||(t+=e),t},labelColor(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:bt,afterBody:bt,beforeFooter:bt,footer:bt,afterFooter:bt};function at(i,t,e,s){const n=i[t].call(e,s);return typeof n>"u"?jo[t].call(e,s):n}class er extends Mt{static positioners=Se;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,s=this.options.setContext(this.getContext()),n=s.enabled&&e.options.animation&&s.animations,r=new wo(this.chart,n);return n._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=qd(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:s}=e,n=at(s,"beforeTitle",this,t),r=at(s,"title",this,t),o=at(s,"afterTitle",this,t);let a=[];return a=gt(a,yt(n)),a=gt(a,yt(r)),a=gt(a,yt(o)),a}getBeforeBody(t,e){return Qn(at(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:s}=e,n=[];return z(t,r=>{const o={before:[],lines:[],after:[]},a=tr(s,r);gt(o.before,yt(at(a,"beforeLabel",this,r))),gt(o.lines,at(a,"label",this,r)),gt(o.after,yt(at(a,"afterLabel",this,r))),n.push(o)}),n}getAfterBody(t,e){return Qn(at(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:s}=e,n=at(s,"beforeFooter",this,t),r=at(s,"footer",this,t),o=at(s,"afterFooter",this,t);let a=[];return a=gt(a,yt(n)),a=gt(a,yt(r)),a=gt(a,yt(o)),a}_createItems(t){const e=this._active,s=this.chart.data,n=[],r=[],o=[];let a=[],l,c;for(l=0,c=e.length;l<c;++l)a.push(Nd(this.chart,e[l]));return t.filter&&(a=a.filter((h,d,u)=>t.filter(h,d,u,s))),t.itemSort&&(a=a.sort((h,d)=>t.itemSort(h,d,s))),z(a,h=>{const d=tr(t.callbacks,h);n.push(at(d,"labelColor",this,h)),r.push(at(d,"labelPointStyle",this,h)),o.push(at(d,"labelTextColor",this,h))}),this.labelColors=n,this.labelPointStyles=r,this.labelTextColors=o,this.dataPoints=a,a}update(t,e){const s=this.options.setContext(this.getContext()),n=this._active;let r,o=[];if(!n.length)this.opacity!==0&&(r={opacity:0});else{const a=Se[s.position].call(this,n,this._eventPosition);o=this._createItems(s),this.title=this.getTitle(o,s),this.beforeBody=this.getBeforeBody(o,s),this.body=this.getBody(o,s),this.afterBody=this.getAfterBody(o,s),this.footer=this.getFooter(o,s);const l=this._size=Kn(this,s),c=Object.assign({},a,l),h=Zn(this.chart,s,c),d=Jn(s,c,h,this.chart);this.xAlign=h.xAlign,this.yAlign=h.yAlign,r={opacity:1,x:d.x,y:d.y,width:l.width,height:l.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,r&&this._resolveAnimations().update(this,r),t&&s.external&&s.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,s,n){const r=this.getCaretPosition(t,s,n);e.lineTo(r.x1,r.y1),e.lineTo(r.x2,r.y2),e.lineTo(r.x3,r.y3)}getCaretPosition(t,e,s){const{xAlign:n,yAlign:r}=this,{caretSize:o,cornerRadius:a}=s,{topLeft:l,topRight:c,bottomLeft:h,bottomRight:d}=Yt(a),{x:u,y:f}=t,{width:p,height:g}=e;let m,_,x,y,w,v;return r==="center"?(w=f+g/2,n==="left"?(m=u,_=m-o,y=w+o,v=w-o):(m=u+p,_=m+o,y=w-o,v=w+o),x=m):(n==="left"?_=u+Math.max(l,h)+o:n==="right"?_=u+p-Math.max(c,d)-o:_=this.caretX,r==="top"?(y=f,w=y-o,m=_-o,x=_+o):(y=f+g,w=y+o,m=_+o,x=_-o),v=y),{x1:m,x2:_,x3:x,y1:y,y2:w,y3:v}}drawTitle(t,e,s){const n=this.title,r=n.length;let o,a,l;if(r){const c=ae(s.rtl,this.x,this.width);for(t.x=oi(this,s.titleAlign,s),e.textAlign=c.textAlign(s.titleAlign),e.textBaseline="middle",o=Q(s.titleFont),a=s.titleSpacing,e.fillStyle=s.titleColor,e.font=o.string,l=0;l<r;++l)e.fillText(n[l],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,l+1===r&&(t.y+=s.titleMarginBottom-a)}}_drawColorBox(t,e,s,n,r){const o=this.labelColors[s],a=this.labelPointStyles[s],{boxHeight:l,boxWidth:c}=r,h=Q(r.bodyFont),d=oi(this,"left",r),u=n.x(d),f=l<h.lineHeight?(h.lineHeight-l)/2:0,p=e.y+f;if(r.usePointStyle){const g={radius:Math.min(c,l)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},m=n.leftForLtr(u,c)+c/2,_=p+l/2;t.strokeStyle=r.multiKeyBackground,t.fillStyle=r.multiKeyBackground,as(t,g,m,_),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,as(t,g,m,_)}else{t.lineWidth=R(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const g=n.leftForLtr(u,c),m=n.leftForLtr(n.xPlus(u,1),c-2),_=Yt(o.borderRadius);Object.values(_).some(x=>x!==0)?(t.beginPath(),t.fillStyle=r.multiKeyBackground,Ie(t,{x:g,y:p,w:c,h:l,radius:_}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),Ie(t,{x:m,y:p+1,w:c-2,h:l-2,radius:_}),t.fill()):(t.fillStyle=r.multiKeyBackground,t.fillRect(g,p,c,l),t.strokeRect(g,p,c,l),t.fillStyle=o.backgroundColor,t.fillRect(m,p+1,c-2,l-2))}t.fillStyle=this.labelTextColors[s]}drawBody(t,e,s){const{body:n}=this,{bodySpacing:r,bodyAlign:o,displayColors:a,boxHeight:l,boxWidth:c,boxPadding:h}=s,d=Q(s.bodyFont);let u=d.lineHeight,f=0;const p=ae(s.rtl,this.x,this.width),g=function(M){e.fillText(M,p.x(t.x+f),t.y+u/2),t.y+=u+r},m=p.textAlign(o);let _,x,y,w,v,$,S;for(e.textAlign=o,e.textBaseline="middle",e.font=d.string,t.x=oi(this,m,s),e.fillStyle=s.bodyColor,z(this.beforeBody,g),f=a&&m!=="right"?o==="center"?c/2+h:c+2+h:0,w=0,$=n.length;w<$;++w){for(_=n[w],x=this.labelTextColors[w],e.fillStyle=x,z(_.before,g),y=_.lines,a&&y.length&&(this._drawColorBox(e,t,w,p,s),u=Math.max(d.lineHeight,l)),v=0,S=y.length;v<S;++v)g(y[v]),u=d.lineHeight;z(_.after,g)}f=0,u=d.lineHeight,z(this.afterBody,g),t.y-=r}drawFooter(t,e,s){const n=this.footer,r=n.length;let o,a;if(r){const l=ae(s.rtl,this.x,this.width);for(t.x=oi(this,s.footerAlign,s),t.y+=s.footerMarginTop,e.textAlign=l.textAlign(s.footerAlign),e.textBaseline="middle",o=Q(s.footerFont),e.fillStyle=s.footerColor,e.font=o.string,a=0;a<r;++a)e.fillText(n[a],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+s.footerSpacing}}drawBackground(t,e,s,n){const{xAlign:r,yAlign:o}=this,{x:a,y:l}=t,{width:c,height:h}=s,{topLeft:d,topRight:u,bottomLeft:f,bottomRight:p}=Yt(n.cornerRadius);e.fillStyle=n.backgroundColor,e.strokeStyle=n.borderColor,e.lineWidth=n.borderWidth,e.beginPath(),e.moveTo(a+d,l),o==="top"&&this.drawCaret(t,e,s,n),e.lineTo(a+c-u,l),e.quadraticCurveTo(a+c,l,a+c,l+u),o==="center"&&r==="right"&&this.drawCaret(t,e,s,n),e.lineTo(a+c,l+h-p),e.quadraticCurveTo(a+c,l+h,a+c-p,l+h),o==="bottom"&&this.drawCaret(t,e,s,n),e.lineTo(a+f,l+h),e.quadraticCurveTo(a,l+h,a,l+h-f),o==="center"&&r==="left"&&this.drawCaret(t,e,s,n),e.lineTo(a,l+d),e.quadraticCurveTo(a,l,a+d,l),e.closePath(),e.fill(),n.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,s=this.$animations,n=s&&s.x,r=s&&s.y;if(n||r){const o=Se[t.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=Kn(this,t),l=Object.assign({},o,this._size),c=Zn(e,t,l),h=Jn(t,l,c,e);(n._to!==h.x||r._to!==h.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,h))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let s=this.opacity;if(!s)return;this._updateAnimationTarget(e);const n={width:this.width,height:this.height},r={x:this.x,y:this.y};s=Math.abs(s)<.001?0:s;const o=ot(e.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&a&&(t.save(),t.globalAlpha=s,this.drawBackground(r,t,n,e),_o(t,e.textDirection),r.y+=o.top,this.drawTitle(r,t,e),this.drawBody(r,t,e),this.drawFooter(r,t,e),mo(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const s=this._active,n=t.map(({datasetIndex:a,index:l})=>{const c=this.chart.getDatasetMeta(a);if(!c)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:c.data[l],index:l}}),r=!pi(s,n),o=this._positionChanged(n,e);(r||o)&&(this._active=n,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,s=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const n=this.options,r=this._active||[],o=this._getActiveElements(t,r,e,s),a=this._positionChanged(o,t),l=e||!pi(o,r)||a;return l&&(this._active=o,(n.enabled||n.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,s,n){const r=this.options;if(t.type==="mouseout")return[];if(!n)return e.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(t,r.mode,r,s);return r.reverse&&o.reverse(),o}_positionChanged(t,e){const{caretX:s,caretY:n,options:r}=this,o=Se[r.position].call(this,t,e);return o!==!1&&(s!==o.x||n!==o.y)}}var Yd={id:"tooltip",_element:er,positioners:Se,afterInit(i,t,e){e&&(i.tooltip=new er({chart:i,options:e}))},beforeUpdate(i,t,e){i.tooltip&&i.tooltip.initialize(e)},reset(i,t,e){i.tooltip&&i.tooltip.initialize(e)},afterDraw(i){const t=i.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(i.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(i.ctx),i.notifyPlugins("afterTooltipDraw",e)}},afterEvent(i,t){if(i.tooltip){const e=t.replay;i.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(i,t)=>t.bodyFont.size,boxWidth:(i,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:jo},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:i=>i!=="filter"&&i!=="itemSort"&&i!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Gd=Object.freeze({__proto__:null,Colors:od,Decimation:hd,Filler:Dd,Legend:Rd,SubTitle:Bd,Title:zd,Tooltip:Yd});const Xd=(i,t,e,s)=>(typeof t=="string"?(e=i.push(t)-1,s.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function Kd(i,t,e,s){const n=i.indexOf(t);if(n===-1)return Xd(i,t,e,s);const r=i.lastIndexOf(t);return n!==r?e:n}const Zd=(i,t)=>i===null?null:tt(Math.round(i),0,t);function ir(i){const t=this.getLabels();return i>=0&&i<t.length?t[i]:i}class Jd extends Jt{static id="category";static defaults={ticks:{callback:ir}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const s=this.getLabels();for(const{index:n,label:r}of e)s[n]===r&&s.splice(n,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(T(t))return null;const s=this.getLabels();return e=isFinite(e)&&s[e]===t?e:Kd(s,t,O(e,t),this._addedLabels),Zd(e,s.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:s,max:n}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(s=0),e||(n=this.getLabels().length-1)),this.min=s,this.max=n}buildTicks(){const t=this.min,e=this.max,s=this.options.offset,n=[];let r=this.getLabels();r=t===0&&e===r.length-1?r:r.slice(t,e+1),this._valueRange=Math.max(r.length-(s?0:1),1),this._startValue=this.min-(s?.5:0);for(let o=t;o<=e;o++)n.push({value:o});return n}getLabelForValue(t){return ir.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}function Qd(i,t){const e=[],{bounds:n,step:r,min:o,max:a,precision:l,count:c,maxTicks:h,maxDigits:d,includeBounds:u}=i,f=r||1,p=h-1,{min:g,max:m}=t,_=!T(o),x=!T(a),y=!T(c),w=(m-g)/(d+1);let v=Xs((m-g)/p/f)*f,$,S,M,P;if(v<1e-14&&!_&&!x)return[{value:g},{value:m}];P=Math.ceil(m/v)-Math.floor(g/v),P>p&&(v=Xs(P*v/p/f)*f),T(l)||($=Math.pow(10,l),v=Math.ceil(v*$)/$),n==="ticks"?(S=Math.floor(g/v)*v,M=Math.ceil(m/v)*v):(S=g,M=m),_&&x&&r&&Fa((a-o)/r,v/1e3)?(P=Math.round(Math.min((a-o)/v,h)),v=(a-o)/P,S=o,M=a):y?(S=_?o:S,M=x?a:M,P=c-1,v=(M-S)/P):(P=(M-S)/v,Pe(P,Math.round(P),v/1e3)?P=Math.round(P):P=Math.ceil(P));const L=Math.max(Ks(v),Ks(S));$=Math.pow(10,T(l)?L:l),S=Math.round(S*$)/$,M=Math.round(M*$)/$;let E=0;for(_&&(u&&S!==o?(e.push({value:o}),S<o&&E++,Pe(Math.round((S+E*v)*$)/$,o,sr(o,w,i))&&E++):S<o&&E++);E<P;++E){const F=Math.round((S+E*v)*$)/$;if(x&&F>a)break;e.push({value:F})}return x&&u&&M!==a?e.length&&Pe(e[e.length-1].value,a,sr(a,w,i))?e[e.length-1].value=a:e.push({value:a}):(!x||M===a)&&e.push({value:M}),e}function sr(i,t,{horizontal:e,minRotation:s}){const n=ft(s),r=(e?Math.sin(n):Math.cos(n))||.001,o=.75*t*(""+i).length;return Math.min(t/r,o)}class yi extends Jt{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return T(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:s}=this.getUserBounds();let{min:n,max:r}=this;const o=l=>n=e?n:l,a=l=>r=s?r:l;if(t){const l=mt(n),c=mt(r);l<0&&c<0?a(0):l>0&&c>0&&o(0)}if(n===r){let l=r===0?1:Math.abs(r*.05);a(r+l),t||o(n-l)}this.min=n,this.max=r}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:s}=t,n;return s?(n=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,n>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`),n=1e3)):(n=this.computeTickLimit(),e=e||11),e&&(n=Math.min(e,n)),n}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let s=this.getTickLimit();s=Math.max(2,s);const n={maxTicks:s,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},r=this._range||this,o=Qd(n,r);return t.bounds==="ticks"&&Jr(o,this,"value"),t.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){const t=this.ticks;let e=this.min,s=this.max;if(super.configure(),this.options.offset&&t.length){const n=(s-e)/Math.max(t.length-1,1)/2;e-=n,s+=n}this._startValue=e,this._endValue=s,this._valueRange=s-e}getLabelForValue(t){return Ue(t,this.chart.options.locale,this.options.ticks.format)}}class tu extends yi{static id="linear";static defaults={ticks:{callback:Si.formatters.numeric}};determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=X(t)?t:0,this.max=X(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,s=ft(this.options.ticks.minRotation),n=(t?Math.sin(s):Math.cos(s))||.001,r=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,r.lineHeight/n))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}const Be=i=>Math.floor(At(i)),Ht=(i,t)=>Math.pow(10,Be(i)+t);function nr(i){return i/Math.pow(10,Be(i))===1}function rr(i,t,e){const s=Math.pow(10,e),n=Math.floor(i/s);return Math.ceil(t/s)-n}function eu(i,t){const e=t-i;let s=Be(e);for(;rr(i,t,s)>10;)s++;for(;rr(i,t,s)<10;)s--;return Math.min(s,Be(i))}function iu(i,{min:t,max:e}){t=ht(i.min,t);const s=[],n=Be(t);let r=eu(t,e),o=r<0?Math.pow(10,Math.abs(r)):1;const a=Math.pow(10,r),l=n>r?Math.pow(10,n):0,c=Math.round((t-l)*o)/o,h=Math.floor((t-l)/a/10)*a*10;let d=Math.floor((c-h)/Math.pow(10,r)),u=ht(i.min,Math.round((l+h+d*Math.pow(10,r))*o)/o);for(;u<e;)s.push({value:u,major:nr(u),significand:d}),d>=10?d=d<15?15:20:d++,d>=20&&(r++,d=2,o=r>=0?1:o),u=Math.round((l+h+d*Math.pow(10,r))*o)/o;const f=ht(i.max,u);return s.push({value:f,major:nr(f),significand:d}),s}class su extends Jt{static id="logarithmic";static defaults={ticks:{callback:Si.formatters.logarithmic,major:{enabled:!0}}};constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const s=yi.prototype.parse.apply(this,[t,e]);if(s===0){this._zero=!0;return}return X(s)&&s>0?s:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=X(t)?Math.max(0,t):null,this.max=X(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!X(this._userMin)&&(this.min=t===Ht(this.min,0)?Ht(this.min,-1):Ht(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let s=this.min,n=this.max;const r=a=>s=t?s:a,o=a=>n=e?n:a;s===n&&(s<=0?(r(1),o(10)):(r(Ht(s,-1)),o(Ht(n,1)))),s<=0&&r(Ht(n,-1)),n<=0&&o(Ht(s,1)),this.min=s,this.max=n}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},s=iu(e,this);return t.bounds==="ticks"&&Jr(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}getLabelForValue(t){return t===void 0?"0":Ue(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=At(t),this._valueRange=At(this.max)-At(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(At(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}function fs(i){const t=i.ticks;if(t.display&&i.display){const e=ot(t.backdropPadding);return O(t.font&&t.font.size,Y.font.size)+e.height}return 0}function nu(i,t,e){return e=q(e)?e:[e],{w:Ja(i,t.string,e),h:e.length*t.lineHeight}}function or(i,t,e,s,n){return i===s||i===n?{start:t-e/2,end:t+e/2}:i<s||i>n?{start:t-e,end:t}:{start:t,end:t+e}}function ru(i){const t={l:i.left+i._padding.left,r:i.right-i._padding.right,t:i.top+i._padding.top,b:i.bottom-i._padding.bottom},e=Object.assign({},t),s=[],n=[],r=i._pointLabels.length,o=i.options.pointLabels,a=o.centerPointLabels?I/r:0;for(let l=0;l<r;l++){const c=o.setContext(i.getPointLabelContext(l));n[l]=c.padding;const h=i.getPointPosition(l,i.drawingArea+n[l],a),d=Q(c.font),u=nu(i.ctx,d,i._pointLabels[l]);s[l]=u;const f=nt(i.getIndexAngle(l)+a),p=Math.round(vs(f)),g=or(p,h.x,u.w,0,180),m=or(p,h.y,u.h,90,270);ou(e,t,f,g,m)}i.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),i._pointLabelItems=cu(i,s,n)}function ou(i,t,e,s,n){const r=Math.abs(Math.sin(e)),o=Math.abs(Math.cos(e));let a=0,l=0;s.start<t.l?(a=(t.l-s.start)/r,i.l=Math.min(i.l,t.l-a)):s.end>t.r&&(a=(s.end-t.r)/r,i.r=Math.max(i.r,t.r+a)),n.start<t.t?(l=(t.t-n.start)/o,i.t=Math.min(i.t,t.t-l)):n.end>t.b&&(l=(n.end-t.b)/o,i.b=Math.max(i.b,t.b+l))}function au(i,t,e){const s=i.drawingArea,{extra:n,additionalAngle:r,padding:o,size:a}=e,l=i.getPointPosition(t,s+n+o,r),c=Math.round(vs(nt(l.angle+Z))),h=uu(l.y,a.h,c),d=hu(c),u=du(l.x,a.w,d);return{visible:!0,x:l.x,y:h,textAlign:d,left:u,top:h,right:u+a.w,bottom:h+a.h}}function lu(i,t){if(!t)return!0;const{left:e,top:s,right:n,bottom:r}=i;return!(St({x:e,y:s},t)||St({x:e,y:r},t)||St({x:n,y:s},t)||St({x:n,y:r},t))}function cu(i,t,e){const s=[],n=i._pointLabels.length,r=i.options,{centerPointLabels:o,display:a}=r.pointLabels,l={extra:fs(r)/2,additionalAngle:o?I/n:0};let c;for(let h=0;h<n;h++){l.padding=e[h],l.size=t[h];const d=au(i,h,l);s.push(d),a==="auto"&&(d.visible=lu(d,c),d.visible&&(c=d))}return s}function hu(i){return i===0||i===180?"center":i<180?"left":"right"}function du(i,t,e){return e==="right"?i-=t:e==="center"&&(i-=t/2),i}function uu(i,t,e){return e===90||e===270?i-=t/2:(e>270||e<90)&&(i-=t),i}function fu(i,t,e){const{left:s,top:n,right:r,bottom:o}=e,{backdropColor:a}=t;if(!T(a)){const l=Yt(t.borderRadius),c=ot(t.backdropPadding);i.fillStyle=a;const h=s-c.left,d=n-c.top,u=r-s+c.width,f=o-n+c.height;Object.values(l).some(p=>p!==0)?(i.beginPath(),Ie(i,{x:h,y:d,w:u,h:f,radius:l}),i.fill()):i.fillRect(h,d,u,f)}}function pu(i,t){const{ctx:e,options:{pointLabels:s}}=i;for(let n=t-1;n>=0;n--){const r=i._pointLabelItems[n];if(!r.visible)continue;const o=s.setContext(i.getPointLabelContext(n));fu(e,o,r);const a=Q(o.font),{x:l,y:c,textAlign:h}=r;Kt(e,i._pointLabels[n],l,c+a.lineHeight/2,a,{color:o.color,textAlign:h,textBaseline:"middle"})}}function Uo(i,t,e,s){const{ctx:n}=i;if(e)n.arc(i.xCenter,i.yCenter,t,0,H);else{let r=i.getPointPosition(0,t);n.moveTo(r.x,r.y);for(let o=1;o<s;o++)r=i.getPointPosition(o,t),n.lineTo(r.x,r.y)}}function gu(i,t,e,s,n){const r=i.ctx,o=t.circular,{color:a,lineWidth:l}=t;!o&&!s||!a||!l||e<0||(r.save(),r.strokeStyle=a,r.lineWidth=l,r.setLineDash(n.dash||[]),r.lineDashOffset=n.dashOffset,r.beginPath(),Uo(i,e,o,s),r.closePath(),r.stroke(),r.restore())}function _u(i,t,e){return Ft(i,{label:e,index:t,type:"pointLabel"})}class mu extends yi{static id="radialLinear";static defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Si.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"};static descriptors={angleLines:{_fallback:"grid"}};constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=ot(fs(this.options)/2),e=this.width=this.maxWidth-t.width,s=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+s/2+t.top),this.drawingArea=Math.floor(Math.min(e,s)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=X(t)&&!isNaN(t)?t:0,this.max=X(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/fs(this.options))}generateTickLabels(t){yi.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,s)=>{const n=N(this.options.pointLabels.callback,[e,s],this);return n||n===0?n:""}).filter((e,s)=>this.chart.getDataVisibility(s))}fit(){const t=this.options;t.display&&t.pointLabels.display?ru(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,s,n){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((s-n)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,s,n))}getIndexAngle(t){const e=H/(this._pointLabels.length||1),s=this.options.startAngle||0;return nt(t*e+ft(s))}getDistanceFromCenterForValue(t){if(T(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(T(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const s=e[t];return _u(this.getContext(),t,s)}}getPointPosition(t,e,s=0){const n=this.getIndexAngle(t)-Z+s;return{x:Math.cos(n)*e+this.xCenter,y:Math.sin(n)*e+this.yCenter,angle:n}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:s,right:n,bottom:r}=this._pointLabelItems[t];return{left:e,top:s,right:n,bottom:r}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const s=this.ctx;s.save(),s.beginPath(),Uo(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),s.closePath(),s.fillStyle=t,s.fill(),s.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:s,grid:n,border:r}=e,o=this._pointLabels.length;let a,l,c;if(e.pointLabels.display&&pu(this,o),n.display&&this.ticks.forEach((h,d)=>{if(d!==0||d===0&&this.min<0){l=this.getDistanceFromCenterForValue(h.value);const u=this.getContext(d),f=n.setContext(u),p=r.setContext(u);gu(this,f,l,o,p)}}),s.display){for(t.save(),a=o-1;a>=0;a--){const h=s.setContext(this.getPointLabelContext(a)),{color:d,lineWidth:u}=h;!u||!d||(t.lineWidth=u,t.strokeStyle=d,t.setLineDash(h.borderDash),t.lineDashOffset=h.borderDashOffset,l=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),c=this.getPointPosition(a,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,s=e.ticks;if(!s.display)return;const n=this.getIndexAngle(0);let r,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(n),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,l)=>{if(l===0&&this.min>=0&&!e.reverse)return;const c=s.setContext(this.getContext(l)),h=Q(c.font);if(r=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=h.string,o=t.measureText(a.label).width,t.fillStyle=c.backdropColor;const d=ot(c.backdropPadding);t.fillRect(-o/2-d.left,-r-h.size/2-d.top,o+d.width,h.size+d.height)}Kt(t,a.label,0,-r,h,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}const Oi={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},lt=Object.keys(Oi);function ar(i,t){return i-t}function lr(i,t){if(T(t))return null;const e=i._adapter,{parser:s,round:n,isoWeekday:r}=i._parseOpts;let o=t;return typeof s=="function"&&(o=s(o)),X(o)||(o=typeof s=="string"?e.parse(o,s):e.parse(o)),o===null?null:(n&&(o=n==="week"&&(le(r)||r===!0)?e.startOf(o,"isoWeek",r):e.startOf(o,n)),+o)}function cr(i,t,e,s){const n=lt.length;for(let r=lt.indexOf(i);r<n-1;++r){const o=Oi[lt[r]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((e-t)/(a*o.size))<=s)return lt[r]}return lt[n-1]}function bu(i,t,e,s,n){for(let r=lt.length-1;r>=lt.indexOf(e);r--){const o=lt[r];if(Oi[o].common&&i._adapter.diff(n,s,o)>=t-1)return o}return lt[e?lt.indexOf(e):0]}function xu(i){for(let t=lt.indexOf(i)+1,e=lt.length;t<e;++t)if(Oi[lt[t]].common)return lt[t]}function hr(i,t,e){if(!e)i[t]=!0;else if(e.length){const{lo:s,hi:n}=ys(e,t),r=e[s]>=t?e[s]:e[n];i[r]=!0}}function vu(i,t,e,s){const n=i._adapter,r=+n.startOf(t[0].value,s),o=t[t.length-1].value;let a,l;for(a=r;a<=o;a=+n.add(a,1,s))l=e[a],l>=0&&(t[l].major=!0);return t}function dr(i,t,e){const s=[],n={},r=t.length;let o,a;for(o=0;o<r;++o)a=t[o],n[a]=o,s.push({value:a,major:!1});return r===0||!e?s:vu(i,s,n,e)}class ps extends Jt{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const s=t.time||(t.time={}),n=this._adapter=new yc._date(t.adapters.date);n.init(e),Me(s.displayFormats,n.formats()),this._parseOpts={parser:s.parser,round:s.round,isoWeekday:s.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:lr(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,s=t.time.unit||"day";let{min:n,max:r,minDefined:o,maxDefined:a}=this.getUserBounds();function l(c){!o&&!isNaN(c.min)&&(n=Math.min(n,c.min)),!a&&!isNaN(c.max)&&(r=Math.max(r,c.max))}(!o||!a)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),n=X(n)&&!isNaN(n)?n:+e.startOf(Date.now(),s),r=X(r)&&!isNaN(r)?r:+e.endOf(Date.now(),s)+1,this.min=Math.min(n,r-1),this.max=Math.max(n+1,r)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],s=t[t.length-1]),{min:e,max:s}}buildTicks(){const t=this.options,e=t.time,s=t.ticks,n=s.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&n.length&&(this.min=this._userMin||n[0],this.max=this._userMax||n[n.length-1]);const r=this.min,o=this.max,a=Ba(n,r,o);return this._unit=e.unit||(s.autoSkip?cr(e.minUnit,this.min,this.max,this._getLabelCapacity(r)):bu(this,a.length,e.minUnit,this.min,this.max)),this._majorUnit=!s.major.enabled||this._unit==="year"?void 0:xu(this._unit),this.initOffsets(n),t.reverse&&a.reverse(),dr(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,s=0,n,r;this.options.offset&&t.length&&(n=this.getDecimalForValue(t[0]),t.length===1?e=1-n:e=(this.getDecimalForValue(t[1])-n)/2,r=this.getDecimalForValue(t[t.length-1]),t.length===1?s=r:s=(r-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;e=tt(e,0,o),s=tt(s,0,o),this._offsets={start:e,end:s,factor:1/(e+1+s)}}_generate(){const t=this._adapter,e=this.min,s=this.max,n=this.options,r=n.time,o=r.unit||cr(r.minUnit,e,s,this._getLabelCapacity(e)),a=O(n.ticks.stepSize,1),l=o==="week"?r.isoWeekday:!1,c=le(l)||l===!0,h={};let d=e,u,f;if(c&&(d=+t.startOf(d,"isoWeek",l)),d=+t.startOf(d,c?"day":o),t.diff(s,e,o)>1e5*a)throw new Error(e+" and "+s+" are too far apart with stepSize of "+a+" "+o);const p=n.ticks.source==="data"&&this.getDataTimestamps();for(u=d,f=0;u<s;u=+t.add(u,a,o),f++)hr(h,u,p);return(u===s||n.bounds==="ticks"||f===1)&&hr(h,u,p),Object.keys(h).sort(ar).map(g=>+g)}getLabelForValue(t){const e=this._adapter,s=this.options.time;return s.tooltipFormat?e.format(t,s.tooltipFormat):e.format(t,s.displayFormats.datetime)}format(t,e){const n=this.options.time.displayFormats,r=this._unit,o=e||n[r];return this._adapter.format(t,o)}_tickFormatFunction(t,e,s,n){const r=this.options,o=r.ticks.callback;if(o)return N(o,[t,e,s],this);const a=r.time.displayFormats,l=this._unit,c=this._majorUnit,h=l&&a[l],d=c&&a[c],u=s[e],f=c&&d&&u&&u.major;return this._adapter.format(t,n||(f?d:h))}generateTickLabels(t){let e,s,n;for(e=0,s=t.length;e<s;++e)n=t[e],n.label=this._tickFormatFunction(n.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,s=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+s)*e.factor)}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+s*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,s=this.ctx.measureText(t).width,n=ft(this.isHorizontal()?e.maxRotation:e.minRotation),r=Math.cos(n),o=Math.sin(n),a=this._resolveTickFontOptions(0).size;return{w:s*r+a*o,h:s*o+a*r}}_getLabelCapacity(t){const e=this.options.time,s=e.displayFormats,n=s[e.unit]||s.millisecond,r=this._tickFormatFunction(t,0,dr(this,[t],this._majorUnit),n),o=this._getLabelSize(r),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],e,s;if(t.length)return t;const n=this.getMatchingVisibleMetas();if(this._normalized&&n.length)return this._cache.data=n[0].controller.getAllParsedValues(this);for(e=0,s=n.length;e<s;++e)t=t.concat(n[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,s;if(t.length)return t;const n=this.getLabels();for(e=0,s=n.length;e<s;++e)t.push(lr(this,n[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return eo(t.sort(ar))}}function ai(i,t,e){let s=0,n=i.length-1,r,o,a,l;e?(t>=i[s].pos&&t<=i[n].pos&&({lo:s,hi:n}=$t(i,"pos",t)),{pos:r,time:a}=i[s],{pos:o,time:l}=i[n]):(t>=i[s].time&&t<=i[n].time&&({lo:s,hi:n}=$t(i,"time",t)),{time:r,pos:a}=i[s],{time:o,pos:l}=i[n]);const c=o-r;return c?a+(l-a)*(t-r)/c:a}class yu extends ps{static id="timeseries";static defaults=ps.defaults;constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=ai(e,this.min),this._tableRange=ai(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:s}=this,n=[],r=[];let o,a,l,c,h;for(o=0,a=t.length;o<a;++o)c=t[o],c>=e&&c<=s&&n.push(c);if(n.length<2)return[{time:e,pos:0},{time:s,pos:1}];for(o=0,a=n.length;o<a;++o)h=n[o+1],l=n[o-1],c=n[o],Math.round((h+l)/2)!==c&&r.push({time:c,pos:o/(a-1)});return r}_generate(){const t=this.min,e=this.max;let s=super.getDataTimestamps();return(!s.includes(t)||!s.length)&&s.splice(0,0,t),(!s.includes(e)||s.length===1)&&s.push(e),s.sort((n,r)=>n-r)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),s=this.getLabelTimestamps();return e.length&&s.length?t=this.normalize(e.concat(s)):t=e.length?e:s,t=this._cache.all=t,t}getDecimalForValue(t){return(ai(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return ai(this._table,s*this._tableRange+this._minPos,!0)}}var wu=Object.freeze({__proto__:null,CategoryScale:Jd,LinearScale:tu,LogarithmicScale:su,RadialLinearScale:mu,TimeScale:ps,TimeSeriesScale:yu});const ku=[vc,Qh,Gd,wu];Os.register(...ku);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fi=globalThis,Ts=fi.ShadowRoot&&(fi.ShadyCSS===void 0||fi.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Fs=Symbol(),ur=new WeakMap;let qo=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Fs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ts&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=ur.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ur.set(e,t))}return t}toString(){return this.cssText}};const $u=i=>new qo(typeof i=="string"?i:i+"",void 0,Fs),Su=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,n,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new qo(e,i,Fs)},Mu=(i,t)=>{if(Ts)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),n=fi.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},fr=Ts?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return $u(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Pu,defineProperty:Cu,getOwnPropertyDescriptor:Au,getOwnPropertyNames:Du,getOwnPropertySymbols:Lu,getPrototypeOf:Ou}=Object,Ei=globalThis,pr=Ei.trustedTypes,Eu=pr?pr.emptyScript:"",Tu=Ei.reactiveElementPolyfillSupport,De=(i,t)=>i,wi={toAttribute(i,t){switch(t){case Boolean:i=i?Eu:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Rs=(i,t)=>!Pu(i,t),gr={attribute:!0,type:String,converter:wi,reflect:!1,useDefault:!1,hasChanged:Rs};Symbol.metadata??=Symbol("metadata"),Ei.litPropertyMetadata??=new WeakMap;let re=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=gr){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Cu(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){const{get:n,set:r}=Au(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){const a=n?.call(this);r?.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??gr}static _$Ei(){if(this.hasOwnProperty(De("elementProperties")))return;const t=Ou(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(De("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(De("properties"))){const e=this.properties,s=[...Du(e),...Lu(e)];for(const n of s)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,n]of e)this.elementProperties.set(s,n)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const n=this._$Eu(e,s);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(fr(n))}else t!==void 0&&e.push(fr(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mu(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,s);if(n!==void 0&&s.reflect===!0){const r=(s.converter?.toAttribute!==void 0?s.converter:wi).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,n=s._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const r=s.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:wi;this._$Em=n;const a=o.fromAttribute(e,r.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,s,n=!1,r){if(t!==void 0){const o=this.constructor;if(n===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??Rs)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:n,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,r]of s){const{wrapped:o}=r,a=this[n];o!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};re.elementStyles=[],re.shadowRootOptions={mode:"open"},re[De("elementProperties")]=new Map,re[De("finalized")]=new Map,Tu?.({ReactiveElement:re}),(Ei.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Is=globalThis,_r=i=>i,ki=Is.trustedTypes,mr=ki?ki.createPolicy("lit-html",{createHTML:i=>i}):void 0,Yo="$lit$",Pt=`lit$${Math.random().toFixed(9).slice(2)}$`,Go="?"+Pt,Fu=`<${Go}>`,Zt=document,Ne=()=>Zt.createComment(""),Ve=i=>i===null||typeof i!="object"&&typeof i!="function",zs=Array.isArray,Ru=i=>zs(i)||typeof i?.[Symbol.iterator]=="function",Ji=`[ 	
\f\r]`,ve=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,br=/-->/g,xr=/>/g,Wt=RegExp(`>|${Ji}(?:([^\\s"'>=/]+)(${Ji}*=${Ji}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vr=/'/g,yr=/"/g,Xo=/^(?:script|style|textarea|title)$/i,Iu=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),b=Iu(1),de=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),wr=new WeakMap,qt=Zt.createTreeWalker(Zt,129);function Ko(i,t){if(!zs(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return mr!==void 0?mr.createHTML(t):t}const zu=(i,t)=>{const e=i.length-1,s=[];let n,r=t===2?"<svg>":t===3?"<math>":"",o=ve;for(let a=0;a<e;a++){const l=i[a];let c,h,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,h=o.exec(l),h!==null);)u=o.lastIndex,o===ve?h[1]==="!--"?o=br:h[1]!==void 0?o=xr:h[2]!==void 0?(Xo.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=Wt):h[3]!==void 0&&(o=Wt):o===Wt?h[0]===">"?(o=n??ve,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?Wt:h[3]==='"'?yr:vr):o===yr||o===vr?o=Wt:o===br||o===xr?o=ve:(o=Wt,n=void 0);const f=o===Wt&&i[a+1].startsWith("/>")?" ":"";r+=o===ve?l+Fu:d>=0?(s.push(c),l.slice(0,d)+Yo+l.slice(d)+Pt+f):l+Pt+(d===-2?a:f)}return[Ko(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class He{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[c,h]=zu(t,e);if(this.el=He.createElement(c,s),qt.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=qt.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(const d of n.getAttributeNames())if(d.endsWith(Yo)){const u=h[o++],f=n.getAttribute(d).split(Pt),p=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:p[2],strings:f,ctor:p[1]==="."?Nu:p[1]==="?"?Vu:p[1]==="@"?Hu:Ti}),n.removeAttribute(d)}else d.startsWith(Pt)&&(l.push({type:6,index:r}),n.removeAttribute(d));if(Xo.test(n.tagName)){const d=n.textContent.split(Pt),u=d.length-1;if(u>0){n.textContent=ki?ki.emptyScript:"";for(let f=0;f<u;f++)n.append(d[f],Ne()),qt.nextNode(),l.push({type:2,index:++r});n.append(d[u],Ne())}}}else if(n.nodeType===8)if(n.data===Go)l.push({type:2,index:r});else{let d=-1;for(;(d=n.data.indexOf(Pt,d+1))!==-1;)l.push({type:7,index:r}),d+=Pt.length-1}r++}}static createElement(t,e){const s=Zt.createElement("template");return s.innerHTML=t,s}}function ue(i,t,e=i,s){if(t===de)return t;let n=s!==void 0?e._$Co?.[s]:e._$Cl;const r=Ve(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(i),n._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=n:e._$Cl=n),n!==void 0&&(t=ue(i,n._$AS(i,t.values),n,s)),t}class Bu{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,n=(t?.creationScope??Zt).importNode(e,!0);qt.currentNode=n;let r=qt.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new qe(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Wu(r,this,t)),this._$AV.push(c),l=s[++a]}o!==l?.index&&(r=qt.nextNode(),o++)}return qt.currentNode=Zt,n}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class qe{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,n){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ue(this,t,e),Ve(t)?t===k||t==null||t===""?(this._$AH!==k&&this._$AR(),this._$AH=k):t!==this._$AH&&t!==de&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ru(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==k&&Ve(this._$AH)?this._$AA.nextSibling.data=t:this.T(Zt.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=He.createElement(Ko(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(e);else{const r=new Bu(n,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=wr.get(t.strings);return e===void 0&&wr.set(t.strings,e=new He(t)),e}k(t){zs(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const r of t)n===e.length?e.push(s=new qe(this.O(Ne()),this.O(Ne()),this,this.options)):s=e[n],s._$AI(r),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=_r(t).nextSibling;_r(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Ti{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,n,r){this.type=1,this._$AH=k,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=k}_$AI(t,e=this,s,n){const r=this.strings;let o=!1;if(r===void 0)t=ue(this,t,e,0),o=!Ve(t)||t!==this._$AH&&t!==de,o&&(this._$AH=t);else{const a=t;let l,c;for(t=r[0],l=0;l<r.length-1;l++)c=ue(this,a[s+l],e,l),c===de&&(c=this._$AH[l]),o||=!Ve(c)||c!==this._$AH[l],c===k?t=k:t!==k&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!n&&this.j(t)}j(t){t===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Nu extends Ti{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===k?void 0:t}}class Vu extends Ti{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==k)}}class Hu extends Ti{constructor(t,e,s,n,r){super(t,e,s,n,r),this.type=5}_$AI(t,e=this){if((t=ue(this,t,e,0)??k)===de)return;const s=this._$AH,n=t===k&&s!==k||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==k&&(s===k||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Wu{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){ue(this,t)}}const ju=Is.litHtmlPolyfillSupport;ju?.(He,qe),(Is.litHtmlVersions??=[]).push("3.3.3");const Uu=(i,t,e)=>{const s=e?.renderBefore??t;let n=s._$litPart$;if(n===void 0){const r=e?.renderBefore??null;s._$litPart$=n=new qe(t.insertBefore(Ne(),r),r,void 0,e??{})}return n._$AI(i),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bs=globalThis;class Le extends re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Uu(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return de}}Le._$litElement$=!0,Le.finalized=!0,Bs.litElementHydrateSupport?.({LitElement:Le});const qu=Bs.litElementPolyfillSupport;qu?.({LitElement:Le});(Bs.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yu={attribute:!0,type:String,converter:wi,reflect:!1,hasChanged:Rs},Gu=(i=Yu,t,e)=>{const{kind:s,metadata:n}=e;let r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(e.name,i),s==="accessor"){const{name:o}=e;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,i,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,i,a),a}}}if(s==="setter"){const{name:o}=e;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,i,!0,a)}}throw Error("Unsupported decorator location: "+s)};function Fi(i){return(t,e)=>typeof e=="object"?Gu(i,t,e):((s,n,r)=>{const o=n.hasOwnProperty(r);return n.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(n,r):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function D(i){return Fi({...i,state:!0,attribute:!1})}function G(i,t,e={}){return i.connection.sendMessagePromise({type:t,...e})}async function Xu(i,t){return i.connection.subscribeMessage(t,{type:"family_tree/subscribe"})}async function Ku(i,t={}){return G(i,"family_tree/persons/list",t)}async function pt(i,t){return G(i,"family_tree/persons/get",{person_id:t})}async function Zu(i,t){return G(i,"family_tree/persons/siblings",{person_id:t})}async function Ju(i,t){return G(i,"family_tree/persons/save",t)}async function kr(i,t){return G(i,"family_tree/persons/delete",{person_id:t})}async function Qu(i,t){return G(i,"family_tree/persons/restore",{person_id:t})}async function tf(i,t){return G(i,"family_tree/persons/purge",{person_id:t})}async function ef(i){return G(i,"family_tree/stats")}async function $r(i){return G(i,"family_tree/settings")}async function sf(i,t){return G(i,"family_tree/unions/get",{union_id:t})}async function Qi(i,t){const{id:e,union_id:s,...n}=t,r={...n,...s||e?{union_id:String(s||e)}:{}};return G(i,"family_tree/unions/save",r)}async function nf(i,t){return G(i,"family_tree/unions/delete",{union_id:t})}async function ye(i,t){return G(i,"family_tree/parent_child/add",t)}async function rf(i,t){return G(i,"family_tree/parent_child/remove",{link_id:t})}async function ts(i,t={}){return G(i,"family_tree/places/list",t)}async function Sr(i,t){const{id:e,place_id:s,...n}=t,r={...n,...s||e?{place_id:s||e}:{}};return G(i,"family_tree/places/save",r)}async function Mr(i,t){const{id:e,event_id:s,...n}=t,r={...n,...s||e?{event_id:String(s||e)}:{}};return G(i,"family_tree/events/save",r)}async function of(i,t){return G(i,"family_tree/events/delete",{event_id:t})}async function af(i){return G(i,"family_tree/user_links/list")}async function Pr(i,t,e){return G(i,"family_tree/user_links/set",{ha_user_id:t,person_id:e})}async function es(i){return G(i,"family_tree/lineage/mine")}async function Cr(i,t){return G(i,"family_tree/user_links/claim",t)}async function lf(i,t,e){return G(i,"family_tree/gazetteer/search",{query:t,country:e})}async function cf(i){return G(i,"family_tree/gazetteer/status")}const hf=["exact","about","before","after","between","from_to","estimated","calculated"],We=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],df={en:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],nl:["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"]},gs={};[["jan","january","januari"],["feb","february","februari"],["mar","mrt","march","maart"],["apr","april"],["may","mei"],["jun","june","juni"],["jul","july","juli"],["aug","august","augustus"],["sep","sept","september"],["oct","okt","october","oktober"],["nov","november"],["dec","december"]].forEach((i,t)=>i.forEach(e=>gs[e]=t+1));const Ns={en:{about:"about",before:"before",after:"after",between:"between",and:"and",estimated:"est.",calculated:"calc.",deceased:"Deceased"},nl:{about:"ca.",before:"voor",after:"na",between:"tussen",and:"en",estimated:"geschat",calculated:"berekend",deceased:"Overleden"}};function Ri(i){return(i||"en").toLowerCase().startsWith("nl")?"nl":"en"}const uf=[[/^(ABT|ABOUT|CIR|CA\.?|CIRCA)\s+/i,"about"],[/^(BEF|BEFORE)\s+/i,"before"],[/^(AFT|AFTER)\s+/i,"after"],[/^EST\s+/i,"estimated"],[/^CAL\s+/i,"calculated"]];function se(i){const t=/^(?:(\d{1,2})\s+)?(?:([A-Z]{3})\s+)?(\d{3,4})$/i.exec(i.trim());if(!t)return null;const e=Number(t[3]),s=t[2]?We.indexOf(t[2].toUpperCase()):-1;if(t[2]&&s<0)return null;const n=s>=0?s+1:void 0,r=t[1]&&n?Number(t[1]):void 0;return{year:e,month:n,day:r}}function Ye(i){const t=(i||"").trim(),e={qualifier:"exact",first:null,second:null,raw:t};if(!t)return e;const s=/^BET\s+(.+?)\s+AND\s+(.+)$/i.exec(t);if(s)return{qualifier:"between",first:se(s[1]),second:se(s[2]),raw:t};const n=/^FROM\s+(.+?)(?:\s+TO\s+(.+))?$/i.exec(t);if(n)return{qualifier:"from_to",first:se(n[1]),second:n[2]?se(n[2]):null,raw:t};for(const[r,o]of uf)if(r.test(t))return{qualifier:o,first:se(t.replace(r,"")),second:null,raw:t};return{qualifier:"exact",first:se(t),second:null,raw:t}}function Ii(i){if(!i)return null;const t=/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(i);return t?{year:Number(t[1]),month:t[2]?Number(t[2]):void 0,day:t[3]?Number(t[3]):void 0}:null}function li(i,t){const e=Ri(t),s=df[e];return i.month&&i.day?e==="nl"?`${i.day} ${s[i.month-1]} ${i.year}`:`${s[i.month-1]} ${i.day}, ${i.year}`:i.month?`${s[i.month-1]} ${i.year}`:String(i.year)}function Oe(i,t){if(!i)return"";const e=Ns[Ri(t)],s=Ye(i.date_text);if(!s.raw){const r=Ii(i.sort_date);return r?li(r,t):""}if(!s.first)return s.raw;const n=li(s.first,t);switch(s.qualifier){case"between":return s.second?`${e.between} ${n} ${e.and} ${li(s.second,t)}`:n;case"from_to":return s.second?`${n} – ${li(s.second,t)}`:`${n} –`;case"exact":return n;default:return`${e[s.qualifier]} ${n}`}}function Ar(i){if(!i)return!1;const t=Ye(i.date_text);return t.raw?t.qualifier==="exact"&&!!t.first?.day:!!Ii(i.sort_date)?.day}function Dr(i){return i?Ii(i.sort_date)||Ye(i.date_text).first:null}function ff(i,t,e,s=new Date){const n=Dr(i);if(!n)return null;let r,o=!0;if(t)r=Dr(t),o=Ar(t);else if(e)r={year:s.getFullYear(),month:s.getMonth()+1,day:s.getDate()};else return null;if(!r)return null;const a=!Ar(i)||!o;let l=r.year-n.year;if(!a){const c=n.month??1,h=n.day??1,d=r.month??1,u=r.day??1;(d<c||d===c&&u<h)&&(l-=1)}return l<0||l>130?null:{years:l,approx:a}}function Zo(i,t,e,s){const n=ff(i,t,e,s);return n?n.approx?`(±${n.years})`:`(${n.years})`:""}function Lr(i,t,e,s){if(t){const n=Oe(t,s),r=Zo(i,t,!1);if(n)return r?`${n} ${r}`:n}return e?"":Ns[Ri(s)].deceased}function Or(i,t,e,s,n){const r=Zo(i,t,e&&!t,n);if(e&&!t)return[Oe(i,s),r].filter(Boolean).join(" ");const o=Ns[Ri(s)],a=h=>{if(!h)return"";const d=Ye(h.date_text),u=d.first||Ii(h.sort_date);return u?d.qualifier==="exact"?String(u.year):`${o[d.qualifier]||""} ${u.year}`.trim():d.raw},l=a(i),c=a(t);return l&&c?`${l} - ${c}${r?` ${r}`:""}`:l?`${l} -`:c?`- ${c}`:""}function Er(i){const t=i.trim().replace(/,/g," ").replace(/\s+/g," ");if(!t)return null;const e=(l,c,h)=>l<100||l>9999||c!==void 0&&(c<1||c>12)||h!==void 0&&(h<1||h>31)?null:c&&h?`${h} ${We[c-1]} ${l}`:c?`${We[c-1]} ${l}`:String(l);let s=/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/.exec(t);if(s)return e(Number(s[1]),s[2]?Number(s[2]):void 0,s[3]?Number(s[3]):void 0);if(s=/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(t),s)return e(Number(s[3]),Number(s[2]),Number(s[1]));if(s=/^(\d{1,2})[-/.](\d{4})$/.exec(t),s)return e(Number(s[2]),Number(s[1]));const n=t.toLowerCase().split(" ");let r,o,a;for(const l of n){const c=l.replace(/\.$/,"");if(/^\d{3,4}$/.test(c))a=Number(c);else if(/^\d{1,2}$/.test(c))r=Number(c);else if(gs[c])o=gs[c];else return null}return a===void 0||r!==void 0&&o===void 0?null:e(a,o,r)}function Tr(i,t,e=""){const s=t.trim()?Er(t):"",n=e.trim()?Er(e):"";if(s===null||n===null)return{value:"",error:!0};if(!s)return{value:"",error:!1};switch(i){case"about":return{value:`ABT ${s}`,error:!1};case"before":return{value:`BEF ${s}`,error:!1};case"after":return{value:`AFT ${s}`,error:!1};case"estimated":return{value:`EST ${s}`,error:!1};case"calculated":return{value:`CAL ${s}`,error:!1};case"between":return n?{value:`BET ${s} AND ${n}`,error:!1}:{value:"",error:!0};case"from_to":return{value:n?`FROM ${s} TO ${n}`:`FROM ${s}`,error:!1};default:return{value:s,error:!1}}}function pf(i){const t=Ye(i),e=s=>s?s.month&&s.day?`${s.day} ${We[s.month-1]} ${s.year}`:s.month?`${We[s.month-1]} ${s.year}`:String(s.year):"";return t.raw&&!t.first?{qualifier:"exact",first:t.raw,second:""}:{qualifier:t.qualifier,first:e(t.first),second:e(t.second)}}const Jo=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],gf=/^(\d{1,2})\s+([A-Z]{3})\s+(\d{4})$/i,_f=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Fr(i){const t=(i||"").trim();if(!t)return"";const e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t);if(!e)return"";const s=Number(e[1]),n=Number(e[2]),r=Number(e[3]);return n<1||n>12||r<1||r>31?"":`${r} ${Jo[n-1]} ${s}`}function Rr(i){const t=(i||"").trim();if(!t)return null;const e=gf.exec(t);if(!e)return null;const s=Number(e[1]),n=Jo.indexOf(e[2].toUpperCase())+1,r=Number(e[3]);return n<1||s<1||s>31?null:`${String(r).padStart(4,"0")}-${String(n).padStart(2,"0")}-${String(s).padStart(2,"0")}`}function mf(i){return(i||"").trim()||"—"}function Ir(i,t="days"){return i===0?"today":i===1?"tomorrow":`in ${i} ${t}`}function $i(i){if(!i)return null;const t=/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(i);return t?{year:Number(t[1]),month:t[2]?Number(t[2]):void 0,day:t[3]?Number(t[3]):void 0}:null}function bf(i,t,e,s=new Date){const n=$i(i);if(!n?.year)return null;const r=e?{year:s.getFullYear(),month:s.getMonth()+1,day:s.getDate()}:$i(t);if(!r?.year)return null;let o=r.year-n.year;const a=n.month??1,l=n.day??1,c=r.month??1,h=r.day??1;return(c<a||c===a&&h<l)&&(o-=1),Math.max(0,o)}function zr(i,t){const e=$i(t)?.year;if(e)return e;const s=/\b(\d{4})\b/.exec(i||"");return s?Number(s[1]):null}function xf(i,t,e){const s=$i(t);if(s?.year&&s.month&&s.day){const r=`${_f[s.month-1]} ${s.day}, ${s.year}`;return e!=null?`${r} (${e})`:r}const n=(i||"").trim();return n?e!=null?`${n} (${e})`:n:e!=null?`(${e})`:""}function vf(i){const t=i.is_living!==!1,e=bf(i.birth_sort_date,i.death_sort_date,t,i.today);if(t)return xf(i.birth_date_text,i.birth_sort_date,e);const s=zr(i.birth_date_text,i.birth_sort_date),n=zr(i.death_date_text,i.death_sort_date),r=/about|abt|circa|ca\.?/i.test(i.death_date_text||"");if(s!=null&&n!=null){const o=r?`about ${n}`:String(n),a=e!=null?` (±${e})`:"";return`${s} - ${o}${a}`}return s!=null?String(s):n!=null?r?`about ${n}`:String(n):""}function j(i){if(i==null)return"Unknown error";if(typeof i=="string")return i;if(i instanceof Error)return i.message||String(i);if(typeof i=="object"){const t=i;if(typeof t.message=="string"&&t.message.trim())return t.message;if(typeof t.error=="string"&&t.error.trim())return t.error;if(t.error&&typeof t.error=="object"){const e=t.error;if(typeof e.message=="string"&&e.message.trim())return e.message}try{return JSON.stringify(i)}catch{return"Unknown error"}}return String(i)}const Qo={brand:"Family Tree",nav_dashboard:"Dashboard",nav_people:"People",nav_trash:"Trash",nav_settings:"Settings",search_placeholder:"Search people…",filter_all:"All",filter_living:"Alive",filter_deceased:"Deceased",filters:"Filters",filter_family:"Family",filter_all_families:"All families",filter_all_places:"All places",filter_date_from:"From",filter_date_to:"To",filter_reset:"Reset",add_person:"Add person",save:"Save",cancel:"Cancel",delete:"Delete",restore:"Restore",purge:"Delete forever",given_names:"First name(s)",call_name:"Preferred name",surname_prefix:"Surname prefix",surname:"Last name",sex:"Gender",deceased:"Deceased",notes:"Notes",details:"Details",relationships:"Relationships",tree:"Tree",sources:"Sources",stats_total:"People",stats_living:"Alive",stats_deceased:"Deceased",chart_ages:"Age distribution",chart_centuries:"Birth centuries",chart_places:"Places of birth",upcoming_birthdays:"Upcoming birthdays",upcoming_anniversaries:"Upcoming anniversaries",no_people:"No people yet.",empty_cta_hint:"Add someone manually or import a GEDCOM file to get started.",read_only:"Read-only — admin required to edit.",import_gedcom:"Import GEDCOM",export_gedcom:"Export GEDCOM",replace_import:"Replace existing data",user_links:"User links",gazetteer:"Place gazetteer",families:"Families",parents:"Parents",grandparents:"Grandparents",children:"Children",siblings:"Siblings",partners:"Partners",events:"Events",add_event:"Add event",date:"Date",date_advanced:"Advanced date",date_simple:"Use date picker",date_gedcom_hint:"e.g. 12 JAN 1980, ABT 1900",place:"Place",description:"Description",close:"Close",loading:"Loading…",error:"Something went wrong",field_required:"First name(s) is required.",sex_male:"Male",sex_female:"Female",sex_intersex:"Intersex",sex_unknown:"Unknown",event_birth:"Birth",event_death:"Death",event_baptism:"Baptism",event_burial:"Burial",event_occupation:"Occupation",event_residence:"Residence",days:"days",tab_menu:"Menu",confirm_import:"Confirm import",importing:"Importing…",import_preview:"Import preview",import_complete:"Import complete",import_complete_hint:"Your family tree has been imported successfully.",import_persons:"People",import_unions:"Families",import_events:"Events",import_sources:"Sources",import_places:"Places",replace_warning:"This will replace all existing family tree data.",event_marriage:"Marriage",event_divorce:"Divorce",event_partnership:"Partnership",siblings_count:"siblings",filter_search:"Search",filter_all_sexes:"All genders",filter_clear_all:"Clear all",col_name:"Full name",col_birth:"Date of birth",col_death:"Date of death",col_children:"No. children",col_lineage:"Lineage",father:"Father",mother:"Mother",col_parents:"Parents",child:"child",actions:"Actions",edit:"Edit",edit_event:"Edit event",profession:"Profession",lifespan:"Lifespan",section_personal:"Personal",lineage_ancestor:"generation ancestor",lineage_descendant:"generation descendant",lineage_of:"of",lineage_tooltip:"%s is a %s generation %s of %s.",lineage_me:"Your linked person",confirm_delete_person:"Move “%s” to trash?",confirm_purge_person:"Permanently delete “%s”? This cannot be undone.",confirm_delete_union:"Remove this partnership?",confirm_remove_parent:"Remove this parent link?",edit_in_relationships:"Edit in Relationships",section_parents:"Parents",section_partners:"Partners",link_existing_person:"Link existing person",search_to_link:"Search for a person…",union_status:"Status",union_notes:"Notes",known_children:"Known children",status_ongoing:"Ongoing",status_ended:"Ended",status_unknown:"Unknown",anniversaries_hint:"Wedding anniversaries in the next 60 days (both partners living).",anniversary_years:"%s years",no_anniversaries:"No upcoming anniversaries.",add_parents:"Add parents",add_partner:"Add partner",add_child:"Add child",view_siblings:"View siblings",view_full_profile:"View full profile",view_tree_action:"View tree",siblings_of:"Siblings of %s",half_sibling:"Half-sibling",unknown_children:"unknown children",more_child:"%s child",more_children:"%s children",this_is_me:"This is me",not_linked:"You are not linked to a person in the tree yet.",unlink_me:"Unlink",search_person:"Search for your person",create_my_person:"Create my person",date_qualifier:"Date precision",date_second:"Second date",date_hint:"e.g. 26 Apr 1941 or 1941",date_invalid:"Invalid date — check the format.",already_added:"already added",qual_exact:"Exact",qual_about:"About",qual_before:"Before",qual_after:"After",qual_between:"Between",qual_from_to:"From … to",qual_estimated:"Estimated",qual_calculated:"Calculated"},yf={brand:"Stamboom",nav_dashboard:"Dashboard",nav_people:"Personen",nav_trash:"Prullenbak",nav_settings:"Instellingen",search_placeholder:"Personen zoeken…",filter_all:"Alles",filter_living:"Levend",filter_deceased:"Overleden",filters:"Filters",filter_family:"Familie",filter_all_families:"Alle families",filter_all_places:"Alle plaatsen",filter_date_from:"Van",filter_date_to:"Tot",filter_reset:"Reset",add_person:"Persoon toevoegen",save:"Opslaan",cancel:"Annuleren",delete:"Verwijderen",restore:"Terugzetten",purge:"Definitief verwijderen",given_names:"Voornamen",call_name:"Roepnaam",surname_prefix:"Tussenvoegsel",surname:"Achternaam",sex:"Geslacht",deceased:"Overleden",notes:"Notities",details:"Details",relationships:"Relaties",tree:"Stamboom",sources:"Bronnen",stats_total:"Personen",stats_living:"Levend",stats_deceased:"Overleden",chart_ages:"Leeftijdsverdeling",chart_centuries:"Geboorte-eeuwen",chart_places:"Geboorteplaatsen",upcoming_birthdays:"Komende verjaardagen",upcoming_anniversaries:"Komende jubilea",no_people:"Nog geen personen.",empty_cta_hint:"Voeg handmatig iemand toe of importeer een GEDCOM-bestand.",read_only:"Alleen-lezen — beheerder nodig om te bewerken.",import_gedcom:"GEDCOM importeren",export_gedcom:"GEDCOM exporteren",replace_import:"Bestaande gegevens vervangen",user_links:"Gebruikerskoppelingen",gazetteer:"Plaatsengazetteer",families:"Families",parents:"Ouders",grandparents:"Grootouders",children:"Kinderen",siblings:"Broers/zussen",partners:"Partners",events:"Gebeurtenissen",add_event:"Gebeurtenis toevoegen",date:"Datum",date_advanced:"Geavanceerde datum",date_simple:"Datumkiezer gebruiken",date_gedcom_hint:"bijv. 12 JAN 1980, ABT 1900",place:"Plaats",description:"Beschrijving",close:"Sluiten",loading:"Laden…",error:"Er ging iets mis",field_required:"Voornamen is verplicht.",sex_male:"Man",sex_female:"Vrouw",sex_intersex:"Intersekse",sex_unknown:"Onbekend",event_birth:"Geboorte",event_death:"Overlijden",event_baptism:"Doop",event_burial:"Begrafenis",event_occupation:"Beroep",event_residence:"Woonplaats",days:"dagen",tab_menu:"Menu",confirm_import:"Import bevestigen",importing:"Importeren…",import_preview:"Importvoorbeeld",import_complete:"Import voltooid",import_complete_hint:"Je stamboom is succesvol geïmporteerd.",import_persons:"Personen",import_unions:"Families",import_events:"Gebeurtenissen",import_sources:"Bronnen",import_places:"Plaatsen",replace_warning:"Dit vervangt alle bestaande stamboomgegevens.",event_marriage:"Huwelijk",event_divorce:"Scheiding",event_partnership:"Partnerschap",siblings_count:"broers/zussen",filter_search:"Zoeken",filter_all_sexes:"Alle geslachten",filter_clear_all:"Alles wissen",col_name:"Volledige naam",col_birth:"Geboortedatum",col_death:"Overlijdensdatum",col_children:"Aantal kinderen",col_lineage:"Afstamming",father:"Vader",mother:"Moeder",col_parents:"Ouders",child:"kind",actions:"Acties",edit:"Bewerken",edit_event:"Gebeurtenis bewerken",profession:"Beroep",lifespan:"Levensduur",section_personal:"Persoonlijk",lineage_ancestor:"generatie voorouder",lineage_descendant:"generatie nakomeling",lineage_of:"van",lineage_tooltip:"%s is een %s generatie %s van %s.",lineage_me:"Jouw gekoppelde persoon",confirm_delete_person:"“%s” naar de prullenbak verplaatsen?",confirm_purge_person:"“%s” definitief verwijderen? Dit kan niet ongedaan worden gemaakt.",confirm_delete_union:"Dit partnerschap verwijderen?",confirm_remove_parent:"Deze ouderkoppeling verwijderen?",edit_in_relationships:"Bewerken in Relaties",section_parents:"Ouders",section_partners:"Partners",link_existing_person:"Bestaande persoon koppelen",search_to_link:"Zoek een persoon…",union_status:"Status",union_notes:"Notities",known_children:"Bekende kinderen",status_ongoing:"Lopend",status_ended:"Beëindigd",status_unknown:"Onbekend",anniversaries_hint:"Huwelijksjubilea in de komende 60 dagen (beide partners levend).",anniversary_years:"%s jaar",no_anniversaries:"Geen komende jubilea.",add_parents:"Ouders toevoegen",add_partner:"Partner toevoegen",add_child:"Kind toevoegen",view_siblings:"Broers/zussen bekijken",view_full_profile:"Volledig profiel",view_tree_action:"Stamboom bekijken",siblings_of:"Broers/zussen van %s",half_sibling:"Halfbroer/-zus",unknown_children:"onbekende kinderen",more_child:"%s kind",more_children:"%s kinderen",this_is_me:"Dit ben ik",not_linked:"Je bent nog niet gekoppeld aan een persoon in de stamboom.",unlink_me:"Ontkoppelen",search_person:"Zoek je persoon",create_my_person:"Mijn persoon aanmaken",date_qualifier:"Datumprecisie",date_second:"Tweede datum",date_hint:"bijv. 26 apr 1941 of 1941",date_invalid:"Ongeldige datum — controleer het formaat.",already_added:"al toegevoegd",qual_exact:"Exact",qual_about:"Ongeveer",qual_before:"Voor",qual_after:"Na",qual_between:"Tussen",qual_from_to:"Van … tot",qual_estimated:"Geschat",qual_calculated:"Berekend"};function wf(i){return(i||"en").toLowerCase().startsWith("nl")?yf:{...Qo}}function kf(i,t){return wf(i)[t]??Qo[t]??t}const is={search:"",filterLiving:"all",filterSex:"",sort:"surname",sortDir:"asc",view:"dashboard",familyShortcut:"",filterPlace:"",dateFrom:"",dateTo:"",filtersOpen:!1},Br="family_tree.panel.view",$f=new Set(["name","surname","updated","birth","death","sex","father","mother","children"]),Sf=new Set(["dashboard","people","trash","settings","person"]);function ta(i){return i?`${Br}.${i}`:Br}function xt(i,t){return typeof i=="string"?i:t}function Mf(i,t){if(!i)return{...is};try{const e=i.getItem(ta(t));if(!e)return{...is};const s=JSON.parse(e),n=xt(s.sort,"surname"),r=xt(s.view,"dashboard");return{search:xt(s.search,""),filterLiving:xt(s.filterLiving,"all"),filterSex:xt(s.filterSex,""),sort:$f.has(n)?n:"surname",sortDir:s.sortDir==="desc"?"desc":"asc",view:Sf.has(r)?r:"dashboard",familyShortcut:xt(s.familyShortcut,""),filterPlace:xt(s.filterPlace,""),dateFrom:xt(s.dateFrom,""),dateTo:xt(s.dateTo,""),filtersOpen:!!s.filtersOpen}}catch{return{...is}}}function Pf(i,t,e){if(i)try{i.setItem(ta(e),JSON.stringify(t))}catch{}}function Cf(i,t=""){const e=new Set,s=[];for(const n of[...i,t]){const r=n?.trim();if(!r)continue;const o=r.toLowerCase();e.has(o)||(e.add(o),s.push(r))}return s.sort((n,r)=>n.localeCompare(r,void 0,{sensitivity:"base"})),s}function V(i){if(i.display_name)return i.display_name;const t=(i.call_name||i.given_names||"").trim();return[t.includes(" ")&&!i.call_name?t.split(/\s+/)[0]:t,i.surname_prefix,i.surname].map(n=>(n||"").trim()).filter(Boolean).join(" ")||"Unknown"}function Af(i,t){const e=t.trim().toLowerCase();if(!e)return!0;const s=`${i.surname_prefix||""} ${i.surname||""}`.trim().toLowerCase(),n=(i.surname||"").toLowerCase();return s.startsWith(e)||n.startsWith(e)}function Vs(i){return i.life_events||[]}function Df(i){if(!i)return null;const t=i.trim().slice(0,10);return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:null}function Lf(i,t,e){const s=t.trim(),n=e.trim();if(!s&&!n)return!0;const r=Vs(i);for(const o of r){const a=Df(o.sort_date);if(a&&!(s&&a<s)&&!(n&&a>n))return!0}return!1}function Of(i,t){const e=t.trim();return e?Vs(i).some(s=>s.place_id===e):!0}function Nr(i){const t=new Map;for(const e of i)for(const s of Vs(e)){if(!s.place_id)continue;const n=(s.place_name||"").trim()||s.place_id;t.has(s.place_id)||t.set(s.place_id,n)}return[...t.entries()].map(([e,s])=>({id:e,label:s})).sort((e,s)=>e.label.localeCompare(s.label,void 0,{sensitivity:"base"}))}function Ef(i,t){const e=t.search.trim().toLowerCase();let s=i.filter(r=>t.filterLiving==="living"&&!r.is_living||t.filterLiving==="deceased"&&r.is_living||t.filterSex&&r.sex!==t.filterSex||!Af(r,t.familyShortcut)||!Of(r,t.filterPlace)||!Lf(r,t.dateFrom,t.dateTo)?!1:e?[r.given_names,r.call_name,r.surname_prefix,r.surname,V(r)].join(" ").toLowerCase().includes(e):!0);const n=t.sortDir==="desc"?-1:1;return s=[...s].sort((r,o)=>{const a=Tf(r,o,t.sort,n);return a!==0?a:ea(r,o)}),s}function oe(i,t){return(i||"").localeCompare(t||"",void 0,{sensitivity:"base"})}function ea(i,t){return oe(i.surname,t.surname)||oe(i.given_names,t.given_names)}function ci(i,t,e,s){const n=i==null||i==="",r=t==null||t==="";return n&&r?0:n?1:r?-1:e(i,t)*s}function Tf(i,t,e,s){switch(e){case"name":return oe(V(i),V(t))*s;case"updated":return(t.updated_at||"").localeCompare(i.updated_at||"")*s;case"birth":return ci(i.birth?.sort_date,t.birth?.sort_date,(n,r)=>n.localeCompare(r),s);case"death":return ci(i.death?.sort_date,t.death?.sort_date,(n,r)=>n.localeCompare(r),s);case"sex":return oe(i.sex,t.sex)*s;case"father":return ci(i.father?.name,t.father?.name,oe,s);case"mother":return ci(i.mother?.name,t.mother?.name,oe,s);case"children":return((i.children_count??0)-(t.children_count??0))*s;default:return ea(i,t)*s}}function Ff(i){return i?typeof i.name=="string"&&i.name?i.name:typeof i.display_name=="string"&&i.display_name?i.display_name:[i.given_names,i.surname_prefix,i.surname].map(e=>typeof e=="string"?e.trim():"").filter(Boolean).join(" ")||"Unknown":"Unknown"}var Rf=Object.defineProperty,A=(i,t,e,s)=>{for(var n=void 0,r=i.length-1,o;r>=0;r--)(o=i[r])&&(n=o(t,e,n)||n);return n&&Rf(t,e,n),n};const Vr="family-tree-panel",If="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",zf="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",Hr="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z",Bf="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",Nf="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",hi="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",Wr="M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z",jr="M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z",Ur="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",Vf="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",Hf="M7,10L12,15L17,10H7Z",Wf="M7,15L12,10L17,15H7Z",jf="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",Uf="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",qf="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z",Yf="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",Gf="/api/family_tree/brand/logo.png",Xf="/api/family_tree/brand/dark_logo.png",Kf={birth:"event_birth",death:"event_death",baptism:"event_baptism",burial:"event_burial",occupation:"event_occupation",residence:"event_residence",marriage:"event_marriage",divorce:"event_divorce",partnership:"event_partnership"},Zf=["birth","baptism","occupation","residence","death","burial"],qr=new Set(["birth","baptism","death","burial"]),Jf={exact:"qual_exact",about:"qual_about",before:"qual_before",after:"qual_after",between:"qual_between",from_to:"qual_from_to",estimated:"qual_estimated",calculated:"qual_calculated"},Qf="(max-width: 720px)";function et(i){return b`<svg class="mdi" viewBox="0 0 24 24" aria-hidden="true"><path d=${i}></path></svg>`}function ss(i,t=""){const s=!!i?.themes?.darkMode?Xf:Gf;return b`<img class="brand-logo" src=${s} alt=${t} height="36" />`}function ne(i,t){return b`
    <span class="ft-tooltip" tabindex="0">
      ${t}
      <span class="ft-tooltip__popup" role="tooltip">${i}</span>
    </span>
  `}function U(i,t){const e=t.variant??"outlined",s=t.active?" md-btn-active":"";return b`
    <button
      type="button"
      class="md-btn md-btn-${e}${s}"
      ?disabled=${t.disabled??!1}
      @click=${t.onClick}
    >
      ${i}
    </button>
  `}class C extends Le{constructor(){super(...arguments),this.narrow=!1,this._view="dashboard",this._search="",this._filterLiving="all",this._filterSex="",this._familyShortcut="",this._filterPlace="",this._dateFrom="",this._dateTo="",this._filtersOpen=!1,this._people=[],this._total=0,this._stats=null,this._settings=null,this._detail=null,this._personTab="details",this._dialogOpen=!1,this._dialogMode="person",this._editing=null,this._form={},this._eventForm={},this._error="",this._saving=!1,this._loading=!0,this._userLinks=[],this._gazetteer=null,this._gazQuery="",this._gazHits=[],this._replaceImport=!1,this._importStatus="",this._importFile=null,this._importReport=null,this._importPhase="",this._sort="surname",this._sortDir="asc",this._lineage=null,this._isMobile=!1,this._rowMenu=null,this._rowMenuAnchor=null,this._collapsed={},this._editingEventId=null,this._relationTarget=null,this._treeUnion=0,this._meQuery="",this._meCreateOpen=!1,this._meForm={},this._fieldErrors={},this._importFileName="",this._unionForm={},this._editingUnionId=null,this._pickPersonQuery="",this._pickPersonRole=null,this._parentsForm={},this._placeSuggestions=[],this._placeSuggestOpen=!1,this._siblingsPersonId="",this._siblingsPersonName="",this._siblingsList=[],this._siblingsLoading=!1,this._previewDetail=null,this._previewLoading=!1,this._unsub=null,this._placeSearchTimer=null,this._mql=null,this._connected=!1,this._viewHydrated=!1,this._charts=[],this._revision=0,this._chartsStatsKey="",this._resetFilters=()=>{this._filterLiving="all",this._filterSex="",this._familyShortcut="",this._filterPlace="",this._dateFrom="",this._dateTo="",this._persistViewState()},this._clearAllFilters=()=>{this._search="",this._resetFilters()},this._closeRowMenu=()=>{this._rowMenu=null,this._rowMenuAnchor=null},this._onWindowKeyDown=t=>{t.key==="Escape"&&(this._rowMenu?this._closeRowMenu():this._dialogOpen&&(this._dialogOpen=!1))},this._onWindowClick=()=>{this._rowMenu&&this._closeRowMenu()},this._onWindowScroll=()=>{this._rowMenu&&this._closeRowMenu()},this._onMediaChange=t=>{this._isMobile=t.matches},this._closeDialog=()=>{this._dialogOpen=!1,this._fieldErrors={},this._editingUnionId=null,this._pickPersonRole=null,this._siblingsPersonId="",this._siblingsPersonName="",this._siblingsList=[],this._siblingsLoading=!1,this._previewDetail=null,this._previewLoading=!1,this._dialogMode==="import"&&this._importPhase!=="importing"&&(this._importPhase="",this._importFile=null,this._importFileName="",this._importReport=null,this._importStatus="")}}connectedCallback(){super.connectedCallback(),this._connected=!0,this._restoreViewState(),window.addEventListener("keydown",this._onWindowKeyDown),window.addEventListener("click",this._onWindowClick),window.addEventListener("scroll",this._onWindowScroll,!0),window.addEventListener("resize",this._onWindowScroll),typeof window.matchMedia=="function"&&(this._mql=window.matchMedia(Qf),this._isMobile=this._mql.matches,this._mql.addEventListener("change",this._onMediaChange)),this._connect()}disconnectedCallback(){super.disconnectedCallback(),this._connected=!1,window.removeEventListener("keydown",this._onWindowKeyDown),window.removeEventListener("click",this._onWindowClick),window.removeEventListener("scroll",this._onWindowScroll,!0),window.removeEventListener("resize",this._onWindowScroll),this._mql?.removeEventListener("change",this._onMediaChange),this._mql=null,this._unsub?.(),this._unsub=null,this._destroyCharts()}updated(t){if(t.has("hass")&&this.hass&&!this._unsub&&this._connected&&this._connect(),this._view!=="dashboard"||this._loading){this._chartsStatsKey&&(this._chartsStatsKey="",this._destroyCharts());return}if(this._stats){const e=JSON.stringify(this._stats);e!==this._chartsStatsKey&&this.updateComplete.then(()=>{this._renderCharts()&&(this._chartsStatsKey=e)})}}_tt(t){return kf(this.hass?.language,t)}_canWrite(){return this.hass?.user?.is_admin===!0}_entryId(){const t=this.panel?.config?.config_entry_id;return typeof t=="string"&&t?t:null}_restoreViewState(){const t=Mf(typeof localStorage<"u"?localStorage:null,this._entryId());this._search=t.search,this._filterLiving=t.filterLiving,this._filterSex=t.filterSex,this._sort=t.sort,this._sortDir=t.sortDir,this._familyShortcut=t.familyShortcut,this._filterPlace=t.filterPlace,this._dateFrom=t.dateFrom,this._dateTo=t.dateTo,this._filtersOpen=t.filtersOpen,this._view=t.view==="person"?"people":t.view,this._viewHydrated=!0}_persistViewState(){this._viewHydrated&&Pf(typeof localStorage<"u"?localStorage:null,{search:this._search,filterLiving:this._filterLiving,filterSex:this._filterSex,sort:this._sort,sortDir:this._sortDir,view:this._view,familyShortcut:this._familyShortcut,filterPlace:this._filterPlace,dateFrom:this._dateFrom,dateTo:this._dateTo,filtersOpen:this._filtersOpen},this._entryId())}async _connect(){if(!(!this.hass||this._unsub))try{this._settings=await $r(this.hass),await this._refreshAll(),this._unsub=await Xu(this.hass,t=>{t.revision!==this._revision&&(this._revision=t.revision,this._refreshAll())}),this._error=""}catch(t){this._error=j(t)}finally{this._loading=!1}}async _refreshAll(){if(this.hass)try{const t=this._view==="trash",[e,s,n,r]=await Promise.all([Ku(this.hass,{trashed:t,limit:5e3}),ef(this.hass),$r(this.hass),es(this.hass).catch(()=>null)]);this._people=e.persons,this._total=e.total,this._stats=s,this._settings=n,this._lineage=r,this._detail&&(this._detail=await pt(this.hass,this._detail.person.id)),this._error=""}catch(t){this._error=j(t)}}get _activeFilterCount(){let t=0;return this._filterLiving!=="all"&&(t+=1),this._filterSex&&(t+=1),this._familyShortcut&&(t+=1),this._filterPlace&&(t+=1),this._dateFrom&&(t+=1),this._dateTo&&(t+=1),t}_toggleSort(t){this._sort===t?this._sortDir=this._sortDir==="asc"?"desc":"asc":(this._sort=t,this._sortDir="asc"),this._persistViewState()}_setView(t){this._view=t,this._detail=null,this._persistViewState(),this._refreshAll()}async _openPerson(t,e="details"){if(this.hass)try{this._detail=await pt(this.hass,t),this._view="person",this._personTab=e,this._persistViewState(),this._scrollMainToTop()}catch(s){this._error=j(s)}}async _openPersonPreview(t){if(!(!this.hass||!t)){this._dialogMode="preview",this._dialogOpen=!0,this._previewLoading=!0,this._previewDetail=null,this._error="";try{this._detail?.person.id===t?this._previewDetail=this._detail:this._previewDetail=await pt(this.hass,t)}catch(e){this._error=j(e)}finally{this._previewLoading=!1}}}_scrollMainToTop(){requestAnimationFrame(()=>{this.renderRoot.querySelector(".main")?.scrollTo?.({top:0,behavior:"instant"}),window.scrollTo({top:0,behavior:"instant"})})}_openCreate(t=!0){t&&(this._relationTarget=null),this._editing=null,this._dialogMode="person",this._error="",this._fieldErrors={},this._form={given_names:"",call_name:"",surname_prefix:"",surname:"",sex:"unknown",deceased:"false",notes:""},this._dialogOpen=!0}_openEdit(t){this._editing=t,this._dialogMode="person",this._error="",this._fieldErrors={},this._form={given_names:t.given_names||"",call_name:t.call_name||"",surname_prefix:t.surname_prefix||"",surname:t.surname||"",sex:t.sex||"unknown",deceased:t.is_living?"false":"true",notes:t.notes||""},this._dialogOpen=!0}_openAddEvent(){this._dialogMode="event",this._editingEventId=null,this._eventForm={event_type:"birth",date_mode:"simple",date_iso:"",date_qualifier:"exact",date_first:"",date_second:"",place:"",description:""},this._dialogOpen=!0}_openEditEvent(t){const e=pf(t.date_text),s=Rr(e.first)||"",n=e.qualifier==="exact"&&s!=="";this._dialogMode="event",this._editingEventId=t.id,this._eventForm={event_type:t.type,date_mode:n?"simple":"advanced",date_iso:n?s:"",date_qualifier:e.qualifier,date_first:e.first,date_second:e.second,place:t.place_name||"",description:t.description||""},this._dialogOpen=!0}_openAddRelation(t){this._relationTarget=t,this._openCreate(!1)}async _openSiblingsDialog(t,e){if(!(!this.hass||!t)){this._siblingsPersonId=t,this._siblingsPersonName=e||this._personNameById(t),this._dialogMode="siblings",this._dialogOpen=!0,this._siblingsLoading=!0,this._siblingsList=[],this._error="";try{if(this._detail?.person.id===t&&this._detail.tree?.siblings?.length)this._siblingsList=this._detail.tree.siblings;else{const s=await Zu(this.hass,t);this._siblingsPersonName=s.person_name||this._siblingsPersonName,this._siblingsList=s.siblings}}catch(s){this._error=j(s)}finally{this._siblingsLoading=!1}}}_myLinkedPersonId(){return this._lineage?.person_id??null}_lineageRel(t){return this._lineage?.relatives?.[t]??null}_ordinal(t){return(this.hass?.language||"en").toLowerCase().startsWith("nl")?`${t}e`:t%10===1&&t%100!==11?`${t}st`:t%10===2&&t%100!==12?`${t}nd`:t%10===3&&t%100!==13?`${t}rd`:`${t}th`}_personNameById(t){const e=this._people.find(s=>s.id===t);return e?V(e):this._detail?.person.id===t?V(this._detail.person):t}_lineageTooltip(t,e){const s=this._lineageRel(t),n=this._lineage?.person_name;if(!s||!n)return"";const r=e||this._personNameById(t),o=this._ordinal(s.generation),a=s.type==="ancestor"?this._tt("lineage_ancestor"):this._tt("lineage_descendant"),l=[r,o,a,n];let c=0;return this._tt("lineage_tooltip").replace(/%s/g,()=>l[c++]||"")}_lineageStar(t,e){return t===this._myLinkedPersonId()?ne(this._tt("lineage_me"),b`<span class="lineage-star">${et(Ur)}</span>`):this._lineageRel(t)?ne(this._lineageTooltip(t,e),b`<span class="lineage-star">${et(Ur)}</span>`):k}_deceasedIcon(t){return t?k:ne(this._tt("deceased"),b`<span class="deceased-icon">${et(qf)}</span>`)}_childrenCountLabel(t){return t===1?`1 ${this._tt("child")}`:`${t} ${this._tt("children").toLowerCase()}`}_moreChildrenLabel(t){const e=t===1?"more_child":"more_children";return this._tt(e).replace("%s",String(t))}_renderMoreChildrenCard(t,e){const s=this._moreChildrenLabel(t);return b`<div class="more-children-card">
      <div class="more-children-label">+ ${s}</div>
      ${e?b`<button type="button" class="linkish more-children-add" @click=${e}>
            ${et(hi)} ${this._tt("add_child")}
          </button>`:k}
    </div>`}_renderChildExtras(t,e){return t>0?this._renderMoreChildrenCard(t,e):e?b`<button type="button" class="add-slot" @click=${e}>
      ${et(hi)} ${this._tt("add_child")}
    </button>`:k}_fieldLabel(t,e=!1){return b`<span class="field-label"
      >${t}${e?b`<span class="req" aria-hidden="true">*</span>`:k}</span
    >`}_fieldError(t){const e=this._fieldErrors[t];return e?b`<div class="field-error">${e}</div>`:k}_fieldInvalid(t){return!!this._fieldErrors[t]}_onPersonField(t,e){const s=e.target.value;if(this._form={...this._form,[t]:s},this._fieldErrors[t]){const n={...this._fieldErrors};delete n[t],this._fieldErrors=n}}_validatePersonForm(){const t={};return(this._form.given_names||"").trim()||(t.given_names=this._tt("field_required")),t}_parentsCell(t){const e=[];return t.father&&e.push(this._personLink(t.father)),t.mother&&(e.length&&e.push(b`<span class="muted"> · </span>`),e.push(this._personLink(t.mother))),e.length?e:b`<span class="muted">—</span>`}_truncatePlaceLabel(t){const e=t.indexOf(",");return e>0?t.slice(0,e).trim():t}_schedulePlaceSearch(t){this._placeSearchTimer&&clearTimeout(this._placeSearchTimer);const e=t.trim();if(!e||!this.hass){this._placeSuggestions=[],this._placeSuggestOpen=!1;return}this._placeSearchTimer=setTimeout(()=>{ts(this.hass,{search:e,limit:8}).then(s=>{this._placeSuggestions=s.places,this._placeSuggestOpen=s.places.length>0})},250)}_sexBadge(t){const e=t==="male"?"sex-male":t==="female"?"sex-female":"sex-other",s=t==="male"?Wr:t==="female"?jr:Hr,n=`sex_${t}`,r=this._tt(n)!==n?this._tt(n):t;return b`<span class="sex-badge ${e}">${et(s)} ${r}</span>`}_sexIconBadge(t){const e=t==="male"?"sex-male":t==="female"?"sex-female":"sex-other",s=t==="male"?Wr:t==="female"?jr:Hr,n=`sex_${t}`,r=this._tt(n)!==n?this._tt(n):t;return ne(r,b`<span class="sex-badge sex-badge--icon-only ${e}">${et(s)}</span>`)}_sortIcon(t){return this._sort!==t?k:et(this._sortDir==="asc"?Wf:Hf)}_sortTh(t,e){return b`<th>
      <button type="button" class="sort-btn" @click=${()=>this._toggleSort(e)}>
        ${t} ${this._sortIcon(e)}
      </button>
    </th>`}_personLink(t){return t?b`<button type="button" class="linkish" @click=${()=>this._openPerson(t.id)}>
      ${t.name}
    </button>`:b`<span class="muted">—</span>`}_toggleSection(t){this._collapsed={...this._collapsed,[t]:!this._collapsed[t]}}_sectionOpen(t,e=!0){return t in this._collapsed?!this._collapsed[t]:e}_usedUniqueEventTypes(){if(!this._detail)return new Set;const t=this._editingEventId;return new Set(this._detail.events.filter(e=>qr.has(e.type)).filter(e=>e.id!==t).map(e=>e.type))}_professionFromEvents(t){const e=t.filter(s=>s.type==="occupation").sort((s,n)=>(s.sort_date||"").localeCompare(n.sort_date||""));return e.length&&e[e.length-1].description||""}_mePersonMatches(){const t=this._meQuery.trim().toLowerCase();return t?this._people.filter(e=>[e.given_names,e.call_name,e.surname_prefix,e.surname,V(e)].join(" ").toLowerCase().includes(t)).slice(0,12):[]}async _savePerson(){if(!this.hass||!this._canWrite())return;const t=this._validatePersonForm();if(this._fieldErrors=t,Object.keys(t).length)return;const e=(this._form.given_names||"").trim();this._saving=!0,this._error="";try{const s={given_names:e,call_name:this._form.call_name,surname_prefix:this._form.surname_prefix,surname:this._form.surname,sex:this._form.sex,is_living:this._form.deceased!=="true",notes:this._form.notes};this._editing?.id&&(s.person_id=this._editing.id);const{person:n}=await Ju(this.hass,s),r=this._relationTarget;this._relationTarget=null,this._dialogOpen=!1;let o=null,a=n.id;if(r){if(r.kind==="parent")await ye(this.hass,{parent_id:n.id,child_id:r.personId});else if(r.kind==="child")await ye(this.hass,{parent_id:r.personId,child_id:n.id,union_id:r.unionId});else if(r.kind==="partner"){const{union:l}=await Qi(this.hass,{partner_ids:[r.personId,n.id]});o=l.id,a=r.personId}}await this._refreshAll(),o?(await this._openPerson(a),this._personTab="relationships",await this._openUnionEdit(o)):await this._openPerson(a)}catch(s){this._error=j(s)}finally{this._saving=!1}}async _deleteCurrent(){if(!this.hass||!this._detail||!this._canWrite())return;const t=V(this._detail.person);if(confirm(this._tt("confirm_delete_person").replace("%s",t)))try{await kr(this.hass,this._detail.person.id),this._detail=null,this._view="people",await this._refreshAll()}catch(e){this._error=j(e)}}async _restore(t){if(!(!this.hass||!this._canWrite()))try{await Qu(this.hass,t),await this._refreshAll()}catch(e){this._error=j(e)}}async _purge(t){if(!this.hass||!this._canWrite())return;const e=this._people.find(n=>n.id===t),s=e?V(e):t;if(confirm(this._tt("confirm_purge_person").replace("%s",s)))try{await tf(this.hass,t),await this._refreshAll()}catch(n){this._error=j(n)}}_toggleEventDateMode(){if((this._eventForm.date_mode||"simple")==="simple"){const s=this._eventForm.date_iso?Fr(this._eventForm.date_iso):this._eventForm.date_first||"";this._eventForm={...this._eventForm,date_mode:"advanced",date_qualifier:"exact",date_first:s,date_iso:""};return}const e=Rr(this._eventForm.date_first||"")||"";this._eventForm={...this._eventForm,date_mode:"simple",date_iso:e,date_qualifier:"exact",date_first:"",date_second:""}}async _saveEvent(){if(!(!this.hass||!this._detail||!this._canWrite())){this._saving=!0;try{let t=null;const e=(this._eventForm.place||"").trim();if(e){const r=(await ts(this.hass,{search:e,limit:20})).places.find(o=>o.name.localeCompare(e,void 0,{sensitivity:"accent"})===0);if(r)t=r.id;else{const{place:o}=await Sr(this.hass,{name:e});t=o.id}}let s="";if((this._eventForm.date_mode||"simple")==="simple")s=Fr(this._eventForm.date_iso||"");else{const n=this._eventForm.date_qualifier||"exact",r=Tr(n,this._eventForm.date_first||"",this._eventForm.date_second||"");if(r.error){this._error=this._tt("date_invalid");return}s=r.value}await Mr(this.hass,{...this._editingEventId?{event_id:this._editingEventId}:{},subject_type:"person",subject_id:this._detail.person.id,event_type:this._eventForm.event_type||"birth",date_text:s,place:this._eventForm.place||void 0,description:this._eventForm.description||"",place_id:t}),this._eventForm={},this._editingEventId=null,this._dialogOpen=!1,this._detail=await pt(this.hass,this._detail.person.id)}catch(t){this._error=j(t)}finally{this._saving=!1}}}async _authHeaders(){const t={},e=this.hass?.connection?.options?.auth?.accessToken,n=this.hass.auth?.data?.access_token||e;return n&&(t.Authorization=`Bearer ${n}`),t}async _previewGedcom(t){if(!(!this.hass||!this._canWrite())){this._importFile=t,this._importFileName=t.name,this._importPhase="preview",this._importReport=null,this._importStatus=this._tt("loading"),this._dialogMode="import",this._dialogOpen=!0;try{const e=new FormData;e.append("file",t);const n=await fetch("/api/family_tree/import_gedcom?preview=1",{method:"POST",body:e,credentials:"same-origin",headers:await this._authHeaders()});if(!n.ok){const o=await n.text();throw new Error(o||`Preview failed (${n.status})`)}const r=await n.json();this._importReport=r.report||{},this._importStatus=""}catch(e){this._importStatus="",this._importPhase="",this._dialogOpen=!1,this._error=j(e)}}}async _confirmImport(){this._importFile&&await this._importGedcom(this._importFile)}async _importGedcom(t){if(!(!this.hass||!this._canWrite())){this._importFileName||(this._importFileName=t.name),this._importPhase="importing",this._importStatus=this._tt("importing"),this._dialogMode="import",this._dialogOpen=!0;try{const e=new FormData;e.append("file",t);const s=`/api/family_tree/import_gedcom?replace=${this._replaceImport?"1":"0"}`,n=await fetch(s,{method:"POST",body:e,credentials:"same-origin",headers:await this._authHeaders()});if(!n.ok){const o=await n.text();throw new Error(o||`Import failed (${n.status})`)}const r=await n.json();this._importReport=r.report||{},this._importPhase="done",this._importStatus="",this._importFile=null,await this._refreshAll()}catch(e){this._importStatus="",this._importPhase="",this._dialogOpen=!1,this._error=j(e)}}}_pickGedcomFile(){this.renderRoot.querySelector("#ft-gedcom-file")?.click()}_onGedcomFileChange(t){const e=t.target.files?.[0];t.target.value="",e&&this._previewGedcom(e)}_renderEmptyCta(){return this._canWrite()?b`<div class="empty-state">
      ${ss(this.hass,this._tt("brand"))}
      <p>${this._tt("empty_cta_hint")}</p>
      <div class="empty-actions">
        ${U(this._tt("add_person"),{variant:"filled",onClick:()=>this._openCreate()})}
        ${U(this._tt("import_gedcom"),{variant:"outlined",onClick:()=>this._pickGedcomFile()})}
      </div>
      <input
        id="ft-gedcom-file"
        class="sr-only"
        type="file"
        accept=".ged,text/plain"
        @change=${t=>this._onGedcomFileChange(t)}
      />
    </div>`:b`<div class="empty-state">
        ${ss(this.hass,this._tt("brand"))}
        <p>${this._tt("no_people")}</p>
      </div>`}async _deleteEvent(t){if(!(!this.hass||!this._canWrite()))try{await of(this.hass,t),this._detail&&(this._detail=await pt(this.hass,this._detail.person.id))}catch(e){this._error=j(e)}}async _loadSettingsExtras(){if(this.hass)try{this._userLinks=(await af(this.hass)).links,this._gazetteer=await cf(this.hass)}catch(t){this._error=j(t)}}async _runGazSearch(){if(!(!this.hass||!this._gazQuery.trim()))try{const t=await lf(this.hass,this._gazQuery.trim());this._gazHits=t.results}catch(t){this._error=j(t)}}_exportGedcom(){window.open("/api/family_tree/export_gedcom","_blank")}_destroyCharts(){for(const t of this._charts)t.destroy();this._charts=[]}_renderCharts(){if(this._destroyCharts(),!this._stats)return!1;const t=this.renderRoot.querySelectorAll(".chart-wrap canvas").length,e=(s,n,r,o)=>{const a=this.renderRoot.querySelector(`#${s}`);if(!a||!r.length)return;const l=getComputedStyle(this),c=l.getPropertyValue("--primary-text-color").trim()||"#333",h=l.getPropertyValue("--primary-color").trim()||"#03a9f4";this._charts.push(new Os(a,{type:n,data:{labels:r,datasets:[{data:o,backgroundColor:n==="doughnut"?o.map((d,u)=>`hsl(${u*47%360} 55% 55%)`):h,borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:n==="doughnut",position:"bottom",labels:{color:c,boxWidth:12,padding:8}}},scales:n==="bar"?{x:{ticks:{color:c},grid:{display:!1}},y:{ticks:{color:c},grid:{color:"rgba(127,127,127,0.2)"},beginAtZero:!0}}:void 0}}))};return e("ft-ages","bar",this._stats.ages.labels,this._stats.ages.values),e("ft-centuries","bar",this._stats.centuries.labels,this._stats.centuries.values),e("ft-places","doughnut",this._stats.places_of_birth.labels.map(s=>this._truncatePlaceLabel(s)),this._stats.places_of_birth.values),t>0&&this._charts.length===t}get _filteredPeople(){return Ef(this._people,{search:this._search,filterLiving:this._filterLiving,filterSex:this._filterSex,sort:this._sort,sortDir:this._sortDir,familyShortcut:this._familyShortcut,filterPlace:this._filterPlace,dateFrom:this._dateFrom,dateTo:this._dateTo})}_toggleSidebar(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}render(){return b`
      <div class="shell">
        <header class="top">
          ${this.narrow?b`<button class="icon-btn" @click=${this._toggleSidebar} aria-label=${this._tt("tab_menu")}>
                ${et(If)}
              </button>`:k}
          <div class="brand">${ss(this.hass,this._tt("brand"))}</div>
          <nav class="tabs">
            <button class=${this._view==="dashboard"?"active":""} @click=${()=>this._setView("dashboard")}>
              ${this._tt("nav_dashboard")}
            </button>
            <button class=${this._view==="people"||this._view==="person"?"active":""} @click=${()=>this._setView("people")}>
              ${this._tt("nav_people")}
            </button>
            <button class=${this._view==="trash"?"active":""} @click=${()=>this._setView("trash")}>
              ${et(Nf)} ${this._tt("nav_trash")}
            </button>
            <button class=${this._view==="settings"?"active":""} @click=${()=>{this._setView("settings"),this._loadSettingsExtras()}}>
              ${et(Bf)} ${this._tt("nav_settings")}
            </button>
          </nav>
        </header>

        ${this._canWrite()?k:b`<p class="banner">${this._tt("read_only")}</p>`}
        ${this._error?b`<p class="error" role="alert">${this._error}</p>`:k}

        <main class="main">
          ${this._loading?b`<p class="muted">${this._tt("loading")}</p>`:this._view==="dashboard"?this._renderDashboard():this._view==="person"&&this._detail?this._renderPerson():this._view==="settings"?this._renderSettings():this._renderPeopleList()}
        </main>
      </div>
      ${this._dialogOpen?this._renderDialog():k}
      ${this._rowMenu?this._renderFixedRowMenu():k}
    `}_renderDashboard(){const t=this._stats,e=this._settings?.upcoming_birthdays||[],s=this._settings?.upcoming_anniversaries||[],n=this._settings?.family_shortcuts||[],r=(t?.total_persons??0)===0,o=!!t?.ages.labels.length,a=!!t?.centuries.labels.length,l=!!t?.places_of_birth.labels.length,c=o||a||l;return b`
      ${r?this._renderEmptyCta():b`
      <section class="stats-row">
        <div class="stat"><span class="stat-n">${t?.total_persons??"—"}</span><span class="stat-label">${this._tt("stats_total")}</span></div>
        <div class="stat"><span class="stat-n">${t?.living??"—"}</span><span class="stat-label">${this._tt("stats_living")}</span></div>
        <div class="stat"><span class="stat-n">${t?.deceased??"—"}</span><span class="stat-label">${this._tt("stats_deceased")}</span></div>
      </section>
      ${c?b`<section class="charts">
            ${o?b`<div class="chart-card"><h3>${this._tt("chart_ages")}</h3><div class="chart-wrap"><canvas id="ft-ages"></canvas></div></div>`:k}
            ${a?b`<div class="chart-card"><h3>${this._tt("chart_centuries")}</h3><div class="chart-wrap"><canvas id="ft-centuries"></canvas></div></div>`:k}
            ${l?b`<div class="chart-card"><h3>${this._tt("chart_places")}</h3><div class="chart-wrap"><canvas id="ft-places"></canvas></div></div>`:k}
          </section>`:k}
      ${n.length?b`<section class="block">
            <h3>${this._tt("families")}</h3>
            <div class="chip-row">
              ${n.map(h=>b`<button class="chip ${this._familyShortcut===h?"on":""}"
                  @click=${()=>{this._familyShortcut=this._familyShortcut===h?"":h,this._persistViewState(),this._setView("people")}}>
                  ${h}
                </button>`)}
            </div>
          </section>`:k}
      <section class="two-col">
        <div class="block">
          <h3>${this._tt("upcoming_birthdays")}</h3>
          <ul class="plain">
            ${e.length?e.slice(0,8).map(h=>b`<li>
                    <button class="linkish" @click=${()=>this._openPerson(String(h.person_id))}>
                      ${h.name}
                    </button>
                    <span class="muted">${Ir(Number(h.days_until),this._tt("days"))}</span>
                  </li>`):b`<li class="muted">—</li>`}
          </ul>
        </div>
        <div class="block">
          <h3 class="heading-with-tip">
            ${this._tt("upcoming_anniversaries")}
            ${ne(this._tt("anniversaries_hint"),b`<span class="info-tip">${et(Yf)}</span>`)}
          </h3>
          <ul class="plain">
            ${s.length?s.slice(0,8).map(h=>{const d=h.names||[],u=d.join(" & "),f=h.years!=null?this._tt("anniversary_years").replace("%s",String(h.years)):"",p=d[0]?this._people.find(g=>V(g).toLowerCase()===d[0].toLowerCase()):void 0;return b`<li>
                    ${p?b`<button class="linkish" @click=${()=>this._openPerson(p.id)}>
                          ${u}
                        </button>`:b`<span>${u}</span>`}
                    <span class="muted">
                      ${f?`${f} · `:""}${Ir(Number(h.days_until),this._tt("days"))}
                    </span>
                  </li>`}):b`<li class="muted">${this._tt("no_anniversaries")}</li>`}
          </ul>
        </div>
      </section>`}
    `}_activeFilterChips(){const t=[];if(this._search.trim()&&t.push({label:`${this._tt("filter_search")}: ${this._search.trim()}`,clear:()=>{this._search="",this._persistViewState()}}),this._filterLiving!=="all"&&t.push({label:this._filterLiving==="living"?this._tt("filter_living"):this._tt("filter_deceased"),clear:()=>{this._filterLiving="all",this._persistViewState()}}),this._filterSex){const e=`sex_${this._filterSex}`;t.push({label:this._tt(e)!==e?this._tt(e):this._filterSex,clear:()=>{this._filterSex="",this._persistViewState()}})}if(this._familyShortcut&&t.push({label:`${this._tt("filter_family")}: ${this._familyShortcut}`,clear:()=>{this._familyShortcut="",this._persistViewState()}}),this._filterPlace){const e=Nr(this._people).find(s=>s.id===this._filterPlace);t.push({label:`${this._tt("place")}: ${e?.label||this._filterPlace}`,clear:()=>{this._filterPlace="",this._persistViewState()}})}return this._dateFrom&&t.push({label:`${this._tt("filter_date_from")}: ${this._dateFrom}`,clear:()=>{this._dateFrom="",this._persistViewState()}}),this._dateTo&&t.push({label:`${this._tt("filter_date_to")}: ${this._dateTo}`,clear:()=>{this._dateTo="",this._persistViewState()}}),t}_renderPeopleList(){const t=this._filteredPeople,e=Cf(this._settings?.family_shortcuts||[],this._familyShortcut),s=Nr(this._people),n=this._view!=="trash",r=this._activeFilterChips(),o=this.hass?.language;return b`
      <div class="toolbar">
        <input
          type="search"
          .value=${this._search}
          placeholder=${this._tt("search_placeholder")}
          @input=${a=>{this._search=a.target.value,this._persistViewState()}}
        />
        ${n?b`<div class="toolbar-actions">
              ${U(`${this._tt("filters")}${this._activeFilterCount?` (${this._activeFilterCount})`:""}`,{variant:"outlined",active:this._filtersOpen||this._activeFilterCount>0,onClick:()=>{this._filtersOpen=!this._filtersOpen,this._persistViewState()}})}
              ${this._canWrite()&&this._view!=="trash"?U(this._tt("add_person"),{variant:"filled",onClick:()=>this._openCreate()}):k}
            </div>`:this._canWrite()&&this._view!=="trash"?b`<div class="toolbar-actions">
                ${U(this._tt("add_person"),{variant:"filled",onClick:()=>this._openCreate()})}
              </div>`:k}
      </div>
      ${n&&this._filtersOpen?b`<div class="filters">
            <select
              aria-label=${this._tt("filter_all")}
              .value=${this._filterLiving}
              @change=${a=>{this._filterLiving=a.target.value,this._persistViewState()}}
            >
              <option value="all">${this._tt("filter_all")}</option>
              <option value="living">${this._tt("filter_living")}</option>
              <option value="deceased">${this._tt("filter_deceased")}</option>
            </select>
            <select
              aria-label=${this._tt("sex")}
              .value=${this._filterSex}
              @change=${a=>{this._filterSex=a.target.value,this._persistViewState()}}
            >
              <option value="">${this._tt("filter_all_sexes")}</option>
              <option value="male">${this._tt("sex_male")}</option>
              <option value="female">${this._tt("sex_female")}</option>
              <option value="intersex">${this._tt("sex_intersex")}</option>
              <option value="unknown">${this._tt("sex_unknown")}</option>
            </select>
            <select
              aria-label=${this._tt("filter_family")}
              .value=${this._familyShortcut}
              @change=${a=>{this._familyShortcut=a.target.value,this._persistViewState()}}
            >
              <option value="">${this._tt("filter_all_families")}</option>
              ${e.map(a=>b`<option value=${a}>${a}</option>`)}
            </select>
            <select
              aria-label=${this._tt("place")}
              .value=${this._filterPlace}
              @change=${a=>{this._filterPlace=a.target.value,this._persistViewState()}}
            >
              <option value="">${this._tt("filter_all_places")}</option>
              ${s.map(a=>b`<option value=${a.id}>${a.label}</option>`)}
            </select>
            <label class="date-filter">
              <span class="muted">${this._tt("filter_date_from")}</span>
              <input
                type="date"
                .value=${this._dateFrom}
                @change=${a=>{this._dateFrom=a.target.value,this._persistViewState()}}
              />
            </label>
            <label class="date-filter">
              <span class="muted">${this._tt("filter_date_to")}</span>
              <input
                type="date"
                .value=${this._dateTo}
                @change=${a=>{this._dateTo=a.target.value,this._persistViewState()}}
              />
            </label>
            ${this._activeFilterCount?b`<button type="button" @click=${this._resetFilters}>
                  ${this._tt("filter_reset")}
                </button>`:k}
          </div>`:k}
      ${r.length?b`<div class="filter-chips">
            ${r.map(a=>b`<button type="button" class="chip on" @click=${a.clear}>
                ${a.label} ×
              </button>`)}
            <button type="button" class="chip" @click=${this._clearAllFilters}>
              ${this._tt("filter_clear_all")}
            </button>
          </div>`:k}
      <p class="muted">${t.length} / ${this._total}</p>
      ${t.length===0?this._view==="trash"||this._search||this._filterLiving!=="all"||this._filterSex||r.length?b`<p>${this._tt("no_people")}</p>`:this._renderEmptyCta():this._isMobile?b`<div class="card-list people-cards">
              ${t.map(a=>this._renderPeopleCard(a,o))}
            </div>`:b`<div class="table-wrap">
              <table class="people-table">
                <thead>
                  <tr>
                    ${this._sortTh(this._tt("col_name"),"name")}
                    ${this._sortTh(this._tt("col_birth"),"birth")}
                    ${this._sortTh(this._tt("col_death"),"death")}
                    ${this._sortTh(this._tt("sex"),"sex")}
                    <th>${this._tt("col_parents")}</th>
                    ${this._sortTh(this._tt("col_children"),"children")}
                    <th>${this._tt("col_lineage")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${t.map(a=>this._renderPeopleRow(a,o))}
                </tbody>
              </table>
            </div>`}
    `}_renderPeopleCard(t,e){const s=Oe(t.birth,e),n=Lr(t.birth,t.death,t.is_living,e),r=[t.father?.name,t.mother?.name].filter(Boolean).join(" · "),o=this._view==="trash";return b`
      <div class="person-card-wrap">
        <button type="button" class="person-card" @click=${()=>this._openPerson(t.id)}>
          <div class="person-card-head">
            <div class="person-card-title">
              ${this._deceasedIcon(t.is_living)} ${V(t)}
            </div>
            ${this._lineageStar(t.id,V(t))}
          </div>
          <div class="person-card-meta">${this._sexBadge(t.sex)}</div>
          ${s?b`<div class="person-card-meta">${s}</div>`:k}
          ${n?b`<div class="person-card-meta">${n}</div>`:k}
          ${r?b`<div class="person-card-meta">${r}</div>`:k}
          ${(t.children_count??0)>0?b`<div class="person-card-footer">
                ${this._childrenCountLabel(t.children_count??0)}
              </div>`:k}
        </button>
        ${o&&this._canWrite()?b`<div class="card-actions">
              <button type="button" @click=${()=>this._restore(t.id)}>
                ${this._tt("restore")}
              </button>
              <button type="button" class="danger" @click=${()=>this._purge(t.id)}>
                ${this._tt("purge")}
              </button>
            </div>`:k}
      </div>
    `}_renderFixedRowMenu(){const t=this._rowMenu,e=this._rowMenuAnchor;if(!t||!e)return k;const s=window.innerWidth-e.right,n=e.up?`bottom:${window.innerHeight-e.top+4}px;right:${s}px;`:`top:${e.bottom+4}px;right:${s}px;`;return b`<div
      class="row-menu row-menu--fixed"
      style=${n}
      @click=${r=>r.stopPropagation()}
    >
      <button type="button" @click=${()=>{this._closeRowMenu(),this._openPerson(t)}}>${this._tt("details")}</button>
      <button type="button" @click=${()=>{this._closeRowMenu(),this._openPerson(t).then(()=>{this._personTab="tree"})}}>${this._tt("tree")}</button>
      ${this._canWrite()?b`<button type="button" class="danger" @click=${()=>{this._closeRowMenu(),this._deletePersonById(t)}}>${this._tt("delete")}</button>`:k}
    </div>`}_renderPeopleRow(t,e){const s=Oe(t.birth,e),n=Lr(t.birth,t.death,t.is_living,e),r=this._rowMenu===t.id;return b`<tr>
      <td>
        <button type="button" class="linkish name-cell" @click=${()=>this._openPerson(t.id)}>
          ${V(t)}
        </button>
      </td>
      <td><span class="date-badge">${s||"—"}</span></td>
      <td><span class="date-badge">${n||"—"}</span></td>
      <td>${this._sexBadge(t.sex)}</td>
      <td>${this._parentsCell(t)}</td>
      <td class="num">${t.children_count??0}</td>
      <td class="center">${this._lineageStar(t.id)}</td>
      <td class="menu-cell">
        ${this._view==="trash"&&this._canWrite()?b`<span class="row-actions">
              <button @click=${()=>this._restore(t.id)}>${this._tt("restore")}</button>
              <button class="danger" @click=${()=>this._purge(t.id)}>${this._tt("purge")}</button>
            </span>`:b`<div class="row-menu-wrap">
              <button
                type="button"
                class="icon-btn sm${r?" active":""}"
                aria-label=${this._tt("actions")}
                @click=${o=>{if(o.stopPropagation(),r){this._closeRowMenu();return}const a=o.currentTarget.getBoundingClientRect(),l=this._canWrite()?130:88;this._rowMenuAnchor={top:a.top,bottom:a.bottom,right:a.right,up:a.bottom+l>window.innerHeight},this._rowMenu=t.id}}
              >
                ${et(Vf)}
              </button>
            </div>`}
      </td>
    </tr>`}async _deletePersonById(t){if(!this.hass||!this._canWrite())return;const e=this._people.find(n=>n.id===t),s=e?V(e):t;if(confirm(this._tt("confirm_delete_person").replace("%s",s)))try{await kr(this.hass,t),await this._refreshAll()}catch(n){this._error=j(n)}}_eventTypeLabel(t){const e=Kf[t];return e?this._tt(e):t}_renderPersonCard(t,e={}){const s=String(t.id||""),n=Ff(t),r=typeof t.sex=="string"?t.sex:"unknown",o=typeof t.formal_name=="string"&&t.formal_name||[t.given_names,t.surname_prefix,t.surname].map(f=>typeof f=="string"?f.trim():"").filter(Boolean).join(" "),a=vf({birth_date_text:typeof t.birth_date_text=="string"?t.birth_date_text:"",birth_sort_date:typeof t.birth_sort_date=="string"?t.birth_sort_date:null,death_date_text:typeof t.death_date_text=="string"?t.death_date_text:"",death_sort_date:typeof t.death_sort_date=="string"?t.death_sort_date:null,is_living:t.is_living!==!1}),l=typeof t.birth_place=="string"?t.birth_place:"",c=Number(t.sibling_count||0),h=t.is_living!==!1,d=e.preview!==!1;return b`
      <button type="button" class="person-card" @click=${()=>{s&&(d?this._openPersonPreview(s):this._openPerson(s))}}>
        <div class="person-card-head">
          <div class="person-card-title">
            ${this._deceasedIcon(h)} ${this._sexIconBadge(r)} ${n}
          </div>
          ${s?this._lineageStar(s,n):k}
        </div>
        ${o&&o!==n?b`<div class="person-card-formal">${o}</div>`:k}
        ${a?b`<div class="person-card-meta">${a}</div>`:k}
        ${l?b`<div class="person-card-meta">${l}</div>`:k}
        ${e.subtitle?b`<div class="person-card-meta accent">${e.subtitle}</div>`:k}
        ${c>0&&!e.hideSiblings?b`<span
              role="button"
              tabindex="0"
              class="person-card-footer linkish"
              @click=${f=>{f.stopPropagation(),this._openSiblingsDialog(s,n)}}
              @keydown=${f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),f.stopPropagation(),this._openSiblingsDialog(s,n))}}
            >
              +${c} ${this._tt("siblings_count")}
            </span>`:e.footer?b`<div class="person-card-footer">${e.footer}</div>`:k}
      </button>
    `}_renderEventCard(t){const e=this._canWrite()&&t.subject_type==="person",s=this.hass?.language;return b`
      <div class="event-card">
        <div class="event-card-head">
          <strong>${this._eventTypeLabel(t.type)}</strong>
          ${e?b`<span class="row-actions">
                <button class="linkish" @click=${()=>this._openEditEvent(t)}>${this._tt("edit")}</button>
                <button class="linkish danger" @click=${()=>this._deleteEvent(t.id)}>${this._tt("delete")}</button>
              </span>`:k}
        </div>
        <div class="event-card-meta">${Oe(t,s)||mf(t.date_text)}</div>
        ${t.place_name?b`<div class="event-card-meta">${t.place_name}</div>`:k}
        ${t.description?b`<div class="event-card-desc">${t.description}</div>`:k}
      </div>
    `}_renderCollapsibleSection(t,e,s,n=!0,r="default"){const o=this._sectionOpen(t,n);return b`<section class="collapse ${r==="cards"?"collapse--cards":""}">
      <button type="button" class="collapse-head" @click=${()=>this._toggleSection(t)}>
        <span>${e}</span>
        ${et(o?jf:Uf)}
      </button>
      ${o?b`<div class="collapse-body">${s}</div>`:k}
    </section>`}_pickPersonMatches(){const t=this._pickPersonQuery.trim().toLowerCase();if(!t||!this._detail)return[];const e=this._detail.person.id;return this._people.filter(s=>s.id!==e&&!s.deleted_at).filter(s=>[s.given_names,s.call_name,s.surname_prefix,s.surname,V(s)].join(" ").toLowerCase().includes(t)).slice(0,12)}_openPickPerson(t){this._pickPersonRole=t,this._pickPersonQuery="",this._dialogMode="pickPerson",this._dialogOpen=!0,this._error=""}_openParentsDialog(){const t=this._detail?.tree?.parents||[],e=t.find(n=>n.sex==="male"),s=t.find(n=>n.sex==="female");this._parentsForm={father_id:e?String(e.id):"",mother_id:s?String(s.id):""},this._dialogMode="parents",this._dialogOpen=!0,this._error=""}async _openUnionEdit(t){if(this.hass)try{const e=await sf(this.hass,t),s=e.events.find(n=>n.type==="marriage");this._editingUnionId=t,this._unionForm={status:e.union.status||"ongoing",notes:e.union.notes||"",known_children_count:e.union.known_children_count!=null?String(e.union.known_children_count):"",marriage_date:s?.date_text||"",marriage_place:s?.place_name||""},this._dialogMode="union",this._dialogOpen=!0,this._error=""}catch(e){this._error=j(e)}}async _linkPickedPerson(t){if(!this.hass||!this._detail||!this._pickPersonRole)return;const e=this._detail.person.id;this._saving=!0;try{this._pickPersonRole==="partner"?await Qi(this.hass,{partner_ids:[e,t]}):(this._pickPersonRole==="father"||this._pickPersonRole==="mother")&&await ye(this.hass,{parent_id:t,child_id:e}),this._dialogOpen=!1,this._pickPersonRole=null,this._detail=await pt(this.hass,e),await this._refreshAll()}catch(s){this._error=j(s)}finally{this._saving=!1}}async _saveParentsLinks(){if(!this.hass||!this._detail)return;const t=this._detail.person.id,e=(this._parentsForm.father_id||"").trim(),s=(this._parentsForm.mother_id||"").trim();this._saving=!0;try{e&&await ye(this.hass,{parent_id:e,child_id:t}),s&&await ye(this.hass,{parent_id:s,child_id:t}),this._dialogOpen=!1,this._detail=await pt(this.hass,t),await this._refreshAll()}catch(n){this._error=j(n)}finally{this._saving=!1}}async _removeParentLink(t){if(!(!this.hass||!this._detail||!confirm(this._tt("confirm_remove_parent"))))try{await rf(this.hass,t),this._detail=await pt(this.hass,this._detail.person.id),await this._refreshAll()}catch(e){this._error=j(e)}}async _deleteUnion(t){if(!(!this.hass||!this._detail||!confirm(this._tt("confirm_delete_union"))))try{await nf(this.hass,t),this._detail=await pt(this.hass,this._detail.person.id),await this._refreshAll()}catch(e){this._error=j(e)}}async _saveUnionForm(){if(!this.hass||!this._detail||!this._editingUnionId)return;const t=this._detail.person.id,s=(this._detail.tree?.partners||[]).find(o=>o.union_id===this._editingUnionId);if(!s)return;const n=[t,...(s.partners||[]).map(o=>String(o.id||""))].filter(Boolean),r=[...new Set(n)];this._saving=!0;try{const o=(this._unionForm.known_children_count||"").trim();await Qi(this.hass,{union_id:this._editingUnionId,partner_ids:r,status:this._unionForm.status||"ongoing",notes:this._unionForm.notes||"",known_children_count:o?Number(o):null});const a=(this._unionForm.marriage_date||"").trim(),l=(this._unionForm.marriage_place||"").trim();let c;if(l){const d=(await ts(this.hass,{search:l,limit:20})).places.find(u=>u.name.localeCompare(l,void 0,{sensitivity:"accent"})===0);if(d)c=d.id;else{const{place:u}=await Sr(this.hass,{name:l});c=u.id}}if(a){const h=Tr("exact",a);!h.error&&h.value&&await Mr(this.hass,{subject_type:"union",subject_id:this._editingUnionId,type:"marriage",date_text:h.value,date_qualifier:"exact",place_id:c})}this._dialogOpen=!1,this._editingUnionId=null,this._detail=await pt(this.hass,t),await this._refreshAll()}catch(o){this._error=j(o)}finally{this._saving=!1}}_renderRelPersonCard(t,e={}){const s=String(t.id||"");return b`<div class="rel-person-wrap">
      ${this._renderPersonCard(t)}
      ${e.onRemove?b`<div class="rel-person-actions">
            <button type="button" class="linkish" @click=${()=>s&&this._openPerson(s)}>
              ${this._tt("details")}
            </button>
            <button type="button" class="linkish danger" @click=${e.onRemove}>
              ${this._tt("delete")}
            </button>
          </div>`:k}
    </div>`}_renderRelationshipsTab(t){const e=t.tree,s=e?.parents||[],n=e?.partners||[],r=this._canWrite(),o=r&&s.length<2,a=b`
      ${o?b`<div class="section-head">
            <button type="button" class="linkish" @click=${()=>this._openParentsDialog()}>
              ${this._tt("add_parents")}
            </button>
          </div>`:k}
      <div class="card-list rel-card-list">
        ${s.length?s.map(c=>this._renderRelPersonCard(c,{onRemove:r&&c.link_id?()=>void this._removeParentLink(String(c.link_id)):void 0})):b`<p class="muted">—</p>`}
      </div>
    `,l=b`
      ${r?b`<div class="section-head section-head-actions">
            ${U(this._tt("add_partner"),{variant:"filled",onClick:()=>this._openAddRelation({kind:"partner",personId:t.person.id})})}
            ${U(this._tt("link_existing_person"),{onClick:()=>this._openPickPerson("partner")})}
          </div>`:k}
      ${n.length?b`<div class="card-list">
            ${n.map(c=>{const h=c.children||[],d=c.known_children_count,u=d!=null&&d>h.length?d-h.length:0,f=String(c.partners?.[0]?.id||"");return b`<div class="rel-union-card">
                <div class="rel-union-head">
                  <strong>
                    ${(c.partners||[]).map(p=>String(p.name||"")).filter(Boolean).join(" & ")||this._tt("partners")}
                  </strong>
                  ${r?b`<span class="row-actions">
                        <button
                          type="button"
                          class="linkish"
                          @click=${()=>this._openUnionEdit(c.union_id)}
                        >
                          ${this._tt("edit")}
                        </button>
                        <button
                          type="button"
                          class="linkish danger"
                          @click=${()=>this._deleteUnion(c.union_id)}
                        >
                          ${this._tt("delete")}
                        </button>
                      </span>`:k}
                </div>
                ${c.marriage_date||c.divorce_date||c.known_children_count!=null?b`<div class="rel-union-meta">
                      ${c.marriage_date?b`<div>${this._tt("event_marriage")}: <strong>${c.marriage_date}</strong></div>`:k}
                      ${c.divorce_date?b`<div>${this._tt("event_divorce")}: <strong>${c.divorce_date}</strong></div>`:k}
                      ${c.known_children_count!=null?b`<div>
                            ${this._tt("known_children")}:
                            <strong>${c.known_children_count}</strong>
                          </div>`:k}
                    </div>`:k}
                <div class="rel-card-list">
                  ${(c.partners||[]).map(p=>this._renderPersonCard(p))}
                </div>
                <div class="rel-union-children">
                  <span class="muted">${this._tt("children")}</span>
                  <div class="rel-card-list">
                    ${h.map(p=>this._renderPersonCard(p))}
                    ${this._renderChildExtras(u,r?()=>this._openAddRelation({kind:"child",personId:t.person.id,unionId:c.union_id,coParentId:f}):void 0)}
                  </div>
                  ${!h.length&&!u&&!r?b`<p class="muted">—</p>`:k}
                </div>
              </div>`})}
          </div>`:b`<p class="muted">—</p>`}
    `;return b`
      ${this._renderCollapsibleSection("rel-parents",this._tt("section_parents"),a,!0,"cards")}
      ${this._renderCollapsibleSection("rel-partners",this._tt("section_partners"),l,!0,"cards")}
    `}_renderPersonDetailsTab(t){const e=t.person,s=this.hass?.language,n=this._professionFromEvents(t.events),r=b`<dl class="kv">
      <dt>${this._tt("given_names")}</dt><dd>${e.given_names||"—"}</dd>
      <dt>${this._tt("call_name")}</dt><dd>${e.call_name||"—"}</dd>
      <dt>${this._tt("surname_prefix")}</dt><dd>${e.surname_prefix||"—"}</dd>
      <dt>${this._tt("surname")}</dt><dd>${e.surname||"—"}</dd>
      <dt>${this._tt("sex")}</dt><dd>${this._sexBadge(e.sex)}</dd>
      ${n?b`<dt>${this._tt("profession")}</dt><dd>${n}</dd>`:k}
      <dt>${this._tt("lifespan")}</dt>
      <dd>${Or(e.birth,e.death,e.is_living,s)||"—"}</dd>
      <dt>${this._tt("notes")}</dt><dd>${e.notes||"—"}</dd>
    </dl>`,o=b`
      <div class="section-head">
        ${this._canWrite()?U(`+ ${this._tt("add_event")}`,{variant:"filled",onClick:()=>this._openAddEvent()}):k}
      </div>
      <div class="card-list">
        ${t.events.map(a=>this._renderEventCard(a))}
        ${t.events.length===0?b`<p class="muted">—</p>`:k}
      </div>
    `;return b`
      ${this._renderCollapsibleSection("personal",this._tt("section_personal"),r)}
      ${this._renderCollapsibleSection("events",this._tt("events"),o)}
    `}_sortParents(t){const e={male:0,female:1,unknown:2};return[...t].sort((s,n)=>{const r=e[String(s.sex||"unknown")]??2,o=e[String(n.sex||"unknown")]??2;return r-o})}_allGrandparents(t){if(!t?.grandparents)return[];const e=new Set,s=[];for(const n of t.parents||[])for(const r of t.grandparents[String(n.id)]||[]){const o=r,a=String(o.id||"");a&&!e.has(a)&&(e.add(a),s.push(o))}return s}_renderGenRow(t,e){return b`<div class="gen-row">
      <span class="gen-label muted">${t}</span>
      <div class="gen">${e}</div>
    </div>`}_renderTreeRow(t,e){return b`<div class="gen-row">
      <span class="gen-label muted ${t?"":"gen-label--empty"}">${t??""}</span>
      ${e}
    </div>`}_treeCard(t,e=""){return t?b`<div class="tree-card-wrap ${e}">
      ${this._renderPersonCard(t)}
    </div>`:b`<div class="tree-card-wrap tree-card-wrap--empty"></div>`}_treeCell(t,e,s,n=""){const r=t===1&&e===1?"":`grid-column:${t}/span ${e}`;return b`<div class="tree-grid-cell ${n}" style=${r}>${s}</div>`}_childrenBusStyle(t){if(t<2)return"";const e=280,s=12,n=4*e+3*s,r=t*e+(t-1)*s,o=(n-r)/2,a=o+r,l=(o+e/2)/n*100,c=(n-(a-e/2))/n*100;return`--tree-bus-left:${l}%;--tree-bus-right:${c}%`}_grandparentSlots(t,e){const s=e.find(c=>c.sex==="male")||e[0],n=e.find(c=>c.sex==="female"&&c!==s)||e.find(c=>c!==s)||null,r=s?t?.grandparents?.[String(s.id)]||[]:[],o=n?t?.grandparents?.[String(n.id)]||[]:[],a=this._sortParents(r),l=this._sortParents(o);return[a[0]||null,a[1]||null,l[0]||null,l[1]||null]}_renderTreeTab(t){const e=t.person,s=t.tree,n=s?.partners||[],r=Math.min(this._treeUnion,Math.max(0,n.length-1)),o=n[r],a=Number(s?.person?.sibling_count||s?.siblings?.length||0),l={id:e.id,name:V(e),given_names:e.given_names,call_name:e.call_name,surname_prefix:e.surname_prefix,surname:e.surname,sex:e.sex,is_living:e.is_living,sibling_count:a,...s?.person||{}},c=o?.children||[],h=o?.known_children_count,d=h!=null&&h>c.length?h-c.length:0,u=this._sortParents(s?.parents||[]),f=u.find(P=>P.sex==="male")||u[0],p=u.find(P=>P.sex==="female"&&P!==f)||u.find(P=>P!==f)||null,g=this._canWrite()&&u.length<2,m=this._grandparentSlots(s,u),_=[o?.marriage_date,o?.marriage_place,o?.divorce_date].filter(Boolean).join(" · "),x=String(o?.partners?.[0]?.id||""),y=this._canWrite()?()=>this._openAddRelation({kind:"child",personId:e.id,unionId:o?.union_id,coParentId:x}):void 0,w=(P,L)=>P?this._treeCard(P):g&&L?b`<div class="tree-card-wrap">
          <button type="button" class="add-slot" @click=${()=>this._openParentsDialog()}>
            ${et(hi)} ${this._tt("add_parents")}
          </button>
        </div>`:this._treeCard(null),v=d>0||!!y,$=[];for(let P=0;P<c.length;P+=4)$.push(c.slice(P,P+4).map(L=>L));const S=c.length>0,M=S||d>0||v;return b`
      <div class="tree-scroll">
        <div class="tree-box view-tree">
          ${m.some(Boolean)?this._renderTreeRow(this._tt("grandparents"),b`<div class="tree-grid-row tree-grid-row--gp">
                  <div class="tree-grid-pair tree-grid-pair--left">
                    ${this._treeCard(m[0])}
                    ${this._treeCard(m[1])}
                  </div>
                  <div class="tree-grid-pair tree-grid-pair--right">
                    ${this._treeCard(m[2])}
                    ${this._treeCard(m[3])}
                  </div>
                </div>`):k}
          ${this._renderTreeRow(this._tt("parents"),b`<div class="tree-grid-row tree-grid-row--parents">
              ${this._treeCell(1,2,w(f,!f),"tree-grid-cell--span2")}
              ${this._treeCell(3,2,w(p??void 0,!p),"tree-grid-cell--span2")}
            </div>`)}
          ${this._renderTreeRow(null,b`<div class="tree-grid-row tree-grid-row--focus">
              ${this._treeCell(2,2,this._treeCard(l),"tree-grid-cell--center tree-grid-cell--stem-down")}
            </div>`)}
          ${n.length?b`<div class="union-tabs">
                ${n.length>1?b`<div class="subtabs tree-subtabs">
                      ${n.map((P,L)=>b`<button
                          class=${L===r?"active":""}
                          @click=${()=>this._treeUnion=L}
                        >
                          ${(P.partners||[]).map(E=>String(E.name||"")).filter(Boolean).join(" & ")||`${this._tt("partners")} ${L+1}`}
                        </button>`)}
                    </div>`:k}
                ${this._renderTreeRow(this._tt("partners"),b`<div
                    class="tree-grid-row tree-grid-row--partner ${M?"tree-grid-row--stem-down":""}"
                  >
                    ${this._treeCell(2,2,b`${(o?.partners||[]).map(P=>b`<div class="tree-card-wrap">
                          ${this._renderPersonCard(P,{subtitle:_})}
                        </div>`)}`,"tree-grid-cell--center")}
                  </div>`)}
                ${S?this._renderTreeRow(this._tt("children"),b`${$.map((P,L)=>{const E=this._childrenBusStyle(P.length),F=P.length>=2;return b`<div
                          class="tree-grid-row tree-grid-row--children ${L===0?"":"tree-grid-row--children-cont"} ${F?"tree-grid-row--children-bus":""}"
                          style=${E}
                        >
                          ${this._treeCell(1,4,b`<div class="tree-children-group">
                              ${P.map(J=>this._treeCard(J))}
                            </div>`,"tree-grid-cell--children-group")}
                        </div>`})}`):k}
                ${v?this._renderTreeRow(S?null:this._tt("children"),b`<div class="tree-grid-row tree-grid-row--add-child">
                        ${this._treeCell(2,2,b`<div class="tree-card-wrap">
                            ${this._renderChildExtras(d,y)}
                          </div>`,"tree-grid-cell--center")}
                      </div>`):k}
              </div>`:this._canWrite()?this._renderTreeRow(this._tt("partners"),b`<div class="tree-grid-row">
                    ${this._treeCell(2,2,b`<button
                        type="button"
                        class="add-slot"
                        @click=${()=>this._openAddRelation({kind:"partner",personId:e.id})}
                      >
                        ${et(hi)} ${this._tt("add_partner")}
                      </button>`,"tree-grid-cell--center")}
                  </div>`):k}
        </div>
      </div>
    `}_renderPerson(){const t=this._detail,e=t.person,s=["details","relationships","tree","sources"];return b`
      <div class="person-head">
        <button type="button" class="back-link" @click=${()=>this._setView("people")}>
          ← ${this._tt("nav_people")}
        </button>
        <h2>
          ${this._deceasedIcon(e.is_living)} ${V(e)}
          ${this._lineageStar(e.id,V(e))}
        </h2>
      </div>
      <div class="subtabs person-subtabs">
        <div class="subtabs-left">
          ${s.map(n=>b`<button class=${this._personTab===n?"active":""}
              @click=${()=>this._personTab=n}>${this._tt(n)}</button>`)}
        </div>
        ${this._canWrite()?b`<div class="subtabs-actions">
              <button @click=${()=>this._openEdit(e)}>${this._tt("edit")}</button>
              <button class="danger" @click=${()=>this._deleteCurrent()}>${this._tt("delete")}</button>
            </div>`:k}
      </div>
      ${this._personTab==="details"?this._renderPersonDetailsTab(t):this._personTab==="relationships"?this._renderRelationshipsTab(t):this._personTab==="tree"?this._renderTreeTab(t):b`<ul class="plain">
              ${(t.citations||[]).map(n=>b`<li>
                  <strong>${n.source_title||"Source"}</strong>
                  ${n.source_url?b`<a href=${String(n.source_url)} target="_blank" rel="noopener">${n.source_url}</a>`:k}
                  ${n.detail?b`<span class="muted"> — ${n.detail}</span>`:k}
                </li>`)}
              ${(t.citations||[]).length===0?b`<li class="muted">—</li>`:k}
            </ul>`}
    `}async _claimMe(t){if(this.hass)try{await Cr(this.hass,{person_id:t}),this._lineage=await es(this.hass),await this._loadSettingsExtras(),this._meQuery="",this._error=""}catch(e){this._error=j(e)}}async _createAndClaimMe(){if(!this.hass)return;const t=(this._meForm.given_names||"").trim();if(!t){this._error=this._tt("field_required");return}try{await Cr(this.hass,{create:{given_names:t,surname_prefix:this._meForm.surname_prefix||"",surname:this._meForm.surname||"",sex:this._meForm.sex||"unknown",birth_date_text:this._meForm.birth_date_text||""}}),this._lineage=await es(this.hass),await this._refreshAll(),this._meCreateOpen=!1,this._meForm={},this._error=""}catch(e){this._error=j(e)}}_renderMeCard(){const t=this.hass?.user?.name||this.hass?.user?.id||"—",e=this._lineage?.person_name,s=this._mePersonMatches();return b`<section class="block me-card">
      <h3>${this._tt("this_is_me")}</h3>
      <p class="muted">${t}</p>
      ${e?b`<p>
            <strong>${e}</strong>
            <button type="button" class="linkish" @click=${()=>void this._claimMe(null)}>
              ${this._tt("unlink_me")}
            </button>
          </p>`:b`<p class="muted">${this._tt("not_linked")}</p>`}
      <label>
        ${this._tt("search_person")}
        <input
          type="search"
          .value=${this._meQuery}
          placeholder=${this._tt("search_placeholder")}
          @input=${n=>this._meQuery=n.target.value}
        />
      </label>
      ${s.length?b`<ul class="plain me-hits">
            ${s.map(n=>b`<li>
                <button type="button" class="linkish" @click=${()=>void this._claimMe(n.id)}>
                  <strong>${V(n)}</strong>
                  <span class="muted">
                    ${Or(n.birth,n.death,n.is_living,this.hass?.language)}
                    ${[n.father?.name,n.mother?.name].filter(Boolean).join(" · ")}
                  </span>
                </button>
              </li>`)}
          </ul>`:this._meQuery.trim()?b`<p class="muted">${this._tt("no_people")}</p>`:k}
      ${e?k:b`<button type="button" class="linkish" @click=${()=>this._meCreateOpen=!this._meCreateOpen}>
            ${this._tt("create_my_person")}
          </button>`}
      ${this._meCreateOpen?b`<div class="inline-form me-create">
            <input
              placeholder=${this._tt("given_names")}
              .value=${this._meForm.given_names||""}
              @input=${n=>this._meForm={...this._meForm,given_names:n.target.value}}
            />
            <input
              placeholder=${this._tt("surname")}
              .value=${this._meForm.surname||""}
              @input=${n=>this._meForm={...this._meForm,surname:n.target.value}}
            />
            <select
              .value=${this._meForm.sex||"unknown"}
              @change=${n=>this._meForm={...this._meForm,sex:n.target.value}}
            >
              <option value="male">${this._tt("sex_male")}</option>
              <option value="female">${this._tt("sex_female")}</option>
              <option value="unknown">${this._tt("sex_unknown")}</option>
            </select>
            <button type="button" @click=${()=>void this._createAndClaimMe()}>
              ${this._tt("save")}
            </button>
          </div>`:k}
    </section>`}_renderSettings(){const t=this._gazetteer?.countries||[];return b`
      ${this._renderMeCard()}
      <section class="block">
        <h3>${this._tt("import_gedcom")} / ${this._tt("export_gedcom")}</h3>
        ${this._canWrite()?b`
              <label class="check">
                <input type="checkbox" .checked=${this._replaceImport}
                  @change=${e=>this._replaceImport=e.target.checked} />
                ${this._tt("replace_import")}
              </label>
              <input type="file" accept=".ged,text/plain"
                @change=${e=>{const s=e.target.files?.[0];s&&this._previewGedcom(s),e.target.value=""}} />
            `:k}
        <button @click=${()=>this._exportGedcom()}>${this._tt("export_gedcom")}</button>
        ${this._importStatus?b`<p class="muted">${this._importStatus}</p>`:k}
      </section>
      <section class="block">
        <h3>${this._tt("user_links")}</h3>
        <ul class="plain">
          ${this._userLinks.map(e=>b`<li>
              ${e.ha_user_id} → ${e.person_name||e.person_id}
              ${this._canWrite()?b`<button class="linkish" @click=${async()=>{await Pr(this.hass,String(e.ha_user_id),null),await this._loadSettingsExtras()}}>${this._tt("delete")}</button>`:k}
            </li>`)}
        </ul>
        ${this._canWrite()?b`<div class="inline-form">
              <input id="link-user" placeholder="HA user id" />
              <input id="link-person" placeholder="person id" />
              <button @click=${async()=>{const e=this.renderRoot.querySelector("#link-user")?.value,s=this.renderRoot.querySelector("#link-person")?.value;e&&s&&(await Pr(this.hass,e,s),await this._loadSettingsExtras())}}>${this._tt("save")}</button>
            </div>`:k}
      </section>
      <section class="block">
        <h3>${this._tt("gazetteer")}</h3>
        <p class="muted">${t.map(e=>`${e.code} (${e.place_count})`).join(", ")||"—"}</p>
        <div class="inline-form">
          <input .value=${this._gazQuery} placeholder="Search places…"
            @input=${e=>this._gazQuery=e.target.value} />
          <button @click=${()=>this._runGazSearch()}>Search</button>
        </div>
        <ul class="plain">
          ${this._gazHits.map(e=>b`<li>${e.name}${e.admin1?`, ${e.admin1}`:""} (${e.country_code})</li>`)}
        </ul>
      </section>
    `}_renderImportDialogBody(){const t=this._importReport||{},e=this._importPhase;if(e==="importing"||e==="preview"&&!this._importReport&&this._importStatus)return b`<p class="muted">${this._importStatus||this._tt("importing")}</p>`;const s=e==="done";return b`
      ${s?b`<p>${this._tt("import_complete_hint")}</p>`:this._importFileName?b`<p class="muted">${this._importFileName}</p>`:k}
      ${!s&&this._replaceImport?b`<p class="error" role="alert">${this._tt("replace_warning")}</p>`:k}
      <ul class="plain import-counts">
        <li><span>${this._tt("import_persons")}</span><strong>${t.persons??0}</strong></li>
        <li><span>${this._tt("import_unions")}</span><strong>${t.unions??0}</strong></li>
        <li><span>${this._tt("import_events")}</span><strong>${t.events??0}</strong></li>
        <li><span>${this._tt("import_sources")}</span><strong>${t.sources??0}</strong></li>
        <li><span>${this._tt("import_places")}</span><strong>${t.places??0}</strong></li>
      </ul>
    `}_renderDialog(){const t=this._canWrite(),e=this._dialogMode,s=e==="import"?this._importPhase==="done"?this._tt("import_complete"):this._tt("import_preview"):e==="union"?this._tt("edit"):e==="pickPerson"?this._tt("link_existing_person"):e==="parents"?this._tt("add_parents"):e==="siblings"?this._tt("siblings_of").replace("%s",this._siblingsPersonName||""):e==="preview"?this._previewDetail?V(this._previewDetail.person):this._tt("details"):e==="event"?this._editingEventId?this._tt("edit_event"):this._tt("add_event"):this._editing?V(this._editing):this._relationTarget?this._tt("add_person"):this._tt("add_person"),n=b`
      <div class="form-section">
        <div class="form-section-title">${this._tt("details")}</div>
        <label
          >${this._fieldLabel(this._tt("given_names"),t)}
          <input
            class=${this._fieldInvalid("given_names")?"invalid":""}
            .value=${this._form.given_names||""}
            ?disabled=${!t}
            @input=${_=>this._onPersonField("given_names",_)}
          />
          ${this._fieldError("given_names")}
        </label>
        <label
          >${this._fieldLabel(this._tt("call_name"))}
          <input
            .value=${this._form.call_name||""}
            ?disabled=${!t}
            @input=${_=>this._onPersonField("call_name",_)}
          />
        </label>
        <div class="row2">
          <label
            >${this._tt("surname_prefix")}
            <input
              .value=${this._form.surname_prefix||""}
              ?disabled=${!t}
              @input=${_=>this._form={...this._form,surname_prefix:_.target.value}}
            />
          </label>
          <label
            >${this._tt("surname")}
            <input
              .value=${this._form.surname||""}
              ?disabled=${!t}
              @input=${_=>this._form={...this._form,surname:_.target.value}}
            />
          </label>
        </div>
        <div class="row2">
          <label
            >${this._tt("sex")}
            <select
              .value=${this._form.sex||"unknown"}
              ?disabled=${!t}
              @change=${_=>this._form={...this._form,sex:_.target.value}}
            >
              <option value="male">${this._tt("sex_male")}</option>
              <option value="female">${this._tt("sex_female")}</option>
              <option value="intersex">${this._tt("sex_intersex")}</option>
              <option value="unknown">${this._tt("sex_unknown")}</option>
            </select>
          </label>
          <label class="check-row"
            >${this._tt("deceased")}
            <span class="check-control">
              <input
                type="checkbox"
                .checked=${this._form.deceased==="true"}
                ?disabled=${!t}
                @change=${_=>this._form={...this._form,deceased:_.target.checked?"true":"false"}}
              />
            </span>
          </label>
        </div>
        <label
          >${this._tt("notes")}
          <textarea
            rows="3"
            .value=${this._form.notes||""}
            ?disabled=${!t}
            @input=${_=>this._form={...this._form,notes:_.target.value}}
          ></textarea>
        </label>
      </div>
    `,r=this._usedUniqueEventTypes(),o=(this._eventForm.date_mode||"simple")==="advanced",a=o&&(this._eventForm.date_qualifier==="between"||this._eventForm.date_qualifier==="from_to"),l=b`
      <div class="form-section">
        <label
          >${this._tt("events")}
          <select
            .value=${this._eventForm.event_type||"birth"}
            @change=${_=>this._eventForm={...this._eventForm,event_type:_.target.value}}
          >
            ${Zf.map(_=>{const x=qr.has(_)&&r.has(_);return b`<option value=${_} ?disabled=${x}>
                ${this._eventTypeLabel(_)}${x?` (${this._tt("already_added")})`:""}
              </option>`})}
          </select>
        </label>
        <div class="event-date-field">
          ${o?b`<label
                >${this._tt("date_qualifier")}
                <select
                  .value=${this._eventForm.date_qualifier||"exact"}
                  @change=${_=>this._eventForm={...this._eventForm,date_qualifier:_.target.value}}
                >
                  ${hf.map(_=>b`<option value=${_}>${this._tt(Jf[_])}</option>`)}
                </select>
              </label>
              <label
                >${this._tt("date")}
                <input
                  .value=${this._eventForm.date_first||""}
                  placeholder=${this._tt("date_gedcom_hint")}
                  @input=${_=>this._eventForm={...this._eventForm,date_first:_.target.value}}
                />
              </label>
              ${a?b`<label
                    >${this._tt("date_second")}
                    <input
                      .value=${this._eventForm.date_second||""}
                      placeholder=${this._tt("date_gedcom_hint")}
                      @input=${_=>this._eventForm={...this._eventForm,date_second:_.target.value}}
                    />
                  </label>`:k}
              <button
                type="button"
                class="linkish date-mode-toggle"
                @click=${()=>this._toggleEventDateMode()}
              >
                ${this._tt("date_simple")}
              </button>`:b`<div class="date-input-row">
                <div class="date-label-grow">
                  <span class="field-label">${this._tt("date")}</span>
                  ${ne(this._tt("date"),b`<input
                      type="date"
                      .value=${this._eventForm.date_iso||""}
                      @input=${_=>this._eventForm={...this._eventForm,date_iso:_.target.value}}
                    />`)}
                </div>
                <button
                  type="button"
                  class="linkish date-mode-toggle"
                  @click=${()=>this._toggleEventDateMode()}
                >
                  ${this._tt("date_advanced")}
                </button>
              </div>`}
        </div>
        <label class="place-field"
          >${this._fieldLabel(this._tt("place"))}
          <input
            .value=${this._eventForm.place||""}
            @input=${_=>{const x=_.target.value;this._eventForm={...this._eventForm,place:x},this._schedulePlaceSearch(x)}}
            @focus=${()=>{this._placeSuggestions.length&&(this._placeSuggestOpen=!0)}}
            @blur=${()=>{setTimeout(()=>{this._placeSuggestOpen=!1},150)}}
          />
          ${this._placeSuggestOpen&&this._placeSuggestions.length?b`<ul class="place-suggest">
                ${this._placeSuggestions.map(_=>b`<li>
                    <button
                      type="button"
                      @mousedown=${()=>{this._eventForm={...this._eventForm,place:_.name},this._placeSuggestOpen=!1}}
                    >
                      ${_.name}
                    </button>
                  </li>`)}
              </ul>`:k}
        </label>
        <label
          >${this._tt("description")}
          <input
            .value=${this._eventForm.description||""}
            @input=${_=>this._eventForm={...this._eventForm,description:_.target.value}}
          />
        </label>
      </div>
    `,c=b`<div class="form-section">
      <label
        >${this._fieldLabel(this._tt("union_status"))}
        <select
          .value=${this._unionForm.status||"ongoing"}
          @change=${_=>this._unionForm={...this._unionForm,status:_.target.value}}
        >
          <option value="ongoing">${this._tt("status_ongoing")}</option>
          <option value="ended">${this._tt("status_ended")}</option>
          <option value="unknown">${this._tt("status_unknown")}</option>
        </select>
      </label>
      <label
        >${this._fieldLabel(this._tt("known_children"))}
        <input
          type="number"
          min="0"
          .value=${this._unionForm.known_children_count||""}
          @input=${_=>this._unionForm={...this._unionForm,known_children_count:_.target.value}}
        />
      </label>
      <label
        >${this._fieldLabel(this._tt("event_marriage"))}
        <input
          .value=${this._unionForm.marriage_date||""}
          placeholder=${this._tt("date_gedcom_hint")}
          @input=${_=>this._unionForm={...this._unionForm,marriage_date:_.target.value}}
        />
      </label>
      <label
        >${this._fieldLabel(this._tt("place"))}
        <input
          .value=${this._unionForm.marriage_place||""}
          @input=${_=>this._unionForm={...this._unionForm,marriage_place:_.target.value}}
        />
      </label>
      <label
        >${this._fieldLabel(this._tt("union_notes"))}
        <textarea
          rows="2"
          .value=${this._unionForm.notes||""}
          @input=${_=>this._unionForm={...this._unionForm,notes:_.target.value}}
        ></textarea>
      </label>
    </div>`,h=this._pickPersonMatches(),d=b`<div class="form-section">
      <label
        >${this._fieldLabel(this._tt("search_to_link"))}
        <input
          type="search"
          .value=${this._pickPersonQuery}
          placeholder=${this._tt("search_placeholder")}
          @input=${_=>this._pickPersonQuery=_.target.value}
        />
      </label>
      <ul class="plain me-hits">
        ${h.map(_=>b`<li>
            <button type="button" class="linkish" @click=${()=>void this._linkPickedPerson(_.id)}>
              ${V(_)}
            </button>
          </li>`)}
        ${!h.length&&this._pickPersonQuery?b`<li class="muted">—</li>`:k}
      </ul>
    </div>`,u=b`<div class="form-section">
      <p class="muted">${this._tt("search_to_link")}</p>
      <label>${this._tt("father")}
        <input
          type="search"
          placeholder=${this._tt("search_placeholder")}
          @change=${_=>{const x=_.target.value.toLowerCase(),y=this._people.find(w=>V(w).toLowerCase().includes(x));y&&(this._parentsForm={...this._parentsForm,father_id:y.id})}}
        />
      </label>
      <label>${this._tt("mother")}
        <input
          type="search"
          placeholder=${this._tt("search_placeholder")}
          @change=${_=>{const x=_.target.value.toLowerCase(),y=this._people.find(w=>V(w).toLowerCase().includes(x));y&&(this._parentsForm={...this._parentsForm,mother_id:y.id})}}
        />
      </label>
      <div class="row-actions">
        <button type="button" class="linkish" @click=${()=>this._openPickPerson("father")}>
          ${this._tt("link_existing_person")} (${this._tt("father")})
        </button>
        <button type="button" class="linkish" @click=${()=>this._openPickPerson("mother")}>
          ${this._tt("link_existing_person")} (${this._tt("mother")})
        </button>
      </div>
    </div>`,f=this._siblingsLoading?b`<p class="muted">${this._tt("loading")}</p>`:b`<div class="siblings-grid">
          ${this._siblingsList.map(_=>{const y=String(_.relation||"")==="half_sibling"?this._tt("half_sibling"):void 0;return this._renderPersonCard(_,{hideSiblings:!0,subtitle:y})})}
          ${this._siblingsList.length?k:b`<p class="muted">—</p>`}
        </div>`,p=this._previewDetail,g=this._previewLoading?b`<p class="muted">${this._tt("loading")}</p>`:p?b`<div class="preview-body">
            <dl class="kv">
              <dt>${this._tt("given_names")}</dt>
              <dd>${p.person.given_names||"—"}</dd>
              <dt>${this._tt("call_name")}</dt>
              <dd>${p.person.call_name||"—"}</dd>
              <dt>${this._tt("surname")}</dt>
              <dd>
                ${[p.person.surname_prefix,p.person.surname].filter(Boolean).join(" ")||"—"}
              </dd>
              <dt>${this._tt("sex")}</dt>
              <dd>${this._sexBadge(p.person.sex)}</dd>
              ${p.person.birth?b`<dt>${this._tt("event_birth")}</dt><dd>${p.person.birth.date_text||"—"}</dd>`:k}
              ${p.person.death?b`<dt>${this._tt("event_death")}</dt><dd>${p.person.death.date_text||"—"}</dd>`:k}
              ${p.person.notes?b`<dt>${this._tt("notes")}</dt><dd>${p.person.notes}</dd>`:k}
            </dl>
          </div>`:b`<p class="muted">—</p>`,m=e==="import"?b`
            ${U(this._tt(this._importPhase==="done"?"close":"cancel"),{variant:"text",disabled:this._importPhase==="importing",onClick:this._closeDialog})}
            ${this._importPhase==="preview"&&this._importReport?U(this._tt("confirm_import"),{variant:"filled",onClick:()=>void this._confirmImport()}):k}
          `:e==="union"?b`
              ${U(this._tt("cancel"),{variant:"text",onClick:this._closeDialog})}
              ${U(this._tt("save"),{variant:"filled",disabled:this._saving,onClick:()=>void this._saveUnionForm()})}
            `:e==="pickPerson"?U(this._tt("close"),{variant:"text",onClick:this._closeDialog}):e==="parents"?b`
                  ${U(this._tt("cancel"),{variant:"text",onClick:this._closeDialog})}
                  ${U(this._tt("save"),{variant:"filled",disabled:this._saving,onClick:()=>void this._saveParentsLinks()})}
                `:e==="siblings"?U(this._tt("close"),{variant:"text",onClick:this._closeDialog}):e==="preview"?b`
                ${U(this._tt("close"),{variant:"text",onClick:this._closeDialog})}
                ${p?b`
                      ${U(this._tt("view_full_profile"),{variant:"outlined",onClick:()=>{const _=p.person.id;this._closeDialog(),this._openPerson(_)}})}
                      ${U(this._tt("view_tree_action"),{variant:"outlined",onClick:()=>{const _=p.person.id;this._closeDialog(),this._openPerson(_,"tree")}})}
                      ${t?U(this._tt("edit"),{variant:"filled",onClick:()=>{this._closeDialog(),this._openEdit(p.person)}}):k}
                    `:k}
              `:e==="event"?b`
                ${U(this._tt("cancel"),{variant:"text",onClick:this._closeDialog})}
                ${U(this._tt("save"),{variant:"filled",disabled:this._saving,onClick:()=>void this._saveEvent()})}
              `:b`
              ${U(this._tt(t?"cancel":"close"),{variant:"text",onClick:this._closeDialog})}
              ${t?U(this._tt("save"),{variant:"filled",disabled:this._saving,onClick:()=>void this._savePerson()}):k}
            `;return b`
      <div class="dialog-backdrop">
        <div
          class="dialog ${this.narrow?"dialog-narrow":""} ${e==="preview"?"dialog-preview":""}"
          role="dialog"
          aria-modal="true"
          aria-label=${s}
          @click=${_=>_.stopPropagation()}
        >
          <div class="dialog-header">
            <h2>
              ${e==="preview"&&p?b`${this._deceasedIcon(p.person.is_living)}
                    ${this._sexIconBadge(p.person.sex)}
                    <span class="dialog-title-text">${V(p.person)}</span>
                    ${this._lineageStar(p.person.id,V(p.person))}`:s}
            </h2>
            <button
              type="button"
              class="icon-btn dialog-close"
              aria-label=${this._tt("cancel")}
              ?disabled=${e==="import"&&this._importPhase==="importing"}
              @click=${this._closeDialog}
            >
              ${et(zf)}
            </button>
          </div>

          <div class="dialog-body">
            ${e==="import"?this._renderImportDialogBody():e==="union"?c:e==="pickPerson"?d:e==="parents"?u:e==="siblings"?f:e==="preview"?g:e==="event"?l:n}

            ${this._error&&e!=="import"?b`<div class="error" role="alert">${this._error}</div>`:k}
          </div>

          <div class="dialog-actions">${m}</div>
        </div>
      </div>
    `}static{this.styles=Su`
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
      background: var(--card-background-color, #fff);
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .stat-n { display: block; font-size: 1.5rem; font-weight: 600; }
    .stat-label {
      display: block;
      margin-top: 4px;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
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
      background: var(--card-background-color, #fff);
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .chart-card h3 { margin: 0 0 8px; font-size: 0.95rem; font-weight: 500; }
    .chart-wrap { height: 200px; position: relative; }
    .two-col {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
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
      z-index: 10;
      transition: opacity 0.15s;
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
    .me-card input, .me-card select {
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
    .person-head { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; margin-bottom: 8px; }
    .person-head h2 { margin: 0; font-size: 1.3rem; font-weight: 500; }
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
      align-items: center;
    }
    .view-tree {
      min-width: 0;
      padding: 24px 0 32px;
      --tree-line-color: var(--divider-color);
      --tree-card-width: 280px;
      --tree-gap: 12px;
      --tree-row-gap: 36px;
      --tree-line-offset: 8px;
      --tree-stem: calc(var(--tree-row-gap) - var(--tree-line-offset));
    }
    .tree-grid-row {
      display: grid;
      grid-template-columns: repeat(4, var(--tree-card-width));
      column-gap: var(--tree-gap);
      width: fit-content;
      max-width: 100%;
      padding-bottom: var(--tree-row-gap);
      position: relative;
      align-items: stretch;
    }
    .tree-grid-row--children-cont::before {
      display: none;
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
    }
    .tree-grid-pair--left { grid-column: 1 / 3; }
    .tree-grid-pair--right { grid-column: 3 / 5; }
    .tree-grid-pair::before {
      content: "";
      position: absolute;
      bottom: var(--tree-line-offset);
      left: calc(var(--tree-card-width) / 2);
      right: calc(var(--tree-card-width) / 2);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-pair::after {
      content: "";
      position: absolute;
      bottom: calc(-1 * var(--tree-stem));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-stem);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--parents::before {
      content: "";
      position: absolute;
      bottom: var(--tree-line-offset);
      left: calc(var(--tree-card-width) / 2);
      right: calc(var(--tree-card-width) / 2);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--parents::after {
      content: "";
      position: absolute;
      bottom: calc(-1 * var(--tree-stem));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-stem);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-cell--span2::before {
      content: "";
      position: absolute;
      top: calc(-1 * var(--tree-stem));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-stem);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--focus .tree-grid-cell--stem-down::before,
    .tree-grid-row--partner .tree-grid-cell--center::before {
      content: "";
      position: absolute;
      top: calc(-1 * var(--tree-stem));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-stem);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--focus .tree-grid-cell--stem-down::after,
    .tree-grid-row--partner.tree-grid-row--stem-down::after {
      content: "";
      position: absolute;
      bottom: calc(-1 * var(--tree-stem));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-stem);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--children::before {
      content: "";
      position: absolute;
      top: calc(-1 * var(--tree-stem));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-stem);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--children-bus::after {
      content: "";
      position: absolute;
      top: var(--tree-line-offset);
      left: var(--tree-bus-left, 12.5%);
      right: var(--tree-bus-right, 12.5%);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-cell--children-group {
      width: 100%;
    }
    .tree-children-group {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--tree-gap);
      width: 100%;
      position: relative;
    }
    .tree-grid-row--children-bus .tree-children-group {
      padding-top: calc(var(--tree-stem) + 2px);
    }
    .tree-grid-row--children-bus .tree-children-group .tree-card-wrap::before {
      content: "";
      position: absolute;
      top: calc(-1 * var(--tree-stem) - 2px);
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-stem);
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
      width: var(--tree-card-width);
      max-width: 100%;
      flex: 0 0 auto;
      z-index: 1;
    }
    .tree-card-wrap--empty {
      min-height: 1px;
      width: var(--tree-card-width);
      flex: 0 0 auto;
    }
    .tree-card-wrap .person-card,
    .tree-card-wrap .add-slot,
    .tree-card-wrap .more-children-card {
      width: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      background: var(--card-background-color, #fff);
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
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
      flex-wrap: wrap;
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
    .event-card-desc { margin-top: 6px; }
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
    .inline-form { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; align-items: center; }
    .event-date-field {
      display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
      flex: 1; min-width: 200px;
    }
    .event-date-field input { flex: 1; min-width: 140px; width: auto; }
    .date-input-row {
      display: flex; align-items: center; gap: 8px; flex: 1; min-width: 200px;
    }
    .date-label-grow {
      flex: 1; min-width: 140px;
      display: flex; flex-direction: column; gap: 4px;
    }
    .date-mode-toggle { font-size: 0.85em; white-space: nowrap; flex-shrink: 0; align-self: center; }
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
    .deceased-icon svg { width: 14px; height: 14px; }
    .person-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
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
      background: var(--card-background-color, #fff);
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
      background: var(--card-background-color, #fff);
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
      background: var(--card-background-color, #fff);
    }
    .md-btn-active.md-btn-outlined {
      background: color-mix(in srgb, var(--primary-color) 8%, var(--card-background-color, #fff));
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
      background: var(--card-background-color, #fff);
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
    .dialog.dialog-narrow {
      width: 100%;
      max-height: 100%;
      padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
    }
    .dialog-backdrop:has(.dialog-narrow) {
      align-items: stretch;
      padding-top: max(12px, env(safe-area-inset-top, 0px));
      padding-right: max(12px, env(safe-area-inset-right, 0px));
      padding-bottom: max(12px, env(safe-area-inset-bottom, 0px));
      padding-left: max(12px, env(safe-area-inset-left, 0px));
    }
    .dialog-backdrop:has(.dialog-preview) {
      align-items: center;
    }
    .dialog.dialog-preview {
      height: auto;
      max-height: calc(
        100dvh - max(12px, env(safe-area-inset-top, 0px)) - max(12px, env(safe-area-inset-bottom, 0px)) - 24px
      );
      overflow: hidden;
    }
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.02));
    }
    .form-section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--primary-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
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
    .lineage-star { color: var(--primary-color); display: inline-flex; }
    .lineage-star svg { width: 16px; height: 16px; }
    .name-cell { font-weight: 500; }
    .menu-cell { width: 40px; position: relative; }
    .row-menu-wrap { position: relative; }
    .icon-btn.sm { width: 32px; height: 32px; }
    .row-menu {
      z-index: 100;
      min-width: 140px;
      background: var(--card-background-color, #fff);
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
      background: #fff;
    }
    .collapse-head {
      appearance: none;
      border: none;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      background: #fff;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      color: inherit;
    }
    .collapse-body {
      padding: 0 14px 14px;
      background: #fff;
    }
    .collapse--cards .collapse-body {
      padding: 10px 14px 14px;
      background: color-mix(in srgb, var(--divider-color) 8%, #fff);
    }
    .gen-row {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
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
      align-items: flex-start;
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
    .rel-person-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 280px;
      max-width: 100%;
      flex: 0 1 280px;
      align-self: flex-start;
    }
    .rel-person-wrap .person-card {
      width: 100%;
      height: fit-content;
      flex: none;
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
    .union-tabs { width: 100%; }
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
      .stat { padding: 8px 6px; }
      .stat-n { font-size: 1.15rem; }
      .stat-label { font-size: 0.7rem; }
      .kv { grid-template-columns: 1fr; }
      .row2 { grid-template-columns: 1fr; }
      .subtabs-actions { width: 100%; justify-content: flex-end; }
      .rel-card-list .person-card,
      .rel-card-list .add-slot,
      .rel-card-list .more-children-card,
      .rel-person-wrap {
        width: 100%;
        flex: 1 1 100%;
      }
    }
  `}}A([Fi({attribute:!1})],C.prototype,"hass");A([Fi({type:Boolean})],C.prototype,"narrow");A([Fi({attribute:!1})],C.prototype,"panel");A([D()],C.prototype,"_view");A([D()],C.prototype,"_search");A([D()],C.prototype,"_filterLiving");A([D()],C.prototype,"_filterSex");A([D()],C.prototype,"_familyShortcut");A([D()],C.prototype,"_filterPlace");A([D()],C.prototype,"_dateFrom");A([D()],C.prototype,"_dateTo");A([D()],C.prototype,"_filtersOpen");A([D()],C.prototype,"_people");A([D()],C.prototype,"_total");A([D()],C.prototype,"_stats");A([D()],C.prototype,"_settings");A([D()],C.prototype,"_detail");A([D()],C.prototype,"_personTab");A([D()],C.prototype,"_dialogOpen");A([D()],C.prototype,"_dialogMode");A([D()],C.prototype,"_editing");A([D()],C.prototype,"_form");A([D()],C.prototype,"_eventForm");A([D()],C.prototype,"_error");A([D()],C.prototype,"_saving");A([D()],C.prototype,"_loading");A([D()],C.prototype,"_userLinks");A([D()],C.prototype,"_gazetteer");A([D()],C.prototype,"_gazQuery");A([D()],C.prototype,"_gazHits");A([D()],C.prototype,"_replaceImport");A([D()],C.prototype,"_importStatus");A([D()],C.prototype,"_importFile");A([D()],C.prototype,"_importReport");A([D()],C.prototype,"_importPhase");A([D()],C.prototype,"_sort");A([D()],C.prototype,"_sortDir");A([D()],C.prototype,"_lineage");A([D()],C.prototype,"_isMobile");A([D()],C.prototype,"_rowMenu");A([D()],C.prototype,"_rowMenuAnchor");A([D()],C.prototype,"_collapsed");A([D()],C.prototype,"_editingEventId");A([D()],C.prototype,"_relationTarget");A([D()],C.prototype,"_treeUnion");A([D()],C.prototype,"_meQuery");A([D()],C.prototype,"_meCreateOpen");A([D()],C.prototype,"_meForm");A([D()],C.prototype,"_fieldErrors");A([D()],C.prototype,"_importFileName");A([D()],C.prototype,"_unionForm");A([D()],C.prototype,"_editingUnionId");A([D()],C.prototype,"_pickPersonQuery");A([D()],C.prototype,"_pickPersonRole");A([D()],C.prototype,"_parentsForm");A([D()],C.prototype,"_placeSuggestions");A([D()],C.prototype,"_placeSuggestOpen");A([D()],C.prototype,"_siblingsPersonId");A([D()],C.prototype,"_siblingsPersonName");A([D()],C.prototype,"_siblingsList");A([D()],C.prototype,"_siblingsLoading");A([D()],C.prototype,"_previewDetail");A([D()],C.prototype,"_previewLoading");customElements.get(Vr)||customElements.define(Vr,C);
//# sourceMappingURL=family-tree-panel.js.map
