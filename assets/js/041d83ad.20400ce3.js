"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8061],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),f=c(n),d=i,m=f["".concat(l,".").concat(d)]||f[d]||u[d]||o;return n?r.createElement(m,a(a({ref:t},p),{},{components:n})):r.createElement(m,a({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5504:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return u}});var r=n(3117),i=n(102),o=(n(7294),n(3905)),a=["components"],s={},l="Disable Bing Search in Windows 11",c={unversionedId:"windows/disable-bing-search-win11",id:"windows/disable-bing-search-win11",title:"Disable Bing Search in Windows 11",description:"Use Windows Registry",source:"@site/docs/windows/disable-bing-search-win11.md",sourceDirName:"windows",slug:"/windows/disable-bing-search-win11",permalink:"/synopsis/windows/disable-bing-search-win11",draft:!1,editUrl:"https://github.com/lebalz/blog/edit/main/docs/windows/disable-bing-search-win11.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Yarn",permalink:"/synopsis/unix/yarn"},next:{title:"Network",permalink:"/synopsis/windows/network"}},p={},u=[],f={toc:u};function d(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"disable-bing-search-in-windows-11"},"Disable Bing Search in Windows 11"),(0,o.kt)("p",null,"Use Windows Registry ",(0,o.kt)("sup",{parentName:"p",id:"fnref-1"},(0,o.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1"))),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Press Win+R and type ",(0,o.kt)("inlineCode",{parentName:"li"},"regedit")," to open the registry editor."),(0,o.kt)("li",{parentName:"ol"},"Navigate to the following location: ",(0,o.kt)("inlineCode",{parentName:"li"},"Computer\\HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Search")),(0,o.kt)("li",{parentName:"ol"},"Right-click Search and select ",(0,o.kt)("inlineCode",{parentName:"li"},"New > DWORD (32-bit)")," Value."),(0,o.kt)("li",{parentName:"ol"},"Name the new DWORD value \u201cBingSearchEnabled\u201d"),(0,o.kt)("li",{parentName:"ol"},"Double-click the new DWORD BingSearchEnabled and set the data to 0 and click OK."),(0,o.kt)("li",{parentName:"ol"},"Close the Windows Registry when finished and restart your PC for the changes to take effect.")),(0,o.kt)("div",{className:"footnotes"},(0,o.kt)("hr",{parentName:"div"}),(0,o.kt)("ol",{parentName:"div"},(0,o.kt)("li",{parentName:"ol",id:"fn-1"},(0,o.kt)("a",{parentName:"li",href:"https://www.onmsft.com/how-to/how-to-disable-bing-search-on-windows-11/"},"www.onmsft.com"),(0,o.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}d.isMDXComponent=!0}}]);