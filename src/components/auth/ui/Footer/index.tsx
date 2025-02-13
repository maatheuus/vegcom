import Text from "@/components/ui/Text";

export default function AuthFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div role="footer" className="text-center w-full mx-auto mt-0 sm:mt-6">
      <Text as="span" className="text-green-500 block text-base font-rancho">
        Copyrirght @matheus {currentYear}
      </Text>
    </div>
  );
}
