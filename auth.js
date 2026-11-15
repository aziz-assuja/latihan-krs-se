// BUG-01 (tugas bug fixing): login hanya memeriksa username, belum memeriksa password.
$("loginForm").addEventListener("submit", event => {
  event.preventDefault();
  const username = $("username").value.trim();
  const password = $("password").value;
  if (username === KRS_USER.username) {
    localStorage.setItem(KRS_KEY.session, JSON.stringify({ username }));
    $("loginError").textContent = ""; showApp();
  } else {
    $("loginError").textContent = "Username atau password tidak sesuai.";
  }
});
