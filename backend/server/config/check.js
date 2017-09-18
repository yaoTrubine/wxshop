import auth from 'basic-auth';



const checkLogin = (req, res, next) => {
    let credentials = auth(req);
    const unauthorized = (res) => {
        res.set('WWW-Authenticate', 'Basic realm=Input User&Password');
		return res.sendStatus(401);
    }

    if (!credentials || !credentials.name || !credentials.pass) {
        return unauthorized(res);
      };
    
    if (credentials.name === 'admin' && credentials.pass === 'admin_rua') {
        return next();
    } else {
        return unauthorized(res);
    };
}

export { checkLogin };