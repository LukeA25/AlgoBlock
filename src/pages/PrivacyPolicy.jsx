function PrivacyPolicy() {
  return (
    <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-16 sm:h-24 font-semibold text-5xl sm:text-7xl text-center relative top-8">
        Privacy Policy
      </h1>
      <div className="w-[90%] sm:w-3/4 m-auto text-white my-10">
        <p className="text-lg mb-10">Last Updated: 07/31/2023</p>
        <h3 className="text-3xl mb-2 font-semibold">
          1. Information We Collect
        </h3>
        <ol className="text-lg mb-10 list-disc ml-10">
          <li>
            <b>User Account Information:</b> When you create an account on
            AlgoBlock.net, we collect your email address and a password that you
            choose to secure your account.
          </li>
          <li>
            <b>Strategy Data:</b> We store the algorithmic trading strategies
            you create using AlgoBlock's services in our Firebase Realtime
            Database.
          </li>
        </ol>
        <h3 className="text-3xl mb-2 font-semibold">2. Use of Information</h3>
        <ol className="text-lg mb-10 list-disc ml-10">
          <li>
            <b>Authentication and Account Management:</b> We use your email and
            password to authenticate your account and manage your access to our
            services.
          </li>
          <li>
            <b>Communication:</b> We may use your email address to send you
            important updates, announcements, or other communications related to
            your account and the services we provide.
          </li>
          <li>
            <b>Improvement of Services:</b> We may use aggregated and anonymized
            data from your strategies to improve our platform's functionality
            and user experience.
          </li>
        </ol>
        <h3 className="text-3xl mb-2 font-semibold">3. Data Security</h3>
        <p className="text-lg mb-10">
          We take reasonable measures to protect your personal information and
          strategy data against unauthorized access, disclosure, or alteration.
          Our databases are encrypted and secured, and access to personal
          information is restricted to authorized personnel only.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">4. Payments</h3>
        <p className="text-lg mb-10">
          All payments made for the Pine Script conversion service are securely
          processed by Stripe. We do not store or have access to your payment
          information, such as credit card details. Please review Stripe's
          privacy policy for more information on their data practices.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">5. Data Retention</h3>
        <p className="text-lg mb-10">
          We will retain your account information as long as your account is
          active or as required by law. You may delete your account at any time,
          and your personal data will be removed from our active databases.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">6. Third-Party Services</h3>
        <p className="text-lg mb-10">
          Our website may contain links to third-party websites or services.
          This Privacy Policy only applies to AlgoBlock.net. We are not
          responsible for the privacy practices of third-party sites, and we
          encourage you to review their respective privacy policies.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">7. Children's Policy</h3>
        <p className="text-lg mb-10">
          AlgoBlock.net is not intended for children under 13 years of age. We
          do not knowingly collect personal information from children under 13.
          If you are a parent or guardian and believe that your child has
          provided us with personal information, please contact us immediately,
          and we will take appropriate steps to remove the data.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">
          8. Tracking and Analytics
        </h3>
        <p className="text-lg mb-10">
          We use Meta Pixel to collect information about user interactions and
          actions on our website. Meta Pixel is a third-party service that
          enables us to track user behavior, such as page views, clicks, and
          other interactions. The information collected is used for analytical
          purposes to understand user engagement, improve our services, and
          enhance the user experience.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">8. Policy Updates</h3>
        <p className="text-lg mb-10">
          We may update this Privacy Policy from time to time to reflect changes
          to our practices or for legal, regulatory, or operational reasons. Any
          revisions will be posted on this page, and the effective date will be
          updated accordingly.
        </p>
        <h3 className="text-3xl mb-2 font-semibold">9. Contact Us</h3>
        <p className="text-lg mb-10">
          If you have any questions, concerns, or requests related to this
          Privacy Policy or your personal information, please contact us at{" "}
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

export default PrivacyPolicy;
