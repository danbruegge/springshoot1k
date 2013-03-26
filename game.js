var M,
    W = window,
    S = 640, // window size
    s = 32, // size
    t = 22, // tempo
    B = [], // bullet
    b = 6, // Bullet size
    r = function (i, j) { // generate random number in range i to j
        return Math.floor((Math.random() * (j - i)) + i);
    },
    N = function () { // generate new enemy
        return [r(0, S - s), r(0, S - (s * 3)), 9];
    },
    E = N(), // Enemy
    P = [0, S - (s * 1.5)], // Player x, y
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
a.canvas.width = a.canvas.height = S;

// Bindings
W.onkeydown = function (e) {
    if (e.keyCode == s) { // fire, use var s, 'cause its - 1byte
        B.push([P[0] + (s / 2) - (b / 2), P[1]]);
    }
};

W.onmousemove = function (e) {
    // player position
    P[0] = e.pageX;

    // collision
    if (P[0] <= 0) {
        P[0] = 0;
    }

    if (P[0] >= S - s) {
        P[0] = S - s;
    }
};

// main();
M = W.setInterval(function () {
    // draw map
    a.clearRect(0, 0, S, S);
    R(0, 0, S, S, '#333'); // background
    R(0, S - (s * 2), S, 2, '#000'); // seperator line

    // enemy
    R(E[0], E[1], s, s, '#' + E[2] + '00');

    // bullets
    for (var i = 0; i < B.length; i++) {
        B[i][1] -= 2;

        if (B[i][1] >= 0) { // if not end of the field
            var A = B[i][1] <= E[1] + s;
            var Z = B[i][0] > E[0] - b && B[i][0] < E[0] + s;

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
                R(B[i][0], B[i][1], b, b, '#dd0'); // bullet
            }
        } else {
            B.splice(i, 1);
        }
    }

    // draw player
    R(P[0], P[1], s, s, '#dd0');

    // draw infos
    a.fillStyle = '#fff';
    a.t('T: ' + T, 0, 9);
    a.t('K: ' + K, 0, 20);

    // count time down
    h++;
    if (h > 99) {
        T--;
        h = 0;
    }

    if (T == -1) {
        W.clearInterval(M);

        a.fillStyle = '#000';
        a.textAlign = 'center';
        a.fillStyle = '#fff';
        a.t('HIT F5', S / 2, S / 2);
    }
}, 1);
