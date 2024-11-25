import { NavLink } from 'react-router-dom'
import './Header.css'
import logo from '/logo.png'

function Header() {
    const navItems = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'About', path: '/about' },
        { id: 3, name: 'Work', path: '/work' },
        { id: 4, name: 'Contact', path: '/contact' },
    ]

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
            </nav>
        </header>
    )
}

export default Header