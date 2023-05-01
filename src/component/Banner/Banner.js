import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { API_KEY, imageUrl } from "../../constants/constants";
import axios from "../../axios";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState();
  const [key, setKey] = useState("");
  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        // console.log(response.data.results[0])
        setMovie(response.data.results[0]);
      });
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const playVideo = () => {
    // console.log(movie.id)
    axios.get(`movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
        if (response.data.results.length != 0) {
          //  console.log(response.data.results[0])
          setKey(response.data.results[0]);
        } else {
          alert("Video Is Unavailable");
        }
      });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${
            movie ? imageUrl + movie.backdrop_path : ""
          })`,
        }}
        className="banner"
      >
        <div className="content">
          <h1 className="title"> {movie ? movie.title : ""} </h1>
          <div className="banner-buttons">
            <button onClick={playVideo} className="button">
              Play
            </button>
            <button className="button">My List</button>
          </div>
          <h1 className="description">{movie ? movie.overview : ""}</h1>
        </div>

        <div className="fade"></div>
      </div>
      {key && <YouTube opts={opts} videoId={key.key} />}
    </>
  );
}

export default Banner;
