$(function () { 
    "use strict";
    
    // Initiate the wowjs animation library
    new WOW().init();
    
    // Initiate menu
    $('#header').after('<div class="mobile-menu d-xl-none">');
    $('.top-menu').clone().appendTo('.mobile-menu');
    $('.mobile-menu-btn').click(function () {
        $('.mobile-menu').stop().slideToggle();
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    // Portfolio modal slider
    $('.port-slider').delay(10000);
    $('.port-slider').slick({
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.port-slider-nav'
    });
    $('.port-slider-nav').slick({
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.port-slider',
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });
    
    $('#popover-content-download').hide();
    $("[data-toggle=popover]").each(function (e) {
        $(this).popover({
            html: true,
            content: function () {
                var id = $(this).attr('id')
                return $('#popover-content-' + id).html();
            }
        });
    });
    
    // Date and time picker
    $('#date-1, #date-2, #date-3, #date-4, #date-5, #date-6').datetimepicker({
        format: 'L'
    });
    $('#time-1, #time-2').datetimepicker({
        format: 'LT'
    });

    // Booking form validation and submission
    $("#bookingForm input, #bookingForm select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var fname = $("input#fname").val();
            var lname = $("input#lname").val();
            var name = fname + ' ' + lname;
            var mobile = $("input#mobile").val();
            var email = $("input#email").val();
            var date_1 = $("input#date-1").val();
            var date_2 = $("input#date-2").val();
            var time_1 = $("input#time-1").val();
            var time_2 = $("input#time-2").val();
            var adult = $("select#adult").val();
            var kid = $("select#kid").val();
            var request = $("input#request").val();
            
            $this = $("#bookingButton");
            $this.prop("disabled", true);

            $.ajax({
                url: "./booking.php",
                type: "POST",
                data: {
                    fname: fname,
                    lname: lname,
                    mobile: mobile,
                    email: email,
                    date_1: date_1,
                    time_1: time_1,
                    date_2: date_2,
                    time_2: time_2,
                    adult: adult,
                    kid: kid,
                    request: request
                },
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    $('#bookingForm').trigger("reset");
                },
                error: function (xhr, status, error) {
                    console.error('Error Status:', status);
                    console.error('Error Details:', error);
                    console.error('Response Text:', xhr.responseText);
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#bookingForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
