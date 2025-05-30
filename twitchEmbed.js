document.addEventListener("DOMContentLoaded", function () {
  function twitchEmbedContainerToken() {
    const twitchEmbedContainer = document.getElementById(
      "twitchEmbedContainerId"
    );
    if (!twitchEmbedContainer) return;

    const params = new URLSearchParams(window.location.search);
    const clipId = params.get("clipId");

    if (!clipId) {
      console.warn("Kein 'clipId' Parameter in der URL gefunden.");
      return;
    }

    const domain = window.location.hostname;

    twitchEmbedContainer.src = `https://clips.twitch.tv/embed?clip=${clipId}&parent=${domain}&autoplay=true&muted=false`;
  }
  twitchEmbedContainerToken();
});
