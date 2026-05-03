import os
import re

css_files = [
    r"m:\Angular\meanProject\src\app\view\admin\instructors\instructors\instructors.css",
    r"m:\Angular\meanProject\src\app\view\admin\add-instructor\add-instructor\add-instructor.css",
    r"m:\Angular\meanProject\src\app\view\admin\addstudent\addstudent\addstudent.css",
    r"m:\Angular\meanProject\src\app\view\admin\allstudents\allstudents\allstudents.css"
]

replaces = {
    r"#fff(fff)?\b": "var(--card-bg)",
    r"#1a1a2e": "var(--text-primary)",
    r"#374151": "var(--text-primary)",
    r"#6b7280": "var(--text-secondary)",
    r"#9ca3af": "var(--text-muted)",
    r"#e5e7eb": "var(--border-color)",
    r"#f3f4f6": "var(--border-color)",
    r"#f9fafb": "var(--main-bg)",
    r"var\(--color-background-primary\)": "var(--card-bg)",
    r"var\(--color-background-secondary\)": "var(--main-bg)",
    r"var\(--color-border-tertiary\)": "var(--border-color)",
    r"var\(--color-border-secondary\)": "var(--border-color)",
    r"var\(--color-text-primary\)": "var(--text-primary)",
    r"var\(--color-text-secondary\)": "var(--text-secondary)",
    r"var\(--color-text-tertiary\)": "var(--text-muted)",
}

for filepath in css_files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        for ptn, rep in replaces.items():
            content = re.sub(ptn, rep, content, flags=re.IGNORECASE)
            
        # Exception: color: #fff in buttons should remain white
        # We can fix that by looking for 'color: var(--card-bg)' and changing to 'color: #fff'
        content = re.sub(r'color:\s*var\(--card-bg\)', 'color: #fff', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"Not found: {filepath}")
