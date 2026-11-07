const fs = require('fs');
const path = require('path');

const mappings = {
  'FAQSection.jsx': 'FAQ',
  'FinishExplorer.jsx': 'Surface Aesthetics',
  'FurnitureByMaterial.jsx': 'Core Materials',
  'InteractiveTimeline.jsx': 'Our Process',
  'LuxuryBrandsSlider.jsx': 'Our Trusted Partners',
  'MaterialComparison.jsx': 'Make an Informed Choice',
  'TeamSection.jsx': 'Our People',
  'WhyChooseUs.jsx': 'The RS Vishwakarma Advantage',
  'Gallery.jsx': 'Portfolio',
  'Projects.jsx': 'Portfolio'
};

const classString = 'text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 flex items-center gap-4';

function fixFile(filePath, headerText) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/<h4 className="-xl md:text-2xl\/h4>/g, `<h4 className="${classString}">${headerText}</h4>`);
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed ' + filePath);
  }
}

for (const [file, header] of Object.entries(mappings)) {
    const fullPath1 = path.join('./src/components/home', file);
    const fullPath2 = path.join('./src/pages', file);
    if (fs.existsSync(fullPath1)) fixFile(fullPath1, header);
    if (fs.existsSync(fullPath2)) fixFile(fullPath2, header);
}

if (fs.existsSync('./src/pages/Home.jsx')) {
  let content = fs.readFileSync('./src/pages/Home.jsx', 'utf8');
  content = content.replace(/<h4 className="-xl md:text-2xl\/h4>/g, function(match, offset, string) {
     const context = string.substring(offset, offset + 200);
     let header = 'Section';
     if (context.includes('Where Craftsmanship')) header = 'About Us';
     if (context.includes('Masterpiece')) header = 'Our Products';
     if (context.includes('Spaces Transformed')) header = 'Portfolio';
     if (context.includes('Client')) header = 'Testimonials';
     return `<h4 className="${classString}">${header}</h4>`;
  });
  fs.writeFileSync('./src/pages/Home.jsx', content);
  console.log('Fixed Home.jsx');
}
