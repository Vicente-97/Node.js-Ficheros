const path = require('path');
const fs   = require('fs');


const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');

const  User  = require('../models/usuario');
const cerveza = require('../models/cerveza');


const upload = async(req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {
        
        // txt, md
        // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
        const nombre = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const updateImage =async(req, res = response) => {
    const colection = req.params.colection;
    const id = req.params.id;


    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {
        
        // txt, md
        // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
        const nombre = await uploadFile( req.files, undefined, 'imgs/'+colection );  
        
       
        const user = await User.findById(id);

        const ruta = path.join(__dirname,'../uploads', 'imgs/',colection, user.img)

        if(user.img!=null||user.img!=""){
            if(fs.existsSync(ruta)){
                console.log("EXIST")
                fs.unlinkSync(ruta)
            }else{
                console.log("DONT EXIST")
            }

        }
        user.img=nombre
        await user.save()



        res.json({nombre});


    } catch (msg) {
        res.status(400).json({ msg });
    }

}



module.exports = {
    upload,
    updateImage
}