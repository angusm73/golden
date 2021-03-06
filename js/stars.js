let stars = []
let canvas_width = document.body.clientWidth
let canvas_height = window.innerHeight
let max_stars = Math.min(canvas_height / 30, window.innerWidth * .28)
const dpr = window.devicePixelRatio || 1

function setup() {
    createCanvas(canvas_width, canvas_height)

    // Generate initial stars
    for (let i = 0; i < max_stars; i++) {
        stars.push(new Star)
    }

    // Create star shape
    Star.prototype.img_star = (() => {
        let star = createGraphics(20 * dpr, 20 * dpr)
        star.background('rgba(0,0,0,0)')
        star.stroke(255)
        star.translate(10, 10)
        star.beginShape()
        star.vertex(-10, 0)
        star.bezierVertex(-10, 0, -1, 1, 0, 10)
        star.vertex(0, 10)
        star.bezierVertex(0, 10, 1, 1, 10, 0)
        star.vertex(10, 0)
        star.bezierVertex(10, 0, 1, -1, 0, -10)
        star.vertex(0, -10)
        star.bezierVertex(0, -10, -1, -1, -10, 0)
        star.vertex(-10, 0)
        star.endShape(CLOSE)
        return star
    })()

    // Create star glow
    Star.prototype.img_glow = (() => {
        let glow = createGraphics(100 * dpr, 100 * dpr)
        glow.background('rgba(0,0,0,0)')
        glow.stroke(255)
        glow.ellipse(50, 50, 25, 25)
        glow.filter(BLUR, 10)
        glow.loadPixels()
        glow.updatePixels()
        glow.filter(DILATE)
        return glow
    })()
}

function windowResized() {
    canvas_width = document.body.clientWidth
    canvas_height = window.innerHeight
    resizeCanvas(canvas_width, canvas_height)
    if (Math.min(canvas_height / 30, window.innerWidth * .28) > max_stars) {
        for (let i = 0; i < max_stars; i++) {
            if (!stars[i].length) {
                stars.push(new Star)
            }
        }
    }
    max_stars = Math.min(canvas_height / 30, window.innerWidth * .28)
    stars = stars.splice(0, max_stars)
}

function draw() {
    background(10, 17, 40)
    fill(255)
    stars.map(star => star.move())
    stars.map(star => star.draw())
}

class Star {
    constructor() {
        this.x = random(0, canvas_width)
        this.y = random(0, canvas_height)
        this.size = random(4, 8)
        this.velocity = p5.Vector.random2D().mult((this.size - 3) * 0.4)
    }
    move() {
        const distance_to_cursor = dist(this.x, this.y, mouseX, mouseY)
        const multiplier = distance_to_cursor < 160 ? (180 - distance_to_cursor) * 0.04 : 1
        this.tracer_length = distance_to_cursor < 180 ? (180 - distance_to_cursor) * 0.2 : 0
        this.x += this.velocity.x * multiplier
        this.y += this.velocity.y * multiplier
        if (this.x < 0) {
            this.x = canvas_width
        } else if (this.x > canvas_width) {
            this.x = 0
        }
        if (this.y < 0) {
            this.y = canvas_height
        } else if (this.y > canvas_height) {
            this.y = 0
        }
    }
    draw() {
        noStroke()
        if (this.tracer_length) {
            image(this.img_glow, this.x - this.size * 5, this.y - this.size * 5, this.size * 10, this.size * 10)
            strokeWeight(dpr)
            stroke(200, 29, 37)
            line(this.x, this.y, this.x - this.velocity.x * this.tracer_length / 2, this.y - this.velocity.y * this.tracer_length / 2)
            stroke(186, 100, 11)
            line(this.x - this.velocity.x * this.tracer_length / 2, this.y - this.velocity.y * this.tracer_length / 2, this.x - this.velocity.x * this.tracer_length, this.y - this.velocity.y * this.tracer_length)
        }
        image(this.img_star, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
    }
}
