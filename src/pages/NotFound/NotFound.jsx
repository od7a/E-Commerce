import { Helmet } from "react-helmet";
import notFoundImg from "../../assets/imgs/undraw_page-not-found_6wni.svg";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist. Return to the homepage."
        />
      </Helmet>
      <div className="h-screen flex flex-col justify-center items-center gap-6">
        <img className="w-96" src={notFoundImg} alt="" />
        <a href="/">Back to Home</a>
      </div>
    </>
  );
}
