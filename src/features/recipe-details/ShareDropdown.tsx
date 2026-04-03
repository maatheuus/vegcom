"use client";

import { toast } from "@/shared/hooks/use-toast";
import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { CopyIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

interface Props extends ComponentProps<"div"> {
  title: string;
  recipeSlug?: string;
}

const ShareDropdown = memo(function ShareDropdown({
  className,
  title,
  recipeSlug,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && recipeSlug) {
      setShareUrl(`${window.location.origin}/recipes/${recipeSlug}`);
    }
  }, [recipeSlug]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(
      `Confira essa delícia: ${title}\n\n${shareUrl}`,
    );
    toast({
      title: "Sucesso",
      description: "Link copiado para a área de transferência!",
      variant: "success",
    });
    setIsOpen(false);
  }, [shareUrl]);

  return (
    <div
      className={`relative ${className || ""}`}
      {...props}
      onKeyDown={handleKeyDown}
    >
      <Button
        variant="none"
        className="h-fit cursor-pointer p-0"
        onClick={handleToggle}
        aria-label="Compartilhar receita"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <ShareNetworkIcon
          className="text-green-500"
          weight="regular"
          size={18}
          aria-hidden="true"
        />
      </Button>

      <Row
        ref={dropdownRef}
        data-state={isOpen ? "open" : "closed"}
        className={clsx(
          "absolute right-0 z-10 mt-2 w-fit items-center gap-x-4 rounded-md bg-green-50 p-3 shadow-md",
          "origin-top transition-all duration-200 data-[state=closed]:scale-0 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
        )}
        role="menu"
        aria-label="Opções de compartilhamento"
      >
        <FacebookShareButton
          url={shareUrl}
          title={title}
          aria-label="Compartilhar no Facebook"
        >
          <FacebookIcon size={24} round aria-hidden="true" />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={title}
          aria-label="Compartilhar no Twitter"
        >
          <XIcon size={24} round aria-hidden="true" />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={title}
          aria-label="Compartilhar no WhatsApp"
        >
          <WhatsappIcon size={24} round aria-hidden="true" />
        </WhatsappShareButton>

        <LinkedinShareButton
          url={shareUrl}
          title={title}
          aria-label="Compartilhar no LinkedIn"
        >
          <LinkedinIcon size={24} round aria-hidden="true" />
        </LinkedinShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={title}
          aria-label="Compartilhar por email"
        >
          <EmailIcon size={24} round aria-hidden="true" />
        </EmailShareButton>

        <Button
          variant="none"
          className="cursor-pointer p-0"
          onClick={handleCopy}
          aria-label="Copiar link"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <CopyIcon
            className="!size-6 text-green-500"
            weight="fill"
            aria-hidden="true"
          />
        </Button>
      </Row>
    </div>
  );
});

export default ShareDropdown;
