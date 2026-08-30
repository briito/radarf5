const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://radarf5.com.br';
const DIRS_TO_SCAN = ['./', './src/articles'];
const EXCLUDE_FILES = ['404.html'];

function getHtmlFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        // Se for arquivo HTML e nao estiver na lista de exclusao
        if (!stat.isDirectory() && file.endsWith('.html') && !EXCLUDE_FILES.includes(file)) {
            results.push(filePath);
        }
    });
    return results;
}

function generateSitemap() {
    let files = [];
    DIRS_TO_SCAN.forEach(dir => {
        files = files.concat(getHtmlFiles(dir));
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    files.forEach(file => {
        // Padroniza as barras no Windows/Linux
        let relativePath = file.replace(/\\/g, '/');
        if (relativePath.startsWith('./')) relativePath = relativePath.substring(2);

        let urlPath = relativePath;
        if (relativePath === 'index.html') {
            urlPath = '';
        }

        const loc = `${BASE_URL}/${urlPath}`;
        const stats = fs.statSync(file);
        const lastmod = stats.mtime.toISOString().split('T')[0];

        xml += `  <url>\n`;
        xml += `    <loc>${loc}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>${relativePath === 'index.html' ? '1.0' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    fs.writeFileSync('sitemap.xml', xml, 'utf8');
    console.log(`✅ sitemap.xml gerado na raiz com sucesso! Total de URLs: ${files.length}`);
}

generateSitemap();