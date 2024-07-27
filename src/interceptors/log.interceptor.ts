import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Request } from "express";

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const initialDate = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request: Request = context.switchToHttp().getRequest();
        console.log(`URL: ${request.url}`);
        console.log(`Execução levou ${Date.now() - initialDate}ms`);
      })
    );
  }
}
