(()=>{var t={};t.id=888,t.ids=[888],t.modules={8010:(t,e,r)=>{"use strict";r.d(e,{J:()=>i});var a=r(2351);let i={create:async function(t){try{let e=`${a.Vi.API_URL}/${a.Vi.ENDPOINTS.CATEGORY}`,r={body:JSON.stringify(t),headers:{"Content-Type":"application/json"},method:"POST"},i=await (0,a.SH)(e,r);if(!i)throw Error("No response received");if(200!==i.status)throw i;return!0}catch(t){throw t}},delete:async function(t){try{let e=`${a.Vi.API_URL}/${a.Vi.ENDPOINTS.CATEGORY}/${t}`,r=await (0,a.SH)(e,{method:"DELETE"});if(!r)throw Error("No response received");if(200!==r.status)throw r;return!0}catch(t){throw t}},getAll:async function(){try{let t=`${a.Vi.API_URL}${a.Vi.ENDPOINTS.CATEGORY}`,e=await fetch(t);if(!e)throw Error("No response received");let r=await e.json();if(200!==e.status)throw r;return r}catch(t){throw t}},update:async function(t,e){try{let r=`${a.Vi.API_URL}/${a.Vi.ENDPOINTS.CATEGORY}/${e}`,i={body:JSON.stringify(t),headers:{"Content-Type":"application/json"},method:"PUT"},s=await (0,a.SH)(r,i);if(!s)throw Error("No response received");if(200!==s.status)throw s;return!0}catch(t){throw t}}}},339:(t,e,r)=>{"use strict";r.d(e,{v3:()=>i,Jz:()=>s.J,Jb:()=>n,Rq:()=>c});var a=r(9952);let i={confirmation:async function(t,e){try{return await a.Auth.confirmSignUp(t,e),!0}catch(t){throw t}},login:async function(t,e){try{return await a.Auth.signIn({password:e,username:t}),await a.Auth.currentAuthenticatedUser({bypassCache:!1})}catch(t){throw t}},logout:async function(){try{await a.Auth.signOut()}catch(t){throw t}},register:async function(t,e){try{return await a.Auth.signUp({password:e,username:t})}catch(t){throw t}},resendCode:async function(t){try{await a.Auth.resendSignUp(t)}catch(t){throw t}},retrieveSession:async function(){try{return(await a.Auth.currentSession()).getAccessToken().getJwtToken()}catch(t){throw t}}};var s=r(8010),o=r(2351);let n={create:async function(t){try{let e=`${o.Vi.API_URL}${o.Vi.ENDPOINTS.PRODUCT}`,r={body:JSON.stringify(t),headers:{"Content-Type":"application/json"},method:"POST"},a=await (0,o.SH)(e,r);if(a&&200!==a.status)throw a;return!0}catch(t){throw t}},delete:async function(t){try{let e=`${o.Vi.API_URL}${o.Vi.ENDPOINTS.PRODUCT}/${t}`,r=await (0,o.SH)(e,{method:"DELETE"});if(r&&200!==r.status)throw r;return!0}catch(t){throw t}},getAll:async function(t=1,e=10,r=""){try{let a=`page=${t}&pageSize=${e}`,i=`search=${r}`,s=`${a}&${i}`,n=`${o.Vi.API_URL}/${o.Vi.ENDPOINTS.PRODUCT}?${s}`,c=await fetch(n),u=await c.json();if(200!==c.status)throw u;return u}catch(t){throw t}},getByCategorySlug:async function(t,e=1,r=10){try{let a=`slugCateg=${t}`,i=`page=${e}&pageSize=${r}`,s=`${a}&${i}`,n=`${o.Vi.API_URL}/${o.Vi.ENDPOINTS.PRODUCT}?${s}`,c=await fetch(n),u=await c.json();if(200!==c.status)throw u;return u}catch(t){throw t}},getById:async function(t){try{let e=`prodId=${t}`,r=`${o.Vi.API_URL}/${o.Vi.ENDPOINTS.PRODUCT}?${e}`,a=await fetch(r),i=await a.json();if(200!==a.status)throw i;return i.data[0]||null}catch(t){throw t}},getBySlug:async function(t){try{let e=`slug=${t}`,r=`${o.Vi.API_URL}/${o.Vi.ENDPOINTS.PRODUCT}?${e}`,a=await fetch(r),i=await a.json();if(200!==a.status)throw i;return i.data[0]||null}catch(t){throw t}},update:async function(t,e){try{let r=`${o.Vi.API_URL}${o.Vi.ENDPOINTS.PRODUCT}/${e}`,a={body:JSON.stringify(t),headers:{"Content-Type":"application/json"},method:"PUT"},i=await (0,o.SH)(r,a);if(i&&200!==i.status)throw i;return!0}catch(t){throw t}},updateImage:async function(t,e){try{if(e.size>10485760)throw Error("El tama\xf1o del archivo excede el m\xe1ximo permitido.");let r=`${o.Vi.API_IMG_URL}/gambit-img-bucket/${t}.jpg`,a=await (0,o.SH)(r,{body:e,headers:{"Content-Type":"image/jpeg"},method:"PUT"});if(a&&200!==a.status)throw a;return!0}catch(t){throw t}}},c={getAll:async function(t=1){try{let e=`page=${t}`,r=`${o.Vi.API_URL}/${o.Vi.ENDPOINTS.USERS}?${e}`,a=await (0,o.SH)(r);if(!a)throw Error("No response received");let i=await a.json();if(200!==a.status)throw i;return i}catch(t){throw t}},me:async function(){try{let t=`${o.Vi.API_URL}${o.Vi.ENDPOINTS.USER_ME}`,e=await (0,o.SH)(t);if(!e)throw Error("No response received");let r=await e.json();if(200!==e.status)throw r;return r}catch(t){throw t}}}},5900:(t,e,r)=>{"use strict";r.d(e,{V:()=>n,H:()=>c});var a=r(997),i=r(1163),s=r(6689),o=r(339);let n=(0,s.createContext)({});function c(t){let{children:e}=t,[r,c]=(0,s.useState)({}),[u,h]=(0,s.useState)(!1),[w,l]=(0,s.useState)(!0),d=(0,i.useRouter)();(0,s.useEffect)(()=>{(async()=>{try{await y(),l(!1)}catch(t){l(!1)}})()},[]);let y=async()=>{try{let t=await o.Rq.me();c(t),h(0===t.userStatus),l(!1)}catch(t){console.error(t),l(!1)}};return w?null:a.jsx(n.Provider,{value:{isAdmin:u,login:y,logout:()=>{c({}),o.v3.logout(),d.push("/")},updateUser:(t,e)=>{c({...r,[t]:e})},user:r},children:e})}},5143:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>s});var a=r(997);r(8158),r(8091);var i=r(5900);function s(t){let{Component:e,pageProps:r}=t;return a.jsx(i.H,{children:a.jsx(e,{...t})})}(0,r(2351).UR)()},2658:(t,e,r)=>{"use strict";r.d(e,{V:()=>a});let a={API_IMG_URL:"https://iwbolpi9l4.execute-api.us-east-1.amazonaws.com/Production",API_URL:"https://vfflkbriye.execute-api.us-east-1.amazonaws.com/gambit/gambit",BASKET:"basket",ENDPOINTS:{ADDRESS:"/address",CATEGORY:"/category",ORDER:"/order",ORDERS:"/orders",PRODUCT:"/product",USERS:"/users",USER_ME:"/user/me"},IMG_URL:"https://gambit-img-bucket.s3.amazonaws.com",TINY_APIKEY:"agh3xktjurawll57abh1pj6lzpdtdihaffl8zeneyx609kjt",TOKEN:"token"}},2351:(t,e,r)=>{"use strict";r.d(e,{Vi:()=>n.V,SH:()=>o,UR:()=>i});var a=r(5581);function i(){a.Amplify.configure({aws_cognito_identity_pool_id:"us-east-1:ae23c48f-8125-45e6-9a25-d6db54ad9065",aws_cognito_region:"us-east-1",aws_user_pools_id:"us-east-1_F9HiLNIFK",aws_user_pools_web_client_id:"an4laitk7o8a5slda3mr20v69"})}var s=r(339);async function o(t,e){let r=await s.v3.retrieveSession();if(r){let a={...e,headers:{...e?.headers,Authorization:r}};try{return await fetch(t,a)}catch(t){throw t}}else console.log("No hay token")}var n=r(2658)},8091:()=>{},9952:t=>{"use strict";t.exports=require("@aws-amplify/auth")},5581:t=>{"use strict";t.exports=require("aws-amplify")},2785:t=>{"use strict";t.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:t=>{"use strict";t.exports=require("react")},6405:t=>{"use strict";t.exports=require("react-dom")},997:t=>{"use strict";t.exports=require("react/jsx-runtime")},7147:t=>{"use strict";t.exports=require("fs")},2781:t=>{"use strict";t.exports=require("stream")},9796:t=>{"use strict";t.exports=require("zlib")}};var e=require("../webpack-runtime.js");e.C(t);var r=t=>e(e.s=t),a=e.X(0,[255,300],()=>r(5143));module.exports=a})();