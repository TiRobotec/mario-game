import platform from './img/platform.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 0.5

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {

    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 30 
    }
    
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
        
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20

        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const image = new Image()
image.src = platform

const player = new Player()
const platforms = [
    new Platform({x: 200, y: 100, image: image}), 
    new Platform({x: 500, y: 200, image: image})]

const keys = {
    right: {
        presed: false
    },
    left: {
        presed: false
    }
}

let scrollOffset = 0

player.draw() 

c.clearRect(0, 0, canvas.width, canvas.height)

player.velocity.y += gravity

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    platforms.forEach((platform) => {
        platform.draw()
    })

    if (keys.right.presed && player.position.x < 400) {
        player.velocity.x = 5  
    } else if (keys.left.presed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.presed) {
            scrollOffset += 5

            platforms.forEach((platform) => {
                platform.position.x -= 5  
            })
        } else if (keys.left.presed) {
            scrollOffset -= 5

            platforms.forEach((platform) => {
                platform.position.x += 5
            })  
        }
    }
     
    platforms.forEach((platform) => {
        // platform collistion detection
        if (
            player.position.y + player.height <= platform.position.y && 
            player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x +
            player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width 
        ) {
        
            player.velocity.y = 0
        } 
    })
    
    if (scrollOffset > 2000) {
        console.log('you win!')
    }
}

animate()

window.addEventListener('keydown', (event) => {
    //console.log(event)
    switch (event.keyCode) {
        case 65:
            console.log('left')
            keys.left.presed = true
            break
        
        case 83:
            console.log('down')
            break
        
        case 68:
            console.log('right')
            keys.right.presed = true 
            break  

        case 87:
            console.log('up')
            player.velocity.y -= 4
            break  
    }  
})
  
addEventListener('keyup', (event) => {
    //console.log(event)
    switch (event.keyCode) {
        case 65:
            console.log('left')
            keys.left.presed = false
            break
        
        case 83:
            console.log('down')
            break
        
        case 68:
            console.log('right')
            keys.right.presed = false
            break  

        case 87:
            console.log('up')
            player.velocity.y -= 14
            break   
    } 
})