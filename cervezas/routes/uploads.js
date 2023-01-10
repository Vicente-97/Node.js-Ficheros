const { Router } = require('express');
const { check } = require('express-validator');
const {upload, updateImage} = require('../controllers/uploads')
const {cerveza} = require('../models/cerveza')
const {user} = require('../models/usuario')
const { validateFields } = require('../helpers/validate-fields')



const collections =["cerveza", "user"]
const router = Router();


router.post( '/', upload );
router.put('/:colection/:id',[
    check('id','No es un id correcto').isMongoId(),
    check('colection', 'No esta dentro de los modelos').isIn(collections),
    validateFields


], updateImage)




module.exports = router;