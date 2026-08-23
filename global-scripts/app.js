const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.innerHTML = `
<div class="inner">
  <nav>
    <a href="/" class="brand">Developer<br>Playground</a>
    <div class="nav-row">
      <button id="nav-toggle" class="btn btn-nav hamburger" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-menu">☰</button>
      <ul id="nav-menu">
        <li><a href="/">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="/dev-playground#projects">Projects</a></li>
      </ul>
      <button id="theme-toggle" class="btn btn-nav" type="button" aria-label="Toggle light/dark mode">🌓</button>
    </div>
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

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('click', (e) => {
  if (!navMenu.classList.contains('open')) return;
  if (e.target === navToggle || navMenu.contains(e.target)) return;
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});
