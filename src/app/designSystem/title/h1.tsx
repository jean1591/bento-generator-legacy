export const H1 = ({ title }: { title: string }) => {
  return (
    <div className="mt-20 mb-10">
      <h1 className="text-center text-5xl font-semibold tracking-tight leading-4">
        {title}
      </h1>
    </div>
  );
};
