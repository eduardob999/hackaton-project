import prisma from '../lib/prisma'

async function CreateUser(name: string, email: string) {
  const response = await Promise.all([
    prisma.users.upsert({
      where: { email: email },
      update: {},
      create: {
        name: name,
        email: email,
        image:
          'https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg',
      },
    }),
  ])
  console.log(response)
}
 
export default CreateUser;