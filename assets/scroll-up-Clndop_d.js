const o=document.querySelector("#scrollUpBtn"),l=300;window.onscroll=function(){n()};function n(){document.body.scrollTop>l||document.documentElement.scrollTop>l?o.style.display="block":o.style.display="none"}o.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=scroll-up-Clndop_d.js.map
