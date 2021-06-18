// const API_KEY = 'e8e4bcc5'
const API_KEY = 'a4ca44c52c5dd4822128c31e02d41910'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const ulTag = document.querySelector('#paginate')

$(document).ready(function () {
    getPopularMovies()
    $('#popular-movies').on('click', '.see-details', function () {
        let id = $(this).data('id')
        getMovieDetails(id)
    })
})


/*
    MOVIE API FUNCTIONS
 */
function getPopularMovies() {
    $("#popular-movies").html('')

    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/popular',
        type: 'GET',
        dataType: 'json',
        data: {
            'api_key': API_KEY,
        },
        success: function (hasil) {
            if (hasil.results.length > 0) {
                let movies = hasil.results

                $.each(movies, function (i, data) {
                    $('#popular-movies').append(`
                            <div class="col-md-2 mb-3 d-flex justify-content-center">
                                <div class="card" style="width: 18rem;">
                                  <img src="` + (data.poster_path !== null ? IMG_URL + data.poster_path : "http://via.placeholder.com/1080x1580") + `" class="card-img-top" alt="...">
                                  <div class="card-body d-flex flex-column">
                                    <h6 class="mt-auto card-title">` + data.title + `</h6>
                                    <p class="mt-auto card-text"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 28 28" width="24px" fill="#F2B705"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><polygon opacity=".3" points="12,15.4 8.24,17.67 9.24,13.39 5.92,10.51 10.3,10.13 12,6.1 13.71,10.14 18.09,10.52 14.77,13.4 15.77,17.68"/><path d="M22,9.24l-7.19-0.62L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27L18.18,21l-1.63-7.03L22,9.24z M12,15.4l-3.76,2.27 l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88l1,4.28L12,15.4z"/></g></g></svg> 
                                    ` + data.vote_average + `
                                    </p>
                                    <a href="#" class="mt-auto card-link see-details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.id + `">See details</a>
                                  </div>
                                </div>
                            </div>
                    `)
                })
            }
        }
    })
}

function searchMovie() {
    $('#movie-list').html('')

    $.ajax({
        // url: 'http://www.omdbapi.com',
        url: 'https://api.themoviedb.org/3/search/movie',
        type: 'GET',
        dataType: 'json',
        data: {
            'api_key': API_KEY,
            // 's': $('#search-input').val()
            'query': $('#search-input').val()
        },
        success: function (hasil) {
            console.log(hasil)
            if (hasil.total_results > 0) {
                let movies = hasil.results

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                            <div class="col-md-2 mb-3 d-flex justify-content-center">
                                <div class="card" style="width: 18rem;">
                                  <img src="` + (data.poster_path !== null ? IMG_URL + data.poster_path : "http://via.placeholder.com/1080x1580") + `" class="card-img-top" alt="...">
                                  <div class="card-body d-flex flex-column">
                                    <h6 class="mt-auto card-title">` + data.title + `</h6>
                                    <p class="mt-auto card-text"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 28 28" width="24px" fill="#F2B705"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><polygon opacity=".3" points="12,15.4 8.24,17.67 9.24,13.39 5.92,10.51 10.3,10.13 12,6.1 13.71,10.14 18.09,10.52 14.77,13.4 15.77,17.68"/><path d="M22,9.24l-7.19-0.62L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27L18.18,21l-1.63-7.03L22,9.24z M12,15.4l-3.76,2.27 l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88l1,4.28L12,15.4z"/></g></g></svg> 
                                    ` + data.vote_average + `
                                    </p>
                                    <a href="#" class="mt-auto card-link see-details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.id + `">See details</a>
                                  </div>
                                </div>
                            </div>
                    `)
                })


            } else {
                $('#movie-list').html(`
                        <div class="col">
                            <h1 class="text-center">Pencarian tidak ditemukan</h1>
                        </div>`
                )
            }
            $('#search-input').val('')

        }
    })
}

function getMovieDetails(movieId) {
    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/' + movieId,
        dataType: 'json',
        type: 'GET',
        data: {
            // 'apikey': API_KEY,
            // 'i': $(this).data('id')
            'api_key': API_KEY,
        },
        success: function (detail) {
            if (detail.success !== false) {
                $("#title").text(detail.title)
                $("#original_title").text(detail.original_title)
                $("#poster_path").html(`
                    <img src="` + IMG_URL + detail.poster_path + `" class="img-fluid"></img>
                `)
                $("#synopsis").text(detail.overview)
                $("#release_date").text(detail.release_date)
                console.log("genres length: " + detail.genres.length)
                let getGenre = document.getElementById("genres")
                getGenre.textContent = ""
                for (let i = 0; i < detail.genres.length; i++) {
                    getGenre.textContent += detail.genres[i].name
                    if (i !== detail.genres.length - 1) {
                        getGenre.textContent += ", "
                    }
                }
                $("#status").text(detail.status)
            }
        }
    })
}

/*
    PAGINATION SCRIPTS
 */
function element(totalPages, page){
    /*
        VARIABLES INITIATION
     */
    let liTag = ''
    let activeLi
    let beforePages = page - 1
    let afterPages = page + 1

    /*
        PREVIOUS BUTTON SHOW/HIDE
     */
    if(page > 1){
        liTag += `
            <li class="page-item" onclick="element(totalPages, ${page - 1})">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">&laquo;</a>
            </li>
        `
    }

    /* (UNUSED) dots pagination after page 1
    if(page > 2){
        liTag += `
            <li class="page-item" onclick="element(totalPages, 1)">
                <a class="page-link" href="#">1</a>
            </li>
        `
        if (page > 3){
            liTag += `

                <li class="page-item">
                    <a class="page-link" href="#">...</a>
                </li>
            `
        }
    }
     */

    /*
        IF YOU ARE ON THE FIRST PAGE
     */
    if(page == 1){
        afterPages += 1
    }

    /*
            IF YOU ARE ON THE LAST PAGE
         */
    if(page == totalPages){
        beforePages -= 1
    }

    /*
        GENERATE PAGE NUMBERS
     */
    for (let pageLength=beforePages; pageLength <= afterPages; pageLength++){
        if (pageLength > totalPages){
            continue
        }
        if (pageLength == 0){
            pageLength += 1
        }
        if (page == pageLength){
            activeLi = "active"
        }else{
            activeLi = ""
        }
        liTag += `
            <li class="page-item ${activeLi}">
                <a class="page-link" href="#">${pageLength}</a>
            </li>
        `
    }

    /* (UNUSED) dots pagination before last page
    if(page < totalPages - 1){
        if (page < totalPages - 2){
            liTag += `
            
                <li class="page-item">
                    <a class="page-link" href="#">...</a>
                </li>
            `
        }
        liTag += `
            <li class="page-item" onclick="element(totalPages, ${totalPages})">
                <a class="page-link" href="#">${totalPages}</a>
            </li>
        `
    }

     */

    /*
        NEXT BUTTON SHOW/HIDE
     */
    if (page < totalPages){
        liTag += `
            <li class="page-item" onclick="element(totalPages, ${page + 1})">
                <a class="page-link" href="#">&raquo;</a>
            </li>
        `
    }

    ulTag.innerHTML = liTag
}

/*
    RUN SCRIPTS
 */

$('#search-button').on('click', function () {
    searchMovie()
})

$('#search-input').on('keyup', function (event) {
    if (event.keyCode === 13) {
        searchMovie()
    }
})

$('#movie-list').on('click', '.see-details', function () {
    let id = $(this).data('id')
    getMovieDetails(id)
})
let totalPages = 5
element(5, 1)