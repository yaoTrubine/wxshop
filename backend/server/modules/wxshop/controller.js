import Product from './model';

export const createProduct = async (req, res, next) => {
    console.log(req.body);
    const { name, price, category, amount, images } = req.body;
    const newProduct = new Product({name, price, category, amount, images});

    try {
        return res.status(201).json({ product : await newProduct.save() });
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with Product'});
    }
}

export const findAllProduct = async (req, res, next) => {
    try {
        return res.status(200).json({products : await Product.find({})});
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with Product'});
    }
}

export const findProduct = async (req, res, next) => {
    try {
        return res.status(200).json({product : await Product.findById(req.params.productId)});
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with findProduct'});
    }
}

export const updateProduct = async (req, res, next) => {
    const body = req.body;
    try {
        const product = await Product.findById(req.params.productId);
        Object.keys(body).forEach( key => {
            product[key] = body[key];
        });
        return res.status(201).json({ product : await product.save() });
    } catch(error){
        return res.status(error.status).json({error: true, message: 'Error with updateProduct'});
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        await product.remove();
        return res.status(200).json({message: 'delete success'});
    } catch (error) {
        return res.status(error.status).json({error: true, message: 'Error with deleteProduct'});        
    }
}
