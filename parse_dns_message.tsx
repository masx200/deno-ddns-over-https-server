import {
    Context,
    NextFunction,
    RetHandler,
    bodyToBuffer,
} from "https://cdn.jsdelivr.net/gh/masx200/deno-http-middleware@3.3.0/mod.ts";
import { dns_query_path_name } from "./dns_query_path_name.tsx";
import { get_path_name } from "./get_path_name.tsx";

export async function parse_dns_message(
    ctx: Context,
    next: NextFunction
): Promise<RetHandler> {
    const req = ctx.request;
    const { url } = req;
    const pathname = get_path_name(url);
    if (
        pathname === dns_query_path_name() &&
        (ctx.request.method === "POST" || ctx.request.method === "GET")
    ) {
        const body = req.body && (await bodyToBuffer(req.body));
        req.body = body;

        console.log({ body });
        return await next();
    } else {
        return await next();
    }
}