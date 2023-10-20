// Import any necessary dependencies
import CreateUser from '@/prisma/createUser';

export async function POST(request: Request) {
  const res = await request.json()

  console.log(res)

  CreateUser(res.name, res.email)

  return new Response(res.toString(), {
    status: 200,
  })
}