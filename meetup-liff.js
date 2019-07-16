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
      "text": app.profile.statusMessage || "(no status message)",
      "actions": [
        {
          "type": "uri",
          "label": "Selfie 📸",
          "uri": "line://nv/camera/"
        }
      ]
    }
  }])
    .then(() => liff.closeWindow(), err => app.error = err)
}