$(function() {
    var t = $('#time');

    t.focus();

    t.bind('paste', function(e) {
        setTimeout(function() {
            t.val(process(t.val()));
        }, 100);
    });
});

function process(v) {

    var total = 0;

    v = v.replace(/(\d\d?):(\d\d?) - (\d\d?):(\d\d?)/g, function(match, s1, s2, e1, e2) {

        var s = (Number(s1) * 60) + Number(s2);
        var e = (Number(e1) * 60) + Number(e2);

        var t = e - s;
        total += t;

        var h = Math.floor(t / 60);
        var m = t % 60;

        return s1 + ':' + s2 + ' - ' + e1 + ':' + e2 + ' [' + pad(h) + ':' + pad(m) + ']';
    });

    var h = Math.floor(total / 60);
    var m = total % 60;

    var r = 100 / 60;
    var d = Math.round(total * r);

    v += '\nTotal: [' + pad(h) + ':' + pad(m) + '] $' + d + '\n\n';

    return v;
}

function pad(n) {
    return (n < 10 ? '0' : '') + n;
}

/*

Mar 18, 00:00 - 03:30 Some task
Mar 19, 02:00 - 04:00 Some other task

*/