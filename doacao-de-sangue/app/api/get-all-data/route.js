import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const estados = await prisma.estado.findMany();
    const cidades = await prisma.cidade.findMany();
    const pessoas = await prisma.pessoa.findMany();
    const tipos = await prisma.tipo.findMany();
    const locais = await prisma.locais.findMany();
    const doacoes = await prisma.doacao.findMany({
      include: {
        pessoa: true,
        local: true,
      },
    });

    return new Response(
      JSON.stringify({
        estados,
        cidades,
        pessoas,
        tipos,
        locais,
        doacoes,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro ao buscar os dados' }),
      { status: 500 }
    );
  }
}