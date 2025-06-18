// 🌙 Theme Switcher
const toggle = document.getElementById('theme-toggle');
toggle?.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// GitHub Search Logic
const input = document.getElementById('github-username');
const fetchBtn = document.getElementById('fetch-btn');
const profileContainer = document.getElementById('github-profile-container');
const reposContainer = document.getElementById('github-repos-container');

async function fetchGitHubData(username) {
  try {
    // Fetch profile
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error("User not found");
    const user = await userRes.json();

    // Fetch repos
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await repoRes.json();

    // Profile Card HTML
    const profileHTML = `
      <div class="card">
        <div class="card-header">
          <img src="${user.avatar_url}" alt="Avatar" width="50" style="border-radius: 50%;" />
          <span>@${user.login}</span>
        </div>
        <h2>${user.name || 'No Name'}</h2>
        <p>${user.bio || 'No bio available'}</p>
        <p>Followers: ${user.followers} | Following: ${user.following}</p>
        <p>Public Repos: ${user.public_repos}</p>
        <a href="${user.html_url}" target="_blank">Visit GitHub Profile</a>
      </div>
    `;

    // Repos List
    const reposHTML = repos.map(repo => `
      <div class="card">
        <div class="card-header">
          <a href="${repo.html_url}" target="_blank"><strong>${repo.name}</strong></a>
        </div>
        <p>${repo.description || 'No description'}</p>
        <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks}</p>
      </div>
    `).join('');

    // Render
    profileContainer.innerHTML = profileHTML;
    reposContainer.innerHTML = reposHTML;
  } catch (err) {
    profileContainer.innerHTML = `<p style="color:red;">${err.message}</p>`;
    reposContainer.innerHTML = '';
  }
}

// Trigger fetch on button click
fetchBtn?.addEventListener('click', () => {
  const username = input.value.trim();
  if (username) fetchGitHubData(username);
});

