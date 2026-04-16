const Notes = require('../models/Note')
exports.getAllNotes = async (req,res)=>{
try{
    const notes = await Notes.find();
    res.json({notes});

}catch(err) {
    res.status(500).json({message: err.message});

}
};
exports.getNoteById = async (req,res) =>{
    try{
        const note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: 'note not found'});

        }
        res.json(note);

    }catch(err){
        res.status(500).json({message: err.message})
        

    }
};
 exports.createNotes =async()
