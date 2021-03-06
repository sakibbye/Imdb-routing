import React, { useEffect, useState } from "react";
import _ from "lodash";

import Table from "./common/table.component";
import Pagination from "./common/pagination.component";
import Filter from "./common/filtering.component";
import getMovies from "../service/get-movies.service";
import getGenres from "../service/get-genres.service";
import Rating from "./rating.component";


const Movies = (props) => {
    const [states, setStates] = useState({
        movies: [],
        sortColumn: { path: "id", order: "asc" },
        activePage: 1,
        pageCount: 5,
        genres: [],
        selectedGenre: "All Genres",
    });

    function setMoviesAndGenres() {
        const movies = getMovies();
        const genres = ["All Genres", ...getGenres()];
        setStates((prev) => ({ ...prev, movies, genres }));
    }

    useEffect(setMoviesAndGenres, []);

    function changeState(fieldName, updatedState) {
        setStates((prev) => ({ ...prev, [fieldName]: updatedState }));
    }

    function handleToggleRating(movieRank) {
        const movies = [...states.movies];
        const movie = movies.find((movie) => movie.id === movieRank);
        movie.yourRating = !movie.yourRating;
        changeState("movies", movies);
    }

    function handleSort(sortColumn) {
        changeState("sortColumn", sortColumn);
    }

    function handleClickPage(activePage) {
        changeState("activePage", activePage);
    }

    function handleClickFilter(selectedGenre) {
        changeState("selectedGenre", selectedGenre);
    }

    function paginateMovies(movies) {
        const { activePage, pageCount } = states;
        const start = (activePage - 1) * pageCount;
        const paginatedMovies = movies.slice(start, start + pageCount);
        return paginatedMovies;
    }

    function filterMovies() {
        const { movies, selectedGenre } = states;
        const filteredMovies = movies.filter((movie) => {
            if (selectedGenre === "All Genres") return true;

            if (movie.genres.includes(selectedGenre)) return true;
            return false;
        });
        return filteredMovies;
    }

    function sortMovies(movies) {
        const { sortColumn } = states;
        const sortedMovies = _.orderBy(
            movies,
            [sortColumn.path],
            [sortColumn.order]
        );
        return sortedMovies;
    }

    const filteredMovies = filterMovies();
    const paginatedMovies = paginateMovies(filteredMovies);
    const movies = sortMovies(paginatedMovies);

    const columns = [
        {
            label: "Rank",
            path: "id",
            sorting: true,
            content: (movie, key) => <td>{movie[key]}</td>,
        },
        {
            label: "Title",
            path: "title",
            sorting: true,
            content: (movie, key) => <td>{movie[key]}</td>,
        },
        {
            label: "Poster",
            path: "posterUrl",
            content: (movie, key) => (
                <td>
                    <img
                        src={movie[key]}
                        style={{ height: "100px", width: "auto" }}
                        alt="Image Unavailable"
                    />
                </td>
            ),
        },
        {
            label: "Your Rating",
            path: "yourRating",
            content: (movie, key) => (
                <td>
                    <Rating
                        isRated={movie[key]}
                        rank={movie.id}
                        handleToggleRating={handleToggleRating}
                    />
                </td>
            ),
        },
        {
            label: "Action",
            path: "action",
            content: (movie, key) => <td>{movie[key]}</td>,
        },
    ];

    return (
        <>
            <div className="container">
                <div className="row">
                    <Filter
                        items={states.genres}
                        selectedGenre={states.selectedGenre}
                        onClickFilter={handleClickFilter}
                    />
                    <div className="col-lg-8">
                        <Table
                            items={movies}
                            columns={columns}
                            onSort={handleSort}
                            sortColumn={states.sortColumn}
                        />
                        <Pagination
                            totalItems={filteredMovies.length}
                            pageCount={states.pageCount}
                            activePage={states.activePage}
                            onClickPage={handleClickPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Movies;
