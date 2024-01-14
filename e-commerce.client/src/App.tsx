import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import BasicLayout from './layouts/BasicLayout';
import Login from './features/auth/Login';
import AuthLayout from './layouts/AuthLayout';
import PersistLogin from './layouts/PersistLogin';



function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<BasicLayout />}>
              
                <Route path="login" element={<Login />} />
                <Route path="/">
                    <Route index element={<div>dashboard</div>} /> 
                </Route>
                <Route>
                </Route>
                <Route element={<PersistLogin />}>
                    <Route element={<AuthLayout />}>
                        <Route path="admin" element={<div>admin</div>} />
                        <Route path="users" element={<div>admin</div>} />
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