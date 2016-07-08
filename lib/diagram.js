function initDiagram(data) {
    var words = {};
    var sortedWords = [];
    var highest = 0;
    var width = 300;
    var height = 300;
    var totalWidth = 300 * 3;
    var biggestFontSize = 64;
    var ul = $('<ul>').addClass('circles');
    var left = 0;
    var top = 0;
    var size = 100;
    var circles = [];
    var colours = [
        'bluegloss', 'orangegloss', 'pinkgloss', 'redgloss',
        'greygloss', 'greybluegloss',
        'brown3d', 'gold3d', 'green3d', 'grey3d', 'yellow3d',
        'olive3d', 'orange3d', 'pink3d', 'purple3d', 'red3d',
        'bluegloss', 'orangegloss', 'pinkgloss', 'redgloss',
        'greygloss', 'greybluegloss',
        'brown3d', 'gold3d', 'green3d', 'grey3d', 'yellow3d',
        'olive3d', 'orange3d', 'pink3d', 'purple3d', 'red3d'
    ];

    for(var i = 0; i < data.length; i ++) {
        var item = data[i];
        var word = item.word;

        if(typeof(words[word]) == 'undefined') {
            words[word] = [];
        }

        words[word].push(data[i]);
    }

    delete data;
    for(var key in words) {
        var count = words[key].length;

        if(count > highest) {
            highest = count;
        }

        sortedWords.push(
            {
                word: key,
                length: count
            }
        );
    }

    sortedWords.sort(
        function(a, b) {
            if (a.length < b.length) {
                return -1;
            }

            if (a.length > b.length) {
                return 1;
            }

            return 0;
        }
    );

    sortedWords.reverse();


    for(var i = 0; i < sortedWords.length; i ++) {
        (
            function() {
                var key = sortedWords[i].word;
                var count = words[key].length;
                var colour = colours.shift(0);
                var s = size - (100 / sortedWords.length);
                var percent = s;
                var w = parseInt(width / 100 * percent);
                var h = parseInt(height / 100 * percent);
                var t = top;
                var l = left;

                size = s;
                left += w;

                if(left >= totalWidth) {
                    left = 0;
                    top += h;
                }

                var circle = $('<li>').addClass('circle').css(
                    {
                        width: w + 'px',
                        height: h + 'px',
                        borderRadius: '50%',
                        color: '#fff',
                        fontSize: parseInt(percent / 100 * biggestFontSize) + 'px',
                        lineHeight: h + 'px'
                    }
                ).addClass(
                    colour
                ).html(key).attr(
                    'title', key
                ).on('click',
                    function() {
                        var modal = $('<div>').addClass('modal');
                        var tweets = words[key];
                        var ul = $('<ul>').appendTo(modal);
                        var li;
                        var close = $('<a>').addClass(
                            'close'
                        ).html(
                            '&times;'
                        ).appendTo(modal).on('click',
                            function() {
                                modal.remove();
                            }
                        );

                        for(var i = 0; i < tweets.length; i ++) {
                            li = $('<li>').addClass('tweet');
                            li.append(
                                $('<span>').addClass('text').text(
                                    tweets[i].text
                                )
                            );

                            li.append(
                                $('<a>').addClass('at').text(
                                    '@' + tweets[i].username
                                ).attr(
                                    'href',
                                    'https://twitter.com/' + tweets[i].username
                                ).attr(
                                    'target', '_blank'
                                )
                            );

                            li.append(
                                $('<span>').addClass('time').text(
                                    tweets[i].date
                                )
                            );

                            li.append(
                                $('<img>').addClass('avatar').attr(
                                    'src', tweets[i].avatar
                                ).attr(
                                    'width', 60
                                )
                            );

                            ul.append(li);
                        }

                        $('body').append(modal);
                    }
                );

                circles.push(circle);
            }
        )();
    }

    circles = (
        function(o) {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o
        }
    )(circles);

    for(var i = 0; i < circles.length; i ++) {
        ul.append(circles[i]);
        setTimeout(
            (
                function(circle) {
                    return function() {
                        circle.addClass('active');
                    }
                }
            )(circles[i]),
            100 * i
        );
    }

    $('body').append(ul);
}
