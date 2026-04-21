import type { NewRecipeForm } from "@/features/new-recipe/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import Textarea from "@/shared/ui/TextArea";
import CoverPhotoUpload from "../CoverPhotoUpload";
import { CATEGORIES, DIFFICULTIES } from "./constants";
import StepShared from "./StepShared";

interface FieldLabelProps {
  children: React.ReactNode;
}

function FieldLabel({ children }: FieldLabelProps) {
  return (
    <label className="font-lora mb-1 block text-sm font-semibold text-green-800">
      {children}
    </label>
  );
}

export default function StepOne({ form }: { form: NewRecipeForm }) {
  return (
    <StepShared
      title="Primeiro, o básico"
      description="Nome, tempo, categoria. A parte chata, mas necessária."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="recipe_title"
            render={({ field }) => (
              <FormItem>
                <FieldLabel>Título</FieldLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Lasanha de brócolis e tofu..."
                    className="rounded-xl!"
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipe_description"
            render={({ field }) => (
              <FormItem>
                <FieldLabel>Descrição</FieldLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cremosa, reconfortante e pronta em 30 minutos ao forno."
                    className="min-h-[110px] max-w-full rounded-xl!"
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="recipe_preparationHours"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Tempo (horas)</FieldLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="rounded-xl!"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipe_preparationMinutes"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Tempo (min)</FieldLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="rounded-xl!"
                      placeholder="30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="recipe_servings"
            render={({ field }) => (
              <FormItem>
                <FieldLabel>Porções</FieldLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="rounded-xl!"
                    placeholder="4 pessoas"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="recipe_category"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Categoria</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="min-h-[42px]">
                      <SelectTrigger className="font-lora rounded-xl! focus-within:ring-1">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem
                          key={c.value}
                          value={c.value}
                          className="font-maitree"
                        >
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipe_difficulty"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Dificuldade</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="min-h-[42px]">
                      <SelectTrigger className="font-lora rounded-xl! focus-within:ring-1">
                        <SelectValue placeholder="Dificuldade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DIFFICULTIES.map((d) => (
                        <SelectItem
                          key={d.value}
                          value={d.value}
                          className="font-maitree"
                        >
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <CoverPhotoUpload form={form} />
          <FormField
            control={form.control}
            name="recipe_images"
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </StepShared>
  );
}
