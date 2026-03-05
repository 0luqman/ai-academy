// source.config.ts
import { defineCollections } from "fumadocs-mdx/config";
var docs = defineCollections({
  type: "doc",
  dir: "content/docs"
});
var meta = defineCollections({
  type: "meta",
  dir: "content/docs"
});
export {
  docs,
  meta
};
