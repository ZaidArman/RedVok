/* ════════════════════════════════════════════════
   REDVOK RESTAURANT main.js  v2.0
   All interactions, animations, cart & menu logic
   ════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════
   1. MENU DATA
══════════════════════════════════════════════ */
const WA_NUM = '923000000000'; // ← Change to real number

const CATS = [
  { id:'all',       label:'All' },
  { id:'pizza',     label:'Pizza' },
  { id:'burger',    label:'Burger' },
  { id:'bbq',       label:'BBQ' },
  { id:'karahi',    label:'Karahi' },
  { id:'wings',     label:'Wings' },
  { id:'appetizer', label:'Appetizer' },
  { id:'extra',     label:'Extras' },
  { id:'coffee',    label:'Coffee & Tea' },
  { id:'salad',     label:'Salad' },
];

const PIZZA_PRICES = { small:450, medium:850, large:1200 };

const ITEMS = [
  /* PIZZA */
  { id:'p1',  cat:'pizza',  name:'Red Vok Special Pizza',
    desc:'Our signature pizza loaded with premium house-special toppings a legend since day one.',
    prices:PIZZA_PRICES, spicy:true,
    img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=75' },
  { id:'p2',  cat:'pizza',  name:'Arabic Pizza',
    desc:'Middle-Eastern inspired with aromatic ground spices, lamb, and roasted vegetables.',
    prices:PIZZA_PRICES,
    img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=75' },
  { id:'p3',  cat:'pizza',  name:'Calzone Pizza',
    desc:'Oven-baked folded dough pocket stuffed with molten cheese and seasoned chicken.',
    prices:PIZZA_PRICES,
    img:'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=75' },
  { id:'p4',  cat:'pizza',  name:'Chicken Fajita Pizza',
    desc:'Sizzling fajita-spiced chicken, coloured peppers, and caramelised onions on a smoky base.',
    prices:PIZZA_PRICES, spicy:true,
    img:'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&q=75' },
  { id:'p5',  cat:'pizza',  name:'Crunchy Pizza',
    desc:'Extra-crispy thin crust topped with crunchy coated chicken pieces and fresh garden veg.',
    prices:PIZZA_PRICES,
    img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=75' },
  { id:'p6',  cat:'pizza',  name:'BBQ Pizza',
    desc:'Smoky BBQ sauce base with juicy grilled chicken strips and caramelised onions.',
    prices:PIZZA_PRICES,
    img:'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&q=75' },
  { id:'p7',  cat:'pizza',  name:'Italian Pizza',
    desc:'Classic Neapolitan san marzano base, fresh mozzarella, and torn basil.',
    prices:PIZZA_PRICES,
    img:'https://images.unsplash.com/photo-1548369937-47519962c11a?w=500&q=75' },
  { id:'p8',  cat:'pizza',  name:'Hot & Spicy Pizza',
    desc:'Jalapeños, dried chilli flakes, and fiery red sauce. Not for the faint-hearted.',
    prices:PIZZA_PRICES, spicy:true,
    img:'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&q=75' },
  { id:'p9',  cat:'pizza',  name:'Chicken Tikka Pizza',
    desc:'Pakistani-fusion classic: charcoal-marinated tikka chunks on a spiced tomato base.',
    prices:PIZZA_PRICES, spicy:true,
    img:'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=75' },
  { id:'p10', cat:'pizza',  name:'4 Season Pizza',
    desc:'Four distinct sections, four flavour journeys one pizza for every mood.',
    prices:PIZZA_PRICES,
    img:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=75' },

  /* BURGER */
  { id:'b1', cat:'burger', name:'Red Vok Special Burger',
    desc:'Double smashed patty, secret house sauce, crispy lettuce, pickles the benchmark.',
    price:550, spicy:false,
    img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=75' },
  { id:'b2', cat:'burger', name:'Mexican Burger',
    desc:'Spiced beef patty with jalapeños, guacamole, and smoky chipotle salsa.',
    price:450, spicy:true,
    img:'https://images.unsplash.com/photo-1586816001966-79b736744398?w=500&q=75' },
  { id:'b3', cat:'burger', name:'Grilled Chicken Burger',
    desc:'Juicy grilled breast fillet with shredded lettuce, ripe tomato, and garlic mayo.',
    price:400,
    img:'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?w=500&q=75' },
  { id:'b4', cat:'burger', name:'Zinger Cheese Burger',
    desc:'Crispy fried chicken fillet stacked with melted cheddar and signature zinger sauce.',
    price:350,
    img:'https://images.unsplash.com/photo-1552522406-2b6c7e750ae2?w=500&q=75' },
  { id:'b5', cat:'burger', name:'Mushroom Patty Burger',
    desc:'Juicy beef patty with sautéed mushrooms, Swiss cheese, and truffle mayo.',
    price:450,
    img:'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=75' },
  { id:'b6', cat:'burger', name:'Smoked Tikka Burger',
    desc:'Desi fusion tikka-marinated chicken fillet with mint chutney and crispy fried onions.',
    price:420, spicy:true,
    img:'https://images.unsplash.com/photo-1624914530220-35b3c6c51e0d?w=500&q=75' },
  { id:'b7', cat:'burger', name:'Zinger Burger',
    desc:'The classic: crispy zinger fillet with shredded cabbage slaw and zinger mayo.',
    price:320,
    img:'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=75' },
  { id:'b8', cat:'burger', name:'Tower Burger',
    desc:'Three glorious layers chicken, beef, and extra cheese stacked sky-high.',
    price:650,
    img:'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=500&q=75' },

  /* APPETIZER */
  { id:'a1', cat:'appetizer', name:'Nachos',
    desc:'Golden tortilla chips with warm cheese sauce, jalapeños, and house salsa.',
    price:350,
    img:'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&q=75' },
  { id:'a2', cat:'appetizer', name:'Chicken Strips 6pcs',
    desc:'Tender crispy-coated chicken strips served with a choice of dipping sauce.',
    price:330,
    img:'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=500&q=75' },
  { id:'a3', cat:'appetizer', name:'Nuggets',
    desc:'Bite-sized golden chicken nuggets crispy outside, impossibly juicy inside.',
    price:350,
    img:'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=500&q=75' },

  /* WINGS */
  { id:'w1', cat:'wings', name:'Red Vok Special Wings 6pcs',
    desc:'Our signature wings in the RedVok spice blend bold, crispy, and dangerously addictive.',
    price:500, spicy:true,
    img:'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&q=75' },
  { id:'w2', cat:'wings', name:'BBQ Wings',
    desc:'Slow-cooked wings glazed in a deep, sticky smoky BBQ sauce.',
    price:500,
    img:'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&q=75' },
  { id:'w3', cat:'wings', name:'Zinger Wings',
    desc:'Crispy wings dusted in zinger seasoning heat-forward and deeply satisfying.',
    price:450, spicy:true,
    img:'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500&q=75' },
  { id:'w4', cat:'wings', name:'Chicken Legs 4pcs',
    desc:'Full chicken legs marinated overnight and fried golden to succulent perfection.',
    price:600,
    img:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=75' },

  /* BBQ */
  { id:'bbq1', cat:'bbq', name:'Beef Tikka Boti',
    desc:'Tender cubes of premium beef, marinated in spices, charcoal-grilled to perfection.',
    price:750, spicy:true,
    img:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=75' },
  { id:'bbq2', cat:'bbq', name:'Beef Seekh Kabab',
    desc:'Minced beef seekh kababs packed with herbs and spices, grilled until smoky and juicy.',
    price:700, spicy:true,
    img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=75' },
  { id:'bbq3', cat:'bbq', name:'Mutton Tikka',
    desc:'Bone-in mutton tikka bold flavour, soft texture, unmistakable smoky finish.',
    price:800, spicy:true,
    img:'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&q=75' },
  { id:'bbq4', cat:'bbq', name:'Pata Tikka',
    desc:'Slow-grilled chicken legs with a fiery pata-style marinade, charcoal-kissed.',
    price:650, spicy:true,
    img:'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&q=75' },
  { id:'bbq5', cat:'bbq', name:'Chicken Tikka Boti',
    desc:'Bone-in chicken pieces marinated overnight in yoghurt and spices, then charcoal-grilled.',
    price:650, spicy:true,
    img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=75' },
  { id:'bbq6', cat:'bbq', name:'Chicken Malai Tikka',
    desc:'Cream-marinated chicken tikka mild, rich, and deeply aromatic.',
    price:700,
    img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=75' },
  { id:'bbq7', cat:'bbq', name:'Chicken Piece',
    desc:'Individual marinated chicken pieces grilled with our proprietary spice rub.',
    price:300,
    img:'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=75' },
  { id:'bbq8', cat:'bbq', name:'Chicken Charcoal',
    desc:'Whole chicken slow-cooked for hours over pure charcoal smoky, succulent, unforgettable.',
    price:900,
    img:'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&q=75' },

  /* KARAHI */
  { id:'k1', cat:'karahi', name:'Chicken Karahi',
    desc:'Classic Pakistani karahi fresh tomatoes, green chillies, ginger, butter. A whole experience.',
    price:900, spicy:true,
    img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=75' },
  { id:'k2', cat:'karahi', name:'Beef Karahi',
    desc:'Rich, robust beef karahi simmered in a fiery tomato-and-ginger masala.',
    price:1100, spicy:true,
    img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=75' },
  { id:'k3', cat:'karahi', name:'Seekh Kabab Karahi',
    desc:'Crumbled seekh kababs cooked down in a thick spiced karahi gravy intensely savoury.',
    price:950, spicy:true,
    img:'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=500&q=75' },
  { id:'k4', cat:'karahi', name:'Mutton Karahi',
    desc:'Slow-cooked bone-in mutton in a deeply layered karahi sauce the weekend special.',
    price:1200, spicy:true,
    img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=75' },
  { id:'k5', cat:'karahi', name:'Namkeen Karahi',
    desc:'Mildly spiced, buttery Namkeen karahi subtle, silky, and deeply comforting.',
    price:950,
    img:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=75' },

  /* EXTRA */
  { id:'e1', cat:'extra', name:'Naan',
    desc:'Pillowy, fresh naan baked in a traditional clay oven serves with everything.',
    price:30,
    img:'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&q=75' },
  { id:'e2', cat:'extra', name:'Raita',
    desc:'Cooling creamy yoghurt raita with a whisper of cumin and fresh mint.',
    price:80,
    img:'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=75' },
  { id:'e3', cat:'extra', name:'Shami Kabab',
    desc:'Classic lentil-and-mince shami kababs, pan-fried to a perfect golden crust.',
    price:120, spicy:true,
    img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=75' },

  /* COFFEE & TEA */
  { id:'c1', cat:'coffee', name:'Cappuccino',
    desc:'Rich double espresso with perfectly velvety steamed milk foam.',
    price:200,
    img:'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=75' },
  { id:'c2', cat:'coffee', name:'Latte Coffee',
    desc:'Smooth, creamy latte with a double shot of full-bodied espresso.',
    price:220,
    img:'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=500&q=75' },
  { id:'c3', cat:'coffee', name:'Turkish Black Coffee',
    desc:'Strong, aromatic, unfiltered the way coffee was always meant to be drunk.',
    price:100,
    img:'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=500&q=75' },
  { id:'c4', cat:'coffee', name:'Regular Chai (Desi)',
    desc:'Classic desi chai brewed hard with milk, sugar, and strong loose-leaf tea.',
    price:150,
    img:'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=75' },
  { id:'c5', cat:'coffee', name:'Special Doodh Patti Deal',
    desc:'Thick, creamy doodh patti brewed the proper way the real soul of Pakistani chai.',
    price:180,
    img:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=75' },

  /* SALAD */
  { id:'s1', cat:'salad', name:'Red Vok Special Salad',
    desc:'Seasonal greens, cherry tomatoes, cucumber, house herbs, and a signature dressing.',
    price:280,
    img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=75' },
  { id:'s2', cat:'salad', name:'Apple Cabbage Salad',
    desc:'Crisp cabbage and thinly sliced apple tossed in a light apple-cider vinaigrette.',
    price:220,
    img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=75' },
];

/* ══════════════════════════════════════════════
   2. STATE
══════════════════════════════════════════════ */
const cart   = {};        // { itemId: { item, qty, size, price } }
let   activeCat = 'all';

/* ══════════════════════════════════════════════
   3. PAGE LOADER
══════════════════════════════════════════════ */
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('loaded');
      triggerHeroReveal();
    }, 1700);
  });
}

/* ══════════════════════════════════════════════
   4. CUSTOM CURSOR
══════════════════════════════════════════════ */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, {passive:true});

  (function loop() {
    // Dot: snaps immediately
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    // Ring: lerps behind
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  // Hover states
  const hoverEls = 'a, button, [role="button"], .menu-card, .cat-tab, .ap-item';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) document.body.classList.remove('cursor-hover');
  });
}

/* ══════════════════════════════════════════════
   5. SCROLL PROGRESS BAR
══════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-bar');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, {passive:true});
}

/* ══════════════════════════════════════════════
   6. NAVIGATION
══════════════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, {passive:true});

  // Hamburger
  const ham    = document.getElementById('hamburger');
  const mobNav = document.getElementById('mobNav');
  ham.addEventListener('click', () => {
    const open = mobNav.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.getElementById('mobClose').addEventListener('click', closeMobNav);
}
function closeMobNav() {
  document.getElementById('mobNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
window.closeMobNav = closeMobNav;

/* ══════════════════════════════════════════════
   7. CANVAS PARTICLES (golden embers)
══════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize, {passive:true});
  resize();

  const COLORS = ['rgba(200,144,12,', 'rgba(196,32,48,', 'rgba(232,184,42,', 'rgba(240,200,100,'];

  function mkParticle() {
    return {
      x: Math.random() * W,
      y: H + Math.random() * 60,
      r: Math.random() * 2 + .5,
      vx: (Math.random() - .5) * .5,
      vy: -(Math.random() * .8 + .4),
      alpha: Math.random() * .55 + .1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
      decay: Math.random() * .003 + .001,
    };
  }

  for (let i = 0; i < 55; i++) {
    const p = mkParticle();
    p.y = Math.random() * H; // spread initially
    particles.push(p);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx + Math.sin(Date.now() * .0005 + i) * .2;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0 || p.y < -20) {
        particles[i] = mkParticle();
        return;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha * p.life;
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color + '.6)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ══════════════════════════════════════════════
   8. SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════════════ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
      // Counters
      if (e.target.classList.contains('stat')) {
        e.target.querySelectorAll('.counter').forEach(el => animateCounter(el));
      }
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function observeRevealEls() {
  document.querySelectorAll('.reveal-clip, .reveal-up, .reveal-fade').forEach(el => revealObs.observe(el));
  document.querySelectorAll('.stat').forEach(el => revealObs.observe(el));
}

/* ══════════════════════════════════════════════
   9. HERO TITLE REVEAL
══════════════════════════════════════════════ */
function triggerHeroReveal() {
  const title = document.querySelector('.hero-title');
  if (title) {
    // small delay after loader fades
    setTimeout(() => title.classList.add('revealed'), 200);
  }
  // Trigger clip reveals
  document.querySelectorAll('#hero .reveal-clip, #hero .reveal-fade').forEach(el => {
    revealObs.observe(el);
    // Force in for hero since it's in view on load
    setTimeout(() => el.classList.add('in'), 300);
  });
  document.querySelectorAll('#hero .reveal-fade').forEach(el => {
    setTimeout(() => el.classList.add('in'), parseInt(el.style.getPropertyValue('--d') || 0) + 300);
  });
}

/* ══════════════════════════════════════════════
   10. COUNTER ANIMATION
══════════════════════════════════════════════ */
function animateCounter(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const target = parseInt(el.dataset.target, 10);
  const dur    = 2000;
  const start  = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

/* ══════════════════════════════════════════════
   11. CATEGORY TABS + INDICATOR
══════════════════════════════════════════════ */
function buildCatTabs() {
  const tabsEl    = document.getElementById('catTabs');
  const indicator = document.getElementById('catIndicator');

  CATS.forEach(cat => {
    const btn = document.createElement('button');
    btn.className   = 'cat-tab' + (cat.id === 'all' ? ' active' : '');
    btn.dataset.cat = cat.id;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', cat.id === 'all' ? 'true' : 'false');
    btn.textContent = cat.label;
    btn.addEventListener('click', () => selectTab(btn, cat.id));
    tabsEl.appendChild(btn);
  });

  // Position indicator on first tab
  requestAnimationFrame(() => positionIndicator(tabsEl.querySelector('.active')));
}

function positionIndicator(tab) {
  const indicator = document.getElementById('catIndicator');
  const tabsEl    = document.getElementById('catTabs');
  const tabsRect  = tabsEl.getBoundingClientRect();
  const tabRect   = tab.getBoundingClientRect();
  indicator.style.left  = (tabRect.left - tabsRect.left) + 'px';
  indicator.style.width = tabRect.width + 'px';
}

function selectTab(btn, catId) {
  document.querySelectorAll('.cat-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  positionIndicator(btn);
  activeCat = catId;
  renderMenu(true);
}

/* ══════════════════════════════════════════════
   12. MENU RENDERING
══════════════════════════════════════════════ */
function renderMenu(animate = false) {
  const grid   = document.getElementById('menuGrid');
  const items  = activeCat === 'all' ? ITEMS : ITEMS.filter(i => i.cat === activeCat);
  const catMap = Object.fromEntries(CATS.map(c => [c.id, c]));

  if (animate) {
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(16px)';
  }

  grid.innerHTML = '';

  items.forEach((item, idx) => {
    const isPizza   = item.cat === 'pizza';
    const inCart    = cart[item.id];
    const qty       = inCart ? inCart.qty : 0;
    const catLabel  = catMap[item.cat]?.label || item.cat;
    const defPrice  = isPizza ? PIZZA_PRICES.small : (item.price || 0);

    const card = document.createElement('article');
    card.className = 'menu-card';
    card.setAttribute('role', 'listitem');
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="card-shine" aria-hidden="true"></div>
      <div class="card-img">
        <img src="${item.img}"
             alt="${item.name}"
             loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=70'">
        <span class="card-cat">${catLabel}</span>
        ${item.spicy ? `<span class="card-spicy" title="Spicy" aria-label="Spicy dish">🌶️</span>` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-name">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        ${isPizza ? `
          <div class="size-row" role="group" aria-label="Choose pizza size">
            <button class="sz-btn active" data-sz="small" aria-pressed="true">Small</button>
            <button class="sz-btn" data-sz="medium" aria-pressed="false">Medium</button>
            <button class="sz-btn" data-sz="large" aria-pressed="false">Large</button>
          </div>
        ` : ''}
        <div class="card-foot">
          <div class="card-price" id="price-${item.id}">
            PKR ${defPrice.toLocaleString()}<small>PKR</small>
          </div>
          <div style="display:flex;align-items:center;gap:.4rem;">
            <button class="btn-add${qty > 0 ? ' hidden' : ''}"
                    id="addBtn-${item.id}"
                    aria-label="Add ${item.name} to cart"
                    ${qty > 0 ? 'style="display:none"' : ''}>
              + Add
            </button>
            <div class="qty-ctl${qty > 0 ? ' show' : ''}"
                 id="qtyCtl-${item.id}">
              <button class="qb" data-dir="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="qn" id="qNum-${item.id}">${qty}</span>
              <button class="qb" data-dir="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
        </div>
      </div>`;

    // Size buttons (pizza)
    if (isPizza) {
      card.querySelectorAll('.sz-btn').forEach(sb => {
        sb.addEventListener('click', () => {
          card.querySelectorAll('.sz-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
          sb.classList.add('active');
          sb.setAttribute('aria-pressed','true');
          const sz = sb.dataset.sz;
          document.getElementById(`price-${item.id}`).innerHTML =
            `PKR ${PIZZA_PRICES[sz].toLocaleString()}<small>PKR</small>`;
          if (cart[item.id]) {
            cart[item.id].size  = sz;
            cart[item.id].price = PIZZA_PRICES[sz];
            renderCartItems();
          }
        });
      });
    }

    // Add button
    const addBtn = card.querySelector(`#addBtn-${item.id}`);
    addBtn.addEventListener('click', e => {
      const sz    = isPizza ? (card.querySelector('.sz-btn.active')?.dataset.sz || 'small') : null;
      const price = isPizza ? PIZZA_PRICES[sz] : item.price;
      addToCart(item, sz, price, e.currentTarget, card.querySelector('.card-img img'));
    });

    // Qty buttons
    card.querySelectorAll('.qb').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.dir === 'inc') changeQty(item.id, 1);
        else                           changeQty(item.id, -1);
      });
    });

    grid.appendChild(card);
  });

  // 3D Tilt
  initCardTilt();
  // Re-observe
  requestAnimationFrame(() => {
    if (animate) {
      grid.style.transition = 'opacity .4s, transform .4s';
      grid.style.opacity  = '1';
      grid.style.transform = 'translateY(0)';
    }
    observeRevealEls();
  });
}

/* ══════════════════════════════════════════════
   13. 3D CARD TILT
══════════════════════════════════════════════ */
function initCardTilt() {
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y*10}deg) rotateY(${x*10}deg) translateY(-7px) scale(1.015)`;
      // Shine
      const shine = card.querySelector('.card-shine');
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%, rgba(255,255,255,0.10) 0%, transparent 55%)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const shine = card.querySelector('.card-shine');
      if (shine) shine.style.background = '';
    });
  });
}

/* ══════════════════════════════════════════════
   14. MAGNETIC BUTTONS
══════════════════════════════════════════════ */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.28;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.28;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ══════════════════════════════════════════════
   15. CART ADD / CHANGE QTY
══════════════════════════════════════════════ */
function addToCart(item, size, price, btnEl, imgEl) {
  if (cart[item.id]) {
    cart[item.id].qty++;
  } else {
    cart[item.id] = { item, qty: 1, size, price };
  }
  syncCardUI(item.id, cart[item.id].qty);
  renderCartItems();
  updateBadge();
  flyToCart(imgEl);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) {
    delete cart[id];
    syncCardUI(id, 0);
  } else {
    syncCardUI(id, cart[id].qty);
  }
  renderCartItems();
  updateBadge();
}

function removeFromCart(id) {
  if (!cart[id]) return;
  delete cart[id];
  syncCardUI(id, 0);
  renderCartItems();
  updateBadge();
}

function syncCardUI(id, qty) {
  const addBtn = document.getElementById(`addBtn-${id}`);
  const qtyCtl = document.getElementById(`qtyCtl-${id}`);
  const qNum   = document.getElementById(`qNum-${id}`);
  if (!addBtn) return;
  if (qty > 0) {
    addBtn.style.display = 'none';
    qtyCtl.classList.add('show');
  } else {
    addBtn.style.display = '';
    qtyCtl.classList.remove('show');
  }
  if (qNum) qNum.textContent = qty;
}

/* ══════════════════════════════════════════════
   16. FLY-TO-CART ANIMATION
══════════════════════════════════════════════ */
function flyToCart(imgEl) {
  if (!imgEl) { animateBadge(); return; }
  const cartBtn = document.getElementById('cartBtn');
  const src     = imgEl.getBoundingClientRect();
  const dst     = cartBtn.getBoundingClientRect();

  const fly = document.createElement('img');
  fly.src = imgEl.src;
  fly.setAttribute('aria-hidden', 'true');
  Object.assign(fly.style, {
    position: 'fixed',
    left: src.left + src.width  / 2 - 22 + 'px',
    top:  src.top  + src.height / 2 - 22 + 'px',
    width: '44px', height: '44px',
    borderRadius: '50%', objectFit: 'cover',
    zIndex: '9999', pointerEvents: 'none',
    transition: 'all .65s cubic-bezier(.4,0,.2,1)',
    opacity: '1',
  });
  document.body.appendChild(fly);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    Object.assign(fly.style, {
      left: dst.left + dst.width  / 2 - 10 + 'px',
      top:  dst.top  + dst.height / 2 - 10 + 'px',
      width: '12px', height: '12px',
      opacity: '0',
    });
  }));
  setTimeout(() => { fly.remove(); animateBadge(); }, 700);
}

/* ══════════════════════════════════════════════
   17. CART BADGE
══════════════════════════════════════════════ */
function updateBadge() {
  const badge = document.getElementById('cartCount');
  const total = Object.values(cart).reduce((s, v) => s + v.qty, 0);
  badge.textContent = total;
  badge.classList.toggle('show', total > 0);
  document.getElementById('cartBtn').setAttribute('aria-label', `View cart (${total} item${total !== 1 ? 's' : ''})`);
}
function animateBadge() {
  const badge = document.getElementById('cartCount');
  badge.classList.remove('badge-pop');
  void badge.offsetWidth;
  badge.classList.add('badge-pop');
}

/* ══════════════════════════════════════════════
   18. RENDER CART ITEMS
══════════════════════════════════════════════ */
function renderCartItems() {
  const list  = document.getElementById('cartList');
  const empty = document.getElementById('cartEmpty');
  const waBtn = document.getElementById('btnWA');
  const keys  = Object.keys(cart);

  list.innerHTML = '';

  if (keys.length === 0) {
    empty.style.display = '';
    document.getElementById('cartSub').textContent   = 'PKR 0';
    document.getElementById('cartGrand').textContent = 'PKR 0';
    waBtn.disabled = true;
    return;
  }

  empty.style.display = 'none';
  waBtn.disabled = false;
  let sub = 0;

  keys.forEach(id => {
    const { item, qty, size, price } = cart[id];
    const lineTotal = price * qty;
    sub += lineTotal;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.setAttribute('role', 'listitem');
    li.innerHTML = `
      <img class="ci-img"
           src="${item.img}"
           alt="${item.name}"
           onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&q=70'">
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        ${size ? `<div class="ci-size">${cap(size)}</div>` : ''}
        <div class="ci-price">PKR ${price.toLocaleString()} × ${qty} = PKR ${lineTotal.toLocaleString()}</div>
      </div>
      <div class="ci-actions">
        <div class="ci-ctl">
          <button class="cqb" data-cid="${id}" data-cdir="dec" aria-label="Decrease">−</button>
          <span class="cqn">${qty}</span>
          <button class="cqb" data-cid="${id}" data-cdir="inc" aria-label="Increase">+</button>
        </div>
        <button class="c-remove" data-remove-id="${id}" aria-label="Remove ${item.name}">Remove</button>
      </div>`;

    li.querySelectorAll('.cqb').forEach(btn => {
      btn.addEventListener('click', () => {
        const delta = btn.dataset.cdir === 'inc' ? 1 : -1;
        changeQty(btn.dataset.cid, delta);
      });
    });
    li.querySelector('.c-remove').addEventListener('click', () => removeFromCart(id));

    list.appendChild(li);
  });

  document.getElementById('cartSub').textContent   = `PKR ${sub.toLocaleString()}`;
  document.getElementById('cartGrand').textContent = `PKR ${sub.toLocaleString()}`;
}

function cap(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }

/* ══════════════════════════════════════════════
   19. WHATSAPP ORDER
══════════════════════════════════════════════ */
function initWhatsApp() {
  document.getElementById('btnWA').addEventListener('click', () => {
    const note      = document.getElementById('cartNote').value.trim();
    const name      = document.getElementById('custName').value.trim();
    const contact   = document.getElementById('custContact').value.trim();
    const address   = document.getElementById('custAddress').value.trim();
    const email     = document.getElementById('custEmail').value.trim();
    const orderType = document.getElementById('orderType').value;
    const keys      = Object.keys(cart);
    if (!keys.length) return;

    const orderLabel = orderType === 'pickup' ? 'pickup' : orderType === 'dine in' ? 'dine in' : 'delivery';

    let msg = `Hi Redvok\n`;
    msg += `I am ${name || '___'}, from ${address || '___'}, my contact no is ${contact || '___'}, and want ${orderLabel} the following items,\n`;

    let total = 0;
    keys.forEach((id, index) => {
      const { item, qty, size, price } = cart[id];
      const line = price * qty;
      total += line;
      const sLabel = size ? ` (${cap(size)})` : '';
      msg += `${index + 1}. ${item.name}${sLabel} * ${qty} = PKR ${line.toLocaleString()}\n`;
    });

    msg += `\nTotal = PKR ${total.toLocaleString()}\n\nPlease confirm.`;
    if (note) msg += `\n\nNote: ${note}`;
    if (email) msg += `\n\nEmail: ${email}`;

    window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  });
}

/* ══════════════════════════════════════════════
   20. CART DRAWER OPEN / CLOSE
══════════════════════════════════════════════ */
function initCartDrawer() {
  const overlay = document.getElementById('cartOverlay');
  const drawer  = document.getElementById('cartDrawer');

  function open() {
    overlay.classList.add('show');
    drawer.classList.add('show');
    document.body.style.overflow = 'hidden';
    drawer.querySelector('textarea').focus();
  }
  function close() {
    overlay.classList.remove('show');
    drawer.classList.remove('show');
    document.body.style.overflow = '';
  }

  document.getElementById('cartBtn').addEventListener('click', open);
  document.getElementById('cartClose').addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ══════════════════════════════════════════════
   21. INIT
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initScrollProgress();
  initNav();
  initParticles();
  buildCatTabs();
  renderMenu(false);
  initWhatsApp();
  initCartDrawer();
  observeRevealEls();

  // Magnetic after everything renders
  setTimeout(initMagnetic, 100);

  // Re-run magnetic after menu renders (new elements added)
  const origRender = renderMenu;
  // Also re-attach magnetic on tab change
  document.getElementById('catTabs').addEventListener('click', () => {
    setTimeout(initMagnetic, 200);
  });
});
