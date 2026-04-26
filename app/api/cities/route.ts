import { NextRequest, NextResponse } from "next/server";

interface IbgeMunicipality {
  "municipio-id": number;
  "municipio-nome": string;
  "UF-sigla": string;
  "UF-nome": string;
}

async function fetchAllMunicipalities(): Promise<IbgeMunicipality[]> {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado&orderBy=nome",
    { next: { revalidate: 86400 } },
  );

  if (!response.ok) return [];

  return response.json();
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const municipalities = await fetchAllMunicipalities();

  const results = municipalities
    .filter((m) =>
      m["municipio-nome"].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(
        query.normalize("NFD").replace(/[̀-ͯ]/g, ""),
      ),
    )
    .slice(0, 20)
    .map((m) => ({
      id: m["municipio-id"],
      nome: m["municipio-nome"],
      estado: m["UF-nome"],
      sigla: m["UF-sigla"],
    }));

  return NextResponse.json(results);
}
