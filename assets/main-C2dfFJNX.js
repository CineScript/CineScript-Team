import{i as l}from"./vendor-BeQK5vsN.js";import{f,a as v,b as L,i as S}from"./catalog-CoWjYRF-.js";async function w(){const e=document.querySelector(".library-hero-bg");if(e)try{const t=(await f())?.results;if(!t||t.length===0)return;const n=t[Math.floor(Math.random()*t.length)]?.backdrop_path;if(n){const s=`https://image.tmdb.org/t/p/w1920${n}`;e.style.backgroundImage=`url('${s}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"}}catch(o){console.error("Hero görseli yüklenemedi:",o)}}let M=1,c=[];function p(e){return Math.round(e*10)/10}function k(e){return(JSON.parse(localStorage.getItem("myLibrary"))||[]).some(t=>t.id===e)}function E(e,o){let t=JSON.parse(localStorage.getItem("myLibrary"))||[];t.find(n=>n.id===e.id)?(t=t.filter(n=>n.id!==e.id),o.textContent="Add to my library",l.info({message:"Removed from My Library",position:"topRight"})):(t.push(e),o.textContent="Remove from my library",l.success({message:"Added to My Library",position:"topRight"})),localStorage.setItem("myLibrary",JSON.stringify(t))}function T(e,o){const t=new Date(e.release_date).toLocaleDateString();return`
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
                <span class="date">${t}</span>
              </div>
              <div>
                <span>Vote / Votes</span>
                <span class="vote">
                  <span class="vote-average">${p(e.vote_average)}</span> /
                  <span class="vote-count">${e.vote_count}</span>
                </span>
              </div>
            </div>
            <div class="result-right">
              <div>
                <span>Popularity</span>
                <span class="popularity">${p(e.popularity)}</span>
              </div>
              <div>
                <span>Genre</span>
                <span class="genre">${o}</span>
              </div>
            </div>
          </div>
          <h3 class="upcoming-about-header">About</h3>
          <p class="upcoming-about">${e.overview}</p>
          <button class="btn-primary" id="library-btn">Add to my library</button>
        </div>
      </div>
    </div>
  `}async function h(){const e=document.getElementById("upcoming");try{c.length===0&&(c=(await v(M++)).results.filter(i=>i.backdrop_path&&i.overview));const o=await L(),t={};o.genres.forEach(a=>t[a.id]=a.name);const r=JSON.parse(localStorage.getItem("myLibrary"))||[];let n;for(;c.length>0;){const a=Math.floor(Math.random()*c.length),i=c.splice(a,1)[0];if(!r.some(b=>b.id===i.id)){n=i;break}}if(!n){e.innerHTML='<p style="text-align:center">No more upcoming movies available.</p>',l.warning({message:"No more unique movies to show.",position:"topRight"});return}const s=n.genre_ids.map(a=>t[a]).join(", ");e.innerHTML=T(n,s);const d=document.getElementById("library-btn");k(n.id)&&(d.textContent="Remove from my library"),d.addEventListener("click",()=>E(n,d))}catch(o){console.error("Error loading upcoming movie:",o),l.error({message:"Failed to load upcoming movie",position:"topRight"})}}const m=document.querySelector("#scrollUpBtn"),u=300;window.onscroll=function(){I()};function I(){document.body.scrollTop>u||document.documentElement.scrollTop>u?m.style.display="block":(m.style.display="none",console.log("Scroll up button çalışmadı"))}m.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});w();document.addEventListener("DOMContentLoaded",h);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("upcoming")&&h()});const $=document.querySelectorAll("[data-theme-option]"),y=document.documentElement,g=localStorage.getItem("theme");g&&y.setAttribute("data-theme",g);$.forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-theme-option");y.setAttribute("data-theme",o),localStorage.setItem("theme",o)})});async function A(){const e=document.querySelectorAll("load");for(const o of e){const t=o.getAttribute("src");if(t){const r=await fetch(t);if(r.ok){const n=await r.text(),s=document.createElement("div");s.innerHTML=n,o.replaceWith(s)}else console.error("Partial yüklenemedi:",t)}}}A().then(()=>{S()});
//# sourceMappingURL=main-C2dfFJNX.js.map
