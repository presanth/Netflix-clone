import {React,useEffect,useState} from "react";
import YouTube from "react-youtube";
import axios from "../../axios";
import { API_KEY, imageUrl } from "../../constants/constants";
import "./RowPost.css";

function rowPost(props) {
  const [movie, setMovie] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    axios.get(props.url).then((response) => {
      // console.log(response.data.results)
      setMovie(response.data.results);
    });
  },[]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleVideo = (id) => {
    //console.log(id)
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
        if (response.data.results.length != 0) {
          // console.log(response.data.results[0])
          setId(response.data.results[0]);
        } else {
          alert("Video Is Unavailable");
        }
      });
  };
  return (
    <div className="row">
      <h1> {props.title} </h1>
      <div className="posters">
        {movie.map((obj) => (
          <img
            onClick={() => handleVideo(obj.id)}
            className={props.isSmall ? "smalposter" : "poster"}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="posters"
          />
        ))}
      </div>
      {id && <YouTube opts={opts} videoId={id.key} />}
    </div>
  );
}

export default rowPost;
