import * as contentful from 'contentful';
import { BlogPost } from '../types';

const client = contentful.createClient({ // This is the space ID. A space is like a project folder in Contentful terms
  space: '91sdcuei7aq7', // <-- BẠN CẦN THAY THẾ GIÁ TRỊ NÀY
  // This is the access token for this space.
  accessToken: 'W8wl1gZ740eJmnhds7yQ6yvqnGT8CZUU5IcT3RmlU-k', // <-- BẠN CẦN THAY THẾ GIÁ TRỊ NÀY
});

// Helper function to process the raw response from Contentful
const processBlogPost = (entry: any): BlogPost => {
  return {
    id: entry.sys.id, // Using Contentful's system ID
    slug: entry.fields.slug || '',
    title: entry.fields.title || 'Tiêu đề trống',
    // Prepend 'https:' to the image URL if it's protocol-relative
    image: entry.fields.image?.fields?.file?.url ? `https:${entry.fields.image.fields.file.url}` : 'https://picsum.photos/600/400',
    excerpt: entry.fields.excerpt || '',
    content: entry.fields.content || '',
    author: entry.fields.author || 'Bác sĩ Từ Ngọc Hiếu',
    publishedDate: entry.fields.publishedDate || new Date().toISOString(),
  };
};


export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await client.getEntries({
      // Quan trọng: Đây là ID của Content Model bạn đã tạo. 
      // Ví dụ: nếu bạn đặt tên là "Bài Viết", ID có thể là "baiViet".
      // Hãy kiểm tra ID này trong tab "Content model" trên Contentful.
      content_type: 'baiViet' 
    });
    
    if (response.items) {
      // Sort posts by publishedDate in descending order
      const sortedItems = response.items.sort((a, b) => 
        new Date(b.fields.publishedDate).getTime() - new Date(a.fields.publishedDate).getTime()
      );
      return sortedItems.map(processBlogPost);
    }
    return [];
  } catch (error) {
    console.error("Error fetching posts from Contentful:", error);
    // Throw the error to be handled by the component
    throw error;
  }
};