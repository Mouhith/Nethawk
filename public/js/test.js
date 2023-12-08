
// intro js
introJs()
  .setOptions({
    tooltipClass: "customTooltip",
    highlightClass: "custogiilet",
    showProgress: true,
    showBullets: false,
    overlayOpacity: 0.7,
    autoPosition: true,

    steps: [
      {
        title: "Upload Jitter (in ms)",
        element: document.querySelector(".card#Upload_jitter"),
        intro:
          "This Data parmater indicates variation in roundtrip time of different packets sent from user side over network </br></br>(A good network has low value of jitter)",
      },
      {
        title: "Upload latency (in ms)",
        element: document.querySelector(".card#uplode_latency"),
        intro:
          "This Data parameter indicates avg time taken for a packet, sent from User side, to make a roundtrip. This parameter indicates responsiveness of the network </br></br>(A good network has low values of latency) ",
      },
      {
        title: "Download Jitter (in ms)",
        element: document.querySelector("#download_itter"),
        intro:
          "This Data parmater indicates variation in roundtrip time of different packets sent from server side over network </br></br>(A good network has low value of jitter)",
      },
      {
        title: "Download Latency (in ms)",
        element: document.querySelector("#download_latency"),
        intro:
          "This Data parameter indicates avg time taken for a packet, sent from server side, to make a roundtrip. This parameter indicates responsiveness of the network </br></br>(A good network has low values of latency) ",
      },
      {
        title: "Packet Loss %",
        element: document.querySelector("#packet_loss"),
        intro:
          "This Data parameter indicates the ratio of the total number of TCP packets retransmitted and the total number of TCP packets sent. This parameter indicates reliability of the network</br></br> (A good network has low value of packet loss) ",
      },

      {
        title: "Time to Download 80 Mb of file (in sec)",
        element: document.querySelector("#chart1"),
        intro:
          "This Data parameter indicates avg time taken to download a 10mb of binary text (.dat) file while running Network test at different time intervals</br></br> ( A good network has low values of this parameter) ",
      },
      {
        title: "Average Download Speed (in Mb/Sec)",
        element: document.querySelector("#chart2"),
        intro:
          "This Data parameter indicates Average Download (Amount of Data recevied in 1 sec) Speeds achieved while running Network test at different time intervals </br></br>( A good network has high average upload Speeds) ",
      },
      {
        title: "Peak Download Speed (in Mb/sec)",
        element: document.querySelector("#chart3"),
        intro:
          "This Data parameter indicates Peak Download (Amount of Data received in 1 sec) Speeds achieved while running Network test at different time intervals </br></br>( A good network has high and consistent peak Download Speeds)",
      },

      {
        title: "Time to Upload 80 Mb of file (in Sec)",
        element: document.querySelector("#chart4"),
        intro:
          "This Data parameter indicates avg time taken to upload a 10mb of binary text (.dat) file while running Network test at different time intervals </br></br>( A good network has low values of this parameter)",
      },
      {
        title: "Average Upload Speed (in Mb/sec)",
        element: document.querySelector("#chart5"),
        intro:
          "This Data parameter indicates Average Upload (Amount of Data Sent in 1 sec) Speeds achieved while running Network test at different time intervals </br></br>( A good network has high average upload Speeds)",
      },
      {
        title: "Peak Upload Speed (in Mb/sec)",
        element: document.querySelector("#chart6"),
        intro:
          "This Data parameter indicates Peak Upload (Amount of Data Sent in 1 sec) Speeds achieved while running Network test at different time intervals </br></br>( A good network has high and consistent peak upload Speeds)",
      },

      {
        title: "Stream Quality Score",
        element: document.querySelector("#chart7"),
        intro:
          "This Data parameter indicates Video Streaming performance by measuring Ratio of Actual Video Duration and Video Playtime. If value of this ratio tends towards 1, paramtere will indiacate 100 Quality Score</br></br>( A good network has high Stream Quality Score)",
      },

      {
        title: "Loading Time of Stream (in Sec)",
        element: document.querySelector("#chart8"),
        intro:
          "This Data parameter indicates time (in ms) taken by network to Start a video Stream as soon as user clicks on Play Button </br></br>( A good network has low loading time of Stream)",
      },
      {
        title: "Avg Loading Time for Websites (in Sec)",
        element: document.querySelector("#chart9"),
        intro:
          "This Data parameter indicates time (in sec) taken by network to load 5 most commonly browsed Websites</br></br>( A good network has low average loading times for Websites)",
      },
    ],
  })
  .start();
