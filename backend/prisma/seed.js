const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      full_name: "just alice",
      username: "alice123",
      email: "alice@prisma.io",
      password: "Alicealice",
      avatar:
        "https://res.cloudinary.com/dtwpfnenl/image/upload/v1707741239/2b8fc431267c674892e92ed596d17161_hxt3qk.jpg",
      bio: "alice in borderland",
      post: {
        create: {
          image:
            "https://res.cloudinary.com/dtwpfnenl/image/upload/v1707642182/e917b1420a0099c5bab28a9ff7b28e77_dh13pu.jpg",
          caption: "my mood",
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      full_name: "just bob",
      username: "bob123",
      email: "bob@prisma.io",
      password: "Bobbob",
      avatar:
        "https://res.cloudinary.com/dtwpfnenl/image/upload/v1707741239/2b8fc431267c674892e92ed596d17161_hxt3qk.jpg",
      bio: "bobbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      post: {
        create: [
          {
            image:
              "https://res.cloudinary.com/dtwpfnenl/image/upload/v1707642497/f15cbe3ddef819bbfd42d878e4678321_v3javc.jpg",
            caption: "keybaord and guitar",
          },
          {
            image:
              "https://res.cloudinary.com/dtwpfnenl/image/upload/v1707642182/30f1e7ef9f78c8274984fedc9744cea3_utj5vz.jpg",
            caption: "guitar",
          },
        ],
      },
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
