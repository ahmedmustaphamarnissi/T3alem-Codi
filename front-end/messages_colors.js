const fs = require('fs');

const filepath = "m:\\Angular\\meanProject\\src\\app\\view\\admin\\messages\\messages\\messages.css";

const replaces = [
    { ptn: /#fff(fff)?\b/gi, rep: "var(--card-bg)" },
    { ptn: /#f8f7ff\b/gi, rep: "var(--main-bg)" },
    { ptn: /#faf9ff\b/gi, rep: "var(--main-bg)" },
    { ptn: /#e8e4f8\b/gi, rep: "var(--border-color)" },
    { ptn: /#f5f3ff\b/gi, rep: "rgba(99, 102, 241, 0.05)" },
    { ptn: /#ede9fe\b/gi, rep: "rgba(99, 102, 241, 0.1)" },
    { ptn: /#f0ecfb\b/gi, rep: "var(--border-color)" },
    { ptn: /#e0d9f5\b/gi, rep: "var(--border-color)" },
    
    // Text colors
    { ptn: /#2d1b69\b/gi, rep: "var(--text-primary)" },
    { ptn: /#333(333)?\b/gi, rep: "var(--text-primary)" },
    { ptn: /#444(444)?\b/gi, rep: "var(--text-primary)" },
    { ptn: /#555(555)?\b/gi, rep: "var(--text-primary)" },
    { ptn: /#aaa(aaa)?\b/gi, rep: "var(--text-muted)" },
    { ptn: /#ccc(ccc)?\b/gi, rep: "var(--text-muted)" },
    { ptn: /#ddd(ddd)?\b/gi, rep: "var(--border-color)" },
    { ptn: /#888(888)?\b/gi, rep: "var(--text-muted)" }
];

if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    for (const r of replaces) {
        content = content.replace(r.ptn, r.rep);
    }
    
    // Fix exceptions
    content = content.replace(/color:\s*var\(--card-bg\)/g, 'color: #fff');
    // .compose-header sets color #fff originally
    content = content.replace(/background:\s*#7c3aed;\s*color:\s*var\(--card-bg\)/g, "background: #7c3aed;\n  color: #fff");

    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`Updated messages.css`);
} else {
    console.log(`Not found`);
}
