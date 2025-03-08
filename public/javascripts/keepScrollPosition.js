document.addEventListener("DOMContentLoaded", function (event) {
  let scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition) {
    if (document.URL === document.referrer) {
      window.scrollTo(0, scrollPosition);
    }
    sessionStorage.removeItem('scrollPosition');
  }
});

window.addEventListener("beforeunload", function (event) {
  sessionStorage.setItem('scrollPosition', window.scrollY);
});