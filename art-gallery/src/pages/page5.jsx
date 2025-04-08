import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

// Directly import the db instance instead of depending on a separate module
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
        
        // If no FAQs are found, use fallback data
        if (faqList.length === 0) {
          setFaqData([
            {
              id: "fallback1",
              question: "What types of art do you showcase?",
              answer: "We showcase a diverse range of art including paintings, sculptures, digital art, and photography from both established and emerging artists."
            },
            {
              id: "fallback2",
              question: "How can I purchase artwork?",
              answer: "You can purchase artwork directly through our website by adding items to your cart and proceeding to checkout. We accept major credit cards and PayPal."
            },
            {
              id: "fallback3",
              question: "Do you ship internationally?",
              answer: "Yes, we ship to most countries worldwide. International shipping rates vary depending on the size and weight of the artwork and the destination country."
            }
          ]);
        } else {
          setFaqData(faqList);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        // Use fallback data if there's an error
        setFaqData([
          {
            id: "fallback1",
            question: "What types of art do you showcase?",
            answer: "We showcase a diverse range of art including paintings, sculptures, digital art, and photography from both established and emerging artists."
          },
          {
            id: "fallback2",
            question: "How can I purchase artwork?",
            answer: "You can purchase artwork directly through our website by adding items to your cart and proceeding to checkout. We accept major credit cards and PayPal."
          },
          {
            id: "fallback3",
            question: "Do you ship internationally?",
            answer: "Yes, we ship to most countries worldwide. International shipping rates vary depending on the size and weight of the artwork and the destination country."
          }
        ]);
        setError("Failed to load FAQs from database. Showing sample questions instead.");
        setIsLoading(false);
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      color: 'black'
    }}>
      {/* Header */}
      <header style={{
        padding: '3rem 1.5rem',
        textAlign: 'center'
      }}>
        <span style={{
          textTransform: 'uppercase',
          fontSize: '0.875rem',
          fontWeight: '500',
          letterSpacing: '0.05em'
        }}>
          FAQ's
        </span>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          marginTop: '0.5rem'
        }}>Frequently Asked Questions</h1>
        
        {/* Admin toggle button (you would normally hide this behind auth) */}
        <button 
          onClick={toggleAdminPanel}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#e5e7eb',
            color: '#4b5563',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {isAdmin ? "Hide Admin Panel" : "Admin Panel"}
        </button>
      </header>

      {/* Error message */}
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #f87171',
          color: '#b91c1c',
          padding: '0.75rem 1rem',
          borderRadius: '0.375rem',
          margin: '0 1.5rem 1.5rem',
          position: 'relative'
        }}>
          {error}
          <button 
            style={{
              float: 'right',
              fontWeight: 'bold',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setError(null)}
          >
            &times;
          </button>
        </div>
      )}

      {/* Admin Panel */}
      {isAdmin && (
        <div style={{
          padding: '1.5rem',
          margin: '0 1.5rem 2rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.5rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            {editingId ? "Edit FAQ" : "Add New FAQ"}
          </h2>
          <form onSubmit={editingId ? updateFAQ : addFAQ}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                color: '#4b5563',
                marginBottom: '0.5rem'
              }}>Question:</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem'
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                color: '#4b5563',
                marginBottom: '0.5rem'
              }}>Answer:</label>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  height: '6rem'
                }}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
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
                  style={{
                    backgroundColor: '#6b7280',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* FAQ Section */}
      <main style={{
        padding: '0 1.5rem',
        flexGrow: 1
      }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
            <p>Loading FAQs...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqData.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#6b7280', padding: '2.5rem 0' }}>No FAQs available.</p>
            ) : (
              faqData.map((item, index) => (
                <div
                  key={item.id || index}
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '1rem',
                    color: activeIndex === index ? '#1f2937' : '#6b7280'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        fontSize: '1.125rem',
                        fontWeight: '500',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        padding: '0.5rem 0',
                        cursor: 'pointer'
                      }}
                      onClick={() => toggle(index)}
                    >
                      <span>{item.question}</span>
                      <span
                        style={{
                          transform: activeIndex === index ? 'rotate(90deg)' : 'rotate(0)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        {activeIndex === index ? "−" : "+"}
                      </span>
                    </button>
                    
                    {/* Admin actions */}
                    {isAdmin && (
                      <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                        <button
                          onClick={() => startEditing(item)}
                          style={{
                            color: '#3b82f6',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteFAQ(item.id)}
                          style={{
                            color: '#ef4444',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {activeIndex === index && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <p style={{ fontSize: '0.875rem' }}>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '2rem 1.5rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {/* Column 1 */}
          <div>
            <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>Artversnght</h3>
            <p style={{ marginTop: '0.5rem' }}>Art project, Gallery, Publishing</p>
            <p>3891 Ranchview Dr. Richardson, California 62339</p>
          </div>
          {/* Column 2 */}
          <div>
            <h4 style={{ fontWeight: '600' }}>About Us</h4>
            <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
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