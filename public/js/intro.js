document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    intro();
  }, 6000);
});

const intro = () => {
  introJs()
    .setOptions({
      tooltipClass: "custom-highlight",
      howProgress: true,
      steps: [
        {
          title: "Upload Jitter (in ms)",
          intro:
            "This Data parameter indicates avg time taken for a packet, sent from User side, to make a roundtrip. This parameter indicates responsiveness of the network (A good network has low values of latency) ",
        },
        {
          title: "Upload Jitter (in ms)",
          element: document.querySelector(".dashboard-chart-id-160"),
          intro:
            "This Data parmater indicates variation in roundtrip time of different packets sent from user side over network (A good network has low value of jitter)",
        },
      ],
    })
    .start();
};
