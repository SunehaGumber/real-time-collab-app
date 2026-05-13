import { fetchDocById } from "../controllers/document.controller.js";
import documentModel from "../models/document.model.js";

export async function documentAccess(docId, id) {
  const doc = await documentModel.findOne({
    _id: docId,
    $or: [{ owner: id }, { "collaborators.user": id }],
  });
  return doc;
}
export async function ownerDocumentAccess(docId, id) {
  const doc = await documentModel.findOne({
    _id: docId,
    owner:id
  })
  return doc;
}
