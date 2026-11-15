// FEATURE-02 (tugas feature): implementasikan pemeriksaan bentrok jadwal.
// Kebutuhan: mata kuliah pada hari yang sama bentrok jika rentang waktunya beririsan.
// Batas waktu yang bersinggungan tepat (misalnya 10:30) bukan bentrok.
// IF201 dan IF202 tidak bentrok; IF209 bentrok dengan IF201 maupun IF202.
window.hasScheduleConflict = function (candidate, selected) {
  // TODO: bandingkan hari dan rentang waktu candidate dengan setiap mata kuliah selected.
  return false;
};
