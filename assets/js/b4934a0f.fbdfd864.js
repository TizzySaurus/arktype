"use strict";(self.webpackChunkarktype_io=self.webpackChunkarktype_io||[]).push([[8518],{9613:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>m});var n=t(9496);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function l(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?l(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=n.createContext({}),u=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},c=function(e){var r=u(e.components);return n.createElement(i.Provider,{value:r},e.children)},f="mdxType",s={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},y=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),f=u(t),y=a,m=f["".concat(i,".").concat(y)]||f[y]||s[y]||l;return t?n.createElement(m,o(o({ref:r},c),{},{components:t})):n.createElement(m,o({ref:r},c))}));function m(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=y;var p={};for(var i in r)hasOwnProperty.call(r,i)&&(p[i]=r[i]);p.originalType=e,p[f]="string"==typeof e?e:a,o[1]=p;for(var u=2;u<l;u++)o[u]=t[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}y.displayName="MDXCreateElement"},3375:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>p,metadata:()=>u,toc:()=>f});var n=t(1163),a=t(574),l=(t(9496),t(9613)),o=["components"],p={hide_table_of_contents:!0},i="arrayOf",u={unversionedId:"api/arrayof",id:"version-1.0.12-alpha/api/arrayof",title:"arrayOf",description:"operator",source:"@site/versioned_docs/version-1.0.12-alpha/api/arrayof.md",sourceDirName:"api",slug:"/api/arrayof",permalink:"/docs/1.0.12-alpha/api/arrayof",draft:!1,tags:[],version:"1.0.12-alpha",frontMatter:{hide_table_of_contents:!0}},c={},f=[{value:"operator",id:"operator",level:2},{value:"string",id:"string",level:2},{value:"tuple",id:"tuple",level:2},{value:"helper",id:"helper",level:2}],s={toc:f},y="wrapper";function m(e){var r=e.components,t=(0,a.Z)(e,o);return(0,l.kt)(y,(0,n.Z)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"arrayof"},"arrayOf"),(0,l.kt)("h2",{id:"operator"},"operator"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.12-alpha/api/arrayof"},"arrayOf"))),(0,l.kt)("h2",{id:"string"},"string"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},'"T[]" ',(0,l.kt)("br",null)),(0,l.kt)("li",{parentName:"ul"},'const numberArray = type("number[]")',(0,l.kt)("br",null))),(0,l.kt)("h2",{id:"tuple"},"tuple"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},'[T, "[]"] ',(0,l.kt)("br",null)),(0,l.kt)("li",{parentName:"ul"},'const tupleArray = type(["number", "[]"])',(0,l.kt)("br",null))),(0,l.kt)("h2",{id:"helper"},"helper"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"arrayOf(T) ",(0,l.kt)("br",null)),(0,l.kt)("li",{parentName:"ul"},'const helperArray = arrayOf("number")',(0,l.kt)("br",null))))}m.isMDXComponent=!0}}]);