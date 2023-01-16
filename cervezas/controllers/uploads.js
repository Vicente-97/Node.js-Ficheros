const path = require('path');
const fs   = require('fs');


const { response } = require('express');
const { uploadFile } = require('../helpers/uploadFile');

const  User  = require('../models/usuario');

const Cerveza = require('../models/cerveza');


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
    switch (colection) {
        case "users":
           
                
                // txt, md
                // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
                const nombreUser = await uploadFile( req.files, undefined, 'imgs/'+colection );  
                
               
                const user = await User.findById(id);
        
                const rutaUser = path.join(__dirname,'../uploads', 'imgs/',colection, user.img)
        
                if(user.img!=null||user.img!=""||cerveza.img){
                    if(fs.existsSync(rutaUser)){
                        console.log("EXIST")
                        fs.unlinkSync(rutaUser)
                    }else{
                        console.log("DONT EXIST")
                    }
        
                }else{
                    return  path.join(__dirname,'../uploads', 'assert/', notImage.jpg)
                    
                }
                user.img=nombreUser
                await user.save()
        
        
        
                res.json({nombreUser});
        
        
            
            
            break;
        case "cervezas":
            
        
                // txt, md
                // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
                const nombre = await uploadFile( req.files, undefined, 'imgs/'+colection );  
                
               
                const cerveza = await Cerveza.findById(id);
        
                const ruta = path.join(__dirname,'../uploads', 'imgs/',colection, cerveza.img)
        
                if(cerveza.img!=null||cerveza.img!=""||cerveza.img){
                    if(fs.existsSync(ruta)){
                        console.log("EXIST")
                        fs.unlinkSync(ruta)
                    }else{
                        console.log("DONT EXIST")
                    }
        
                }else{
                    
                }
                cerveza.img=nombre
                await cerveza.save()
        
        
        
                res.json({nombre});
        
        
          
        
        break;
    
        default:
            break;
    }
        } catch (msg) {
            res.status(400).json({ msg });
        }


}

const getImage = async (req, res = response) => {
    const id = req.params.id;
    const collection = req.params.colection;
    let model;
    try {
    switch (collection){
        case "users":
            model = await User.findById(id);
            break;

        case "cervezas":
            model = await Cerveza.findById(id);
            break;

        default:
            break;
    }

    if(model.img){
        const ruta = path.join(__dirname,'../uploads','imgs/',collection,model.img) 
        return res.sendFile(ruta);
        
    }else{
        const ruta = path.join(__dirname,'../uploads/assert/notImage.jpg') 
        return res.sendFile(ruta);
    }

        
    } catch (msg) {
        res.status(400).json({ msg });
    }

}






module.exports = {
    upload,
    updateImage,
    getImage
}