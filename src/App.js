import { Switch, Route } from 'react-router-dom' 
import Layout from './layout/Layout';

import Home from './pages/Home'
import Videos from './pages/Videos'
import Elearning from './pages/Elearning'
import Ezstart from './pages/Ezstart';
import Topics from './pages/Topics';
import NewAssets from './pages/NewAssets';
import Blog from './pages/Blog';


function App() {

  return (
	<>
		<Layout>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/assets' exact>
					<Videos />
				</Route>
				<Route path='/elearning' exact>
					<Elearning />
				</Route>
				<Route path='/ez-start' exact>
					<Ezstart />
				</Route>
				<Route path='/topics' exact>
					<Topics />
				</Route>
				<Route path='/recent' exact>
					<NewAssets />
				</Route>
				<Route path='/blog' exact>
					<Blog />
				</Route>

			</Switch>
		</Layout>
	</>
  );
}

export default App;
