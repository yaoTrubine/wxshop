

export const getProducts = () => 
    fetch('http://localhost:8000/api/products')
        .then(res => res.json())

export const editProducts = (id,data) => 
    fetch(`http://localhost:8000/api/products/${id}/delete`,{
        method: 'PUT',
        body : data
    }).then(res => res.json())

export const deleteProducts = (id) =>
    fetch(`http://localhost:8000/api/products/${id}/delete`,{
        method : 'DELETE'
    }).then(res => res.json())
