import Layout from '../components/Layout';
import { useEffect } from 'react';

export default function Contact() {
	useEffect(() => {
		// Google Map initialization
		if (typeof window !== 'undefined' && window.google && window.google.maps) {
			const latitude = 14.549072;
			const longitude = 121.046958;
			const map_zoom = 15;
			const main_color = '#d8ac00';
			const saturation_value = -30;
			const brightness_value = 5;
			let marker_url = null;
			const winWidth = window.innerWidth;

			// show controls
			document.getElementById('map-zoom-in').style.display = 'block';
			document.getElementById('map-zoom-out').style.display = 'block';

			// marker url
			if (winWidth > 480) {
				marker_url = 'images/icon-location@2x.png';
			} else {
				marker_url = 'images/icon-location.png';
			}

			const style = [
				{ elementType: 'labels', stylers: [{ saturation: saturation_value }] },
				{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
				{ featureType: 'road.highway', elementType: 'labels', stylers: [{ visibility: 'off' }] },
				{ featureType: 'road.local', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
				{ featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
				{ featureType: 'road', elementType: 'geometry.stroke', stylers: [{ visibility: 'off' }] },
				{ featureType: 'transit', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'poi', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'poi.government', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'poi.sport_complex', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'poi.attraction', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'poi.business', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'transit', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'transit.station', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'landscape', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'road', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
				{ featureType: 'water', elementType: 'geometry', stylers: [{ hue: main_color }, { visibility: 'on' }, { lightness: brightness_value }, { saturation: saturation_value }] },
			];

			const map_options = {
				center: new window.google.maps.LatLng(latitude, longitude),
				zoom: map_zoom,
				panControl: false,
				zoomControl: false,
				mapTypeControl: false,
				streetViewControl: false,
				mapTypeId: window.google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
				styles: style,
			};

			const map = new window.google.maps.Map(document.getElementById('map-container'), map_options);

			const marker = new window.google.maps.Marker({
				position: new window.google.maps.LatLng(latitude, longitude),
				map: map,
				visible: true,
				icon: marker_url,
			});

			function CustomZoomControl(controlDiv, map) {
				const controlUIzoomIn = document.getElementById('map-zoom-in');
				const controlUIzoomOut = document.getElementById('map-zoom-out');
				controlDiv.appendChild(controlUIzoomIn);
				controlDiv.appendChild(controlUIzoomOut);
				window.google.maps.event.addDomListener(controlUIzoomIn, 'click', function () {
					map.setZoom(map.getZoom() + 1);
				});
				window.google.maps.event.addDomListener(controlUIzoomOut, 'click', function () {
					map.setZoom(map.getZoom() - 1);
				});
			}

			const zoomControlDiv = document.createElement('div');
			new CustomZoomControl(zoomControlDiv, map);
			map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);
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
									<div id="map-container"></div>
									<div id="map-zoom-in"></div>
									<div id="map-zoom-out"></div>
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
											1600 Amphitheatre Parkway<br />
											Mountain View, CA<br />
											94043 US
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
