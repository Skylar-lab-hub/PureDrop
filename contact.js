/* ES module, loaded on demand by router.js via import().
   Live validation for the contact form: checks a field when the user leaves it,
   then re-checks on every keystroke. Messages go in the field's .err element,
   which is announced by screen readers (aria-live). */

var MESSAGES = {
  name:    { empty: 'Enter your name.',          short: 'Name must be at least 2 characters.' },
  email:   { empty: 'Enter your email address.', bad:   'Enter a valid email, like name@example.com.' },
  message: { empty: 'Write a short message.',    short: 'Message must be at least 10 characters.' }
};

function validate(field) {
  var m = MESSAGES[field.name];
  var value = field.value.trim();
  if (!value) return m.empty;
  if (field.validity.typeMismatch) return m.bad;
  if (field.minLength > 0 && value.length < field.minLength) return m.short;
  return '';
}

function show(field, message) {
  var err = document.getElementById(field.id + '-err');
  if (err) err.textContent = message;
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

export function initContact(view) {
  var form = view.querySelector('#contact-form');
  if (!form || form.dataset.ready) return; // set up once
  form.dataset.ready = 'true';

  var fields = Array.prototype.slice.call(form.querySelectorAll('input, textarea'));
  var status = form.querySelector('#form-status');

  fields.forEach(function (f) {
    f.addEventListener('blur', function () {
      f.dataset.touched = 'true';
      show(f, validate(f));
    });
    f.addEventListener('input', function () {
      if (f.dataset.touched) show(f, validate(f));
    });
  });

  form.addEventListener('submit', function (e) {
    var first = null, count = 0;
    fields.forEach(function (f) {
      f.dataset.touched = 'true';
      var msg = validate(f);
      show(f, msg);
      if (msg) { count++; if (!first) first = f; }
    });
    if (first) {
      e.preventDefault();
      status.textContent = count === 1 ? 'Please fix 1 field.' : 'Please fix ' + count + ' fields.';
      first.focus();
    } else {
      status.textContent = 'Opening your email app…';
    }
  });
}
