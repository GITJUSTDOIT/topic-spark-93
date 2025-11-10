import axios from 'axios';
import useAuthStore from '@/stores/authStore';

// API 기본 URL 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔗 백엔드 연결: 요청 인터셉터 (Bearer 토큰 자동 추가)
// 🔒 보안: Zustand store에서 토큰 가져오기 (localStorage 대신)
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔗 백엔드 연결: 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🔒 보안: 인증 실패 시 store 초기화 후 로그인 페이지로 이동
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========================================
// 🔗 Auth API
// ========================================

// POST /auth/login/google - OAuth2 구글 로그인
export const loginWithGoogle = async (code: string, redirectUri: string) => {
  const response = await api.post('/auth/login/google', { code, redirectUri });
  return response.data;
};

// ========================================
// 🔗 Users API
// ========================================

// GET /me - 내 프로필 조회
export const getMyProfile = async () => {
  const response = await api.get('/me');
  return response.data;
};

// PUT /me - 내 프로필 수정
export const updateMyProfile = async (data: {
  displayName?: string;
  avatarUrl?: string;
}) => {
  const response = await api.put('/me', data);
  return response.data;
};

// ========================================
// 🔗 Posts API
// ========================================

// GET /posts - 게시글 목록 조회
export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

// GET /posts/{id} - 단건 조회
export const getPost = async (id: string) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

// POST /posts - 작성 + 태그 추가 가능
export const createPost = async (data: {
  title: string;
  content: string;
  tags?: string[];
}) => {
  const response = await api.post('/posts', data);
  return response.data;
};

// PATCH /posts/{id} - 수정 + 태그 교체
export const updatePost = async (
  id: string,
  data: {
    title?: string;
    content?: string;
    tags?: string[];
  }
) => {
  const response = await api.patch(`/posts/${id}`, data);
  return response.data;
};

// DELETE /posts/{id} - 작성자만 삭제
export const deletePost = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

// 🔗 백엔드 연결: GET /posts/search - 게시글 검색
export const searchPosts = async (query: string) => {
  const response = await api.get(`/posts/search`, { params: { query } });
  return response.data.map((post: any) => ({
    ...post,
    tags: Array.isArray(post.tags)
      ? post.tags.map((t: any) => (typeof t === 'object' ? t.name : t))
      : [],
  }));
};

// ========================================
// 🔗 Tags(Post) API
// ========================================

// GET /posts/{postId}/tags - 포스트의 태그 목록
export const getPostTags = async (postId: string) => {
  const response = await api.get(`/posts/${postId}/tags`);
  return response.data;
};

// POST /posts/{postId}/tags - 여러 개 추가(중복 무시)
export const addPostTags = async (postId: string, tags: string[]) => {
  const response = await api.post(`/posts/${postId}/tags`, { tags });
  return response.data;
};

// POST /posts/{postId}/tags/one - 단건 추가
export const addPostTag = async (postId: string, name: string) => {
  const response = await api.post(`/posts/${postId}/tags/one`, { name });
  return response.data;
};

// DELETE /posts/{postId}/tags/{tagId} - 단건 제거
export const deletePostTag = async (postId: string, tagId: string) => {
  const response = await api.delete(`/posts/${postId}/tags/${tagId}`);
  return response.data;
};

// PUT /posts/{postId}/tags - 전체 교체
export const replacePostTags = async (postId: string, tags: string[]) => {
  const response = await api.put(`/posts/${postId}/tags`, { tags });
  return response.data;
};

// ========================================
// 🔗 Tags API
// ========================================

// GET /posts/by-tags - 모든 태그 포함(AND) 검색
export const getPostsByTags = async (names: string[]) => {
  const params = new URLSearchParams();
  names.forEach((name) => params.append('names', name));
  const response = await api.get(`/posts/by-tags?${params.toString()}`);
  return response.data;
};

// GET /tags/autocomplete - prefix + 인기순 정렬
export const getTagAutocomplete = async (keyword: string, limit: number = 5) => {
  const response = await api.get('/tags/autocomplete', {
    params: { keyword, limit },
  });
  return response.data;
};

// ========================================
// 🔗 Comments API
// ========================================

// GET /posts/{postId}/comments - 포스트 댓글 목록
export const getPostComments = async (postId: string) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

// GET /comments/{id} - 댓글 단건
export const getComment = async (id: string) => {
  const response = await api.get(`/comments/${id}`);
  return response.data;
};

// POST /posts/{postId}/comments - 댓글 작성
export const createComment = async (postId: string, body: string) => {
  const response = await api.post(`/posts/${postId}/comments`, { body });
  return response.data;
};

// PATCH /comments/{id} - 작성자만 수정
export const updateComment = async (id: string, body: string) => {
  const response = await api.patch(`/comments/${id}`, { body });
  return response.data;
};

// DELETE /comments/{id} - 작성자만 삭제 / soft 또는 hard
export const deleteComment = async (id: string, hard: boolean = false) => {
  const response = await api.delete(`/comments/${id}`, {
    params: { hard },
  });
  return response.data;
};

// ========================================
// 🔗 Reactions API
// ========================================

// 🔗 백엔드 연결: POST /posts/{postId}/like - 좋아요 토글
export const togglePostLike = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/like`);
  return response.data;
};

// 🔗 백엔드 연결: POST /posts/{postId}/dislike - 싫어요 토글
export const togglePostDislike = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/dislike`);
  return response.data;
};

// 🔗 백엔드 연결: POST /comments/{commentId}/like - 댓글 좋아요 토글
export const toggleCommentLike = async (commentId: string) => {
  const response = await api.post(`/comments/${commentId}/like`);
  return response.data;
};

// 🔗 백엔드 연결: POST /comments/{commentId}/dislike - 댓글 싫어요 토글
export const toggleCommentDislike = async (commentId: string) => {
  const response = await api.post(`/comments/${commentId}/dislike`);
  return response.data;
};

// ========================================
// 🔗 Scrap API
// ========================================

// 🔗 백엔드 연결: POST /posts/{postId}/scrap - 게시글 스크랩 토글
export const togglePostScrap = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/scrap`);
  return response.data;
};

// 🔗 백엔드 연결: GET /posts/scraps - 내가 스크랩한 게시글 목록
export const getMyScraps = async () => {
  const response = await api.get(`/posts/scraps`);
  return response.data;
};

// 🔗 백엔드 연결: GET /posts/{postId}/scrap - 스크랩 여부
export const getIsScraped = async (postId: string) => {
  const response = await api.get(`/posts/${postId}/scrap`);
  return response.data;
};

export default api;
