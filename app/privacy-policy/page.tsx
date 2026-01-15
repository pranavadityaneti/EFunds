import LandingFooter from "@/components/landing/LandingFooter";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white">
            {/* Simple Header */}
            <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
                    <a href="/" className="inline-block">
                        <img src="/logo.png" alt="Efunds" className="h-8 w-auto object-contain" />
                    </a>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                <p className="text-gray-500 mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                <div className="prose prose-lg prose-gray max-w-none text-gray-600">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                        <p className="mb-4">
                            We collect information you provide directly to us, such as when you create an account, apply for a loan, or contact customer support. This information may include your name, email address, phone number, financial information, and employment details.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                        <p className="mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Process your loan applications and connect you with lenders.</li>
                            <li>Provide, maintain, and improve our services.</li>
                            <li>Communicate with you about products, services, offers, and promotions.</li>
                            <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Sharing of Information</h2>
                        <p className="mb-4">
                            We may share your information with third-party lenders, credit bureaus, and service providers who help us operate our business. We may also share information if required by law or to protect our rights or property.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                        <p className="mb-4">
                            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
                        <p className="mb-4">
                            We use cookies and similar technologies to collect information about your browsing activities and to improve your experience on our website. You can manage your cookie preferences through your browser settings.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Changes to this Policy</h2>
                        <p className="mb-4">
                            We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, providing you with additional notice.
                        </p>
                    </section>
                </div>
            </div>

            <LandingFooter />
        </main>
    );
}
