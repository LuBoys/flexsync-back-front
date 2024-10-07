import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRoles() {
  try {
    // Liste des rôles à insérer
    const roles = ['client', 'coach'];

    // Boucle sur chaque rôle pour vérifier s'il existe, sinon l'ajouter
    for (const roleName of roles) {
      const existingRole = await prisma.role.findUnique({
        where: { role_name: roleName },
      });

      if (!existingRole) {
        // Si le rôle n'existe pas, on l'ajoute
        await prisma.role.create({
          data: { role_name: roleName },
        });
        console.log(`Rôle '${roleName}' créé avec succès`);
      } else {
        console.log(`Rôle '${roleName}' existe déjà`);
      }
    }
  } catch (error) {
    console.error('Erreur lors de la création des rôles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la fonction
seedRoles();
