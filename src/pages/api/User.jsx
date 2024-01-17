import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method === "GET") {
    async function getAllUsers() {
      try {
        const users = await prisma.user.findMany();
        return users;
      } catch (error) {
        throw new Error(
          `Erreur lors de la récupération des utilisateurs : ${error.message}`
        );
      } finally {
        await prisma.$disconnect();
      }
    }
    getAllUsers()
      .then((users) => {
        res.status(200).json({ message: "User récupéré avec succès", body:users });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
