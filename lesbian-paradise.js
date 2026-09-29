(function () {
  document.body.classList.add('lp-js');

  function track(name) {
    if (!name) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name });
  }

  var items = Array.prototype.slice.call(document.querySelectorAll('.lp-accordion-item'));
  if (items.length) {
    if (window.matchMedia('(min-width: 641px)').matches) {
      items[0].open = true;
    } else {
      items.forEach(function (item) { item.open = false; });
    }

    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
        track('accordion_open_' + item.getAttribute('data-accordion'));
      });
    });
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.lp-reveal'));
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (element) { element.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  reveals.forEach(function (element) { observer.observe(element); });
})();
