const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.height = 500
canvas.width = 750
const spriteWidth = 120
const spriteHeight = 80
const background = new Image()
const gravity = 0.4
var frame = 0
var gameFrame = 0
var fps = 9
var animationFrame = 9
var jump = false
var current = 'idle'
var onTheGround = false
var hit = false
background.src = 'lol.png'
class Knight {
    constructor() {
        this.width = 350
        this.height = 300
        this.x = 0
        this.y = 0
        this.vx = 0
        this.vy = 0
        this.image = new Image()
        this.image.src = "Knight/_Idle.png"
    }
    draw() {
        c.drawImage(this.image, spriteWidth * frame, 0, spriteWidth, spriteHeight, this.x, this.y, this.width, this.height)
    }
    update() {
        this.draw()
        if (this.y + this.height + this.vy <= canvas.height - 45) {
            this.vy += gravity;
        } else {
            this.vy = 0;
            jump = false
            onTheGround = true
            hit = false
            if (knight.vx) {
                current = 'run'
            }
        }
        this.x += this.vx
        this.y += this.vy
    }
}

const knight = new Knight()


function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)
    c.drawImage(background, 0, 0, canvas.width, canvas.height)
    currentAnimation(current)
    if (gameFrame % fps == 0) {
        if (frame < animationFrame) {
            frame++
        } else {
            frame = 0
            console.log('last frame')
            if (current == 'down')
                current = 'idle'
            if (current == 'slash') {
                current = 'idle'
            }
            if (jump) {
                current = 'down'
                fps = 9
            }
        }
    }
    gameFrame++
    knight.update()
}
animate()

addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            knight.vx = 6

            if (onTheGround) {
                current = 'run'
            }
            break
        case 'w':
            if (!jump) {
                knight.vy = -8
                frame = 0
                fps = 8
                onTheGround = false
                current = 'up'
            }
            jump = true
            break
        case 'a':
            knight.vx = -6
            if (onTheGround)
                current = 'run'
            break
        case ' ':
            if (onTheGround && !knight.vx && hit == false) {
                current = 'slash'
                frame = 0
                hit = true
            }
            break
    }
})
addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            knight.vx = 0
            if (onTheGround)
                current = 'idle'
            break
        case 'a':
            knight.vx = 0
            if (onTheGround)
                current = 'idle'
            break

    }
})

function currentAnimation(current) {
    switch (current) {
        case 'run':
            knight.image.src = "Knight/_Run.png"
            animationFrame = 9
            break
        case 'idle':
            knight.image.src = "Knight/_Idle.png"
            animationFrame = 9
            break
        case 'up':
            knight.image.src = "Knight/_Jump.png"
            animationFrame = 2
            break
        case 'down':
            knight.image.src = "Knight/_Fall.png"
            animationFrame = 2
            break
        case 'slash':
            knight.image.src = "Knight/_Attack2NoMovement.png"
            animationFrame = 5
            break
    }
}