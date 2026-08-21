/**
 * Luxing Collecting — script.js
 * ES Module entry for Vite
 * Three.js + GSAP + Lenis — fully local npm packages
 */

import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════ */
const GOLD = 0xD4AF37
const GOLD_CSS = '#D4AF37'

/* ═══════════════════════════════════════════════
   1. LENIS — Smooth Scroll
═══════════════════════════════════════════════ */
function initLenis () {
  const lenis = new Lenis({
    root: document.getElementById('lenis-root'),
    duration: 0.6,
    easing: t => t, // linear easing for quick scroll
    direction: 'vertical',
    smooth: true,
    smoothTouch: false,
    anchors: true,
  })

  // Wire Lenis to GSAP ticker
  gsap.ticker.add(time => { lenis.raf(time * 1000) })
  gsap.ticker.lagSmoothing(0)

  // Also update ScrollTrigger on scroll
  lenis.on('scroll', ScrollTrigger.update)

  return lenis
}

/* ═══════════════════════════════════════════════
   2. THREE.JS — Coffee Bean Particle System
═══════════════════════════════════════════════ */
function initThree () {
  const canvas = document.getElementById('three-canvas')
  if (!canvas) return null

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    60, window.innerWidth / window.innerHeight, 0.1, 200
  )
  camera.position.set(0, 0, 12)

  /* ── Particle geometry ─────────────────────── */
  const COUNT = 180
  const geo   = new THREE.BufferGeometry()
  const pos   = new Float32Array(COUNT * 3)
  const vel   = new Float32Array(COUNT * 3) // velocities
  const sizes = new Float32Array(COUNT)
  const alphas = new Float32Array(COUNT)

  function randomPos (i) {
    pos[i * 3 + 0] = (Math.random() - 0.5) * 32  // x
    pos[i * 3 + 1] = (Math.random() - 0.5) * 22  // y
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8   // z
    vel[i * 3 + 0] = (Math.random() - 0.5) * 0.004
    vel[i * 3 + 1] =  Math.random() * 0.012 + 0.004 // drift up
    vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    sizes[i]  = Math.random() * 4.5 + 1.5
    alphas[i] = Math.random()
  }

  for (let i = 0; i < COUNT; i++) randomPos(i)

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
  geo.setAttribute('aAlpha',   new THREE.BufferAttribute(alphas, 1))

  /* ── Custom shader material for golden soft dots ── */
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime:  { value: 0 },
      uColor: { value: new THREE.Color(GOLD) },
    },
    vertexShader: /* glsl */ `
      attribute float size;
      attribute float aAlpha;
      varying float vAlpha;
      void main () {
        vAlpha = aAlpha;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPos.z);
        gl_Position  = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying float vAlpha;
      void main () {
        float d = distance(gl_PointCoord, vec2(0.5));
        if (d > 0.5) discard;
        float a = (1.0 - d * 2.0) * vAlpha * 0.65;
        gl_FragColor = vec4(uColor, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const particles = new THREE.Points(geo, mat)
  scene.add(particles)

  /* ── Mouse parallax state for Three scene ── */
  let mouseX = 0, mouseY = 0

  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }, { passive: true })

  /* ── RAF loop ──────────────────────────────── */
  let clock = new THREE.Clock()

  function animate () {
    requestAnimationFrame(animate)
    const elapsed = clock.getElapsedTime()
    mat.uniforms.uTime.value = elapsed

    // Update particle positions
    const posArr = geo.attributes.position.array
    const alpArr = geo.attributes.aAlpha.array

    for (let i = 0; i < COUNT; i++) {
      posArr[i * 3 + 0] += vel[i * 3 + 0]
      posArr[i * 3 + 1] += vel[i * 3 + 1]
      posArr[i * 3 + 2] += vel[i * 3 + 2]
      alpArr[i] = Math.sin(elapsed * 0.6 + i * 0.4) * 0.35 + 0.45

      // Reset when above top
      if (posArr[i * 3 + 1] > 12) {
        posArr[i * 3 + 1] = -12
        posArr[i * 3 + 0] = (Math.random() - 0.5) * 32
      }
    }
    geo.attributes.position.needsUpdate = true
    geo.attributes.aAlpha.needsUpdate   = true

    // Camera drifts subtly with mouse
    camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }
  animate()

  /* ── Resize ────────────────────────────────── */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  return { renderer, scene, camera }
}

/* ═══════════════════════════════════════════════
   3. CUSTOM CURSOR
═══════════════════════════════════════════════ */
function initCursor () {
  const glow = document.getElementById('cursor-glow')
  const dot  = document.getElementById('cursor-dot')
  if (!glow || !dot) return

  let gx = 0, gy = 0 // glow target
  let dx = 0, dy = 0 // dot target

  document.addEventListener('mousemove', e => {
    dx = e.clientX; dy = e.clientY
    gx = e.clientX; gy = e.clientY
  }, { passive: true })

  // Smooth glow position via RAF
  ;(function loop () {
    requestAnimationFrame(loop)
    glow.style.left = gx + 'px'
    glow.style.top  = gy + 'px'
    dot.style.left  = dx + 'px'
    dot.style.top   = dy + 'px'
  })()

  // Hover detection — expand cursor dot
  const hovers = document.querySelectorAll(
    'a, button, .proc-step, .ofc-btn, [role="button"]'
  )
  hovers.forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hovering'))
    el.addEventListener('mouseleave', () => dot.classList.remove('hovering'))
  })
}

/* ═══════════════════════════════════════════════
   4. GLASS CARD — 3D Mouse Tilt Parallax
═══════════════════════════════════════════════ */
function initCardTilt () {
  const scene = document.getElementById('hero-scene')
  const card  = document.getElementById('glass-card')
  if (!scene || !card) return

  const CFG = {
    maxX:    13,
    maxY:    10,
    maxT:    7,
    factor:  0.07,
    scaleOn: 1.018,
  }

  let tx = 0, ty = 0
  let cx = 0, cy = 0
  let hov = false
  let sc  = 1.0, csc = 1.0

  document.getElementById('hero')?.addEventListener('mousemove', e => {
    const r   = scene.getBoundingClientRect()
    const nx  = ((e.clientX - r.left)  / r.width  - 0.5) * 2
    const ny  = ((e.clientY - r.top)   / r.height - 0.5) * 2
    tx  = -ny * CFG.maxX
    ty  =  nx * CFG.maxY
    hov = true
    sc  = CFG.scaleOn
  }, { passive: true })

  document.getElementById('hero')?.addEventListener('mouseleave', () => {
    tx = 0; ty = 0; hov = false; sc = 1.0
  })

  function lerp (a, b, t) { return a + (b - a) * t }

  ;(function loop () {
    requestAnimationFrame(loop)
    cx  = lerp(cx, tx,  CFG.factor)
    cy  = lerp(cy, ty,  CFG.factor)
    csc = lerp(csc, sc, CFG.factor)

    const tlx = (cy / CFG.maxY) * CFG.maxT
    const tly = (cx / CFG.maxX) * CFG.maxT

    card.style.transform = `
      rotateX(${cx}deg)
      rotateY(${cy}deg)
      translate3d(${tlx}px,${tly}px,0)
      scale(${csc})
    `

    const glow = hov
      ? 0.10 + Math.abs(cx / CFG.maxX) * 0.16
      : 0.07
    card.style.boxShadow = `
      0 0 0 1px rgba(212,175,55,0.10),
      0 24px 64px rgba(0,0,0,0.65),
      0 0 120px rgba(212,175,55,${glow}),
      inset 0 1px 0 rgba(255,255,255,0.07)
    `
  })()
}

/* ═══════════════════════════════════════════════
   5. GSAP — Hero Entrance (already CSS-animated,
      GSAP adds number counter + scroll cue fade)
═══════════════════════════════════════════════ */
function initCounters () {
  // Animate brew spec numbers counting up
  document.querySelectorAll('.spec-val[data-target]').forEach(el => {
    const target = +el.dataset.target
    gsap.to({ val: 0 }, {
      val: target,
      duration: 1.8,
      delay: 1.2,
      ease: 'power2.out',
      onUpdate: function () {
        el.textContent = Math.round(this.targets()[0].val)
      }
    })
  })
}

/* ═══════════════════════════════════════════════
   6. GSAP ScrollTrigger — Section Reveals
═══════════════════════════════════════════════ */
function initScrollAnimations () {
  /* ── Section tags & headings ────────────────── */
  gsap.utils.toArray('.s-tag').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    })
  })

  gsap.utils.toArray('.s-heading').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none none',
      }
    })
  })

  /* ── Story visual parallax ──────────────────── */
  const storyVis = document.getElementById('story-vis')
  if (storyVis) {
    gsap.fromTo(storyVis,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyVis,
          start: 'top 80%',
        }
      }
    )
    // Subtle parallax while scrolling
    gsap.to(storyVis, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#story',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      }
    })
  }

  /* ── Story text stagger ─────────────────────── */
  const storyTxt = document.getElementById('story-txt')
  if (storyTxt) {
    gsap.fromTo(
      storyTxt.querySelectorAll('.s-body, .story-stats'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyTxt,
          start: 'top 78%',
        }
      }
    )
  }

  /* ── Process steps stagger ──────────────────── */
  gsap.utils.toArray('.proc-step').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
      }
    })
  })

  /* ── Order section reveals ──────────────────── */
  const orderHeading = document.getElementById('order-heading')
  if (orderHeading) {
    gsap.to(orderHeading, {
      opacity: 1, y: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: { trigger: orderHeading, start: 'top 80%' }
    })
  }
  const orderSub = document.querySelector('.order-sub')
  if (orderSub) {
    gsap.to(orderSub, {
      opacity: 1, y: 0,
      duration: 0.9, delay: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: orderSub, start: 'top 82%' }
    })
  }
  const orderBtns = document.querySelector('.order-btns')
  if (orderBtns) {
    gsap.to(orderBtns, {
      opacity: 1, y: 0,
      duration: 0.9, delay: 0.28,
      ease: 'power3.out',
      scrollTrigger: { trigger: orderBtns, start: 'top 84%' }
    })
  }
  const orderFloat = document.getElementById('order-float')
  if (orderFloat) {
    gsap.to(orderFloat, {
      opacity: 1, y: 0,
      duration: 1.1, delay: 0.40,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: orderFloat, start: 'top 86%' }
    })
  }

  /* ── Scroll cue fade out on scroll ─────────── */
  const scrollCue = document.getElementById('scroll-cue')
  if (scrollCue) {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: '15% top',
      scrub: true,
      onUpdate: self => {
        scrollCue.style.opacity = 1 - self.progress * 3
      }
    })
  }
}

/* ═══════════════════════════════════════════════
   7. CTA Ripple effect
═══════════════════════════════════════════════ */
function initRipples () {
  document.querySelectorAll('.btn-gold, .ofc-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      const rip  = document.createElement('span')
      Object.assign(rip.style, {
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.28)',
        width: size + 'px',
        height: size + 'px',
        left: (e.clientX - rect.left - size / 2) + 'px',
        top:  (e.clientY - rect.top  - size / 2) + 'px',
        transform: 'scale(0)',
        animation: 'rippleOut 0.6s ease-out forwards',
        pointerEvents: 'none',
      })
      btn.style.position = 'relative'
      btn.style.overflow = 'hidden'
      btn.appendChild(rip)
      rip.addEventListener('animationend', () => rip.remove())
    })
  })

  // Inject keyframes
  const s = document.createElement('style')
  s.textContent = `@keyframes rippleOut {
    from { transform: scale(0); opacity: 1; }
    to   { transform: scale(1); opacity: 0; }
  }`
  document.head.appendChild(s)
}

/* ═══════════════════════════════════════════════
   8. VIDEO FALLBACK
═══════════════════════════════════════════════ */
function initVideo () {
  const v = document.getElementById('hero-video')
  if (!v) return

  v.addEventListener('error', () => {
    const wrap = v.closest('.hero-video-wrap')
    if (wrap) {
      wrap.style.background =
        'radial-gradient(ellipse 140% 120% at 30% 70%, #3D1800 0%, #1A0A00 45%, #080604 100%)'
    }
    v.remove()
  })
}

/* ═══════════════════════════════════════════════
   9. MARQUEE — pause on hover
═══════════════════════════════════════════════ */
function initMarquee () {
  const track = document.querySelector('.marquee-inner')
  if (!track) return
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused')
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running')
}

/* ═══════════════════════════════════════════════
   10. PRODUCT 3D — mouse tilt in story section
═══════════════════════════════════════════════ */
function initProductTilt () {
  const prod = document.getElementById('product-3d')
  const vis  = document.getElementById('story-vis')
  if (!prod || !vis) return

  vis.addEventListener('mousemove', e => {
    const r  = vis.getBoundingClientRect()
    const nx = ((e.clientX - r.left) / r.width  - 0.5) * 2
    const ny = ((e.clientY - r.top)  / r.height - 0.5) * 2
    prod.style.transform = `
      translateY(-12px)
      rotateY(${nx * 12}deg)
      rotateX(${-ny * 8}deg)
    `
  }, { passive: true })

  vis.addEventListener('mouseleave', () => {
    prod.style.transform = ''
  })
}

/* ═══════════════════════════════════════════════
   INIT ALL
═══════════════════════════════════════════════ */
function main () {
  initVideo()
  initLenis()
  initThree()
  initCursor()
  initCardTilt()
  initCounters()
  initScrollAnimations()
  initRipples()
  initMarquee()
  initProductTilt()

  console.info('%cLuxing Collecting ✦ Loaded', 'color:#D4AF37;font-weight:bold;font-size:13px')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}
