/* Compatibilidade: faz os style-hover / style-active / style-focus (do Claude Design)
   funcionarem em HTML estático, e liga o menu mobile do header. */
(function () {
  // hover / active / focus a partir dos atributos style-*
  document.querySelectorAll('[style-hover],[style-active],[style-focus]').forEach(function (el) {
    var base = el.getAttribute('style') || '';
    var h = el.getAttribute('style-hover');
    var a = el.getAttribute('style-active');
    var f = el.getAttribute('style-focus');
    var apply = function (extra) { el.setAttribute('style', base + (extra ? ';' + extra : '')); };
    if (h) {
      el.addEventListener('mouseenter', function () { apply(h); });
      el.addEventListener('mouseleave', function () { apply(''); });
    }
    if (a) {
      el.addEventListener('mousedown', function () { apply(a); });
      el.addEventListener('mouseup', function () { apply(h || ''); });
      el.addEventListener('mouseleave', function () { apply(''); });
    }
    if (f) {
      el.addEventListener('focus', function () { apply(f); });
      el.addEventListener('blur', function () { apply(''); });
    }
  });

  // menu mobile do header
  var burger = document.querySelector('.sh-burger');
  var mobile = document.querySelector('.sh-mobile');
  if (burger && mobile) {
    burger.addEventListener('click', function () {
      var open = mobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobile.classList.remove('open'); });
    });
  }
})();
