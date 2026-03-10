"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";

export default function PaymentSuccessView() {
  return (
    <div className="col-span-full flex min-h-[70vh] w-full flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-12 flex items-center justify-center">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border border-green-500/20 bg-green-500/5"
            initial={{ width: "100%", height: "100%", opacity: 0 }}
            animate={{
              width: ["100%", "250%"],
              height: ["100%", "250%"],
              opacity: [0.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              delay: index * 0.4,
              ease: "easeOut",
            }}
            style={{ width: 80, height: 80 }}
          />
        ))}

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
          className="relative z-10 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-xl shadow-green-500/30"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <CheckIcon weight="bold" className="size-12 text-white" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-2xl space-y-6"
      >
        <div className="space-y-4">
          <Text
            as="h1"
            className="font-lora text-4xl font-bold text-green-900 md:text-5xl"
          >
            Pagamento Realizado!
          </Text>
          <Text
            as="p"
            className="mx-auto max-w-lg text-lg font-medium text-green-200/80 md:text-xl"
          >
            Sua assinatura foi confirmada com sucesso. Agora você faz parte da
            nossa comunidade premium com acesso ilimitado.
          </Text>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 flex w-full max-w-md flex-col gap-4 sm:flex-row"
      >
        <Button.Animated
          text="Explorar Receitas"
          href="/recipes"
          variation="dark"
          className="border! border-green-200 py-2!"
        />

        <Button.Animated
          text="Minha Conta"
          href="/account"
          variation="light"
          className="border! border-green-200 py-2!"
        />
      </motion.div>
    </div>
  );
}
