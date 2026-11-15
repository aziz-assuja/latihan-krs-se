// BUG-02 (tugas bug fixing): pemilihan mata kuliah belum membatasi total 24 SKS.
$("courseRows").addEventListener("click", event => {
  const button = event.target.closest("[data-id]"); if (!button) return;
  const id = button.dataset.id;
  const alreadySelected = selectedCourses.includes(id);
  if (!alreadySelected) {
    const candidate = KRS_COURSES.find(course => course.id === id);
    // Hook ini diaktifkan oleh FEATURE-02 melalui feature-conflict.js.
    if (typeof hasScheduleConflict === "function" && hasScheduleConflict(candidate, getSelectedCourseObjects())) {
      $("message").textContent = "Jadwal mata kuliah ini bentrok dengan mata kuliah yang sudah dipilih.";
      return;
    }
  }
  selectedCourses = alreadySelected
    ? selectedCourses.filter(x => x !== id)
    : [...selectedCourses, id];
  localStorage.setItem(KRS_KEY.selected, JSON.stringify(selectedCourses));
  $("message").textContent = ""; renderCourses(); renderSummary();
});
$("save").addEventListener("click", () => {
  localStorage.setItem(KRS_KEY.saved, JSON.stringify({courseIds:selectedCourses,savedAt:new Date().toISOString()}));
  $("status").textContent = "Tersimpan"; $("message").textContent = "Rencana studi tersimpan secara lokal.";
});
