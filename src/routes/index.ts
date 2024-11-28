import { Router } from 'express';
import authRoutes from './userAuth.route';

const router = Router();

// Combine all route modules
router.use('/auth', authRoutes); // Routes for authentication
// router.use('/users', userRoutes); // Routes for user-related operations
// router.use('/products', productRoutes); // Routes for products

export default router;
