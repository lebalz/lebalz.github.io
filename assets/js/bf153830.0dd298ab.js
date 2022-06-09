"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4690],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),l=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),m=l(n),d=a,f=m["".concat(u,".").concat(d)]||m[d]||p[d]||o;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4384:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(7294),a="container_AFEI",o="noMargins_PVGS",i=n(6010),c=function(e,t){return void 0===t&&(t="px"),/^\d+(\.\d*)?$/.test(e)?""+e+t:e},u=function(e){var t={},n=Object.assign({},e.options);return n.noMargins&&delete n.noMargins,n.size&&(t.maxWidth="min(90vw, "+c(n.size)+")",t.maxHeight=c(n.size),delete n.size),n.height&&(t.maxHeight=c(n.height),t.height=c(n.height),delete n.height),n.width&&(t.maxWidth="min(90vw, "+c(n.width)+")",t.width=c(n.width),delete n.width),t=Object.assign({},t,n),r.createElement("img",{src:e.src,alt:e.alt,style:t,title:e.isInline&&e.bib?"Author: "+e.bib.author+" @ "+e.bib.licence+(e.bib.edited?", Bearbeitet":""):void 0})},l=function(e){if(e.isInline)return r.createElement(u,e);var t=r.useState(!1),n=(t[0],t[1]),c=r.useState(!1),l=(c[0],c[1],e.caption&&"undefined"!==e.caption),s=e.bib||l;return e.options.noMargins&&!0,r.createElement("figure",{className:(0,i.Z)(a,e.options.noMargins&&o),onMouseEnter:function(){return n(!0)},onMouseOut:function(e){var t,r,a,o,i;t=e.currentTarget.getBoundingClientRect(),r=e.clientX,a=e.clientY,o=t.left<=r&&t.right>=r,i=t.top<=a&&t.bottom>=a,o&&i||n(!1)}},r.createElement(u,e),s&&r.createElement("figcaption",null,l&&r.createElement("span",null,e.caption)))}},2943:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return u},metadata:function(){return s},toc:function(){return m}});var r=n(3117),a=n(102),o=(n(7294),n(3905)),i=n(4384),c=["components"],u={authors:["lebalz"],tags:["docusaurus"],image:"./images/search-and-replace.png"},l="Transform Docusaurus Frontmatter",s={permalink:"/2022/06/09/transform-frontmatter",editUrl:"https://github.com/lebalz/blog/edit/main/blog/2022-06-09-transform-frontmatter/index.md",source:"@site/blog/2022-06-09-transform-frontmatter/index.md",title:"Transform Docusaurus Frontmatter",description:"Today i wanted to move all the title:  fields from the frontmatter to the markdown content (since docusaurus knows how to do this...).",date:"2022-06-09T00:00:00.000Z",formattedDate:"June 9, 2022",tags:[{label:"docusaurus",permalink:"/tags/docusaurus"}],readingTime:.515,truncated:!1,authors:[{name:"Balthasar Hofer",url:"https://github.com/lebalz",imageURL:"https://github.com/lebalz.png",key:"lebalz"}],frontMatter:{authors:["lebalz"],tags:["docusaurus"],image:"./images/search-and-replace.png"},nextItem:{title:"Speedup Build Time on Drone CI",permalink:"/2022/01/04/cache-drone-builds"}},p={image:n(8656).Z,authorsImageUrls:[void 0]},m=[],d={toc:m};function f(e){var t=e.components,u=(0,a.Z)(e,c);return(0,o.kt)("wrapper",(0,r.Z)({},d,u,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Today i wanted to move all the ",(0,o.kt)("inlineCode",{parentName:"p"},"title: ")," fields from the frontmatter to the markdown content (since docusaurus knows how to do this...). "),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Old"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-md"},"---\ntitle: Transform Docusaurus Frontmatter\ntags: [docusaurus]\nimage: ./images/search-and-replace.png\n---\n\nToday i wanted to move all the...\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"New"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-md"},"---\ntags: [docusaurus]\nimage: ./images/search-and-replace.png\n---\n\n# Transform Docusaurus Frontmatter\n\nToday i wanted to move all the...\n")),(0,o.kt)("p",null,'Since i had a lot of files to transform, i wanted to use "Search & Replace". I came up with the following Search Pattern in VS-Code:'),(0,o.kt)("div",{style:{display:"flex",justifyContent:"center"}},(0,o.kt)(i.Z,{caption:"undefined",options:{},isInline:!1,src:n(8656).Z,mdxType:"Image"})),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"---\ntitle: (.*)\n((.*\\r?\\n)+?)---\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"---\n$2---\n\n# $1\n")))}f.isMDXComponent=!0},8656:function(e,t,n){t.Z=n.p+"assets/images/search-and-replace-bbae392f4356a8d839fecc8eec3537d3.png"}}]);