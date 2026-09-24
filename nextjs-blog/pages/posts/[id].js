import { getAllPostIds, getPostData } from '../../lib/posts-json'; // import functions for fetching post paths and data
import Head from 'next/head'; // import head component for setting page metadata
import Date from '../../components/date'; // import date component to format the post date
import utilStyles from '../../styles/utils.module.css'; // import css module for styles
import Layout from '../../components/layout'; // import layout wrapper component

export async function getStaticProps({ params }) { // export async function to fetch a single post's data
  // add the "await" keyword like this:
  const postData = await getPostData(params.id); // fetch post data using the id from the url

  return { // return props object to pass data to the page
    props: { // props key required by next.js
      postData, // pass post data to the post component
    },
  };
}

export async function getStaticPaths() { // export async function to define all valid post urls
  const paths = getAllPostIds(); // get array of all post ids as paths
  return { // return paths object
    paths, // list of paths to pre-render
    fallback: false, // return 404 for any path not in the list
  };
}

export default function Post({ postData }) { // export default post component receiving post data
  return ( // return jsx to render
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={utilStyles.postContainer}>
        <h1 className={utilStyles.postTitle}>{postData.title}</h1>
        <div className={utilStyles.postDate}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}