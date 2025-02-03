import amzonePay from "../../assets/imgs/amazon-pay.png";
import masrerCard from "../../assets/imgs/mastercard.webp";
import payPal from "../../assets/imgs/paypal.png";
import americanExpress from "../../assets/imgs/American-Express-Color.png";
import getGooglePlay from "../../assets/imgs/get-google-play.png";
import getAppleStore from "../../assets/imgs/get-apple-store.png";

export default function Footer() {
  return (
    <>
      <footer className="py-8 shadow-lg bg-gray-100 ">
        <div className="container mx-auto px-4 space-y-6">
          <header>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-700">
              Get the FreshCart app
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </header>

          <div className="flex flex-col [@media(min-width:385px)]:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Email.."
              className="form-control px-3 py-2 w-full md:w-auto flex-grow"
            />
            <button className="btn uppercase w-auto text-xs sm:text-sm md:text-base px-3 py-2 sm:px-3 sm:py-2 md:px-5 md:py-1.5 text-nowrap mb-2  bg-primary-500 hover:bg-primary-600">
              Share App Link
            </button>
          </div>

          <div className="py-3 flex flex-col gap-2 xl:flex-row items-center justify-between border-y-2 border-slate-300 border-opacity-50">
            <div className="payment-way flex flex-nowrap items-center gap-2 md:gap-4 mb-4 md:mb-2">
              <h4 className="text-sm md:text-base whitespace-nowrap">
                Payment Partners
              </h4>
              <img
                className="w-10 xs:w-12 sm:w-16 md:w-20 lg:w-24"
                src={amzonePay}
                alt="Amazon Pay"
              />
              <img
                className="w-10 xs:w-12 sm:w-16 md:w-20 lg:w-24"
                src={americanExpress}
                alt="American Express"
              />
              <img
                className="w-8 xs:w-10 sm:w-14 md:w-18 lg:w-20"
                src={masrerCard}
                alt="MasterCard"
              />
              <img
                className="w-10 xs:w-12 sm:w-16 md:w-20 lg:w-24"
                src={payPal}
                alt="PayPal"
              />
            </div>

            <div className="download-way flex flex-nowrap items-center gap-2 md:gap-4">
              <h4 className="text-sm md:text-base whitespace-nowrap">
                Get deliveries with FreshCart
              </h4>
              <img
                className="w-10 xs:w-12 sm:w-16 md:w-20 lg:w-24"
                src={getAppleStore}
                alt="Apple Store"
              />
              <img
                className="w-10 xs:w-12 sm:w-16 md:w-20 lg:w-[100px]"
                src={getGooglePlay}
                alt="Google Play"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
