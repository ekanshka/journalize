import { Hono } from 'hono'
import { mainRouter } from './routes/mainRouter';
import { cors } from 'hono/cors'

const app = new Hono<
{ 
  Bindings: { 
    DATABASE_URL: string; 
    JWT_SECRET: string;
  }, 
  Variables: { 
    userId: string;
  } 
}>()

app.use('/*', cors())
app.route('/api/v1', mainRouter);

export default app
