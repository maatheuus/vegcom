import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import Row from "@/components/ui/Layout/Helpers/Row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Fragment } from "react";
import DynamicFields from "../DynamicFields";
import type { Props } from "../ImageUploadArea";

const simpleCategories = [
  { value: "breakfast", label: "Café da manhã" },
  { value: "lunch", label: "Almoço" },
  { value: "dinner", label: "Jantar" },
  { value: "desserts", label: "Sobremesas" },
];

const simpleDifficulty = [
  { value: "easy", label: "Fácil" },
  { value: "medium", label: "Médio" },
  { value: "hard", label: "Difícil" },
];

export default function PreparationFields({ form, className }: Props) {
  return (
    <Fragment>
      <Row className={`flex-col gap-4 xl:flex-row ${className || ""}`}>
        <DynamicFields title="Tempo de Preparo" className="w-full flex-1">
          <Row className="flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="recipe_preparationHours"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input type="number" placeholder="(em horas)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipe_preparationMinutes"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="(em minutos)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Row>
        </DynamicFields>
        <DynamicFields title="Quantidade" className="w-full flex-1">
          <FormField
            control={form.control}
            name="recipe_servings"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Input
                  type="number"
                  placeholder="Serve até quantas pessoas..."
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </DynamicFields>
      </Row>
      <Row className="flex-col gap-4 md:flex-row">
        <DynamicFields title="Categoria" className="w-full flex-1">
          <FormField
            control={form.control}
            name="recipe_category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="font-lora !rounded-xs focus-within:ring-1">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {simpleCategories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        className="font-maitree"
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </DynamicFields>
        <DynamicFields title="Dificuldade" className="w-full flex-1">
          <FormField
            control={form.control}
            name="recipe_difficulty"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="font-lora !rounded-xs focus-within:ring-1">
                      <SelectValue
                        className="text-red-500"
                        placeholder="Dificuldade"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {simpleDifficulty.map((diff) => (
                      <SelectItem
                        key={diff.value}
                        value={diff.value}
                        className="font-maitree"
                      >
                        {diff.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </DynamicFields>
      </Row>
    </Fragment>
  );
}
