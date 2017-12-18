$("aside ul").hide();
$('.dropdown').dropdown();

// 侧边栏
$("#aside div").click(function () {
    $(".triangle-left").remove();

    $("#aside div").next().not($(this).next()).slideUp(500)
    $(this).next().slideToggle(500);

    $("#aside div").children(".right").not($(this).children(".right")).removeClass("down")
    $(this).children(".right").toggleClass("down"); 

});
//三角形
$("li").click(function(){
    $(".triangle-left").remove();
    $(this).append($('<span class="triangle-left"></span>'));
});


