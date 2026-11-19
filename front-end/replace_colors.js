const fs = require('fs');
const path = require('path');

const cssFiles = [
    "m:\\Angular\\meanProject\\src\\app\\view\\admin\\messages\\messages\\messages.css",
];

const replaces = [
    { ptn: /#fff(fff)?\b/gi, rep: "var(--card-bg)" },
    { ptn: /#1a1a2e/gi, rep: "var(--text-primary)" },
    { ptn: /#374151/gi, rep: "var(--text-primary)" },
    { ptn: /#6b7280/gi, rep: "var(--text-secondary)" },
    { ptn: /#9ca3af/gi, rep: "var(--text-muted)" },
    { ptn: /#e5e7eb/gi, rep: "var(--border-color)" },
    { ptn: /#f3f4f6/gi, rep: "var(--border-color)" },
    { ptn: /#f8f9fa/gi, rep: "var(--main-bg)" },
    { ptn: /#f9fafb/gi, rep: "var(--main-bg)" },
    // Also handling specific purple shades if needed, but typically text is the issue
    { ptn: /var\(--color-background-primary\)/gi, rep: "var(--card-bg)" },
    { ptn: /var\(--color-background-secondary\)/gi, rep: "var(--main-bg)" },
    { ptn: /var\(--color-border-tertiary\)/gi, rep: "var(--border-color)" },
    { ptn: /var\(--color-border-secondary\)/gi, rep: "var(--border-color)" },
    { ptn: /var\(--color-text-primary\)/gi, rep: "var(--text-primary)" },
    { ptn: /var\(--color-text-secondary\)/gi, rep: "var(--text-secondary)" },
    { ptn: /var\(--color-text-tertiary\)/gi, rep: "var(--text-muted)" }
];

for (const filepath of cssFiles) {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf-8');
        
        for (const r of replaces) {
            content = content.replace(r.ptn, r.rep);
        }
        
        // Exception fix matching color: var(--card-bg) inside buttons that should remain white
        content = content.replace(/color:\s*var\(--card-bg\)/g, 'color: #fff');
        
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated ${filepath}`);
    } else {
        console.log(`Not found: ${filepath}`);
    }
}
