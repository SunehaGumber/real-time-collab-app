import documentModel from "../models/document.model.js";

export const canEditMiddleware = async (req,res,next) => {
    try {
        const user = req.user;
        const { id } = req.params;

        const doc = await documentModel.findById(id);
        if (!doc) {
            return res.status(400).json({
                message:"Document don't exist."
            })
        }
        const owner = doc.owner.equals(user.id);

        const collab = doc.collaborators.find((item) => item.user.equals(user._id));

        const canEdit = collab?.role === 'editor'
        if (!owner && !canEdit) {
            return res.status(403).json({
                message:'Forbidden no access to edit.'
            })
        }
        req.doc = doc;
        next();
    
    } catch (err) {
        next(err);
    }
}