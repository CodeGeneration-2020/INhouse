export const getHeaders = () => (
  { headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` } }
)