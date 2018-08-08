let stars = []

function setup() {
    createCanvas(document.body.clientWidth, document.body.clientHeight)
    for (let i = 0; i < 200; i++) {
        stars.push(new Star)
    }
}

function windowResized() {
    resizeCanvas(document.body.clientWidth, document.body.clientHeight)
}

function draw() {
    background(10, 17, 40)
    fill(255)
    stars.map(star => star.move())
    stars.map(star => star.draw())
}

class Star {
    constructor() {
        this.x = random(0, document.body.clientWidth)
        this.y = random(0, document.body.clientHeight)
        this.velocity = p5.Vector.random2D().mult(5)
    }
    move() {
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.x < 0 || this.x > document.body.clientWidth) {
            this.velocity.x *= -1;
        }
        if (this.y < 0 || this.y > document.body.clientHeight) {
            this.velocity.y *= -1;
        }
    }
    draw() {
        ellipse(this.x, this.y, 5, 5)
    }
}