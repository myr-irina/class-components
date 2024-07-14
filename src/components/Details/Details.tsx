import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';

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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/characteristic/${id}/`);
      const data = await response.json();

      setDetails(data);
      setLoading(false);
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const handleClose = () => {
    navigate('/search/1');
  };

  if (loading) return <div>Loading...</div>;
  if (!details) return <div>No details available</div>;

  return (
    <div>
      <button onClick={handleClose}>Close</button>
      <h2>Pokemon description</h2>
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
