import classes from './Layout.module.css'
import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FiMenu } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'

const Layout = (props) => {
	const [navbarOpen, setNavbarOpen] = useState(false);
	
	const toggleHandler = () => {setNavbarOpen(!navbarOpen)};

	const closeMenuHandler = () => {setNavbarOpen(false)};

	return(
		<>
			<header className={classes.primaryHeader}>
				<div className={classes.navContainer}>
						<div className={classes.navWrapper}>
							<a href='/'><img src={logo} className={classes.logo} alt='Sollah Interactive, LLC' width='247' height='50' /></a>
							<button onClick={toggleHandler} className={`${classes.mobileNavToggle}`}>{navbarOpen ? (<MdOutlineClose size='2.2rem' color='#000'/>) : (<FiMenu size='2.2rem' color='#000'/>) }</button>					
							
							<button className='button displaySmNone displayMdInlineFlex'>
								<Link to='/login' onClick={closeMenuHandler} >Log in</Link>
							</button>
						</div>
				</div>
				<nav className={`${classes.primaryNavigation} ${classes.navContainer} ${navbarOpen ? `${classes.showMenu}` : ''}`}>
					<ul aria-label='Primary'  className={classes.navList}>
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
			</header>
			<main className={classes.main}>
				<Outlet />
			</main>
		</>
	)
}

export default Layout