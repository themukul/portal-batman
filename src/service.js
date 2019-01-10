// const ALFRED_URL = 'http://localhost:7777/api'

export const loginStudent = (body) => {
  const apiUrl = `/auth/login/student`;
  return {
    url: apiUrl,
    method: 'POST',
    body
  };
}

export const loginFaculty = (body) => {
  const apiUrl = `/auth/login/faculty`;
  return {
    url: apiUrl,
    method: 'POST',
    body
  };
}

export const getFaculty = () => {
  const apiUrl = `/faculty/profile`;
  return {
    url: apiUrl,
    method: 'GET'
  };
}

export const getStudent = () => {
  const apiUrl = `/student/profile`;
  return {
    url: apiUrl,
    method: 'GET'
  };
}

export const getMaterials = () => {
  const apiUrl = `/material`;
  return {
    url: apiUrl,
    method: 'GET'
  }
}

export const postNewMaterial = (body) => {
  const apiUrl = `/material`;
  return {
    url: apiUrl,
    method: 'POST',
    body
  }
}

export const getPayments = () => {
  const apiUrl = `/payment`;
  return {
    url: apiUrl,
    method: 'GET'
  }
}

export const postNewPayment = (body) => {
  const apiUrl = `/payment`;
  return {
    url: apiUrl,
    method: 'POST',
    body
  }
}

export const getNews = () => {
  const apiUrl = `/news`;
  return {
    url: apiUrl,
    method: 'GET'
  }
}

export const postNewNews = (body) => {
  const apiUrl = `/news`;
  return {
    url: apiUrl,
    method: 'POST',
    body
  }
}

export const getBtp = () => {
  const apiUrl = `/btp`;
  return {
    url: apiUrl,
    method: 'GET'
  }
}

export const postNewBtp = (body) => {
  const apiUrl = `/btp`;
  return {
    url: apiUrl,
    method: 'POST',
    body
  }
}

export const getTa = () => {
  const apiUrl = `/ta`;
  return {
    url: apiUrl,
    method: 'GET'
  }
}

export const postNewTa = (body) => {
  const apiUrl = `/ta`;
  return {
    url: apiUrl,
    method: 'POST',
    body
  }
}