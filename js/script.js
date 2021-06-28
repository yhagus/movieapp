const API_KEY = 'a4ca44c52c5dd4822128c31e02d41910'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const popularMovies = $('#popular-movies')
const popularSeries = $('#popular-series')
const trending = $('#trending')
const searchResults = $('#movie-list')

/*
    INITS
 */
getTrending()
getPopular('movie',popularMovies)
getPopular('tv',popularSeries)
seeDetails(popularMovies)
seeDetails(popularSeries)
seeDetails(trending)
seeDetails(searchResults)

$('#search-input').on('keyup', function (event) {
    if (event.keyCode === 13) {
        searchAll()
    }
})

/*
    API FUNCTIONS
 */

function getTrending(){
    $("#trending").html('')

    $.ajax({
        url: 'https://api.themoviedb.org/3/trending/all/day',
        type: 'GET',
        dataType: 'json',
        data: {
            'api_key': API_KEY,
        },
        success: function (hasil) {
            if (hasil.results.length > 0) {
                let trending = hasil.results

                $.each(trending, function (i, data) {
                    $('#trending').append(`
                            <div class="mt-4 col-md-2 mb-2 d-flex">
                                <div class="card primary" style="width: auto">
                                  <img src="${data.poster_path !== null ? IMG_URL + data.poster_path : "http://via.placeholder.com/1080x1580"}" class="card-img-top" alt="...">
                                  <div class="card-body d-flex flex-column">
                                    <h6 class="card-title mt-auto fw-bold">${typeof data.name !== 'undefined' ? data.name : data.title}</h6>
                                    <p class="card-text fs-6"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 28 28" width="24px" fill="#F2B705"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg> 
                                    ${data.vote_average}
                                    </p>
                                    <a href="#" class="btn btn-outline-primary card-link see-details mt-auto secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-media="${data.media_type}" data-id="${data.id}">See details</a>
                                  </div>
                                </div>
                            </div>
                    `)
                })
            }
        }
    })
}

function getPopular(mediaType, IdMedia) {
    let idmedia = IdMedia
    $(idmedia).html('')

    $.ajax({
        url: `https://api.themoviedb.org/3/${mediaType}/popular`,
        type: 'GET',
        dataType: 'json',
        data: {
            'api_key': API_KEY
        },
        success: function (hasil) {
            if (hasil.results.length > 0) {
                let media = hasil.results

                $.each(media, function (i, data) {
                    $(idmedia).append(`
                            <div class="mt-4 col-md-2 mb-2 d-flex">
                                <div class="card primary" style="width: auto">
                                  <img src="${data.poster_path !== null ? IMG_URL + data.poster_path : "http://via.placeholder.com/1080x1580"}" class="card-img-top" alt="...">
                                  <div class="card-body d-flex flex-column">
                                    <h6 class="card-title mt-auto fw-bold">${typeof data.name !== 'undefined' ? data.name : data.title}</h6>
                                    <p class="card-text fs-6"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 28 28" width="24px" fill="#F2B705"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg> 
                                    ${data.vote_average}
                                    </p>
                                    <a href="#" class="btn btn-outline-primary card-link see-details mt-auto secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-media="${typeof data.name !== 'undefined' ? 'tv' : 'movie'}" data-id="${data.id}">See details</a>
                                  </div>
                                </div>
                            </div>
                    `)
                })
            }
        }
    })
}

