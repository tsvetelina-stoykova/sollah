import { Switch, Route } from 'react-router-dom' 
import Layout from './layout/Layout';

import Assets from './pages/Assets'
import Playlists from './pages/Playlists'
import Blog from './pages/Blog'
import Messages from './pages/Messages';


function App() {

  return (
	<>
		<Layout>
			<Switch>
				<Route path='/' exact>
					<Assets />
				</Route>
				<Route path='/playlists' exact>
					<Playlists />
				</Route>
				<Route path='/blog' exact>
					<Blog />
				</Route>
				<Route path='/messages' exact>
					<Messages />
				</Route>
			</Switch>
		</Layout>
	</>
  );
}

export default App;
