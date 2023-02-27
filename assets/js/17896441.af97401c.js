"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7918],{8945:function(e,t,n){n.r(t),n.d(t,{default:function(){return he}});var a=n(7294),r=n(1944),l=n(4700),i=a.createContext(null);function o(e){var t=e.children,n=function(e){return(0,a.useMemo)((function(){return{metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc}}),[e])}(e.content);return a.createElement(i.Provider,{value:n},t)}function s(){var e=(0,a.useContext)(i);if(null===e)throw new l.i6("DocProvider");return e}function c(){var e,t=s(),n=t.metadata,l=t.frontMatter,i=t.assets;return a.createElement(r.d,{title:n.title,description:n.description,keywords:l.keywords,image:null!=(e=i.image)?e:l.image})}var d=n(4334),m=n(7524),u=n(3117),v=n(5999),f=n(2244);function h(e){var t=e.previous,n=e.next;return a.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,v.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},t&&a.createElement(f.Z,(0,u.Z)({},t,{subLabel:a.createElement(v.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),n&&a.createElement(f.Z,(0,u.Z)({},n,{subLabel:a.createElement(v.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}function b(){var e=s().metadata;return a.createElement(h,{previous:e.previous,next:e.next})}var p=n(2263),E=n(9960),g=n(4104),L=n(5281),N=n(373),Z=n(4477);var k={unreleased:function(e){var t=e.siteTitle,n=e.versionMetadata;return a.createElement(v.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){var t=e.siteTitle,n=e.versionMetadata;return a.createElement(v.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function _(e){var t=k[e.versionMetadata.banner];return a.createElement(t,e)}function C(e){var t=e.versionLabel,n=e.to,r=e.onClick;return a.createElement(v.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:a.createElement("b",null,a.createElement(E.Z,{to:n,onClick:r},a.createElement(v.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function x(e){var t,n=e.className,r=e.versionMetadata,l=(0,p.Z)().siteConfig.title,i=(0,g.gA)({failfast:!0}).pluginId,o=(0,N.J)(i).savePreferredVersionName,s=(0,g.Jo)(i),c=s.latestDocSuggestion,m=s.latestVersionSuggestion,u=null!=c?c:(t=m).docs.find((function(e){return e.id===t.mainDocId}));return a.createElement("div",{className:(0,d.Z)(n,L.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},a.createElement("div",null,a.createElement(_,{siteTitle:l,versionMetadata:r})),a.createElement("div",{className:"margin-top--md"},a.createElement(C,{versionLabel:m.label,to:u.path,onClick:function(){return o(m.name)}})))}function T(e){var t=e.className,n=(0,Z.E)();return n.banner?a.createElement(x,{className:t,versionMetadata:n}):null}function H(e){var t=e.className,n=(0,Z.E)();return n.badge?a.createElement("span",{className:(0,d.Z)(t,L.k.docs.docVersionBadge,"badge badge--secondary")},a.createElement(v.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label}},"Version: {versionLabel}")):null}function y(e){var t=e.lastUpdatedAt,n=e.formattedLastUpdatedAt;return a.createElement(v.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:a.createElement("b",null,a.createElement("time",{dateTime:new Date(1e3*t).toISOString()},n))}}," on {date}")}function U(e){var t=e.lastUpdatedBy;return a.createElement(v.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:a.createElement("b",null,t)}}," by {user}")}function A(e){var t=e.lastUpdatedAt,n=e.formattedLastUpdatedAt,r=e.lastUpdatedBy;return a.createElement("span",{className:L.k.common.lastUpdated},a.createElement(v.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?a.createElement(y,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:r?a.createElement(U,{lastUpdatedBy:r}):""}},"Last updated{atDate}{byUser}"),!1)}var w=n(4881),M=n(1526),I="lastUpdated_vwxv";function B(e){return a.createElement("div",{className:(0,d.Z)(L.k.docs.docFooterTagsRow,"row margin-bottom--sm")},a.createElement("div",{className:"col"},a.createElement(M.Z,e)))}function O(e){var t=e.editUrl,n=e.lastUpdatedAt,r=e.lastUpdatedBy,l=e.formattedLastUpdatedAt;return a.createElement("div",{className:(0,d.Z)(L.k.docs.docFooterEditMetaRow,"row")},a.createElement("div",{className:"col"},t&&a.createElement(w.Z,{editUrl:t})),a.createElement("div",{className:(0,d.Z)("col",I)},(n||r)&&a.createElement(A,{lastUpdatedAt:n,formattedLastUpdatedAt:l,lastUpdatedBy:r})))}function V(){var e=s().metadata,t=e.editUrl,n=e.lastUpdatedAt,r=e.formattedLastUpdatedAt,l=e.lastUpdatedBy,i=e.tags,o=i.length>0,c=!!(t||n||l);return o||c?a.createElement("footer",{className:(0,d.Z)(L.k.docs.docFooter,"docusaurus-mt-lg")},o&&a.createElement(B,{tags:i}),c&&a.createElement(O,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:l,formattedLastUpdatedAt:r})):null}var S=n(6043),P=n(3743),D=n(102),R="tocCollapsibleButton_TO0P",j="tocCollapsibleButtonExpanded_MG3E",F=["collapsed"];function z(e){var t=e.collapsed,n=(0,D.Z)(e,F);return a.createElement("button",(0,u.Z)({type:"button"},n,{className:(0,d.Z)("clean-btn",R,!t&&j,n.className)}),a.createElement(v.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page"))}var q="tocCollapsible_ETCw",G="tocCollapsibleContent_vkbj",J="tocCollapsibleExpanded_sAul";function Y(e){var t=e.toc,n=e.className,r=e.minHeadingLevel,l=e.maxHeadingLevel,i=(0,S.u)({initialState:!0}),o=i.collapsed,s=i.toggleCollapsed;return a.createElement("div",{className:(0,d.Z)(q,!o&&J,n)},a.createElement(z,{collapsed:o,onClick:s}),a.createElement(S.z,{lazy:!0,className:G,collapsed:o},a.createElement(P.Z,{toc:t,minHeadingLevel:r,maxHeadingLevel:l})))}var K="tocMobile_ITEo";function Q(){var e=s(),t=e.toc,n=e.frontMatter;return a.createElement(Y,{toc:t,minHeadingLevel:n.toc_min_heading_level,maxHeadingLevel:n.toc_max_heading_level,className:(0,d.Z)(L.k.docs.docTocMobile,K)})}var W=n(9407);function X(){var e=s(),t=e.toc,n=e.frontMatter;return a.createElement(W.Z,{toc:t,minHeadingLevel:n.toc_min_heading_level,maxHeadingLevel:n.toc_max_heading_level,className:L.k.docs.docTocDesktop})}var $=n(2503),ee=n(5042);function te(e){var t,n,r,l,i=e.children,o=(t=s(),n=t.metadata,r=t.frontMatter,l=t.contentTitle,r.hide_title||void 0!==l?null:n.title);return a.createElement("div",{className:(0,d.Z)(L.k.docs.docMarkdown,"markdown")},o&&a.createElement("header",null,a.createElement($.Z,{as:"h1"},o)),a.createElement(ee.Z,null,i))}var ne=n(3651),ae=n(8596),re=n(4996);function le(e){return a.createElement("svg",(0,u.Z)({viewBox:"0 0 24 24"},e),a.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}var ie="breadcrumbHomeIcon_YNFT";function oe(){var e=(0,re.Z)("/");return a.createElement("li",{className:"breadcrumbs__item"},a.createElement(E.Z,{"aria-label":(0,v.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e},a.createElement(le,{className:ie})))}var se="breadcrumbsContainer_Z_bl";function ce(e){var t=e.children,n=e.href,r="breadcrumbs__link";return e.isLast?a.createElement("span",{className:r,itemProp:"name"},t):n?a.createElement(E.Z,{className:r,href:n,itemProp:"item"},a.createElement("span",{itemProp:"name"},t)):a.createElement("span",{className:r},t)}function de(e){var t=e.children,n=e.active,r=e.index,l=e.addMicrodata;return a.createElement("li",(0,u.Z)({},l&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,d.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n})}),t,a.createElement("meta",{itemProp:"position",content:String(r+1)}))}function me(){var e=(0,ne.s1)(),t=(0,ae.Ns)();return e?a.createElement("nav",{className:(0,d.Z)(L.k.docs.docBreadcrumbs,se),"aria-label":(0,v.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},a.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&a.createElement(oe,null),e.map((function(t,n){var r=n===e.length-1;return a.createElement(de,{key:n,active:r,index:n,addMicrodata:!!t.href},a.createElement(ce,{href:t.href,isLast:r},t.label))})))):null}var ue="docItemContainer_Djhp",ve="docItemCol_VOVn";function fe(e){var t,n,r,l,i,o,c=e.children,u=(t=s(),n=t.frontMatter,r=t.toc,l=(0,m.i)(),i=n.hide_table_of_contents,o=!i&&r.length>0,{hidden:i,mobile:o?a.createElement(Q,null):void 0,desktop:!o||"desktop"!==l&&"ssr"!==l?void 0:a.createElement(X,null)});return a.createElement("div",{className:"row"},a.createElement("div",{className:(0,d.Z)("col",!u.hidden&&ve)},a.createElement(T,null),a.createElement("div",{className:ue},a.createElement("article",null,a.createElement(me,null),a.createElement(H,null),u.mobile,a.createElement(te,null,c),a.createElement(V,null)),a.createElement(b,null))),u.desktop&&a.createElement("div",{className:"col col--3"},u.desktop))}function he(e){var t="docs-doc-id-"+e.content.metadata.unversionedId,n=e.content;return a.createElement(o,{content:e.content},a.createElement(r.FG,{className:t},a.createElement(c,null),a.createElement(fe,null,a.createElement(n,null))))}},9407:function(e,t,n){n.d(t,{Z:function(){return d}});var a=n(3117),r=n(102),l=n(7294),i=n(4334),o=n(3743),s="tableOfContents_bqdL",c=["className"];function d(e){var t=e.className,n=(0,r.Z)(e,c);return l.createElement("div",{className:(0,i.Z)(s,"thin-scrollbar",t)},l.createElement(o.Z,(0,a.Z)({},n,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},3743:function(e,t,n){n.d(t,{Z:function(){return p}});var a=n(3117),r=n(102),l=n(7294),i=n(6668),o=["parentIndex"];function s(e){var t=e.map((function(e){return Object.assign({},e,{parentIndex:-1,children:[]})})),n=Array(7).fill(-1);t.forEach((function(e,t){var a=n.slice(2,e.level);e.parentIndex=Math.max.apply(Math,a),n[e.level]=t}));var a=[];return t.forEach((function(e){var n=e.parentIndex,l=(0,r.Z)(e,o);n>=0?t[n].children.push(l):a.push(l)})),a}function c(e){var t=e.toc,n=e.minHeadingLevel,a=e.maxHeadingLevel;return t.flatMap((function(e){var t=c({toc:e.children,minHeadingLevel:n,maxHeadingLevel:a});return function(e){return e.level>=n&&e.level<=a}(e)?[Object.assign({},e,{children:t})]:t}))}function d(e){var t=e.getBoundingClientRect();return t.top===t.bottom?d(e.parentNode):t}function m(e,t){var n,a,r=t.anchorTopOffset,l=e.find((function(e){return d(e).top>=r}));return l?function(e){return e.top>0&&e.bottom<window.innerHeight/2}(d(l))?l:null!=(a=e[e.indexOf(l)-1])?a:null:null!=(n=e[e.length-1])?n:null}function u(){var e=(0,l.useRef)(0),t=(0,i.L)().navbar.hideOnScroll;return(0,l.useEffect)((function(){e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function v(e){var t=(0,l.useRef)(void 0),n=u();(0,l.useEffect)((function(){if(!e)return function(){};var a=e.linkClassName,r=e.linkActiveClassName,l=e.minHeadingLevel,i=e.maxHeadingLevel;function o(){var e=function(e){return Array.from(document.getElementsByClassName(e))}(a),o=function(e){for(var t=e.minHeadingLevel,n=e.maxHeadingLevel,a=[],r=t;r<=n;r+=1)a.push("h"+r+".anchor");return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:l,maxHeadingLevel:i}),s=m(o,{anchorTopOffset:n.current}),c=e.find((function(e){return s&&s.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)}));e.forEach((function(e){!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(r),e.classList.add(r),t.current=e):e.classList.remove(r)}(e,e===c)}))}return document.addEventListener("scroll",o),document.addEventListener("resize",o),o(),function(){document.removeEventListener("scroll",o),document.removeEventListener("resize",o)}}),[e,n])}function f(e){var t=e.toc,n=e.className,a=e.linkClassName,r=e.isChild;return t.length?l.createElement("ul",{className:r?void 0:n},t.map((function(e){return l.createElement("li",{key:e.id},l.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),l.createElement(f,{isChild:!0,toc:e.children,className:n,linkClassName:a}))}))):null}var h=l.memo(f),b=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function p(e){var t=e.toc,n=e.className,o=void 0===n?"table-of-contents table-of-contents__left-border":n,d=e.linkClassName,m=void 0===d?"table-of-contents__link":d,u=e.linkActiveClassName,f=void 0===u?void 0:u,p=e.minHeadingLevel,E=e.maxHeadingLevel,g=(0,r.Z)(e,b),L=(0,i.L)(),N=null!=p?p:L.tableOfContents.minHeadingLevel,Z=null!=E?E:L.tableOfContents.maxHeadingLevel,k=function(e){var t=e.toc,n=e.minHeadingLevel,a=e.maxHeadingLevel;return(0,l.useMemo)((function(){return c({toc:s(t),minHeadingLevel:n,maxHeadingLevel:a})}),[t,n,a])}({toc:t,minHeadingLevel:N,maxHeadingLevel:Z});return v((0,l.useMemo)((function(){if(m&&f)return{linkClassName:m,linkActiveClassName:f,minHeadingLevel:N,maxHeadingLevel:Z}}),[m,f,N,Z])),l.createElement(h,(0,a.Z)({toc:k,className:o,linkClassName:m},g))}},4477:function(e,t,n){n.d(t,{E:function(){return o},q:function(){return i}});var a=n(7294),r=n(4700),l=a.createContext(null);function i(e){var t=e.children,n=e.version;return a.createElement(l.Provider,{value:n},t)}function o(){var e=(0,a.useContext)(l);if(null===e)throw new r.i6("DocsVersionProvider");return e}},8434:function(e,t,n){n.d(t,{Z:function(){return o}});var a=n(9191),r=n(7294),l=n(6010),i="dl_tOps";var o=Object.assign({},a.Z,{dl:function(e){return r.createElement("dl",{className:(0,l.Z)(i,"dl")},e.children)}})}}]);