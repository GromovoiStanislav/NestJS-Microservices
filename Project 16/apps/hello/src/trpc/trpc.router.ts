import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TrpcServerService } from '@app/common';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcServerService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        console.log('Message received:', input);
        return `Hello ${input.name ? input.name : `World`}!`;
      }),

  })

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter })
    );
  }
}

//export type AppRouter = TrpcRouter['appRouter'];