import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class DatabaseService {
  // Add a new jargon word to a workspace
  async addWord(workspaceId: string, word: string, price: number) {
    try {
      const newWord = await prisma.word.create({
        data: {
          word: word.toLowerCase(),
          price,
          workspaceId,
        },
      });
      return { success: true, word: newWord };
    } catch (error) {
      // Handle unique constraint violation
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return { success: false, error: 'This word already exists in your workspace' };
      }
      throw error;
    }
  }

  // Create a charge for using jargon
  async createCharge(workspaceId: string, userId: string, reporterId: string, word: string): Promise<
    | { success: true; charge: any; word: { word: string; price: number; id: string } }
    | { success: false; error: string }
  > {
    try {
      // Find the word and get its price
      const jargonWord = await prisma.word.findUnique({
        where: {
          workspaceId_word: {
            workspaceId,
            word: word.toLowerCase(),
          },
        },
      });

      if (!jargonWord) {
        return { success: false, error: 'Word not found in jargon list' };
      }

      // Create the charge in a transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create the charge
        const charge = await tx.charge.create({
          data: {
            workspaceId,
            userId,
            reporterId,
            wordId: jargonWord.id,
            amount: jargonWord.price,
          },
        });

        // Update the word usage count
        await tx.word.update({
          where: { id: jargonWord.id },
          data: { useCount: { increment: 1 } },
        });

        // Update the user's total
        await tx.user.update({
          where: { id: userId },
          data: { totalCharged: { increment: jargonWord.price } },
        });

        return {
          charge,
          word: {
            id: jargonWord.id,
            word: jargonWord.word,
            price: Number(jargonWord.price),
          },
        };
      });

      return {
        success: true,
        ...result,
      };
    } catch (error) {
      console.error('Error creating charge:', error);
      return { success: false, error: 'Failed to create charge' };
    }
  }

  // Get or create workspace by Slack Team ID
  async getOrCreateWorkspace(slackTeamId: string, name: string) {
    const workspace = await prisma.workspace.upsert({
      where: { slackTeamId },
      update: { name },
      create: {
        slackTeamId,
        name,
      },
    });
    return workspace;
  }

  // Get or create user
  async getOrCreateUser(workspaceId: string, slackUserId: string, name: string) {
    const user = await prisma.user.upsert({
      where: { slackUserId },
      update: { name },
      create: {
        slackUserId,
        name,
        workspaceId,
        totalCharged: 0,
      },
    });
    return user;
  }

  // Get user by Slack ID
  async getUser(slackUserId: string) {
    return prisma.user.findUnique({
      where: { slackUserId },
      include: {
        workspace: true,
        charges: {
          include: {
            word: true,
          },
        },
      },
    });
  }

  // Update user's total charges
  async updateUserTotal(userId: string, amount: number) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        totalCharged: {
          increment: amount,
        },
      },
    });
  }

  // Get user statistics
  async getUserStats(slackUserId: string) {
    const user = await prisma.user.findUnique({
      where: { slackUserId },
      include: {
        charges: {
          include: {
            word: true,
          },
        },
      },
    });

    if (!user) return null;

    // Group charges by word to get most used words
    const wordUsage = user.charges.reduce((acc, charge) => {
      const wordId = charge.wordId;
      if (!acc[wordId]) {
        acc[wordId] = {
          word: charge.word.word,
          count: 0,
          totalAmount: 0,
        };
      }
      acc[wordId].count++;
      acc[wordId].totalAmount += Number(charge.amount);
      return acc;
    }, {} as Record<string, { word: string; count: number; totalAmount: number }>);

    const mostUsedWords = Object.values(wordUsage)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalCharged: user.totalCharged,
      chargeCount: user.charges.length,
      mostUsedWords,
    };
  }

  // Check if a word exists in a workspace
  async wordExists(workspaceId: string, word: string) {
    const existingWord = await prisma.word.findUnique({
      where: {
        workspaceId_word: {
          workspaceId,
          word: word.toLowerCase(),
        },
      },
    });
    return !!existingWord;
  }

  // Get all words for a workspace
  async listWords(workspaceId: string) {
    const words = await prisma.word.findMany({
      where: { workspaceId },
      orderBy: [
        { useCount: 'desc' },
        { word: 'asc' }
      ]
    });
    return words;
  }
} 