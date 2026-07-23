/* ============================================================
   HOME.JS — Page-specific JavaScript for index.html
   Author: Rasal Musthafa
   Dependencies: js/main.js must be loaded first.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----- Notification Ticker -----
     Duplicate the ticker items so the scroll animation
     loops seamlessly without a visible jump.
  */
  var track = qs('.notifications-ticker__track');
  if (track) {
    var items = track.innerHTML;
    // Append a copy so the animation wraps around
    track.innerHTML = items + items;
  }

});
