import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const res = await request.json()
  const users = await prisma.users.findMany()
  let found = false
  console.log(res)

  users.map((user) => {
    if (user.email == res.email) {
      found = true
    }
  });

  if (found) {
    return new Response(res.toString(), {
      status: 200,
    })
  } else {
    console.log("User not Found")
    return new Response(res.toString(), {
      status: 405,
    })
  }
}