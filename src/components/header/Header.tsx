import { NavLink } from 'react-router-dom'
import './Header.css'
import logo from '/logo.png'
import { setTheme } from '../../state/theme/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';

function Header() {
    const navItems = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'About', path: '/about' },
        { id: 3, name: 'Work', path: '/work' },
        { id: 4, name: 'Contact', path: '/contact' },
    ];
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch();

    return (
        <header>
            <nav aria-label="Global" className="navbar flex h-100">
                <div className="flex lg:flex-1">
                    <NavLink to="/">
                        <span className="sr-only">Chandan Bandi</span>
                        <img alt="Chandan Bandi logo" src={logo} className="logo" />
                    </NavLink>
                </div>
                <menu className='flex nav-menu'>
                    {navItems.map((item) => (
                        <NavLink key={item.id} to={item.path} className={({ isActive, isPending }) => isPending ? 'pending' : isActive ? 'active' : 'item'}>{item.name}</NavLink>
                    ))}
                </menu>
                <div className="flex lg:flex-1 p-1">
                    <button className="button-round" onClick={() => { theme === 'dark' ? dispatch(setTheme('light')) : dispatch(setTheme('dark')) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.666 6.734l-1.58-1.58" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header