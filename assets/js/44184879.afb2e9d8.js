"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6450],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return g}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),f=s(n),g=i,m=f["".concat(c,".").concat(g)]||f[g]||p[g]||o;return n?r.createElement(m,a(a({ref:t},l),{},{components:n})):r.createElement(m,a({ref:t},l))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=f;var u={};for(var c in t)hasOwnProperty.call(t,c)&&(u[c]=t[c]);u.originalType=e,u.mdxType="string"==typeof e?e:i,a[1]=u;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4384:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(7294),i="container_AFEI",o="noMargins_PVGS",a=n(6010),u=function(e,t){return void 0===t&&(t="px"),/^\d+(\.\d*)?$/.test(e)?""+e+t:e},c=function(e){var t={},n=Object.assign({},e.options);return n.noMargins&&delete n.noMargins,n.size&&(t.maxWidth="min(90vw, "+u(n.size)+")",t.maxHeight=u(n.size),delete n.size),n.height&&(t.maxHeight=u(n.height),t.height=u(n.height),delete n.height),n.width&&(t.maxWidth="min(90vw, "+u(n.width)+")",t.width=u(n.width),delete n.width),t=Object.assign({},t,n),r.createElement("img",{src:e.src,alt:e.alt,style:t,title:e.isInline&&e.bib?"Author: "+e.bib.author+" @ "+e.bib.licence+(e.bib.edited?", Bearbeitet":""):void 0})},s=function(e){if(e.isInline)return r.createElement(c,e);var t=r.useState(!1),n=(t[0],t[1]),u=r.useState(!1),s=(u[0],u[1],e.caption&&"undefined"!==e.caption),l=e.bib||s;return e.options.noMargins&&!0,r.createElement("figure",{className:(0,a.Z)(i,e.options.noMargins&&o),onMouseEnter:function(){return n(!0)},onMouseOut:function(e){var t,r,i,o,a;t=e.currentTarget.getBoundingClientRect(),r=e.clientX,i=e.clientY,o=t.left<=r&&t.right>=r,a=t.top<=i&&t.bottom>=i,o&&a||n(!1)}},r.createElement(c,e),l&&r.createElement("figcaption",null,s&&r.createElement("span",null,e.caption)))}},7471:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return f}});var r=n(3117),i=n(102),o=(n(7294),n(3905)),a=n(4384),u=["components"],c={title:"Happy New Year \ud83e\udd73",authors:["lebalz"],tags:["docusaurus"],image:"/img/logo.png"},s="Happy New Year - 2\ufe0f\u20e30\ufe0f\u20e32\ufe0f\u20e32\ufe0f\u20e3",l={permalink:"/2022/01/01/happy-new-year",editUrl:"https://github.com/lebalz/blog/edit/main/blog/2022-01-01-happy-new-year.mdx",source:"@site/blog/2022-01-01-happy-new-year.mdx",title:"Happy New Year \ud83e\udd73",description:"Hangovers are perfect for config tasks. So, i set up my dev blog using Docusaurus.",date:"2022-01-01T00:00:00.000Z",formattedDate:"January 1, 2022",tags:[{label:"docusaurus",permalink:"/tags/docusaurus"}],readingTime:.085,hasTruncateMarker:!0,authors:[{name:"Balthasar Hofer",url:"https://github.com/lebalz",imageURL:"https://github.com/lebalz.png",key:"lebalz"}],frontMatter:{title:"Happy New Year \ud83e\udd73",authors:["lebalz"],tags:["docusaurus"],image:"/img/logo.png"},prevItem:{title:"Speedup Build Time on Drone CI",permalink:"/2022/01/04/cache-drone-builds"}},p={authorsImageUrls:[void 0]},f=[],g={toc:f};function m(e){var t=e.components,c=(0,i.Z)(e,u);return(0,o.kt)("wrapper",(0,r.Z)({},g,c,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Hangovers are perfect for config tasks. So, i set up my dev blog using ",(0,o.kt)("a",{parentName:"p",href:"https://docusaurus.io"},"Docusaurus"),"."),(0,o.kt)("div",{style:{display:"flex",justifyContent:"center"}},(0,o.kt)(a.Z,{caption:"",options:{width:"250px"},isInline:!1,src:n(6218).Z,alt:"--width=250px",mdxType:"Image"})))}m.isMDXComponent=!0},6010:function(e,t,n){function r(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}function i(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{Z:function(){return i}})},6218:function(e,t,n){t.Z=n.p+"assets/images/logo-c6791a926768c9b63797c54f5696e2fa.png"}}]);