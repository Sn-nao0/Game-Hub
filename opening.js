document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  if (playButton) {
    playButton.addEventListener("click", () => {
      window.location.href = "playerSetup.html";
    });
  }
});
