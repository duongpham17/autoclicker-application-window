
import { useAppSelector } from '@redux/hooks/useRedux';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  const {user} = useAppSelector(state => state.authentications)

  return (
    <div className={styles.container}>
      <div>
        <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="Logo" />
        {user 
          ? <Link to="/dashboard">Get started making scripts.</Link>
          : <Link to="/login">Login and create an account</Link>
        }
      </div>
    </div>
  )
}

export default Home