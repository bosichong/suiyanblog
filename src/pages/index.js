import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
import { Pagination } from '@nextui-org/react';
import React, { useState } from 'react';
import formatDate from "../utils/formatDate";
import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react';
import Head from "next/head.js";
import config from "../config";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

function Home({ allPostsData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPostsData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
      <Layout>
        <Head>
          <title>Home 首页 | {config.BLOG_NAME_EN} {config.BLOG_NAME}</title>
          <meta name="description" content={config.META_DESCRIPTION}/>
          <meta name="keywords" content={config.META_KEYWORDS}/>
          <meta content={config.BLOG_AUTHOR} name="author"/>
        </Head>
        <main className="container max-w-3xl mx-auto leading-normal text-lg font-extralight">
          <div className="p-4">
            {currentPosts.map((post) => (
                <Card className="my-4 hover:animate-pulse">
                  <CardHeader className="flex gap-3">
                    <Link href={`/blog/${post.id}`} className="flex flex-col">
                      <h3 className="text-xl">{post.title}</h3>
                    </Link>
                  </CardHeader>

                  <CardBody>
                    <p className={'text-sm'}>{post.description}</p>
                  </CardBody>

                  <CardFooter className={'text-sm'}>
                    <Link href={`/blog/${post.id}`} className="block justify-start w-1/2">
                      阅读全文 ➞
                    </Link>
                    <p className="flex justify-end w-1/2">
                      发表于:
                      <span className="cr-time">{formatDate(post.time)}</span>
                    </p>
                  </CardFooter>
                </Card>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination
                color="primary"
                total={Math.ceil(allPostsData.length / postsPerPage)}
                initialPage={1}
                onChange={paginate}
            />
          </div>
        </main>
      </Layout>
  );
}

export default Home;
