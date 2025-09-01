interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<html>
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.indigo.min.css"
				/>
				<title>My DIY Blog</title>
			</head>
			<body>
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
			</body>
		</html>
	);
}
