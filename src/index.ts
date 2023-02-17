/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import UAParser from "ua-parser-js";

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		var userAgent = request.headers.get('user-agent') || "";

		var parser = new UAParser(userAgent);

		var device = parser.getDevice()?.vendor || "";
		var deviceModel = parser.getDevice()?.model || "";

		var storeMode = "desktop";

		var destinationURL = 'https://minicourse.shanghai.nyu.edu/register';
    	
		// Redirect according to storemode

		console.log(device);

		if (device != "") {
			storeMode = "Tencent";
			destinationURL = 'https://sj.qq.com/appdetail/minicourse.shanghai.nyu.edu';
		}

		if (device == "Xiaomi") {
			storeMode = "Xiaomi";
			destinationURL = 'https://app.mi.com/details?id=minicourse.shanghai.nyu.edu';
		}

		if (device == "OPPO") {
			storeMode = "OPPO";
			destinationURL = 'https://sj.qq.com/appdetail/minicourse.shanghai.nyu.edu';
		}

		if (device == "Vivo") {
			storeMode = "Vivo";
			destinationURL = 'https://sj.qq.com/appdetail/minicourse.shanghai.nyu.edu';
		}

		if (device == "Apple") {
			storeMode = "Apple";
			destinationURL = 'https://apps.apple.com/cn/app/%E4%B8%8A%E7%BA%BD%E8%AF%BE/id1587644337';
		}
		
		const statusCode = 301;

    	return Response.redirect(destinationURL, statusCode);
	},
};
