/* global */

import $ from 'jquery'

let ticket

function loadTicket() {
  ticket = JSON.parse(localStorage.ticket)
  $('#infoPelicula').text(ticket.pelicula)
  $('#infoSala').text(ticket.sala)
  $('#infoSesion').text(ticket.sesion)
  let asientos = ''
  const numAsientos = ticket.asientos.length
  const precioTotal = 8 * numAsientos
  ticket.asientos.map((asiento) => {
    asientos += `${asiento}, `
  })
  $('#infoAsientos').text(asientos.slice(0, -2))
  $('#numAsientos').text(numAsientos)
  $('#precioTotal').text(`${precioTotal}€`)
}

function buyTicket() {
  $('.curtain').css('display', 'block')
  setTimeout(() => {
    $('.curtain').empty()
    const userName = $('#userName').val()
    $('#nombreusuario').text(userName)
    const precioFinal = $('#precioTotal').text()
    $('#preciofinal').text(precioFinal)
    $('.dialog').css('display', 'flex')
  }, 3000)
}

function openDialog() {
  const userName = $('#userName').val()
  if (userName !== '') {
    buyTicket()
  } else {
    $('.popup').css('display', 'block')
    setTimeout(() => {
      $('.popup').css('display', 'none')
    }, 2000)
  }
}

function activateButtons() {
  $('#comprafinal').click((e) => {
    e.preventDefault()
    openDialog()
  })
  $('#btnIndex').click(() => {
    document.location = 'index.html'
  })
}

$(document).ready(() => {
  loadTicket()
  activateButtons()
})
