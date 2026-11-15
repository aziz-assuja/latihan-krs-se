// Fungsi umum aplikasi. File tugas mahasiswa dipisahkan dari file ini.
window.$ = id => document.getElementById(id);
window.selectedCourses = JSON.parse(localStorage.getItem(KRS_KEY.selected) || "[]");
window.getSelectedCourseObjects = () => KRS_COURSES.filter(c => selectedCourses.includes(c.id));
window.renderSummary = function () {
  const chosen = getSelectedCourseObjects();
  const sks = chosen.reduce((sum, c) => sum + c.sks, 0);
  $("totalSks").textContent = sks; $("totalCount").textContent = chosen.length;
  $("dashSks").textContent = sks; $("dashCount").textContent = chosen.length;
};
window.renderCourses = function (list = KRS_COURSES) {
  const body = $("courseRows"); body.innerHTML = "";
  list.forEach(c => {
    const active = selectedCourses.includes(c.id), tr = document.createElement("tr");
    tr.innerHTML = `<td>${c.id}</td><td>${c.name}<br><small>${c.type} • Semester ${c.semester}</small></td><td>${c.sks}</td><td>${c.day}</td><td>${c.time}</td><td><button class="course-action ${active ? "remove" : ""}" data-id="${c.id}">${active ? "Hapus" : "Ambil"}</button></td>`;
    body.appendChild(tr);
  });
};
window.navigate = function (name) {
  document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
  $(name).classList.remove("hidden");
  $("title").textContent = ({dashboard:"Dashboard",krs:"Penyusunan KRS",jadwal:"Jadwal Kuliah",nilai:"Transkrip Nilai",profil:"Profil Mahasiswa"})[name];
  document.querySelectorAll("[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  if (name === "krs") { renderCourses(); if (typeof setupSearchFeature === "function") setupSearchFeature(); }
};
window.showApp = function () { $("login").classList.add("hidden"); $("app").classList.remove("hidden"); renderSummary(); };
window.showLogin = function () { $("login").classList.remove("hidden"); $("app").classList.add("hidden"); };
document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => navigate(b.dataset.view)));
$("logout").addEventListener("click", () => { localStorage.removeItem(KRS_KEY.session); showLogin(); });
if (localStorage.getItem(KRS_KEY.session)) showApp(); else showLogin();
