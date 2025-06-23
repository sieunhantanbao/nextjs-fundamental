export default function FeaturedPost({ posts }) {
    return (
        <div class="brick entry featured-grid animate-this">
						<div class="entry-content">
							<div id="featured-post-slider" class="flexslider">
								<ul class="slides">

									<li>
										<div class="featured-post-slide">

											<div class="post-background"
												style="background-image:url('images/thumbs/featured/featured-1.jpg');"></div>

											<div class="overlay"></div>

											<div class="post-content">
												<ul class="entry-meta">
													<li>September 06, 2016</li>
													<li><a href="#">Naruto Uzumaki</a></li>
												</ul>

												<h1 class="slide-title"><a href="single-standard.html"
														title>Minimalism Never Goes Out of Style</a></h1>
											</div>

										</div>
									</li>

									<li>
										<div class="featured-post-slide">

											<div class="post-background"
												style="background-image:url('images/thumbs/featured/featured-2.jpg');"></div>

											<div class="overlay"></div>

											<div class="post-content">
												<ul class="entry-meta">
													<li>August 29, 2016</li>
													<li><a href="#">Sasuke Uchiha</a></li>
												</ul>

												<h1 class="slide-title"><a href="single-standard.html"
														title>Enhancing Your Designs with Negative Space</a></h1>
											</div>

										</div>
									</li>

									<li>
										<div class="featured-post-slide">

											<div class="post-background"
												style="background-image:url('images/thumbs/featured/featured-3.jpg');;"></div>

											<div class="overlay"></div>

											<div class="post-content">
												<ul class="entry-meta">
													<li>August 27, 2016</li>
													<li><a href="#" class="author">Naruto Uzumaki</a></li>
												</ul>

												<h1 class="slide-title"><a href="single-standard.html" title>Music
														Album Cover Designs for Inspiration</a></h1>
											</div>

										</div>
									</li>

								</ul>
							</div>
						</div>
					</div>
    );
}