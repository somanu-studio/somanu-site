import { load as loadYaml } from "js-yaml";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Content lives in YAML files in src/_data (edited through Pages CMS).
  eleventyConfig.addDataExtension("yml,yaml", (contents) => loadYaml(contents));

  // Static files copied as-is.
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/brand");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/images");

  // Every <img> in the output is resized and converted to modern formats,
  // so large photos uploaded through the CMS stay fast.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: [480, 800, 1200, 1800],
    outputDir: "./_site/img/",
    urlPath: "/img/",
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async", sizes: "100vw" },
      pictureAttributes: {},
    },
  });

  // Supports hosting under a sub-path (e.g. username.github.io/repo/) before
  // the custom domain is connected.
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Text helpers: blank line = new paragraph, single line break = <br>.
  const escape = (s = "") =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  eleventyConfig.addFilter("lines", (s) => escape(s).trim().split(/\n/).join("<br>"));
  eleventyConfig.addFilter("paras", (s) =>
    escape(s)
      .trim()
      .split(/\n\s*\n/)
      .map((p) => `<p>${p.split(/\n/).join("<br>")}</p>`)
      .join("\n")
  );
  // Splits a label ending in "→" so the arrow can be styled on its own.
  eleventyConfig.addFilter("arrowless", (s = "") => String(s).replace(/\s*→\s*$/, ""));
  eleventyConfig.addFilter("tel", (s = "") => String(s).replace(/[^\d+]/g, ""));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
}
