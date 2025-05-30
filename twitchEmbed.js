document.addEventListener("DOMContentLoaded", function () {
  const html = document.documentElement;
  const head = document.head;
  const link = document.querySelector("link[rel='icon']");

  // HTML Sprache und Titel setzen
  function htmlHeadToken() {
    fetch("/indexHTML.json")
      .then((response) => {
        if (!response.ok) throw new Error("Fehler beim Aufruf der JSON-Datei.");
        return response.json();
      })
      .then((data) => {
        const htmlLangJSON = data[0].settings_html_lang_json.html_lang_json;
        const htmlTitleJSON = data[0].settings_html_title_json.htmlTitle_json;

        if (html && head) {
          html.lang = htmlLangJSON;
          document.title = htmlTitleJSON;
        } else {
          console.error("HTML & Head fehlen!", html, head);
        }
      })
      .catch((error) => console.error("Fehler:", error));
  }
  htmlHeadToken();

  // Website Icon setzen
  function websiteIconToken() {
    fetch("/webSiteIcon.json")
      .then((response) => {
        if (!response.ok) throw new Error("Fehler beim Aufruf der JSON-Datei.");
        return response.json();
      })
      .then((data) => {
        const iconData = data[0].settings_website_icons_json;
        const hrefFullPath =
          iconData.href_path_json +
          iconData.href_under_path_json +
          iconData.href_file_json;

        if (link) {
          link.rel = iconData.rel_json;
          link.type = "image/png"; // Besser immer image/png für PNGs
          link.href = hrefFullPath;
        }
      })
      .catch((error) => console.error("Fehler:", error));
  }
  websiteIconToken();

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

    const domain = window.location.hostname;
    const fullUrl = `https://clips.twitch.tv/embed?clip=${clipId}&parent=${domain}&autoplay=true&muted=false`;

    twitchEmbed.src = fullUrl;
  }
  twitchEmbedToken();
});
