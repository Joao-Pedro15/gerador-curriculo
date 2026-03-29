import { Router } from 'express';
import { analyzeATS } from '../controllers/atsController';
import { analyzeATSWithAI } from '../controllers/atsAIController';
import { optimizeResume } from '../controllers/optimizeResumeController';
import { generateIdealResume } from '../controllers/idealResumeController';

const router = Router();

router.post('/analyze-ats', analyzeATS);
router.post('/analyze-ats-ai', analyzeATSWithAI);
router.post('/optimize-resume', optimizeResume);
router.post('/ideal-resume', generateIdealResume);

export default router;
