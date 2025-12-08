import TopMetricCards from "@/components/TopMetricCards";
import LoansDistributionChart from "@/components/LoansDistributionChart";
import LoanTypesChart from "@/components/LoanTypesChart";
import BankWiseChart from "@/components/BankWiseChart";
import PartnerPerformanceTable from "@/components/PartnerPerformanceTable";
import ApplicationLoansChart from "@/components/ApplicationLoansChart";
import ReportsBanner from "@/components/ReportsBanner";

export default function Home() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back</p>
        </div>
        <div className="text-xs sm:text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Top Section - Metric Cards (Bento Layout) */}
      <section>
        <TopMetricCards />
      </section>

      {/* Analytics Grid - Bento Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <LoansDistributionChart />
        <LoanTypesChart />
      </section>

      {/* Download Reports Banner */}
      <section>
        <ReportsBanner />
      </section>

      {/* Partner Performance - Full Width */}
      <section>
        <PartnerPerformanceTable />
      </section>

      {/* Lower Analytics Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <BankWiseChart />
        <ApplicationLoansChart />
      </section>
    </div>
  );
}
