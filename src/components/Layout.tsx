interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<main className="container">
			<nav>
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
				</ul>
				<ul>
					<li>
						<button
							onClick={() => {
								const theme =
									document.documentElement.getAttribute("data-theme");
								document.documentElement.setAttribute(
									"data-theme",
									theme === "light" ? "dark" : "light"
								);
							}}
						>
							Toggle Theme
						</button>
					</li>
				</ul>
			</nav>
			{children}
		</main>
	);
}
