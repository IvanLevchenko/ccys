import {_axios} from './axios'

export async function getActualCurrencies() {
  return await _axios.get('/get-currencies', {
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export async function getArchiveCurrencies() {
  return await _axios.get('/get-archive', {
    headers: {
      'Content-type': 'application/json',
    }
  })
}