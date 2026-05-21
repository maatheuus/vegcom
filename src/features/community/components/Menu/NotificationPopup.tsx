import {
  useNotifications,
  type NotificationType,
} from "@/features/community/hooks/useNotifications";
import EmptyState from "@/shared/ui/EmptyState";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { BellIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import {
  dateFormatDistanceLocale,
  safeFormatDistance,
} from "@/shared/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { getPostById } from "../../api/communityApi";

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "COMMENT_REPLY":
    case "COMMENT_LIKE":
      return "💬";
    case "MENTION":
      return "🏷️";
    default:
      return "🔔";
  }
};

const NotificationPopup = memo(function NotificationPopup({
  className,
  triggerClassName,
  ...props
}: ComponentProps<"div"> & { triggerClassName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const handleNotificationClick = useCallback(
    async (notification: (typeof notifications)[0]) => {
      if (!notification.isRead) {
        markAsRead(notification.id);
      }
      setIsOpen(false);

      if (
        notification.type === "COMMENT_REPLY" ||
        notification.type === "COMMENT_LIKE" ||
        notification.type === "COMMUNITY_COMMENT" ||
        notification.type === "COMMUNITY_POST" ||
        notification.type === "POST_COMMENT" ||
        notification.type === "POST_LIKE" ||
        notification.type === "MENTION"
      ) {
        if (notification.entityId) {
          const postSlug =
            (await getPostById(String(notification.entityId))?.then(
              (post) => post?.slug,
            )) || "";

          router.push(`/community/${notification.entityId}/${postSlug}`);
        }
      }
    },
    [markAsRead, router],
  );

  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  return (
    <div
      className={`group/bell relative ${className || ""}`}
      {...props}
      onKeyDown={handleKeyDown}
    >
      <Row
        ref={buttonRef}
        onClick={handleToggle}
        className={clsx(
          "relative flex cursor-pointer gap-x-2 rounded-lg bg-green-100 p-2 transition-all duration-300 group-hover/bell:bg-green-200",
          triggerClassName,
        )}
        aria-label="Notificações"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <BellIcon
          size={18}
          className="text-green-200 group-hover/bell:text-green-50"
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white group-hover/bell:text-green-50">
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
            className="absolute top-12 -right-16 z-50 mt-2 w-[380px] max-w-[calc(100vw-6rem)] origin-top-right rounded-lg bg-green-50 shadow-xl md:right-0 md:max-w-[calc(100vw-2rem)]"
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
                    className="font-maitree cursor-pointer rounded-full border border-green-200 px-3 py-1 text-xs font-medium text-green-200 transition-all duration-200 hover:border-green-100 hover:text-green-500"
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </Row>
            </div>

            <Col
              className="max-h-[400px] overflow-x-hidden overflow-y-auto"
              data-lenis-prevent
            >
              {notifications.length === 0 ? (
                <EmptyState
                  size="compact"
                  title="Nenhuma notificação"
                  className="py-8"
                />
              ) : (
                <AnimatePresence mode="popLayout">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => handleNotificationClick(notification)}
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
                            {/* <span className="font-bold">
                              {notification.actor?.name}
                            </span>{" "} */}
                            {notification.message}
                          </Text>
                          <Text
                            type={Text.Type.BodySix}
                            className="font-maitree text-green-200"
                          >
                            {safeFormatDistance(
                              notification.createdAt,
                              dateFormatDistanceLocale,
                            )}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default NotificationPopup;
