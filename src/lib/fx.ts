// Effets "vivants" du portfolio : tilt 3D, parallax, compteurs, particules
// et succès (gamification). Tout est piloté par la classe `fx-enabled` posée
// sur <html> par FxToggle.vue — désactivé = aucun listener, aucun canvas.

const ACHIEVEMENTS: Record<string, string> = {
  curieux: 'Curieux — effets activés',
  explorateur: 'Explorateur — 3 pages visitées',
  nocturne: 'Nocturne — mode sombre',
  retro: 'Rétro — code Konami',
};

const ACH_KEY = 'fx-achievements';
const VISITED_KEY = 'fx-visited';

let started = false;
let cleanup: (() => void) | null = null;

export function initFx(): void {
  if (document.documentElement.classList.contains('fx-enabled')) start();
  window.addEventListener('fx:change', ((e: CustomEvent<boolean>) => {
    e.detail ? start() : stop();
  }) as EventListener);
  initAchievements();
}

function start(): void {
  if (started) return;
  started = true;
  const teardowns = [
    setupTilt(),
    setupParallax(),
    setupCountUp(),
    setupParticles(),
  ];
  cleanup = () => {
    teardowns.forEach((fn) => fn());
    cleanup = null;
    started = false;
  };
}

function stop(): void {
  cleanup?.();
}

/* --- Tilt 3D des cartes (délégation : un seul listener pour la page) --- */

function setupTilt(): () => void {
  if (window.matchMedia('(hover: none)').matches) return () => {};
  let current: Element | null = null;
  const reset = (el: Element | null) => {
    if (el instanceof HTMLElement) el.style.transform = '';
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const target = e.target instanceof Element ? e.target.closest('.card-hover') : null;
    if (target !== current) {
      reset(current);
      current = target;
    }
    if (!target) return;
    const r = target.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    target.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-2px)`;
  };
  document.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    document.removeEventListener('pointermove', onMove);
    reset(current);
  };
}

/* --- Parallax vertical des éléments décoratifs [data-fx-parallax] --- */

function setupParallax(): () => void {
  const els = [...document.querySelectorAll<HTMLElement>('[data-fx-parallax]')];
  if (!els.length) return () => {};
  let raf = 0;
  const update = () => {
    raf = 0;
    const y = window.scrollY;
    els.forEach((el) => {
      const factor = parseFloat(el.dataset.fxParallax || '0.1');
      el.style.transform = `translate3d(0, ${(-y * factor).toFixed(1)}px, 0)`;
    });
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(raf);
    els.forEach((el) => (el.style.transform = ''));
  };
}

/* --- Compteurs animés [data-fx-count] (une fois, à l'entrée en vue) --- */

function setupCountUp(): () => void {
  const els = [...document.querySelectorAll<HTMLElement>('[data-fx-count]')];
  if (!els.length) return () => {};
  const running = new Set<number>();
  const rafIds = new Set<number>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        const target = parseFloat(el.dataset.fxCount || '0');
        const suffix = el.textContent?.replace(/[\d.,\s]/g, '') || '';
        const duration = 900;
        const startTs = performance.now();
        running.add(target);
        const tick = (now: number) => {
          const t = Math.min((now - startTs) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (t < 1) {
            rafIds.add(requestAnimationFrame(tick));
          } else {
            running.delete(target);
          }
        };
        rafIds.add(requestAnimationFrame(tick));
      });
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => observer.observe(el));
  return () => {
    observer.disconnect();
    rafIds.forEach((id) => cancelAnimationFrame(id));
    // Si l'animation est coupée en route, on fige la valeur finale.
    els.forEach((el) => {
      if (running.has(parseFloat(el.dataset.fxCount || '0'))) {
        el.textContent = `${el.dataset.fxCount}${el.textContent?.replace(/[\d.,\s]/g, '') || ''}`;
      }
    });
  };
}

/* --- Particules en fond (canvas créé/détruit avec le toggle) --- */

function setupParticles(): () => void {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return () => {};
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const count = window.innerWidth < 768 ? 24 : 55;
  const linkDist = 130;
  const dots = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: 1 + Math.random() * 1.5,
  }));

  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  // Teal du thème (var --primary) : lu à chaque redémarrage des effets.
  const color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#14b8a6';
  let raf = 0;
  const frame = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const o = dots[j];
        const dist = Math.hypot(d.x - o.x, d.y - o.y);
        if (dist < linkDist) {
          ctx.globalAlpha = 0.12 * (1 - dist / linkDist);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(o.x, o.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  };
  // L'onglet en arrière-plan ne doit pas tourner en boucle.
  const onVisibility = () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) raf = requestAnimationFrame(frame);
  };
  document.addEventListener('visibilitychange', onVisibility);
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('resize', resize);
    canvas.remove();
  };
}

/* --- Gamification : 4 succès en localStorage, toasts discrets --- */

function readAchievements(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACH_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function unlock(id: string): void {
  const list = readAchievements();
  if (list.includes(id)) return;
  list.push(id);
  localStorage.setItem(ACH_KEY, JSON.stringify(list));
  showToast(`Succès débloqué : ${ACHIEVEMENTS[id]} (${list.length}/4)`);
  window.dispatchEvent(new CustomEvent('fx:achievements'));
}

function showToast(message: string): void {
  let container = document.getElementById('fx-toasts');
  if (!container) {
    container = document.createElement('div');
    container.id = 'fx-toasts';
    container.style.cssText =
      'position:fixed;bottom:1.25rem;left:1.25rem;z-index:50;display:flex;flex-direction:column;gap:0.5rem;pointer-events:none';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText =
    'background:var(--card);color:var(--card-foreground);border:1px solid var(--border);border-radius:0.75rem;padding:0.6rem 0.9rem;font-size:0.8rem;box-shadow:0 8px 30px oklch(0 0 0 / 0.15);opacity:0;transform:translateY(8px);transition:opacity 0.3s,transform 0.3s';
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

function initAchievements(): void {
  // explorateur : pages distinctes visitées (persiste entre les sessions)
  try {
    const visited: string[] = JSON.parse(localStorage.getItem(VISITED_KEY) || '[]');
    if (!visited.includes(location.pathname)) {
      visited.push(location.pathname);
      localStorage.setItem(VISITED_KEY, JSON.stringify(visited.slice(-12)));
    }
    if (visited.length >= 3) unlock('explorateur');
  } catch {
    /* stockage indisponible : on ignore */
  }

  // nocturne : rendu en mode sombre
  if (document.documentElement.classList.contains('dark')) unlock('nocturne');

  // curieux : activation des effets
  window.addEventListener('fx:change', ((e: CustomEvent<boolean>) => {
    if (e.detail) unlock('curieux');
  }) as EventListener);

  // rétro : Konami
  const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pos = 0;
  document.addEventListener('keydown', (e) => {
    pos = e.key === sequence[pos] ? pos + 1 : e.key === sequence[0] ? 1 : 0;
    if (pos === sequence.length) {
      pos = 0;
      unlock('retro');
    }
  });
}
