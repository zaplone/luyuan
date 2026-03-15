export default function ProductDetailLoading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-7/12">
            <div className="aspect-square md:aspect-[4/3] bg-slate-100 rounded-2xl animate-pulse" />
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 md:w-24 md:h-24 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-5/12 space-y-6">
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-slate-100 rounded-full animate-pulse" />
              <div className="h-6 w-16 bg-slate-100 rounded-full animate-pulse" />
            </div>
            <div className="h-10 w-3/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-slate-100 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-slate-50 rounded-xl animate-pulse" />
              ))}
            </div>
            <div className="h-12 w-full bg-slate-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
