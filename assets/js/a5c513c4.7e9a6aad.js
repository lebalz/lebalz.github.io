"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[886],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=s(n),d=i,m=p["".concat(u,".").concat(d)]||p[d]||f[d]||o;return n?r.createElement(m,a(a({ref:t},l),{},{components:n})):r.createElement(m,a({ref:t},l))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=p;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},4384:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(7294),i="container_AFEI",o="noMargins_PVGS",a=n(6010),c=function(e,t){return void 0===t&&(t="px"),/^\d+(\.\d*)?$/.test(e)?""+e+t:e},u=function(e){var t={},n=Object.assign({},e.options);return n.noMargins&&delete n.noMargins,n.size&&(t.maxWidth="min(90vw, "+c(n.size)+")",t.maxHeight=c(n.size),delete n.size),n.height&&(t.maxHeight=c(n.height),t.height=c(n.height),delete n.height),n.width&&(t.maxWidth="min(90vw, "+c(n.width)+")",t.width=c(n.width),delete n.width),t=Object.assign({},t,n),r.createElement("img",{src:e.src,alt:e.alt,style:t,title:e.isInline&&e.bib?"Author: "+e.bib.author+" @ "+e.bib.licence+(e.bib.edited?", Bearbeitet":""):void 0})},s=function(e){if(e.isInline)return r.createElement(u,e);var t=r.useState(!1),n=(t[0],t[1]),c=r.useState(!1),s=(c[0],c[1],e.caption&&"undefined"!==e.caption),l=e.bib||s;return e.options.noMargins&&!0,r.createElement("figure",{className:(0,a.Z)(i,e.options.noMargins&&o),onMouseEnter:function(){return n(!0)},onMouseOut:function(e){var t,r,i,o,a;t=e.currentTarget.getBoundingClientRect(),r=e.clientX,i=e.clientY,o=t.left<=r&&t.right>=r,a=t.top<=i&&t.bottom>=i,o&&a||n(!1)}},r.createElement(u,e),l&&r.createElement("figcaption",null,s&&r.createElement("span",null,e.caption)))}},4451:function(e,t,n){n.r(t),n.d(t,{assets:function(){return f},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return u},metadata:function(){return l},toc:function(){return p}});var r=n(3117),i=n(102),o=(n(7294),n(3905)),a=n(4384),c=["components"],u={},s="ENS160 + AHT21",l={unversionedId:"arduino/ens160-aht21",id:"arduino/ens160-aht21",title:"ENS160 + AHT21",description:"",source:"@site/docs/arduino/ens160-aht21.md",sourceDirName:"arduino",slug:"/arduino/ens160-aht21",permalink:"/synopsis/arduino/ens160-aht21",draft:!1,editUrl:"https://github.com/lebalz/blog/edit/main/docs/arduino/ens160-aht21.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DTH11",permalink:"/synopsis/arduino/dht11-node-red"},next:{title:"Temperatursensor DS18B20",permalink:"/synopsis/arduino/temperature-DS18B20"}},f={},p=[],d={toc:p};function m(e){var t=e.components,u=(0,i.Z)(e,c);return(0,o.kt)("wrapper",(0,r.Z)({},d,u,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"ens160--aht21"},"ENS160 + AHT21"),(0,o.kt)("div",{style:{display:"flex",justifyContent:"center"}},(0,o.kt)(a.Z,{caption:"undefined",options:{},isInline:!1,src:n(1545).Z,mdxType:"Image"})),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ino",metastring:"reference",reference:!0},"https://github.com/lebalz/blog/blob/main/docs/arduino/ens160-aht21.ino\n")))}m.isMDXComponent=!0},6010:function(e,t,n){function r(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}function i(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{Z:function(){return i}})},1545:function(e,t,n){t.Z=n.p+"assets/images/ENS160-AHT21-49ea5420b4ccdfe8b4f4a0f439f3d7e4.jpg"}}]);