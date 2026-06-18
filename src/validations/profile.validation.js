import { required, isEmail, isUrl, optional } from './rules.js';

export const updateProfileSchema = {
  name: [optional(required)],
  lastname: [optional(required)],
  email: [optional(isEmail)],
  title: [optional(required)],
  tagline: [optional(required)],
  heroDescription: [optional(required)],
  bio: [optional(required)],
  availability: [optional(required)],
  location: [optional(required)],
  avatar: [optional(isUrl)],
};
