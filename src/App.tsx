import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

import Themes from 'themes';
import Global from 'global';
import Pages from 'pages';
import Navbar from 'layouts/navbar';
import Mouse from 'layouts/mouse';

console.log(process.env.NODE_ENV);

export const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Themes>
        <Global />
        <Navbar />
        <Pages />
        <Mouse />
      </Themes>
    </HashRouter>
  </Provider>
);

export default App;