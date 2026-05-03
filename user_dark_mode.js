const fs = require('fs');

const cssFiles = [
    "m:\\Angular\\meanProject\\src\\app\\view\\user\\loginuser\\loginuser\\loginuser.css",
    "m:\\Angular\\meanProject\\src\\app\\view\\user\\register\\register\\register.css",
    "m:\\Angular\\meanProject\\src\\app\\view\\user\\edit-user\\edit-user\\edit-user.css",
    "m:\\Angular\\meanProject\\src\\app\\layouts\\auth-admin-login\\auth-admin-login.css"
];

const replaces = [
    { ptn: /#fff(fff)?\b/gi, rep: "var(--card-bg)" },
    { ptn: /#1a1a2e/gi, rep: "var(--text-primary)" },
    { ptn: /#2c3e50/gi, rep: "var(--text-primary)" },
    { ptn: /#333(333)?\b/gi, rep: "var(--text-primary)" },
    { ptn: /#374151/gi, rep: "var(--text-primary)" },
    { ptn: /#555(555)?\b/gi, rep: "var(--text-secondary)" },
    { ptn: /#6b7280/gi, rep: "var(--text-secondary)" },
    { ptn: /#7f8c8d/gi, rep: "var(--text-secondary)" },
    { ptn: /#888(888)?\b/gi, rep: "var(--text-muted)" },
    { ptn: /#9ca3af/gi, rep: "var(--text-muted)" },
    { ptn: /#aaa(aaa)?\b/gi, rep: "var(--text-muted)" },
    { ptn: /#bdc3c7/gi, rep: "var(--border-color)" },
    { ptn: /#ccc(ccc)?\b/gi, rep: "var(--border-color)" },
    { ptn: /#e0e0e0/gi, rep: "var(--border-color)" },
    { ptn: /#e5e7eb/gi, rep: "var(--border-color)" },
    { ptn: /#ecf0f1/gi, rep: "var(--main-bg)" },
    { ptn: /#f3f4f6/gi, rep: "var(--main-bg)" },
    { ptn: /#f4f6f8/gi, rep: "var(--main-bg)" },
    { ptn: /#f8f9fa/gi, rep: "var(--main-bg)" },
    { ptn: /#f9fafb/gi, rep: "var(--main-bg)" },
    { ptn: /#fafafa/gi, rep: "var(--main-bg)" }
];

for (const filepath of cssFiles) {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf-8');
        
        for (const r of replaces) {
            content = content.replace(r.ptn, r.rep);
        }
        
        // Exception fix matching color: var(--card-bg) inside buttons that should usually remain white
        content = content.replace(/color:\s*var\(--card-bg\)/g, 'color: #fff');
        
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated ${filepath}`);
    } else {
        console.log(`Not found: ${filepath}`);
    }
}
