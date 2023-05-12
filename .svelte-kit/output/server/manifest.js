export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.08bc2eb3.js","app":"_app/immutable/entry/app.b098b033.js","imports":["_app/immutable/entry/start.08bc2eb3.js","_app/immutable/chunks/index.4c131317.js","_app/immutable/chunks/singletons.926978d2.js","_app/immutable/chunks/index.068f0a8f.js","_app/immutable/entry/app.b098b033.js","_app/immutable/chunks/index.4c131317.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
