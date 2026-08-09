import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-green-900">
      <Link
        href="/"
        className="text-sm font-medium text-green-700 underline underline-offset-4"
      >
        Voltar para a VegCom
      </Link>
      <h1 className="font-lora mt-8 text-3xl font-bold">
        Privacidade nos relatos de lugares
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-green-800">
        <section>
          <h2 className="text-lg font-semibold">Prevenção a fraude</h2>
          <p>
            Ao visitar o mapa, a VegCom cria o cookie necessário{" "}
            <code>vg_rk</code>
            para limitar relatos abusivos e identificar comportamentos
            suspeitos. O cookie contém um identificador aleatório assinado; o
            identificador bruto não é armazenado nos relatos.
          </p>
          <p className="mt-2">
            Tratamos esse identificador e um hash criptográfico do endereço IP
            com a finalidade de segurança e prevenção a fraude, com base no
            legítimo interesse da VegCom. Não usamos esses dados para
            publicidade ou para criar um perfil público.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Prazos de retenção</h2>
          <p>
            O hash de IP é apagado após 90 dias. O cookie expira após um ano. A
            descrição do relato permanece apenas para moderação do diretório.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">
            Localização e acompanhamento
          </h2>
          <p>
            Quando a localização do navegador já está disponível no mapa, ela é
            usada somente para calcular uma faixa de proximidade e não é
            armazenada. O email de acompanhamento é opcional, exige
            consentimento e é apagado 30 dias após o envio da atualização. Quem
            usa uma conta VegCom recebe a atualização pelas notificações do
            serviço, sem informar o email novamente.
          </p>
        </section>
      </div>
    </main>
  );
}
