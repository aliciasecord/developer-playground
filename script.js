const projectsHome = document.getElementById('projects-home');
const logHome = document.getElementById('log-home');

const recentProjects = projects
  .filter((p) => p.status === 'live' || p.status === 'in-progress')
  .sort((a, b) => b.number - a.number)
  .slice(0, 5);

projectsHome.innerHTML = recentProjects
  .map((p) => `
    <article class="card card-project">
      <p class="project-status">${p.status === 'live' ? 'Live' : 'In Progress'}</p>
      <h3><a href="${p.path}">${p.title}</a></h3>
      <p>${p.description}</p>
    </article>
  `)
  .join('');


const recentLogs = logs
  .filter((l) => l.status === 'live')
  .sort((a, b) => b.day - a.day)
  .slice(0, 5);

logHome.innerHTML = `
  <ul class="log-list">
    ${recentLogs
      .map(
        (l) => `
      <li>
        <h3><a href="${l.path}">${l.title}</a></h3>
        <p><span class="log-date">${l.date}</span></p>
      </li>
    `
      )
      .join('')}
  </ul>
`;
