const allLyrics = [
  'You booked the night train for a reason <br> So you could sit there in this hurt',
  'Bustling crowds or silent sleepers <br> You\'re not sure which is worse',
  'Because I dropped your hand while dancing <br> Left you out there standing',
  'Crestfallen on the landing <br> Champagne problems',
  'Your mom\'s ring in your pocket <br> My picture in your wallet',
  'Your heart was glass, I dropped it <br> Champagne problems',
  'You told your family for a reason <br> You couldn\'t keep it in',
  'Your sister splashed out on the bottle <br> Now no one\'s celebrating',
  'Dom Pérignon, you brought it <br> No crowd of friends applauded',
  'Your hometown skeptics called it <br> Champagne problems',
  'You had a speech, you\'re speechless <br> Love slipped beyond your reaches',
  'And I couldn\'t give a reason <br> Champagne problems',
  'Your Midas touch on the Chevy door <br> November flush and your flannel cure',
  '\"This dorm was once a madhouse\" <br> I made a joke, \"Well, it\'s made for me\"',
  'How evergreen, our group of friends <br> Don\'t think we\'ll say that word again',
  'And soon they\'ll have the nerve to deck the halls <br> That we once walked through',
  'One for the money, two for the show <br> I never was ready so I watch you go',
  'Sometimes you just don\'t know the answer <br> \'Til someone\'s on their knees and asks you',
  '\"She would\'ve made such a lovely bride <br> What a shame she\'s fucked in the head,\" they said',
  'But you\'ll find the real thing instead <br> She\'ll patch up your tapestry that I shred',
  'And hold your hand while dancing <br> Never leave you standing',
  'Crestfallen on the landing <br> With champagne problems',
  'Your mom\'s ring in your pocket <br> Her picture in your wallet',
  'You won\'t remember all my <br> Champagne problems'
]

const filterContent1 = '<svg xmlns="http://www.w3.org/2000/svg"version="1.1"><defs>'
const filterContent2 = '<feTurbulence baseFrequency="0.015" numOctaves="3" result="warp" type="fractalNoise"> </feTurbulence>'
const filterContent3 = '<feDisplacementMap in="SourceGraphic" in2="warp" scale="0" xChannelSelector="R" yChannelSelector="B"></feDisplacementMap>'
const filterContent4 = '</filter></defs></svg>'

const mainContent = document.getElementById("lyrics-container")
const filterSection = document.getElementById("filters-container")
const styleSheet = $('link[href="/style.css"]')[0].sheet
let firstTime = true

// create all lyrics and filters
document.body.onload = () => {
  allLyrics.map((currentLine, index) => {
    const newLine = document.createElement("div")
    newLine.classList.add("container")
    newLine.setAttribute("id", `line${index}`)
    const lineContent = document.createElement("h1")
    lineContent.innerHTML = currentLine
    lineContent.setAttribute("id", `hline${index}`)
    newLine.appendChild(lineContent)
    mainContent.appendChild(newLine)
    
    const newFilter = document.createElement("div")
    newFilter.innerHTML = filterContent1 + `<filter id=distort${index}>` + filterContent2 + filterContent3 + filterContent4
    filterSection.appendChild(newFilter)
    
    styleSheet.insertRule(`#line${index} { filter: url("#distort${index}") }`, 1)
  })
}

// update filter and opacity for every scroll
$(window).scroll(() => {
  const top = $('html, body').scrollTop()
  for (let i = 0; i < allLyrics.length; i++) {
    $(`#distort${i}`).find("feDisplacementMap").attr('scale', 0.5 * (top - (window.innerHeight * i)))
    // for no distort before appearing on screen
    // $(`#distort${i}`).find("feDisplacementMap").attr('scale', Math.max(0, 0.5 * (top - (800 * i))))
    $(`#hline${i}`).css('opacity', Math.min(1 + ((top - (window.innerHeight * i)) * 0.002), 1 - ((top - (window.innerHeight * i)) * 0.002)))
  }
})

// inject YouTube API script
const tag = document.createElement('script')
tag.src = "https://www.youtube.com/player_api"
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// set up YouTube player
let player
let notPlaying = true
function onYouTubePlayerAPIReady() { 
  // create the global player from the specific iframe (#video)
  player = new YT.Player('video', {
    // call this function when player is ready to use
    events: { 'onReady': onPlayerReady }
  })
}
function onPlayerReady(event) {
  const musicControl = document.getElementById("music-control")
  const playbutton = document.getElementById("play")
  const pausebutton = document.getElementById("pause")
  musicControl.addEventListener("click", () => {
    if (notPlaying) {
      player.playVideo()
      notPlaying = false
      playbutton.style.opacity = 0
      setTimeout(() => { pausebutton.style.opacity = 1 }, 200)
    } else {
      player.pauseVideo()
      notPlaying = true
      setTimeout(() => { playbutton.style.opacity = 1 }, 200)
      pausebutton.style.opacity = 0
    }
  })
}

// scroll progress bar
function scrollProgressBar() {
  const progressBar = $(".progress-bar")
  let max, value, width

  const getWidth = () => {
    value = $('html, body').scrollTop()
    max = $(document).height() - $(window).height()
    return ((value / max) * 100 + "%")
  };

  const setWidth = () => {
    progressBar.css({ width: getWidth })
  }

  $(document).on("scroll", setWidth)
  $(window).on("resize", setWidth)
}


$(document).ready(function(){
  scrollProgressBar()
})