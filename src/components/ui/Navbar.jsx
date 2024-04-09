import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Playlist Builder', path: '/PlaylistBuilder' },
    { name: 'Sign Up', path: '/signup' },
    { name: 'Profile', path: '/profile' },
    { name: 'Sign In', path: '/signin' },
  ];

  return (
    <nav className="w-full bg-gray-800 text-white p-3">
      <ul className="flex justify-around">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'underline text-blue-200' : 'no-underline'
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
