import React, { useState, useEffect } from 'react';
import { getBlogPosts } from '../services/contentfulService';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedPosts = await getBlogPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Không thể tải được danh sách bài viết. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog-section" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Kiến thức Y khoa</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Cập nhật thông tin hữu ích về phòng và điều trị bệnh ung bướu.</p>
          <div className="mt-4 w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        {isLoading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-gray-600 mt-2">Đang tải bài viết từ CMS...</p>
          </div>
        )}
        
        {error && <p className="mt-6 text-center text-red-600 bg-red-100 p-3 rounded-lg max-w-md mx-auto">{error}</p>}

        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} onClick={() => onSelectPost(post)} className="bg-light rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-primary mb-2 flex-grow">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <span className="mt-auto text-secondary font-semibold hover:underline">
                        Đọc thêm &rarr;
                      </span>
                    </div>
                  </div>
                ))
            ) : (
                <p className="text-center text-gray-600 col-span-full">Chưa có bài viết nào được đăng.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
