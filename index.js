import{c as I,d as O,b as C,a as A,e as U,g as q}from"./assets/scroll-up-Dj8EmKK3.js";import{b as M}from"./assets/vendor-PRc6rJ_y.js";import"./assets/main-S0yRXnGr.js";function T(s,t){let n=JSON.parse(localStorage.getItem("library"))||[];n.includes(s.id)?(n=n.filter(a=>a!==s.id),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("add-to-library")):(n.push(s.id),t.textContent="Remove from my library",t.classList.remove("add-to-library"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(n))}function _(s,t){(JSON.parse(localStorage.getItem("library"))||[]).includes(s.id)?(t.textContent="Remove from my library",t.classList.add("remove-from-library")):(t.textContent="Add to Library",t.classList.add("add-to-library"))}function N(s){document.querySelectorAll(".basicLightbox").forEach(o=>o.remove());const t=M.create(s);t.show();const n=t.element();n.addEventListener("click",o=>{o.target===n&&t.close()},{once:!0})}async function H(){const s=document.getElementById("hero1"),t=document.getElementById("hero2");try{const n=await I(),o=Math.floor(Math.random()*n.results.length),a=n.results[o],p=await O(a.id);if(p.results.some(u=>u.type==="Trailer"&&u.site==="YouTube")&&a.backdrop_path){t.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${a.backdrop_path})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.style.backgroundRepeat="no-repeat",s.style.display="none",t.style.display="block",t.querySelector(".hero2-title").textContent=a.title,t.querySelector(".hero2-description").textContent=a.overview||"No description available.";const u=a.vote_average,m=Math.floor(u/2),e=u%2>=1?1:0,r=5-m-e,d=t.querySelector(".hero2-stars");d.innerHTML="";for(let i=0;i<m;i++){const l=document.createElement("img");l.src="./svg/star.svg",l.alt="full star",l.classList.add("star-icon"),d.appendChild(l)}if(e){const i=document.createElement("img");i.src="./svg/star-half.svg",i.alt="half star",i.classList.add("star-icon"),d.appendChild(i)}for(let i=0;i<r;i++){const l=document.createElement("img");l.src="./svg/star-outline.svg",l.alt="empty star",l.classList.add("star-icon"),d.appendChild(l)}const h=document.getElementById("watch-trailer-btn");h&&h.addEventListener("click",async()=>{try{const i=p.results.find(l=>l.type==="Trailer"&&l.site==="YouTube");if(i){const l=i.key;N(`
                <div class="popup-video-wrapper">
                  <iframe
                    width="800"
                    height="450"
                    src="https://www.youtube.com/embed/${l}?autoplay=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              `)}}catch(i){console.error("Video açılırken hata:",i)}});const b=t.querySelector("#more-details-btn");b&&b.addEventListener("click",async()=>{try{let g=function(y){y.key==="Escape"&&(f.close(),window.removeEventListener("keydown",g))};const l=(await C()).genres.reduce((y,L)=>(y[L.id]=L.name,y),{}),v=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",w=a.genre_ids.map(y=>l[y]).join(", "),f=M.create(`
              <div class="movie-modal">
                <button class="popup-close-btn" aria-label="Close">
                  <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                    <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </button>

                <img src="${v}" class="modal-poster" alt="${a.title}">
                <div class="modal-details">
                  <h2>${a.title}</h2>
                  <p><strong>Vote / Votes:</strong> ${a.vote_average} / ${a.vote_count}</p>
                  <p><strong>Popularity:</strong> ${a.popularity}</p>
                  <p><strong>Genre:</strong> ${w}</p>
                  <h3>ABOUT</h3>
                  <p>${a.overview}</p>
                  <button class="add-to-library">Add to Library</button>
                </div>
              </div>
              `,{onShow:y=>{y.element().querySelector(".popup-close-btn").addEventListener("click",()=>y.close());const k=y.element().querySelector(".add-to-library");_(a,k),k.addEventListener("click",()=>{T(a,k)})}});f.show(),window.addEventListener("keydown",g)}catch(i){console.error("Detay popup gösterilemedi:",i)}})}else s.style.display="block",t.style.display="none"}catch(n){console.error("Hata oluştu:",n),s.style.display="block",t.style.display="none"}}document.addEventListener("DOMContentLoaded",()=>{H();const s=document.querySelector("#hero1 .hero-button");s&&s.addEventListener("click",()=>{const o=`
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
      `;M.create(o,{onShow:p=>{p.element().querySelector(".popup-close-btn").addEventListener("click",()=>p.close())}}).show()})});const $=document.querySelector(".weekly-gallery"),P=document.querySelector(".weekly-see-all");let E=[],x=!1;function B(){const s=window.innerWidth;return s<768?1:(s<1280,3)}function V(s){const t=Math.floor(s/2),n=s%2>=1,o=5-t-(n?1:0),a=[];for(let p=0;p<t;p++)a.push('<img src="./svg/star.svg" alt="star" />');n&&a.push('<img src="./svg/star-half.svg" alt="half star" />');for(let p=0;p<o;p++)a.push('<img src="./svg/star-outline.svg" alt="empty star" />');return a.join("")}async function D(s=B()){try{const[t,n]=await Promise.all([U(),C()]);E=t.results;const o=n.genres.reduce((c,u)=>(c[u.id]=u.name,c),{}),p=E.slice(0,s).map(c=>{const u=c.poster_path?`https://image.tmdb.org/t/p/w500${c.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",m=c.genre_ids.map(d=>o[d]).slice(0,1).join(", "),e=c.release_date?c.release_date.slice(0,4):"N/A",r=V(c.vote_average);return`
        <li class="weekly-card" data-id="${c.id}">
          <div class="poster-wrapper">
            <img class="card-img" src="${u}" alt="${c.title}" />
            <div class="card-overlay">
              <h3 class="card-title">${c.title.toUpperCase()}</h3>
              <p class="card-info">${m} | ${e}</p>
              <div class="card-rating">${r}</div>
            </div>
          </div>
        </li>
        `}).join("");$.innerHTML=p}catch(t){console.error("Weekly trends fetch error:",t),$.innerHTML="<p>Veriler alınamadı.</p>"}}P.addEventListener("click",()=>{x=!x;const s=x?E.length:B();D(s)});$.addEventListener("click",async s=>{const t=s.target.closest(".weekly-card");if(!t)return;const n=t.dataset.id;try{let u=function(m){m.key==="Escape"&&(c.close(),window.removeEventListener("keydown",u))};const o=await A(n),a=o.poster_path?`https://image.tmdb.org/t/p/w500${o.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",p=o.genres.map(m=>m.name).join(", "),c=M.create(`
      <div class="movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
            <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>

        <img src="${a}" class="modal-poster" alt="${o.title}">
        <div class="modal-details">
          <h2>${o.title}</h2>
          <p><strong>Vote / Votes:</strong> ${o.vote_average} / ${o.vote_count}</p>
          <p><strong>Popularity:</strong> ${o.popularity}</p>
          <p><strong>Genre:</strong> ${p}</p>
          <h3>ABOUT</h3>
          <p>${o.overview}</p>
          <button class="add-to-library">Add to Library</button>
        </div>
      </div>
      `,{onShow:m=>{m.element().querySelector(".popup-close-btn").addEventListener("click",()=>m.close());const r=m.element().querySelector(".add-to-library");_(o,r),r.addEventListener("click",()=>{T(o,r)})}});c.show(),window.addEventListener("keydown",u)}catch(o){console.error("Popup açılırken hata:",o)}});D();const S=document.querySelector(".upcoming-container");document.addEventListener("DOMContentLoaded",async()=>{let s=new Map;async function t(){try{const e=await C();e&&e.genres&&e.genres.forEach(r=>{s.set(r.id,r.name)})}catch(e){console.error("Türler çekilirken bir hata oluştu:",e)}}function n(e){return!e||e.length===0?"Unknown":e.map(r=>s.get(r)||"Unknown").join(", ")}function o(){const e=localStorage.getItem("library");return e?JSON.parse(e):[]}function a(e){localStorage.setItem("library",JSON.stringify(e))}function p(e,r){let d=o();const h=e.id;d.includes(h)?(d=d.filter(b=>b!==h),r.textContent="Add to my library",r.classList.remove("removed")):(d.push(h),r.textContent="Remove from my library",r.classList.add("removed")),a(d)}function c(e,r){o().includes(e.id)?(r.textContent="Remove from my library",r.classList.add("removed")):(r.textContent="Add to my library",r.classList.remove("removed"))}async function u(){await t();const e=new Date,r=e.getFullYear(),d=e.getMonth(),b=new Date(r,d,1).toISOString().split("T")[0],l=new Date(r,d+1,0).toISOString().split("T")[0];try{const v=await q(b,l);if(v&&v.results&&v.results.length>0){const w=v.results.filter(f=>{const g=new Date(f.release_date);return g.getFullYear()===r&&g.getMonth()===d});if(w.length>0){const f=Math.floor(Math.random()*w.length),g=w[f];m(g)}else S.innerHTML="<p>No movie released this month.</p>"}else S.innerHTML="<p>No upcoming movies found.</p>"}catch(v){console.error("Yaklaşan filmler çekilirken bir hata oluştu:",v),S.innerHTML="<p>There was an error loading movies. Please try again later.</p>"}}function m(e){S.innerHTML="";const r=document.createElement("div");r.classList.add("upcoming-item");const d=e.poster_path?`https://image.tmdb.org/t/p/w1280${e.poster_path}`:"https://via.placeholder.com/150x225?text=Poster+Yok",h=e.release_date;let b="Unknown";if(h){const g=new Date(h),y=String(g.getDate()).padStart(2,"0"),L=String(g.getMonth()+1).padStart(2,"0"),k=g.getFullYear();b=`${y}.${L}.${k}`}const i=e.vote_average?e.vote_average.toFixed(2):"Unknown",l=e.popularity?e.popularity.toFixed(2):"Unknown",v=e.overview||"There is no information about this movie.",w=n(e.genre_ids);r.innerHTML=`
      <div class="poster-container">
        <img src="${d}" alt="${e.title||e.original_title||"Movie Poster"}">
      </div>
      <div class="movie-details">
        <h3 class="movie-title">${e.title||e.original_title}</h3>
        <div class="movie-details-info">
         <p class="details-text">Release date: <span class="release-date-text">${b}</span></p>

         <p class="details-text">Vote / Votes: <span class ="vote-text vote-text-container">${i}</span> / <span class="vote-text">10</span></p>
         <p class="details-text">Popularity: <span class="details-text-info popularity-text">${l}</span></p>
         <p class="details-text">Genre: <span class="details-text-info genre-text">${w}</span></p>
        </div>
        <div class="about-section"> <p class="about-label">ABOUT:</p> <p class="overview-text">${v}</p> </div>
        <button class="add-to-library-btn" data-movie-id="${e.id}">Add to my library</button>
      </div>
    `;const f=r.querySelector(".add-to-library-btn");c(e,f),f.addEventListener("click",g=>{p(e,f)}),S.appendChild(r)}u()});
//# sourceMappingURL=index.js.map
