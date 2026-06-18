import { required, isUrl, isInt, isArray, isArrayOf, optional, isJson } from './rules.js';

export const createProjectSchema = {
  title: [required],
  subtitle: [required],
  description: [required],
  githubURLFront: [isUrl],
  githubURLBack: [isUrl],
  deployURL: [isUrl],
  caseStudy: [isJson],
  isFrontend: [optional(required)],
  isBackend: [optional(required)],
  userId: [required, isInt],
  techIds: [optional(isArray), optional(isArrayOf(isInt))],
};

export const updateProjectSchema = {
  title: [optional(required)],
  subtitle: [optional(required)],
  description: [optional(required)],
  githubURLFront: [optional(isUrl)],
  githubURLBack: [optional(isUrl)],
  deployURL: [optional(isUrl)],
  caseStudy: [optional(isJson)],
  isFrontend: [optional(required)],
  isBackend: [optional(required)],
  techIds: [optional(isArray), optional(isArrayOf(isInt))],
};

