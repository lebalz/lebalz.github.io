"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8763],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return p}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),c=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=c(e.components);return r.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=c(t),p=a,h=m["".concat(s,".").concat(p)]||m[p]||d[p]||o;return t?r.createElement(h,i(i({ref:n},u),{},{components:t})):r.createElement(h,i({ref:n},u))}));function p(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4384:function(e,n,t){t.d(n,{Z:function(){return c}});var r=t(7294),a="container_AFEI",o="noMargins_PVGS",i=t(6010),l=function(e,n){return void 0===n&&(n="px"),/^\d+(\.\d*)?$/.test(e)?""+e+n:e},s=function(e){var n={},t=Object.assign({},e.options);return t.noMargins&&delete t.noMargins,t.size&&(n.maxWidth="min(90vw, "+l(t.size)+")",n.maxHeight=l(t.size),delete t.size),t.height&&(n.maxHeight=l(t.height),n.height=l(t.height),delete t.height),t.width&&(n.maxWidth="min(90vw, "+l(t.width)+")",n.width=l(t.width),delete t.width),n=Object.assign({},n,t),r.createElement("img",{src:e.src,alt:e.alt,style:n,title:e.isInline&&e.bib?"Author: "+e.bib.author+" @ "+e.bib.licence+(e.bib.edited?", Bearbeitet":""):void 0})},c=function(e){if(e.isInline)return r.createElement(s,e);var n=r.useState(!1),t=(n[0],n[1]),l=r.useState(!1),c=(l[0],l[1],e.caption&&"undefined"!==e.caption),u=e.bib||c;return e.options.noMargins&&!0,r.createElement("figure",{className:(0,i.Z)(a,e.options.noMargins&&o),onMouseEnter:function(){return t(!0)},onMouseOut:function(e){var n,r,a,o,i;n=e.currentTarget.getBoundingClientRect(),r=e.clientX,a=e.clientY,o=n.left<=r&&n.right>=r,i=n.top<=a&&n.bottom>=a,o&&i||t(!1)}},r.createElement(s,e),u&&r.createElement("figcaption",null,c&&r.createElement("span",null,e.caption)))}},1717:function(e,n,t){t.r(n),t.d(n,{assets:function(){return d},contentTitle:function(){return c},default:function(){return h},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return m}});var r=t(3117),a=t(102),o=(t(7294),t(3905)),i=t(4384),l=["components"],s={title:"Speedup Build Time on Drone CI",authors:["lebalz"],tags:["drone ci","cache","drone"],image:"./images/pipeline-cached.png"},c="Speedup Build Time on Drone CI",u={permalink:"/2022/01/04/cache-drone-builds",editUrl:"https://github.com/lebalz/blog/edit/main/blog/2022-01-04-cache-drone-builds/index.md",source:"@site/blog/2022-01-04-cache-drone-builds/index.md",title:"Speedup Build Time on Drone CI",description:"I use drone ci to build and deploy my github pages. Like that i don't have to wait for a free github runner and have a more or less constant build time. My initial Pipeline had three stages:",date:"2022-01-04T00:00:00.000Z",formattedDate:"January 4, 2022",tags:[{label:"drone ci",permalink:"/tags/drone-ci"},{label:"cache",permalink:"/tags/cache"},{label:"drone",permalink:"/tags/drone"}],readingTime:2.42,truncated:!0,authors:[{name:"Balthasar Hofer",url:"https://github.com/lebalz",imageURL:"https://github.com/lebalz.png",key:"lebalz"}],frontMatter:{title:"Speedup Build Time on Drone CI",authors:["lebalz"],tags:["drone ci","cache","drone"],image:"./images/pipeline-cached.png"},prevItem:{title:"Transform Docusaurus Frontmatter",permalink:"/2022/06/09/transform-frontmatter"},nextItem:{title:"Happy New Year \ud83e\udd73",permalink:"/2022/01/01/happy-new-year"}},d={image:t(1142).Z,authorsImageUrls:[void 0]},m=[{value:"Configure Drone Server",id:"configure-drone-server",level:2},{value:"<code>.drone.yml</code>",id:"droneyml",level:2},{value:"Conclusion \ud83d\ude80",id:"conclusion-",level:2}],p={toc:m};function h(e){var n=e.components,s=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,r.Z)({},p,s,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"I use drone ci to build and deploy my github pages. Like that i don't have to wait for a free github runner and have a more or less constant build time. My initial Pipeline had three stages:"),(0,o.kt)("div",{style:{display:"flex",justifyContent:"center"}},(0,o.kt)(i.Z,{caption:"Stages",options:{},isInline:!1,src:t(7757).Z,alt:"Stages",mdxType:"Image"})),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"website")," Stage, where the static page is compiled with Webpacker, consumed the most time. No big deal for pages with few dependencies (e.g. a clean install of Docusaurus), where a complete build takes around 1 minute on a ",(0,o.kt)("a",{parentName:"p",href:"https://www.hetzner.com/cloud"},"Hetzner CPX41")," (8 VCPUs, ",(0,o.kt)("em",{parentName:"p"},"AMD EPYC 2nd")," with 16 GB Ram). But for pages with many dependecies it took me around 8 minutes for the page to be built."),(0,o.kt)("p",null,"So i decided to add caching to my pipeline. Since memory on my server isn't a problem for the moment, i'm using ",(0,o.kt)("em",{parentName:"p"},"volume cache")," directly on my server. To do so, i configured the ",(0,o.kt)("inlineCode",{parentName:"p"},".drony.yml")," file with two additional stages:"),(0,o.kt)("div",{style:{display:"flex",justifyContent:"center"}},(0,o.kt)(i.Z,{caption:"undefined",options:{},isInline:!1,src:t(1142).Z,mdxType:"Image"})),(0,o.kt)("p",null,"I used the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Drillster/drone-volume-cache"},"drone-volume-cache")," from ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Drillster"},"@drillster")," and followed the instructions on the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Drillster/drone-volume-cache/blob/master/DOCS.md"},"docs page"),"."),(0,o.kt)("h2",{id:"configure-drone-server"},"Configure Drone Server"),(0,o.kt)("p",null,"Because my drone ci is deployed with ",(0,o.kt)("a",{parentName:"p",href:"https://lebalz/synopsis/dokku/drone-ci"},"Dokku"),", the cache will be typically under ",(0,o.kt)("inlineCode",{parentName:"p"},"/var/lib/dokku/data/storage/<app-name>"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# create persistent directory for caching\nmkdir -p /var/lib/dokku/data/storage/drone-runner/cache\n")),(0,o.kt)("p",null,'The drone server itself will spawn the drone runner with a mounted volume. To do so, the repository, needs to be "Trusted". This flag can only be set as an admin. So ensure you configured yourself as an admin:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# replace foobar with your github username\ndokku config:set drone-server DRONE_USER_CREATE=username:foobar,admin:true\n")),(0,o.kt)("p",null,"And set the trusted flag under ",(0,o.kt)("inlineCode",{parentName:"p"},"Settings>General>Project Settings")," for the repository you like to cache:"),(0,o.kt)("div",{style:{display:"flex",justifyContent:"center"}},(0,o.kt)(i.Z,{caption:"Trusted Flag",options:{},isInline:!1,src:t(8382).Z,alt:"Trusted Flag",mdxType:"Image"})),(0,o.kt)("h2",{id:"droneyml"},(0,o.kt)("inlineCode",{parentName:"h2"},".drone.yml")),(0,o.kt)("p",null,"Finally, add the highlighted code blocks to your drone config file.  "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{3-11,14-22,25-28}","{3-11,14-22,25-28}":!0},"steps:\n# first step\n- name: restore-cache\n  image: drillster/drone-volume-cache\n  volumes:\n  - name: cache\n    path: /cache\n  settings:\n    restore: true\n    mount:\n      - ./node_modules\n# ...\n# last step\n- name: rebuild-cache\n  image: drillster/drone-volume-cache\n  volumes:\n  - name: cache\n    path: /cache\n  settings:\n    rebuild: true\n    mount:\n      - ./node_modules\n# ...\n# add volume\nvolumes:\n  - name: cache\n    host:\n      path: /var/lib/dokku/data/storage/drone-runner/cache\n")),(0,o.kt)("details",null,(0,o.kt)("summary",null,"Full .drone.yml"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"title=.drone.yml",title:".drone.yml"},'---\nkind: pipeline\ntype: docker\nname: default\n\nsteps:\n- name: restore-cache\n  image: drillster/drone-volume-cache\n  volumes:\n  - name: cache\n    path: /cache\n  settings:\n    restore: true\n    mount:\n      - ./node_modules\n\n- name: website\n  image: node:16.11.1\n  commands:\n  - mkdir -p $HOME/.ssh\n  - ssh-keyscan -t rsa github.com >> $HOME/.ssh/known_hosts\n  - echo "$GITHUB_PRIVATE_KEY" > "$HOME/.ssh/id_rsa"\n  - chmod 0600 $HOME/.ssh/id_rsa\n  - yarn install --frozen-lockfile\n  - npm run deploy\n  environment:\n    USE_SSH: true\n    GIT_USER: $DRONE_COMMIT_AUTHOR\n    GITHUB_PRIVATE_KEY:\n      from_secret: "git_deploy_private_key"\n  when:\n    event:\n      include:\n      - push\n      - pull_request\n\n- name: rebuild-cache\n  image: drillster/drone-volume-cache\n  volumes:\n  - name: cache\n    path: /cache\n  settings:\n    rebuild: true\n    mount:\n      - ./node_modules\n\nvolumes:\n  - name: cache\n    host:\n      path: /var/lib/dokku/data/storage/drone-runner/cache\n\ntrigger:\n  branch:\n  - main\n'))),(0,o.kt)("h2",{id:"conclusion-"},"Conclusion \ud83d\ude80"),(0,o.kt)("p",null,"With the added cache stages, the build time on my big page could be reduced from 8 minutes to 3:30 minutes \ud83d\ude80. For lightweight pages it takes now around 15 seconds for a small change to be deployed, yay \ud83e\udd73"))}h.isMDXComponent=!0},8382:function(e,n,t){n.Z=t.p+"assets/images/drone-settings-6f5b981a9b3bf71c7493a851a225dd21.png"},1142:function(e,n,t){n.Z=t.p+"assets/images/pipeline-cached-36888f0b9c7c68e6875bb2e936bf3ea0.png"},7757:function(e,n,t){n.Z=t.p+"assets/images/pipeline-old-0c38d4d35649acb40d436829148eaea8.png"}}]);