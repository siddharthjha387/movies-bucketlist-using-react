import React from "react";

const MovieList = (props) => {
    const BucketComponent=props.bucketComponent;
    return (
        <>
            {props.movies.map((movie, index) => (

                <div className="image-container PosterImg d-flex justify-content-start m-3">
                    <img src={movie.Poster} alt="movie" ></img>
                    <div onClick={()=>props.handleBucketClick(movie)} className="overlay d-flex justify-content-center align-items-center">
                    <BucketComponent/>
                    </div>
                </div>

            ))}
        </>

    )
}

export default MovieList;