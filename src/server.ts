import { createApp } from './app';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';

const app = createApp({});

app.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
});