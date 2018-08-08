'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var max_stars = window.innerWidth * 0.5;
var stars = [];
var canvas_width = document.body.clientWidth;
var canvas_height = document.body.clientHeight;
var pg = void 0;

function setup() {
    createCanvas(canvas_width, canvas_height);

    // Generate initial stars
    for (var i = 0; i < max_stars; i++) {
        stars.push(new Star());
    }

    // Create star glow
    pg = createGraphics(100, 100);
    pg.background('rgba(0,0,0,0)');
    pg.stroke(255);
    pg.ellipse(50, 50, 25, 25);
    pg.filter(BLUR, 10);
    pg.loadPixels();
    pg.updatePixels();
    pg.filter(DILATE);
}

function windowResized() {
    canvas_width = document.body.clientWidth;
    canvas_height = document.body.clientHeight;
    resizeCanvas(canvas_width, canvas_height);
    if (window.innerWidth * 0.5 > max_stars) {
        for (var i = 0; i < max_stars; i++) {
            if (!stars[i].length) {
                stars.push(new Star());
            }
        }
    }
    max_stars = window.innerWidth * 0.5;
    stars = stars.splice(0, max_stars);
}

function draw() {
    background(10, 17, 40);
    fill(255);
    stars.map(function (star) {
        return star.move();
    });
    stars.map(function (star) {
        return star.draw();
    });
}

var Star = function () {
    function Star() {
        _classCallCheck(this, Star);

        this.x = random(0, canvas_width);
        this.y = random(0, canvas_height);
        this.size = random(4, 8);
        this.velocity = p5.Vector.random2D().mult((this.size - 3) * 0.4);
    }

    _createClass(Star, [{
        key: 'move',
        value: function move() {
            var distance_to_cursor = dist(this.x, this.y, mouseX, mouseY);
            var multiplier = !mouseIsPressed ? distance_to_cursor < 160 ? (180 - distance_to_cursor) * 0.04 : 1 : 1;
            this.tracer_length = distance_to_cursor < 180 ? (180 - distance_to_cursor) * 0.2 : 0;
            this.x += this.velocity.x * multiplier;
            this.y += this.velocity.y * multiplier;
            if (this.x < 0) {
                this.x = canvas_width;
            } else if (this.x > canvas_width) {
                this.x = 0;
            }
            if (this.y < 0) {
                this.y = canvas_height;
            } else if (this.y > canvas_height) {
                this.y = 0;
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            noStroke();
            if (this.tracer_length) {
                fill(186, 100, 11);
                ellipse(this.x - this.velocity.x * this.tracer_length, this.y - this.velocity.y * this.tracer_length, this.size, this.size);
                fill(200, 29, 37);
                ellipse(this.x - this.velocity.x * this.tracer_length / 2, this.y - this.velocity.y * this.tracer_length / 2, this.size, this.size);
            }
            fill(255);
            ellipse(this.x, this.y, this.size, this.size);
            image(pg, this.x - this.size * 5, this.y - this.size * 5, this.size * 10, this.size * 10);
        }
    }]);

    return Star;
}();
//# sourceMappingURL=stars.js.map
