package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)


func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodGet, "/v1/movie/:id", app.getOneMovie)
	router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMovies)
	router.HandlerFunc(http.MethodGet, "/v1/genres", app.getAllGenres)
	router.HandlerFunc(http.MethodGet, "/v1/movies/:genre_id", app.getAllMovieByGenre)
	router.HandlerFunc(http.MethodPost, "/v1/admin/editmovie", app.editMovie)
	router.HandlerFunc(http.MethodGet, "/v1/admin/deletemovie/:id", app.deleteMovie)
	
	return app.enableCORS(router)
}