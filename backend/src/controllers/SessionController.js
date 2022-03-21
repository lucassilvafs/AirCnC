const User = require('../models/User');

//index (retornar uma listagem de sessões),
//show (retorna uma sessão), 
//store (cria uma sessão), 
//update (altera uma sessão), 
//destroy (deletar uma sessão)

module.exports = {
    async store( req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};