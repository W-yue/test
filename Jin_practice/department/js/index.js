$("aside ul").hide();
$('.dropdown').dropdown();


// 侧边栏
$("#aside div").click(function () {
    $(".triangle-left").remove();

    // 侧边栏下滑列表
    $("#aside div").next().not($(this).next()).slideUp(500)
    $(this).next().slideToggle(500); 

    // 点击下滑列表，右边的图标变化
    // $("#aside div").children(".right").not($(this).children(".right")).removeClass("down");
    // $(this).children(".right").toggleClass("down");

});

//三角形
// $("li").click(function(){
//     //点击侧边栏中的内容出现的白色三角形
//     $(".triangle-left").remove();
//     $(this).append($('<span class="triangle-left"></span>'));
// });

    


