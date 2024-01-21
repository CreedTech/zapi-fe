import Cookies from "universal-cookie"
const cookies = new Cookies()
export const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }