function start() {
    move('start');
}

function prev() {
    move('prev');
}

function next() {
    move('next');
}

function move(step) {
    var body = '{"cmd" : "' + step + '"}';
    console.log(body);
    console.log(step);
        $.ajax({
            type:'POST',
            url:'controller',
            data: body,
            contentType:'application/json',
            dataType:'json',
            cache:false,
            async:true
        });
}

var hammer = new Hammer(document.getElementById("touchscreen"), {swipe_time:500});
hammer.onswipe = function(ev) { 
    if (ev.direction === 'right')
        prev();
    if (ev.direction === 'left')
        next();
    };
hammer.ontap = function(ev) {
    start();
};