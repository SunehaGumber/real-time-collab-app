import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import * as documentController from '../controllers/document.controller.js'
const documentRouter = Router();

/**
 * @route /api/document/create
 * @description creates a document
 * @access Private
 */
documentRouter.post('/create', authMiddleware, documentController.createDocument);
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
documentRouter.patch('/update/:id', authMiddleware,
    documentController.updateDoc
)

/**
 * @route /api/document/delete/:id
 * @description deletes a document
 * @access private
 */
documentRouter.delete('/delete/:id', authMiddleware, documentController.deleteDoc);


export default documentRouter;