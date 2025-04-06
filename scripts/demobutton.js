const button = document.getElementById("demo-button1");
const buttonText = document.getElementById("demo-button-text");

const metaViewport = document.querySelector("meta[name='viewport']");

button.addEventListener("click", () => {
  const elem = document.documentElement;

  if (!document.fullscreenElement && 
      !document.webkitFullscreenElement && 
      !document.msFullscreenElement) {

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
      elem.msRequestFullscreen();
    }

    if (metaViewport) {
      metaViewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
    }

    document.body.style.zoom = "100%";

    buttonText.textContent = "Exit Demo";
  } else {

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE11
      document.msExitFullscreen();
    }

    if (metaViewport) {
      metaViewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=3, user-scalable=yes");
    }

    document.body.style.zoom = "100%";

    buttonText.textContent = "Demo";
  }
});
