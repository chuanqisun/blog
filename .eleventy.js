import { IdAttributePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { createHighlighter } from "shiki";

/**
 * @import { UserConfig } from "@11ty/eleventy"
 */

/**
 * @param {UserConfig} eleventyConfig
 * @returns
 */
export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: {
      name: "post", // iterate over `collections.posts`
      limit: 10, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Stack Diver",
      subtitle: "An Inquiry into Zeros and Ones",
      base: "https://stackdiver.com/",
      author: {
        name: "Chuanqi Sun",
      },
    },
  });
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("humanDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US");
  });
  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  const highlighter = await createHighlighter({ themes: ["dark-plus"], langs: ["js", "jsx", "ts", "tsx", "html", "css", "diff", "yaml", "json"] });
  // ref: https://www.hoeser.dev/blog/2023-02-07-eleventy-shiki-simple/
  eleventyConfig.amendLibrary("md", (md) => {
    md.set({
      highlight: (code, lang) => highlighter.codeToHtml(code, { lang, theme: "dark-plus" }),
    });
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
