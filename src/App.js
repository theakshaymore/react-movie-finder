import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");

  let cancelToken;

  // USING AXIOS METHOD
  const handleChange = async (e) => {
    const query = e.target.value;

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Canceling the previous req");
    }

    cancelToken = axios.CancelToken.source();

    const result = await axios.get(
      `http://www.omdbapi.com/?apikey=a1ee8b9e&t=${query}`,
      { cancelToken: cancelToken.token }
    );

    setData(result.data);

    // USING FETCH METHOD
    // fetch(`http://www.omdbapi.com/?apikey=a1ee8b9e&t=${query}`)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setData(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="main">
      <h1>Get movie details</h1>
      <input type="text" placeholder="enter search" onChange={handleChange} />
      <div className="res">
        <br />
        {data && <h2>{data.Title}</h2>}
        <br />
        {data && <img src={data.Poster}></img>}
        {data && <p>Director: {data.Director}</p>}
        {data && <p>Year: {data.Year}</p>}
        {data && <p>Language: {data.Language}</p>}
        {data && <p>Rated: {data.Rated}</p>}
        {data && <p>Released Date: {data.Released}</p>}
        {data && <p>Runtime: {data.Runtime}</p>}
        {data && <p>Genre: {data.Genre}</p>}
      </div>
    </div>
  );
}

export default App;
