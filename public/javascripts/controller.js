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