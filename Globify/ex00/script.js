const clientID = '06e111fc44f745d981f0d40b7cd6362b';
const redirectURI = 'http://localhost/callback';
let token = localStorage.getItem('spotifyToken');

// 1. Función para redirigir al usuario a la página de autenticación
function authenticateSpotify() {
  const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=user-read-private user-read-email playlist-read-private user-library-read`;
  window.location = url;
}

// 2. Verificar si hay token en la URL
function getTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
}

// 3. Almacenar el token y redirigir al inicio
function handleRedirect() {
  token = getTokenFromUrl();
  if (token) {
    localStorage.setItem('spotifyToken', token);
    window.location.hash = '';
    displayUserProfile();
  }
}

// 4. Función para cerrar sesión
function logout() {
  localStorage.removeItem('spotifyToken');
  token = null;
  document.getElementById('loginBtn').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'none';
  document.getElementById('profile-section').innerHTML = '';
}

// 5. Función para mostrar el perfil del usuario
async function displayUserProfile() {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const userData = await response.json();
  const profileSection = document.getElementById('profile-section');
  profileSection.innerHTML = `
    <h2>Bienvenido, ${userData.display_name}</h2>
    <img src="${userData.images[0]?.url}" alt="Foto de perfil" width="100">
    <p>Email: ${userData.email}</p>
  `;
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('logoutBtn').style.display = 'block';
}

// 6. Función para cargar listas de reproducción
async function loadPlaylists() {
  const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=10', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const playlists = await response.json();
  const playlistSection = document.getElementById('playlist-section');
  playlistSection.innerHTML = `<h3>Mis Listas de Reproducción</h3>`;
  playlists.items.forEach(playlist => {
    const playlistDiv = document.createElement('div');
    playlistDiv.innerHTML = `
      <h4>${playlist.name}</h4>
      <img src="${playlist.images[0]?.url}" width="100">
    `;
    playlistSection.appendChild(playlistDiv);
  });
}

// Event Listeners
document.getElementById('loginBtn').addEventListener('click', authenticateSpotify);
document.getElementById('logoutBtn').addEventListener('click', logout);

// Manejo del token al cargar la página
window.addEventListener('load', () => {
  if (window.location.hash) {
    handleRedirect();
  } else if (token) {
    displayUserProfile();
    loadPlaylists();
  }
});
