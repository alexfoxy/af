// var lastKnownScrollY = 0;
// var currentScrollY = 0;
// var ticking = false;
// var idOfHeader = 'navcontainer';
// var eleHeader = null;
// const classes = {
//   pinned: 'pin',
//   unpinned: 'unpin',
// };
// function onScroll() {
//   currentScrollY = window.pageYOffset;
//   if (currentScrollY < lastKnownScrollY) {
//     pin();
//   } else if (currentScrollY > lastKnownScrollY) {
//     unpin();
//   }
//   lastKnownScrollY = currentScrollY;
// }
// function pin() {
//   if (eleHeader.classList.contains(classes.unpinned)) {
//     eleHeader.classList.remove(classes.unpinned);
//     eleHeader.classList.add(classes.pinned);
//   }
// }
// function unpin() {
//   if (eleHeader.classList.contains(classes.pinned) || !eleHeader.classList.contains(classes.unpinned)) {
//     eleHeader.classList.remove(classes.pinned);
//     eleHeader.classList.add(classes.unpinned);
//   }
// }

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

function showGraphics(mode) {
    const block1 = document.getElementById("block1")
    const block2 = document.getElementById("block2")
    const block3 = document.getElementById("block3")
    const block4 = document.getElementById("block4")
    const block5 = document.getElementById("block5")

    if(mode === 'scroll-up') {
        block1.style.opacity = 1
        block1.style.transform = "translate(0,0)"

        block2.style.opacity = 1
        block2.style.transform = "translate(0,0)"

        block3.style.opacity = 1
        block3.style.transform = "translate(0,0)"

        block4.style.opacity = 1
        block4.style.transform = "scale(1,1)"

        block5.style.opacity = 1
        block5.style.transform = "scale(1,1)"
    }

    if(mode === 'scroll-down') {
        block1.style.opacity = 0
        block1.style.transform = "translate(-50pt,0)"

        block2.style.opacity = 0
        block2.style.transform = "translate(0,-50pt)"

        block3.style.opacity = 0
        block3.style.transform = "translate(50pt,0)"

        block4.style.opacity = 0
        block4.style.transform = "scale(0.3,0.3)"

        block5.style.opacity = 0
        block5.style.transform = "scale(0.3,0.3)"
    }

    // const krft1 = document.getElementById("krft1")
    // krft1.style.opacity = 1
    // krft1.style.transform = "translate(20,0)"
}


window.gen_mail_to_link = function(lhs,rhs,subject) {
    document.write("<a id=contactMe href=\"mailto");
    document.write(":" + lhs + "@");
    document.write(rhs + "?subject=" + subject + "\">Email me<\/a>");
}

window.onload = function() {
    const ratio = window.innerWidth/window.innerHeight
    const isMobile = ratio<0.75
    if(isMobile) {
        document.body.classList.add("mobile")
    }

    document.body.classList.add("loaded")


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

    var expandButtons = document.querySelectorAll('.expandButton')
 
    for (var button of expandButtons) { 
        button.addEventListener('click', function(e) {
            const b = e.target
            var list = b.previousElementSibling

            list.classList.toggle("visible")

            b.innerHTML = list.classList.contains("visible") ? "- less" : "+ more"


            // for(var t2 of tabs) {
            //     t2.classList.remove("selected")
            // }

            // e.target.classList.add("selected")
            // var screenId = parseInt(e.target.getAttribute('screen-id'))

            // const screensContainer = e.target.parentElement.parentElement.querySelector(".projectScreensInner")
            
            // for(var screen of screensContainer.children) {
            //     screen.classList.remove("visible")
            // }

            // screensContainer.children[screenId].classList.add("visible")
        })
    }

    // var tabContainers = document.querySelectorAll('.projectTabs')
 
    // for (var tabContainer of tabContainers) { 
    //     const tabs = tabContainer.children

    //     for(var t of tabs) {
    //         t.addEventListener('click', function(e) {
    //             for(var t2 of tabs) {
    //                 t2.classList.remove("selected")
    //             }

    //             e.target.classList.add("selected")
    //             var screenId = parseInt(e.target.getAttribute('screen-id'))

    //             const screensContainer = e.target.parentElement.parentElement.querySelector(".projectScreensInner")
                
    //             for(var screen of screensContainer.children) {
    //                 screen.classList.remove("visible")
    //             }

    //             screensContainer.children[screenId].classList.add("visible")
    //         })
    //     }
    // }

    let projectsEl = document.getElementById("projects").getBoundingClientRect()
    let contactEl = document.getElementById("contact").getBoundingClientRect()

    document.addEventListener('scroll', function(x) {
        if(window.scrollY > 300) {
            document.body.classList.add("scrolled")
            showGraphics('scroll-down')
        } else {
            document.body.classList.remove("scrolled")
            showGraphics('scroll-up')
        }

        if(window.scrollY > (contactEl.top - (window.innerHeight/2))) {
            selectNav("#contact")
        } else if(window.scrollY > (projectsEl.top - (window.innerHeight/2))) {
            selectNav("#projects")
        } else {
            selectNav("#me")
        }
    }, false);

    showGraphics('scroll-down')

    setTimeout(() => {
        showGraphics('scroll-up')
    }, 500)
}

