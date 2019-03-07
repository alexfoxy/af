
function selectNav(hash) {
    var anchorlinks = document.querySelectorAll('a[href^="#"]')
 
    for (var item of anchorlinks) { 
        const hashval = item.getAttribute('href')
        if(hash === hashval) {
            item.classList.add("selected")
        } else {
            item.classList.remove("selected")
        }
    }
}

function setUpAnchorLinks() {
    var anchorlinks = document.querySelectorAll('a[href^="#"]')
 
    for (var item of anchorlinks) { 
        item.addEventListener('click', function(e) {
            var hashval = e.target.getAttribute('href')
            var target = document.querySelector(hashval)
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            history.pushState(null, null, hashval)
            e.preventDefault()
        })
    }
}

function setUpExpandButtons() {
    var expandButtons = document.querySelectorAll('.expandButton')
 
    for (var button of expandButtons) { 
        button.addEventListener('click', function(e) {
            const b = e.target
            var list = b.previousElementSibling

            list.classList.toggle("visible")

            b.innerHTML = list.classList.contains("visible") ? "- less" : "+ more"
        })
    }
}


window.gen_mail_to_link = function(lhs,rhs,subject) {
    document.write("<a id=contactMe href=\"mailto");
    document.write(":" + lhs + "@");
    document.write(rhs + "?subject=" + subject + "\">" + lhs + "@" + rhs + "<\/a>");
}


var parallaxObjects = []

function populateParallaxObjects() {
  document.querySelectorAll(".parallax").forEach(function(el) {
    var o = {
      el: el
    }

    for(var i=0; i<el.attributes.length; i++) {
      var a = el.attributes[i]
      var bits = a.name.split("-")
      if(bits[0] === "parallax") {
        o[a.name] = a.name === "parallax-anchor-el" ? document.querySelector(a.value) : JSON.parse(a.value)
      }
    }

    parallaxObjects.push(o)
  })
}

function updateparallaxObjects(y) {
  parallaxObjects.forEach(function(o) {
    var transformString = ""
    var offsetTop = o["parallax-anchor-el"] ? o["parallax-anchor-el"].offsetTop : 0
    var _y = y-offsetTop

    if(o["parallax-translate-opacity"]) {
      var arr = o["parallax-translate-opacity"]
      var opacity = everpolate.linear(_y,arr[0],arr[1])

      if(opacity<=0) {
        o.el.style.opacity = 0
        return
      } else {
        o.el.style.opacity = Math.min(opacity,1)
      }
    }  

    if(o["parallax-translate-x"]) {
      var arr = o["parallax-translate-x"]
      var v = everpolate.linear(_y,arr[0],arr[1])
      transformString += `translateX(${v}px)`
    }

    if(o["parallax-translate-y"]) {
      var arr = o["parallax-translate-y"]
      var v = everpolate.linear(_y,arr[0],arr[1])
      transformString += `translateY(${v}px)`
    }

    if(o["parallax-translate-scale"]) {
      var arr = o["parallax-translate-scale"]
      var v = everpolate.linear(_y,arr[0],arr[1])
      transformString += `scale(${v})`
    }

    if(o["parallax-translate-rotate"]) {
      var arr = o["parallax-translate-rotate"]
      var v = everpolate.linear(_y,arr[0],arr[1])
      transformString += `rotate(${v}deg)`
    }

    if(o["parallax-filter-hue"]) {
      var arr = o["parallax-filter-hue"]
      var v = everpolate.linear(_y,arr[0],arr[1])
      o.el.style.filter = `hue-rotate(${v}deg)`
    }

    o.el.style.transform = transformString
  })
}

function checkOrientation() {
  const ratio = window.innerWidth/window.innerHeight
  const isMobile = ratio<0.75

  if(isMobile) {
    document.body.classList.remove("desktop")
    document.body.classList.add("mobile")
  } else {
    document.body.classList.remove("mobile")
    document.body.classList.add("desktop")
  }

  window.__isMobile = isMobile
}

// window.addEventListener("resize", checkOrientation, false);
window.addEventListener("orientationchange", checkOrientation, false);


window.onload = function() {
    checkOrientation()

    populateParallaxObjects()
    setUpExpandButtons()
    setUpAnchorLinks()

    const projectsEl = document.getElementById("projects")
    const contactEl = document.getElementById("contact")
    const historyEl = document.getElementById("history")


    var h = 123/2.8
    var w = 142/2.8

    const prism = document.getElementById("prism")

    prism.style.width = `${w}pt`
    prism.style.height = `${h}pt`
    prism.style["background-size"] = `${w}pt`

    function setFrame(frame) {
      var f = frame%47
      prism.style["background-position"] = `0 -${f*h}pt`
    }

    setTimeout(() => {
      document.body.classList.remove("loading")
      document.body.classList.add("loaded")
    }, 200)

    document.addEventListener('scroll', function(x) {
        if(!window.__isMobile) updateparallaxObjects(window.scrollY)

        if(window.scrollY > 50) {
          document.body.classList.add("scrolled")
        } else {
          document.body.classList.remove("scrolled")
        }

        if(window.scrollY > contactEl.offsetTop-(window.innerHeight/2)) {
          selectNav("#contact")
        } else if(window.scrollY > historyEl.offsetTop-(window.innerHeight/2)) {
          selectNav("#history")
        } else if(window.scrollY > projectsEl.offsetTop-(window.innerHeight/2)) {
          selectNav("#projects")
        } else {
          selectNav("#me")
        }        

        setFrame(Math.floor(window.scrollY/30))
    }, false)

    if(!window.__isMobile) updateparallaxObjects(window.scrollY)


}
