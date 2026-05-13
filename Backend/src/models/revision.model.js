import mongoose from "mongoose";

const revisionSchema = new mongoose.Schema({
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "document",
        required: [true, "document field is required."]
    },
    content: {
        type: Object,
        default: {
            ops: []
        }
    },
    editedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:[true,"user is requi"]
    }
}, {
    timestamps: true
});

const revisionModel = mongoose.model('revision', revisionSchema);
export default revisionModel;