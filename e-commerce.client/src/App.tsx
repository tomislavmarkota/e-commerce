import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import BasicLayout from './layouts/BasicLayout';
import Login from './features/auth/Login';



function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<BasicLayout />}>
              

                <Route path="/">
                    <Route index element={<div>dashboard</div>} /> 
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="admin" element={<div>admin</div> }></Route>
            </Route>
        )
    );
  
    return <RouterProvider
        router={router}
        fallbackElement={<h1>LOADING</h1>}
    />;
}

export default App;