import { Router } from 'express';
import authRouter from './auth.routes.js';
import documentRouter from './document.routes.js';
const router = Router();

router.use('/auth', authRouter);
router.use('/document', documentRouter);

export default router;