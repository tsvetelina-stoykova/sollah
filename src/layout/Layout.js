import { Link, Outlet } from "react-router-dom";
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
						<Nav className="mx-auto navbar-list">
							<Nav.Link eventKey="1" as={Link}  to="/" >Assets</Nav.Link>
							<Nav.Link eventKey="2" as={Link} to="/playlists" >Playlists</Nav.Link>
							<Nav.Link eventKey="3" as={Link} to="/blog" >Blog</Nav.Link>
							<Nav.Link eventKey="4" as={Link} to="/messages" >Messages</Nav.Link>
							<Nav.Link eventKey="5" as={Link} to="/profle" >Profile</Nav.Link>
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