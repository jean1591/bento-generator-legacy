export const H1 = ({ title }: { title: string }) => {
  return (
    <div className="my-8">
      <h1 className="text-center text-polo-blue-700 text-5xl font-semibold tracking-tight leading-4">
        {title}
      </h1>

      <div className="flex items-center justify-center">
        <div className="p-3 border-b-4 border-plum-500 w-1/5" />
      </div>
    </div>
  );
};
