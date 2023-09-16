"use client";

const CustomerEnquiry = () => {
  const data = [
    { name: 'John', email: 'john@example.com', phone: '123-456-7890', message: 'Interested in your product' },
    { name: 'Jane', email: 'jane@example.com', phone: '098-765-4321', message: 'Would like a demo' },
    { name: 'Emily', email: 'emily@example.com', phone: '333-333-3333', message: 'How does this work?' },
    { name: 'Dave', email: 'dave@example.com', phone: '444-444-4444', message: 'I need more information' },
    { name: 'Sarah', email: 'sarah@somemail.com', phone: '555-555-5555', message: 'I have a question' },
    { name: 'Mike', email: 'Mike@mike.com', phone: '666-666-6666', message: 'I have a question' },

  ];
  

  return (
    <section className="min-h-full">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white shadow">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Customer Enquiry Details
        </h1>
      </div>

      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Email
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Phone
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Message
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-900">
            {data.map((enquiry, index) => (
              <tr key={index}>
                <td className="px-6 py-4">{enquiry.name}</td>
                <td className="px-6 py-4">{enquiry.email}</td>
                <td className="px-6 py-4">{enquiry.phone}</td>
                <td className="px-6 py-4">{enquiry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CustomerEnquiry;
