import { z } from 'zod';

const envSchema = z.object({
  REACT_APP_API_URL: z.string(),
});

export default envSchema.parse(process.env);
