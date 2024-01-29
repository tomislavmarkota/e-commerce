import { Link, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.scss';
import BasicLayout from './layouts/basicLayout/BasicLayout';
import Login from './features/auth/Login/Login';
import PersistLogin from './layouts/PersistLogin';
import Authorize from './layouts/Authorize';
import AdminComponent from './components/AdminComponent';
import Users from './components/Users';
import Dashboard from './components/Dashboard';

function App() {
    
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<BasicLayout />}>
              
                <Route path="login" element={<Login />} />
                <Route path="/">
                    <Route index element={<Dashboard/>} /> 
                </Route>

                <Route element={<PersistLogin />}>
                    <Route path="auth" element={<div>
                        <Link to={'/auth'}>GO BACK TO AUTH</Link>
                        <Link to={"/admin"}>Admin route protected</Link>
                        <Link to={"/"}>Dashboard</Link>
                        <Link to={"/users"}>Users route protected</Link>
                    </div>} />
                        
                        <Route path="users" element={<Users/>} />

                 
                        <Route element={<Authorize acceptedRoles={["ADMIN"]} />}>
                            <Route path="admin" element={<AdminComponent />} />
                        </Route>
      
          
              
                </Route>
            </Route>
        )
    );
  
    return <RouterProvider
        router={router}
        fallbackElement={<h1>LOADING</h1>}
    />;
}

export default App;