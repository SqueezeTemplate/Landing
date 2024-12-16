/* Migrate Links */
let view_from_params = new URLSearchParams(location.search).get("view"),
    redirect_to;

if (view_from_params) {
    switch (view_from_params) {
        case "Documentation": redirect_to = "/documentation"; break;
        case "Faq": redirect_to = "/faq"; break;
        case "Updates": redirect_to = "/updates"; break;
        case "Clients": redirect_to = "/clients"; break;
        case "Free": redirect_to = "/free"; break;
        case "Merger": redirect_to = "/merger"; break;
        case "About": redirect_to = "/about"; break;
        case "Privacy": redirect_to = "/privacy"; break;
    }
    sessionStorage.view = view_from_params.toLowerCase();
    if (redirect_to) location.href = redirect_to;
}


// Activate current page link in header
let active_page_link = $(`#header nav a[href*=${viewid}]`);
if (active_page_link.length) {
    active_page_link.parent().addClass("selected");
} else {
    $(`.li-Home`).addClass("selected");
}

// Lib
$('body').on('click', '.mat-but:not(a,button,.disabled)', MaterialButton);
$('body').on('mousedown', 'a.mat-but,button.mat-but', MaterialButton);


function MaterialButton(e) {
    var but = $(this);
    var content = but.contents().filter(function () {
        return this.className != "ribbles"
    });
    if (but.find('.ribbles').length < 1) {
        but.append('<div class="but-content"></div>');
        $(content).appendTo(but.find('.but-content'));
        but.prepend('<div class="ribbles"></div>');
    }
    var ribbles = but.find('.ribbles');
    var d = Math.max(but.outerHeight(), but.outerWidth());
    x = e.pageX - $(this).offset().left - (d / 2);
    y = e.pageY - $(this).offset().top - (d / 2);
    var ribble = $('<span class="ribble"/>');
    ribbles.append(ribble);
    $(ribble).css({
        'width': d + 'px',
        'height': d + 'px',
        'left': x + 'px',
        'top': y + 'px'
    }).addClass('wav-in');
    setTimeout(function () {
        $(ribble).remove();
    }, 2e3)
}

function toast(content, button, icon) {
    var Content = '<div class="toast new notr ' + (icon ? 'iconed' : '') + '">';
    Content += icon ? '<span class="toast-icon tc-' + icon + '"></span>' : '';
    Content += '<p>' + content + '</p>';
    Content += button ? '<button>' + button + '</button>' : '';
    Content += '</div>';
    var NewToast = $(Content);
    NewToast.appendTo('.toast-wrapper').animate({
        bottom: 0,
        opacity: 1
    }, 200);
    setTimeout(function () {
        NewToast.animate({
            bottom: '20',
            opacity: '0'
        }, 200, function () {
            NewToast.remove();
        });
    }, 3e3);
}

function ArDate(date) {
    var cDate = new Date(date),
        pData = cDate.getDate() + ' ' + cDate.toLocaleDateString('ar', {
            month: 'long',
            year: 'numeric'
        });
    return pData
}

// Facebook Components
$(window).one('scroll', function () {
    $.getScript('https://connect.facebook.net/ar_AR/sdk.js', function () {
        FB.init({
            appId: '138142643527550',
            xfbml: true,
            version: 'v21.0'
        });
    });
    $.getScript('https://connect.facebook.net/ar_AR/sdk/xfbml.customerchat.js', function () {
        FB.init({
            appId: '138142643527550',
            xfbml: true,
            version: 'v21.0'
        });
    });
});
