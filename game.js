window.onload = function () {
    'use strict';

    var W = 640,
        H = 480,
        speed = 5,
        keys = [
            [38, 40, 39, 37], // up, down, right, left
            [87, 83, 68, 65] // up, down, right, left
        ],
        s = 32, // size
        P = [
            [s, s], // x, y
            [W - (s * 2), H - (s * 2)] // x, y
        ];

    a.canvas.width = W;
    a.canvas.height = H;

    var rect = function (x, y, w, h, color) {
        a.beginPath();
        a.rect(x, y, w, h);
        a.fillStyle = color;
        a.closePath();
        a.fill();
    };

    var map = function () {
        a.clearRect(0, 0, W, H);
        rect(0, 0, W, H, '#d2bb6b');
    };

    var tank = function (p) {
        rect(p[0], p[1], s, s, '#5a8b39');
    };

    var collision = function (i) {
        var p = P[i];

        if (p[0] <= 0) {
            p[0] = 0;
        }

        if (p[1] <= 0) {
            p[1] = 0;
        }

        if (p[0] >= (W - s)) {
            p[0] = (W - s);
        }

        if (p[1] >= (H - s)) {
            p[1] = (H - s);
        }
    };

    var main = function () {
        map();
        tank(P[0]);
        tank(P[1]);
    };

    // Bindings
    window.onkeydown = function (e) {
        var k = e.keyCode;
        console.log(P[0][0], P[0][1]);
        for (var i = 0; i < 2; i++) {
            if (k === keys[i][0]) {
                // up
                P[i][1] -= speed;
            }

            if (k === keys[i][1]) {
                // down
                P[i][1] += speed;
            }

            if (k === keys[i][2]) {
                // right
                P[i][0] += speed;
            }

            if (k === keys[i][3]) {
                // left
                P[i][0] -= speed;
            }

            collision(i);
        }
    };

    // main();
    window.setInterval(main, 10);
};
