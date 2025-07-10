import{a as E,b as B,c as $,d as I,e as O,g as U}from"./assets/catalog-DMS-Ny11.js";import{b as k}from"./assets/vendor-PRc6rJ_y.js";import"./assets/main-DvkLlPDN.js";function A(s){document.querySelectorAll(".basicLightbox").forEach(t=>t.remove());const r=k.create(s);r.show();const c=r.element();c.addEventListener("click",t=>{t.target===c&&r.close()},{once:!0})}async function q(){const s=document.getElementById("hero1"),r=document.getElementById("hero2");try{const t=(await E()).results[0],g=await B(t.id);if(g.results.some(n=>n.type==="Trailer"&&n.site==="YouTube")&&t.backdrop_path){r.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${t.backdrop_path})`,r.style.backgroundSize="cover",r.style.backgroundPosition="center",r.style.backgroundRepeat="no-repeat",s.style.display="none",r.style.display="block",r.querySelector(".hero2-title").textContent=t.title,r.querySelector(".hero2-description").textContent=t.overview||"No description available.";const n=t.vote_average,u=Math.floor(n/2),v=n%2>=1?1:0,e=5-u-v,o=r.querySelector(".hero2-stars");o.innerHTML="";for(let a=0;a<u;a++){const l=document.createElement("img");l.src="./svg/star.svg",l.alt="full star",l.classList.add("star-icon"),o.appendChild(l)}if(v){const a=document.createElement("img");a.src="./svg/star-half.svg",a.alt="half star",a.classList.add("star-icon"),o.appendChild(a)}for(let a=0;a<e;a++){const l=document.createElement("img");l.src="./svg/star-outline.svg",l.alt="empty star",l.classList.add("star-icon"),o.appendChild(l)}const i=document.getElementById("watch-trailer-btn");i&&i.addEventListener("click",async()=>{try{const a=g.results.find(l=>l.type==="Trailer"&&l.site==="YouTube");if(a){const l=a.key;A(`
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
              `)}}catch(a){console.error("Video açılırken hata:",a)}});const m=r.querySelector("#more-details-btn");m&&m.addEventListener("click",async()=>{try{const l=(await $()).genres.reduce((d,h)=>(d[h.id]=h.name,d),{}),b=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",y=t.genre_ids.map(d=>l[d]).join(", ");k.create(`
              <div class="movie-modal">
                <button class="popup-close-btn" aria-label="Close">
                  <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                    <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </button>

                <img src="${b}" class="modal-poster" alt="${t.title}">
                <div class="modal-details">
                  <h2>${t.title}</h2>
                  <p><strong>Vote / Votes:</strong> ${t.vote_average} / ${t.vote_count}</p>
                  <p><strong>Popularity:</strong> ${t.popularity}</p>
                  <p><strong>Genre:</strong> ${y}</p>
                  <h3>ABOUT</h3>
                  <p>${t.overview}</p>
                  <button class="add-to-library">Add to Library</button>
                </div>
              </div>
              `,{onShow:d=>{d.element().querySelector(".popup-close-btn").addEventListener("click",()=>d.close())}}).show()}catch(a){console.error("Detay popup gösterilemedi:",a)}})}else s.style.display="block",r.style.display="none"}catch(c){console.error("Hata oluştu:",c),s.style.display="block",r.style.display="none"}}document.addEventListener("DOMContentLoaded",()=>{q();const s=document.querySelector("#hero1 .hero-button");s&&s.addEventListener("click",()=>{const t=`
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
      `;k.create(t,{onShow:p=>{p.element().querySelector(".popup-close-btn").addEventListener("click",()=>p.close())}}).show()})});const M=document.querySelector(".weekly-gallery"),H=document.querySelector(".weekly-see-all");let S=[],L=!1;function x(){const s=window.innerWidth;return s<768?1:(s<1280,3)}function N(s){const r=Math.floor(s/2),c=s%2>=1,t=5-r-(c?1:0),g=[];for(let p=0;p<r;p++)g.push('<img src="./public/svg/star.svg" alt="star" />');c&&g.push('<img src="./public/svg/star-half.svg" alt="half star" />');for(let p=0;p<t;p++)g.push('<img src="./public/svg/star-outline.svg" alt="empty star" />');return g.join("")}async function D(s=x()){try{const[r,c]=await Promise.all([O(),$()]);S=r.results;const t=c.genres.reduce((n,u)=>(n[u.id]=u.name,n),{}),p=S.slice(0,s).map(n=>{const u=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",v=n.genre_ids.map(i=>t[i]).slice(0,1).join(", "),e=n.release_date?n.release_date.slice(0,4):"N/A",o=N(n.vote_average);return`
        <li class="weekly-card" data-id="${n.id}">
          <div class="poster-wrapper">
            <img class="card-img" src="${u}" alt="${n.title}" />
            <div class="card-overlay">
              <h3 class="card-title">${n.title.toUpperCase()}</h3>
              <p class="card-info">${v} | ${e}</p>
              <div class="card-rating">${o}</div>
            </div>
          </div>
        </li>
        `}).join("");M.innerHTML=p}catch(r){console.error("Weekly trends fetch error:",r),M.innerHTML="<p>Veriler alınamadı.</p>"}}H.addEventListener("click",()=>{L=!L;const s=L?S.length:x();D(s)});M.addEventListener("click",async s=>{const r=s.target.closest(".weekly-card");if(!r)return;const c=r.dataset.id;try{const t=await I(c),g=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",p=t.genres.map(u=>u.name).join(", ");k.create(`
        <div class="movie-modal">
    <button class="popup-close-btn" aria-label="Close">
      <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
        <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>

    <img src="${g}" class="modal-poster" alt="${t.title}">
    <div class="modal-details">
      <h2>${t.title}</h2>
      <p><strong>Vote / Votes:</strong> ${t.vote_average} / ${t.vote_count}</p>
      <p><strong>Popularity:</strong> ${t.popularity}</p>
      <p><strong>Genre:</strong> ${p}</p>
      <h3>ABOUT</h3>
      <p>${t.overview}</p>
      <button class="add-to-library">Add to Library</button>
    </div>
  </div>
    `,{onShow:u=>{u.element().querySelector(".popup-close-btn").addEventListener("click",()=>u.close())}}).show()}catch(t){console.error("Popup açılırken hata:",t)}});D();const w=document.querySelector(".upcoming-container");document.addEventListener("DOMContentLoaded",async()=>{let s=new Map;async function r(){try{const e=await $();e&&e.genres&&e.genres.forEach(o=>{s.set(o.id,o.name)})}catch(e){console.error("Türler çekilirken bir hata oluştu:",e)}}function c(e){return!e||e.length===0?"Unknown":e.map(o=>s.get(o)||"Unknown").join(", ")}function t(){const e=localStorage.getItem("library");return e?JSON.parse(e):[]}function g(e){localStorage.setItem("library",JSON.stringify(e))}function p(e,o){let i=t();const m=e.id;i.includes(m)?(i=i.filter(a=>a!==m),o.textContent="Add to my library",o.classList.remove("removed")):(i.push(m),o.textContent="Remove from my library",o.classList.add("removed")),g(i)}function n(e,o){t().includes(e.id)?(o.textContent="Remove from my library",o.classList.add("removed")):(o.textContent="Add to my library",o.classList.remove("removed"))}async function u(){await r();const e=new Date,o=e.getFullYear(),i=e.getMonth(),a=new Date(o,i,1).toISOString().split("T")[0],b=new Date(o,i+1,0).toISOString().split("T")[0];try{const y=await U(a,b);if(y&&y.results&&y.results.length>0){const f=y.results.filter(d=>{const h=new Date(d.release_date);return h.getFullYear()===o&&h.getMonth()===i});if(f.length>0){const d=Math.floor(Math.random()*f.length),h=f[d];v(h)}else w.innerHTML="<p>No movie released this month.</p>"}else w.innerHTML="<p>No upcoming movies found.</p>"}catch(y){console.error("Yaklaşan filmler çekilirken bir hata oluştu:",y),w.innerHTML="<p>There was an error loading movies. Please try again later.</p>"}}function v(e){w.innerHTML="";const o=document.createElement("div");o.classList.add("upcoming-item");const i=e.poster_path?`https://image.tmdb.org/t/p/w1280${e.poster_path}`:"https://via.placeholder.com/150x225?text=Poster+Yok",m=e.release_date;let a="Unknown";if(m){const h=new Date(m),T=String(h.getDate()).padStart(2,"0"),_=String(h.getMonth()+1).padStart(2,"0"),C=h.getFullYear();a=`${T}.${_}.${C}`}const l=e.vote_average?e.vote_average.toFixed(2):"Unknown",b=e.popularity?e.popularity.toFixed(2):"Unknown",y=e.overview||"There is no information about this movie.",f=c(e.genre_ids);o.innerHTML=`
      <div class="poster-container">
        <img src="${i}" alt="${e.title||e.original_title||"Movie Poster"}">
      </div>
      <div class="movie-details">
        <h3>${e.title||e.original_title}</h3>
        <div class="movie-details-info">
         <p>Release date: <span class="release-date-text">${a}</span></p>

         <p>Vote / Votes: <span class ="vote-text">${l}</span> / <span class="vote-text">10</span></p>
         <p>Popularity: ${b}</p>
         <p>Genre: ${f}</p>
        </div>
        <p class="about-text">ABOUT ${y}</p>
        <button class="add-to-library-btn" data-movie-id="${e.id}">Add to my library</button>
      </div>
    `;const d=o.querySelector(".add-to-library-btn");n(e,d),d.addEventListener("click",h=>{p(e,d)}),w.appendChild(o)}u()});
//# sourceMappingURL=index.js.map
