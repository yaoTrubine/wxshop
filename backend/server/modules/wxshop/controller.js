import Product from './model';

export const createProduct = async (req, res) => {
    const { title, description, image } = req.body;
    const newProduct = new Product({title, description, image});

    try {
        return res.status(201).json({ product : await newProduct.save() });
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with Product'});
    }
}