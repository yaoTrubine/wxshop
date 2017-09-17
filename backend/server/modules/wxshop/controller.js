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
        return res.status(200).json({products : await Product.find({})});
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with Product'});
    }
}

export const updateProduct = async (req, res) => {
    const { name, price, category, amount, images } = req.body;
      
    try {
        Product.findByIdAndUpdate({_id : req.params.id}, { name, price, category, amount, images });
        return res.status(201).json({ product: await Product.findById({id : req.params.id })});
    } catch(error){
        return res.status(error.status).json({error: true, message: 'Error with updateProduct'});
    }
}

export const deleteProduct = async (req, res) => {
    const { productId } = req.params; 
    try {
        return res.json({id: productId});
    } catch (error) {
        return res.status(error.status).json({error: true, message: 'Error with deleteProduct'});        
    }
}
