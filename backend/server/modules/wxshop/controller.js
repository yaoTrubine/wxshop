import Product from './model';

export const createProduct = async (req, res) => {
    console.log(req.body);
    const { name, price, category, amount, images } = req.body;
    const newProduct = new Product({name, price, category, amount, images});

    try {
        return res.status(201).json({ product : await newProduct.save() });
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with Product'});
    }
}

export const findAllProduct = async (req, res) => {
    try {
        return res.status(200).json({product : await Product.find({})});
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with Product'});
    }
}