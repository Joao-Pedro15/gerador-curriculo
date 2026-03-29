import { Router } from 'express';
import { analyzeATS } from '../controllers/atsController';
import { analyzeATSWithAI } from '../controllers/atsAIController';
import { optimizeResume } from '../controllers/optimizeResumeController';

const router = Router();

router.post('/analyze-ats', analyzeATS);
router.post('/analyze-ats-ai', analyzeATSWithAI);
router.post('/optimize-resume', optimizeResume);

export default router;
