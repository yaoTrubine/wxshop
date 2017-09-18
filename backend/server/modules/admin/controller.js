
export const getAdminLogin = (req, res, next) => {
    try {
        return res.status(200).json({message : 'getAdminLogin'});
    } catch (error) {
        return res.status(error.status).json({eror: true, message: 'Error with getLogin'});
    }
}
