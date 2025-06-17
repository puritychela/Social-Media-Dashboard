// 🌙 1. Theme Switcher Logic
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// 🎯 2. GitHub Stats Fetch
const username = "eliudmuriithi"; // Replace with your GitHub username
const statsContainer = document.getElementById('stats-container');

async function fetchGitHubStats() {
  try {
    const res = await fetch(`https://api.github.com/${username}`);
    const data = await res.json();

    const card = `
      <div class="card">
        <div class="card-header">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Icon" width="20">
          <span>@${data.login}</span>
        </div>
        <h2>${data.followers}</h2>
        <p>Followers</p>
        <p class="today"><img src="images/icon-up.svg" alt="Up Icon"> ${data.public_repos} Repos</p>
      </div>
    `;

    // Inject GitHub stats card into the beginning
    statsContainer.insertAdjacentHTML('afterbegin', card);

  } catch (error) {
    console.error("Error fetching GitHub data:", error);
  }
}

fetchGitHubStats();
