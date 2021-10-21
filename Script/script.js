$(function () {
    $('.carousel').carousel();
    $('.nav-link').click(function () {
        $('.nav-link.active').removeClass("active");
        $(this).addClass("active");
        $('.navbar-collapse').removeClass("show");
    });

    function SetSpace() {
        let navbarHeight = $('.navbar').height();
        $('.about, .work, .contact').css('margin-top', navbarHeight);
    }

    SetSpace();
});