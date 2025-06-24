import Layout from '../components/Layout';
import { useEffect } from 'react';
import Map from '../components/commons/Map';

export default function Contact() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Show map controls
			const mapZoomIn = document.getElementById('map-zoom-in');
			const mapZoomOut = document.getElementById('map-zoom-out');

			if (mapZoomIn) mapZoomIn.style.display = 'block';
			if (mapZoomOut) mapZoomOut.style.display = 'block';
		}
	}, []);

	return (
		<Layout>
			<section id="content-wrap" className="site-page">
				<div className="row">
					<div className="col-twelve">
						<section>
							<div className="content-media">
								<div id="map-wrap">
									<div id="map-container" style={{ height: '400px', width: '100%', position: 'relative' }}>
										<Map center={[10.8022418, 106.6397282]} zoom={15} />
									</div>
									<div id="map-zoom-in" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000, backgroundColor: 'white', width: '30px', height: '30px', textAlign: 'center', lineHeight: '30px', cursor: 'pointer', borderRadius: '2px', boxShadow: '0 1px 5px rgba(0,0,0,0.4)' }}>+</div>
									<div id="map-zoom-out" style={{ position: 'absolute', top: '50px', right: '10px', zIndex: 1000, backgroundColor: 'white', width: '30px', height: '30px', textAlign: 'center', lineHeight: '30px', cursor: 'pointer', borderRadius: '2px', boxShadow: '0 1px 5px rgba(0,0,0,0.4)' }}>-</div>
								</div>
							</div>

							<div className="primary-content">
								<h1 className="entry-title add-bottom">Get In Touch With Us.</h1>

								<p className="lead">Lorem ipsum Deserunt est dolore Ut Excepteur nulla occaecat magna occaecat Excepteur nisi esse veniam dolor consectetur minim qui nisi esse deserunt commodo ea enim ullamco non voluptate consectetur minim aliquip Ut incididunt amet ut cupidatat.</p>

								<p>Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat nostrud cupidatat dolor sunt sint sit nisi est eu exercitation incididunt adipisicing veniam velit id fugiat enim mollit amet anim veniam dolor dolor irure velit commodo cillum sit nulla ullamco magna amet magna cupidatat qui labore cillum sit in tempor veniam consequat non laborum adipisicing aliqua ea nisi sint ut quis proident ullamco ut dolore culpa occaecat ut laboris in sit minim cupidatat ut dolor voluptate enim veniam consequat occaecat fugiat in adipisicing in amet Ut nulla nisi non ut enim aliqua laborum mollit quis nostrud sed sed.</p>

								<div className="row">
									<div className="col-six tab-full">
										<h4>Where to Find Us</h4>
										<p>
											364 Etown Cong Hoa<br />
											Tan Binh District<br />
											70000 Ho Chi Minh City<br />
											Vietnam
										</p>
									</div>

									<div className="col-six tab-full">
										<h4>Contact Info</h4>

										<p>someone@abstractwebsite.com<br />
											info@abstractwebsite.com <br />
											Phone: (+63) 555 1212
										</p>
									</div>
								</div>

								<form name="cForm" id="cForm" method="post" action="">
									<fieldset>
										<div className="form-field">
											<input name="cName" type="text" id="cName" className="full-width" placeholder="Your Name" defaultValue="" />
										</div>

										<div className="form-field">
											<input name="cEmail" type="text" id="cEmail" className="full-width" placeholder="Your Email" defaultValue="" />
										</div>

										<div className="form-field">
											<input name="cWebsite" type="text" id="cWebsite" className="full-width" placeholder="Website" defaultValue="" />
										</div>

										<div className="message form-field">
											<textarea name="cMessage" id="cMessage" className="full-width" placeholder="Your Message" ></textarea>
										</div>

										<button type="submit" className="submit button-primary full-width-on-mobile">Submit</button>
									</fieldset>
								</form>
							</div>
						</section>
					</div>
				</div>
			</section>
		</Layout>
	);
}
