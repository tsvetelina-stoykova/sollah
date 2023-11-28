import { Routes, Route} from 'react-router-dom';
import { RequireAuth } from './features/RequireAuth';

import Layout from './layout/Layout';
import AssetsList from './pages/Assets/AssetsList';
import AssetDetails from './pages/Assets/AssetDetails';
import NewAssets from './pages/Assets/NewAssets';
import Profile from './pages/Profile/Profile';
import Playlists from './pages/Playlists/Playlists'
import Blog from './pages/Blog/Blog'
import BlogDetails from './pages/Blog/BlogDetails'
import Messages from './pages/Messages/Messages';
import MessageDetails from './pages/Messages/MessageDetails';
import Login from './pages/Login';
import Logout from './features/Logout';

function App() {
	return (
	<>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<AssetsList />} />
				
				<Route exact path="/login" element={<Login />} />
				
				<Route exact path="/logout" element={<Logout />} />
				<Route exact path="/whats-new"  element={<NewAssets />} />
				<Route exact path="/blog" element={<Blog />}/>
				<Route path="/blog/:seo_id" element={<BlogDetails />} />
				
				<Route path="/profile" element = {
						<RequireAuth>
							<Profile />
						</RequireAuth>
				}/>

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

				<Route path="/:id" element={<AssetDetails />} />
			</Route>
		</Routes>
	</>
	);
}

export default App;
