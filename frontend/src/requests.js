/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios'
import logout from './utils/logout'

const apiRequest = async (method, endpoint, params, sendNotification, token = '', tryNum = 1) => {
  const retryCount = 4
  return new Promise((resolve, reject) => {
    const url = `http://localhost:5000/${endpoint}`
    axios({
      method,
      url,
      timeout: 10000,
      headers: { Authorization: `Bearer ${token}` },
      data: params
    })
      .then((jsonResponse) => {
        resolve(jsonResponse.data)
      })
      .catch(async (error) => {
        if (error.response) {
          if (endpoint !== '/login' & error.response.status === 401) {
            logout()
          }
          if (error.response) {
            sendNotification({ msg: error.response.data.description, variant: 'error' })
          } else if (error.request) {
            sendNotification({ msg: "Can't connect to the server", variant: 'error' })
          } else {
            sendNotification({ msg: error.message, variant: 'error' })
          }
          reject({ ...error })
        } else {
          if (tryNum < retryCount) {
            sendNotification({ msg: `Can't connect - Retrying request ${tryNum}/${retryCount} waiting ${2 ** tryNum} seconds`, variant: 'warn' })
            setTimeout(async () => {
              await apiRequest(method, endpoint, params, sendNotification, token, tryNum + 1)
                .then((data) => resolve(data)).catch((error) => reject(error))
            }, 2 ** tryNum * 1000)
          } else {
            sendNotification({ msg: 'Unable to connect to server', variant: 'error' })
            reject({ ...error })
          }
        }
      })
  })
}

export const loginRequest = async (user, sendNotification) => {
  const method = 'post'
  const endpoint = '/login'
  const response = await apiRequest(
    method,
    endpoint,
    user,
    sendNotification
  )
  return response
}

export const registerRequest = async (user, sendNotification) => {
  const method = 'post'
  const endpoint = '/register'
  const response = await apiRequest(
    method,
    endpoint,
    user,
    sendNotification
  )
  return response
}

export const usersRequest = async (token, sendNotification) => {
  const method = 'get'
  const endpoint = '/users'
  const response = await apiRequest(
    method,
    endpoint,
    {},
    sendNotification,
    token
  )
  return response
}

export const createTicketRequest = async (ticket, token, sendNotification) => {
  const method = 'post'
  const endpoint = '/createticket'
  const response = await apiRequest(
    method,
    endpoint,
    ticket,
    sendNotification,
    token
  )
  return response
}

export const ticketsRequest = async (token, sendNotification) => {
  const method = 'get'
  const endpoint = '/tickets'
  const response = await apiRequest(
    method,
    endpoint,
    {},
    sendNotification,
    token
  )
  return response
}

export const addCommentRequest = async (comment, token, sendNotification) => {
  const method = 'post'
  const endpoint = '/comment'
  const response = await apiRequest(
    method,
    endpoint,
    comment,
    sendNotification,
    token
  )
  return response
}

export const closeTicketRequest = async (ticketId, token, sendNotification) => {
  const method = 'put'
  const endpoint = `/ticket/${ticketId}/closed`
  const response = await apiRequest(
    method,
    endpoint,
    {},
    sendNotification,
    token
  )
  return response
}

export const commentsRequest = async (token, sendNotification) => {
  const method = 'get'
  const endpoint = '/comments'
  const response = await apiRequest(
    method,
    endpoint,
    {},
    sendNotification,
    token
  )
  return response
}
