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