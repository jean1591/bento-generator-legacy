export const H1 = ({ title }: { title: string }) => {
  return (
    <div className="mt-12  mb-10">
      <h1 className="text-center text-polo-blue-700 text-5xl font-semibold tracking-tight leading-4">
        {title}
      </h1>

      <div className="flex items-center justify-center">
        <div className="p-3 border-b-4 border-plum-500 w-1/3" />
      </div>
    </div>
  );
};
