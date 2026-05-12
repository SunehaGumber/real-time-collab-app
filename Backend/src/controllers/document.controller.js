import documentModel from "../models/document.model.js";

export const createDocument =async (req, res) => {
    const user = req.user;
    try{
        const { title, collaborators, content } = req.body;

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
            collaborators,
            content
        })

        return res.status(201).json({
            message: "Document created successfully!",
            doc
        })

    } catch (err) {
        return res.status(500).json({
            message:"Internal Server error"
        })
    }
}

export const fetchDocById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const doc = await documentModel.findOne({
            _id: id,
            $or: [
                { owner: user._id },
                {collaborators:user._id}
            ]
        });

        if (!doc) {
            return res.status(400).json({
                message:`Document doesn't exist.`
            })
        }

        return res.status(200).json({
            message: "Document fetched successfully!",
            doc
        })
    } catch (err) {
        return res.status(500).json({
            message:'Internal Server error'
        })
    }
}

export const updateDoc = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        const user = req.user;

        const doc = await documentModel.findOne({
            _id: id,
            $or: [
                { owner: user._id },
                {collaborators:user._id}
            ]
        });
        if (!doc) {
            return res.status(400).json({
                message:`Document do not exist.`
            })
        }
        if (title) {
            doc.title = title;    
        }
        if (content) {
            doc.content = content;    
        }
        await doc.save();

        return res.status(200).json({
            message:'Document updated successfully'
        })
    } catch (err) {
        return res.status(500).json({
           message:'Internal Server Error'
       }) 
    }
}

export const deleteDoc = async (req, res) => {
    console.log("reached controller")
    const { id } = req.params;
    const user = req.user;
    try {
        const doc = await documentModel.findOne({
            _id: id,
            owner:user._id
        })

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
        return res.status(500).json({
            message:"Internal Server error"
        })
    }
}

export const getAllDocs = async (req, res) => {
    const user = req.user;
  
    try {
        console.log('user', user);
        const allDocs = await documentModel.find({
            $or: [
                { owner: user._id },
                {collaborators:user._id}
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
        return res.status(500).json({
            message:"Internal Server Error!"
        })
    }
}