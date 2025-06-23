import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function Header() {
	const router = useRouter();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setLoading(true);
				const res = await fetch(`http://localhost:3000/api/categories/list`);
				if (!res.ok) throw new Error('Failed to load Categories');

				const data = await res.json();
				setCategories(data);
			} catch (err) {
				setError(err.message || 'Unexpected error');
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	if (loading) return <p>Loading Categories...</p>;
	if (error) return <p>Error: {error}</p>;
	if (categories.length === 0) return <p>No Categories found.</p>;

	return (
		<>
			<header className="short-header">
				<div className="gradient-block"></div>
				<div className="row header-content">
					<div className="logo">
						<Link href="/">Author</Link>
					</div>
					<nav id="main-nav-wrap">
						<ul className="main-navigation sf-menu">
							<li className={router.pathname === '/' ? 'current' : ''}>
								<Link href="/">Home</Link>
							</li>
							<li className={router.pathname.startsWith('/categories') ? 'has-children current' : 'has-children'}>
								<Link href="/categories/ui">Categories</Link>
								<ul className="sub-menu">
									{categories.map(category => (
										<li key={category.id}><Link href={`/categories/${category.slug}`}>{category.name}</Link></li>
									))}
								</ul>
							</li>
							<li className={router.pathname.startsWith('/blogs') ? 'has-children current' : 'has-children'}>
								<Link href="/blogs/redirect-post?type=standard">Blog</Link>
								<ul className="sub-menu">
									<li><Link href="/blogs/redirect-post?type=video">Video Post</Link></li>
									<li><Link href="/blogs/redirect-post?type=audio">Audio Post</Link></li>
									<li><Link href="/blogs/redirect-post?type=gallery">Gallery Post</Link></li>
									<li><Link href="/blogs/redirect-post?type=standard">Standard Post</Link></li>
								</ul>
							</li>
							<li className={router.pathname === '/style-guide' ? 'current' : ''}>
								<Link href="/style-guide">Styles</Link>
							</li>
							<li className={router.pathname === '/about' ? 'current' : ''}>
								<Link href="/about">About</Link>
							</li>
							<li className={router.pathname === '/contact' ? 'current' : ''}>
								<Link href="/contact">Contact</Link>
							</li>
						</ul>
					</nav>
					<div className="search-wrap">
						<form role="search" method="get" className="search-form" action="#">
							<label>
								<span className="hide-content">Search for:</span>
								<input type="search" className="search-field" placeholder="Type Your Keywords" defaultValue="" name="s" title="Search for:" autoComplete="off" />
							</label>
							<input type="submit" className="search-submit" defaultValue="Search" />
						</form>
						<a href="#" id="close-search" className="close-btn">Close</a>
					</div>
					<div className="triggers">
						<a className="search-trigger" href="#"><i className="fa fa-search"></i></a>
						<a className="menu-toggle" href="#"><span>Menu</span></a>
					</div>
				</div>
			</header>
		</>
	);
}