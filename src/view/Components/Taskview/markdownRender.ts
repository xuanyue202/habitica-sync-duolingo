import MarkdownIt from "markdown-it";
import markdownitEmoji from "markdown-it-emoji"
import twemoji from "twemoji";

export default function renderMarkdown(markdown: any) {
    // Perform more strict type checking to ensure input is a string
    if (markdown === undefined || markdown === null || typeof markdown !== 'string') {
        console.log("Warning: renderMarkdown received non-string input:", markdown);
        return "";
    }
    
    try {
        const md = new MarkdownIt({
            html: true,
            breaks: true,
            linkify: true,
            typographer: true
        });
        md.use(markdownitEmoji);
        md.renderer.rules.emoji = function(token, idx) {
            return twemoji.parse(token[idx].content);
        };
        return md.render(markdown);
    } catch (error) {
        console.error("Error rendering markdown:", error);
        return "";
    }
}