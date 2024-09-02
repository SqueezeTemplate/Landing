/* Sidebar */
$(window).scroll(function () {
    if ($(window).width() > 768) { /* DESKTOP */
        var MainBottom = ($('main').offset().top + $('main').outerHeight());
        var AsideBottom = ($('aside').offset().top + $('aside').outerHeight());
        if ($(window).scrollTop() < $('main').offset().top) {
            $('aside').removeAttr('style');
        }
        if ($(window).scrollTop() >= ($('main').offset().top - 90) && ($(window).scrollTop() + $(window).height()) < MainBottom) {
            $('aside').attr('style', 'position:fixed;top:90px');
        }
        if (($(window).scrollTop() + $(window).height()) >= MainBottom) {
            $('aside').attr('style', 'position:absolute;bottom:0;');
        }
    } else { /* MOBILE */
        if ($(window).scrollTop() >= $('main').offset().top - 90) {
            $('aside').css('top', '60px').addClass('fixed');
            $('aside > nav').before('<select id="nav-mobile" onchange="$(\'body,html\').stop().animate({\'scrollTop\':$($(this).val()).offset().top - 125})"/>').find('a').each(function () {
                $('#nav-mobile').append('<option value="#' + $(this).attr('data-section') + '">' + $(this).text() + '</option>');
            }).closest('nav').remove();
        } else {
            $('aside').removeAttr('style class');
        }
    }
}); /* Nav */
$('aside nav a').click(function () {
    $("html,body").stop().animate({
        'scrollTop': $('#' + $(this).attr('data-section')).offset().top - 60
    });
    window.location.assign('#' + $(this).attr('data-section'))
}); /* Widget Sections */
$('.cate-count').each(function () {
    $(this).append('<option disabled selected>-- اختر --</option>');
    for (var i = 1; i <= 30; i++) {
        $(this).append('<option value="' + i + '">' + i + '</option>');
    }
});
$('.cates-type span').click(function () {
    var genParent = $(this).closest('.generator');
    $(this).addClass('choosen').siblings().removeClass('choosen');
    if (genParent.find('[data-type="slideshow"]').hasClass('choosen')) {
        genParent.find('.count').addClass('hide')
    } else {
        genParent.find('.count').removeClass('hide')
    }
});
$('.cate-source').change(function () {
    if ($(this).val() === 'label') {
        $(this).next('.cate-label').removeClass('hide');
    } else {
        $(this).next('.cate-label').addClass('hide');
    }
    if ($(this).val() === 'comments') {
        $(this).closest('.generator').find('.type').addClass('hide');
    } else {
        $(this).closest('.generator').find('.type').removeClass('hide');
    }
});
$('.lang-generator').on('submit', function (e) {
    e.preventDefault();
    var textarea = $(this).find('textarea');
    var words = [];
    $(this).find('input').each(function () {
        words.push("'" + $(this).val().replace(/\'/g, "\\'") + "'");
    });
    textarea.removeClass('hide').text(words.toString(''));
});
$('.generator .generate button').click(function () {
    var genParent = $(this).closest('.generator'),
        WidGent = genParent.hasClass('Wid') ? true : false,
        Type = WidGent ? genParent.find('.cate-type').val() : genParent.find('.choosen').attr('data-type'),
        Count = genParent.find('.cate-count').val(),
        Source = genParent.find('.cate-source').val(),
        Place = genParent.attr('data-place'),
        Def = Place === 'sqCate' ? 'هذا القسم' : 'هذه الأداة'; /* Exeptions */
    $('.genError').remove();
    if (Source === 'label') {
        Source = genParent.find('.cate-label input').val()
    }
    if (Type === 'slideshow') {
        Count = 6;
    }
    if (Source === 'comments') {
        Type = 'comments';
    } /* Generate */
    genParent.find('.generate textarea').removeClass('hide').html('<i class="' + Place + '" data-type="' + Type + '" data-len="' + Count + '" data-label="' + Source + '"></i>'); /* Message */
    if (Source === null) {
        genError('لابد من اختيار مصدر التدوينات ل' + Def);
    }
    if (Source === '') {
        genError('لابد من إدخال التسمية');
    }
    if (Count === null) {
        genError('لابد من اختيار عدد التدوينات ل' + Def);
    }
    if ((!WidGent && (Type === undefined || Type === null)) || (WidGent && Type === null && Source !== 'comments')) {
        genError('لابد من اختيار شكل ' + Def);
    } /* Error Func() */
    function genError(txt) {
        genParent.find('.generate').prepend('<p class="genError">' + txt + '</p>');
        genParent.find('.generate textarea').addClass('hide');
    }
});
$('*').each(function () {
    if (!$(this).is('code,textarea,output') && $(this).find('code,textarea').length == 0) {
        $(this).addClass('dc');
    }
}); /* Videos */
$.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUh6sbBM5-NC-2Dhl7TEVI2g&maxResults=50&order=date&fields=items(snippet(resourceId%2FvideoId%2Cthumbnails%2Fmedium%2Furl%2Ctitle))&key=AIzaSyCGwv29RMuN-nO1g1DHqzA7HcgIYe24_dg', function (data) {
    $.each(data.items, function (i, item) {
        var Content = new String();
        Content += '<a class="yt-video" id="' + item.snippet.resourceId.videoId + '" target="_blank" href="https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId + '">';
        Content += '<img loading="lazy" src="' + item.snippet.thumbnails.medium.url + '">';
        Content += '<h6>' + item.snippet.title + '</h6>';
        Content += '</a>';
        $('#tuts').append(Content);
    });
}); /* Menu Highlight */
$(window).scroll(function () {
    $('.main-content section').each(function () {
        if ($(window).scrollTop() >= $(this).offset().top - 100) {
            $('aside > nav a').removeClass('active');
            $('aside > nav a[data-section="' + $(this).attr('id') + '"]').addClass('active');
        }
    });
    $('.main-content section > div[id]').each(function () {
        if ($(window).scrollTop() >= $(this).offset().top - 100) {
            $('aside nav ul li ul li a').removeClass('active');
            $('aside nav ul li ul li a[data-section="' + $(this).attr('id') + '"]').addClass('active');
        }
    });
});
$(".video-generator").on("submit", function (e) {
    e.preventDefault();
    $(this).find("output").text("<!--video " + $(this).find("textarea").val() + " -->")
});
$('body').on('click', '.copy-code', function () {
    navigator.clipboard.writeText($(this).prev("output").text());
    toast('تم نسخ كود الفيديو إلى الحافظة!', null, 'info');
});