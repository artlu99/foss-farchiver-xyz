export const allowCorsResponse = () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

const allowCorsHeaders = () => {
  return { headers: { 'Access-Control-Allow-Origin': '*' } }
}

export const newResponse = (res: string) =>
  new Response(res, allowCorsHeaders())
