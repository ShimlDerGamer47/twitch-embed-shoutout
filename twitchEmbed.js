document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const twitchEmbed = document.getElementById("twitchEmbedId");
  if (!twitchEmbed) return;

  const params = new URLSearchParams(window.location.search);
  const clipId = params.get("clipId");
  const autoplay = params.get("autoplay") === "true";
  const muted = params.get("muted") === "true";

  if (!clipId) {
    console.warn("Kein 'clipId' Parameter in der URL gefunden.");
    return;
  }

  const domain = window.location.hostname;

  const embedParams = new URLSearchParams({
    clip: clipId,
    parent: domain
  });

  if (autoplay) embedParams.set("autoplay", "true");
  if (muted) embedParams.set("muted", "true");

  const embedUrl = `https://clips.twitch.tv/embed/?${embedParams.toString()}`;

  twitchEmbed.src = embedUrl;

  const scriptElement = document.createElement("script");
  scriptElement.src = "https://player.twitch.tv/js/embed/v1.js";
  body.appendChild(scriptElement);
});
