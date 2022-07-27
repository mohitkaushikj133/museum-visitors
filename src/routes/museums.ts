import express from 'express';
import { Controller } from '../controllers/museums';

const router = express.Router();

const controller: Controller = new Controller();
router.get('/api/visitors', controller.getVisitorsData);

export = router;