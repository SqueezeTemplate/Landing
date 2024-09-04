let custom_views = ["khamsat", "kafiil", "monafiz"]

if (custom_views.includes(sessionStorage.view)) {
    $(`.${sessionStorage.view}`).css('display', 'inline-block');
} else {
    $('.khamsat,.vodafone,.kafiil,.qawalleb,.monafiz').css('display', 'inline-block');
}