import { Router } from 'express';
import apiRoutes from './API/index.js';

const router = Router();

router.use('/api', apiRoutes);

export default router;