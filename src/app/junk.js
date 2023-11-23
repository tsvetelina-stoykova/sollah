function makeURL(path, params) {
	let query = [];
	for(let k in params) {
		if(params[k] !== '' && params[k] !== null) {
			query.push(`${k}=${params[k]}`);
		}
	}
	return path + '?' + query.join('&');
}

const getAssets = createAsyncThunk(
  'assets/getAssets',
  async (filter, api) => {
    const state = api.getState();
    const limit = state.assets.pagesize;
    const offset = (filter.page-1)*limit;

    api.dispatch({type:'assets/filter', payload: filter});
    api.dispatch({type:'assets/pending', payload: filter});

    let url = makeUrl('https://sollahlibrary.com/mapi/4/assets', {
      q: filter.q,
      type_id: filter.type_id,
      topic_id: filter.topic_id,
      learning_path_id: filter.learning_path_id,
      target_audience_id: filter.target_audience_id,
      industry_setting_id: filter.industry_setting_id,
      language_id: filter.language_id,
      offset, 
      limit
    });

    const result = await fetch(url).then(res => res.json());
    api.dispatch({type:'assets/success',  payload: {
      assets: result.assets, 
      count: result.count, 
      filter
    }});
  }
);


<DropdownButton id="dropdown-basic-button" title="Add to Playlist">
  { 
    playlists.mine.map((pid) => {
      const p = playlists.map[pid];
      const added = p.asset_ids.includes(id);
      return p.id > 0 ? (
        <Dropdown.Item 
          key={p.id} 
          onClick={() => dispatch(togglePlaylist({
            asset_id:id, playlist_id:pid, add: !added}))}
        >
          <label><input type="checkbox" value={p.id} checked={added} readOnly/>
            {" "}{p.name}</label>
        </Dropdown.Item>
      ) : null
    })
  }
</DropdownButton>

{ asset_id, playlist_id, add }


export const togglePlaylist = createAsyncThunk(
	"playlists/togglePlaylist",
	async ({ asset_id, playlist_id, add }, api) => {
		const user = api.getState().auth.user;
		// api.dispatch({type:"playlists/togglePlaylist/fulfilled", payload:{ asset_id, playlist_id, add }});
		return await fetch(`https://sollahlibrary.com/mapi/4/playlists/${playlist_id}/assets/${asset_id}`, {
			method: add ? "PUT" : "DELETE",
			headers: { "x-authorization-token": user.token },
			mode: "cors",
		}).then((res) => ({ asset_id, playlist_id, add }));
	}
);

'assets/success': (state, action) => {
  const filter = action.payload.filter;
  const {assets} = action.payload;
  state.status[filter.page] = 'success';
  for(let a of assets) {
    if(!(state.map[a.id] && state.map[a.id].components)) {
      state.map[a.id] = a;
    }
  }
  
  state.count = action.payload.count;
  if(state.index.length === 0) {
    state.index = new Array(state.count);
    state.index.fill(null);
  }
  state.index.splice((filter.page-1)*state.pagesize, assets.length, ...assets.map(a=>a.id));
}


const langs = useMemo(() => {
  return asset?.components ?
    asset.components.map(c => c.lang).reduce(
      (langs, l) => (langs.includes(l) ? langs : [...langs, l]), []) :
    [];
}, [asset?.components]);

{filtered_components.length ?
  filtered_components.map(component => <AssetComponent 
      key={component.id} component={component} />) :
  "Loading"
}

<p className="message-text">
  {new DOMParser().parseFromString(msg.message, "text/html").documentElement.textContent}
</p>

const handleTab = (playlist_id) => {
  setCurrentTab(playlist_id);
};



<div className="create-playlist">
  <form onSubmit={handleCreate}>
    <input defaultValue={created} onChange={
        (e) => setCreated(e.target.value)}/>
    <input type="submit" value="Create Playlist" className="button" />
  </form>
</div>



const handleCreate = (e) => {
  e.preventDefault()
  dispatch(createPlaylist({name:created}));
};



export const createPlaylist = createAsyncThunk(
	"playlists/createPlaylist",
	async ({name}, api) => {
		const user = api.getState().auth.user;
		return await fetch("https://sollahlibrary.com/mapi/4/playlists", {
			method: "POST",
			headers: {"x-authorization-token": user.token, 'content-type':'application/json'},
			body: JSON.stringify({name}),
			mode: "cors",
		}).then(handleResponse);
	}
);




