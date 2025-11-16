(function () {
  // Elements present at load
  const audio   = document.getElementById('bg-audio');       // rain
  const thunder = document.getElementById('sfx-thunder');    // thunder SFX
  const paper   = document.getElementById('sfx-paper');      // paper SFX
  const muteBtn = document.getElementById('mute-btn');
  const hint    = document.getElementById('autoplay-hint');
  const playBtn = document.getElementById('play-btn');
  const sceneRoot = document.getElementById('scene-root');
  const fadeLayer = document.getElementById('fade-overlay');

  // Modal refs (may be present or created dynamically)
  let modal = document.getElementById('image-modal');
  let modalClose = document.getElementById('modal-close');
  let modalImg = modal ? modal.querySelector('.image-modal__img') : null;
  let lastFocusedEl = null;

  // Game state
  const state = {
    notebookOpened: false,
  };

  // Config
  const TARGET_VOLUME  = 0.5;  // rain
  const THUNDER_VOLUME = 0.8;  // thunder
  const PAPER_VOLUME   = 0.9;  // paper
  const STORAGE_KEY = 'etf_sound_muted';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scenes
  const scenes = {
    intro: {
      bodyClass: 'scene-intro',
      title: 'Escape the Flood',
      lead: 'Can you escape before the flood?',
      showPlay: true,
      extraHTML: ''
    },
    cell: {
      bodyClass: 'scene-cell',
      title: '',
      lead:
        'You awake to the sound of heavy rain and occasional booming thunder. The room is slightly dark with a dim light. ' +
        'Cold concrete walls are lined with indiscernible writings and markings. Bars are fastened tightly over the only narrow window. \n\n' +
        'You realize you are in a prison cell of sorts, potentially trapped here. You look down and see a small notebook with a list written on it.',
      showPlay: false,
      extraHTML: `
        <p>
          <button id="open-notebook" class="btn btn-action">You pick up the notebook</button>
        </p>
      `
    },
    corridor: {
      bodyClass: 'scene-corridor',
      title: '',
      lead:
        "After reading the list, you are left with more questions than answers. Who is Jerry? Where even are you? As you ponder the endless possibilities, you decide to:",
      showPlay: false,
      extraHTML: `
        <div class="choice-list">
          <button id="btn-viewport"   class="btn btn-action btn-choice">Look out the door's viewport</button>
          <button id="btn-yell-jerry" class="btn btn-action btn-choice">Yell for Jerry</button>
          <button id="btn-give-up"    class="btn btn-action btn-choice">Give up</button>
        </div>
      `
    },
    viewport: {
      bodyClass: 'scene-viewport',
      title: 'Through the Viewport',
      lead:
        'You press your eye to the rusted slot. A light flickers across wet stone, and distant footsteps smear into the rain. ' +
        'For a heartbeat, a shadow pauses—then is gone.',
      showPlay: false,
      extraHTML: ''
    },
    callJerry: {
      bodyClass: 'scene-corridor', // same background as corridor
      title: '“Jerry!”',
      lead:
        'You call out, voice bouncing down unseen halls. \n\n' +
        'Silence… then a hoarse whisper on the other side of the door: “Keep it down. They listen.”',
      showPlay: false,
      extraHTML: `
        <p><button id="back-to-corridor" class="btn btn-action">Back</button></p>
      `
    },
    ending1: {
      bodyClass: 'scene-ending',
      title: 'Ending #1-resignation',   // exact text requested
      lead:
        'You sink to the floor. The notebook lies open, ink bleeding in the damp air. \n\n' +
        'Outside, water eats at the walls. You close your eyes, and the sound becomes everything.',
      showPlay: false,
      extraHTML: `
        <p><button id="restart-btn" class="btn btn-action">Restart</button></p>
      `
    }
  };

  /* ---------- Utility: unified scene transition ---------- */

  async function goToScene(key, preloadSrc) {
    await fadeScreen(true);
    if (preloadSrc) { const img = new Image(); img.src = preloadSrc; }
    renderScene(key);
    await fadeScreen(false);
  }

  /* ---------- Modal helpers ---------- */

  function ensureModal() {
    if (!document.getElementById('image-modal')) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div id="image-modal" class="image-modal" role="dialog" aria-modal="true"
             aria-labelledby="image-modal-title" aria-hidden="true">
          <div class="image-modal__box">
            <button id="modal-close" class="image-modal__close" aria-label="Close (Esc)">✕</button>
            <img class="image-modal__img" src="assets/img/notebook.jpg" alt="Notebook with a handwritten list" />
            <h2 id="image-modal-title" class="visually-hidden">Notebook</h2>
          </div>
        </div>`;
      document.body.appendChild(wrapper.firstElementChild);
    }
    modal = document.getElementById('image-modal');
    modalClose = document.getElementById('modal-close');
    modalImg = modal.querySelector('.image-modal__img');

    if (!modal.dataset.wired) {
      modal.dataset.wired = 'true';
      modalClose.addEventListener('click', closeNotebookModal);
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
          e.preventDefault();
          closeNotebookModal();
        }
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeNotebookModal();
      });
    }
  }

  async function playPaperSfx() {
    if (!paper) return;
    if (audio.muted) return; // honor global mute
    try {
      paper.volume = PAPER_VOLUME;
      paper.currentTime = 0;
      await paper.play();
    } catch { /* ignore */ }
  }

  function openNotebookModal() {
    ensureModal();
    lastFocusedEl = document.activeElement;
    playPaperSfx();

    if (!state.notebookOpened) {
      state.notebookOpened = true;
      // Re-render cell to inject Continue
      renderScene('cell');
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
    if (modalImg && !modalImg.src.includes('notebook.jpg')) {
      modalImg.src = 'assets/img/notebook.jpg';
    }
  }

  function closeNotebookModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  /* ---------- UI helpers ---------- */

  function updateMuteButtonIcon() {
    const isMuted = audio.muted || audio.volume === 0;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
    muteBtn.setAttribute('aria-pressed', String(isMuted));
    muteBtn.setAttribute('aria-label', isMuted ? 'Unmute background audio' : 'Mute background audio');
    muteBtn.title = isMuted ? 'Unmute (M)' : 'Mute (M)';
  }

  function fadeScreen(toBlack) {
    return new Promise((resolve) => {
      if (reducedMotion) {
        fadeLayer.classList.toggle('is-visible', toBlack);
        resolve();
        return;
      }
      const done = () => resolve();
      fadeLayer.addEventListener('transitionend', done, { once: true });
      fadeLayer.classList.toggle('is-visible', toBlack);
      setTimeout(done, 520);
    });
  }

  function renderScene(key) {
    const sc = scenes[key];
    document.body.classList.remove(...Object.values(scenes).map(s => s.bodyClass));
    document.body.classList.add(sc.bodyClass);

    sceneRoot.innerHTML = `
      <section class="text-card">
        <h1 class="${key === 'ending1' ? 'ending-title' : ''}">${sc.title}</h1>
        <p class="lead">${(sc.lead || '').replace(/\n/g, '<br>')}</p>
        ${sc.showPlay ? `
          <p class="play-btn">
            <button id="play-btn" class="btn btn-play" aria-label="Begin">▶</button>
          </p>
        ` : ``}
        ${sc.extraHTML || ``}
        ${key === 'cell' && state.notebookOpened ? `
          <p>
            <button id="continue-btn" class="btn btn-continue">Continue</button>
          </p>
        ` : ``}
      </section>
    `;

    // Bind per-scene events
    const newPlayBtn = document.getElementById('play-btn');
    if (newPlayBtn) newPlayBtn.addEventListener('click', handleBegin);

    const openNotebookBtn = document.getElementById('open-notebook');
    if (openNotebookBtn) openNotebookBtn.addEventListener('click', openNotebookModal);

    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) continueBtn.addEventListener('click', handleContinue);

    // Corridor choices
    const btnViewport = document.getElementById('btn-viewport');
    const btnJerry    = document.getElementById('btn-yell-jerry');
    const btnGiveUp   = document.getElementById('btn-give-up');

    if (btnViewport) btnViewport.addEventListener('click', () => goToScene('viewport', 'assets/img/jail2.jpg'));
    if (btnJerry)    btnJerry.addEventListener('click', () => goToScene('callJerry', 'assets/img/jail2.jpg'));
    if (btnGiveUp)   btnGiveUp.addEventListener('click', () => goToScene('ending1', 'assets/img/jail1-blur.jpg'));

    // Jerry Back button
    const backBtn = document.getElementById('back-to-corridor');
    if (backBtn) backBtn.addEventListener('click', () => goToScene('corridor', 'assets/img/jail2.jpg'));

    // Ending restart
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.addEventListener('click', () => {
      state.notebookOpened = false;
      goToScene('intro', 'assets/img/jail1-blur.jpg');
    });
  }

  async function handleBegin() {
    await goToScene('cell', 'assets/img/jail1.jpg');
  }

  async function handleContinue() {
    await goToScene('corridor', 'assets/img/jail2.jpg');
  }

  /* ---------- Thunder scheduling ---------- */

  thunder.volume = THUNDER_VOLUME;
  let thunderScheduled = false;
  let thunderTimer = null;

  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function queueNextThunder() {
    const delayMs = randInt(30, 90) * 1000;
    clearTimeout(thunderTimer);
    thunderTimer = setTimeout(playThunderOnce, delayMs);
  }

  async function playThunderOnce() {
    if (audio.muted) { queueNextThunder(); return; }
    if (!thunder.paused) { queueNextThunder(); return; }
    try {
      thunder.currentTime = 0;
      await thunder.play();
    } catch { /* ignore */ }
    finally {
      queueNextThunder();
    }
  }

  function startThunderScheduleIfNeeded() {
    if (!thunderScheduled) {
      thunderScheduled = true;
      queueNextThunder();
    }
  }

  /* ---------- Autoplay logic (rain) — NO fade-in ---------- */

  const savedMuted = localStorage.getItem(STORAGE_KEY);
  const prefersMuted = savedMuted === 'true';

  audio.loop = true;
  audio.preload = 'auto';
  audio.setAttribute('playsinline', '');
  audio.volume = TARGET_VOLUME;
  audio.muted = false;

  async function tryAutoplay() {
    if (prefersMuted) audio.muted = true;

    try {
      audio.muted = !!prefersMuted;
      await audio.play();
      if (hint) hint.hidden = true;
      if (!audio.muted) startThunderScheduleIfNeeded();
    } catch {
      audio.muted = true;
      try { await audio.play(); } catch {}
      if (hint) hint.hidden = false;

      const unmuteOnce = () => {
        audio.muted = false;
        audio.volume = TARGET_VOLUME;
        if (hint) hint.hidden = true;
        startThunderScheduleIfNeeded();
        window.removeEventListener('pointerdown', unmuteOnce);
        window.removeEventListener('keydown', unmuteOnce);
        syncMuteToSfx();
        updateMuteButtonIcon();
      };
      window.addEventListener('pointerdown', unmuteOnce, { once: true });
      window.addEventListener('keydown', unmuteOnce, { once: true });
    }

    syncMuteToSfx();
    updateMuteButtonIcon();
  }

  // Keep all SFX in sync with the master mute
  function syncMuteToSfx() {
    thunder.muted = audio.muted;
    if (paper) paper.muted = audio.muted;
  }

  /* ---------- Controls ---------- */

  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    localStorage.setItem(STORAGE_KEY, String(audio.muted));
    syncMuteToSfx();
    if (!audio.muted) startThunderScheduleIfNeeded();
    updateMuteButtonIcon();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      muteBtn.click();
    }
  });

  // Bind initial ▶ button if present on first render
  if (playBtn) playBtn.addEventListener('click', handleBegin);

  // Boot
  window.addEventListener('DOMContentLoaded', tryAutoplay);
  audio.addEventListener('volumechange', updateMuteButtonIcon);
  updateMuteButtonIcon();
})();
