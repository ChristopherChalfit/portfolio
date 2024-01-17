import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
export default async function contactAPI(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Session requise" });
    }
    try {
      if (session.user.role === "admin") {
        const contacts = await prisma.contact.findMany({
          orderBy: {
            date: "asc",
          },
        });
        res.status(200).json({
          status: 200,
          success: true,
          message: "contacts récupérés avec succès",
          body: contacts,
        });
        console.log(contacts);
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
    if (messageType === "AddContact") {
      const { name, email, tel, subject, message } = req.body;
      try {
        await prisma.contact.create({
          data: {
            name: name,
            email: email,
            telephone: tel,
            subject: subject,
            message: message,
          },
        });
        console.log("message sent");
        return res.status(200).json({ message: "success" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "erreur dans l'envoi de l'email" });
      } finally {
        await prisma.$disconnect();
      }
    } else if (messageType === "EditContact") {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(401).json({ error: "Session requise" });
      }
      try {
        if (session.user.role === "admin") {
          const { id, isRead } = req.body;
          await prisma.contact.update({
            where: { id: id },
            data: { isRead },
          });
          const updatedContact = await prisma.contact.findMany();
          res.status(200).json({
            status: 200,
            success: true,
            message: "Contact ajouté avec succès",
            body: updatedContact,
          });
        } else {
          return res.status(401).json({ error: "Role Admin requis" });
        }
      } finally {
        await prisma.$disconnect();
      }
    }
  } else if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Session requise" });
    }
    try {
      if (session.user.role === "admin") {
        const { id } = req.body;
        const contacts = await prisma.contact.delete({
          where: {
            id,
          },
        });
        res.status(200).json({
          status: 200,
          success: true,
          message: "contacts supprimer avec succès",
        });
        console.log(contacts);
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
  }
}
