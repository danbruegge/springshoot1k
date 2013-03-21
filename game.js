var M,
    I = window,
    W = 640,
    s = 32, // size
    t = s / 1.5, // tempo
    B = [], // bullet
    b = 6, // Bullet size
    r = function (i, j) { // generate random number in range i to j
        return Math.floor((Math.random() * (j - i)) + i);
    },
    N = function () { // generate new enemy
        return [r(s * 3, W - (s * 2)), r(s, W - (s * 2)), 9];
    },
    E = N(), // Enemy
    P = [s / 2, (W / 2) - (s / 2)], // x, y
    K = 0, // KILLS
    T = 99, // Time to count down
    h = 0, // time helper
    R = function (x, y, w, h, color) { // draw rectangle
        a.beginPath();
        a.rect(x, y, w, h);
        a.fillStyle = color;
        a.fill();
    };

a.t = a.fillText;
a.canvas.width = a.canvas.height = W;

// Bindings
I.onkeydown = function (e) {
    var C = e.keyCode;

    if (C == s) { // fire, use var s, 'cause its - 1byte
        B.push([P[0] + s, P[1] + (s / 2) - (b / 2)]);
    }
};

I.onmousemove = function (e) {
    // player position
    P[1] = e.pageY;

    // collision
    if (P[1] <= 0) {
        P[1] = 0;
    }

    if (P[1] >= (W - s)) {
        P[1] = (W - s);
    }
};

// main();
M = I.setInterval(function () {
    // draw map
    a.clearRect(0, 0, W, W);
    R(0, 0, W, W, '#333');
    R(s * 2, 0, 2, W, '#000');

    // enemy
    R(E[0], E[1], s, s, '#' + E[2] + '00');

    // bullets
    for (var i = 0; i < B.length; i++) {
        B[i][0] += 2;

        if (B[i][0] <= (W - (b * 2))) { // end of the field
            var A = B[i][0] >= E[0];
            var Z = B[i][1] > E[1] && B[i][1] < E[1] + s;

            if (A && Z) { // enemy collision
                B.splice(i, 1);
                if (E[2] > 0) {
                    R(E[0], E[1], s, s, '#' + E[2] + '00');
                    E[2]--;
                } else {
                    K++;
                    E = N();
                    R(E[0], E[1], s, s, '#' + E[2] + '00');
                }
            } else {
                R(B[i][0], B[i][1], b, b, '#dd0');
            }
        }
    }

    // draw player
    R(P[0], P[1], s, s, '#000');

    // draw infos
    a.fillStyle = '#fff';
    a.t('T: ' + T, 80, 9);
    a.t('K: ' + K, 80, 20);

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
        a.fillStyle = '#fff';
        a.t('HIT F5', W / 2, W / 2);
    }
}, 1);
