var defaultProfile = {
  displayName: "Adam",
  pictureUrl: "https://profile.line-scdn.net/0hoczsWu6VMExHCh1UxVFPG3tPPiEwJDYEP20oeGVYZns_aHMceTh6KjVePSloPHESeGp-LWECbX9p",
  statusMessage: "Presenting in #LINE_DM!"
}

var app = new Vue({
  el: '#app',
  data: {
    error: null,
    profile: defaultProfile
  }
})

liff.init(undefined, err => app.error = err)

function toggle() {
  if (app.profile === defaultProfile) {
    liff.getProfile()
      .then(profile => app.profile = profile)
      .catch(err => app.error = err)
  } else {
    app.profile = defaultProfile
  }
}

function share() {
  liff.sendMessages([{
    "type": "template",
    "altText": "Check out this profile",
    "template": {
      "type": "buttons",
      "thumbnailImageUrl": app.profile.pictureUrl || "https://adamu.github.io/line_dm_liff/LINE_APP.png",
      "imageAspectRatio": "rectangle",
      "imageSize": "cover",
      "imageBackgroundColor": "#FFFFFF",
      "title": app.profile.displayName,
      "text": (app.profile.statusMessage || "(no status message)").substring(0,59),
      "actions": [
        {
          "type": "uri",
          "label": "Connpass",
          "uri": "https://line.connpass.com/event/139283/"
        },
        {
          "type": "uri",
          "label": "Selfie 📸",
          "uri": "line://nv/camera/"
        },
        {
          "type": "uri",
          "label": "LIFF",
          "uri": "line://app/1600101091-PdEQmLkV"
        }
      ]
    }
  }]).then(() => liff.closeWindow(), err => app.error = err)
}

function url() {
  liff.sendMessages([{
    "type": "text",
    "text": "Endpoint: https://adamu.github.io/line_dm_liff/\nRepository: https://github.com/adamu/line_dm_liff"
  }]).then(() => liff.closeWindow(), err => app.error = err)
}