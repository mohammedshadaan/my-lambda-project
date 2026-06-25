import { handler } from './index.mjs';

const run = async () => {
  console.log('\n=== GET /items ===');
  const r1 = await handler({ httpMethod: 'GET', path: '/items', queryStringParameters: null });
  console.log(r1.statusCode, JSON.parse(r1.body));

  console.log('\n=== GET /items?status=active ===');
  const r2 = await handler({ httpMethod: 'GET', path: '/items', queryStringParameters: { status: 'active' } });
  console.log(r2.statusCode, JSON.parse(r2.body));

  console.log('\n=== GET /items/2 ===');
  const r3 = await handler({ httpMethod: 'GET', path: '/items/2', queryStringParameters: null });
  console.log(r3.statusCode, JSON.parse(r3.body));

  console.log('\n=== GET /items/99 (not found) ===');
  const r4 = await handler({ httpMethod: 'GET', path: '/items/99', queryStringParameters: null });
  console.log(r4.statusCode, JSON.parse(r4.body));

  console.log('\n=== POST /items ===');
  const r5 = await handler({ httpMethod: 'POST', path: '/items', body: JSON.stringify({ name: 'New Item', status: 'active' }) });
  console.log(r5.statusCode, JSON.parse(r5.body));

  console.log('\n=== POST /items (missing name) ===');
  const r6 = await handler({ httpMethod: 'POST', path: '/items', body: JSON.stringify({ status: 'active' }) });
  console.log(r6.statusCode, JSON.parse(r6.body));

  console.log('\n=== Unknown route ===');
  const r7 = await handler({ httpMethod: 'DELETE', path: '/items/1', queryStringParameters: null });
  console.log(r7.statusCode, JSON.parse(r7.body));
};

run();
