import styles from './Pages.module.scss'
import {Routes, Route} from 'react-router-dom';

import Private from './Private';
import Login from './login';
import Home from './home';
import Dashboard from './dashkboard';
import Help from './help';

const Pages = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/dashboard" element={<Private component={Dashboard} roles={["admin","user"]}/> } />
      </Routes>
    </div>
  )
}

export default Pages