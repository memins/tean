import Layout from "../components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { PostProvider } from "../contextAPI/PostContext/PostContext";
import { SkeletonTheme } from "react-loading-skeleton";
import DarkModeProvider from "../contextAPI/darkMode/DarkModeProvider";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const initialPosts = pageProps.posts || [];
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <PostProvider>
        <DarkModeProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </DarkModeProvider>
      </PostProvider>
    </SkeletonTheme>
  );
}
