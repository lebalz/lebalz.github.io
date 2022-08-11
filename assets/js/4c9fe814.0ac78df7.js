"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7765],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var a=r.createContext({}),p=function(e){var t=r.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(a.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,a=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),f=p(n),d=o,m=f["".concat(a,".").concat(d)]||f[d]||u[d]||l;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,i=new Array(l);i[0]=f;var s={};for(var a in t)hasOwnProperty.call(t,a)&&(s[a]=t[a]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var p=2;p<l;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5508:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return a},default:function(){return d},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var r=n(3117),o=n(102),l=(n(7294),n(3905)),i=["components"],s={title:"Powershell",tags:["snippets"]},a="Powershell Snippets",p={unversionedId:"windows/powershell",id:"windows/powershell",title:"Powershell",description:"for-Loop",source:"@site/docs/windows/powershell.md",sourceDirName:"windows",slug:"/windows/powershell",permalink:"/synopsis/windows/powershell",draft:!1,editUrl:"https://github.com/lebalz/blog/edit/main/docs/windows/powershell.md",tags:[{label:"snippets",permalink:"/synopsis/tags/snippets"}],version:"current",frontMatter:{title:"Powershell",tags:["snippets"]},sidebar:"tutorialSidebar",previous:{title:"Network",permalink:"/synopsis/windows/network"},next:{title:"Fix: Keyboard",permalink:"/synopsis/windows/surface/keyboard"}},c={},u=[{value:"for-Loop",id:"for-loop",level:2},{value:"Beep Sound",id:"beep-sound",level:2},{value:"Lolcat",id:"lolcat",level:2}],f={toc:u};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,l.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"powershell-snippets"},"Powershell Snippets"),(0,l.kt)("h2",{id:"for-loop"},"for-Loop"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-powershell"},"for ($i=0; $i -le 10; $i++) {\n    [console]::beep($i * 100 + 700, 500);\n}\n")),(0,l.kt)("h2",{id:"beep-sound"},"Beep Sound"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-powershell"},"# [console]::beep(frequency, ms)\n[console]::beep(1200, 500);\n[console]::beep(1000, 500);\n")),(0,l.kt)("h2",{id:"lolcat"},"Lolcat"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/andot/lolcat"},"https://github.com/andot/lolcat")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-powershell"},"Install-Module lolcat -Scope CurrentUser\n\nset-executionpolicy remotesigned -scope CurrentUser\n\ndir | lolcat\n")))}d.isMDXComponent=!0}}]);