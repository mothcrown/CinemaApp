/* global */
import $ from 'jquery'

const movies = require('./../json/peliculas.json')
let sala = require('./../json/cinema.json')
let asientos = require('./../json/salas.json')

const defaultViewBox = ['700', '500']

function loadCinema() {
  if (Storage !== void(0)) {
    if (localStorage.asientos !== undefined) {
      asientos = JSON.parse(localStorage.asientos)
    } else {
      localStorage.asientos = JSON.stringify(asientos)
    }
  }
}

function creaSala() {
  loadCinema()
  const svgns = 'http://www.w3.org/2000/svg'
  const xlinkns = 'http://www.w3.org/1999/xlink'
  Object.values(sala.asientos).map((sitio) => {
    const use = document.createElementNS(svgns, 'use')
    use.id = sitio.fila + sitio.asiento
    use.setAttribute('x', sitio.px)
    use.setAttribute('y', sitio.py)
    use.classList.add('libre')
    use.setAttributeNS(xlinkns, 'href', '#asiento')
    document.getElementById('salaCine').appendChild(use)
  })
  const ticket = JSON.parse(localStorage.ticket)
  const asientosOcupados = asientos[`sala${ticket.sala}`][`${ticket.sesion}`]
  asientosOcupados.map((asiento) => {
    $(`#${asiento}`).addClass('ocupado')
  })
}

function cargaInfo() {
  const ticket = JSON.parse(localStorage.ticket)
  $('#infoPelicula').text(ticket.pelicula)
  $('#infoSala').text(ticket.sala)
  $('#infoSesion').text(ticket.sesion)
}

function guardaEstado(asientoId, estado) {
  const ticket = JSON.parse(localStorage.ticket)
  const asientosOcupados = asientos[`sala${ticket.sala}`][`${ticket.sesion}`]
  let asientos1 = ''
  if (estado) {
    asientosOcupados.push(asientoId)
    ticket.asientos.push(asientoId)
    
    ticket.asientos.map((asiento) => {
      asientos1 += `${asiento}, `
    })
    $('#infoAsientos').text(asientos1.slice(0, -2))
  } else {
    const index1 = asientosOcupados.indexOf(asientoId)
    if (index1 > -1) {
      asientosOcupados.splice(index1, 1)
    }
    const index2 = ticket.asientos.indexOf(asientoId)
    if (index2 > -1) {
      ticket.asientos.splice(index2, 1)
    }
    ticket.asientos.map((asiento) => {
      asientos1 += `${asiento}, `
    })
    $('#infoAsientos').text(asientos1.slice(0, -2))
  }
  localStorage.asientos = JSON.stringify(asientos)
  localStorage.ticket = JSON.stringify(ticket)
}

function activateSeats() {
  $('use').click((event) => {
    const asientoId = event.currentTarget.id
    $(event.currentTarget).toggleClass('seleccionado')
    $(event.currentTarget).toggleClass('libre')
    if ($(event.currentTarget).hasClass('seleccionado')) {
      guardaEstado(asientoId, true)
    } else {
      guardaEstado(asientoId, false)
    }
  })
  $('.ocupado').off('click')
}

function activateZoom() {
  $('#vermas').click(() => {
    let currentViewBox = $('#salaCine').attr('viewBox')
    currentViewBox = currentViewBox.split(' ')
    const x = +currentViewBox[2] - 100
    const y = +currentViewBox[3] - 100
    $('#salaCine').attr('viewBox', `0 0 ${x} ${y}`)
  })
  $('#vermenos').click(() => {
    let currentViewBox = $('#salaCine').attr('viewBox')
    currentViewBox = currentViewBox.split(' ')
    const x = +currentViewBox[2] + 100
    const y = +currentViewBox[3] + 100
    $('#salaCine').attr('viewBox', `0 0 ${x} ${y}`)
  })
  $('#moveleft').click(() => {
    let currentViewBox = $('#salaCine').attr('viewBox')
    currentViewBox = currentViewBox.split(' ')
    const x = +currentViewBox[2] - 100
    
    const y = +currentViewBox[3]
    $('#salaCine').attr('viewBox', `0 0 ${x} ${y}`)
  })
  $('#moveright').click(() => {
    let currentViewBox = $('#salaCine').attr('viewBox')
    currentViewBox = currentViewBox.split(' ')
    const x = (+currentViewBox[2] === 700) ? +currentViewBox[2] : +currentViewBox[2] + 100
    const y = +currentViewBox[3]
    $('#salaCine').attr('viewBox', `0 0 ${x} ${y}`)
  })
  $('#moveup').click(() => {
    let currentViewBox = $('#salaCine').attr('viewBox')
    currentViewBox = currentViewBox.split(' ')
    const x = +currentViewBox[2]
    const y = (+currentViewBox[2] === 500) ? +currentViewBox[2] : +currentViewBox[2] + 100
    $('#salaCine').attr('viewBox', `0 0 ${x} ${y}`)
  })
  $('#movedown').click(() => {
    let currentViewBox = $('#salaCine').attr('viewBox')
    currentViewBox = currentViewBox.split(' ')
    const x = +currentViewBox[2]
    const y = +currentViewBox[3] - 100
    $('#salaCine').attr('viewBox', `0 0 ${x} ${y}`)
  })
  $('#comprarasientos').click(() => {
    document.location = 'pago.html'
  })

}

$(document).ready(() => {
  creaSala()
  cargaInfo()
  activateSeats()
  activateZoom()
})
