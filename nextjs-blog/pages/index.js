import Head from 'next/head'; // import head component for setting page metadata
import Layout, { siteTitle } from '../components/layout'; // import layout component and site title constant
import utilStyles from '../styles/utils.module.css'; // import css module for styles
import { getSortedPostsData } from '../lib/posts-json'; // import function to fetch sorted posts data
import Link from 'next/link'; // import link component for client-side navigation
import Date from '../components/date'; // import date component to format post dates

export async function getStaticProps() { // export async function to fetch data at build time
  const allPostsData = getSortedPostsData(); // get all posts sorted by date
  return { // return props object to pass data to the page
    props: { // props key required by next.js
      allPostsData, // pass posts data to the home component
    },
  };
}

// export the default home component
export default function Home({ allPostsData }) { // export default home component receiving posts data
  return ( // return jsx to render
    <Layout home>

      {/* set the page title using site title constant */}
      <Head>
        <title>{siteTitle}</title>
      </Head>

    {/* section with the heading medium utility class */}
      <section className={utilStyles.headingMd}>

        {/* first intro paragraph */}
        <p>Hi, I'm Willow! I'm a 28 year old developer. I currently work with dogs 
          for my day job, and do digital art commissions. I'm hoping to eventually 
          break into the tech world.</p>
        
        {/* second paragraph with link to next.js tutorial */}
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        
      </section>

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => ( // map over all posts to render a list item for each
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}