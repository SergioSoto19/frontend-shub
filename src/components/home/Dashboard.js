import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faHome, faRightFromBracket, faHotel, faRectangleList} from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { useNavigate, Outlet } from 'react-router-dom';
import './Dashboard.css';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.PNG';



function Dashboard() {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState('');

  const getUserEmailFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.email;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthData(null);
    navigate('/login');
  };

  useEffect(() => {
    const email = getUserEmailFromToken();
    setUserEmail(email);
  }, []);


  return (
    <div className="container-fluid "  >
      <div className="row custom-row">
        {/* Menú lateral */}
        <div className={`col-2`} style={{ minWidth: '265px', padding: 0, }}>

          <Nav className=" menuU h-100">
            <div className="section-1">
              <Nav.Link className="profile-header">
                <img src={logo} alt="Profile" className="profile-img" />
                <div className="title-profile">
                  <h5 className="profile-title">sHUB</h5>
                  <p className="profile-subtitle">SOTWARE INTEGRATION</p>
                </div>
              </Nav.Link>

              <Nav.Link className="nav-item-custom" onClick={() => navigate('/dashboard')} >
                <FontAwesomeIcon className="icon-margin" icon={faHome} />
                Home
              </Nav.Link>

              <Nav.Link className="nav-item-custom" onClick={() => navigate('/dashboard/users')} >
                <FontAwesomeIcon className="icon-margin" icon={faUsers} />
                Usuarios
              </Nav.Link>

              <Nav.Link className="nav-item-custom" onClick={() => navigate('/dashboard/hotels')}>
                <FontAwesomeIcon className="icon-margin" icon={faHotel} />
                Hoteles
              </Nav.Link>
              <Nav.Link className="nav-item-custom" onClick={()=>navigate('/dashboard/reservations')}>
                <FontAwesomeIcon className="icon-margin" icon={faRectangleList} />
                Reservaciones 
              </Nav.Link>
              <div className="separator-line" />
            </div>

            <div className="section-2">
            <div className="separator-line" />
              <Nav.Link className='profile-header-user' style={{backgroundColor:'white'}} >
                <div className="title-profile">
                  <h5 className="profile-title-user">{userEmail}</h5>
                </div>
              </Nav.Link>
              
            </div>

            <div className="section-3">
            <Nav.Link className="nav-item-custom" onClick={handleLogout}>
                <FontAwesomeIcon className="icon-margin"  icon={faRightFromBracket}/>
                Cerrar Sesión
              </Nav.Link>
            </div>
          </Nav>


        </div>


        <div className="col custom-col">
          <div className="row ">
            <div className='col-12 container-content-scrollable'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>




    </div>
  );
};

export default Dashboard;