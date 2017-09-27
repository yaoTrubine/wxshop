import Order from './model';

export const createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const { token,goodsJsonStr,remark } = req.body;
        const newOrder = new Order({token,goodsJsonStr,remark});
        return res.status(201).json( { order : await newOrder.save() } );
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with Order'});
    }
}

export const findAllOrder = async (req, res) => {
    try {
        return res.status(200).json( { orders : await Order.find({}) } );
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with findOrder'});
    }
}

export const findOrder = async (req, res) => {
    console.log(req.params);
    try {
        return res.status(200).json( { orders : await Order.find({ token : req.params.openId}) } );
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with findOrder'});
    }
}


export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        await order.remove();
        return res.status(200).json({message: 'delete success'});
    } catch (error) {
        return res.status(error.status).json({error: true, message: 'Error with deleteorder'});        
    }
}