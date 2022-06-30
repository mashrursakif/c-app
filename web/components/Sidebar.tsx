import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
	href: string;
	text: string;
}

const links = [
	{ href: '/', text: 'Home' },
	{ href: '/posts', text: 'Posts' },
	{ href: '/profile', text: 'Profile' },
	{ href: '/settings', text: 'Settings' },
	{ href: '/logout', text: 'Logout' },
];

const Sidebar = () => {
	const [current, setCurrent] = useState('');
	const router = useRouter();

	useEffect(() => {
		if (router.pathname) {
			setCurrent(router.pathname);
		}
	}, [router]);

	const SidebarLink = ({ href, text }: Props) => (
		<div className={`link${current === href ? ' current' : ''}`}>
			<Link href={href}>
				<a>{text}</a>
			</Link>
		</div>
	);

	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<h1>Cat App</h1>
			</div>
			<div className="sidebar-links">
				{links.map((l, index) => (
					<SidebarLink key={index} href={l.href} text={l.text} />
				))}
			</div>
		</div>
	);
};

export default Sidebar;
