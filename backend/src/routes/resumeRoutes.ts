import { Router } from 'express';
import { generateResume } from '../controllers/resumeController';

const router = Router();

router.post('/generate-resume', generateResume);

export default router;
