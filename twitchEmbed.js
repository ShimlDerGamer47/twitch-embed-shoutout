document.addEventListener("DOMContentLoaded", function () {
  // Twitch Clip Embed URL setzen
  function twitchEmbedToken() {
    const twitchEmbed = document.getElementById("twitchEmbedId");
    if (!twitchEmbed) return;

    const params = new URLSearchParams(window.location.search);
    const clipId = params.get("clipId");

    if (!clipId) {
      console.warn("Kein 'clipId' Parameter in der URL gefunden.");
      return;
    }

    const domain = window.location.href;

    twitchEmbed.src = `https://clips.twitch.tv/embed?clip=${clipId}&parent=${domain}&autoplay=true&muted=false`;
  }
  twitchEmbedToken();
});
