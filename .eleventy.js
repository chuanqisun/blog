import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: {
      name: "posts", // iterate over `collections.posts`
      limit: 10, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Stack Diver",
      subtitle: "Inquiry of zeros and ones",
      base: "https://blog.chuanqisun.com/",
      author: {
        name: "Chuanqi Sun",
      },
    },
  });
  eleventyConfig.addPassthroughCopy("src/style.css");

  eleventyConfig.addFilter("humanDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US");
  });
  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
