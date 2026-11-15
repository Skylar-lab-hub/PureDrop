/* ES module, loaded on demand by router.js via import().
   Fetches products.json and builds the product cards from the template in products.html */

export async function renderProducts() {
  var grid = document.getElementById('product-grid');
  var status = document.getElementById('products-status');
  var tpl = document.getElementById('product-card-template');
  if (!grid || !status || !tpl) return;

  if (grid.children.length) { status.hidden = true; return; } // already rendered

  status.hidden = false;
  status.textContent = 'Loading our milk…';

  try {
    var res = await fetch('products.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var items = await res.json();

    var frag = document.createDocumentFragment();
    items.forEach(function (p) {
      var card = tpl.content.cloneNode(true);
      var img = card.querySelector('img');
      img.src = p.image;
      img.alt = p.alt || p.name;
      card.querySelector('h2').textContent = p.name;
      card.querySelector('.desc').textContent = p.description;
      card.querySelector('.price').textContent = 'Rs. ' + Number(p.price).toLocaleString('en-PK');
      frag.appendChild(card);
    });
    grid.appendChild(frag);
    status.hidden = true;
  } catch (err) {
    status.textContent = 'We could not load the products. Check your connection and ';
    var retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'linklike';
    retry.textContent = 'try again';
    retry.addEventListener('click', renderProducts);
    status.appendChild(retry);
    status.appendChild(document.createTextNode('.'));
  }
}
