import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    // Converter id para número inteiro
    const idInt = parseInt(id, 10);

    // Verificar se a conversão foi bem-sucedida
    if (isNaN(idInt)) {
      return new Response('ID inválido', { status: 400 });
    }

    // Excluir a doação
    await prisma.doacao.delete({
      where: { id: idInt },
    });

    return new Response('Doação excluída com sucesso', { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir doação:', error);
    return new Response('Erro ao excluir doação', { status: 500 });
  }
}