import{f as s,c as u}from"./assets/catalog-DVR3zbdn.js";import"./assets/scroll-up-Clndop_d.js";const o=document.createElement("div");o.classList.add("trailer-modal","is-hidden");o.innerHTML=`
  <div class="trailer-modal-backdrop">
    <div class="trailer-modal-content">
      <button class="trailer-modal-close" aria-label="Close modal">&times;</button>
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
`;document.body.appendChild(o);const m=o.querySelector(".trailer-modal-close"),c=o.querySelector(".trailer-modal-backdrop"),d=o.querySelector("#trailer-video");function h(e){d.src=`https://www.youtube.com/embed/${e}?autoplay=1`,o.classList.remove("is-hidden")}function l(){o.classList.add("is-hidden"),d.src=""}m.addEventListener("click",l);c.addEventListener("click",e=>{e.target===c&&l()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!o.classList.contains("is-hidden")&&l()});const f=document.querySelector(".catalog-hero"),v=document.querySelector(".catalog-hero-title"),y=document.querySelector(".catalog-hero-overview"),p=document.querySelector(".catalog-hero-rating"),g=document.querySelector(".catalog-hero-btn.trailer"),b=document.querySelector(".catalog-hero-btn.details");let a=null;async function k(){try{const r=(await s()).results;if(!r||r.length===0)return;const t=r[Math.floor(Math.random()*r.length)];a=t.id;const i=t.backdrop_path||t.poster_path,n=i?`https://image.tmdb.org/t/p/original${i}`:"";n&&(f.style.backgroundImage=`url(${n})`),v.textContent=t.title||t.name||"No title",y.textContent=t.overview||"No description available",p.innerHTML=S(t.vote_average)}catch(e){console.error("Hero verisi alınamadı:",e)}}function S(e){const r=Math.floor(e/2),t=e%2>=1?"½":"";return"★".repeat(r)+(t?"★":"")+"☆".repeat(5-r-(t?1:0))}async function w(){if(a)try{const r=(await u(a)).results.find(t=>t.type==="Trailer"&&t.site==="YouTube");r?h(r.key):alert("Trailer not found.")}catch(e){console.error("Trailer yüklenemedi:",e)}}g.addEventListener("click",w);b.addEventListener("click",()=>{alert("More details clicked!")});k();
//# sourceMappingURL=catalog.js.map