function getDetails(Id, mediaType) {
    let getGenre = document.getElementById('genres')
    let getActor = document.getElementById('actor')
    $.ajax({
        url: `https://api.themoviedb.org/3/${mediaType}/${Id}`,
        dataType: 'json',
        type: 'GET',
        data: {
            'api_key': API_KEY,
        },
        success: function (detail) {
            if (detail.success !== false) {
                $('#title').text(`${typeof detail.name !== 'undefined' ? detail.name : detail.title}`)
                $('#original_title').text(`${typeof detail.original_name !== 'undefined' ? detail.original_name : detail.original_title}`)
                $('#poster_path').html(`
                    <img src="${IMG_URL +detail.poster_path}" class="img-fluid"></img>
                `)
                $('#synopsis').text(detail.overview)
                $('#release_date').text(`${typeof detail.release_date !== 'undefined' ? detail.release_date : detail.first_air_date}`)
                getGenre.textContent = ''
                for (let i = 0; i < detail.genres.length; i++) {
                    getGenre.textContent += detail.genres[i].name
                    if (i !== detail.genres.length - 1) {
                        getGenre.textContent += ", "
                    }
                }
                $('#status').text(detail.status)
                $('#director').text(detail.director)
                $('#time').html(`
                <h5>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-clock" viewBox="0 0 18 18">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>&emsp;
                ${typeof detail.runtime !== 'undefined' ? timeConvert(detail.runtime) : '-'}
                </h5>
                `)
            }
        }
    })

    $.ajax({
        url: `https://api.themoviedb.org/3/${mediaType}/${Id}/credits`,
        dataType: 'json',
        type: 'GET',
        data: {
            'api_key': API_KEY,
        },
        success: function (detail) {
            if (detail.success !== false) {
                detail.cast.sort((a,b) => (a.popularity > b.popularity) ? -1 : ((b.popularity > a.popularity) ? 1 : 0))
                getActor.textContent = ''
                for (let i = 0; i < 5; i++) {
                    getActor.textContent += detail.cast[i].name
                    if (i !== 5 - 1) {
                        getActor.textContent += ", "
                    }
                }
                let director = detail.crew.filter(obj => {
                    return obj.job === 'Director'
                })
                console.log(director)
                $('#director').text(`${mediaType !== 'movie' ? '-' : director[0].name}`)
            }
        }
    })
}

function seeDetails(idmedia){
    $(idmedia).on('click', '.see-details', function (){
        let id = $(this).data('id')
        let media = $(this).data('media')
        getDetails(id,media)
    })
}

