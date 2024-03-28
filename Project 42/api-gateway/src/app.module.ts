import { Module } from "@nestjs/common";
import { PostsController } from "src/posts/posts.controller";

@Module({
  imports: [],
  controllers: [PostsController],
  providers: []
})
export class AppModule {
}