const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/catalog-9JliTZs2.js","assets/vendor-2fZl6onH.js","assets/vendor-BfMlxmOj.css"])))=>i.map(i=>d[i]);
import{i as h,a as E}from"./vendor-2fZl6onH.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const B="modulepreload",I=function(e){return"/CineScript-Team/"+e},w={},A=function(r,o,c){let t=Promise.resolve();if(o&&o.length>0){let l=function(s){return Promise.all(s.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),a=i?.nonce||i?.getAttribute("nonce");t=l(o.map(s=>{if(s=I(s),s in w)return;w[s]=!0;const u=s.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${d}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":B,u||(p.as="script"),p.crossOrigin="",p.href=s,a&&p.setAttribute("nonce",a),document.head.appendChild(p),u)return new Promise((q,P)=>{p.addEventListener("load",q),p.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${s}`)))})}))}function n(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return t.then(i=>{for(const a of i||[])a.status==="rejected"&&n(a.reason);return r().catch(n)})},f="2609725f661288e9b08bc0d62455b671",g="https://api.themoviedb.org/3";async function L(){return await(await fetch(`${g}/trending/movie/day?api_key=${f}`)).json()}async function Y(){return await(await fetch(`${g}/trending/movie/week?api_key=${f}`)).json()}async function N(e){return await(await fetch(`${g}/movie/${e}/videos?api_key=${f}`)).json()}async function W(e,r=""){return await(await fetch(`${g}/search/movie?api_key=${f}&query=${encodeURIComponent(e)}&year=${r}`)).json()}async function z(){return(await axios.get(`${g}/genre/movie/list`,{params:{api_key:f,language:LANGUAGE}})).data}const $="en-US";let T=1,y=[];function S(e){return Math.round(e*10)/10}function x(e){return(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(o=>o.id===e)}function C(e,r){let o=JSON.parse(localStorage.getItem("myLibrary"))||[];o.find(t=>t.id===e.id)?(o=o.filter(t=>t.id!==e.id),r.textContent="Add to my library",h.info({message:"Removed from My Library",position:"topRight"})):(o.push(e),r.textContent="Remove from my library",h.success({message:"Added to My Library",position:"topRight"})),localStorage.setItem("myLibrary",JSON.stringify(o))}async function U(e=1){const r=new Date,o=r.getFullYear(),c=String(r.getMonth()+1).padStart(2,"0"),t=new Date(o,r.getMonth()+1,0).getDate(),n=`${o}-${c}-01`,i=`${o}-${c}-${t}`;return(await E.get(`${g}/discover/movie`,{params:{api_key:f,language:$,sort_by:"popularity.desc",primary_release_date_gte:n,primary_release_date_lte:i,page:e}})).data}async function O(){return(await E.get(`${g}/genre/movie/list`,{params:{api_key:f,language:$}})).data}function R(e,r){const o=new Date(e.release_date).toLocaleDateString("en-GB");return`
    <div class="container">
      <h3 class="upcoming-header">Upcoming this month</h3>
      <div class="upcoming-body">
        <img
          class="upcoming-img"
          src="https://image.tmdb.org/t/p/original${e.backdrop_path}"
          alt="${e.title}"
        />
        <div class="upcoming-content">
          <h2 class="upcoming-content-header">${e.title}</h2>
          <div class="result">
            <div class="result-left">
              <div>
                <span>Release date</span>
                <span class="date">${o}</span>
              </div>
              <div>
                <span>Vote / Votes</span>
                <span class="vote">
                  <span class="vote-average">${S(e.vote_average)}</span> /
                  <span class="vote-count">${e.vote_count}</span>
                </span>
              </div>
            </div>
            <div class="result-right">
              <div>
                <span>Popularity</span>
                <span class="popularity">${S(e.popularity)}</span>
              </div>
              <div>
                <span>Genre</span>
                <span class="genre">${r}</span>
              </div>
            </div>
          </div>
          <h3 class="upcoming-about-header">About</h3>
          <p class="upcoming-about">${e.overview}</p>
          <button class="btn-primary" id="library-btn">Add to my library</button>
        </div>
      </div>
    </div>
  `}async function M(){console.log("🚀 renderUpcoming çağrıldı");const e=document.getElementById("upcoming");try{y.length===0&&(y=(await U(T++)).results.filter(l=>l.backdrop_path&&l.overview));const r=await O(),o={};r.genres.forEach(a=>o[a.id]=a.name);const c=JSON.parse(localStorage.getItem("myLibrary"))||[];let t;for(;y.length>0;){const a=Math.floor(Math.random()*y.length),l=y.splice(a,1)[0];if(!c.some(s=>s.id===l.id)){t=l;break}}if(!t){e.innerHTML='<p style="text-align:center">No more upcoming movies available.</p>',h.warning({message:"No more unique movies to show.",position:"topRight"});return}const n=t.genre_ids.map(a=>o[a]).filter(Boolean).join(", ");e.innerHTML=R(t,n);const i=e.querySelector("#library-btn");x(t.id)&&(i.textContent="Remove from my library"),i.addEventListener("click",()=>C(t,i))}catch(r){console.error("Error loading upcoming movie:",r),h.error({message:"Failed to load upcoming movie",position:"topRight"})}}const m=document.createElement("div");m.classList.add("trailer-modal","is-hidden");m.innerHTML=`
  <div class="trailer-modal-backdrop">
    <div class="trailer-modal-content">
      <button class="trailer-modal-close">&times;</button>
      <iframe
        id="trailer-video"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
        allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  </div>
`;document.body.appendChild(m);const D=m.querySelector(".trailer-modal-close"),k=m.querySelector(".trailer-modal-backdrop"),_=m.querySelector("#trailer-video");function H(e){_.src=`https://www.youtube.com/embed/${e}?autoplay=1`,m.classList.remove("is-hidden")}function b(){m.classList.add("is-hidden"),_.src=""}D.addEventListener("click",b);k.addEventListener("click",e=>{e.target===k&&b()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!m.classList.contains("is-hidden")&&b()});let v=null;function G(){const e=document.querySelector(".catalog-hero-title"),r=document.querySelector(".catalog-hero-overview"),o=document.querySelector(".catalog-hero-btn.trailer"),c=document.querySelector(".catalog-hero-btn.details"),t=document.querySelector(".catalog-hero");if(!t||!e||!r){console.warn("Catalog Hero için gerekli DOM öğeleri bulunamadı.");return}async function n(){try{const l=(await L()).results,s=l[Math.floor(Math.random()*l.length)];v=s.id;const d=`https://image.tmdb.org/t/p/original${s.backdrop_path||s.poster_path}`;t.style.backgroundImage=`url(${d})`,e.textContent=s.title||s.name||"Untitled",r.textContent=s.overview||"No description available"}catch(a){console.error("Error loading hero section:",a)}}async function i(){if(v)try{const s=(await N(v)).results.find(u=>u.type==="Trailer"&&u.site==="YouTube");s?H(s.key):alert("No trailer available.")}catch(a){console.error("Trailer error:",a)}}o&&o.addEventListener("click",i),c&&c.addEventListener("click",()=>{alert("More details tıklanıldı!")}),n()}function j(){const e=document.querySelector("#open-team-modal"),r=document.querySelector(".modal-overlay"),o=document.querySelector(".modal-close"),c=document.querySelector(".slider-track"),t=document.querySelector(".slider-btn.prev"),n=document.querySelector(".slider-btn.next"),i=document.querySelectorAll(".team-card");if(!e||!r||!o){console.warn("Footer modal için gerekli öğeler bulunamadı.");return}let a=0;function l(){const d=-a*100;c&&(c.style.transform=`translateX(${d}%)`)}function s(){r.classList.add("active"),o.focus(),document.body.style.overflow="hidden",l()}function u(){r.classList.remove("active"),e.focus(),document.body.style.overflow=""}e.addEventListener("click",d=>{d.preventDefault(),s()}),o.addEventListener("click",u),window.addEventListener("click",d=>{d.target===r&&u()}),document.addEventListener("keydown",d=>{d.key==="Escape"&&u()}),t&&n&&i.length>0&&(t.addEventListener("click",()=>{a=(a-1+i.length)%i.length,l()}),n.addEventListener("click",()=>{a=(a+1)%i.length,l()}))}async function F(){const e=document.querySelector(".library-hero-bg");if(e)try{const o=(await L())?.results;if(!o||o.length===0)return;const t=o[Math.floor(Math.random()*o.length)]?.backdrop_path;if(t){const n=`https://image.tmdb.org/t/p/w1920${t}`;e.style.backgroundImage=`url('${n}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"}}catch(r){console.error("Hero görseli yüklenemedi:",r)}}F();document.addEventListener("DOMContentLoaded",()=>{document.getElementById("upcoming")&&M()});async function J(){const e=document.querySelectorAll("load");for(const r of e){const o=r.getAttribute("src");if(o)try{const c=await fetch(o);if(c.ok){const t=await c.text(),n=document.createElement("div");n.innerHTML=t,r.replaceWith(n)}else console.error("Partial yüklenemedi:",o)}catch(c){console.error("Yükleme hatası:",c)}}}J().then(async()=>{try{if(document.querySelector(".catalog-hero")&&G(),document.getElementById("catalog")){const{initCatalog:t}=await A(async()=>{const{initCatalog:n}=await import("./catalog-9JliTZs2.js");return{initCatalog:n}},__vite__mapDeps([0,1,2]));typeof t=="function"&&t()}document.getElementById("upcoming")&&M(),document.getElementById("footer")&&j()}catch(e){console.error("Bölümler başlatılırken hata oluştu:",e)}});export{Y as a,z as f,W as s};
//# sourceMappingURL=main-tHCI4F-E.js.map
