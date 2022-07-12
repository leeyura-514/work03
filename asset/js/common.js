$(function(){
    /**
    * 고정 메뉴 보이기 & 메뉴 버튼 클릭 시 메뉴 열고 닫기
    * @version 1.0.0
    * @since 2022-06-11
    * @author 이유라 (Nico)
    * @memo
    */
   $(window).scroll(function(){
       var curr = $(this).scrollTop(); 
       target = $('.sc-visual').offset().top; 

        if (curr >= target) {
            $('.fixed-header').addClass('show');
            
        } else {
            $('.fixed-header').removeClass('show');
            
        }
   })//


   $('.btn-menu').click(function(){
        if ($('.sub-gnb-wrap').css('display') == 'none') {
            $('.sub-gnb-wrap').css('display','block')
            $(this).addClass('close');
            
        } else {
            $('.sub-gnb-wrap').css('display','none')
            $(this).removeClass('close');
        }
   })




    /**
    * hover 시, 서브 메뉴 리스트 보이기 
    * @version 1.0.0
    * @since 2022-06-12
    * @author 이유라 (Nico)
    * @memo
    * issue : display로는 실현되지않음!
    */


    // $('.category-item > a').hover(function(){
           
    //     $(this).find.$('.sub-menu-wrap').addClass('active').siblings().removeClass('active');
    // },function(){
    //     $(this).find.$('.sub-menu-wrap').removeClass('active').siblings().addClass('active');

    // })//
 

//    $('.category-item .cat-dept').hover(function(e){
//         e.preventDefault();
//         var  child = $(this).child('.sub-menu-wrap');

//         if (chidld.css('visibility') == 'hidden') {
//             $('.sub-menu-wrap').css('visibility','visible')
//             // child.addClass('active');
            
//         } else {
//             $('.sub-menu-wrap').css('visibility','hidden')
//             // child.removeClass('active');

            
//         }
//     })//

$('.category-item').hover(function(){
    $(this).addClass('hover');
    // @@ li한테만 active주면 됨 출발지점, 기준점이라서!!! 자식한테 굳이 안줘도됨
    // $(this).children('.sub-menu-wrap').addClass('hover');
},function(){
    $('.category-item').removeClass('hover');
    // $(this).children('.sub-menu-wrap').removeClass('hover');
});
    
  






    /**
    * 탑버튼 클릭 시, 상단으로 이동
    * @version 1.0.0
    * @since 2022-06-12
    * @memo 
    */
   $('.btn-top').click(function(e){

        e.preventDefault();
        $('body,html').animate({scrollTop:0})
   })//




})//end










    
    
    
   
    
    
    
    
   



