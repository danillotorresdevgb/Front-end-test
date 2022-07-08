import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { IPost, IPosts } from '../sharedTypes';

type PostsContextData = {
  posts: IPosts;
  getPosts(): Promise<void>;
  addPost(posts: IPost): void;
  selectPost(postId: number): void;
  removePost(postId: number): void;
  updatePost(post: IPost): void;
  selectedPost: number | undefined;
};

const PostsContext = createContext<PostsContextData>({} as PostsContextData);

const PostsProvider: React.FC = ({ children }) => {
  const [posts, setPosts] = useState<IPosts>([]);
  const [selectedPost, setSelectedPost] = useState<number>();

  const getPosts = useCallback(async () => {
    const res = await api.get('/posts');
    if (res.data) {
      setPosts(res.data);
    }
  }, []);

  const addPost = useCallback(
    (post: IPost) => {
      console.log('addPost', post);
      // logica para adicionar um post
    },
    [posts],
  );

  const removePost = useCallback(
    (postId: number) => {
      console.log('removePost', postId);
      // logica remove posts

     //  setPosts(newsPosts);
    },
    [],
  );

  const updatePost = useCallback(
    (post: IPost) => {
      console.log('updatePost', post);
      // logica update posts

      // setPosts(newPosts);
    },
    [posts, setPosts],
  );

  const selectPost = useCallback((postId: number) => {
    setSelectedPost(postId);
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        getPosts,
        posts,
        addPost,
        selectPost,
        selectedPost,
        removePost,
        updatePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

function usePosts(): PostsContextData {
  const context = useContext(PostsContext);

  return context;
}

export { PostsProvider, usePosts };
