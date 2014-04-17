/**
 * Simple jQuery plugin to hide email addresses from bot harvesters
 *
 *  // Javascript
 *  $('a.email').mailto();
 *  
 *  Example 1:
 *  // HTML
 *  <a class="email" data-account="my.name" data-host="ispprovider.com" data-subject="Information Request"></a>
 *  // Result
 *  <a class="email" href="mailto:my.name@ispprovider.com?subject=Information%20Request">my.name@ispprovider.com</a>
 *  
 *  Example 2:
 *  // HTML
 *  <a class="email" data-account="my.name"></a>
 *  // Result
 *  <a class="email" href="mailto:my.name@currenthost.com">my.name@currenthost.com</a>
 *  
 *  Example 3:
 *  // HTML
 *  <a class="email"><i class="icon"></i> my dot name at ispprovider dot com</a>
 *  // Result
 *  <a class="email" href="mailto:my.name@ispprovider.com"><i class="icon"> my.name@ispprovider.com</a>
 *
 */
    $.fn.mailto = function(options){        
        options = $.extend({}, {
            host:false
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
            $elem.append(' ' + $email);
            if($elem.is('a')){
                var $mailto = 'mailto:' + $email;
                if($elem.attr('data-subject')){
                    $mailto += '?subject=' + encodeURIComponent( $elem.attr('data-subject') );
                }                     
                $elem.attr('href', $mailto);
            }
        });    
    };    
