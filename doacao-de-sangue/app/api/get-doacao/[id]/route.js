import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const doacao = await prisma.doacao.findUnique({
      where: { id: parseInt(id) },
      include: {
        pessoa: true,
        local: true,
      },
    });

    if (!doacao) {
      return NextResponse.json({ message: 'Doação não encontrada' }, { status: 404 });
    }

    return NextResponse.json(doacao);
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao buscar a doação' }, { status: 500 });
  }
}