// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

const playbackSpeed = document.getElementById("playbackSpeed");
query();

playbackSpeed.onchange = () => query();
window.onmousewheel = event => {
  // workaround till faulty mouse is replaced
  if (event.deltaY < 0) {
    increaseSpeed();
  } else {
    decreaseSpeed();
  }
};

function query() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `vid = [...document.getElementsByTagName("video")].forEach(video => (video.playbackRate = ${
        playbackSpeed.value
      }));`
    });
  });
}

// round to one decimal
function round(toRound) {
  return Math.round(toRound * 10) / 10;
}

function increaseSpeed() {
  playbackSpeed.value = round(Number(playbackSpeed.value) + 0.1);
  query();
}

function decreaseSpeed() {
  if (playbackSpeed.value > 1)
    playbackSpeed.value = round(Number(playbackSpeed.value) - 0.1);
  else playbackSpeed.value = 1;

  query();
}
