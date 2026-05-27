import { getInquiries, updateInquiryStatus } from '@/lib/actions/inquiries';
import InquiryManager from '@/components/admin/InquiryManager';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const currentStatus = searchParams.status || 'ALL';
  const inquiries = await getInquiries(currentStatus);

  const tabs = [
    { label: 'All', value: 'ALL' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Reviewed', value: 'REVIEWED' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-primary">Inquiries</h2>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-50 p-1 rounded-md border border-gray-100">
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href={tab.value === 'ALL' ? '/admin/inquiries' : `/admin/inquiries?status=${tab.value}`}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                currentStatus === tab.value
                  ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200'
                  : 'text-text-muted hover:text-text hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <InquiryManager inquiries={inquiries} updateStatusAction={updateInquiryStatus} />
    </div>
  );
}
