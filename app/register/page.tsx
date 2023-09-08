import Image from "@/public/images/background.png";

import Register from "@/components/register/Register";

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
        <Register />
    </>
  );
};

export default Page;
