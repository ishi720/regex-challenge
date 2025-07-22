import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userChallenges from './routes/challenges.js';
import userResults from './routes/results.js';
import setupSwagger from './swagger.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/api/challenges', userChallenges);
app.use('/api/results', userResults);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});