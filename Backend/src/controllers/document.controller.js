import documentModel from "../models/document.model.js";
import userModel from "../models/user.model.js";
import { documentAccess,ownerDocumentAccess } from "../utils/document.utils.js";

export const createDocument =async (req, res,next) => {
    const user = req.user;
    try{
        const { title, content } = req.body;

        const document = await documentModel.findOne({
            title,
            owner:user._id
        })
        if (document) {
            return res.status(400).json({
                message:"Document already exists with this title."
            })
        }
        const doc = await documentModel.create({
            title,
            owner: user._id,
            content
        })

        return res.status(201).json({
            message: "Document created successfully!",
            doc
        })

    } catch (err) {
        next(err);
    }
}

export const fetchDocById = async (req, res,next) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const doc = await documentAccess(id,user._id);

        if (!doc) {
            return res.status(404).json({
                message:`Document doesn't exist.`
            })
        }

        return res.status(200).json({
            message: "Document fetched successfully!",
            doc
        })
    } catch (err) {
        next(err);
    }
}

export const updateDoc = async (req, res,next) => {
    try {
        const { title, content } = req.body;
        const doc = req.doc;
        if (title) {
            doc.title = title;    
        }
        if (content) {
            doc.content = {...doc.content,...content};    
        }
        await doc.save();

        return res.status(200).json({
            message:'Document updated successfully'
        })
    } catch (err) {
        next(err);
    }
}

export const deleteDoc = async (req, res,next) => {
    const { id } = req.params;
    const user = req.user;
    try {
        const doc = await ownerDocumentAccess(id, user._id);
        if (!doc) {
            return res.status(400).json({
                message:"Document doesn't exist"
            })
        }
        await documentModel.deleteOne ({_id:id});

        return res.status(200).json({
            message: "Document deleted successfully!"
        });

    } catch (err) {
        next(err);
    }
}

export const getAllDocs = async (req, res,next) => {
    const user = req.user;
    try {
        const allDocs = await documentModel.find({
            $or: [
                { owner: user._id },
                {"collaborators.user":user._id}
            ]
        }).sort({
            updatedAt:-1
        })

        if (allDocs.length === 0) {
            return res.status(200).json({
                message:"No documents exists for this user."
            })
        }
        return res.status(200).json({
            message: "All Documents of user fetched successfully!",
            allDocs
        })
    } catch (err) {
        next(err);
    }
}

export const addCollaborator = async (req, res,next) => {
    const user = req.user;
    const { id } = req.params;
    const { email,role } = req.body;
    try {
        const doc = await ownerDocumentAccess(id, user._id);

        if (!doc) {
            return res.status(404).json({
                message:"Document not found!"
            })
        }
        const userExists = await userModel.findOne({email});
        
        if (!userExists) {
            return res.status(404).json({
                message:"user doesn't exists"
            })
        }

         if (user._id.equals(userExists._id)) {
            return res.status(400).json({
                message: "You can't invite yourself."
            });
        }

        // prevent duplicate collaborator
        const alreadyCollaborator = doc.collaborators.some((item) =>
            item.user.equals(userExists._id)
        );
         if (alreadyCollaborator) {
            return res.status(400).json({
                message: "Already collaborated!"
            });
        }
        doc.collaborators.push({ user:userExists._id, role });
        await doc.save();
        
        return res.status(201).json({
            message: "Collaborator added successfully!",
            doc
        })

    } catch (err) {
        next(err);
    }
}

export const removeCollaborator = async (req, res,next) => {
    try {
        const { id, userId } = req.params;
        const user = req.user;
        const doc = await ownerDocumentAccess(id, user._id);
        if (!doc) {
            return res.status(404).json({
                message:"document doesn't exist."
            })
        }
        const exists = doc.collaborators.find((item) => {
            return item.user.equals(userId);
        })
        if (!exists) {
            return res.status(400).json({
                message:"Collaborator doesn't exists."
            })
        }
        const updated=doc.collaborators.filter((item) => {
            return item.user.toString()!==userId.toString()
        })
        doc.collaborators = updated;
        await doc.save();

        return res.status(200).json({
            message: "Collaborator removed successfully!",
            doc
        })
    } catch (err) {
        next(err);
    }
}