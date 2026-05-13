import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import * as documentController from '../controllers/document.controller.js'
import { documentSchema, addCollabSchema } from '../validations/document.validation.js';
import { validate } from '../middleware/validation.middleware.js';
import { canEditMiddleware } from '../middleware/canEdit.middleware.js';
const documentRouter = Router();

/**
 * @route /api/document/create
 * @description creates a document
 * @access Private
 */
documentRouter.post('/create', authMiddleware,validate(documentSchema), documentController.createDocument);
/**
 * @route /api/document/allDocuments
 * @description fetches all the documents of a user.
 * @access Private
 */
documentRouter.get('/allDocuments', authMiddleware, documentController.getAllDocs);

/**
 * @route /api/document/:id
 * @description Fetches a particular document by id
 * @access private
 */

documentRouter.get('/:id', authMiddleware, documentController.fetchDocById);

/**
 * @route /api/document/update/:id
 * @description updates a document
 * @access private
 */
documentRouter.patch('/update/:id',validate(documentSchema), authMiddleware,canEditMiddleware,documentController.updateDoc)

/**
 * @route /api/document/delete/:id
 * @description deletes a document
 * @access private
 */
documentRouter.delete('/delete/:id', authMiddleware, documentController.deleteDoc);

/**
 * @route /api/document/:id/addCollaborator/:id
 * @description it adds a collaborator
 * @access private
 */
documentRouter.patch('/:id/addCollaborator', authMiddleware, validate(addCollabSchema),documentController.addCollaborator);

/**
 * @route /api/document/:id/removeCollaborator/:userId
 * @description it removes collaborator
 * @access Private
 */
documentRouter.patch('/:id/removeCollaborator/:userId', authMiddleware, documentController.removeCollaborator);

/**
 * @route /api/document/:id/revision
 * @description it fetches all the revisions
 * @access Private
 */
documentRouter.get('/:id/revisions', authMiddleware, documentController.fetchRevisions);

/**
 * @route /api/document/:id/restore
 * @description it restores the document to it's previous state.
 * @access Private
 */
documentRouter.patch('/:id/restore', authMiddleware, documentController.restoreRevisions);

/**
 * @route /api/document/:id/updateRole/:userId
 * @description updates role of collaborator
 * @access Private
 */
documentRouter.patch('/:id/updateRole/:userId', authMiddleware, documentController.updateRole);

export default documentRouter;