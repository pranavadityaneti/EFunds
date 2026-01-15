import LandingFooter from "@/components/landing/LandingFooter";

export default function TermsAndConditions() {
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
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
                <p className="text-gray-500 mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

                <div className="prose prose-lg prose-gray max-w-none text-gray-600">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            Welcome to efundzz. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before using our platform.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services</h2>
                        <p className="mb-4">
                            efundzz provides a platform for connecting users with financial institutions for various loan products and services. We do not directly provide loans but act as an aggregator and facilitator for loan applications.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
                        <p className="mb-4">
                            To use our services, you must be at least 18 years old and capable of entering into a legally binding contract. By creating an account, you represent and warrant that you meet these eligibility requirements.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts</h2>
                        <p className="mb-4">
                            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy and Data</h2>
                        <p className="mb-4">
                            Your use of our services is also governed by our Privacy Policy. By using efundzz, you consent to the collection and use of your information as described in our Privacy Policy.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                        <p className="mb-4">
                            efundzz shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                        </p>
                    </section>
                </div>
            </div>

            <LandingFooter />
        </main>
    );
}
