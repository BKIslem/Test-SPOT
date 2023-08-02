import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function MyComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const apiKey = '699b761169335764735b460f342d6402';

    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: apiKey,
            query: debouncedSearchTerm,
          },
        });
        setData(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la requête API :', error);
      }
    };

    fetchData();
  }, [debouncedSearchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log(data);

  return (
    <section className="section1">
      <div className='container py-5 h-100 color'>
        <h1 className="text-center t">Liste de films</h1>
        <input type="text" className="form-control" value={searchTerm} onChange={handleSearchChange} placeholder="Rechercher un film" />
        {data.map((movie) => (
         
          <div key={movie.id} className="row">
        
            <div className="col-lg-4">
              <br></br>
              
            <h2>{movie.title}</h2>
            </div>
            <div className="col-lg-2">
            {movie.poster_path && (

              <img className='img' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            )}
            </div>
            <div className="col-lg-6 paragraphe">
              
            <p>{movie.overview}</p>
            
            </div>
            </div>
          
        ))}
      </div>
    </section>
  );
}

export default MyComponent;





