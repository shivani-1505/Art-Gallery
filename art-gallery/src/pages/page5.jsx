import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const FAQWebpage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Admin functionality (you would typically restrict this with authentication)
  const [isAdmin, setIsAdmin] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch FAQ data from Firebase
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setIsLoading(true);
        const faqCollection = collection(db, "faqs");
        const faqSnapshot = await getDocs(faqCollection);
        const faqList = faqSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFaqData(faqList);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load FAQs. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching FAQs:", err);
      }
    };

    fetchFAQs();
  }, []);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Admin functions
  const addFAQ = async (e) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;
    
    try {
      const docRef = await addDoc(collection(db, "faqs"), {
        question: newQuestion,
        answer: newAnswer,
        createdAt: new Date()
      });
      
      setFaqData([...faqData, {
        id: docRef.id,
        question: newQuestion,
        answer: newAnswer
      }]);
      
      setNewQuestion("");
      setNewAnswer("");
    } catch (err) {
      console.error("Error adding FAQ:", err);
      setError("Failed to add new FAQ. Please try again.");
    }
  };

  const deleteFAQ = async (id) => {
    try {
      await deleteDoc(doc(db, "faqs", id));
      setFaqData(faqData.filter(faq => faq.id !== id));
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      setError("Failed to delete FAQ. Please try again.");
    }
  };

  const startEditing = (faq) => {
    setEditingId(faq.id);
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
  };

  const updateFAQ = async (e) => {
    e.preventDefault();
    if (!editingId || !newQuestion || !newAnswer) return;
    
    try {
      await updateDoc(doc(db, "faqs", editingId), {
        question: newQuestion,
        answer: newAnswer,
        updatedAt: new Date()
      });
      
      setFaqData(faqData.map(faq => 
        faq.id === editingId 
          ? { ...faq, question: newQuestion, answer: newAnswer }
          : faq
      ));
      
      setEditingId(null);
      setNewQuestion("");
      setNewAnswer("");
    } catch (err) {
      console.error("Error updating FAQ:", err);
      setError("Failed to update FAQ. Please try again.");
    }
  };

  // Toggle admin panel visibility
  const toggleAdminPanel = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <header className="py-12 px-6 text-center">
        <span className="uppercase text-sm font-medium tracking-wide">
          FAQ's
        </span>
        <h1 className="text-4xl font-bold mt-2">Frequently Asked Questions</h1>
        
        {/* Admin toggle button (you would normally hide this behind auth) */}
        <button 
          onClick={toggleAdminPanel}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          {isAdmin ? "Hide Admin Panel" : "Admin Panel"}
        </button>
      </header>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 md:mx-20">
          {error}
          <button 
            className="float-right font-bold"
            onClick={() => setError(null)}
          >
            &times;
          </button>
        </div>
      )}

      {/* Admin Panel */}
      {isAdmin && (
        <div className="px-6 md:px-20 mb-8 bg-gray-100 py-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit FAQ" : "Add New FAQ"}
          </h2>
          <form onSubmit={editingId ? updateFAQ : addFAQ}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Question:</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Answer:</label>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full p-2 border rounded h-24 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {editingId ? "Update FAQ" : "Add FAQ"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNewQuestion("");
                    setNewAnswer("");
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* FAQ Section */}
      <main className="px-6 md:px-20 flex-grow">
        {isLoading ? (
          <div className="text-center py-10">
            <p>Loading FAQs...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqData.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No FAQs available.</p>
            ) : (
              faqData.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`border-b pb-4 ${
                    activeIndex === index ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  <div className="flex justify-between">
                    <button
                      className="flex justify-between w-full text-lg font-medium focus:outline-none text-left"
                      onClick={() => toggle(index)}
                    >
                      {item.question}
                      <span
                        className={`transform ${
                          activeIndex === index ? "rotate-90" : ""
                        } transition-transform`}
                      >
                        {activeIndex === index ? "−" : "+"}
                      </span>
                    </button>
                    
                    {/* Admin actions */}
                    {isAdmin && (
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => startEditing(item)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteFAQ(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {activeIndex === index && (
                    <div>
                      <p className="mt-2 text-sm">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-lg">Artversnght</h3>
            <p className="mt-2">Art project, Gallery, Publishing</p>
            <p>3891 Ranchview Dr. Richardson, California 62339</p>
          </div>
          {/* Column 2 */}
          <div>
            <h4 className="font-semibold">About Us</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Careers</li>
              <li>Services</li>
              <li>Project</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQWebpage;