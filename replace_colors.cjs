const fs = require('fs');

const path = './src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace standard solid backgrounds
content = content.replace(/(?<=[\s"'])bg-white(?=[\s"'])/g, 'bg-bg-secondary');
content = content.replace(/(?<=[\s"'])bg-gray-50(?=[\s"'])/g, 'bg-bg-accent');
content = content.replace(/(?<=[\s"'])bg-gray-100(?=[\s"'])/g, 'bg-bg-accent');

// Replace backgrounds with opacity
content = content.replace(/bg-white\//g, 'bg-bg-secondary/');

// Replace text colors
content = content.replace(/(?<=[\s"'])text-gray-900(?=[\s"'])/g, 'text-text-primary');
content = content.replace(/(?<=[\s"'])text-gray-800(?=[\s"'])/g, 'text-text-primary');
content = content.replace(/(?<=[\s"'])text-gray-700(?=[\s"'])/g, 'text-text-secondary');
content = content.replace(/(?<=[\s"'])text-gray-600(?=[\s"'])/g, 'text-text-secondary');
content = content.replace(/(?<=[\s"'])text-gray-500(?=[\s"'])/g, 'text-text-muted');

// Replace border colors
content = content.replace(/(?<=[\s"'])border-gray-100(?=[\s"'])/g, 'border-border-subtle');
content = content.replace(/(?<=[\s"'])border-gray-200(?=[\s"'])/g, 'border-divider');
content = content.replace(/(?<=[\s"'])border-gray-300(?=[\s"'])/g, 'border-divider');

fs.writeFileSync(path, content, 'utf8');
console.log('App.tsx updated successfully.');
