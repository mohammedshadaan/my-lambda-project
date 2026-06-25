import { getItems, getItemById } from './src/handlers/getHandler.mjs';
import { createItem } from './src/handlers/postHandler.mjs';

export const handler = async (event) => {
  console.log("Request:", JSON.stringify({ method: event.httpMethod, path: event.path }));

  const method = event.httpMethod;
  const path = event.path;

  try {
    // GET /items
    if (method === 'GET' && path === '/items') {
      return await getItems(event);
    }

    // GET /items/{id}
    if (method === 'GET' && path.startsWith('/items/')) {
      const id = path.split('/items/')[1];
      return await getItemById(event, id);
    }

    // POST /items
    if (method === 'POST' && path === '/items') {
      return await createItem(event);
    }

    // 404 for anything else
    return response(404, { error: 'Route not found', path, method });

  } catch (err) {
    console.error("Unhandled error:", err);
    return response(500, { error: 'Internal server error', message: err.message });
  }
};

export const response = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(body),
});
