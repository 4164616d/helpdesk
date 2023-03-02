const logout = () => {
  window.localStorage.removeItem('user')
  window.location.reload()
}
export default logout
