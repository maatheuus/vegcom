import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { UserProfileDetails } from "../types";

interface UserProfileHeaderProps {
  user: UserProfileDetails;
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <Col className="w-full gap-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <Row className="items-center gap-x-6">
        <Avatar className="h-24 w-24 border-2 border-green-500">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="text-2xl">
            {user.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Col className="gap-y-1">
          <Text
            as="h1"
            type={Text.Type.HeadingThree}
            weight={Text.Weight.Bold}
            className="text-gray-900"
          >
            {user.name}
          </Text>
          {user.bio && (
            <Text
              as="p"
              type={Text.Type.BodyThree}
              className="max-w-2xl text-gray-600"
            >
              {user.bio}
            </Text>
          )}
        </Col>
      </Row>
    </Col>
  );
}
