var r = function (i, j) {
    return Math.floor((Math.random() * (j - i)) + i);
};

var N = function () {
    return [r(s * 3, W - (s * 2)), r(s, H - (s * 2)), 9];
};

var I = window,
    W = 640,
    H = 480,
    s = 32, // size
    t = 9, // tempo
    B = [], // bullet
    b = 6, // Bullet size
    E = N(), // Enemy
    P = [s / 2, (H / 2) - (s / 2)], // x, y
    K = 0, // KILLS
    T = 99, // Time to count down
    h = 0; // time helper

a.canvas.width = W;
a.canvas.height = H;

var R = function (x, y, w, h, color) {
    a.beginPath();
    a.rect(x, y, w, h);
    a.fillStyle = color;
    a.closePath();
    a.fill();
};

// Bindings
I.onkeydown = function (e) {
    var C = e.keyCode;
    if (C == 38) { // up
        P[1] -= t;
    }

    if (C == 40) { // down
        P[1] += t;
    }

    if (C == 32) { // fire
        B.push([P[0] + s, P[1] + (s / 2) - (b / 2)]);
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
var M = I.setInterval(function () {
    // draw map
    a.clearRect(0, 0, W, H);
    R(0, 0, W, H, '#cc6');
    R(576, 416, s, s, '#f00');
    R(s * 2, 0, 2, H, '#993');

    // enemy
    R(E[0], E[1], s, s, '#f0' + E[2]);

    // bullets
    for (var i = 0; i < B.length; i++) {
        B[i][0] += 2;

        if (B[i][0] <= (W - (b * 2))) { // end of the field
            var A = B[i][0] >= E[0];
            var Z = B[i][1] > E[1] && B[i][1] < (E[1] + s);

            if (A && Z) { // enemy collision
                B.splice(i, 1);
                if (E[2] > 0) {
                    R(E[0], E[1], s, s, '#f0' + E[2]);
                    E[2]--;
                } else {
                    K++;
                    E = N();
                    R(E[0], E[1], s, s, '#f0' + E[2]);
                }
            } else {
                R(B[i][0], B[i][1], b, b, '#ff0');
            }
        }
    }

    // draw player
    R(P[0], P[1], s, s, '#693');

    // draw infos
    a.fillText('T: ' + T, 80, 9);
    a.fillText('K: ' + K, 80, 20);

    // count time down
    h++;
    if (h == 99) {
        T--;
        h = 0;
    }

    if (T == -1) {
        I.clearInterval(M);

        a.fillStyle = '#000';
        a.textAlign = 'center';
        a.fillText('HIT F5', W / 2, H / 2);
    }
}, 10);
