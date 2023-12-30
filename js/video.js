// const videoSection = getElement(".video-call-section");
const localVideo = getElement(".local-video");
const remoteVideo = getElement(".remote-video");
let myPeerConnection;

const mediaConstraints = {
  audio: true, // We want an audio track
  video: true, // And we want a video track
};

function invite(data) {
  if (myPeerConnection) {
    alert("You can't start a call because you already have one open!");
  } else {
    targetUsername = clickedUsername;
    createPeerConnection();

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((localStream) => {
        localVideo.srcObject = localStream;
        localStream
          .getTracks()
          .forEach((track) => myPeerConnection.addTrack(track, localStream));
      })
      .catch(handleGetUserMediaError);
  }
}

// invite();

function handleGetUserMediaError(e) {
  switch (e.name) {
    case "NotFoundError":
      alert(
        "Unable to open your call because no camera and/or microphone" +
          "were found."
      );
      break;
    case "SecurityError":
    case "PermissionDeniedError":
      // Do nothing; this is the same as the user canceling the call.
      break;
    default:
      alert(`Error opening your camera and/or microphone: ${e.message}`);
      break;
  }

  closeVideoCall();
}

function createPeerConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      // Information about ICE servers - Use your own!
      {
        urls: "stun:stun.stunprotocol.org",
      },
    ],
  });

  myPeerConnection.onicecandidate = handleICECandidateEvent;
  myPeerConnection.ontrack = handleTrackEvent;
  myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  myPeerConnection.onremovetrack = handleRemoveTrackEvent;
  myPeerConnection.oniceconnectionstatechange =
    handleICEConnectionStateChangeEvent;
  myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
}

function handleNegotiationNeededEvent() {
  myPeerConnection
    .createOffer()
    .then((offer) => myPeerConnection.setLocalDescription(offer))
    .then(() => {
      sendToServer({
        name: myUsername,
        target: targetUsername,
        type: "video-offer",
        sdp: myPeerConnection.localDescription,
      });
    })
    .catch(reportError);
}

function handleICECandidateEvent(event) {
  if (event.candidate) {
    sendToServer({
      type: "new-ice-candidate",
      target: targetUsername,
      candidate: event.candidate,
    });
  }
}
handleSignalingStateChangeEvent;
function handleTrackEvent(event) {
  localVideo.srcObject = event.streams[0];
}

function handleRemoveTrackEvent(event) {
  const stream = remoteVideo.srcObject;
  const trackList = stream.getTracks();

  if (trackList.length === 0) {
    closeVideoCall();
  }
}

function handleICEConnectionStateChangeEvent(event) {
  switch (myPeerConnection.iceConnectionState) {
    case "closed":
    case "failed":
      closeVideoCall();
      break;
  }
}

function handleSignalingStateChangeEvent(event) {
  switch (myPeerConnection.signalingState) {
    case "closed":
      closeVideoCall();
      break;
  }
}

function closeVideoCall() {
  if (myPeerConnection) {
    myPeerConnection.ontrack = null;
    myPeerConnection.onremovetrack = null;
    myPeerConnection.onremovestream = null;
    myPeerConnection.onicecandidate = null;
    myPeerConnection.oniceconnectionstatechange = null;
    myPeerConnection.onsignalingstatechange = null;
    myPeerConnection.onicegatheringstatechange = null;
    myPeerConnection.onnegotiationneeded = null;

    if (remoteVideo.srcObject) {
      remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    }

    if (localVideo.srcObject) {
      localVideo.srcObject.getTracks().forEach((track) => track.stop());
    }

    myPeerConnection.close();
    myPeerConnection = null;
  }

  remoteVideo.removeAttribute("src");
  remoteVideo.removeAttribute("srcObject");
  localVideo.removeAttribute("src");
  remoteVideo.removeAttribute("srcObject");
}

function hangUpCall() {
  closeVideoCall();
  sendToServer({
    name: myUsername,
    target: FRDID,
    type: "hang-up",
  });
}
