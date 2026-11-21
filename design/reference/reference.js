/*
  Kantlijn — reference behaviour (vanilla JS, for the static reference only).
  In Next.js these become small client components; see ../components.md.
  Everything here is progressive enhancement: the pages read fully without JS.
*/
(function () {
  var root = document.documentElement;

  /* 1. First-visit motion. The bubble pops and the short answer fades in,
        only the first time this article is opened in this session. */
  var article = document.querySelector('[data-slug]');
  if (article) {
    var key = 'kl-seen-' + article.getAttribute('data-slug');
    try {
      if (!sessionStorage.getItem(key)) { root.classList.add('first-visit'); sessionStorage.setItem(key, '1'); }
    } catch (e) { /* storage blocked: no animation, content is already there */ }
  }

  /* 2. Reading progress, measured over the article body only. */
  var body = document.querySelector('.article-body');
  var bars = document.querySelectorAll('[role="progressbar"]');
  if (body && bars.length) {
    var ticking = false;
    function update() {
      ticking = false;
      var r = body.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.5;
      var p = total > 0 ? Math.max(0, Math.min(100, Math.round((window.innerHeight * 0.5 - r.top) / total * 100))) : 0;
      document.body.style.setProperty('--progress', p + '%');
      bars.forEach(function (b) { b.setAttribute('aria-valuenow', String(p)); });
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* 3. Track filter on the front page. */
  var filter = document.querySelector('.track-filter');
  if (filter) {
    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('button'); if (!btn) return;
      var track = btn.getAttribute('data-filter');
      filter.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      document.querySelectorAll('.notes-index__item').forEach(function (li) {
        li.hidden = !(track === 'all' || li.getAttribute('data-track') === track);
      });
    });
  }

  /* 4. Share: native share sheet where available, else copy the link. */
  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = location.href, title = document.title;
      if (navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
      if (navigator.clipboard) navigator.clipboard.writeText(url);
      btn.setAttribute('aria-label', 'Link gekopieerd');
    });
  });

  /* 5. Booking dialog. Native <dialog>: focus trap, Escape and focus return come free.
        Typed values survive closing; the form only resets after a successful send. */
  var dialog = document.getElementById('kennismaken');
  if (dialog) {
    var form = dialog.querySelector('form');
    var done = dialog.querySelector('[data-done]');
    var opener = null;
    document.querySelectorAll('[data-open-booking]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); opener = b; dialog.showModal(); dialog.querySelector('#booking-title').focus(); });
    });
    dialog.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', function () { dialog.close(); }); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); }); /* backdrop */
    dialog.addEventListener('close', function () { if (opener) opener.focus(); });

    function setError(id, show) {
      var input = document.getElementById(id), err = document.getElementById(id + '-error');
      if (input) input.setAttribute('aria-invalid', String(show));
      if (err) err.hidden = !show;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.naam.value.trim(), mail = form.email.value.trim(), ok = form.toestemming.checked;
      var mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
      setError('naam', !name); setError('email', !mailOk); setError('toestemming', !ok);
      if (!name) return form.naam.focus();
      if (!mailOk) return form.email.focus();
      if (!ok) return form.toestemming.focus();
      /* In Next.js: POST to a Server Action / route handler here. */
      done.querySelector('[data-sent-line]').textContent = form.zin.value.trim() || 'Ik wil graag kennismaken.';
      done.querySelector('[data-first-name]').textContent = ', ' + name.split(/\s+/)[0];
      done.querySelector('[data-email]').textContent = mail;
      form.hidden = true; done.hidden = false;
      done.querySelector('[data-done-title]').focus();
    });
    dialog.querySelectorAll('[data-finish]').forEach(function (b) {
      b.addEventListener('click', function () { form.reset(); form.hidden = false; done.hidden = true; dialog.close(); });
    });
  }
})();
