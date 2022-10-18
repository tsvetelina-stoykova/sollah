import { Routes, Route} from 'react-router-dom';
import { RequireAuth } from './features/RequireAuth';

import Layout from './layout/Layout';
import Assets from './pages/Assets'
import Playlists from './pages/Playlists'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import Messages from './pages/Messages';
import MessageDetails from './pages/MessageDetails';
import Login from './pages/Login';
import Logout from './features/Logout';

function App() {
	return (
	<>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route index element={<Assets />} />
				<Route path="/blog" element={<Blog />}/>
				<Route path="/blog/:seo_id" element={<BlogDetails />} />
				<Route path="/playlists"
				 	element = {
						<RequireAuth>
							<Playlists />
						</RequireAuth>
					}/>
				<Route path="/messages"
				 	element = {
						<RequireAuth>
							<Messages />
						</RequireAuth>
					}/>
				<Route path="/messages/:id"
				 	element = {
						<RequireAuth>
							<MessageDetails />
						</RequireAuth>
					}/>
			</Route>
		</Routes>
	</>
	);
}

export default App;
