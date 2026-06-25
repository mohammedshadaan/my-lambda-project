import { response } from '../../index.mjs';

// POST /items — creates a new item
export const createItem = async (event) => {
  // Parse body safely
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return response(400, { success: false, error: 'Invalid JSON body' });
  }

  // Validate required fields
  const { name, status } = body;
  if (!name) {
    return response(400, { success: false, error: 'Field "name" is required' });
  }

  const validStatuses = ['active', 'inactive'];
  if (status && !validStatuses.includes(status)) {
    return response(400, {
      success: false,
      error: `"status" must be one of: ${validStatuses.join(', ')}`,
    });
  }

  // Build new item
  const newItem = {
    id: Date.now().toString(),
    name,
    status: status || 'active',
    createdAt: new Date().toISOString(),
    environment: process.env.ENVIRONMENT || 'unknown',
  };

  console.log("Created item:", JSON.stringify(newItem));

  return response(201, { success: true, message: 'Item created', item: newItem });
};
