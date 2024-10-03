import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ajuste o caminho conforme necessário

export async function POST(req) {
  try {
    const { pessoaNome, localNome } = await req.json();

    if (!pessoaNome || !localNome) {
      return NextResponse.json(
        { message: 'Nome da pessoa e nome do local são obrigatórios' },
        { status: 400 }
      );
    }

    // Busque o ID da pessoa pelo nome
    const pessoa = await prisma.pessoa.findFirst({
      where: { nome: pessoaNome },
    });

    if (!pessoa) {
      return NextResponse.json({ message: 'Pessoa não encontrada' }, { status: 404 });
    }

    // Busque o ID do local pelo nome
    const local = await prisma.locais.findFirst({
      where: { nome: localNome },
    });

    if (!local) {
      return NextResponse.json({ message: 'Local não encontrado' }, { status: 404 });
    }

    // Crie a doação
    const doacao = await prisma.doacao.create({
      data: {
        pessoa_id: pessoa.id,
        local_id: local.id,
        data: new Date(),
      },
    });

    return NextResponse.json({ message: 'Doação criada com sucesso', doacao }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar a doação:', error);
    return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
  }
}