'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/answer-is-question.ts';
import '@/ai/flows/summarize-is-topic.ts';
import '@/ai/flows/create-quiz.ts';
