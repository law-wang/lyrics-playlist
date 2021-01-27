$(window).scroll(() => {
  const top = $('html, body').scrollTop()
  
  $("#distort1").find("feDisplacementMap").attr('scale', top)
  $("#distort2").find("feDisplacementMap").attr('scale', top - 800)
})

// Math.max(0, 