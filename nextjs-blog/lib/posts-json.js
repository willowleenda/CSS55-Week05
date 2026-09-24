import fs from 'fs'; // import file system module to read files
import path from 'path'; // import path module to build file paths

const postsFilePath = path.join(process.cwd(), 'data', 'posts.json'); // build the absolute path to the json file

export function getSortedPostsData() { // export function that returns all posts sorted by date
  const fileContents = fs.readFileSync(postsFilePath, 'utf8'); // read the json file as a string
  const allPostsData = JSON.parse(fileContents); // parse the json string into a javascript array
  return allPostsData.sort((a, b) => { // sort the posts array
    if (a.date < b.date) { // if post a is older than post b
      return 1; // push a down the list
    } else { 
      return -1; // push a up the list
    } 
  }); 
}

export function getAllPostIds() { // export function that returns all valid post ids as paths
  const fileContents = fs.readFileSync(postsFilePath, 'utf8'); // read the json file as a string
  const allPostsData = JSON.parse(fileContents); // parse the json string into a javascript array
  return allPostsData.map((post) => { // map over each post to build the paths array
    return { // return an object for each post
      params: { // params key required by next.js
        id: post.id, // use the post's id as the url parameter
      },
    };
  });
}

export async function getPostData(id) { // export async function that returns one post's data by id
  const fileContents = fs.readFileSync(postsFilePath, 'utf8'); // read the json file as a string
  const allPostsData = JSON.parse(fileContents); // parse the json string into a javascript array
  const post = allPostsData.find((p) => p.id === id); // find the post matching the given id
  return Object.assign({ id: id }, post); // merge the id with the post properties into one object
}