function handleResponse(response){
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if(!response.ok){
			const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
		}
		return data;
	})
}

<Route path="/profile" element = {
  <RequireAuth>
    <Profile />
  </RequireAuth>
}/>

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const changeFilter = (id, val) => {
  dispatch(getAssets({ ...filter, [id]: val, page: 1 }));
}






function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function mark(s) {
return `<mark>${s}</mark>`;
}

const words = filter.q.trim().split(/\s+/).filter(s=>s.length).map(escapeRegExp);
const regex = words.length ? new RegExp(`(${words.join("|")})`, "gi") : null;



const escapeRegExp = (s) => {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
  
const highlightAsset = ({title, description}, keywords) => {
	const words = keywords
					.trim()
					.split(/\s+/)
					.filter(a => a.length)
					.map(escapeRegExp);
	if(words.length) {
		const regex = new RegExp(`(${words.join("|")})`, "gi");
		title = title.replace(regex, '<mark>\$1</mark>');
		description = description.replace(regex, '<mark>\$1</mark>');
	}
	return {title, description};	
}




<DropdownButton id="dropdown-basic-button" title="Add to Playlist">
{ 
  playlists.mine.map((pid) => {
    const p = playlists.map[pid];
    const added = p.asset_ids.includes(id);
    return p.id > 0 ? (
      <Dropdown.Item 
        key={p.id} 
        onClick={() => dispatch(
          togglePlaylist({asset_id:id, playlist_id:pid, add: !added}))}
      >
        <label><input type="checkbox" value={p.id} checked={added} readOnly/>
          {" "}{p.name}
        </label>
      </Dropdown.Item>
    ) : null
  })
}
</DropdownButton>



export const togglePlaylist = createAsyncThunk(
	"playlists/togglePlaylist",
	async ({ asset_id, playlist_id, add }, api) => {
		const user = api.getState().auth.user;
		return await fetch(
      `https://sollahlibrary.com/mapi/4/playlists/${playlist_id}/assets/${asset_id}`,
    {
			method: add ? "PUT" : "DELETE",
			headers: { "x-authorization-token": user.token },
			mode: "cors",
		}).then((res) => ({ asset_id, playlist_id, add }));
	}
);


const langs = useMemo(() => {
  return asset?.components 
  ? asset.components.map(c => c.lang).reduce(
    (langs, l) => (langs.includes(l) ? langs : [...langs, l]), []) 
  :[];
}, [asset?.components]);



export const getProfile = createAsyncThunk(
	'profile/getProfile',
	async (payload, api) => {
		const user = api.getState().auth.user;
		return await fetch("https://sollahlibrary.com/mapi/4/profile", {
			headers: { "x-authorization-token": user.token },
			mode: "cors",
		}).then((res) => res.json());
	}
)


<Form onSubmit={handleSubmit}>
  <Form.Label>Email address</Form.Label>
  <Form.Control 
    type="email" name="email" value={email} onChange={handleEmail}/>
  <Form.Label>Password</Form.Label>
  <Form.Control 
    type="password" name="password" value={password} onChange={handlePassword} />
  <Button className="form-button" type="submit" disabled={auth.pending}>
    Log In
  </Button>
</Form>


<ThemeProvider>
  <Navbar />
  ...
  <main className='main'>
    <Outlet />
  </main>
</ThemeProvider>


const filtered_components = useMemo(() => {
  return asset?.components 
    ? asset.components.filter(c => (c.lang === currentLang)) 
    :[];
}, [asset?.components, currentLang]);

export default Blog = () => {
	const blogs = useSelector((state) => state.blogs);
	useEffect(() => {
		if(blogs.index.length === 0) dispatch(listAll());
	}, [dispatch, blogs.index.length]);
	
	return (
		<div className="container">
			{blogs.index.map(
        (seo_id) => <BlogItem key={seo_id} post={blogs.map[seo_id]}/>
      )}
		</div>
	)
}

useEffect(() => {
  if(blogs.index.length === 0) dispatch(listAll());
}, [dispatch, blogs.index.length]);


[listAll.fulfilled]: (state, action) => {
  const {posts} = action.payload;
  state.status="success";
  state.index = posts.map(p=>p.seo_id);
  for(let p of posts) {
    state.map[p.seo_id] = p;
  }
}