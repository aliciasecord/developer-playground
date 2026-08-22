const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.innerHTML = `
  <nav>
    <a href="/">Developer Playground</a>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/#projects">Projects</a></li>
    </ul>
    <button id="theme-toggle" class="btn" type="button" aria-label="Toggle light/dark mode">🌓</button>
  </nav>
`;

footer.innerHTML = `
  <p>&copy; ${new Date().getFullYear()} <a href="https://aliciasecord.com" target="_blank">Alicia Secord</a></p>
`;

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});
