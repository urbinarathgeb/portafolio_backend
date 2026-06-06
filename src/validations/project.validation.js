import { required, isUrl, isInt, optional } from './rules.js';

export const createProjectSchema = {
	title: [required],
	subtitle: [required],
	description: [required],
	githubURL: [isUrl],
	deployURL: [isUrl],
	userId: [required, isInt],
};

export const updateProjectSchema = {
	title: [optional(required)],
	subtitle: [optional(required)],
	description: [optional(required)],
	githubURL: [optional(isUrl)],
	deployURL: [optional(isUrl)],
};

export const idParamSchema = {
	id: [required, isInt],
};