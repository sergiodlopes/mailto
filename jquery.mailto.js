/**
 * jQuery MailTo
 * Simple jQuery plugin to hide email addresses from bot harvesters
 *
 * Depends:
 * jquery.js 1.7+
 *
 * Demo:
 * http://projects.sergiodinislopes.pt/mailto/example/
 * 
 * Github:
 * https://github.com/sergiodlopes/mailto/ 
 */
(function($) {
    $.fn.mailto = function(options) {        
        options = $.extend({}, {
            text:false, // By default link text is the email address
            host: window.location.hostname.replace('www.',''), // Default host
            account: false, // Account
            prepend: false // Prepend email address to element
        }, options);
        
        return this.each(function() {
            var $elem = $(this);            
            var $options = $.extend({}, options, $elem.data());          
        
            // Get email address
            var $emailAddress = function() {
                var $email = '';
                           
                // Email account name its in the attribute
                if($options.account) {
                    return $options.account + '@' + $options.host;                
                } else {
                    var $text = $elem.text();
                    $elem.contents().filter(function() {
                        return this.nodeType != 1;
                    }).remove();
                    return $text.replace(' at ', '@').split(' dot ').join('.');                    
                }
                return $email;
            }
            
            var $email = $emailAddress();
            
            if(!$options.text){
                $options.text = $email;
            }
            // Prepend email address to element?
            if($options.prepend){
                $elem.prepend($options.text + ' ');
            } else {
                $elem.append(' ' + $options.text);
            }
            // If is <a>
            if($elem.is('a')){
                var $mailto = 'mailto:' + $email;
                if($options.subject){
                    $mailto += '?subject=' + encodeURIComponent( $options.subject );
                }                     
                $elem.attr('href', $mailto);
            }
        });    
    };
})(jQuery);