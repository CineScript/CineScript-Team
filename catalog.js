import{f as m,c as u}from"./assets/catalog-B6Hq6ooe.js";import"./assets/scroll-up-Clndop_d.js";const r=document.createElement("div");r.classList.add("trailer-modal","is-hidden");r.innerHTML=`
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
`;document.body.appendChild(r);const h=r.querySelector(".trailer-modal-close"),i=r.querySelector(".trailer-modal-backdrop"),d=r.querySelector("#trailer-video");function y(e){d.src=`https://www.youtube.com/embed/${e}?autoplay=1`,r.classList.remove("is-hidden")}function n(){r.classList.add("is-hidden"),d.src=""}h.addEventListener("click",n);i.addEventListener("click",e=>{e.target===i&&n()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!r.classList.contains("is-hidden")&&n()});const v=document.querySelector(".catalog-hero-title"),f=document.querySelector(".catalog-hero-overview"),b=document.querySelector(".catalog-hero-btn.trailer"),k=document.querySelector(".catalog-hero-btn.details"),c=document.querySelector(".catalog-hero");let l=null;async function p(){try{const a=(await m()).results;if(!a||a.length===0){console.error("Trend filmler bulunamadı.");return}const t=a[Math.floor(Math.random()*a.length)];l=t.id;const o=t.backdrop_path||t.poster_path;if(o){const s=`https://image.tmdb.org/t/p/original${o}`;c.style.backgroundImage=`url(${s})`}else c.style.backgroundColor="#000";v.textContent=t.title||t.name||"Film adı yok",f.textContent=t.overview||"Açıklama bulunamadı."}catch(e){console.error("Hero bölümü yüklenirken hata:",e)}}async function g(){if(l)try{const a=(await u(l)).results;if(!a||a.length===0){alert("Bu film için video bulunamadı.");return}const t=a.find(o=>o.type==="Trailer"&&o.site==="YouTube");t?y(t.key):alert("Fragman bulunamadı.")}catch(e){console.error("Fragman yüklenirken hata:",e)}}b.addEventListener("click",g);k.addEventListener("click",()=>{alert("More details tıklandı!")});p();
//# sourceMappingURL=catalog.js.map
