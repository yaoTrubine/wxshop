

export const getProducts = () => 
    fetch('http://localhost:8000/api/products')
        .then(res => res.json())
