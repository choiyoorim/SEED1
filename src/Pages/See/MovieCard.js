import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ id, year, title, summary, poster }) {
    return (
      <div className="movie_card" id="movie_card_outside">
        <Link
          to={{
            pathname: `/movie/${id}`,
            state: {
              id,
              year,
              title,
              summary,
              poster
            }
          }}
        >
          {/* <img src={poster} alt={title} title={title} /> */}
          <div className="movie__data">
            <h3 className="movie__title">{title}</h3>
            <h5 className="movie__year">{year}</h5>
            <p className="movie__summary">{summary.slice(0, 100)}...</p>
          </div>
        </Link>
      </div>
    );
  }
  
  MovieCard.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  };

export default MovieCard;