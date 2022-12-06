import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import AuthStatus from "../features/AuthStatus";
import "./Layout.css";
import { ThemeProvider, Container, Nav, Navbar } from "react-bootstrap";

const Layout = () => {
	return(
		<ThemeProvider
			breakpoints={["xxs", "sm"]}
			minBreakpoint="xxs"
		>
			<Navbar collapseOnSelect className="primary-header" expand="lg">
				<Container>
					<Navbar.Brand href="/">
						<img src={logo} alt='Sollah Interactive, LLC' width='230' height='46' />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav defaultActiveKey="/" className="mx-auto navbar-list">
							<ul>
								<li>
									<NavLink to="/" end>Assets</NavLink>
									<NavLink to="/playlists">Playlists</NavLink>
									<NavLink to="/blog" >Blog</NavLink>
									<NavLink to="/messages">Messages</NavLink>
									<NavLink to="/profile">Profile</NavLink>
								</li>
							</ul>
						</Nav>
						<Nav>
							<AuthStatus />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<main className='main'>
				<Outlet />
			</main>
		</ThemeProvider>
	)
}

export default Layout