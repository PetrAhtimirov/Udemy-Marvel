(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[7],{21:function(t,e,c){"use strict";var a=c.p+"static/media/error.42292aa1.gif",s=c(2);e.a=()=>Object(s.jsx)("img",{style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},src:a,alt:"error"})},22:function(t,e,c){"use strict";var a=c(0);e.a=()=>{const{loading:t,request:e,error:c,clearError:s,process:n,setProcess:i}=(()=>{const[t,e]=Object(a.useState)(!1),[c,s]=Object(a.useState)(null),[n,i]=Object(a.useState)("waiting");return{loading:t,request:Object(a.useCallback)((async function(t){let c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{"Content-Type":"application/json"};e(!0),i("loading");try{const s=await fetch(t,{method:c,body:a,headers:n});if(!s.ok)throw new Error("Could not fetch ".concat(t,", status: ").concat(s.status));const i=await s.json();return e(!1),i}catch(r){throw e(!1),s(r.message),i("error"),r}}),[]),error:c,clearError:Object(a.useCallback)((()=>{s(null),i("loading")}),[]),process:n,setProcess:i}})(),r="https://gateway.marvel.com:443/v1/public/",o="apikey=6cd0b5da891a48a4d3f5ae350908e21c",l=320,u=t=>{let e=t.description;return""===e&&(e="There is no description for this character"),e.length>160&&(e="".concat(e.substr(0,160),"...")),{id:t.id,name:t.name,description:e,thumbnail:"".concat(t.thumbnail.path,".").concat(t.thumbnail.extension),homepage:t.urls[0].url,wiki:t.urls[1].url,comics:t.comics.items}},m=t=>({id:t.id,title:t.title,description:t.description||"There is no description",pageCount:t.pageCount?"".concat(t.pageCount," p."):"No information about the number of pages",price:t.prices[0].price?"".concat(t.prices[0].price,"$"):"Not available",thumbnail:"".concat(t.thumbnail.path,".").concat(t.thumbnail.extension),language:t.textObjects.language||"en-us"});return{loading:t,error:c,clearError:s,process:n,setProcess:i,getAllCharacters:async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l;const c=await e("".concat(r,"characters?limit=9&offset=").concat(t,"&").concat(o));return c.data.results.map(u)},getCharacter:async t=>{const c=await e("".concat(r,"characters/").concat(t,"?").concat(o));return u(c.data.results[0])},getCharacterByName:async t=>(await e("".concat(r,"characters?name=").concat(t,"&").concat(o))).data.results.map(u),getCharacterComics:async t=>(await e("".concat(r,"characters/").concat(t,"/comics?orderBy=modified&").concat(o))).data.results.map(m),getAllComics:async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l;const c=await e("".concat(r,"comics?limit=8&offset=").concat(t,"&").concat(o));return c.data.results.map(m)},getComic:async t=>{const c=await e("".concat(r,"comics/").concat(t,"?").concat(o));return m(c.data.results[0])}}}},28:function(t,e,c){},29:function(t,e,c){"use strict";c(28);var a=c.p+"static/media/Avengers.4065c8f9.png",s=c.p+"static/media/Avengers_logo.9eaf2193.png",n=c(2);e.a=()=>Object(n.jsxs)("div",{className:"app__banner",children:[Object(n.jsx)("img",{src:a,alt:"Avengers"}),Object(n.jsxs)("div",{className:"app__banner-text",children:["New comics every week!",Object(n.jsx)("br",{}),"Stay tuned!"]}),Object(n.jsx)("img",{src:s,alt:"Avengers logo"})]})},52:function(t,e,c){},61:function(t,e,c){"use strict";c.r(e);var a=c(23),s=c(0),n=c(4),i=(c(52),c(21)),r=c(6),o=c(22),l=c(2);var u=()=>{const[t,e]=Object(s.useState)([]),[c,a]=Object(s.useState)(!1),[u,m]=Object(s.useState)(700),[d,b]=Object(s.useState)(!1),{loading:j,error:h,getAllComics:p}=Object(o.a)();Object(s.useEffect)((()=>{g(u,!0)}),[]);const g=(t,e)=>{a(!e),p(t).then(O)},O=t=>{e((e=>[...e,...t])),a(!1),m((t=>t+9)),b(t.length<8)},x=t.map(((t,e)=>Object(l.jsx)("li",{className:"comics__item",children:Object(l.jsxs)(n.b,{to:"/comics/".concat(t.id),children:[Object(l.jsx)("img",{src:t.thumbnail,alt:t.title,className:"comics__item-img"}),Object(l.jsx)("div",{className:"comics__item-name",children:t.title}),Object(l.jsx)("div",{className:"comics__item-price",children:t.price})]})},t.id))),f=h?Object(l.jsx)(i.a,{}):null,v=j&&!c?Object(l.jsx)(r.a,{}):null;return Object(l.jsxs)("div",{className:"comics__list",children:[f,v,Object(l.jsx)("ul",{className:"comics__grid",children:x}),Object(l.jsx)("button",{className:"button button__main button__long",disabled:c,style:{display:d?"none":"block"},onClick:()=>g(u),children:Object(l.jsx)("div",{className:"inner",children:"load more"})})]})},m=c(29);e.default=()=>Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)(a.a,{children:[Object(l.jsx)("meta",{name:"description",content:"Page with list of our comics"}),Object(l.jsx)("title",{children:"Comics page"})]}),Object(l.jsx)(m.a,{}),Object(l.jsx)(u,{})]})}}]);
//# sourceMappingURL=7.30fc1f0a.chunk.js.map