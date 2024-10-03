import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  const { id } = params;
  const { pessoaNome, localNome } = await req.json();

  try {
    const pessoa = await prisma.pessoa.findFirst({
      where: { nome: pessoaNome },
    });

    if (!pessoa) {
      return NextResponse.json({ message: 'Pessoa não encontrada' }, { status: 404 });
    }

    const local = await prisma.locais.findFirst({
      where: { nome: localNome },
    });

    if (!local) {
      return NextResponse.json({ message: 'Local não encontrado' }, { status: 404 });
    }

    const updatedDoacao = await prisma.doacao.update({
      where: { id: parseInt(id) },
      data: {
        pessoa_id: pessoa.id,
        local_id: local.id,
      },
    });

    return NextResponse.json({ message: 'Doação atualizada com sucesso', updatedDoacao });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar a doação' }, { status: 500 });
  }
}