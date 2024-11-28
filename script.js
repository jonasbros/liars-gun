document.addEventListener("DOMContentLoaded", (event) => {
    var livesInput = $('#lives-input')
    var maxLives = $('#max-lives')
    var currentLives = $('#current-lives')
    var clueless = $('#clueless')
    var tooltip = $('#clueless-tooltip')
    var dedge = $('#dedge')
    var gun = $('#gun')
    var reset = $('#reset')
    var livesCount = livesInput.val()

    livesInput.on('keyup', livesInputHandler)
    clueless.on('click', gunFireHandler)
    reset.on('click', resetHandler)
    dedge.on('click', resetHandler)

    function gunFireHandler() {
        livesInput.prop('disabled', true)
        gun.attr('src', `${gun.attr('src')}?t=${Date.now()}`)
        gun.removeClass('hidden')
        clueless.addClass('hidden')
        tooltip.addClass('hidden')

        setTimeout(() => {
            gun.addClass('hidden')

            let curr = parseInt(currentLives.text())
            curr++
            currentLives.text(curr)

            if(isDead()) {
                dedge.removeClass('hidden')
            }else {
                clueless.removeClass('hidden')
                tooltip.removeClass('hidden')
            }
        }, 2300)

        function isDead() {
            if (livesCount > 1) {          
              // Simulate the chamber (1 in 6 chance of firing)
              const bulletChamber = Math.floor(Math.random() * livesCount) // Random number 0-5
              const loadedChamber = 0; // Bullet is in chamber
          
              if (bulletChamber === loadedChamber) {
                return true
              } 

              let curr = parseInt(currentLives.text())
              currentLives.text(curr++)
              livesCount--

              return false
            }
            // 100% deadge
            return true
        }
    }

    function livesInputHandler() {
        if(livesInput.val() > 10) {
            livesInput.val(10) 
        }
    
        if(livesInput.val() < 1) {
            livesInput.val(1)
        }

        livesCount = livesInput.val()
        maxLives.text(livesInput.val())
    }
    
    function resetHandler() {
        currentLives.text(0)
        maxLives.text(livesInput.val())
        livesInput.prop('disabled', false)
        clueless.removeClass('hidden')
        tooltip.removeClass('hidden')
        dedge.addClass('hidden')
        gun.addClass('hidden')
        livesCount = livesInput.val()
    }
});


