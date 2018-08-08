"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stars = [];

function setup() {
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    for (var i = 0; i < 200; i++) {
        stars.push(new Star());
    }
}

function windowResized() {
    resizeCanvas(document.body.clientWidth, document.body.clientHeight);
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

        this.x = random(0, document.body.clientWidth);
        this.y = random(0, document.body.clientHeight);
        this.velocity = p5.Vector.random2D().mult(5);
    }

    _createClass(Star, [{
        key: "move",
        value: function move() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            if (this.x < 0 || this.x > document.body.clientWidth) {
                this.velocity.x *= -1;
            }
            if (this.y < 0 || this.y > document.body.clientHeight) {
                this.velocity.y *= -1;
            }
        }
    }, {
        key: "draw",
        value: function draw() {
            ellipse(this.x, this.y, 5, 5);
        }
    }]);

    return Star;
}();
//# sourceMappingURL=stars.js.map
