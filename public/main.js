const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.height = 500
canvas.width = 750
const spriteWidth = 120
const spriteHeight = 80
const background = new Image()
const tutorial = document.getElementById('tut')
const gravity = 0.4
const imgs = document.getElementsByTagName('img')
const toEquip = {
    poison: false,
    juice: false,
    paper: false,
    meat: false,
    flower: false
}
const sp = 8
const slots = document.getElementsByClassName('inventoryslot')
var frame = 0
var i = 0
var epress = false
var gameFrame = 0
var closeToItem = false
var fps = 4
var animationFrame = 9
var jump = false
var current = 'idle'
var onTheGround = false
var hit = false
var slotCount = 0
background.src = 'lol.png'

console.log(slots[slotCount])

const knight = new Knight()
const items = new Array()
items.push(new Item('Items/foldedpaper.png', 100, 1))
items.push(new Item('Items/poison.png', 230, 2))
items.push(new Item('Items/healer.png', 360, 3))
items.push(new Item('Items/meat.png', 490, 4))
items.push(new Item('Items/flower.png', 620, 5))
console.log(imgs)

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
            if (current == 'down')
                current = 'idle'
            if (current == 'slash') {
                current = 'idle'
            }
            if (jump) {
                current = 'down'
                fps = 4
            }
        }
    }
    gameFrame++
    if (closeToItem) {
        tutorial.innerHTML = 'Press E And Take It Lol'
    } else {
        tutorial.innerHTML = ''
    }
    knight.update()
    if (toEquip.juice) {
        imgs[0].src = 'Items/healer.png'
    }
    if (toEquip.meat) {
        imgs[1].src = 'Items/meat.png'
    }
    if (toEquip.paper) {
        imgs[2].src = 'Items/foldedpaper.png'
    }
    if (toEquip.poison) {
        imgs[3].src = 'Items/poison.png'
    }
    if (toEquip.flower) {
        imgs[4].src = 'Items/flower.png'
    }
    items.forEach(item => {
        item.draw()
        if (knight.x + 20 >= item.x - 150 && knight.x <= item.x - 150 + 50) {
            i++
            if (epress == true) {
                if (item.id == 1) {
                    toEquip.paper = true
                }
                if (item.id == 2) {
                    toEquip.poison = true
                }
                if (item.id == 3) {
                    toEquip.juice = true
                }
                if (item.id == 4) {
                    toEquip.meat = true
                }
                if (item.id == 5) {
                    toEquip.flower = true
                }
            }
        }
    })
    if (i) {
        closeToItem = true
        i = 0
    } else {
        closeToItem = false
    }
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
                knight.vy = -sp
                frame = 0
                fps = 8
                onTheGround = false
                current = 'up'
            }
            jump = true
            break
        case 'a':
            knight.vx = -sp
            if (onTheGround)
                current = 'run'
            break
        case 'e':
            epress = true
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
        case 'e':
            epress = false
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