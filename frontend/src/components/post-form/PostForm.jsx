import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, RTE, Input, Select } from "../index";
import postService from "../../service/post.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm(post) {
  
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.post?.title || "",
        description: post?.post?.description || "",
        status: post?.post?.status || true,
        featuredImage: post?.post?.featuredImage || "",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = (data) => {
    //check if post id is given in the function arguments and if it is given then update the fields by the fields which are changed
    //if post is not given then create a new post
    //check how to handle the file i.e the coverImage while sending the data via react hook form as when we get the value via register we get the whole array of the image file but we only need the [0]th property
    
    if (data.isActive === "active") {
      data.isActive = true;
    } else {
      data.isActive = false;
    }

    if (post.post) {
      if (post.post?._id) {
        postService
          .updatePost(data,post.post?._id)
          .then
          //navigate to the updated post using the post id
          (()=>{
            navigate(`/post/${post.post?._id}`)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    if (!post?.post?._id) {
      postService
        .createPost(data)
        .then((data)=>{
          // console.log(data.data._id); 
          navigate(`/post/${data?.data?._id}`)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <RTE
          label="Content :"
          name="description"
          control={control}
          defaultValue={getValues("description")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={post.post?.featuredImage}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("isActive", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post.post?._id ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
