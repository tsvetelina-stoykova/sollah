import classes from './MainNavigation.module.css'
import { NavLink } from 'react-router-dom'

const MainNavigation = () => {
	
	return(
		<header className={classes.header}>
			<div className={classes.logo}>
				<h3>Sollah</h3>
			</div>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink to='/' activeClassName={classes.active}>Home</NavLink>
					</li>
					<li>
						<NavLink to='/assets' activeClassName={classes.active}>Videos</NavLink>
					</li>
					<li>
						<NavLink to='/elearning' activeClassName={classes.active}>Elearning</NavLink>
					</li>
					<li>
						<NavLink to='/ez-start' activeClassName={classes.active}>E-Z Start</NavLink>
					</li>
					<li>
						<NavLink to='/topics' activeClassName={classes.active}>Topics</NavLink>
					</li>
					<li>
						<NavLink to='/recent' activeClassName={classes.active}>What's new</NavLink>
					</li>
					<li>
						<NavLink to='/blog' activeClassName={classes.active}>Blog</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default MainNavigation