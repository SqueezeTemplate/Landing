$('.item-head h2').each(function () {
    var title = $(this).text();
    $(this).text(title.split('-')[0]);
    // $(this).after('<p>' + title.split('-')[1] + '</p><i class="clear"></i>');
});
$('.main-content li span').each(function () {
    if ($(this).text().length < 3) { $(this).remove(); }
})