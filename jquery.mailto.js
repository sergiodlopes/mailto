/**
 * jQuery MailTo
 * Simple jQuery plugin to hide email addresses from bot harvesters
 *
 * Depends:
 * jquery.js 1.7+
 *
 * Demo:
 * http://jquery.sergiodinislopes.pt/mailto/
 * 
 * Github:
 * https://github.com/sergiodlopes/mailto/ 
 */
    $.fn.mailto = function(options){        
        options = $.extend({}, {
            host: false, // Default host
            prepend: false // Prepend email address to element
        }, options);
        
        $(this).each(function(){
            var $elem = $(this);
            // Get email address
            var $emailAddress = function(){
                var $email,$host = '';
                
                // Set host
                $host = options.host;
                if(!$host){
                    $host = $elem.attr('data-host') ? $elem.attr('data-host') : window.location.hostname.replace('www.','')
                }
                           
                // Email account name its in the attribute
                if($elem.attr('data-account')){
                    return $elem.attr('data-account') + '@' + $host;                
                } else {
                    var $text = $elem.text();
                    $elem.contents().filter(function(){ return this.nodeType != 1; }).remove();
                    return $text.replace(' at ', '@').split(' dot ').join('.');                    
                }
                return $email;
            }
            
            var $email = $emailAddress();
            // Prepend email address to element?
            if(options.prepend){
                $elem.prepend($email + ' ');
            } else {
                $elem.append(' ' + $email);
            }
            // If is <a>
            if($elem.is('a')){
                var $mailto = 'mailto:' + $email;
                if($elem.attr('data-subject')){
                    $mailto += '?subject=' + encodeURIComponent( $elem.attr('data-subject') );
                }                     
                $elem.attr('href', $mailto);
            }
        });    
    };    
