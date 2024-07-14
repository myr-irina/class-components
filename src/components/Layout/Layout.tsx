import { Outlet, useParams } from 'react-router-dom';
import Details from '../Details/Details';

const Layout = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      {id && (
        <div style={{ flex: 1 }}>
          <Details />
        </div>
      )}
    </div>
  );
};

export default Layout;
