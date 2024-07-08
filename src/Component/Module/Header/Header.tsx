import React, { useContext, useEffect, useState } from 'react';
import bookstoreLogo from '../../image/bookheader.png';
import './header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../Redux';
import Authcontex from '../../../Context/Auth/AuthContext';
import toast from 'react-hot-toast';

const Header = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const context = useContext(Authcontex);
  const { CheckuserFunction } = context;
  const action = bindActionCreators(actionCreators, dispatch);
  const [Checkuser, setTCheckuser] = useState(Boolean);

  useEffect(() => {
    CallCheckuser()
  }, [Checkuser]);

  const CallCheckuser = async () => {
    props.setLoading(true);
    try {
      const response = await CheckuserFunction();
      if (response.Success === true) {
        setTCheckuser(response.data);
        props.setLoading(false);
      } else {
        toast.error('Invalid User', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          duration: 2000,
        })
        props.setLoading(false);
      }
    } catch {
      toast.error('Server is not working', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        duration: 2000,
      })
      props.setLoading(false);
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token');
    action.Logout(true);
    navigate('/login');
  }

  return (
    <div>
      <nav className='nav flex-column'>
        <img src={bookstoreLogo} alt='Bookstore Logo' className='logo img-fluid mb-3' />

        <Link className={`nav-link collapsed mt-0 ${location.pathname === '/' ? 'active' : ''}`} to='/'>
          <i className='fs-4 bi-house'></i> <span className='ms-1 d-none d-sm-inline'>Home</span>
        </Link>

        <Link className={`nav-link collapsed mt-0 ${location.pathname === '/dashboard' ? 'active' : ''}`} to='/dashboard'>
          <i className='fs-4 bi-speedometer'></i> <span className='ms-1 d-none d-sm-inline'>Dashboard</span>
        </Link>

        <Link className={`nav-link collapsed mt-0
        ${location.pathname === '/product' ||
            location.pathname === '/category' ||
            location.pathname === '/subcategory' ? 'active' : ''}`}
          data-bs-toggle='collapse' to='#submenu2' aria-expanded='false'>
          <i className='fs-4 bi-gear-wide-connected'></i> <span className='ms-1 d-none d-sm-inline'>Setting</span>
        </Link>

        <div className='collapse submenu' id='submenu2'>

          <Link className={`nav-link collapsed mt-0 ${location.pathname === '/product' ? 'active' : ''}`} to='/product' hidden={!Checkuser}>
            <i className='bi bi-shop'></i> <span className='ms-1 d-none d-sm-inline'>Product</span>
          </Link>

          <Link className={`nav-link collapsed mt-0 ${location.pathname === '/category' ? 'active' : ''}`} to='/category' hidden={!Checkuser}>
            <i className='bi bi-columns-gap'></i> <span className='ms-1 d-none d-sm-inline'>Category</span>
          </Link>

          <Link className={`nav-link collapsed mt-0 ${location.pathname === '/subcategory' ? 'active' : ''}`} to='/subcategory' hidden={!Checkuser}>
            <i className='bi bi-box-seam'></i> <span className='ms-1 d-none d-sm-inline'>SubCategory</span>
          </Link>

        </div>

        <Link className={`nav-link collapsed mt-0 ${location.pathname === '/books' ? 'active' : ''}`} to='/books'>
          <i className='fs-4 bi-book-half'></i> <span className='ms-1 d-none d-sm-inline'>Books</span>
        </Link>

        <Link className={`nav-link collapsed mt-0 ${location.pathname === '/users' ? 'active' : ''}`} to='/users' hidden={!Checkuser}>
          <i className='fs-4 bi-people'></i> <span className='ms-1 d-none d-sm-inline'>Users</span>
        </Link>

        <a className='nav-link collapsed mt-0' onClick={logout}>
          <i className='fs-4 bi-box-arrow-right'></i> <span className='ms-1 d-none d-sm-inline'>Logout</span>
        </a>

      </nav>
    </div>
  );
}

export default Header;
