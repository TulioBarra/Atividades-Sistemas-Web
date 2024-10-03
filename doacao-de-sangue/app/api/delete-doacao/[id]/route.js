import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.doacao.delete({
      where: { id: parseInt(id) },
    });
    return new Response('Doação excluída com sucesso', { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir doação:', error);
    return new Response('Erro ao excluir doação', { status: 500 });
  }
}