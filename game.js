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
    O = 0, // Player y
    o = S - (s * 1.5), // Player y
    K = 0, // KILLS
    T = 9999, // Time to count down
    h = 0, // time helper
    R = function (x, y, w, h, c) { // draw rectangle
        a.beginPath();
        a.rect(x, y, w, h);
        a.fillStyle = c;
        a.fill();
    },
    w = function (t, x, y) {
        a.fillStyle = '#fff';
        a.t(t, x, y);
    };

a.t = a.fillText;
a.canvas.width = a.canvas.height = S;

// Bindings
W.onkeydown = function (e) {
    if (e.keyCode == s) { // fire, use var s, 'cause its - 1byte
        B.push([O + (s / 2) - (b / 2), o]);
    }
};

W.onmousemove = function (e) {
    // player position
    O = e.pageX;

    // collision
    if (O <= 0) {
        O = 0;
    }

    if (O >= S - s) {
        O = S - s;
    }
};

R(0, 0, S, S, '#333'); // background
w('GO', s, s);

W.onclick = function (e) {
    this.onclick = null;
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
                        E[2]--;
                    } else {
                        K++;
                        E = N();
                    }
                    R(E[0], E[1], s, s, '#' + E[2] + '00');
                } else {
                    R(B[i][0], B[i][1], b, b, '#dd0'); // bullet
                }
            } else {
                B.splice(i, 1);
            }
        }

        // draw player
        R(O, o, s, s, '#dd0');

        // count time down
        T--;

        // draw infos
        w('T: ' + T/100, 0, 9);
        w('K: ' + K, 0, t);

        // if time is over
        if (!T) {
            W.clearInterval(M);

            w('HIT F5', S / 2, S / 2);
        }
    }, 1);
};
