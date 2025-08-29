'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'register' | 'users' | 'bookings'>('register')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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
              Booking Approvals
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Approvals</h2>
              <p className="text-gray-600">
                Booking approval interface will be implemented once we have bookings data flow.
                For now, you can approve/reject bookings directly in Supabase.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}