/* global a */
var M,
    W = window,
    S = 640, // window size
    s = 32, // size
    t = 22, // tempo
    B = [], // bullet
    k = 6, // Bullet size
    r = function (i, j) { // generate random number in range i to j
        'use strict';

        return Math.floor((Math.random() * (j - i)) + i);
    },
    N = function () { // generate new enemy
        'use strict';

        return [r(0, S - s), r(0, S - (s * 3))];
    },
    E = N(), // Enemy
    l = 9, // Enemy life
    O = 0, // Player y
    o = S - (s * 1.5), // Player y
    K = 0, // KILLS
    T = 9999, // Time to count down
    d = function (x, y, w, h, c) { // draw rectangle
        'use strict';

        a.beginPath();
        a.rect(x, y, w, h);
        a.fillStyle = c;
        a.fill();
    },
    w = function (t, x, y) {
        'use strict';

        a.fillStyle = '#fff';
        a.t(t, x, y);
    };

a.t = a.fillText;
a.canvas.width = a.canvas.height = S;

// Bindings
W.onkeydown = function (e) {
    'use strict';

    if (e.keyCode === s) { // fire, use var s, 'cause its - 1byte
        B.push([O + (s / 2) - (k / 2), o]);
    }
};

W.onmousemove = function (e) {
    'use strict';

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

d(0, 0, S, S, '#987'); // background
w('GO', s, s);

W.onclick = function () {
    'use strict';

    this.onclick = null;
    // main();
    M = W.setInterval(function () {
        // draw map
        a.clearRect(0, 0, S, S);
        d(0, 0, S, S, '#987'); // background

        // enemy
        d(E[0], E[1], s, s, '#6' + l + l);

        // bullets
        for (var i = 0; i < B.length; i++) {
            B[i][1] -= 2;

            if (B[i][1] >= 0) { // if not end of the field
                var A = B[i][1] <= E[1] + s,
                    Z = B[i][0] > E[0] - k && B[i][0] < E[0] + s,
                    u = E[0];

                if (A && Z) { // enemy collision
                    B.splice(i, 1);
                    if (l > 0) {
                        l--;

                        if (r(0, 9) >= 5) {
                            u -= s*1.5;
                        } else {
                            u += s*1.5;
                        }

                        if (u < 0) {
                            u += s*3;
                        }

                        if (u > (S - s)) {
                            u -= s*3;
                        }

                        E[0] = u;
                    } else {
                        K++;
                        E = N();
                        l = 9;
                    }
                    d(E[0], E[1], s, s, '#6' + l + l);
                } else {
                    d(B[i][0], B[i][1], k, k, '#dd0'); // bullet
                }
            } else {
                B.splice(i, 1);
            }
        }

        // draw player
        d(O, o, s, s, '#dd0');

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
