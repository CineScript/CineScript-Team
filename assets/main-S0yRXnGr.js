async function a(){const n=document.querySelectorAll("load");for(const t of n){const e=t.getAttribute("src");if(e){const o=await fetch(e);if(o.ok){const r=await o.text(),c=document.createElement("div");c.innerHTML=r,t.replaceWith(c)}else console.error("Partial yüklenemedi:",e)}}}a().then(()=>{});
//# sourceMappingURL=main-S0yRXnGr.js.map
