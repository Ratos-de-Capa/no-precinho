const forge = require('node-forge');

export const KeyManager = {
    encryptPassword: encryptPassword,
};

function encryptPassword(senha: string): string {
    const md = forge.md.md5.create();
    md.update(senha);
    return md.digest().toHex();
}