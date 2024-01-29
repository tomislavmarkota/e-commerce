import { Outlet } from 'react-router-dom';
import BasicLayoutStyle from './BasicLayout.module.scss'

function BasicLayout(): JSX.Element {

    return (<div className={BasicLayoutStyle.Layout}>
        <div>Header</div>
        <div className={BasicLayoutStyle.PageWrapper}>
            <Outlet />
        </div>
        <div>Footer</div>
    </div>);
}

export default BasicLayout;