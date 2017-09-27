import request from 'request';
import WXBizDataCrypt from '../../utils/WXBizDataCrypt';
import User from './model';
const APPID = 'wxb6b17aecec279366';
const SECRET = '0118e2a2a11703dc1285c12f29cc280b';

export const saveUsers = async (req, res) => {
    try{
        let code = req.body.code;
        let encryptedData = req.body.encryptedData;
        let iv = req.body.iv;

        request.get({
            uri: 'https://api.weixin.qq.com/sns/jscode2session',
            json: true,
            qs: {
            grant_type: 'authorization_code',
            appid: 'wxb6b17aecec279366',
            secret: '0118e2a2a11703dc1285c12f29cc280b',
            js_code: code
            }
        },async (err, response, data) => {
            if(response.statusCode == 200){
                
               //data: session_key, expires_in, openid
                let pc = new WXBizDataCrypt(APPID, data.session_key);
                let newData = pc.decryptData(encryptedData, iv);
                console.log(newData);
                let { openId,nickName,gender,language,city,province,country,avatarUrl } = newData;
                let newUser = new User({ openId,nickName,gender,language,city,province,country,avatarUrl });
                try {
                    return res.status(201).json({
                        user : await newUser.save(),
                    });
                } catch (error) {
                    return res.status(error.status).json({eror: true, message: 'Error with saveUser'});
                }
            }else{
                res.json(err);
            }
        })

    }catch(err){
        return res.status(error.status).json({eror: true, message: 'Error with getUser'});
    }
}

export const getUsers = async (req, res) => {
    try {
        return res.status(200).json({ users : await User.find({})});
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with findUsers'});
    }
}
