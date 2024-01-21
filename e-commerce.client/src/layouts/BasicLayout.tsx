import { Outlet } from 'react-router-dom';

function BasicLayout(): JSX.Element {

    return <>
    <div>Header</div>
        <Outlet />
    <div>Footer</div>
    </>
}

export default BasicLayout;