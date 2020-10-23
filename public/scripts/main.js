/*!
    * Start Bootstrap - Resume v6.0.1 (https://startbootstrap.com/template-overviews/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    scrollAction();

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });

    // Show form
    $("#contactmelink").click(function() {
        if(document.getElementById('contact').style.display === 'none') {
            $('#contact').show();
            $('input').val('');
            $('#sendMessage').val('Send Message');
            $('textarea').val('')
        } 
    })

    $('form').on('submit', (e) => {
        e.preventDefault();

        const name = $("#name").val().trim();
        const company = $("#company").val().trim();
        const email = $("#email").val().trim();
        const phone = $("#phone").val().trim();
        const subject = $("#subject").val().trim();
        const message = $("#message").val().trim();

        const data = {
            name,
            company,
            email,
            phone,
            subject,
            message
        }

        $.post('/contact', data, () => {
            $('#thankyou').show(800, function() {
                $("#contact").hide();
            });
        })
    })

    // Dynamic copyright
    let date = new Date();
    let year = date.getFullYear();

    $('#copyright').html("<div><p>Copyright ©" + year + " Sanda Htyte</div></p>");

})(jQuery); // End of use strict

function scrollAction() {
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });
}