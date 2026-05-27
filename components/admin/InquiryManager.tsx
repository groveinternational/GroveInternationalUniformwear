'use client';

import { useState } from 'react';

type InquiryStatus = 'PENDING' | 'REVIEWED' | 'CLOSED';

interface InquiryData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  schoolName: string | null;
  message: string;
  status: InquiryStatus;
  productId: string | null;
  quantity: number | null;
  createdAt: Date;
  product?: { name: string } | null;
}

interface InquiryManagerProps {
  inquiries: InquiryData[];
  updateStatusAction: (id: string, status: InquiryStatus) => Promise<{ success?: boolean; error?: string }>;
}

export default function InquiryManager({ inquiries, updateStatusAction }: InquiryManagerProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status: InquiryStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REVIEWED': return 'bg-blue-100 text-blue-800';
      case 'CLOSED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: InquiryStatus) => {
    setLoading(true);
    const res = await updateStatusAction(id, newStatus);
    if (res?.error) {
      alert(res.error);
    } else {
      if (selectedInquiry) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    }
    setLoading(false);
  };

  return (
    <div className="relative overflow-hidden min-h-screen pb-12">
      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-text-muted">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">School / Org</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Phone</th>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Qty</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-text-muted">
                  No inquiries found.
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{inq.name}</td>
                  <td className="px-6 py-4 text-text-muted">{inq.schoolName || '—'}</td>
                  <td className="px-6 py-4 text-text-muted">{inq.email}</td>
                  <td className="px-6 py-4 text-text-muted">{inq.phone || '—'}</td>
                  <td className="px-6 py-4 text-text-muted">{inq.product?.name || 'General'}</td>
                  <td className="px-6 py-4 text-text-muted">{inq.quantity || '—'}</td>
                  <td className="px-6 py-4 text-text-muted">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(inq.status)}`}>
                      {inq.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedInquiry(inq)}
                      className="text-primary hover:text-[#2A5298] font-medium text-sm transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Side Panel Overlay */}
      {selectedInquiry && (
        <div 
          className="fixed inset-0 bg-black/20 z-40" 
          onClick={() => setSelectedInquiry(null)}
        />
      )}

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-200 ${
        selectedInquiry ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {selectedInquiry && (
          <>
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-semibold text-text">Inquiry Details</h3>
              <button 
                onClick={() => setSelectedInquiry(null)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(selectedInquiry.status)}`}>
                  {selectedInquiry.status}
                </span>
                <span className="text-sm text-text-muted">
                  {new Date(selectedInquiry.createdAt).toLocaleString()}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Customer Info</h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                  <div>
                    <div className="text-xs text-text-muted">Name</div>
                    <div className="font-medium text-text">{selectedInquiry.name}</div>
                  </div>
                  {selectedInquiry.schoolName && (
                    <div>
                      <div className="text-xs text-text-muted">School / Organization</div>
                      <div className="font-medium text-text">{selectedInquiry.schoolName}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-text-muted">Email</div>
                    <a href={`mailto:${selectedInquiry.email}`} className="font-medium text-secondary hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  {selectedInquiry.phone && (
                    <div>
                      <div className="text-xs text-text-muted">Phone</div>
                      <a href={`tel:${selectedInquiry.phone}`} className="font-medium text-secondary hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Request Details</h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                  <div>
                    <div className="text-xs text-text-muted">Product of Interest</div>
                    <div className="font-medium text-text">{selectedInquiry.product?.name || 'General Inquiry'}</div>
                  </div>
                  {selectedInquiry.quantity && (
                    <div>
                      <div className="text-xs text-text-muted">Estimated Quantity</div>
                      <div className="font-medium text-text">{selectedInquiry.quantity} items</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-text-muted mb-1">Message</div>
                    <p className="text-sm text-text whitespace-pre-wrap bg-white p-3 rounded border border-gray-100">
                      {selectedInquiry.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Update Status</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(selectedInquiry.id, 'PENDING')}
                    disabled={loading || selectedInquiry.status === 'PENDING'}
                    className={`flex-1 py-2 text-sm font-medium rounded border transition-colors ${
                      selectedInquiry.status === 'PENDING' 
                        ? 'bg-yellow-50 border-yellow-200 text-yellow-700' 
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedInquiry.id, 'REVIEWED')}
                    disabled={loading || selectedInquiry.status === 'REVIEWED'}
                    className={`flex-1 py-2 text-sm font-medium rounded border transition-colors ${
                      selectedInquiry.status === 'REVIEWED' 
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    Reviewed
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedInquiry.id, 'CLOSED')}
                    disabled={loading || selectedInquiry.status === 'CLOSED'}
                    className={`flex-1 py-2 text-sm font-medium rounded border transition-colors ${
                      selectedInquiry.status === 'CLOSED' 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="w-full py-2 bg-white border border-gray-200 rounded-md text-text font-medium hover:bg-gray-50 transition-colors"
              >
                Close Panel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
