import React from 'react';
import './BreadCrumb.css'
import { useLocation, Link } from 'react-router-dom';
import { useNavigation } from '../../context/BreadCrumbContext/NavigationContext';

const Breadcrumb = () => {
    const location = useLocation();
    const { navigationHistory} = useNavigation()
    const pathnames = location.pathname.split('/').filter(x => x);


    const fullPathNames = [...navigationHistory, ...pathnames]

    if (fullPathNames.length === 0) {
        return null; // Don't show anything if on the home page
    }

    return (
        <nav>
            <ol className='bread-crumb-list'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {fullPathNames.map((pathname, index) => {
                    const routeTo = `/${fullPathNames.slice(0, index + 1).join('/')}`;
                    const name = pathname.charAt(0).toUpperCase() + pathname.slice(1).replace(/-/g, ' ');

                    return (
                        <li key={routeTo}>
                            <span> / </span>
                            <Link to={routeTo}>{name}</Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;

