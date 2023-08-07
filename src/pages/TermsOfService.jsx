function TermsOfService() {
  return (
    <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-16 sm:h-24 font-semibold text-5xl sm:text-7xl text-center relative top-8">
        Terms of Service
      </h1>
      <div className="w-[90%] sm:w-3/4 m-auto text-white my-10">
        <p className="text-lg mb-10">Last Updated: 07/31/2023</p>
        <h3 className="text-3xl mb-2 font-semibold">1. Introduction</h3>
        <p className="text-lg mb-10">
          Welcome to AlgoBlock! These Terms of Service ("Terms") govern your
          access and use of AlgoBlock.net ("the Website"), provided by AlgoBlock
          Inc. ("AlgoBlock," "we," "us," or "our"). By accessing or using the
          Website, you agree to be bound by these Terms. If you do not agree
          with any part of these Terms, please refrain from using the Website.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">2. Acceptance of Terms</h3>
        <p className="text-lg mb-10">
          By accessing the Website, you acknowledge that you have read,
          understood, and accepted these Terms. If you are using AlgoBlock on
          behalf of an organization, you represent and warrant that you have the
          authority to bind that organization to these Terms.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">3. Use of AlgoBlock</h3>
        <p className="text-lg mb-10">
          AlgoBlock offers a platform that allows users to create their
          algorithmic trading strategies through user-friendly drop-down menus.
          Our goal is to make algorithmic trading accessible to traders of all
          levels of expertise. Before running any program, it is highly
          recommended to use TradingView's "Strategy Tester" feature to estimate
          the success of the strategy.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">
          4. Algorithm Creation and Pine Script Conversion
        </h3>
        <p className="text-lg mb-10">
          Using AlgoBlock's intuitive drop-down menus, you can design and
          customize your own algorithmic trading strategies. Upon completing
          your algorithm, you have the option to convert it into Pine Script, a
          scripting language used for automated trading on the TradingView
          platform.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">5. Payments and Fees</h3>
        <p className="text-lg mb-10">
          To access the Pine Script conversion service, there is a recurring fee
          of $9.99 per month. Payments are processed securely through Stripe,
          ensuring a seamless and safe transaction process.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">
          6. User Responsibilities
        </h3>
        <p className="text-lg mb-10">
          As an AlgoBlock user, you are responsible for ensuring the accuracy
          and legality of the algorithms you create. You agree not to use
          AlgoBlock for any unlawful, harmful, or fraudulent purposes. Any
          misuse of the platform may result in the termination of your account.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">
          7. Disclaimer of Warranty
        </h3>
        <p className="text-lg mb-10">
          While AlgoBlock strives to provide a reliable and efficient platform,
          we cannot guarantee the profitability, performance, or success of the
          trading strategies created using our service. Trading involves
          inherent risks, and users should exercise caution and conduct their
          research.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">8. Indemnification</h3>
        <p className="text-lg mb-10">
          You agree to indemnify and hold harmless AlgoBlock, its officers,
          directors, employees, and agents from any claims, liabilities,
          damages, or expenses arising from your use of the Website or violation
          of these Terms.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">
          9. Termination of Service
        </h3>
        <p className="text-lg mb-10">
          AlgoBlock reserves the right to terminate or suspend your access to
          the Website, in whole or in part, at any time and for any reason,
          without prior notice.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">
          10. Amendments to Terms of Service
        </h3>
        <p className="text-lg mb-10">
          We may update these Terms from time to time. We will notify you of any
          material changes, and your continued use of the Website after such
          changes will constitute your acceptance of the revised Terms.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">11. Contact Us</h3>
        <p className="text-lg mb-10">
          If you have any questions, concerns, or feedback regarding our
          services or these Terms, please don't hesitate to contact our support
          team at{" "}
          <a
            className="text-green-600 hover:text-green-500 active:text-green-800 font-bold duration-300"
            href="mailto:info@algoblock.net"
          >
            info@algoblock.net
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default TermsOfService;
