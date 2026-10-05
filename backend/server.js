const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// 1. Config & Database
dotenv.config();
connectDB();

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Serve Frontend Static Files & Uploads
app.use(express.static(path.join(__dirname, '..')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. API Routes
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.get('/api/stats', (req, res) => require('./controllers/notificationController').getStats(req, res));
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Server is running' }));

// Teammates' Routes:
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/application', require('./routes/applicationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// 5. Root page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));

// 6. Error Handlers
app.use(notFound);
app.use(errorHandler);

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
