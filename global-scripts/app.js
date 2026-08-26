const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.innerHTML = `
<div class="inner">
  <nav>
    <button id="nav-toggle" class="btn btn-nav hamburger" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-menu">☰</button>
    <a href="/developer-playground" class="brand">Developer<br>Playground</a>
    <ul id="nav-menu">
      <li><a href="/developer-playground">Home</a></li>
      <li><a href="/developer-playground/about">About</a></li>
      <li><a href="/developer-playground#projects">Projects</a></li>
    </ul>
    <button id="theme-toggle" class="btn btn-nav" type="button" aria-label="Toggle light/dark mode">🌓</button>
  </nav>
</div>
`;

footer.innerHTML = `
  <div class="inner">
    <p>&copy; ${new Date().getFullYear()} <a href="https://aliciasecord.com" target="_blank">Alicia Secord</a></p>
  </div>
`;

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function setNavOpen(isOpen) {
  navMenu.classList.toggle('open', isOpen);
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.textContent = isOpen ? '✖' : '☰';
}

navToggle.addEventListener('click', () => {
  setNavOpen(!navMenu.classList.contains('open'));
});

navMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    setNavOpen(false);
  }
});

document.addEventListener('click', (e) => {
  if (!navMenu.classList.contains('open')) return;
  if (e.target === navToggle || navMenu.contains(e.target)) return;
  setNavOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    setNavOpen(false);
    navToggle.focus();
  }
});