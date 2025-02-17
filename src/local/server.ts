import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import routes from '@/api/routes/categories';
import { apiLimiter } from '@/scripts/middleware/rateLimit';
import { requestLogger } from '@/scripts/middleware/logger';
import { errorHandler } from '@/scripts/middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging
app.use(requestLogger);

// Rate limiting
app.use(apiLimiter);

// Routes
app.use('/categories', routes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.path}`
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Available endpoints:');
    console.log('POST   /categories');
    console.log('GET    /categories/:importId/status');
    console.log('DELETE /categories/:categoryId');
});