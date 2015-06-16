;(function($) {

  (function(pluginName) {

    defaults = {
      hidden: null,

      tumblr: function() {
        updateFavicon('favicons/tumblr.ico');

        var count = Math.round(Math.random() * 10);
        var title = 'Tumblr';

        if (count > 5) {
          title = '(' + count + ') Tumblr';
        }

        $(document).prop('title', title);
      },

      twitter: function() {
        updateFavicon('favicons/twitter.ico');
        $(document).prop('title', 'Twitter');
      },

      gmail: function() {

        var title      = 'Inbox';
        var count      = Math.round(Math.random() * 12);
        var emailCount = count;
        var gmailIcon  = 'favicons/gmail_';

        if (count === 11) {
          count      = 50;
          emailCount = count + "+";
        } else if (count === 12) {
          count      = 100;
          emailCount = count + "+";
        }

        updateFavicon(gmailIcon + count + '.ico');

        if (emailCount) {
          title = 'Inbox (' + emailCount + ')';
        }

        $(document).prop('title', title);
      }

    };

    function init() {

      if (typeof document.hidden !== "undefined") { 
        defaults.hidden = "hidden";
        visibilityChange = "visibilitychange";
      } else if (typeof document.mozHidden !== "undefined") {
        defaults.hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
      } else if (typeof document.msHidden !== "undefined") {
        defaults.hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        defaults.hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
      }

      document.addEventListener(visibilityChange, handleVisibilityChange, false);

    };

    function setDefaultFavicon() {
      updateFavicon(defaults.favicon);
      $(document).prop('title', defaults.title);
    };

    function updateFavicon(icon) {

      var randomString = "?v=" + Math.round(Math.random() * 10000000);
      var link  = document.createElement('link');

      link.type = 'image/x-icon';
      link.rel  = 'shortcut icon';
      link.href = icon + randomString;

      $("head").find("[rel='shortcut icon']").remove();
      document.getElementsByTagName('head')[0].appendChild(link);

    };

    function enableService() {
      var i = Math.round(Math.random() * (defaults.services.length - 1));
      var service = defaults.services[i];

      if (service && defaults[service]) {
        defaults[service].call();
      }

    };

    function handleVisibilityChange() {
      if (document[defaults.hidden]) {
        enableService();
      } else {
        setDefaultFavicon();
      }
    };

    $.fn[pluginName] = function(options) {

      defaults = $.extend(true, {}, defaults, options);

      defaults.favicon = $('link[rel="shortcut icon"]')[0].href;
      defaults.title   = $(document).find("title").text();

      init();
    };

    $.fn[pluginName].defaults = defaults;

  })('faviconChameleon');

})(jQuery);
