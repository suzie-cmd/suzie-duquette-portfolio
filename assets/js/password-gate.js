/* =========================================================
   Password gate — client-side soft lock
   ---------------------------------------------------------
   Soft gate: hides project pages behind a password prompt.
   Not real security — anyone who reads the source can see
   the hash and brute-force it. Fine for keeping a portfolio
   project page out of casual / recruiter view.

   How it works:
   - Inline script at the top of each protected page adds
     class="locked" to <html> so the body is hidden via CSS.
   - This file checks sessionStorage for an unlock flag.
     If unlocked, it removes the class and shows the page.
     Otherwise it renders an overlay with a password field.
   - On submit it SHA-256s the input and compares against
     the hardcoded hash below. Match → unlock + remember.
   ========================================================= */

(function () {
  'use strict';

  // SHA-256 hash of the gate password.
  // To change the password: hash the new one and replace this.
  //   echo -n 'YourNewPassword' | shasum -a 256
  var EXPECTED_HASH =
    '3fabf61eb488ef3790df5a3ce830844e39cd1839420e3f8419a6189be372fde1';

  var STORAGE_KEY = 'portfolio_unlock_v2';

  function unlock() {
    document.documentElement.classList.remove('locked');
    try {
      sessionStorage.setItem(STORAGE_KEY, EXPECTED_HASH);
    } catch (e) {
      /* private mode, no-op */
    }
    var overlay = document.getElementById('pw-gate');
    if (overlay) overlay.remove();
  }

  function isAlreadyUnlocked() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === EXPECTED_HASH;
    } catch (e) {
      return false;
    }
  }

  async function sha256(text) {
    var enc = new TextEncoder().encode(text);
    var buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, '0'); })
      .join('');
  }

  function buildOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'pw-gate';
    overlay.innerHTML = [
      '<div class="pw-gate__panel" role="dialog" aria-labelledby="pw-gate-title" aria-modal="true">',
      '  <p class="pw-gate__eyebrow">Protected case study</p>',
      '  <h1 class="pw-gate__title" id="pw-gate-title">This project is private.</h1>',
      '  <p class="pw-gate__lede">Enter the password to view. If you don’t have one, please reach out.</p>',
      '  <form class="pw-gate__form" autocomplete="off">',
      '    <label class="pw-gate__label" for="pw-gate-input">Password</label>',
      '    <input class="pw-gate__input" id="pw-gate-input" type="password" autocomplete="current-password" autofocus required>',
      '    <button class="pw-gate__submit" type="submit">Unlock</button>',
      '    <p class="pw-gate__error" role="alert" aria-live="polite"></p>',
      '  </form>',
      '</div>'
    ].join('\n');

    // Scoped styles, no extra CSS file needed.
    var style = document.createElement('style');
    style.textContent = [
      'html.locked, html.locked body { overflow: hidden; }',
      'html.locked body > *:not(#pw-gate) { visibility: hidden !important; }',
      '#pw-gate {',
      '  position: fixed; inset: 0; z-index: 9999;',
      '  display: flex; align-items: center; justify-content: center;',
      '  padding: 24px;',
      '  background: var(--paper, #F5F2EC);',
      '  font-family: var(--font-sans, "Inter", -apple-system, BlinkMacSystemFont, sans-serif);',
      '  color: var(--ink, #16161A);',
      '  visibility: visible;',
      '  animation: pw-gate-fade 320ms cubic-bezier(0.2, 0.7, 0.2, 1) both;',
      '}',
      '@keyframes pw-gate-fade { from { opacity: 0; } to { opacity: 1; } }',
      '.pw-gate__panel {',
      '  width: 100%; max-width: 460px;',
      '  background: var(--paper-pop, #FAF8F2);',
      '  border: 1px solid var(--rule, #D8D2C5);',
      '  border-radius: 12px;',
      '  padding: clamp(28px, 5vw, 44px);',
      '  box-shadow: 0 30px 60px -30px rgba(22, 22, 26, 0.18);',
      '}',
      '.pw-gate__eyebrow {',
      '  font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase;',
      '  color: var(--ink-soft, #57544D); margin: 0 0 12px;',
      '}',
      '.pw-gate__title {',
      '  font-family: var(--font-display, "Fraunces", Georgia, serif);',
      '  font-size: clamp(1.6rem, 3.4vw, 2.1rem); line-height: 1.1; font-weight: 350;',
      '  letter-spacing: -0.02em; margin: 0 0 12px;',
      '}',
      '.pw-gate__lede {',
      '  color: var(--ink-soft, #57544D); margin: 0 0 24px; font-size: 0.975rem;',
      '}',
      '.pw-gate__form { display: flex; flex-direction: column; gap: 10px; }',
      '.pw-gate__label {',
      '  font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;',
      '  color: var(--ink-soft, #57544D);',
      '}',
      '.pw-gate__input {',
      '  font: inherit; padding: 12px 14px;',
      '  background: var(--paper, #F5F2EC); color: var(--ink, #16161A);',
      '  border: 1px solid var(--rule, #D8D2C5); border-radius: 6px;',
      '  outline: none; transition: border-color 160ms ease, box-shadow 160ms ease;',
      '}',
      '.pw-gate__input:focus {',
      '  border-color: var(--ink, #16161A);',
      '  box-shadow: 0 0 0 3px rgba(232, 220, 74, 0.35);',
      '}',
      '.pw-gate__submit {',
      '  margin-top: 6px; padding: 12px 16px;',
      '  background: var(--ink, #16161A); color: var(--paper, #F5F2EC);',
      '  border-radius: 6px; font-weight: 500; letter-spacing: 0.02em;',
      '  cursor: pointer; transition: transform 120ms ease, opacity 160ms ease;',
      '}',
      '.pw-gate__submit:hover { opacity: 0.92; }',
      '.pw-gate__submit:active { transform: translateY(1px); }',
      '.pw-gate__submit[disabled] { opacity: 0.55; cursor: progress; }',
      '.pw-gate__error {',
      '  min-height: 1.2em; margin: 6px 0 0;',
      '  font-size: 0.875rem; color: #B6261A;',
      '}'
    ].join('\n');

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    var form  = overlay.querySelector('.pw-gate__form');
    var input = overlay.querySelector('.pw-gate__input');
    var btn   = overlay.querySelector('.pw-gate__submit');
    var err   = overlay.querySelector('.pw-gate__error');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      err.textContent = '';
      btn.disabled = true;
      try {
        var hash = await sha256(input.value);
        if (hash === EXPECTED_HASH) {
          unlock();
        } else {
          err.textContent = 'Incorrect password. Try again.';
          input.value = '';
          input.focus();
          btn.disabled = false;
        }
      } catch (ex) {
        err.textContent = 'Something went wrong. Refresh and try again.';
        btn.disabled = false;
      }
    });
  }

  function init() {
    if (isAlreadyUnlocked()) {
      unlock();
      return;
    }
    if (document.body) {
      buildOverlay();
    } else {
      document.addEventListener('DOMContentLoaded', buildOverlay, { once: true });
    }
  }

  init();
})();
