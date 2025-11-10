import UseContextMain from './Context';

import Scripts from './scripts';
import Terminal from './terminal';

const Dashboard = () => {
  return (
    <UseContextMain>
      <Scripts />
      <Terminal />
    </UseContextMain>
  )
}

export default Dashboard