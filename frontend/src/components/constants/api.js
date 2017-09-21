

export const getProducts = () => 
    fetch('http://localhost:8000/api/products')
        .then(res => res.json())

export const editProducts = (id,data) => 
    fetch(`http://localhost:8000/api/products/${id}/edit`,{
        method: 'PUT',
        body : data
    }).then(res => res.json())

export const getProduct = (id) =>
    fetch(`http://localhost:8000/api/products/${id}`)
        .then(res => res.json())

export const deleteProducts = (id) =>
    fetch(`http://localhost:8000/api/products/${id}/delete`,{
        method : 'DELETE'
    }).then(res => res.json())

//用户
export const getUsers = () => 
    fetch(`http://localhost:8000/api/wx/users`)
        .then(res => res.json())