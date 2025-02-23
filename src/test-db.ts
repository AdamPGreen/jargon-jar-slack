import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Test connection
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Test workspace creation
    const workspace = await prisma.workspace.create({
      data: {
        name: 'Test Workspace',
        slackTeamId: 'TEST123'
      }
    });
    console.log('✅ Test workspace created:', workspace);

    // Test workspace retrieval
    const retrieved = await prisma.workspace.findUnique({
      where: { id: workspace.id }
    });
    console.log('✅ Test workspace retrieved:', retrieved);

    // Clean up
    await prisma.workspace.delete({
      where: { id: workspace.id }
    });
    console.log('✅ Test workspace deleted');

  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 