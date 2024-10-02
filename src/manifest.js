document.querySelector("link[rel=manifest]").href =
  `data:application/manifest+json,${encodeURIComponent(
    JSON.stringify({
      name: "Spelsylt 11 game",
      short_name: "Spelsylt 11",
      start_url: location.href,
      background_color: "green",
      theme_color: "#282828",
      display: "fullscreen",
      icons: [
        {
          type: "image/png",
          sizes: "64x64",
          src: `${location.href}/assets/logo-64x64.png`,
        },
        {
          type: "image/png",
          sizes: "64x64",
          src: `${location.href}/assets/logo-512x512.png`,
        },
      ],
    }),
  )}`;
