"use client";

import "@/assets/css/onboarding.css";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

const TOUR_KEY = "vegcom_onboarding_done";

function isVisible(element: HTMLElement | null) {
  if (!element) return false;

  const { width, height } = element.getBoundingClientRect();
  return (
    width > 0 &&
    height > 0 &&
    window.getComputedStyle(element).display !== "none"
  );
}

function isMobile() {
  const trigger = document.getElementById("mobile-menu-trigger");
  return isVisible(trigger);
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

        if (mobile && currentIndex === 3) {
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
        "A VegCom é uma comunidade para quem vive ou quer explorar o universo vegano e vegetariano. Aqui você compartilha receitas, publica experiências, descobre curiosidades e conta com uma IA pensada para esse estilo de vida.",
    },
  },
  {
    element: "#community-map-tab",
    popover: {
      title: "Novo: mapa vegano 🗺️",
      description:
        "Encontre lugares e eventos para viver o veganismo pelo Brasil. Toque no ícone do mapa quando quiser explorar.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
  {
    popover: {
      title: "Faça uma publicação ✍️",
      description:
        "Compartilhe posts com a comunidade! Depois de fazer login, toque no botão verde (+) no canto inferior direito para criar sua primeira publicação.",
    },
  },
  {
    element: "#mobile-menu-trigger",
    popover: {
      title: "Menu de navegação",
      description:
        "Toque aqui para abrir o menu e acessar todas as áreas da VegCom. Clique em Próximo para continuar.",
      side: "bottom" as const,
      align: "end" as const,
    },
  },
  {
    element: "#mobile-nav-link-recipes",
    popover: {
      title: "Receitas 🍽️",
      description:
        "Explore receitas veganas e vegetarianas compartilhadas pela comunidade. Encontre opções por ingrediente, categoria ou tempo de preparo.",
      side: "bottom" as const,
      align: "start" as const,
    },
  },
  {
    element: "#mobile-nav-link-newrecipe",
    popover: {
      title: "Nova receita 👨‍🍳",
      description:
        "Tem uma receita especial? Compartilhe com a comunidade adicionando ingredientes, modo de preparo e fotos.",
      side: "bottom" as const,
      align: "start" as const,
    },
  },
  {
    element: "#mobile-nav-link-chat",
    popover: {
      title: "IA vegana e vegetariana 🤖",
      description:
        "Receba ajuda de uma IA focada em veganismo e vegetarianismo. Tire dúvidas, peça sugestões de receitas e tenha respostas mais alinhadas com a sua alimentação, sem precisar se esforçar muito.",
      side: "bottom" as const,
      align: "start" as const,
    },
  },
  {
    element: "#mobile-nav-link-curiosities",
    popover: {
      title: "Curiosidades 💡",
      description:
        "Descubra conteúdos sobre veganismo, vegetarianismo, sustentabilidade e alimentação consciente.",
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
        "A VegCom é uma comunidade para quem vive ou quer explorar o universo vegano e vegetariano. Aqui você compartilha receitas, publica experiências, descobre curiosidades e conta com uma IA pensada para esse estilo de vida.",
    },
  },
  {
    element: "#community-nav-link-explore",
    popover: {
      title: "Novo: mapa vegano 🗺️",
      description:
        "Encontre lugares e eventos para viver o veganismo pelo Brasil. Clique aqui para começar a explorar.",
      side: "right" as const,
      align: "center" as const,
    },
  },
  {
    element: "#post-composer",
    popover: {
      title: "Faça uma publicação",
      description:
        "Aqui você cria e compartilha posts com a comunidade. Divida experiências, dúvidas, descobertas e dicas sobre o mundo vegano e vegetariano.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
  {
    element: "#nav-link-recipes",
    popover: {
      title: "Receitas 🍽️",
      description:
        "Explore receitas veganas e vegetarianas compartilhadas pela comunidade. Encontre opções por ingrediente, categoria ou tempo de preparo.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
  {
    element: "#nav-link-newrecipe",
    popover: {
      title: "Nova receita 👨‍🍳",
      description:
        "Tem uma receita especial? Compartilhe com a comunidade adicionando ingredientes, modo de preparo e fotos.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
  {
    element: "#nav-link-chat",
    popover: {
      title: "IA vegana e vegetariana 🤖",
      description:
        "Receba ajuda de uma IA focada em veganismo e vegetarianismo. Tire dúvidas, peça sugestões de receitas e tenha respostas mais alinhadas com a sua alimentação, sem precisar se esforçar muito.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
  {
    element: "#nav-link-curiosities",
    popover: {
      title: "Curiosidades 💡",
      description:
        "Descubra conteúdos sobre veganismo, vegetarianismo, sustentabilidade e alimentação consciente.",
      side: "bottom" as const,
      align: "center" as const,
    },
  },
];
