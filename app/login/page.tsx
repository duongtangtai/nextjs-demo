import { Login } from "@/components/index";
import Image from "@/public/images/background.png";

const Page = () => {
  return (
    <>
      <img
        src={Image.src}
        style={{
          height: "100vh",
          width: "100%",
        }}
      />
      <Login />
    </>
  );
};

export default Page;
