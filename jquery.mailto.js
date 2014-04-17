/**
 * Simple Anti-spambot email address
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
    $.fn.mailto = function(){
        $(this).each(function(){
            var $elem = $(this);
            var $emailAddress = function(){
                var $email = '';                
                if($elem.attr('data-account')){
                    var $email = $elem.attr('data-account') + '@';                    
                    if($elem.attr('data-host')){
                        $email += $elem.attr('data-host');
                    } else {
                        $email += window.location.hostname.replace('www.','');
                    }
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
