export const success = (res, { message, data, code = null, status = 200, pagination = null }) => {
  const body = { status: 'success', message, ...(code && { code }), data };
  if (pagination) body.pagination = pagination;
  return res.status(status).json(body);
};

