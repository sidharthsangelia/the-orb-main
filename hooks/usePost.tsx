// // hooks/usePosts.ts
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { client } from '@/sanity/lib/client';
// import { 
//   allPostsQuery, 
//   trendingPostsQuery, 
//   categoriesQuery,
//   searchPostsQuery,
//   postsByCategoryQuery 
// } from '@/sanity/lib/queries';
// import type { Post, PostsData, Category } from '@/types/blog';

// interface UsePostsOptions {
//   postsPerPage?: number;
//   initialPage?: number;
//   initialSearch?: string;
//   initialCategory?: string | null;
// }

// interface UsePostsReturn {
//   // Data
//   posts: Post[];
//   trendingPosts: Post[];
//   categories: Category[];
//   totalPosts: number;
//   totalPages: number;
  
//   // State
//   loading: boolean;
//   searchQuery: string;
//   currentPage: number;
//   selectedCategory: string | null;
  
//   // Actions
//   setSearchQuery: (query: string) => void;
//   setCurrentPage: (page: number) => void;
//   setSelectedCategory: (category: string | null) => void;
//   clearFilters: () => void;
//   refetch: () => Promise<void>;
// }

// export const usePosts = ({
//   postsPerPage = 12,
//   initialPage = 1,
//   initialSearch = '',
//   initialCategory = null
// }: UsePostsOptions = {}): UsePostsReturn => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const [searchQuery, setSearchQueryState] = useState(initialSearch);
//   const [currentPage, setCurrentPageState] = useState(initialPage);
//   const [selectedCategory, setSelectedCategoryState] = useState<string | null>(initialCategory);

//   const totalPages = Math.ceil(totalPosts / postsPerPage);

//   // Fetch posts based on current filters
//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
    
//     try {
//       const offset = (currentPage - 1) * postsPerPage;
//       let postsData: PostsData;

//       if (searchQuery.trim()) {
//         const postsArray = await client.fetch(searchPostsQuery, { 
//           searchTerm: `*${searchQuery.trim()}*`,
//           limit: postsPerPage, 
//           offset 
//         });
//         postsData = {
//           posts: postsArray,
//           total: postsArray.length // Replace with actual total if available from backend
//         };
//       } else if (selectedCategory) {
//         postsData = await client.fetch(postsByCategoryQuery, {
//           categoryId: selectedCategory,
//           limit: postsPerPage,
//           offset
//         });
//       } else {
//         postsData = await client.fetch(allPostsQuery, { 
//           limit: postsPerPage, 
//           offset 
//         });
//       }
      
//       setPosts(postsData.posts);
//       setTotalPosts(postsData.total);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       setPosts([]);
//       setTotalPosts(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchQuery, selectedCategory, postsPerPage]);

//   // Fetch sidebar data (trending posts and categories)
//   const fetchSidebarData = useCallback(async () => {
//     try {
//       const [trendingData, categoriesData] = await Promise.all([
//         client.fetch(trendingPostsQuery),
//         client.fetch(categoriesQuery)
//       ]);
      
//       setTrendingPosts(trendingData);
//       setCategories(categoriesData);
//     } catch (error) {
//       console.error('Error fetching sidebar data:', error);
//     }
//   }, []);

//   // Initial fetch
//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   useEffect(() => {
//     fetchSidebarData();
//   }, [fetchSidebarData]);

//   // Action handlers
//   const setSearchQuery = useCallback((query: string) => {
//     setSearchQueryState(query);
//     setCurrentPageState(1);
//     setSelectedCategoryState(null);
//   }, []);

//   const setCurrentPage = useCallback((page: number) => {
//     setCurrentPageState(page);
//   }, []);

//   const setSelectedCategory = useCallback((category: string | null) => {
//     setSelectedCategoryState(category);
//     setCurrentPageState(1);
//     setSearchQueryState('');
//   }, []);

//   const clearFilters = useCallback(() => {
//     setSearchQueryState('');
//     setSelectedCategoryState(null);
//     setCurrentPageState(1);
//   }, []);

//   const refetch = useCallback(async () => {
//     await Promise.all([fetchPosts(), fetchSidebarData()]);
//   }, [fetchPosts, fetchSidebarData]);

//   return {
//     // Data
//     posts,
//     trendingPosts,
//     categories,
//     totalPosts,
//     totalPages,
    
//     // State
//     loading,
//     searchQuery,
//     currentPage,
//     selectedCategory,
    
//     // Actions
//     setSearchQuery,
//     setCurrentPage,
//     setSelectedCategory,
//     clearFilters,
//     refetch,
//   };
// };