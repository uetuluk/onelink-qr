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
		var deviceType = parser.getDevice()?.type || "";

		console.log(device);
		console.log(deviceModel);
		console.log(deviceType);

		var storeMode = "desktop";

		var destinationURL = 'https://minicourse.shanghai.nyu.edu/register';

		if (device != "" || deviceType != "") {
			storeMode = "Tencent";
			destinationURL = 'https://sj.qq.com/appdetail/minicourse.shanghai.nyu.edu';
		}

		if (device.toUpperCase() == "XIAOMI" || deviceModel.toUpperCase().includes("XIAOMI")) {
			storeMode = "Xiaomi";
			destinationURL = 'https://app.mi.com/details?id=minicourse.shanghai.nyu.edu';
		}

		if (device.toUpperCase() == "HUAWEI" || deviceModel.toUpperCase().includes("HUAWEI")) {
			storeMode = "Huawei";
			destinationURL = 'https://sj.qq.com/appdetail/minicourse.shanghai.nyu.edu';
		}

		if (device.toUpperCase() == "OPPO" || deviceModel.toUpperCase().includes("OPPO")) {
			storeMode = "OPPO";
			destinationURL = 'https://sj.qq.com/appdetail/minicourse.shanghai.nyu.edu';
		}

		if (device.toUpperCase() == "VIVO" || deviceModel.toUpperCase().includes("VIVO")) {
			storeMode = "Vivo";
			destinationURL = 'https://sj.qq.com/appdetail/minicourse.shanghai.nyu.edu';
		}

		if (device.toUpperCase() == "APPLE" || deviceModel.toUpperCase().includes("APPLE")) {
			storeMode = "Apple";
			destinationURL = 'https://apps.apple.com/cn/app/%E4%B8%8A%E7%BA%BD%E8%AF%BE/id1587644337';
		}

		if (deviceType == "") {
			storeMode = "desktop";
			destinationURL = 'https://minicourse.shanghai.nyu.edu/register';
		}
		
		const statusCode = 301;

		// return new Response(storeMode + " | " + destinationURL)

    	return Response.redirect(destinationURL, statusCode);
	},
};
