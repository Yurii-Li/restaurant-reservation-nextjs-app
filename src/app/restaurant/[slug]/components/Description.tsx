interface IProps {
  description: string;
}

export function Description({ description }: IProps) {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  );
}
