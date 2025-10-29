
import React, { useState } from 'react';
import { askAI } from '../services/geminiService';

const KnowledgeSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      setError('Vui lòng nhập câu hỏi của bạn.');
      return;
    }
    setIsLoading(true);
    setAnswer('');
    setError('');

    const response = await askAI(query);
    
    if (response.startsWith('Đã có lỗi')) {
        setError(response);
    } else {
        setAnswer(response);
    }

    setIsLoading(false);
  };

  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Hỏi đáp cùng Trợ lý AI</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Nhận thông tin tham khảo ban đầu về các vấn đề ung bướu.
          </p>
          <div className="mt-4 w-24 h-1 bg-secondary mx-auto"></div>
        </div>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleAskAI}>
            <label htmlFor="ai-question" className="block text-lg font-medium text-gray-700 mb-2">
              Câu hỏi của bạn là gì?
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="ai-question"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ví dụ: Dấu hiệu của ung thư vú là gì?"
                className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none transition"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-800 transition-all shadow-sm disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'Gửi câu hỏi'}
              </button>
            </div>
          </form>

          {isLoading && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-gray-600 mt-2">Trợ lý AI đang suy nghĩ, vui lòng chờ trong giây lát...</p>
            </div>
          )}
          
          {error && <p className="mt-6 text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
          
          {answer && (
            <div className="mt-6 p-6 bg-blue-50 border-l-4 border-secondary rounded-r-lg">
              <h4 className="font-bold text-primary mb-2">Câu trả lời từ Trợ lý AI:</h4>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeSection;
