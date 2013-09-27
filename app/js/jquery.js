$(window).load(function(){
    $('.cube').click(function(){
        alert("this");
        $(this).addClass('cube_rotate');
        setTimeout(function(){
           $('.cube').removeClass('cube_rotate');
        },1000);

        return false;
    });
});