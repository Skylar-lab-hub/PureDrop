/* Tiny hash router: link clicks + popstate, no page reloads.
   Routes use hash URLs (#home, #products, #contact) so deep links and
   refresh keep working on GitHub Pages. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var SUFFIX = ' – PureDrop Dairy';
  var routes = {
    home:     { title: 'PureDrop Dairy – fresh milk at your door every morning' },
    products: { title: 'Our milk' + SUFFIX, onEnter: loadProducts },
    contact:  { title: 'Start your delivery' + SUFFIX }
  };

  function isRoute(name) {
    return Object.prototype.hasOwnProperty.call(routes, name);
  }

  // Products view: fetch the products.html template once, then render the cards.
  async function loadProducts(view) {
    if (!view.dataset.loaded) {
      try {
        var res = await fetch(view.dataset.src);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        view.innerHTML = await res.text();
        view.dataset.loaded = 'true';
      } catch (err) {
        view.innerHTML = '<h2 id="products-title">Our milk</h2>' +
          '<p class="status">We could not load this page. Check your connection and reload.</p>';
        return;
      }
    }
    try {
      var mod = await import('./products.js'); // loaded only when Products is opened
      await mod.renderProducts();
    } catch (err) {
      var s = view.querySelector('.status');
      if (s) s.textContent = 'We could not load the products. Reload the page to try again.';
    }
  }

  async function navigate(name, opts) {
    opts = opts || {};
    var route = routes[name];

    document.querySelectorAll('.view').forEach(function (v) {
      v.classList.toggle('active', v.id === name);
    });
    document.querySelectorAll('nav a').forEach(function (a) {
      if (a.getAttribute('href') === '#' + name) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    document.title = route.title;

    var toggle = document.getElementById('menu-toggle');
    if (toggle) toggle.checked = false; // close mobile menu

    var view = document.getElementById(name);
    if (route.onEnter) await route.onEnter(view);

    if (!opts.initial) {
      window.scrollTo(0, 0);
      var heading = view.querySelector('h1, h2');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    }
  }

  function routeFromHash() {
    var name = location.hash.slice(1) || 'home';
    return isRoute(name) ? name : null;
  }

  // Link clicks
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var name = a.getAttribute('href').slice(1);
    if (!isRoute(name)) return; // e.g. the skip link (#content) behaves normally
    e.preventDefault();
    if (location.hash !== '#' + name) history.pushState({ route: name }, '', '#' + name);
    navigate(name);
  });

  // Back / forward buttons
  window.addEventListener('popstate', function () {
    var name = routeFromHash();
    if (name) navigate(name);
  });

  // First load (supports deep links such as index.html#products)
  navigate(routeFromHash() || 'home', { initial: true });
})();
