$(document).scroll(function () {
    let $nav = $(".fixed-top")
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height())
})