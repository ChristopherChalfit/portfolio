import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
const apiRoute = async (req, res) => {
  if (req.method === "GET") {
    try {
      const projects = await prisma.projects.findMany({
        include: {
          tags: true,
        },
        orderBy: {
          date: "asc",
        },
      });
      res.status(200).json({
        status: 200,
        success: true,
        message: "projects récupérés avec succès",
        body: projects,
      });
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des projects : ${error.message}`
      );
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des projects" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Session requise" });
    }
    try {
      if (session.user.role === "admin") {
        const {
          fieldName,
          fieldClient,
          fieldPresentation,
          fieldDescription,
          fieldLinkGit,
          fieldLinkPrev,
          fieldTags,
          image,
        } = JSON.parse(req.body);
        await prisma.projects.create({
          data: {
            name: fieldName,
            client: fieldClient,
            presentation: fieldPresentation,
            description: fieldDescription,
            linkgithub: fieldLinkGit,
            linkpreview: fieldLinkPrev,
            image: image,
            tags: {
              connectOrCreate: JSON.parse(fieldTags).map((tagName) => ({
                where: { name: tagName },
                create: { name: tagName },
              })),
            },
          },
        });
        const projects = await prisma.projects.findMany({
          include: {
            tags: true,
          },
          orderBy: {
            date: "asc",
          },
        });
        res.status(200).json({
          status: 200,
          success: true,
          message: "projects récupérés avec succès",
          body: projects,
        });
      }
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Session requise" });
    }
    try {
      if (session.user.role === "admin") {
        const {
          id,
          name,
          client,
          presentation,
          description,
          linkgithub,
          linkpreview,
          tags,
        } = JSON.parse(req.body);
        await prisma.projects.update({
          where: { id: id },
          data: {
            name,
            client,
            presentation,
            description,
            linkgithub,
            linkpreview,
            tags: {
              connectOrCreate: JSON.parse(tags).map((tagName) => ({
                where: { name: tagName },
                create: { name: tagName },
              })),
            },
          },
        });
        const updatedProject = await prisma.projects.findMany({
          include: {
            tags: true,
          },
          orderBy: {
            date: "asc",
          },
        });
        res.status(200).json({
          status: 200,
          success: true,
          message: "Projet modifié avec succès",
          body: updatedProject,
        });
      }
    } finally {
      await prisma.$disconnect();
    }
  }
};

export default apiRoute;
