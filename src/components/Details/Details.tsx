import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import Spinner from '../Spinner/Spinner';

interface Language {
  name: string;
}

interface Description {
  description: string;
  language: Language;
}

interface Detail {
  descriptions: Description[];
}

function Details() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Detail | null>(null);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      try {
        const detailId = searchParams.get('details');
        if (detailId) {
          const response = await fetch(
            `${BASE_URL}/characteristic/${detailId}/`,
          );
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await response.json();

          setDetails(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch details:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [searchParams]);

  const handleClose = () => {
    navigate('/?page=1&details=0');
  };

  if (loading) return <Spinner />;
  if (!details) return <h3>No details</h3>;

  return (
    <div>
      <button style={{ cursor: 'pointer' }} onClick={handleClose}>
        Close
      </button>
      <h3>Pokemon description</h3>
      <ul>
        {details.descriptions.map((desc) => {
          return (
            <li key={desc.description}>
              {desc.language.name} : {desc.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Details;
