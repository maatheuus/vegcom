"use client";

import "@/assets/css/onboarding.css";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

const TOUR_KEY = "vegcom_onboarding_done";

function isMobile() {
  return window.innerWidth < 1024;
}

async function openMobileMenuIfNeeded() {
  const trigger = document.getElementById("mobile-menu-trigger");
  if (!trigger) return;

  const alreadyOpen = !!document.getElementById("mobile-nav-link-recipes");
  if (alreadyOpen) return;

  trigger.click();
  await new Promise((resolve) => setTimeout(resolve, 350));
}

export default function OnboardingTour() {
  useEffect(() => {
    const hasSeenTour = localStorage.getItem(TOUR_KEY);

    if (hasSeenTour) return;

    const mobile = isMobile();

    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      overlayOpacity: 0.6,
      nextBtnText: "Próximo",
      prevBtnText: "Anterior",
      doneBtnText: "Começar!",
      progressText: "{{current}} de {{total}}",
      steps: mobile ? mobileSteps : desktopSteps,
      onDestroyStarted: () => {
        localStorage.setItem(TOUR_KEY, "true");
        driverObj.destroy();
      },
      onNextClick: async (_el, _step, { driver: d }) => {
        const currentIndex = d.getActiveIndex() ?? -1;

        if (mobile && currentIndex === 2) {
          await openMobileMenuIfNeeded();
        }

        d.moveNext();
      },
    });

    const timer = setTimeout(() => {
      driverObj.drive();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

const mobileSteps = [
  {
    popover: {
      title: "Bem-vindo a VegCom 🌱",
      description:
        "A VegCom é uma comunidade vegana onde você pode compartilhar receitas, publicações, descobrir curiosidades e conversar com nossa IA. Vamos te mostrar tudo!",
    },
  },
  {
    popover: {
      title: "Faça uma publicação ✍️",
      description:
        "Compartilhe posts com a comunidade! Após fazer login, toque no botão verde (+) no canto inferior direito para criar sua primeira publicação.",
    },
  },
  {
    element: "#mobile-menu-trigger",
    popover: {
      title: "Menu de navegação",
      description:
        "Toque aqui para abrir o menu e acessar todas as seções do VegCom. Clique em Próximo para continuar.",
      side: "bottom" as const,
      align: "end" as const,
    },
  },
  {
    element: "#mobile-nav-link-recipes",
    popover: {
      title: "Receitas 🍽️",
      description:
        "Explore centenas de receitas veganas criadas pela comunidade. Filtre por ingrediente, categoria ou tempo de preparo.",
      side: "bottom" as const,
      align: "start" as const,
    },
  },
  {
    element: "#mobile-nav-link-newrecipe",
    popover: {
      title: "Nova receita 👨‍🍳",
      description:
        "Tem uma receita incrível? Compartilhe com a comunidade! Adicione ingredientes, modo de preparo e fotos.",
      side: "bottom" as const,
      align: "start" as const,
    },
  },
  {
    element: "#mobile-nav-link-chat",
    popover: {
      title: "Chat com IA 🤖",
      description:
        "Converse com nosso assistente! Tire dúvidas sobre veganismo, vegetarianismo, peça sugestões de receitas ou dicas de nutrição.",
      side: "bottom" as const,
      align: "start" as const,
    },
  },
  {
    element: "#mobile-nav-link-curiosities",
    popover: {
      title: "Curiosidades 💡",
      description:
        "Aprenda fatos interessantes sobre veganismo, sustentabilidade e alimentação saudável. Novo conteúdo toda semana!",
      side: "bottom" as const,
      align: "start" as const,
    },
  },
];

const desktopSteps = [
  {
    popover: {
      title: "Bem-vindo a VegCom 🌱",
      description:
        "A VegCom é uma comunidade vegana onde você pode compartilhar receitas, publicações, descobrir curiosidades e conversar com nossa IA. Vamos te mostrar tudo!",
    },
  },
  {
    element: "#post-composer",
    popover: {
      title: "Faça uma publicação",
      description:
        "Aqui você cria e compartilha posts com a comunidade. Escreva suas experiências, dúvidas ou descobertas sobre o mundo vegano e vegetariano.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
  {
    element: "#nav-link-recipes",
    popover: {
      title: "Receitas 🍽️",
      description:
        "Explore centenas de receitas veganas criadas pela comunidade. Filtre por ingrediente, categoria ou tempo de preparo.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
  {
    element: "#nav-link-newrecipe",
    popover: {
      title: "Nova receita 👨‍🍳",
      description:
        "Tem uma receita incrível? Compartilhe com a comunidade! Adicione ingredientes, modo de preparo e fotos.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
  {
    element: "#nav-link-chat",
    popover: {
      title: "Chat com IA 🤖",
      description:
        "Converse com nosso assistente! Tire dúvidas sobre veganismo, vegetarianismo, peça sugestões de receitas ou dicas de nutrição.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
  {
    element: "#nav-link-curiosities",
    popover: {
      title: "Curiosidades 💡",
      description:
        "Aprenda fatos interessantes sobre veganismo, sustentabilidade e alimentação saudável. Novo conteúdo toda semana!",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
];
