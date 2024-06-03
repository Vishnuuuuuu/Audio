var tl = gsap.timeline();

tl.from(".first , #navbar li" ,{
    y:-50,
    duration:0.5,
    opacity:0,
    delay:0.2,
    stagger:0.2

})
tl.from(".body-title , .cont  ",{
      y:50,
    duration:1,
    opacity:0,
    delay:0.1,
    
})
tl.from(".button-sign",{
    y:10,
    duration:0.6,
    yoyo: true,
    opacity:0,
    repeat:-1,
    
})

tl.from(".social-media",{
    
    duration:0.4,
    opacity:0,
    delay:0.1,
    
})
