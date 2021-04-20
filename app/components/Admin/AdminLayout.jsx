import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Nav';

const layoutStyle = {
  display: 'flex',
  height: '100%',
  width: '100%',
  backgroundColor: '#009910',
};

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '60px',
  marginLeft: '300px',
  backgroundColor: '#EAEDF3',
};

const navbarStyle = {
  backgroundColor: '#2e3745',
  color: 'white',
  height: '100%',
  width: '300px',
  position: 'fixed',
  zIndex: '1',
  top: '0',
  left: '0',
};

const navStyle = {
  padding: '10px',
  width: '100%',
};

const brandStyle = {
  fontFamily: "'Blinker', sans-serif",
  textAlign: 'center',
  fontSize: '35px',
  margin: '35px 0 50px',
};

export default function AdminLayout({ children }) {
  return (
    <div style={layoutStyle}>
      <Navbar style={navbarStyle}>
        <Nav className="flex-column" style={navStyle}>
          <div style={brandStyle}>Dwolla Starter Kit</div>
          <Nav.Link eventKey="admin" href="/admin">
            Dashboard
          </Nav.Link>
          <Nav.Link eventKey="admin-settings" href="/admin-settings">
            Admin settings
          </Nav.Link>
          <Nav.Link eventKey="log-out" href="/api/auth/logout">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
