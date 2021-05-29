const SERVICES = { 
  tumblr: () => {
    let title = 'Tumblr'
    let favicon = 'favicons/tumblr.ico'

    return {
      title, favicon
    }
  },

  twitter: () => {
    let title = 'Twitter'
    let favicon = 'favicons/twitter.ico'

    return {
      title, favicon
    }
  },

  gmail: () => {
    let title      = 'Inbox'
    let count      = Math.round(Math.random() * 12)
    let emailCount = count
    let gmailIcon  = 'favicons/gmail_'

    if (count === 11) {
      count      = 50
      emailCount = `${count}+`
    } else if (count === 12) {
      count      = 100
      emailCount = `${count}+`
    }

    let favicon = `${gmailIcon}${count}.png`

    if (emailCount) {
      title = `Inbox (${emailCount})`
    }

    return {
      title, favicon
    }
  } 
}

class Chameleon {
  constructor (enabledServices) {
    this.enabledServices = enabledServices
    this.services = SERVICES
    this.hidden = 'hidden'
    this.visibilityChange = 'visibilitychange'

    this.favicon = document.querySelector("[rel='shortcut icon']").href
    this.title = document.title
    
    this.init()
  }

  init () {
    if (typeof document.mozHidden !== 'undefined') {
      this.hidden = 'mozHidden'
      this.visibilityChange = 'mozvisibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden'
      this.visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden'
      this.visibilityChange = 'webkitvisibilitychange'
    }

    document.addEventListener(this.visibilityChange, this.handleVisibilityChange.bind(this), false)
  }

  setDefaultFavicon () {
    let title = this.title
    let favicon = this.favicon

    this.updateFavicon({ title, favicon})
  }

  updateFavicon (data) {

    let randomString = "?v=" + Math.round(Math.random() * 10000000)
    let link  = document.createElement('link')

    link.type = 'image/x-icon'
    link.rel  = 'shortcut icon'
    link.href = data.favicon + randomString

    document.getElementsByTagName('head')[0].querySelector("[rel='shortcut icon']").remove()
    document.getElementsByTagName('head')[0].appendChild(link)
    document.title = data.title
  }

  enableService () {
    let i = Math.round(Math.random() * (this.enabledServices.length - 1))
    let service = this.enabledServices[i]

    if (service && this.services[service]) {
      this.updateFavicon(this.services[service]())
    }
  }

  handleVisibilityChange () {
    if (document[this.hidden]) {
      this.enableService()
    } else {
      this.setDefaultFavicon()
    }
  }
}
