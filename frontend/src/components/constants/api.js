
const URL = 'http://localhost:8000';
export const getProducts = () => 
    fetch(`${URL}/api/products`)
        .then(res => res.json())

export const editProducts = (id,data) => 
    fetch(`${URL}/api/products/${id}/edit`,{
        method: 'PUT',
        body : data
    }).then(res => res.json())

export const getProduct = (id) =>
    fetch(`${URL}/api/products/${id}`)
        .then(res => res.json())

export const deleteProducts = (id) =>
    fetch(`${URL}/api/products/${id}/delete`,{
        method : 'DELETE'
    }).then(res => res.json())

//用户
export const getUsers = () => 
    fetch(`${URL}/api/wx/users`)
        .then(res => res.json())

export const getOrders = () =>
    fetch(`${URL}/api/orders`)
        .then(res => res.json())