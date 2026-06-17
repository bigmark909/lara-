(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new class{constructor(){this.canvas=document.getElementById(`confetti-canvas`),this.canvas||(this.canvas=document.createElement(`canvas`),this.canvas.id=`confetti-canvas`,document.body.appendChild(this.canvas)),this.ctx=this.canvas.getContext(`2d`),this.particles=[],this.animationId=null,this.resize(),window.addEventListener(`resize`,()=>this.resize())}resize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}fire(e={}){let t=e.count||80,n=e.colors||[`#2563EB`,`#1B2D54`,`#DC2626`,`#F59E0B`,`#10B981`,`#ffffff`],r=e.x||this.canvas.width/2,i=e.y||this.canvas.height/2;for(let e=0;e<t;e++){let e=Math.random()*Math.PI*2,t=200+Math.random()*400,a=6+Math.random()*10;this.particles.push({x:r,y:i,vx:Math.cos(e)*t,vy:Math.sin(e)*t-200,size:a,color:n[Math.floor(Math.random()*n.length)],rotation:Math.random()*360,rotationSpeed:(Math.random()-.5)*10,opacity:1,shape:Math.random()>.5?`rect`:`circle`})}this.animationId||this.animate()}animate(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);let e=!1;for(let t of this.particles)t.x+=t.vx*.016,t.y+=t.vy*.016,t.vy+=500*.016,t.rotation+=t.rotationSpeed,t.opacity-=.005,!(t.opacity<=0)&&(e=!0,this.ctx.save(),this.ctx.translate(t.x,t.y),this.ctx.rotate(t.rotation*Math.PI/180),this.ctx.globalAlpha=Math.max(0,t.opacity),this.ctx.fillStyle=t.color,t.shape===`rect`?this.ctx.fillRect(-t.size/2,-t.size/4,t.size,t.size/2):(this.ctx.beginPath(),this.ctx.arc(0,0,t.size/2,0,Math.PI*2),this.ctx.fill()),this.ctx.restore());this.particles=this.particles.filter(e=>e.opacity>0),e?this.animationId=requestAnimationFrame(()=>this.animate()):(this.animationId=null,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height))}},t=document.querySelector(`header`);window.addEventListener(`scroll`,()=>{let e=window.scrollY;e>80?t.classList.add(`scrolled`):t.classList.remove(`scrolled`);let n=document.getElementById(`back-to-top`);n&&(e>500?n.classList.add(`show`):n.classList.remove(`show`))});var n=document.querySelector(`.hamburger`),r=document.querySelector(`.nav-links`);n&&(n.addEventListener(`click`,()=>{n.classList.toggle(`active`),r.classList.toggle(`open`),document.body.style.overflow=r.classList.contains(`open`)?`hidden`:``}),r.querySelectorAll(`.nav-link`).forEach(e=>{e.addEventListener(`click`,()=>{n.classList.remove(`active`),r.classList.remove(`open`),document.body.style.overflow=``})}));var i=document.querySelectorAll(`.nav-link`),a=window.location.pathname.split(`/`).pop()||`index.html`;i.forEach(e=>{e.classList.remove(`active`);let t=e.getAttribute(`href`)||``;if((t===a||a===`index.html`&&(t===`index.html`||t===``||t===`./`||t===`/`))&&e.classList.add(`active`),t.startsWith(`#`)&&t.length>1&&t!==`#home`){let n=t.replace(`#`,``)+`.html`;e.setAttribute(`href`,n)}(t===`#home`||t===`#`)&&e.setAttribute(`href`,`index.html`)});var o=document.querySelectorAll(`.animate-on-scroll`),s=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`visible`)})},{threshold:.1,rootMargin:`0px 0px -50px 0px`});o.forEach(e=>s.observe(e)),document.querySelectorAll(`.gallery-item`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.querySelector(`img`),r=t.querySelector(`.gallery-overlay h4`)?.textContent||``,i=document.createElement(`div`);i.className=`lightbox`,i.innerHTML=`
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="${n.src}" alt="${n.alt}">
        ${r?`<p class="lightbox-caption">${r}</p>`:``}
      </div>
    `,i.addEventListener(`click`,e=>{(e.target===i||e.target.classList.contains(`lightbox-close`))&&(i.remove(),document.body.style.overflow=``)}),document.body.appendChild(i),document.body.style.overflow=`hidden`,e.fire({count:30}),requestAnimationFrame(()=>i.classList.add(`active`))})});var c=document.createElement(`style`);c.textContent=`
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 40px;
  }
  .lightbox.active { opacity: 1; }
  .lightbox-content {
    position: relative;
    max-width: 900px;
    width: 100%;
    max-height: 85vh;
  }
  .lightbox-content img {
    width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
  }
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    line-height: 1;
    transition: transform 0.2s;
  }
  .lightbox-close:hover { transform: rotate(90deg); }
  .lightbox-caption {
    color: white;
    text-align: center;
    margin-top: 12px;
    font-size: 1.1rem;
    opacity: 0.8;
  }
`,document.head.appendChild(c);var l=document.getElementById(`contactForm`);l&&l.addEventListener(`submit`,t=>{t.preventDefault();let n={name:document.getElementById(`name`).value,email:document.getElementById(`email`).value,phone:document.getElementById(`phone`).value,service:document.getElementById(`service`).value,message:document.getElementById(`message`).value};if(!n.name||!n.email||!n.message){alert(`Please fill in all required fields (Name, Email, Message).`);return}let r=t.target,i=document.getElementById(`form-success`);r.style.display=`none`,i.classList.add(`show`),e.fire({count:100}),console.log(`Form submitted:`,n)}),document.querySelectorAll(`a[href^="#"]`).forEach(e=>{e.addEventListener(`click`,function(e){e.preventDefault();let t=document.querySelector(this.getAttribute(`href`));t&&t.scrollIntoView({behavior:`smooth`,block:`start`})})});var u=document.getElementById(`back-to-top`);u&&u.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})}),window.addEventListener(`load`,()=>{setTimeout(()=>{e.fire({count:50,colors:[`#2563EB`,`#1B2D54`,`#ffffff`,`#DC2626`]})},1e3)}),document.querySelectorAll(`.confetti-trigger`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.target.getBoundingClientRect();e.fire({count:60,x:n.left+n.width/2,y:n.top+n.height/2})})}),console.log(`Lara & Sons Differentials & 4x4 - Website loaded`);