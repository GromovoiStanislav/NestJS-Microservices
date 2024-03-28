import { Module } from "@nestjs/common";
import { PostsController } from "src/posts/posts.controller";
import { PostsService } from "src/posts/posts.service";

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService]
})
export class AppModule {
}