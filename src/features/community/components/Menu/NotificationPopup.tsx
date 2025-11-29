import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { BellIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";

type NotificationType = "comment" | "save" | "reply" | "like";

interface Notification {
  id: string;
  type: NotificationType;
  user: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  recipeName?: string;
}

// Fake notification data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "comment",
    user: "Maria Silva",
    message: "comentou na sua receita",
    recipeName: "Feijoada Vegana",
    timestamp: "2 min atrás",
    isRead: false,
  },
  {
    id: "2",
    type: "save",
    user: "João Santos",
    message: "salvou sua receita",
    recipeName: "Bolo de Chocolate Fit",
    timestamp: "15 min atrás",
    isRead: false,
  },
  {
    id: "3",
    type: "reply",
    user: "Ana Costa",
    message: "respondeu seu comentário",
    recipeName: "Smoothie Verde Energético",
    timestamp: "1 hora atrás",
    isRead: true,
  },
  {
    id: "4",
    type: "like",
    user: "Pedro Oliveira",
    message: "curtiu sua receita",
    recipeName: "Hambúrguer de Grão-de-Bico",
    timestamp: "3 horas atrás",
    isRead: true,
  },
  {
    id: "5",
    type: "comment",
    user: "Carla Mendes",
    message: "comentou na sua receita",
    recipeName: "Brownie Proteico",
    timestamp: "1 dia atrás",
    isRead: true,
  },
  {
    id: "6",
    type: "comment",
    user: "Carla Mendes",
    message: "comentou na sua receita",
    recipeName: "Brownie Proteico",
    timestamp: "1 dia atrás",
    isRead: true,
  },
  {
    id: "7",
    type: "comment",
    user: "Carla Mendes",
    message: "comentou na sua receita",
    recipeName: "Brownie Proteico",
    timestamp: "1 dia atrás",
    isRead: true,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "comment":
      return "💬";
    case "save":
      return "🔖";
    case "reply":
      return "↩️";
    case "like":
      return "❤️";
    default:
      return "🔔";
  }
};

const NotificationPopup = memo(function NotificationPopup({
  className,
  ...props
}: ComponentProps<"div">) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
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

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  return (
    <div
      className={`relative ${className || ""}`}
      {...props}
      onKeyDown={handleKeyDown}
    >
      <Row
        ref={buttonRef}
        onClick={handleToggle}
        className="relative flex w-full cursor-pointer gap-x-2 rounded-lg bg-green-100 p-2 transition-all duration-300"
        aria-label="Notificações"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <BellIcon size={20} className="size-5 text-green-200" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </Row>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 z-50 mt-2 w-[380px] max-w-[calc(100vw-2rem)] origin-top-right rounded-lg bg-green-50 shadow-xl"
            role="dialog"
            aria-label="Painel de notificações"
          >
            <div className="border-b border-green-100 px-4 py-3">
              <Row className="items-center justify-between">
                <Text
                  as="h3"
                  type={Text.Type.BodyThree}
                  weight={Text.Weight.Bold}
                  className="font-lora text-green-500 italic"
                >
                  Notificações
                </Text>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="font-maitree cursor-pointer text-sm text-green-200 transition-colors duration-200 hover:text-green-500"
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </Row>
            </div>

            <Col className="max-h-[400px] overflow-y-auto" data-lenis-prevent>
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Text
                    type={Text.Type.BodyFour}
                    className="font-maitree text-green-200"
                  >
                    Nenhuma notificação
                  </Text>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => markAsRead(notification.id)}
                      className={clsx(
                        "cursor-pointer border-b border-green-100 px-4 py-3 transition-colors duration-200",
                        notification.isRead
                          ? "bg-green-50 hover:bg-green-100/50"
                          : "bg-green-100/30 hover:bg-green-100",
                      )}
                    >
                      <Row className="items-start gap-x-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-200 text-xl">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <Col className="flex-1 gap-y-1">
                          <Text
                            type={Text.Type.BodyFive}
                            weight={
                              notification.isRead
                                ? Text.Weight.Normal
                                : Text.Weight.Bold
                            }
                            className="font-maitree text-green-500"
                          >
                            <span className="font-bold">
                              {notification.user}
                            </span>{" "}
                            {notification.message}
                            {notification.recipeName && (
                              <span className="italic">
                                &quot;{notification.recipeName}&quot;
                              </span>
                            )}
                          </Text>
                          <Text
                            type={Text.Type.BodySix}
                            className="font-maitree text-green-200"
                          >
                            {notification.timestamp}
                          </Text>
                        </Col>

                        {!notification.isRead && (
                          <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                        )}
                      </Row>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </Col>

            {notifications.length > 0 && (
              <div className="border-t border-green-100 px-4 py-3">
                <button className="font-maitree w-full text-center text-sm text-green-200 transition-colors duration-200 hover:text-green-500">
                  Ver todas as notificações
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default NotificationPopup;
