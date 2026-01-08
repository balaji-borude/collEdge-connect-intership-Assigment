import { useEffect, useState } from "react";
import axios from "axios";

import Allcontact from "./components/Allcontact";
import ContactForm from "./components/ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const fetchAllContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/getallcontact"
      );
      setContacts(res.data.data || []);
      console.log("fetched contact response --> ", res);
    } catch (error) {
      console.error("Fetch contacts error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);

  return (
    <div className="w-11/12 h-screen gap-6 mx-auto lg:flex">
      {/* Pass the fetch function to ContactForm */}
      <ContactForm onContactAdded={fetchAllContacts} />
      <Allcontact contacts={contacts} loading={loading} />
    </div>
  );
}

export default App;