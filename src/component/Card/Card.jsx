export default function Card({ productInfo }) {
  const {
    imageCover,
    category,
    description,
    title,
    price,
    ratingsAverage,
  } = productInfo;
  return (
    <>
      <div className="card group/parent shadow-lg rounded-lg overflow-hidden col-span-12 sm:col-span-6 md:col-span-4  lg:col-span-3">
        <div className="relative">
          <img src={imageCover} alt="" />
          <div className="overlay group-hover/parent:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4 gap-4 absolute left-0 top-0 w-full h-full bg-slate-400 bg-opacity-40 opacity-0">
            <div className="icon animation-icon  bg-white text-primary-500">
              <i className="fa-solid fa-heart"></i>
            </div>
            <div className="icon animation-icon bg-white text-primary-500">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="icon animation-icon bg-white text-primary-500">
              <i className="fa-solid fa-eye"></i>
            </div>
          </div>
        </div>
        <div className="cart-body p-4 space-y-3">
          <header>
            <h3 className="text-lg font-semibold text-gray-600 line-clamp-1">{title}</h3>
            <h4 className="font-semibold text-primary-500">{category.name}</h4>
          </header>
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
          <div className="flex justify-between">
            <span>{price} EGP</span>
            <div>
              <i className="fa-solid fa-star mr-1 text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
