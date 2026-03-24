import { Router } from 'express';
import { analyzeATS } from '../controllers/atsController';

const router = Router();

router.post('/analyze-ats', analyzeATS);

export default router;
