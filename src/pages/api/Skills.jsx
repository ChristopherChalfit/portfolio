// pages/api/upload.js
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
const prisma = new PrismaClient();
const apiRoute = async (req, res) => {
  if (req.method === "GET") {
    try {
      const skills = await prisma.skills.findMany({
        orderBy: {
          date: 'asc',
        },
      });
      res.status(200).json({
        status: 200,
        success: true,
        message: "Skills récupérés avec succès",
        body: skills,
      });
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des skills : ${error.message}`
      );
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des skills" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Session requise" });
    }
    try {
      if (session.user.role === "admin") {
        const { id } = req.body;
        const skills = await prisma.skills.delete({
          where: {
            id,
          },
        });
        res.status(200).json({
          status: 200,
          success: true,
          message: "Skills supprimer avec succès",
        });
      }
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des projects : ${error.message}`
      );
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des contacts" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "POST") {
    const messageType = req.headers["x-message-type"]; // Utilisez le bon nom d'en-tête

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Session requise" });
    }
    try {
      if (session.user.role === "admin") {
        console.log(req.message);
        if (messageType === "AddSkills") {
          const { name, image } = req.body;
          console.log("Name : " + name + " Image " + image);
          await prisma.$transaction(async (prisma) => {
            await prisma.skills.create({
              data: {
                name,
                icon: image,
              },
            });
          });

          const updatedSkills = await prisma.skills.findMany();
          res.status(200).json({
            status: 200,
            success: true,
            message: "Skills ajouté avec succès",
            body: updatedSkills,
          });
        } else if (messageType === "UpdateActif") {
          const { name, isActif } = req.body;
          console.log(name + " " + isActif);
          await prisma.skills.update({
            where: { name: name },
            data: { isActif },
          });
          const updatedSkills = await prisma.skills.findMany();
          res.status(200).json({
            status: 200,
            success: true,
            message: "Skills ajouté avec succès",
            body: updatedSkills,
          });
        }
      } else {
        return res.status(401).json({ error: "Role Admin requis" });
      }
    } finally {
      await prisma.$disconnect();
    }
  }
};

export default apiRoute;
