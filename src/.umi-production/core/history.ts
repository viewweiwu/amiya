// @ts-nocheck
import { createBrowserHistory } from '/Users/wangwei/Desktop/workspace/study/amiya/node_modules/@umijs/runtime';

let options = {
  "basename": "/amiya/"
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// remove initial history because of ssr
let history: any = process.env.__IS_SERVER ? null : createBrowserHistory(options);
export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createBrowserHistory(options);
  }

  return history;
};

export { history };
