import React from "react";

const Allcontact = ({contacts,loading}) => {
 
  return (
    <div className="mt-10 w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact List</h3>

      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500">No contacts found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">Message</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="border p-2">{contact.name}</td>
                  <td className="border p-2">{contact.email}</td>
                  <td className="border p-2">{contact.phone}</td>
                  <td className="border p-2">{contact.message || "-"}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Allcontact;
