window.onload = function () {
    'use strict';

    var r = function (i, j) {
        return Math.floor((Math.random()*j)+i);
    }

    var N = function () {
        return [r(s, W - (s * 2)), r(s, H - (s * 2)), 9];
    }

    var W = 640,
        H = 480,
        s = 32, // size
        t = 9, // tempo
        B = [], // bullet
        Bs = 6,
        E = N(),
        P = [s / 2, (H / 2) - (s / 2)]; // x, y

    a.canvas.width = W;
    a.canvas.height = H;

    var rect = function (x, y, w, h, color) {
        a.beginPath();
        a.rect(x, y, w, h);
        a.fillStyle = color;
        a.closePath();
        a.fill();
    };

    // Bindings
    window.onkeydown = function (e) {
        var C = e.keyCode;
        if (C === 38) { // up
            P[1] -= t;
        }

        if (C === 40) { // down
            P[1] += t;
        }

        if (C === 32) { // fire
            B.push([P[0] + s, P[1] + (s / 2) - (Bs / 2)]);
        }

        // collision
        if (P[1] <= 0) {
            P[1] = 0;
        }

        if (P[1] >= (H - s)) {
            P[1] = (H - s);
        }
    };

    // main();
    window.setInterval(function () {
        // draw map
        a.clearRect(0, 0, W, H);
        rect(0, 0, W, H, '#cc6');
        rect(s * 2, 0, 2, H, '#993');

        // enemy
        rect(E[0], E[1], s, s, '#f0' + E[2]);

        // bullets
        for (var i = 0; i < B.length; i++) {
            B[i][0] += 2;

            if (B[i][0] <= (W - (Bs * 2))) { // end of the field
                var A = B[i][0] >= E[0];
                var Z = B[i][1] > E[1] && B[i][1] < (E[1] + s);

                if (A && Z) { // enemy collision
                    B.splice(i, 1);
                    if (E[2] > 0) {
                        rect(E[0], E[1], s, s, '#f0' + E[2]);
                        E[2] -= 1;
                    } else {
                        E = N();
                        rect(E[0], E[1], s, s, '#f0' + E[2]);
                    }
                } else {
                    rect(B[i][0], B[i][1], Bs, Bs, '#ff0');
                }
            }
        }

         // draw player
        rect(P[0], P[1], s, s, '#693');
    }, 10);
};
