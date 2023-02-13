import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import MovieDetail from "../components/MovieDetail";

function Detail() {


    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);

    const {id} = useParams();
    console.log(id);

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getMovie = async () => {
      const json = await (
          await fetch('https://yts.mx/api/v2/movie_details.json?movie_id=' + id)
      ).json();
      console.log(json);
      setMovie(json.data.movie);
      setLoading(false);
    };

    useEffect(() => {
        getMovie();
    }, [getMovie], id);

    return (
        <div>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <MovieDetail 
                key={movie.id} 
                id={movie.id} 
                year={movie.year} 
                coverImg={movie.medium_cover_image} 
                title={movie.title} 
                summary={movie.description_full} 
                genres={movie.genres} />
            </div>
          )}
        </div>
      );
}

export default Detail;