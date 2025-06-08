document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const twitchEmbed = document.getElementById("twitchEmbedId");
  if (!twitchEmbed) return;

  const params = new URLSearchParams(window.location.search);
  const clipId = params.get("clipId");

  if (!clipId || clipId.trim() === "") {
    console.warn("Kein 'clipId' Parameter in der URL gefunden.");

    const divErrorElement = document.createElement("div");
    Object.assign(divErrorElement.style, {
      background: "#000000",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyItems: "center",
      justifyContent: "center",
      border: "2px solid black",
      borderRadius: "5px",
      padding: "5px 5px",
      margin: "10px 10px 10px 10px"
    });
    body.appendChild(divErrorElement);

    const pErrorElement = document.createElement("p");
    Object.assign(pErrorElement.style, {
      fontFamily: "Arial, Helvetica, sans-serif",
      background: "#000000",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyItems: "center",
      justifyContent: "center",
      border: "1px solid transparent",
      borderRadius: "5px",
      padding: "5px 5px",
      margin: "5px 5px 5px 5px",
      textAlign: "center",
      fontSize: "25px",
      color: "#ffffff",
      textDecoration: "none"
    });
    pErrorElement.innerHTML =
      "Bitte gib eine Clip-ID an!<br>?clipId=1234&autoplay=true&muted=true";
    divErrorElement.appendChild(pErrorElement);

    return;
  }

  let autoplay = localStorage.getItem("autoplay");
  let muted = localStorage.getItem("muted");

  if (params.has("autoplay")) {
    autoplay = params.get("autoplay") === "true";
    localStorage.setItem("autoplay", autoplay);
  } else if (autoplay !== null) {
    autoplay = autoplay === "true";
  } else {
    autoplay = false;
    localStorage.setItem("autoplay", autoplay);
  }

  if (params.has("muted")) {
    muted = params.get("muted") === "true";
    localStorage.setItem("muted", muted);
  } else if (muted !== null) {
    muted = muted === "true";
  } else {
    muted = true;
    localStorage.setItem("muted", muted);
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
});
