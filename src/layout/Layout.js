import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FiMenu } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'
import AuthStatus from '../features/AuthStatus'
import './Layout.css'

const Layout = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);
	
	const toggleHandler = () => {setNavbarOpen(!navbarOpen)};

	const closeMenuHandler = () => {setNavbarOpen(false)};

	return(
		<>
			<header className=' primary-header'>
				<div className='container'>
				<div className='nav-container row justify-content-between'>
					<div className='logo-wrapper'>
						<a href='/'><img src={logo} className='logo' alt='Sollah Interactive, LLC' width='230' height='46' /></a>
						<button onClick={toggleHandler} className='mobile-nav-toggle'>{'navbar-open' ? (<MdOutlineClose size='2.2rem' color='#000'/>) : (<FiMenu size='2.2rem' color='#000'/>) }</button>					
					</div>
					<nav className={navbarOpen ? 'primary-navigation navbar-open show-menu' : 'primary-navigation'}>
						<ul aria-label='Primary'  className='nav-list'>
							<li>
								<NavLink to='/' onClick={closeMenuHandler} >Assets</NavLink>
							</li>
							<li>
								<NavLink to='/playlists' onClick={closeMenuHandler} >Playlists</NavLink>
							</li>
							<li>
								<NavLink to='/blog' onClick={closeMenuHandler} >Blog</NavLink>
							</li>
							<li>
								<NavLink to='/messages' onClick={closeMenuHandler} >Messages</NavLink>
							</li>
						</ul>
					</nav>
					<div><AuthStatus /></div>	
					</div>	
				</div>				
			</header>
			<main className='main'>
				<Outlet />
			</main>
		</>
	)
}

export default Layout