import Text from "@/components/ui/Text";

export default function BackgroundItems() {
  return (
    <>
      <div className="home-s">
        <Text
          weight={Text.Weight.Bold}
          className="text-green-200/80 font-rancho !text-[318px] uppercase"
        >
          S
        </Text>
      </div>{" "}
      <div className="home-a">
        <Text
          weight={Text.Weight.Bold}
          className="text-green-200/80 font-rancho !text-[318px] uppercase"
        >
          A
        </Text>
      </div>{" "}
      <div className="home-u">
        <Text
          weight={Text.Weight.Bold}
          className="text-green-200/80 font-rancho !text-[318px] uppercase"
        >
          U
        </Text>
      </div>{" "}
      <div className="home-d">
        <Text
          weight={Text.Weight.Bold}
          className="text-green-200/80 font-rancho !text-[318px] uppercase"
        >
          D
        </Text>
      </div>{" "}
      <div className="home-e">
        <Text
          weight={Text.Weight.Bold}
          className="text-green-200/80 font-rancho !text-[318px] uppercase"
        >
          E
        </Text>
      </div>
    </>
  );
}
