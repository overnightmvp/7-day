'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { formatCurrency, formatDate } from '@/lib/utils'

type BookingInquiry = {
  id: string
  work_email: string
  company_name: string
  contact_name: string
  phone: string | null
  team_size: number
  preferred_date: string
  alternate_date: string | null
  special_requests: string | null
  experience_id: string
  experience_title: string
  estimated_cost: number
  status: 'pending' | 'contacted' | 'converted' | 'lost'
  created_at: string
}

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'register' | 'users' | 'bookings'>('bookings')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [leads, setLeads] = useState<BookingInquiry[]>([])
  const [selectedLead, setSelectedLead] = useState<BookingInquiry | null>(null)
  const [loadingLeads, setLoadingLeads] = useState(false)

  const handleCompanyRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const formData = new FormData(e.currentTarget)
    const companyName = formData.get('company-name') as string
    const adminEmail = formData.get('admin-email') as string

    try {
      // Insert company
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert([{ name: companyName, admin_email: adminEmail }])
        .select()
        .single()

      if (companyError) throw companyError

      // Insert admin user
      const { error: userError } = await supabase
        .from('users')
        .insert([{ 
          company_id: company.id, 
          email: adminEmail, 
          role: 'admin' 
        }])

      if (userError) throw userError

      setMessage('Company registered successfully!')
      e.currentTarget.reset()
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEmployeeUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const formData = new FormData(e.currentTarget)
    const companyId = formData.get('company-id') as string
    const employeeEmails = (formData.get('employee-emails') as string)
      .split('\n')
      .map(email => email.trim())
      .filter(email => email.length > 0)

    try {
      const users = employeeEmails.map(email => ({
        company_id: companyId,
        email,
        role: 'employee' as const
      }))

      const { error } = await supabase
        .from('users')
        .insert(users)

      if (error) throw error

      setMessage(`${employeeEmails.length} employees added successfully!`)
      e.currentTarget.reset()
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchLeads = async () => {
    setLoadingLeads(true)
    try {
      const { data, error } = await supabase
        .from('booking_inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setLeads(data || [])
    } catch (error) {
      console.error('Error fetching leads:', error)
      setMessage('Error loading leads')
    } finally {
      setLoadingLeads(false)
    }
  }

  const updateLeadStatus = async (leadId: string, status: BookingInquiry['status']) => {
    try {
      const { error } = await supabase
        .from('booking_inquiries')
        .update({ status })
        .eq('id', leadId)

      if (error) throw error
      
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status } : lead
      ))
      setMessage(`Lead marked as ${status}`)
    } catch (error) {
      console.error('Error updating lead:', error)
      setMessage('Error updating lead status')
    }
  }

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchLeads()
    }
  }, [activeTab])

  const getStatusColor = (status: BookingInquiry['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'contacted': return 'bg-blue-100 text-blue-800'
      case 'converted': return 'bg-green-100 text-green-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">7DAY Admin Portal</h1>
          <p className="text-gray-600 mt-2">Manage your company and bookings</p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow mb-8">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('register')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'register'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Register Company
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Manage Users
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Lead Management {leads.length > 0 && <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{leads.length}</span>}
            </button>
          </nav>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'register' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Register New Company</h2>
              <form onSubmit={handleCompanyRegister} className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    id="company-name"
                    name="company-name"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Email
                  </label>
                  <input
                    id="admin-email"
                    name="admin-email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="admin@acme.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Registering...' : 'Register Company'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Employees</h2>
              <form onSubmit={handleEmployeeUpload} className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="company-id" className="block text-sm font-medium text-gray-700 mb-1">
                    Company ID
                  </label>
                  <input
                    id="company-id"
                    name="company-id"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Get from company registration"
                  />
                </div>
                <div>
                  <label htmlFor="employee-emails" className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Emails (one per line)
                  </label>
                  <textarea
                    id="employee-emails"
                    name="employee-emails"
                    rows={5}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="john@acme.com&#10;jane@acme.com&#10;bob@acme.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Employees'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Lead Management</h2>
                <button
                  onClick={fetchLeads}
                  disabled={loadingLeads}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                >
                  {loadingLeads ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {loadingLeads ? (
                <div className="text-center py-8 text-gray-500">Loading leads...</div>
              ) : leads.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No booking inquiries yet. Leads will appear here when customers submit the booking form.
                </div>
              ) : (
                <>
                  {/* Basic Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-gray-900">{leads.length}</div>
                      <div className="text-sm text-gray-600">Total Leads</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-yellow-600">{leads.filter(l => l.status === 'pending').length}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-blue-600">{leads.filter(l => l.status === 'contacted').length}</div>
                      <div className="text-sm text-gray-600">Contacted</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-green-600">{leads.filter(l => l.status === 'converted').length}</div>
                      <div className="text-sm text-gray-600">Converted</div>
                    </div>
                  </div>

                  {/* Leads Table */}
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Size</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(lead.created_at)}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                <div className="font-medium">{lead.company_name}</div>
                                <div className="text-gray-500 text-xs">{lead.work_email}</div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                <div>{lead.contact_name}</div>
                                {lead.phone && <div className="text-gray-500 text-xs">{lead.phone}</div>}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                <div className="max-w-xs truncate">{lead.experience_title}</div>
                                <div className="text-gray-500 text-xs">{lead.preferred_date}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {lead.team_size} people
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {formatCurrency(lead.estimated_cost)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="text-blue-600 hover:text-blue-900 font-medium"
                                >
                                  View
                                </button>
                                {lead.status === 'pending' && (
                                  <button
                                    onClick={() => updateLeadStatus(lead.id, 'contacted')}
                                    className="text-green-600 hover:text-green-900 font-medium"
                                  >
                                    Mark Contacted
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Lead Details Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Lead Details</h3>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-gray-500">Company</label>
                      <div className="font-medium">{selectedLead.company_name}</div>
                    </div>
                    <div>
                      <label className="text-gray-500">Contact Name</label>
                      <div className="font-medium">{selectedLead.contact_name}</div>
                    </div>
                    <div>
                      <label className="text-gray-500">Work Email</label>
                      <div className="font-medium">
                        <a href={`mailto:${selectedLead.work_email}`} className="text-blue-600 hover:underline">
                          {selectedLead.work_email}
                        </a>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-500">Phone</label>
                      <div className="font-medium">
                        {selectedLead.phone ? (
                          <a href={`tel:${selectedLead.phone}`} className="text-blue-600 hover:underline">
                            {selectedLead.phone}
                          </a>
                        ) : (
                          <span className="text-gray-400">Not provided</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Event Details</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-gray-500">Experience</label>
                      <div className="font-medium">{selectedLead.experience_title}</div>
                    </div>
                    <div>
                      <label className="text-gray-500">Team Size</label>
                      <div className="font-medium">{selectedLead.team_size} people</div>
                    </div>
                    <div>
                      <label className="text-gray-500">Preferred Date</label>
                      <div className="font-medium">{selectedLead.preferred_date}</div>
                    </div>
                    <div>
                      <label className="text-gray-500">Backup Date</label>
                      <div className="font-medium">
                        {selectedLead.alternate_date || <span className="text-gray-400">Not provided</span>}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-500">Estimated Cost</label>
                      <div className="font-bold text-lg text-green-600">{formatCurrency(selectedLead.estimated_cost)}</div>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {selectedLead.special_requests && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Special Requests</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      {selectedLead.special_requests}
                    </div>
                  </div>
                )}

                {/* Status Management */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Lead Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {(['pending', 'contacted', 'converted', 'lost'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          updateLeadStatus(selectedLead.id, status)
                          setSelectedLead({ ...selectedLead, status })
                        }}
                        className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                          selectedLead.status === status
                            ? `${getStatusColor(status)} border-current`
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Submitted: {formatDate(selectedLead.created_at)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}