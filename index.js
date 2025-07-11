import{a as I,b as O,c as C,d as A,e as U,g as q}from"./assets/catalog-AJGnDrES.js";import{b as S}from"./assets/vendor-PRc6rJ_y.js";import"./assets/main-CCUjFcIn.js";function T(a,t){let n=JSON.parse(localStorage.getItem("library"))||[];n.includes(a.id)?(n=n.filter(o=>o!==a.id),t.textContent="Add to Library",t.classList.remove("remove-from-library"),t.classList.add("add-to-library")):(n.push(a.id),t.textContent="Remove from my library",t.classList.remove("add-to-library"),t.classList.add("remove-from-library")),localStorage.setItem("library",JSON.stringify(n))}function _(a,t){(JSON.parse(localStorage.getItem("library"))||[]).includes(a.id)?(t.textContent="Remove from my library",t.classList.add("remove-from-library")):(t.textContent="Add to Library",t.classList.add("add-to-library"))}function N(a){document.querySelectorAll(".basicLightbox").forEach(r=>r.remove());const t=S.create(a);t.show();const n=t.element();n.addEventListener("click",r=>{r.target===n&&t.close()},{once:!0})}async function H(){const a=document.getElementById("hero1"),t=document.getElementById("hero2");try{const n=await I(),r=Math.floor(Math.random()*n.results.length),o=n.results[r],u=await O(o.id);if(u.results.some(d=>d.type==="Trailer"&&d.site==="YouTube")&&o.backdrop_path){t.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${o.backdrop_path})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.style.backgroundRepeat="no-repeat",a.style.display="none",t.style.display="block",t.querySelector(".hero2-title").textContent=o.title,t.querySelector(".hero2-description").textContent=o.overview||"No description available.";const d=o.vote_average,f=Math.floor(d/2),e=d%2>=1?1:0,s=5-f-e,c=t.querySelector(".hero2-stars");c.innerHTML="";for(let i=0;i<f;i++){const l=document.createElement("img");l.src="./svg/star.svg",l.alt="full star",l.classList.add("star-icon"),c.appendChild(l)}if(e){const i=document.createElement("img");i.src="./svg/star-half.svg",i.alt="half star",i.classList.add("star-icon"),c.appendChild(i)}for(let i=0;i<s;i++){const l=document.createElement("img");l.src="./svg/star-outline.svg",l.alt="empty star",l.classList.add("star-icon"),c.appendChild(l)}const m=document.getElementById("watch-trailer-btn");m&&m.addEventListener("click",async()=>{try{const i=u.results.find(l=>l.type==="Trailer"&&l.site==="YouTube");if(i){const l=i.key;N(`
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
              `)}}catch(i){console.error("Video açılırken hata:",i)}});const y=t.querySelector("#more-details-btn");y&&y.addEventListener("click",async()=>{try{const l=(await C()).genres.reduce((p,w)=>(p[w.id]=w.name,p),{}),h=o.poster_path?`https://image.tmdb.org/t/p/w500${o.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",b=o.genre_ids.map(p=>l[p]).join(", ");S.create(`
              <div class="movie-modal">
                <button class="popup-close-btn" aria-label="Close">
                  <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                    <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </button>

                <img src="${h}" class="modal-poster" alt="${o.title}">
                <div class="modal-details">
                  <h2>${o.title}</h2>
                  <p><strong>Vote / Votes:</strong> ${o.vote_average} / ${o.vote_count}</p>
                  <p><strong>Popularity:</strong> ${o.popularity}</p>
                  <p><strong>Genre:</strong> ${b}</p>
                  <h3>ABOUT</h3>
                  <p>${o.overview}</p>
                  <button class="add-to-library">Add to Library</button>
                </div>
              </div>
              `,{onShow:p=>{p.element().querySelector(".popup-close-btn").addEventListener("click",()=>p.close());const L=p.element().querySelector(".add-to-library");_(o,L),L.addEventListener("click",()=>{T(o,L)})}}).show()}catch(i){console.error("Detay popup gösterilemedi:",i)}})}else a.style.display="block",t.style.display="none"}catch(n){console.error("Hata oluştu:",n),a.style.display="block",t.style.display="none"}}document.addEventListener("DOMContentLoaded",()=>{H();const a=document.querySelector("#hero1 .hero-button");a&&a.addEventListener("click",()=>{const r=`
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
      `;S.create(r,{onShow:u=>{u.element().querySelector(".popup-close-btn").addEventListener("click",()=>u.close())}}).show()})});const $=document.querySelector(".weekly-gallery"),P=document.querySelector(".weekly-see-all");let x=[],M=!1;function B(){const a=window.innerWidth;return a<768?1:(a<1280,3)}function V(a){const t=Math.floor(a/2),n=a%2>=1,r=5-t-(n?1:0),o=[];for(let u=0;u<t;u++)o.push('<img src="./svg/star.svg" alt="star" />');n&&o.push('<img src="./svg/star-half.svg" alt="half star" />');for(let u=0;u<r;u++)o.push('<img src="./svg/star-outline.svg" alt="empty star" />');return o.join("")}async function D(a=B()){try{const[t,n]=await Promise.all([U(),C()]);x=t.results;const r=n.genres.reduce((g,d)=>(g[d.id]=d.name,g),{}),u=x.slice(0,a).map(g=>{const d=g.poster_path?`https://image.tmdb.org/t/p/w500${g.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",f=g.genre_ids.map(c=>r[c]).slice(0,1).join(", "),e=g.release_date?g.release_date.slice(0,4):"N/A",s=V(g.vote_average);return`
        <li class="weekly-card" data-id="${g.id}">
          <div class="poster-wrapper">
            <img class="card-img" src="${d}" alt="${g.title}" />
            <div class="card-overlay">
              <h3 class="card-title">${g.title.toUpperCase()}</h3>
              <p class="card-info">${f} | ${e}</p>
              <div class="card-rating">${s}</div>
            </div>
          </div>
        </li>
        `}).join("");$.innerHTML=u}catch(t){console.error("Weekly trends fetch error:",t),$.innerHTML="<p>Veriler alınamadı.</p>"}}P.addEventListener("click",()=>{M=!M;const a=M?x.length:B();D(a)});$.addEventListener("click",async a=>{const t=a.target.closest(".weekly-card");if(!t)return;const n=t.dataset.id;try{const r=await A(n),o=r.poster_path?`https://image.tmdb.org/t/p/w500${r.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",u=r.genres.map(d=>d.name).join(", ");S.create(`
      <div class="movie-modal">
        <button class="popup-close-btn" aria-label="Close">
          <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
            <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>

        <img src="${o}" class="modal-poster" alt="${r.title}">
        <div class="modal-details">
          <h2>${r.title}</h2>
          <p><strong>Vote / Votes:</strong> ${r.vote_average} / ${r.vote_count}</p>
          <p><strong>Popularity:</strong> ${r.popularity}</p>
          <p><strong>Genre:</strong> ${u}</p>
          <h3>ABOUT</h3>
          <p>${r.overview}</p>
          <button class="add-to-library">Add to Library</button>
        </div>
      </div>
      `,{onShow:d=>{d.element().querySelector(".popup-close-btn").addEventListener("click",()=>d.close());const e=d.element().querySelector(".add-to-library");_(r,e),e.addEventListener("click",()=>{T(r,e)})}}).show()}catch(r){console.error("Popup açılırken hata:",r)}});D();const k=document.querySelector(".upcoming-container");document.addEventListener("DOMContentLoaded",async()=>{let a=new Map;async function t(){try{const e=await C();e&&e.genres&&e.genres.forEach(s=>{a.set(s.id,s.name)})}catch(e){console.error("Türler çekilirken bir hata oluştu:",e)}}function n(e){return!e||e.length===0?"Unknown":e.map(s=>a.get(s)||"Unknown").join(", ")}function r(){const e=localStorage.getItem("library");return e?JSON.parse(e):[]}function o(e){localStorage.setItem("library",JSON.stringify(e))}function u(e,s){let c=r();const m=e.id;c.includes(m)?(c=c.filter(y=>y!==m),s.textContent="Add to my library",s.classList.remove("removed")):(c.push(m),s.textContent="Remove from my library",s.classList.add("removed")),o(c)}function g(e,s){r().includes(e.id)?(s.textContent="Remove from my library",s.classList.add("removed")):(s.textContent="Add to my library",s.classList.remove("removed"))}async function d(){await t();const e=new Date,s=e.getFullYear(),c=e.getMonth(),y=new Date(s,c,1).toISOString().split("T")[0],l=new Date(s,c+1,0).toISOString().split("T")[0];try{const h=await q(y,l);if(h&&h.results&&h.results.length>0){const b=h.results.filter(v=>{const p=new Date(v.release_date);return p.getFullYear()===s&&p.getMonth()===c});if(b.length>0){const v=Math.floor(Math.random()*b.length),p=b[v];f(p)}else k.innerHTML="<p>No movie released this month.</p>"}else k.innerHTML="<p>No upcoming movies found.</p>"}catch(h){console.error("Yaklaşan filmler çekilirken bir hata oluştu:",h),k.innerHTML="<p>There was an error loading movies. Please try again later.</p>"}}function f(e){k.innerHTML="";const s=document.createElement("div");s.classList.add("upcoming-item");const c=e.poster_path?`https://image.tmdb.org/t/p/w1280${e.poster_path}`:"https://via.placeholder.com/150x225?text=Poster+Yok",m=e.release_date;let y="Unknown";if(m){const p=new Date(m),w=String(p.getDate()).padStart(2,"0"),L=String(p.getMonth()+1).padStart(2,"0"),E=p.getFullYear();y=`${w}.${L}.${E}`}const i=e.vote_average?e.vote_average.toFixed(2):"Unknown",l=e.popularity?e.popularity.toFixed(2):"Unknown",h=e.overview||"There is no information about this movie.",b=n(e.genre_ids);s.innerHTML=`
      <div class="poster-container">
        <img src="${c}" alt="${e.title||e.original_title||"Movie Poster"}">
      </div>
      <div class="movie-details">
        <h3>${e.title||e.original_title}</h3>
        <div class="movie-details-info">
         <p>Release date: <span class="release-date-text">${y}</span></p>

         <p>Vote / Votes: <span class ="vote-text">${i}</span> / <span class="vote-text">10</span></p>
         <p>Popularity: ${l}</p>
         <p>Genre: ${b}</p>
        </div>
        <p class="about-text">ABOUT ${h}</p>
        <button class="add-to-library-btn" data-movie-id="${e.id}">Add to my library</button>
      </div>
    `;const v=s.querySelector(".add-to-library-btn");g(e,v),v.addEventListener("click",p=>{u(e,v)}),k.appendChild(s)}d()});
//# sourceMappingURL=index.js.map
