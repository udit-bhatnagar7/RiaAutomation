const fs = require('fs');
const path = './src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// The problematic ones from previous inspections:
// bg-[#F7F9FC] -> bg-bg-primary
content = content.replace(/bg-\[#F7F9FC\]/g, 'bg-bg-primary');
// text-[#4A4D55] -> text-text-secondary
content = content.replace(/text-\[#4A4D55\]/g, 'text-text-secondary');
// border-[#E1E6ED] -> border-border-subtle
content = content.replace(/border-\[#E1E6ED\]/g, 'border-border-subtle');
// border-[#F0F2F5] -> border-divider
content = content.replace(/border-\[#F0F2F5\]/g, 'border-divider');
// text-[#1A1D21] -> text-text-primary
content = content.replace(/text-\[#1A1D21\]/g, 'text-text-primary');
// bg-[#F8FAFD] -> bg-bg-primary
content = content.replace(/bg-\[#F8FAFD\]/g, 'bg-bg-primary');
// bg-[#EF4F9] -> This looks like a typo or specific color... let's check text-[#030213]
content = content.replace(/text-\[#030213\]/g, 'text-text-primary');
// border-[#E6EAF0] -> border-border-subtle
content = content.replace(/border-\[#E6EAF0\]/g, 'border-border-subtle');

// Replace any remaining text-slate-*, bg-slate-* that wasn't caught
content = content.replace(/text-slate-900/g, 'text-text-primary');
content = content.replace(/text-slate-800/g, 'text-text-primary');
content = content.replace(/text-slate-700/g, 'text-text-secondary');
content = content.replace(/text-slate-600/g, 'text-text-secondary');
content = content.replace(/text-slate-500/g, 'text-text-muted');

content = content.replace(/bg-slate-50/g, 'bg-bg-accent');
content = content.replace(/bg-slate-100/g, 'bg-bg-accent');
content = content.replace(/border-slate-200/g, 'border-divider');
content = content.replace(/border-slate-100/g, 'border-border-subtle');

fs.writeFileSync(path, content, 'utf8');
console.log('App.tsx hex colors updated.');
