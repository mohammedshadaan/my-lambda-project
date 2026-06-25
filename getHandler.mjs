import { response } from '../../index.mjs';

// In-memory store (replace with DynamoDB/RDS in production)
const items = [
  { id: '1', name: 'Item One',   status: 'active',   createdAt: '2025-01-01' },
  { id: '2', name: 'Item Two',   status: 'inactive', createdAt: '2025-01-02' },
  { id: '3', name: 'Item Three', status: 'active',   createdAt: '2025-01-03' },
];

// GET /items — returns all items
export const getItems = async (event) => {
  const statusFilter = event.queryStringParameters?.status;

  const result = statusFilter
    ? items.filter(i => i.status === statusFilter)
    : items;

  return response(200, {
    success: true,
    count: result.length,
    items: result,
    environment: process.env.ENVIRONMENT || 'unknown',
  });
};

// GET /items/{id} — returns one item
export const getItemById = async (event, id) => {
  const item = items.find(i => i.id === id);

  if (!item) {
    return response(404, { success: false, error: `Item with id '${id}' not found` });
  }

  return response(200, { success: true, item });
};
