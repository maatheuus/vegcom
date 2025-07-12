interface Props {
  params: {
    slug: string;
  };
}

export default function page({ params }: Props) {
  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  );
}
