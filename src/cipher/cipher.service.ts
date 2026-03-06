import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CipherService {
  private readonly algorithm = 'aes-256-ctr';
  // No seu .env da Vercel, coloque uma chave de 32 bytes
  private readonly iv = randomBytes(16);

  async encrypt(text: string): Promise<string> {
    const key = (await promisify(scrypt)(process.env.ENCRYPTION_KEY!, 'salt', 32)) as Buffer;
    const cipher = createCipheriv(this.algorithm, key, this.iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    // Retornamos o IV junto com o texto para conseguir decriptar depois
    return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  async decrypt(hash: string): Promise<string> {
    const [ivHex, contentHex] = hash.split(':');
    const key = (await promisify(scrypt)(process.env.ENCRYPTION_KEY!, 'salt', 32)) as Buffer;
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = createDecipheriv(this.algorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(contentHex, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString();
  }
}