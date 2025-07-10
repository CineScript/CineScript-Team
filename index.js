import{a as M,b as B,c as k,d as C,e as _}from"./assets/catalog-TEuqKUeD.js";import{b as g}from"./assets/vendor-PRc6rJ_y.js";import"./assets/main-50_Jrf0L.js";function x(o){document.querySelectorAll(".basicLightbox").forEach(e=>e.remove());const t=g.create(o);t.show();const n=t.element();n.addEventListener("click",e=>{e.target===n&&t.close()},{once:!0})}async function T(){const o=document.getElementById("hero1"),t=document.getElementById("hero2");try{const e=(await M()).results[0],i=await B(e.id);if(i.results.some(r=>r.type==="Trailer"&&r.site==="YouTube")&&e.backdrop_path){t.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${e.backdrop_path})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.style.backgroundRepeat="no-repeat",o.style.display="none",t.style.display="block",t.querySelector(".hero2-title").textContent=e.title,t.querySelector(".hero2-description").textContent=e.overview||"No description available.";const r=e.vote_average,c=Math.floor(r/2),u=r%2>=1?1:0,m=5-c-u,d=t.querySelector(".hero2-stars");d.innerHTML="";for(let s=0;s<c;s++){const a=document.createElement("img");a.src="./svg/star.svg",a.alt="full star",a.classList.add("star-icon"),d.appendChild(a)}if(u){const s=document.createElement("img");s.src="./svg/star-half.svg",s.alt="half star",s.classList.add("star-icon"),d.appendChild(s)}for(let s=0;s<m;s++){const a=document.createElement("img");a.src="./svg/star-outline.svg",a.alt="empty star",a.classList.add("star-icon"),d.appendChild(a)}const h=document.getElementById("watch-trailer-btn");h&&h.addEventListener("click",async()=>{try{const s=i.results.find(a=>a.type==="Trailer"&&a.site==="YouTube");if(s){const a=s.key;x(`
                <div class="popup-video-wrapper">
                  <iframe
                    width="800"
                    height="450"
                    src="https://www.youtube.com/embed/${a}?autoplay=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              `)}}catch(s){console.error("Video açılırken hata:",s)}});const w=t.querySelector("#more-details-btn");w&&w.addEventListener("click",async()=>{try{const a=(await k()).genres.reduce((p,v)=>(p[v.id]=v.name,p),{}),L=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",E=e.genre_ids.map(p=>a[p]).join(", ");g.create(`
              <div class="movie-modal">
                <button class="popup-close-btn" aria-label="Close">
                  <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                    <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </button>

                <img src="${L}" class="modal-poster" alt="${e.title}">
                <div class="modal-details">
                  <h2>${e.title}</h2>
                  <p><strong>Vote / Votes:</strong> ${e.vote_average} / ${e.vote_count}</p>
                  <p><strong>Popularity:</strong> ${e.popularity}</p>
                  <p><strong>Genre:</strong> ${E}</p>
                  <h3>ABOUT</h3>
                  <p>${e.overview}</p>
                  <button class="add-to-library">Add to Library</button>
                </div>
              </div>
              `,{onShow:p=>{p.element().querySelector(".popup-close-btn").addEventListener("click",()=>p.close())}}).show()}catch(s){console.error("Detay popup gösterilemedi:",s)}})}else o.style.display="block",t.style.display="none"}catch(n){console.error("Hata oluştu:",n),o.style.display="block",t.style.display="none"}}document.addEventListener("DOMContentLoaded",()=>{T();const o=document.querySelector("#hero1 .hero-button");o&&o.addEventListener("click",()=>{const e=`
        <div class="popup-wrapper">
          <button class="popup-close-btn" aria-label="Close">
            <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
              <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
          <p class="popup-text">
            OOPS...<br>
            We are very sorry!<br>
            But we couldn’t find the trailer.
          </p>
          <img src="${document.documentElement.getAttribute("data-theme")==="dark"?"./img/camera-dark.png":"./img/camera-light.png"}" alt="Camera icon" class="popup-img" />
        </div>
      `;g.create(e,{onShow:l=>{l.element().querySelector(".popup-close-btn").addEventListener("click",()=>l.close())}}).show()})});const b=document.querySelector(".weekly-gallery"),I=document.querySelector(".weekly-see-all");let f=[],y=!1;function S(){const o=window.innerWidth;return o<768?1:(o<1280,3)}function q(o){const t=Math.floor(o/2),n=o%2>=1,e=5-t-(n?1:0),i=[];for(let l=0;l<t;l++)i.push('<img src="./public/svg/star.svg" alt="star" />');n&&i.push('<img src="./public/svg/star-half.svg" alt="half star" />');for(let l=0;l<e;l++)i.push('<img src="./public/svg/star-outline.svg" alt="empty star" />');return i.join("")}async function $(o=S()){try{const[t,n]=await Promise.all([_(),k()]);f=t.results;const e=n.genres.reduce((r,c)=>(r[c.id]=c.name,r),{}),l=f.slice(0,o).map(r=>{const c=r.poster_path?`https://image.tmdb.org/t/p/w500${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",u=r.genre_ids.map(h=>e[h]).slice(0,1).join(", "),m=r.release_date?r.release_date.slice(0,4):"N/A",d=q(r.vote_average);return`
        <li class="weekly-card" data-id="${r.id}">
          <div class="poster-wrapper">
            <img class="card-img" src="${c}" alt="${r.title}" />
            <div class="card-overlay">
              <h3 class="card-title">${r.title.toUpperCase()}</h3>
              <p class="card-info">${u} | ${m}</p>
              <div class="card-rating">${d}</div>
            </div>
          </div>
        </li>
        `}).join("");b.innerHTML=l}catch(t){console.error("Weekly trends fetch error:",t),b.innerHTML="<p>Veriler alınamadı.</p>"}}I.addEventListener("click",()=>{y=!y;const o=y?f.length:S();$(o)});b.addEventListener("click",async o=>{const t=o.target.closest(".weekly-card");if(!t)return;const n=t.dataset.id;try{const e=await C(n),i=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",l=e.genres.map(c=>c.name).join(", ");g.create(`
        <div class="movie-modal">
    <button class="popup-close-btn" aria-label="Close">
      <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
        <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>

    <img src="${i}" class="modal-poster" alt="${e.title}">
    <div class="modal-details">
      <h2>${e.title}</h2>
      <p><strong>Vote / Votes:</strong> ${e.vote_average} / ${e.vote_count}</p>
      <p><strong>Popularity:</strong> ${e.popularity}</p>
      <p><strong>Genre:</strong> ${l}</p>
      <h3>ABOUT</h3>
      <p>${e.overview}</p>
      <button class="add-to-library">Add to Library</button>
    </div>
  </div>
    `,{onShow:c=>{c.element().querySelector(".popup-close-btn").addEventListener("click",()=>c.close())}}).show()}catch(e){console.error("Popup açılırken hata:",e)}});$();
//# sourceMappingURL=index.js.map
