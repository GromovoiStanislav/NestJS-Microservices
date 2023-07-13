import { Injectable } from "@nestjs/common";
import { CreatePostInput } from "./dto/create-post.input";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [];

  create(createPostInput: CreatePostInput) {
    const newPost = { ...createPostInput, id: this.posts.length + 1 };
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  forAuthor(authorId: number) {
    return this.posts.filter((post) => post.authorId === authorId);
  }
}