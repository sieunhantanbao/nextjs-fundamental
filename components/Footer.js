import { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    // const loadAjaxChimp = async () => {
    //   if (typeof window !== 'undefined') {
    //     const $ = (await import('jquery')).default;
    //     if (!$.fn.ajaxChimp) {
    //       await import('jquery-ajaxchimp');
    //     }
    //     $('#mc-form').ajaxChimp({
    //       language: 'es',
    //       url: 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&id=e65110b38d'
    //     });
    //     if ($.ajaxChimp && $.ajaxChimp.translations) {
    //       $.ajaxChimp.translations.es = {
    //         'submit': 'Submitting...',
    //         0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
    //         1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
    //         2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    //         3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    //         4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    //         5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
    //       };
    //     }
    //   }
    // };
    // loadAjaxChimp();
  }, []);

  return (
     <footer>

   	<div className="footer-main">

   		<div className="row">  

	      	<div className="col-four tab-full mob-full footer-info">            

	            <h4>About Our Site</h4>

	               <p>
		          	Lorem ipsum Ut velit dolor Ut labore id fugiat in ut fugiat nostrud qui in dolore commodo eu magna Duis cillum dolor officia esse mollit proident Excepteur exercitation nulla. Lorem ipsum In reprehenderit commodo aliqua irure labore.
		          	</p>

		      </div>

	      	<div className="col-two tab-1-3 mob-1-2 site-links">

	      		<h4>Site Links</h4>

	      		<ul>
	      			<li><a href="#">About Us</a></li>
						<li><a href="#">Blog</a></li>
						<li><a href="#">FAQ</a></li>
						<li><a href="#">Terms</a></li>
						<li><a href="#">Privacy Policy</a></li>
					</ul>

	      	</div>

	      	<div className="col-two tab-1-3 mob-1-2 social-links">

	      		<h4>Social</h4>

	      		<ul>
	      			<li><a href="#">Twitter</a></li>
						<li><a href="#">Facebook</a></li>
						<li><a href="#">Dribbble</a></li>
						<li><a href="#">Google+</a></li>
						<li><a href="#">Instagram</a></li>
					</ul>
	      	           	
	      	</div>

	      	<div className="col-four tab-1-3 mob-full footer-subscribe">

	      		<h4>Subscribe</h4>

	      		<p>Keep yourself updated. Subscribe to our newsletter.</p>

	      		<div className="subscribe-form">
	      	
	      			<form id="mc-form" className="group" noValidate={true}>

							<input type="email" defaultValue="" name="dEmail" className="email" id="mc-email" placeholder="Type &amp; press enter" required="" /> 
	   		
			   			<input type="submit" name="subscribe" />
		   	
		   				<label htmlFor="mc-email" className="subscribe-message"></label>
			
						</form>

	      		</div>	      		
	      	           	
	      	</div>

	      </div>

   	</div>

      <div className="footer-bottom">
      	<div className="row">

      		<div className="col-twelve">
	      		<div className="copyright">
		         	<span>© Copyright Abstract 2016</span> 
		         	<span>Design by <a href="http://www.styleshout.com/">styleshout</a></span>		         	
		         </div>

		         <div id="go-top">
		            <a className="smoothscroll" title="Back to Top" href="#top"><i className="icon icon-arrow-up"></i></a>
		         </div>         
	      	</div>

      	</div> 
      </div>

   </footer>  
  );
}