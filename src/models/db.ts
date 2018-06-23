import monk from 'monk';

export const db = monk(process.env.MONGODB_URI as string);
