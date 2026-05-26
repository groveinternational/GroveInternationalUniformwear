import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // ensure real-time counts

export default async function AdminDashboard() {
  // Fetch real counts from DB
  const [
    totalProducts,
    totalCategories,
    totalInquiries,
    pendingInquiries,
    recentInquiries
  ] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'PENDING' } }),
    prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    })
  ]);

  const stats = [
    { label: 'Total Products', value: totalProducts },
    { label: 'Total Categories', value: totalCategories },
    { label: 'Pending Inquiries', value: pendingInquiries },
    { label: 'Total Inquiries', value: totalInquiries },
  ];

  return (
    <div className="space-y-8">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="text-sm font-medium text-text-muted uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-text text-lg">Recent Inquiries</h3>
          <Link href="/admin/inquiries" className="text-sm text-secondary hover:text-secondary-light font-medium">
            View All &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-text-muted">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">School</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-muted">
                    No recent inquiries found.
                  </td>
                </tr>
              ) : (
                recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text">{inq.name}</td>
                    <td className="px-6 py-4 text-text-muted">{inq.schoolName || '-'}</td>
                    <td className="px-6 py-4 text-text-muted">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${inq.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : ''}
                        ${inq.status === 'REVIEWED' ? 'bg-blue-100 text-blue-800' : ''}
                        ${inq.status === 'CLOSED' ? 'bg-gray-100 text-gray-800' : ''}
                      `}>
                        {inq.status.toLowerCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
