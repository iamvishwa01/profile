$(document).ready(function(){
    
    app.mobileMenu();

    $(window).resize(function(){
        app.design();
    });
    $('body').bind('mousemove', function(e){
        const cursor = $('.cur-follo');
        cursor.css({'top':(e.pageY)+'px', 'left':(e.pageX)+'px'});
        if(e.clientY < $('header').outerHeight()) { 
            $('header').removeClass('headerHide');
        }
    });
    if($(window).width() > 768) {
        $('.cur-follo').show();
        $('a, button').mouseenter(function(){
            $('.cur-follo>.outer-cir').show();
        });
        $('a, button').mouseleave(function(){
            $('.cur-follo>.outer-cir').hide();
        });
    }
    var lastScrollTop = 0;
    $(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
        $('header').addClass('headerHide');
        $('.navi-links .nav').removeClass('open');
        $('.navi-links>ul>li').removeClass('fade');
    } else {
        $('header').removeClass('headerHide');
    }
        lastScrollTop = st;
        var currentTop = $(window).scrollTop();
        var elems = $('section');
        elems.each(function(index){
          var elemTop 	= $(this).offset().top;
          var elemBottom 	= elemTop + $(this).height();
          if(currentTop >= elemTop-100 && currentTop <= elemBottom){
              var id 		= $(this).attr('id');
              var navElem = $('a[href="#' + id+ '"]');
              navElem.parent().addClass('active').siblings().removeClass( 'active' );
            }
        });
    });
    app.events();
});
$(window).on('load', function(){
    app.design();
});
var app = {
    design : function() {
        if($(window).width() < 576) {
            var spceVh = $(window).innerHeight()*0.18;
        } else {
            var spceVh = $(window).innerHeight()*0.3;
        }
        var timelineWd = $('body').height() - spceVh - 17; //17px for scrollbar width
        if($(window).width() < 768) {
            timelineWd -= 10;
        }
        $('hr.timeline').css('width',timelineWd+'px');

    },
    mobileMenu : function() {
        const navLinks = $('.navi-links .nav');
        const links = $('.navi-links>ul>li');

        $('.hamburger').on('click', function(){
            $(navLinks).toggleClass('open');
            $(this).toggleClass('close');
            $(links).each(function(){
                $(this).toggleClass('fade');
            });
        });
        $(links).on('click', function(){
            if($(window).width() < 768) {
                $('.hamburger').click();
            }
        });
    },
    events: function() {
        var stepNo = 1;
        var $step = $('.contact-steps');
        $('#getInTch').on('click', function(){
            $('.contact-steps-wrapper').fadeIn('fast');
            $('body').css('overflow','hidden');
            $step.first().fadeIn();
        });
        $('#closeForm').on('click', function(){
            $('.contact-steps-wrapper').fadeOut('fast');
            $('body').css({'overflow':'inherit','overflow-x':'hidden'});
            stepNo = 1;
            $('.curr-step').html(stepNo);
            $step.fadeOut();
            $('#nextStep').text('NEXT');
        });
        $('#contForm').find('input').on('keyup', function(){
            if($(this).val() != "" && $(this).val() != null ) {
                $(this).addClass('hasVal');
            } else {
                $(this).removeClass('hasVal');
            }
        });
        $('#nextStep').on('click', function(){
            stepNo++;
            if(stepNo > 3) {
                // $(this).text('DONE');
                $('#closeForm').click();
            } else {
                $step.fadeOut().promise().done( function(){
                    $step.eq(stepNo).fadeIn(); 
                });
                $('.curr-step').html(stepNo);
            }
        });
        $('#closeVid').on('click', function(){
            $('#indulgeModal').fadeOut('fast');
            $('body').css({'overflow':'inherit','overflow-x':'hidden'});
            player.stopVideo();
        });
        $('#indulgeVidMod').on('click', function(e){
            e.preventDefault();
            $('#indulgeModal').fadeIn('fast').css('display','flex');
            $('body').css('overflow','hidden');
            setTimeout(playVideo, 400);
        });
        $(document).on('keyup', function(e) { 
            if (e.key == "Escape") { 
                $('#closeVid').click();
                $('#closeForm').click();
            } 
        }); 
    }
        
}

//Youtube video player.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    videoId: '7l9wNoZDUso',
    playerVars: {
        color: 'white',
        rel: 0
    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
    });
}

function onPlayerReady() {}
function onPlayerStateChange(e) {
    if(e.data === 0){
        player.playVideo();
    }
}
function playVideo() {
    player.playVideo();
}
