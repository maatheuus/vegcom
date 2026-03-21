import type { Metadata } from "next";
import { Suspense } from "react";

import PaymentSuccessView from "@/features/account/components/PaymentSuccessView";
import Layout from "@/shared/ui/Layout";

export const metadata: Metadata = {
  title: "Pagamento realizado com sucesso!",
  description: "Sua assinatura foi confirmada.",
};

export default function Page() {
  return (
    <Layout.Default>
      <Suspense
        fallback={
          <div className="font-lora col-span-full flex h-[60vh] items-center justify-center text-lg text-green-800">
            Carregando...
          </div>
        }
      >
        <PaymentSuccessView />
      </Suspense>
    </Layout.Default>
  );
}
