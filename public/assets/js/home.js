if (sessionStorage.view == 'Picalica') {
    $('.picalica').css('display', 'inline-block');
} else if (sessionStorage.view == 'Khamsat') {
    $('.khamsat').css('display', 'inline-block');
} else if (sessionStorage.view == 'Kafiil') {
    $('.kafiil').css('display', 'inline-block');
} else {
    if (localStorage.view == 'Paypal') {
        $('.paypal').css('display', 'inline-block');
        $('.paypal a').attr('href', $('.paypal a').attr('href') + '&custom=' + localStorage.ref);
    } else {
        $('.picalica,.khamsat,.vodafone,.kafiil,.qawalleb,.monafiz').css('display', 'inline-block');
    }
}