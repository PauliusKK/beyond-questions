$( document ).ready(function() {

    $navigationActive = false;

    $('button.new-post').click(function() {
        $('.add-new-post').toggle();
    })

    // START of FUNCTIONS

    // Load Rows function
    function loadRows() {

        // Variables and arrays
        $table = $('.week-container').find('table');
        $positionsArray = [];

        // Find each table, then find each row and store it's position into an array.
        $table.each(function() {
            $row = $(this).find('tr');
            $row.each(function() {
                $rowPosition = $(this).offset().top;
                $(this).addClass('row' + $rowPosition);
                $positionsArray.push($rowPosition);
            });
        });

        // Reversing the $positionsArray and creating new array with reversed objects.
        $newArray = [];
        $newArray = $positionsArray.reverse();

        // Function to check if user is scroll to the rows that needs to be appeared.
        function loadRowsLogic() {
            $scroll = $(window).scrollTop() + $(window).height() - 150;
            $x = $positionsArray.length;

            if( $(window).scrollTop() + $(window).height() > $(document).height() - 150 ) $('.week-container tr, .week-container td').addClass('loaded');

            while( $x > 0 ) {
                $rowsPosition = $newArray[$x];
                $x--;

                if( $scroll > $rowsPosition ) $('.row' + $rowsPosition + ', .row' + $rowsPosition + ' td').addClass('loaded');
            }
        }

        loadRowsLogic();

        // Checking when user's going to scroll down and appearing table rows.
        $(window).on('scroll', function() {
            loadRowsLogic();
        });
    }

    // Notification animation
    function disappearNotification() {
        $('.appearing-notification button.btn-exit').click(function() {
            var animationName = "animated bounceOutRight";
            var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend"

            $(this).parent().addClass(animationName);
            $(this).parent().one(animationEnd, function() {
                $(this).removeClass(animationName).hide();
            });
        })
    }

    // Resize video when you resize your screen in /video.html/
    function resizeVideo() {
        if( $(window).width() > 1200 ) {
            $max_width = $(window).height() + 200;

            if( $max_width >= 1280 ) { $max_width = 1280 }

            if( $(window).height() < 700 ) {
                $center_percentage = $(window).height() / 15;
                $max_width = $max_width - 50
            } else {
                $center_percentage = 50
            }

            $('section.video-content section.full-height-video .wistia-video').css({
                'max-width' : $max_width+'px',
                'top' : $center_percentage+'%',
                'transform' : 'translateY(-'+$center_percentage+'%)'
            })
        }
    }

    function loadAssetsIndex() {
        $('section.weeks .border, section.weeks ul.nav').addClass('loaded');
        $('.week-container').addClass('loaded');
    }

    // Load assets, such as slide down week labels.
    loadAssetsIndex();
    loadRows();


    $('button.btn-navigation, i.close-menu, .fadeMe').click(function() {
        $('nav.menu-appear').toggleClass('active');
        $('.navbar-header').toggleClass('active');
        $('#navigation').toggleClass('active');

        if( !$navigationActive ) {
            $('.fadeMe').css({ display: 'block' }).stop(true, true).animate({ opacity: 1 }, 400, BezierEasing(0.215, 0.61, 0.355, 1));
            $navigationActive = true;
        } else {
            $('.fadeMe').stop(true, true).animate({ opacity: 0 }, 400, BezierEasing(0.215, 0.61, 0.355, 1));
            $('.fadeMe').delay(400).queue(function() {
                $(this).stop(true, true).css({ display: 'none' });
            })
            $navigationActive = false;
        }
    });

    $('i.close-menu').hover(function() {
        $(this).toggleClass('active');
    });

    // Payment selection button animation
    $('.credit-card .round-button, .paypal .round-button').click(function() {

        // Variables
        $creditCard = 0;
        $paypalCard = 0;
        $creditCardButton = $(this).parent().parent().find('.credit-card .round-button');
        $paypalCardButton = $(this).parent().parent().find('.paypal .round-button');


        // Actual logic. I don't know how it works :D
        if( $creditCardButton.hasClass('active') ) {
            $creditCard = 1;
        } else {
            $creditCard = 0;
        }

        if( $paypalCardButton.hasClass('active') ) {
            $paypalCard = 1;
        } else {
            $paypalCard = 0;
        }

        if( $creditCard !== 1 && $paypalCard !== 1 ) {
            $(this).addClass('active');
        }

        else if ( $creditCard !== 0 || $paypalCard !== 0 ) {
            $creditCardButton.removeClass('active');
            $paypalCardButton.removeClass('active');
            $(this).addClass('active');
        }

    });

    $('img.video').click(function() {
        $notificationDiv = ('<div class="appearing-notification"><div class="border"></div><i class="icon-icon-bell"></i><h5>You received a reply from blake eastman<span>view</span></h5><button class="btn-exit"><i class="icon-icon-fat-close"></i></button></div>');
        $($notificationDiv).insertBefore('nav.menu-appear');
        $('.appearing-notification .border').animate({
            left: '100%'
        }, 10000)
        disappearNotification();
    })

    disappearNotification();

    // Add class to a label when you click on input.
    $('.input-field input').focus( function() {
        $(this).parent().find('label').addClass('active');
    });

    $('.input-field input').blur( function() {
        if( $(this).val() == "" ) {
            $(this).parent().find('label').removeClass('active');
        }
    });


    // Modal pop up animation, when you click on table row, which is locked, it checks the text value of the additional text, I'd say "button", which is in the second tab of tabel row. It depends on text value and shows the right modal window. So, if you click on a table row with additional text of coming soon, it won't show you the modal with premium content text in it.
    $(function () {

        $('tr.locked').on('click', function() {

            if( $(this).find("td.description span.additional-text").text().toLowerCase() == "comming soon" ) {
                $('.coming-soon-modal').addClass('md-show');
            }

            if( $(this).find("td.description span.additional-text").text().toLowerCase() == "premium" ) {
                $('.premium-content-modal').addClass('md-show');
            }

        });

        $('button.add-comment').on('click', function() {
            $('.modal-all-modals').addClass('md-show');
        });


        $('.buttons button').on('click', function() {
            $name = $(this).attr('name');
            $(this).closest(".md-modal").removeClass('md-show');
            $('.' + $name + '').addClass('md-show');
        });

        $('.md-close, .skip-question button, .replay-video button').on('click', function() {
            $(this).closest(".md-modal").removeClass('md-show');
        });

    });


    // Hover effect on table rows.
    $('tr:not(.locked):not(.watched)').hover(
        function() {
            $(this).find("td").css('background-color', 'rgba(0, 0, 0, 0.1)');
        }, function() {
            $(this).find("td").css('background-color', '#f7f7f7');
        }
    );

    // Hover effect on the center progress list items
    $('.center-progress ul li').hover(
        function() {
            $(this).stop(true, true).animate({ top: '8px' }, 300);
            $(this).find('p').stop(true, true).fadeIn(300);
        }, function() {
            $(this).stop(true, true).animate({ top: '28px' }, 300);
            $(this).find('p').stop(true, true).fadeOut(300);
        }
    );

    resizeVideo();

    $(window).resize(function() {
        resizeVideo();
    });


});