import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import RatingStars from "@/shared/ui/RatingStars";
import Text from "@/shared/ui/Text";
import Textarea from "@/shared/ui/TextArea";
import { memo, useCallback } from "react";

interface ReviewFormProps {
  rating: number;
  review: string;
  onRatingChange: (rating: number) => void;
  onReviewChange: (text: string) => void;
  onPost: VoidFunction;
  isSubmitting?: boolean;
  error?: string;
}

const ReviewForm = memo(function ReviewForm({
  review,
  rating,
  onReviewChange,
  onRatingChange,
  onPost,
  isSubmitting = false,
  error,
}: ReviewFormProps) {
  const handleReviewChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onReviewChange(e.target.value);
    },
    [onReviewChange],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onPost();
    },
    [onPost],
  );

  const isFormValid = review.trim().length > 0 && rating > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
      role="form"
      aria-label="Formulário de avaliação"
    >
      <Col className="gap-y-2">
        <Text
          type={Text.Type.BodyTwo}
          weight={Text.Weight.Medium}
          className="text-green-500"
          as="h3"
        >
          Deixe um comentário
        </Text>

        <div role="group" aria-labelledby="rating-label">
          <Text id="rating-label" type={Text.Type.BodyFour} className="sr-only">
            Avalie a receita
          </Text>
          <Row className="gap-1">
            <RatingStars
              value={rating}
              onRatingChange={onRatingChange}
              aria-label={`Avaliação: ${rating} estrelas`}
            />
          </Row>
        </div>

        <div role="group" aria-labelledby="review-label">
          <Text id="review-label" type={Text.Type.BodyFour} className="sr-only">
            Escreva seu comentário
          </Text>
          <Textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Escreva aqui..."
            className="min-h-[80px] w-full max-w-full rounded-md border border-green-200 p-2 text-green-800 transition-colors focus:border-green-500 focus:ring-1 focus:ring-green-500"
            aria-invalid={!!error}
            aria-describedby={error ? "review-error" : undefined}
            disabled={isSubmitting}
          />
          {error && (
            <Text
              id="review-error"
              type={Text.Type.BodyFive}
              className="mt-1 text-red-500"
              role="alert"
            >
              {error}
            </Text>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          disabled={!isFormValid || isSubmitting}
          className="cursor-pointer self-end transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </Col>
    </form>
  );
});

export default ReviewForm;
