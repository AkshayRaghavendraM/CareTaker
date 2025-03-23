import React, { useState } from "react";
import { Send, Bot } from "lucide-react";

const allowedTopics = [
  "medicine", "medication", "health", "hospital", "doctor", "symptoms",
  "treatment", "nutrition", "exercise", "blood pressure", "diabetes",
  "elderly care", "aging", "fall prevention", "memory loss",
  "mental health", "wellness", "pain relief", "therapy", "disease"
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm here to assist you with healthcare and elderly care queries.", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const isHealthcareRelated = (query: string) => {
    return allowedTopics.some(topic => query.toLowerCase().includes(topic));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
    setLoading(true);

    if (!isHealthcareRelated(input)) {
      setMessages((prev) => [
        ...prev,
        { text: "I'm here to assist with healthcare and elderly care only. Please ask a relevant question.", isUser: false }
      ]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`, // Replace with your actual API key
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            { 
              role: "system", 
              content: "You are an AI assistant designed to answer healthcare and elderly care-related questions only. If the question is unrelated, politely decline to answer."
            },
            ...messages.map((msg) => ({ role: msg.isUser ? "user" : "assistant", content: msg.text })),
            { role: "user", content: input },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const aiReply = data.choices?.[0]?.message?.content || "I'm here to help, but I didn't understand that.";
      setMessages((prev) => [...prev, { text: aiReply, isUser: false }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { text: "Oops! Something went wrong. Please try again later.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-blue-500 text-white flex items-center gap-3">
          <Bot className="h-6 w-6" />
          <h1 className="text-xl font-semibold">AI Health Assistant</h1>
        </div>

        <div className="h-[500px] overflow-y-auto p-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-4`}>
              <div className={`max-w-[70%] rounded-lg p-4 ${message.isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                {message.text}
              </div>
            </div>
          ))}
          {loading && <p className="text-gray-500">Thinking...</p>}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me about healthcare..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
