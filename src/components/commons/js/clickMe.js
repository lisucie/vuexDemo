function onload(){

	var trigger = $('.hamburger'),
         isClosed = false;

        trigger.click(function () {
          hamburger_cross();      
        });

        function hamburger_cross() {

          if (isClosed == true) {          
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
          } else {   
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
          }
      }
      
      $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
      });  


      var numFa=$(".fa");
         
         for(var i=0;i<numFa.length;i++){
            $(".nav").find(".menu").on('click',function(){
                 var  index=$(".nav").find(".menu").index(this);
                   // console.log(index)
                   $(".menu").css({"background":"transparent","margin-left":"3px"})
                   $(".menu").eq(index).css({"background":"gray","marigin-left":"3px"})
            })
       
     }

     var numSon=$(".son");
         
         for(var i=0;i<numSon.length;i++){
            $(".nav").find(".son").on('click',function(){
                 var  index=$(".nav").find(".son").index(this);
                   // console.log(index)
                   $(".son").css({"background":"transparent","margin-left":"3px"})
                   $(".son").eq(index).css({"background":"yellow","marigin-left":"3px"})
            })
       
     }

       //阻止dropdown-menu点击下拉自动关闭事件冒泡
            $('.dropdown-menu').click(function(e) {
              e.stopPropagation();
            });
            
         //阻止点击内容下拉框自动关闭
             $('#page-content-wrapper').click(function(e) {
              e.stopPropagation();
            });
              
              /*f5事件*/
             document.addEventListener("keydown", function (e) {
              if(e.keyCode==116) {
                  // e.preventDefault();
                  //要做的其他事情
                  confirm("您确定离开此页并刷新页面吗")
                  window.location.href="http://localhost:8080/#/main"
              }
            }, false);

            /* window.onload=function(e){
              if(window.location.href!='http://localhost:8080/#/main')
                  confirm("您确定离开此页并刷新页面吗")
                 window.location.href="http://localhost:8080/#/main"
             }*/


    }

export {
	onload
}