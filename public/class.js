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

class Item {
    constructor(src, x, id) {
        this.x = x
        this.y = 426
        this.width = 40
        this.height = 40
        this.image = new Image()
        this.image.src = src
        this.taken = false
        this.id = id
    }
    draw() {
        if (!this.taken) {
            c.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
}