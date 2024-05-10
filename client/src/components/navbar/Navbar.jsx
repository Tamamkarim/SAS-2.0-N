import { Button, Layout, Menu, Drawer } from 'antd'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import AuthNavbar from './AuthNavbar'
import { Link } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Header } = Layout

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  return (
    <>
      <Drawer onClose={() => setOpen(false)} open={open}>
        <Menu
          className="h-full"
          theme="dark"
          mode="vertical"
          items={[
            { key: '1', label: <Link to="/">Home</Link> },
            { key: '2', label: <Link to="/hotels">Hotels</Link> },
          ]}
        />
      </Drawer>
      <Header
        style={{
          display: 'flex',
          padding: '0 5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          className="hidden md:block"
          style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}
        >
          Dream Stay
        </div>
        <div
          className="block md:hidden"
          style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}
        >
          <MenuOutlined onClick={() => setOpen(true)} />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          className="hidden md:block"
          items={[
            { key: '1', label: <Link to="/">Home</Link> },
            { key: '2', label: <Link to="/hotels">Hotels</Link> },
          ]}
          style={{ flex: 1, minWidth: 0, gap: '0.5rem' }}
        />
        {user ? (
          <AuthNavbar user={user} />
        ) : (
          <div>
            <Button type="primary" style={{ marginRight: '1rem' }}>
              <a href="/login" style={{ color: 'white' }}>
                Login
              </a>
            </Button>
            <Button type="primary">
              <a href="/register" style={{ color: 'white' }}>
                Register
              </a>
            </Button>
          </div>
        )}
      </Header>
    </>
  )
}

export default Navbar
