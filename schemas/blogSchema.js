const { z } = require('zod');

const blogSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title must not exceed 100 characters' }),
  body: z
    .string()
    .min(10, { message: 'Body must be at least 10 characters long' })
    .max(5000, { message: 'Body must not exceed 5000 characters' }),
  thumbnail: z.string().url({ message: 'Thumbnail must be a valid URL' }),
});

module.exports = { blogSchema };
