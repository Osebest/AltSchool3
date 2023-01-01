import { PostList } from "./PostList";
import { Pagination } from "./Pagination";
const postsPerPage = 5;

export const paginate = (pageNumber, data, setContent) => {
  // Get current posts
   let indexOfLastPostP = pageNumber * postsPerPage;
   let indexOfFirstPostP = indexOfLastPostP - postsPerPage;
   const currentPosts = data.slice(indexOfFirstPostP, indexOfLastPostP);

   setContent (
     <div className="mt-5">
       <h3>Repos</h3>
       <div>
         <ol className="list-group list-group-numbered">
           {currentPosts.map((post) => (
             <PostList post={post} key={post.id} />
           ))}
         </ol>
       </div>
       <Pagination
         postsPerPage={postsPerPage}
         totalPosts={data.length}
         paginate={paginate}
         data={data}
         setContent={setContent}
       />
     </div>
   );
 };
