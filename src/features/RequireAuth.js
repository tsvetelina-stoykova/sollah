import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({children}) => {
	const location = useLocation();	
	const auth = useSelector((state) => state.auth);
	if(!auth.user) {;
		return <Navigate to="/login" state={{ from: location }} replace />
	}
	return children;
}