function searchAll() {
    $('#movie-list').html('')

    $.ajax({
        url: 'https://api.themoviedb.org/3/search/multi',
        type: 'GET',
        dataType: 'json',
        data: {
            'api_key': API_KEY,
            'query': $('#search-input').val()
        },
        success: function (hasil) {
            if (hasil.total_results > 0) {
                let movies = hasil.results

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                                <div class="mt-4 col-md-2 mb-2 d-flex">
                                    <div class="card primary" style="width: 18rem">
                                      <img src="${data.poster_path !== null ? IMG_URL + data.poster_path : "http://via.placeholder.com/1080x1580"}" class="card-img-top" alt="...">
                                      <div class="card-body d-flex flex-column">
                                        <h6 class="card-title mt-auto fw-bold">${typeof data.name !== 'undefined' ? data.name : data.title}</h6>
                                        <p class="card-text fs-6"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 28 28" width="24px" fill="#F2B705"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                                        ${data.vote_average}
                                        </p>
                                        <a href="#" class="btn btn-outline-primary card-link see-details mt-auto secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-media="${typeof data.name !== 'undefined' ? 'tv' : 'movie'}" data-id="${data.id}">See details</a>
                                      </div>
                                    </div>
                                </div>
                        `)
                    return (i !== 5)
                })


            } else {
                $('#movie-list').html(`
                        <div class="container-fluid d-flex flex-column justify-content-center">
                        <svg id="a706cf1c-1654-439b-8fcf-310eb7aa0e00" xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 1120.59226 777.91584"><circle cx="212.59226" cy="103" r="64" fill="#ff6584"/><path d="M563.68016,404.16381c0,151.01141-89.77389,203.73895-200.51559,203.73895S162.649,555.17522,162.649,404.16381,363.16457,61.04208,363.16457,61.04208,563.68016,253.1524,563.68016,404.16381Z" transform="translate(-39.70387 -61.04208)" fill="#f2f2f2"/><polygon points="316.156 523.761 318.21 397.378 403.674 241.024 318.532 377.552 319.455 320.725 378.357 207.605 319.699 305.687 319.699 305.687 321.359 203.481 384.433 113.423 321.621 187.409 322.658 0 316.138 248.096 316.674 237.861 252.547 139.704 315.646 257.508 309.671 371.654 309.493 368.625 235.565 265.329 309.269 379.328 308.522 393.603 308.388 393.818 308.449 394.99 293.29 684.589 313.544 684.589 315.974 535.005 389.496 421.285 316.156 523.761" fill="#3f3d56"/><path d="M1160.29613,466.01367c0,123.61-73.4842,166.77-164.13156,166.77s-164.13156-43.16-164.13156-166.77S996.16457,185.15218,996.16457,185.15218,1160.29613,342.40364,1160.29613,466.01367Z" transform="translate(-39.70387 -61.04208)" fill="#f2f2f2"/><polygon points="950.482 552.833 952.162 449.383 1022.119 321.4 952.426 433.154 953.182 386.639 1001.396 294.044 953.382 374.329 953.382 374.329 954.741 290.669 1006.369 216.952 954.954 277.514 955.804 124.11 950.467 327.188 950.906 318.811 898.414 238.464 950.064 334.893 945.173 428.327 945.027 425.847 884.514 341.294 944.844 434.608 944.232 446.293 944.123 446.469 944.173 447.428 931.764 684.478 948.343 684.478 950.332 562.037 1010.514 468.952 950.482 552.833" fill="#3f3d56"/><ellipse cx="554.59226" cy="680.47903" rx="554.59226" ry="28.03433" fill="#3f3d56"/><ellipse cx="892.44491" cy="726.79663" rx="94.98858" ry="4.80162" fill="#3f3d56"/><ellipse cx="548.71959" cy="773.11422" rx="94.98858" ry="4.80162" fill="#3f3d56"/><ellipse cx="287.94432" cy="734.27887" rx="217.01436" ry="10.96996" fill="#3f3d56"/><circle cx="97.08375" cy="566.26982" r="79" fill="#2f2e41"/><rect x="99.80546" y="689.02332" width="24" height="43" transform="translate(-31.32451 -62.31008) rotate(0.67509)" fill="#2f2e41"/><rect x="147.80213" y="689.58887" width="24" height="43" transform="translate(-31.31452 -62.87555) rotate(0.67509)" fill="#2f2e41"/><ellipse cx="119.54569" cy="732.61606" rx="7.5" ry="20" transform="translate(-654.1319 782.47948) rotate(-89.32491)" fill="#2f2e41"/><ellipse cx="167.55414" cy="732.18168" rx="7.5" ry="20" transform="translate(-606.25475 830.05533) rotate(-89.32491)" fill="#2f2e41"/><circle cx="99.31925" cy="546.29477" r="27" fill="#fff"/><circle cx="99.31925" cy="546.29477" r="9" fill="#3f3d56"/><path d="M61.02588,552.94636c-6.04185-28.64075,14.68758-57.26483,46.30049-63.93367s62.13813,11.14292,68.18,39.78367-14.97834,38.93-46.59124,45.59886S67.06774,581.58712,61.02588,552.94636Z" transform="translate(-39.70387 -61.04208)" fill="#bf8b4b"/><path d="M257.29613,671.38411c0,55.07585-32.73985,74.3063-73.13,74.3063q-1.40351,0-2.80255-.0312c-1.87139-.04011-3.72494-.1292-5.55619-.254-36.45135-2.57979-64.77127-22.79937-64.77127-74.02113,0-53.00843,67.73872-119.89612,72.827-124.84633l.00892-.00889c.19608-.19159.29409-.28516.29409-.28516S257.29613,616.30827,257.29613,671.38411Z" transform="translate(-39.70387 -61.04208)" fill="#bf8b4b"/><path d="M181.50168,737.26482l26.747-37.37367-26.81386,41.4773-.07125,4.29076c-1.87139-.04011-3.72494-.1292-5.55619-.254l2.88282-55.10258-.0223-.42775.049-.0802.27179-5.20415-26.88076-41.5798,26.96539,37.67668.06244,1.105,2.17874-41.63324-23.0132-42.96551,23.29391,35.6583,2.26789-86.31419.00892-.294v.28516l-.37871,68.064,22.91079-26.98321-23.00435,32.84678-.60595,37.27566L204.18523,621.958l-21.4805,41.259-.33863,20.723,31.05561-49.79149-31.17146,57.023Z" transform="translate(-39.70387 -61.04208)" fill="#3f3d56"/><circle cx="712.48505" cy="565.41532" r="79" fill="#2f2e41"/><rect x="741.77716" y="691.82355" width="24" height="43" transform="translate(-215.99457 191.86399) rotate(-17.08345)" fill="#2f2e41"/><rect x="787.6593" y="677.72286" width="24" height="43" transform="matrix(0.95588, -0.29376, 0.29376, 0.95588, -209.82788, 204.72037)" fill="#2f2e41"/><ellipse cx="767.887" cy="732.00275" rx="20" ry="7.5" transform="translate(-220.8593 196.83312) rotate(-17.08345)" fill="#2f2e41"/><ellipse cx="813.47537" cy="716.94619" rx="20" ry="7.5" transform="translate(-214.42477 209.56103) rotate(-17.08345)" fill="#2f2e41"/><circle cx="708.52153" cy="545.71023" r="27" fill="#fff"/><circle cx="708.52153" cy="545.71023" r="9" fill="#3f3d56"/><path d="M657.35526,578.74316c-14.48957-25.43323-3.47841-59.016,24.59412-75.0092s62.57592-8.34055,77.06549,17.09268-2.39072,41.6435-30.46325,57.63671S671.84483,604.17639,657.35526,578.74316Z" transform="translate(-39.70387 -61.04208)" fill="#bf8b4b"/><path d="M611.29613,661.29875c0,50.55711-30.05368,68.20979-67.13,68.20979q-1.28835,0-2.57261-.02864c-1.71785-.03682-3.41933-.1186-5.10033-.23313-33.46068-2.36813-59.45707-20.92878-59.45707-67.948,0-48.65932,62.18106-110.05916,66.85186-114.60322l.00819-.00817c.18-.17587.27-.26177.27-.26177S611.29613,610.74164,611.29613,661.29875Z" transform="translate(-39.70387 -61.04208)" fill="#bf8b4b"/><path d="M541.72029,721.77424l24.55253-34.30732-24.6139,38.07426-.0654,3.93872c-1.71785-.03682-3.41933-.1186-5.10033-.23313l2.6463-50.58165-.02047-.39266.045-.07361.24949-4.77718-24.67531-38.16836,24.753,34.58547.05731,1.01433,2-38.21741-21.12507-39.44039L541.80616,625.928l2.08182-79.23247.00819-.26994v.26177l-.34764,62.47962,21.031-24.76934-21.11693,30.15184-.55624,34.21735,19.63634-32.839-19.71812,37.87389-.31085,19.0228,28.50763-45.70631-28.614,52.34448Z" transform="translate(-39.70387 -61.04208)" fill="#3f3d56"/><path d="M875.29613,682.38411c0,55.07585-32.73985,74.3063-73.13,74.3063q-1.4035,0-2.80255-.0312c-1.87139-.04011-3.72494-.1292-5.55619-.254-36.45135-2.57979-64.77127-22.79937-64.77127-74.02113,0-53.00843,67.73872-119.89612,72.827-124.84633l.00892-.00889c.19608-.19159.29409-.28516.29409-.28516S875.29613,627.30827,875.29613,682.38411Z" transform="translate(-39.70387 -61.04208)" fill="#bf8b4b"/><path d="M799.50168,748.26482l26.747-37.37367-26.81386,41.4773-.07125,4.29076c-1.87139-.04011-3.72494-.1292-5.55619-.254l2.88282-55.10258-.0223-.42775.049-.0802.27179-5.20415L770.108,654.01076l26.96539,37.67668.06244,1.105,2.17874-41.63324-23.0132-42.96551,23.29391,35.6583,2.26789-86.31419.00892-.294v.28516l-.37871,68.064,22.91079-26.98321-23.00435,32.84678-.606,37.27566L822.18523,632.958l-21.4805,41.259-.33863,20.723,31.05561-49.79149-31.17146,57.023Z" transform="translate(-39.70387 -61.04208)" fill="#3f3d56"/><ellipse cx="721.51694" cy="656.82212" rx="12.40027" ry="39.5" transform="translate(-220.83517 966.22323) rotate(-64.62574)" fill="#2f2e41"/><ellipse cx="112.51694" cy="651.82212" rx="12.40027" ry="39.5" transform="translate(-574.07936 452.71367) rotate(-68.15829)" fill="#2f2e41"/></svg>   
                        <h3 class="text-center fw-bold">Uhmm Nothing</h3>
                        </div>`
                )
            }
            $('#search-input').val('')

        }
    })
}

function timeConvert(n) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
}