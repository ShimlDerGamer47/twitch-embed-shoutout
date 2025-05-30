document.addEventListener("DOMContentLoaded", function () {
  const twitchEmbed = document.getElementById("twitchEmbedId");
  if (!twitchEmbed) return;

  const params = new URLSearchParams(window.location.search);
  const clipId = params.get("clipId");

  if (!clipId) {
    console.warn("Kein 'clipId' Parameter in der URL gefunden.");
    return;
  }

  const domain = window.location.hostname;
  const embedUrl = `https://clips.twitch.tv/embed?clip=${clipId}&parent=${domain}&autoplay=true`;

  twitchEmbed.src = embedUrl;
});
