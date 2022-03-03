"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[557],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},l=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=d(e,["components","mdxType","originalType","parentName"]),l=c(n),m=a,k=l["".concat(s,".").concat(m)]||l[m]||u[m]||o;return n?r.createElement(k,i(i({ref:t},p),{},{components:n})):r.createElement(k,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=l;var d={};for(var s in t)hasOwnProperty.call(t,s)&&(d[s]=t[s]);d.originalType=e,d.mdxType="string"==typeof e?e:a,i[1]=d;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}l.displayName="MDXCreateElement"},6793:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return d},contentTitle:function(){return s},metadata:function(){return c},assets:function(){return p},toc:function(){return u},default:function(){return m}});var r=n(3117),a=n(102),o=(n(7294),n(3905)),i=["components"],d={title:"Bitwarden"},s="Bitwarden - Vaultwarden",c={unversionedId:"dokku/bitwarden",id:"dokku/bitwarden",title:"Bitwarden",description:"Vaultwarden: An alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients, perfect for self-hosted deployment where running the official resource-heavy service might not be ideal.",source:"@site/docs/dokku/bitwarden.md",sourceDirName:"dokku",slug:"/dokku/bitwarden",permalink:"/synopsis/dokku/bitwarden",editUrl:"https://github.com/lebalz/blog/edit/main/docs/dokku/bitwarden.md",tags:[],version:"current",frontMatter:{title:"Bitwarden"},sidebar:"tutorialSidebar",previous:{title:"Dokku",permalink:"/synopsis/dokku/"},next:{title:"Drone CI",permalink:"/synopsis/dokku/drone-ci/"}},p={},u=[],l={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"bitwarden---vaultwarden"},"Bitwarden - Vaultwarden"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/dani-garcia/vaultwarden#installation"},"Vaultwarden"),": An alternative implementation of the Bitwarden server API written in ",(0,o.kt)("strong",{parentName:"p"},"Rust")," and ",(0,o.kt)("strong",{parentName:"p"},"compatible with upstream Bitwarden clients"),", perfect for self-hosted deployment where running the official resource-heavy service might not be ideal."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'#!/bin/bash\nAPP=bitwarden\nMAIL=foor@bar.ch\nDOMAIN=bitwarden.dokku.me\n\n# create app\ndokku apps:create $APP\n\n# setup and mount persitent storage\nmkdir -p /var/lib/dokku/data/storage/$APP/data\ndokku storage:mount $APP /var/lib/dokku/data/storage/$APP/data:/data/\n\n# add port mapping\ndokku proxy:ports-add $APP "http:80:80"\n# set domain\ndokku domains:add $APP $DOMAIN\n\n# SMTP configuration\ndokku config:set $APP DOMAIN=https://$DOMAIN\ndokku config:set $APP SMTP_HOST=mail.gandi.net\ndokku config:set $APP SMTP_FROM=foo@bar.ch\ndokku config:set $APP SMTP_FROM_NAME=Bitwarden\ndokku config:set $APP SMTP_PORT=587 \ndokku config:set $APP SMTP_SSL=true\ndokku config:set $APP SMTP_USERNAME=foo@bar.ch\ndokku config:set $APP SMTP_PASSWORD=safe-pw\n\n# letsencrypt config\ndokku config:set --no-restart $APP DOKKU_LETSENCRYPT_EMAIL=$MAIL\n\n# enable admin route\ndokku config:set $APP ADMIN_TOKEN=$(openssl rand -base64 48)\n\n# for correct propagation of the clients ip:\ndokku nginx:set $APP x-forwarded-for-value "\\$proxy_add_x_forwarded_for"\n\n# deploy\ndokku git:from-image $APP vaultwarden/server:latest\n\n#letsencrypt\ndokku letsencrypt $APP\n')),(0,o.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"danger")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"The following step ",(0,o.kt)("strong",{parentName:"p"},"has to be done after each deployment"),", since there is no possibility to set X-Real-IP to ",(0,o.kt)("inlineCode",{parentName:"p"},"$remote_addr")," without a custom template, so edit the nginx template under ",(0,o.kt)("inlineCode",{parentName:"p"},"/home/dokku/$APP/nginx.conf")," and add"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-bash",metastring:"title=/home/dokku/$APP/nginx.conf",title:"/home/dokku/$APP/nginx.conf"},"location / {\n    ...\n    X-Real-IP to $remote_addr;\n}\n")),(0,o.kt)("p",{parentName:"div"},"and then do a ",(0,o.kt)("inlineCode",{parentName:"p"},"service nginx reload"),"."))))}m.isMDXComponent=!0}}]);