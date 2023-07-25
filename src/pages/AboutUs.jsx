import AlgoBlockFull from "../assets/AlgoBlockFull.png";

function AboutUs() {
  return (
    <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-16 sm:h-24 font-semibold text-5xl sm:text-7xl text-center relative top-8">
        About Us
      </h1>
      <div className="flex flex-col sm:flex-row w-5/6 gap-2 m-auto my-6">
        <img src={AlgoBlockFull} className="sm:h-[50vh]" />
        <div className="flex flex-col gap-2 sm:gap-4 text-white sm:mt-12">
          <h2 className="text-3xl sm:text-5xl font-semibold">Our Mission</h2>
          <p className="text-lg sm:text-xl mb-4 sm:mb-0">
            At AlgoBlock, we are on a mission to shine a light on algorithmic
            trading by providing a powerful platform that allows new traders to
            create strategies without the ability to code. We believe that
            everyone should have the opportunity to harness the potential of
            algorithmic trading, regardless of their technical background. Our
            user-friendly drop-down menus and intuitive interface enable traders
            to effortlessly create personalized strategies, opening doors to
            endless possibilities in the financial markets. With AlgoBlock, we
            aim to level the playing field and empower aspiring traders to
            unlock their full potential and achieve success in the exciting
            world of algorithmic trading.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
