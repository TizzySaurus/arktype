"use strict";(self.webpackChunkarktype_io=self.webpackChunkarktype_io||[]).push([[1072],{9613:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>m});var r=t(9496);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),c=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=c(e.components);return r.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=c(t),m=o,f=u["".concat(p,".").concat(m)]||u[m]||d[m]||a;return t?r.createElement(f,i(i({ref:n},l),{},{components:t})):r.createElement(f,i({ref:n},l))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=u;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},7941:(e,n,t)=>{t.d(n,{g:()=>y});var r=t(9346),o=t(7374),a=t(3913),i=t(1269),s=t(9496);var p={"index.html":'<head>\n    <link href="http://fonts.cdnfonts.com/css/cascadia-code" rel="stylesheet" />\n</head>\n<div id="demo">\n    <div class="section">\n        <h3>Definition</h3>\n        <div class="card">\n            <pre><code id="definition"></code></pre>\n        </div>\n    </div>\n    <div class="section">\n        <h3>Output</h3>\n        <div class="card">\n            <pre><code id="output"></code></pre>\n        </div>\n    </div>\n</div>\n',"demo.css":'body {\n    font-family: "Cascadia Code", sans-serif;\n    background-color: hsl(220 18% 10%);\n}\n\n#demo {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    margin: -8px;\n    padding: 8px;\n}\n\n#input {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n.section {\n    display: flex;\n    flex-direction: column;\n    flex-grow: 1;\n    gap: 8px;\n}\n\n.card {\n    padding: 8px;\n    background-color: rgb(18, 18, 18);\n    color: rgb(255, 255, 255);\n    /* transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */\n    border-radius: 4px;\n    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,\n        rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;\n    background-image: linear-gradient(\n        rgba(255, 255, 255, 0.05),\n        rgba(255, 255, 255, 0.05)\n    );\n    height: 100%;\n}\n\np {\n    white-space: pre-wrap;\n}\n\npre {\n    white-space: pre-wrap;\n}\n\nh3 {\n    margin: 0px;\n    color: #fff;\n}\n\n.key {\n    color: #80cff8;\n}\n.val {\n    color: #f5cf8f;\n}\n',"populateDemo.ts":'import "./demo.css"\nimport type { Problems, Type } from "arktype"\nimport { stringify } from "arktype/internal/utils/serialize.js"\n\ntype PopulateDemoArgs = {\n    type: Type\n    data: unknown\n    problems: Problems\n}\nexport const populateDemo = ({ data, type, problems }: PopulateDemoArgs) => {\n    const defElement = document.querySelector("#definition")!\n    defElement.textContent = stringify(type.definition, 2)\n    defElement.innerHTML = recolor(defElement.innerHTML)\n\n    const resultElement = document.querySelector("#output")!\n    if (problems) {\n        resultElement.textContent = `\u274c problems:\n\n${problems}`\n    } else {\n        resultElement.textContent = `\u2705 data:\n\n${stringify(\n            type(data).data,\n            2\n        )}`\n        resultElement.innerHTML = recolor(resultElement.innerHTML)\n    }\n}\n\nconst recolor = (input: string) => {\n    const lines = input.split("\\n")\n    const fixedInput: string[] = []\n    for (const line of lines) {\n        if (line.includes(":")) {\n            const parts = line.split(":")\n            fixedInput.push(`${buildKey(parts[0])}: ${buildVal(parts[1])}`)\n        } else {\n            fixedInput.push(line)\n        }\n    }\n    return fixedInput.join("\\n")\n}\n\nconst buildKey = (key: string) => {\n    return `<span class=\'key\'>${key}</span>`\n}\nconst buildVal = (val: string) => {\n    const formatted = val.trim()\n    if (formatted[formatted.length - 1] === ",") {\n        return `<span class=\'val\'>${formatted.replace(",", "")}</span>,`\n    } else if (formatted[formatted.length - 1] === "{") {\n        return "{"\n    }\n    return `<span class=\'val\'>${formatted}</span>`\n}\n',"tsconfig.json":JSON.stringify({compilerOptions:{module:"esnext",target:"esnext",strict:!0}},null,4)},c=t(4096);var l=function(e){var n=d[e];return'import {populateDemo} from "./populateDemo"\n(async () => {\n    try {\n        '+n[0]+"\n        populateDemo("+n[1]+')\n    } catch(e) {\n        populateDemo({ \n            type: {\n                definition: ""\n            },\n            data: "",\n            problems: "ParseError: " + e.originalErr.message\n          } as any)\n    }\n})()'},d={type:['const { user, data, problems } = await import("./type")',"{ type: user, data, problems }"],scope:['const { types, data, problems } = await import("./scope")',"{ type: types.package, data, problems }"]},u={type:'import { type } from "../src/main"\n\n// Define a type...\nexport const user = type({\n    name: "string",\n    device: {\n        platform: "\'android\'|\'ios\'",\n        "version?": "number"\n    }\n})\n\n// Infer it...\nexport type User = typeof user.infer\n\n// Validate your data anytime, anywhere, with the same clarity and precision you expect from TypeScript.\nexport const { data, problems } = user({\n    name: "Alan Turing",\n    device: {\n        platform: "enigma"\n    }\n})\n\nif (problems) {\n    // "device/platform must be \'android\' or \'ios\' (was \'enigma\')"\n    console.log(problems.summary)\n}\n',scope:'import { scope } from "../src/main"\n\n// Scopes are collections of types that can reference each other.\nexport const types = scope({\n    package: {\n        name: "string",\n        "dependencies?": "package[]",\n        "contributors?": "contributor[]"\n    },\n    contributor: {\n        // Subtypes like \'email\' are inferred like \'string\' but provide additional validation at runtime.\n        email: "email",\n        "packages?": "package[]"\n    }\n}).compile()\n\n// Cyclic types are inferred to arbitrary depth...\nexport type Package = typeof types.package.infer\n\n// And can validate cyclic data.\nconst packageData: Package = {\n    name: "arktype",\n    dependencies: [{ name: "typescript" }],\n    contributors: [{ email: "david@sharktypeio" }]\n}\npackageData.dependencies![0].dependencies = [packageData]\n\nexport const { data, problems } = types.package(packageData)\n'},m="arktype-demo",f=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(n){var t,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=n.embedId,e.abrupt("return",c.Z.embedProject(m,{files:Object.assign((t={},t[o+".ts"]=u[o],t["index.ts"]=l(o),t),p),title:o,description:"ArkType "+o+" demo",template:"typescript",dependencies:{arktype:"1.0.2-alpha"},settings:{compile:{clearConsole:!1,trigger:"keystroke"}}},{height:"100%",openFile:o+".ts"}));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),y=function(e){var n=(0,s.useState)(!0),t=n[0],p=n[1];return(0,s.useEffect)((function(){(0,o.Z)((0,r.Z)().mark((function n(){var t;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,f(e);case 2:t=n.sent,setTimeout((function(){return t.applyFsDiff({create:{"tsconfig.json":JSON.stringify({compilerOptions:{module:"esnext",target:"esnext",strict:!0}},null,4)},destroy:[]})}),3e3),p(!1);case 5:case"end":return n.stop()}}),n)})))()}),[]),s.createElement(a.Z,{style:{width:"100%",height:"660px",border:0,marginLeft:-8,marginRight:-8,padding:16,overflow:"hidden",borderRadius:"8px",display:"flex",justifyContent:"center",alignItems:"center"}},t?s.createElement(i.Z,{style:{position:"absolute"},color:"secondary"}):null,s.createElement("div",{style:{opacity:t?0:1},id:m}))}},1835:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>f,frontMatter:()=>p,metadata:()=>l,toc:()=>u});var r=t(4250),o=t(7075),a=(t(9496),t(9613)),i=t(7941),s=["components"],p={hide_table_of_contents:!0},c="Scopes",l={unversionedId:"scopes",id:"version-1.0.2-alpha/scopes",title:"Scopes",description:"",source:"@site/versioned_docs/version-1.0.2-alpha/scopes.mdx",sourceDirName:".",slug:"/scopes",permalink:"/docs/scopes",draft:!1,tags:[],version:"1.0.2-alpha",frontMatter:{hide_table_of_contents:!0},sidebar:"sidebar",previous:{title:"Intro",permalink:"/docs/"}},d={},u=[],m={toc:u};function f(e){var n=e.components,t=(0,o.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"scopes"},"Scopes"),(0,a.kt)(i.g,{embedId:"scope",mdxType:"StackBlitzDemo"}))}f.isMDXComponent=!0}}]);