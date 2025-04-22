const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');

// Busca o server.js dentro de .next/standalone recursivamente
function findServerFile(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const result = findServerFile(fullPath);
            if (result) return result;
        } else if (entry.name === 'server.js') {
            return fullPath;
        }
    }

    return null;
}

function main() {
    const serverPath = findServerFile(standaloneDir);
    if (!serverPath) {
        console.error('❌ server.js não encontrado no build standalone.');
        process.exit(1);
    }

    const targetPath = path.join(standaloneDir, 'server.js');
    fs.copyFileSync(serverPath, targetPath);
    console.log(`✅ server.js copiado para ${targetPath}`);

    const staticSource = path.join(__dirname, '..', '.next', 'static');
    const staticTarget = path.join(standaloneDir, '.next', 'static');

    fs.mkdirSync(path.dirname(staticTarget), { recursive: true });
    fs.cpSync(staticSource, staticTarget, { recursive: true });
    console.log('✅ static copiado para standalone');
}

main();