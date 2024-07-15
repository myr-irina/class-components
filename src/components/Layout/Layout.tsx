import { Outlet, useParams } from 'react-router-dom';
import Details from '../Details/Details';

const Layout = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div id="layout" style={{ display: 'flex', gap: '10px', height: '100vh' }}>
      <div
        id="search-results"
        style={{ width: '50%', borderRight: '1px solid #ccc' }}
      >
        <Outlet />
      </div>
      <div id="details" style={{ width: '50%' }}>
        {id && <Details />}
      </div>
    </div>
  );
};

export default Layout;
