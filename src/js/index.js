/* global */

import $ from 'jquery'

// IMÁGENES
import caidacasausher from './../images/caidacasausher.jpg'
import maldicionhombrelobo from './../images/maldicionhombrelobo.jpg'
import suspiria from '../images/suspiria.jpg'
import xtro from '../images/xtro.jpg'
import noviazombie from '../images/noviazombie.jpg'

import arrow from '../images/grey-arrow.png'

const movies = require('./../json/peliculas.json')

const carouselLength = 5
const carouselClasses = ['third left', 'second left', 'principal', 'second right', 'third right']
const moviesLength = Object.keys(movies).length

function refreshInfo() {
  const movie = $('.principal').attr('id')
  $('#horas').empty()
  $('#titulo').text(movies[movie].titulo)
  $('#anno').text(movies[movie].año)
  $('#sala').text(movies[movie].sala)
  const horario = movies[movie].horario
  const numHorario = horario.length
  for (let i = 0; i < numHorario; i += 1) {
    $('#horas').append(`<a href="asientos.html" class="${movies[movie].titulo}-${horario[i]}">${horario[i]}</a>`)
    if (i !== numHorario - 1) {
      $('#horas').append(', ')
    }
  }
  $('#sinopsis').text(movies[movie].sinopsis)
}

function moveCarouselLeft() {
  let index = +$('.third.left').attr('id').substr(8)
  index -= 1
  moveCarousel(index)
}

function moveCarouselRight() {
  let index = +$('.third.left').attr('id').substr(8)
  index += 1
  moveCarousel(index)
}

function deactivateArrows() {
  $('#leftarrow').off('click')
  $('#rightarrow').off('click')
}

function deactivateKeys() {
  $(document).off('keydown')
}

function activateArrows() {
  $('#leftarrow').click(() => {
    moveCarouselLeft()
  })
  $('#rightarrow').click(() => {
    moveCarouselRight()
  })
}

function activateCarousel() {
  $('.left').click(() => {
    moveCarouselLeft()
  })
  $('.right').click(() => {
    moveCarouselRight()
  })
}

function activateKeys() {
  $(document).keydown((event) => {
    if (event.which === 13 || event.keyCode === 13) {
      openDialog()
    } else if (event.which === 37 || event.keyCode === 37) {
      moveCarouselLeft()
    } else if (event.which === 39 || event.keyCode === 39) {
      moveCarouselRight()
    }
  })
}

function closeDialog() {
  deactivateKeys()
  activateArrows()
  activateKeys()
  $('.curtain').css('display', 'none')
  $('.dialog').css('display', 'none')
}

function vote() {
  $('.popup').css('display', 'block')
  if (Storage !== void(0)) {
    const newVote = {}
    newVote.nombre = $('#txtFirstName').val()
    newVote.apellido = $('#txtLastName').val()
    newVote.email = $('#txtEmail').val()
    newVote.voto = $('#tituloForm').text()
    votes['votos'].push(newVote)
    localStorage['votos'] = JSON.stringify(votes)
    setTimeout(() => { window.location = 'results.html' }, 3000)
  } else {
    closeDialog()
  }
}

function openDialog() {
  deactivateArrows()
  deactivateKeys()
  $(document).keydown((event) => {
    if (event.which === 27 || event.keyCode === 27) {
      closeDialog()
    }
    if (event.which === 13 || event.keyCode === 13) {
      vote()
    }
  })
  $('.curtain').css('display', 'block')
  $('.dialog').css('display', 'flex')
  const movieName = $('#titulo').text()
  $('#tituloForm').text(movieName)

  const horarios = $('#horas').children().find('a')
  Object.values(horarios).map((hora) => {
    $('#horarios').append(hora)
  })
  /*
  const horario = movies[movieName].horario
  const numHorario = horario.length
  for (let i = 0; i < numHorario; i += 1) {
    $('#horarios').append(`<a href="asientos.html" class="${movies[movie].titulo}-${horario[i]}">${horario[i]}</a>`)
    if (i !== numHorario - 1) {
      $('#horarios').append(', ')
    }
  }
  */
}

const getMovieImg = movie => ({
  'La caída de la casa Usher': `${caidacasausher}`,
  'La maldición del hombre lobo': `${maldicionhombrelobo}`,
  'Suspiria': `${suspiria}`,
  'Xtro': `${xtro}`,
  'Mi novia es un zombie': `${noviazombie}`
})[movie]

function activatePrincipal() {
  $('.principal').click(() => {
    openDialog()
  })
}

function moveCarousel(index) {
  $('#carrusel').children().remove()
  let i
  if (index === 0) {
    i = moviesLength
  } else if (index === moviesLength + 1) {
    i = 1
  } else {
    i = index
  }
  let j = 0
  const leftarrow = `<div id="leftarrow" class="arrow" aria-label="Mueve selección a la izquierda"><img src="${arrow}" aria-labelledby="leftarrow" alt="Flecha izquierda"></div>`
  $(leftarrow).appendTo('#carrusel')
  do {
    const movie = movies[`pelicula${i}`]
    let carouselElement
    if (carouselClasses[j] !== 'principal') {
      carouselElement = `<div id="pelicula${i}" class="peliculas ${carouselClasses[j]}"><img src="${getMovieImg(movie.titulo)}" alt="${movie.titulo}"></div>`
    } else {
      carouselElement = `<div id="pelicula${i}" class="peliculas ${carouselClasses[j]}" tabindex=1 aria-label="${movie.titulo}"><img src="${getMovieImg(movie.titulo)}" aria-labelledby="pelicula${i}" alt="${movie.titulo}"></div>`
    }
    

    $(carouselElement).appendTo('#carrusel')
    i += 1
    if (i === moviesLength + 1) {
      i = 1
    }
    j += 1
  } while (j !== carouselLength)
  const rightarrow = `<div id="rightarrow" class="arrow" aria-label="Mueve selección a la derecha"><img src="${arrow}" aria-labelledby="rightarrow" alt="Flecha derecha"></div>`
  $(rightarrow).appendTo('#carrusel')
  activateCarousel()
  activatePrincipal()
  activateArrows()
  refreshInfo()
}

function generateCarousel() {
  const i = moviesLength - 1
  moveCarousel(i)
}

function activateButtons() {
  $('#btnReturn').click(() => {
    closeDialog()
  })

  $('#btnVote').click(() => {
    vote()
  })
}

$(document).ready(() => {
  generateCarousel()
  activatePrincipal()
  activateKeys()
  activateButtons()
})
