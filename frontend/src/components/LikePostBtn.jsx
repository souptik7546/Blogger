import React, { useEffect } from 'react'
import { Heart } from 'lucide-react'
import likeService from '../service/like.service';

function LikePostBtn(post) {
    const [Liked,setLiked]=React.useState(false);
    useEffect(()=>{
        setLiked(false)
        likeService
        .isLiked(post?.post?._id)
        .then((data)=>{
            setLiked(data?.data?.isLiked)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    const handleLike=()=>{
        if(Liked){
            likeService
            .delete(post?.post?._id)
            .then((data)=>{
                setLiked(false)
            })
            .catch((error)=>{
                console.log(error);
            })
        } else if(!Liked){
            likeService
            .create(post?.post?._id)
            .then((data)=>{
                setLiked(true)
            })
        }
    }

  return (
 <div
  className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl
              border transition-all duration-200
              ${
                Liked
                  ? "border-gray-400/60 bg-gray-500/40"
                  : "border-gray-400/40 bg-gray-500/30"
              }
              hover:bg-gray-500/50`}
>
  {/* Like button */}
  <button
    onClick={handleLike}
    className="flex items-center justify-center
               transition-transform duration-150
               hover:scale-110 active:scale-125"
  >
    <Heart
      size={20}
      className={
        Liked
          ? "text-red-400"
          : "text-gray-200"
      }
      fill={Liked ? "currentColor" : "none"}
    />
  </button>

  {/* Divider */}
  <span className="h-4 w-px bg-gray-400/60" />

  {/* Like count */}
  <span
    className={`text-sm font-semibold transition-colors
                ${
                  Liked
                    ? "text-gray-100"
                    : "text-gray-200"
                }`}
  >
    {post?.post?.likesCount}
  </span>
</div>

)
}

export default LikePostBtn