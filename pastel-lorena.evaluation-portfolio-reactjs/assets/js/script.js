// Contraintes JS obligatoires : querySelector, addEventListener, createElement, prepend/appendChild, remove
// Interdit : innerHTML pour générer entièrement un commentaire

const form = document.querySelector('#comment-form');
const nomInput = document.querySelector('#nom');
const messageInput = document.querySelector('#message');
const errorDiv = document.querySelector('#error');
const list = document.querySelector('#comment-list');

function showError(text) {
  errorDiv.textContent = text;
  errorDiv.classList.remove('hidden');
}

function clearError() {
  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');
}

function createCommentElement(nom, texte) {
  const article = document.createElement('article');
  article.className = 'comment';

  const strong = document.createElement('strong');
  strong.textContent = nom;

  const p = document.createElement('p');
  p.textContent = texte;

  const btn = document.createElement('button');
  btn.className = 'button-delete';
  btn.textContent = '🗑️ Supprimer';
  
  btn.addEventListener('click', function() {
    article.remove();
  });

  article.appendChild(strong);
  article.appendChild(p);
  article.appendChild(btn);

  return article;
}

// Gestion des boutons Supprimer déjà présents
document.querySelectorAll('.button-delete').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const card = btn.closest('.comment');
    card.remove();
  });
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  clearError();

  const nom = nomInput.value.trim();
  const texte = messageInput.value.trim();

  if (nom.length < 2) {
    showError('Le nom doit contenir au moins 2 caractères.');
    return;
  }
  if (texte.length < 10) {
    showError('Le commentaire doit contenir au moins 10 caractères.');
    return;
  }

  const newComment = createCommentElement(nom, texte);
  list.prepend(newComment);
  form.reset();
});