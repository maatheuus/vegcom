import Logo from "@/shared/ui/Logo";
import Text from "@/shared/ui/Text";
import Link from "next/link";

const footerLinks = {
  explorar: [
    { label: "Receitas", href: "/recipes" },
    { label: "Curiosidades", href: "/curiosities" },
    { label: "Comunidade", href: "/" },
  ],
  receitas: [
    { label: "Sobremesas", href: "/recipes?mealType=Sobremesas" },
    { label: "Rápidas (≤ 30min)", href: "/recipes?prepTime=Rápidas (≤ 30min)" },
    { label: "Mais populares", href: "/recipes?highlight=Mais populares" },
    { label: "Novidades", href: "/recipes?highlight=Novidades" },
  ],
  conta: [
    { label: "Meu Perfil", href: "/account" },
    { label: "Configurações", href: "/account/settings" },
    { label: "Minhas Receitas", href: "/account/recipes" },
    { label: "Favoritos", href: "/account/favorites" },
    { label: "Assinatura", href: "/account/subscription" },
  ],
};

export function Footer() {
  return (
    <footer className="padding__default relative mt-12 overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-green-600 py-10 text-white md:mt-16">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-white blur-3xl" />
      </div>

      <div className="body__container-lg--no-padding relative">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Logo size={32} />
              <span className="font-lora text-2xl font-bold md:text-xl">
                VegCom
              </span>
            </Link>
            <Text
              type={Text.Type.BodyThree}
              className="max-w-xs text-sm text-green-100"
            >
              Conectando apaixonados pela culinária. Descubra, compartilhe e
              cresça com a nossa comunidade.
            </Text>
          </div>

          <div>
            <h4 className="font-maitree mb-3 text-sm font-bold tracking-widest text-green-100 uppercase">
              Explorar
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.explorar.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-maitree mb-3 text-sm font-bold tracking-widest text-green-100 uppercase">
              Receitas
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.receitas.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-maitree mb-3 text-sm font-bold tracking-widest text-green-100 uppercase">
              Sua Conta
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.conta.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1 border-t border-white/10 pt-6 text-center">
          <Text
            type={Text.Type.BodyFour}
            className="font-lora text-sm text-green-100"
          >
            © {new Date().getFullYear()} VegCom.{" "}
            <Link
              href="https://maatmbx.dev"
              target="_blank"
              className="font-bold underline"
            >
              Todos os direitos reservados.
            </Link>{" "}
            Feito com 💚 para uma vida melhor.
          </Text>
          <Text
            type={Text.Type.BodyFive}
            className="font-maitree text-xs text-green-100/60"
          >
            Dedicado ao meu grande amigo, obrigado por tudo Rafa!
          </Text>
        </div>
      </div>
    </footer>
  );
}
